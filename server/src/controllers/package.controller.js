import Package from "../models/package.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// robust JSON-like parser used by both create and update flows
const tryParseOnce = (v) => {
  if (v === undefined || v === null) return v;
  if (typeof v === 'object') return v;
  if (typeof v !== 'string') return v;
  let s = v.trim();
  if (!s) return s;
  try {
    s = s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  } catch (e) {}
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  try {
    return JSON.parse(s);
  } catch (e) {
    return v;
  }
};

const deepParse = (val) => {
  let cur = val;
  for (let i = 0; i < 4; i++) {
    const next = tryParseOnce(cur);
    if (next === cur) break;
    cur = next;
  }
  return cur;
};

// Ensure value becomes an array of plain strings.
// Accepts: arrays (possibly containing JSON strings), JSON-stringified arrays, or separator-joined strings.
const ensureStringArray = (input, sep = ',') => {
  try {
    const parsed = deepParse(input);
    const out = [];
    if (!parsed && parsed !== 0) return [];
    if (Array.isArray(parsed)) {
      parsed.forEach((it) => {
        if (it === undefined || it === null) return;
        if (typeof it === 'string') {
          const p = deepParse(it);
          if (Array.isArray(p)) {
            p.forEach(x => { if (x !== undefined && x !== null) out.push(String(x).trim()); });
            return;
          }
          if (typeof p === 'string') { out.push(p.trim()); return; }
          if (typeof p === 'object') { out.push(JSON.stringify(p)); return; }
          out.push(String(it).trim());
        } else if (Array.isArray(it)) {
          it.forEach(x => { if (x !== undefined && x !== null) out.push(String(x).trim()); });
        } else if (typeof it === 'object') {
          out.push(JSON.stringify(it));
        } else {
          out.push(String(it).trim());
        }
      });
      return out.filter(Boolean);
    }
    if (typeof parsed === 'string') {
      const s = parsed.trim();
      // prefer '||' split for tripHighlights-like values
      const sepToUse = s.includes('||') ? '||' : sep;
      return s.split(sepToUse).map(x => x.trim()).filter(Boolean);
    }
    // single primitive
    return [String(parsed)];
  } catch (e) {
    return [];
  }
};

// Normalize a package document for API responses: deep-parse JSON-like strings
const normalizePackageForResponse = (doc) => {
  if (!doc) return doc;
  let obj = doc;
  try {
    // If it's a mongoose document, convert to plain object
    if (doc.toObject && typeof doc.toObject === 'function') obj = doc.toObject();
    // Deep-parse common fields
  // deep-parse then ensure arrays of strings
  obj.themes = ensureStringArray(obj.themes, ',');
  // tripHighlights in client code may use '||' as separator (legacy)
  obj.tripHighlights = ensureStringArray(obj.tripHighlights, '||');
  obj.inclusions = ensureStringArray(obj.inclusions, ',');
  obj.exclusions = ensureStringArray(obj.exclusions, ',');
    obj.additionalInfo = deepParse(obj.additionalInfo);
    obj.contact = deepParse(obj.contact);
    obj.durationAndInclusions = deepParse(obj.durationAndInclusions);
    obj.priceDetails = deepParse(obj.priceDetails);
    obj.itinerary = deepParse(obj.itinerary);

    // Ensure simple array shapes
    // ensure simple array shapes (already produced by ensureStringArray)
    obj.themes = Array.isArray(obj.themes) ? obj.themes.map(String) : [];
    obj.tripHighlights = Array.isArray(obj.tripHighlights) ? obj.tripHighlights.map(String) : [];
    obj.inclusions = Array.isArray(obj.inclusions) ? obj.inclusions.map(String) : [];
    obj.exclusions = Array.isArray(obj.exclusions) ? obj.exclusions.map(String) : [];

    // Normalize durationAndInclusions includes to array of {label,icon}
    try {
      if (obj.durationAndInclusions && typeof obj.durationAndInclusions === 'object') {
        const d = obj.durationAndInclusions;
        d.duration = d.duration !== undefined && d.duration !== null ? String(d.duration) : '';
        d.location = d.location !== undefined && d.location !== null ? String(d.location) : '';
        if (!Array.isArray(d.includes)) d.includes = [];
        else d.includes = d.includes.map(it => {
          if (!it) return null;
          if (typeof it === 'string') {
            try { const p = JSON.parse(it); if (p && typeof p === 'object') return { label: String(p.label || ''), icon: String(p.icon || '') }; } catch(e) {}
            return { label: String(it), icon: '' };
          }
          if (typeof it === 'object') return { label: String(it.label || ''), icon: String(it.icon || '') };
          return null;
        }).filter(Boolean);
      }
    } catch (e) { /* ignore */ }

    // Normalize EMI numbers
    try {
      const pd = obj.priceDetails;
      if (pd && typeof pd === 'object' && pd.emiOptions && typeof pd.emiOptions === 'object') {
        ['noCostPlans','standardPlans'].forEach(k => {
          if (Array.isArray(pd.emiOptions[k])) pd.emiOptions[k] = pd.emiOptions[k].map(it => ({ months: Number(it.months)||0, amount: Number(it.amount)||0 }));
        });
      }
    } catch (e) { /* ignore */ }

  } catch (e) { /* ignore */ }
  return obj;
};

// Create package
export const createPackage = AsyncHandler(async (req, res) => {
  // support multipart/form-data (files + fields)
  const payload = { ...(req.body || {}) };

  if (!payload.slug || !payload.title) {
    throw new ErrorHandler(400, "slug and title are required!");
  }

  // Ensure slug is unique
  const exists = await Package.findOne({ slug: payload.slug });
  if (exists) throw new ErrorHandler(400, "Package with this slug already exists!");

  // Handle uploaded images (image1..image5)
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const key = `image${i}`;
    if (req.files && req.files[key] && req.files[key][0] && req.files[key][0].path) {
      const url = await uploadOnCloudinary(req.files[key][0].path);
      if (url) images.push(url);
    }
  }

  // Normalize some fields that might arrive as JSON strings
  // helper: robustly parse JSON-like inputs which may be:
  // - plain objects/arrays
  // - JSON strings
  // - HTML-escaped JSON (coming from some form libraries)
  // - double-encoded strings ("\"{...}\"")
  // (parsing helpers are defined at file-scope)

  // Log the raw incoming field (useful when clients send different encodings)
  try {
    // eslint-disable-next-line no-console
    console.log('createPackage: raw req.body.durationAndInclusions =>', req.body && req.body.durationAndInclusions);
  } catch (e) {}

  // Fields that may be sent as JSON strings from the client; ensure they're objects/arrays if possible
  payload.themes = deepParse(payload.themes);
  payload.itinerary = deepParse(payload.itinerary);
  payload.priceDetails = deepParse(payload.priceDetails);
  payload.additionalInfo = deepParse(payload.additionalInfo);
  payload.contact = deepParse(payload.contact);
  payload.durationAndInclusions = deepParse(payload.durationAndInclusions);

  // EXTRA DEBUG + fallback: if deepParse produced empty object, try multiple JSON.parse passes on the raw req.body value
  try {
    // eslint-disable-next-line no-console
    console.log('DBG create: raw type of req.body.durationAndInclusions =>', typeof (req.body && req.body.durationAndInclusions));
    // eslint-disable-next-line no-console
    console.log('DBG create: raw req.body.durationAndInclusions =>', req.body && req.body.durationAndInclusions);
  } catch (e) {}
  try {
    if ((!payload.durationAndInclusions || Object.keys(payload.durationAndInclusions).length === 0) && req.body && typeof req.body.durationAndInclusions === 'string') {
      let attempt = req.body.durationAndInclusions;
      for (let i = 0; i < 4; i++) {
        try {
          attempt = JSON.parse(attempt);
        } catch (e) {
          break;
        }
      }
      if (attempt && typeof attempt === 'object') {
        payload.durationAndInclusions = attempt;
        // eslint-disable-next-line no-console
        console.log('DBG create: fallback parsed durationAndInclusions =>', payload.durationAndInclusions);
      }
    }
  } catch (e) { /* ignore */ }

  // Ensure list-like fields become plain arrays of strings for saving
  try {
    payload.themes = ensureStringArray(payload.themes, ',');
    payload.tripHighlights = ensureStringArray(payload.tripHighlights, '||');
    payload.inclusions = ensureStringArray(payload.inclusions, ',');
    payload.exclusions = ensureStringArray(payload.exclusions, ',');
  } catch (e) { /* ignore */ }

  // Normalize durationAndInclusions shape: ensure includes is an array of {label, icon}
  try {
    const d = payload.durationAndInclusions;
    if (d && typeof d === 'object') {
      // If includes was sent as a JSON string (double-encoded), parse it
      try {
        if (typeof d.includes === 'string' && d.includes.trim()) {
          const parsedIncludes = deepParse(d.includes);
          if (Array.isArray(parsedIncludes)) d.includes = parsedIncludes;
        }
      } catch (e) { /* ignore */ }

      if (Array.isArray(d.includes)) {
        d.includes = d.includes.map((it) => {
          if (!it) return null;
          if (typeof it === 'string') {
            // if legacy string, try to parse as JSON or fall back to label-only
            try {
              const parsed = JSON.parse(it);
              if (parsed && typeof parsed === 'object') return { label: parsed.label || String(parsed), icon: parsed.icon || '' };
            } catch (e) {}
            return { label: it, icon: '' };
          }
          if (typeof it === 'object') return { label: it.label || '', icon: it.icon || '' };
          return null;
        }).filter(Boolean);
      }
    }
  } catch (e) { /* non-fatal */ }

  // Coerce fields to expected types to avoid Mongoose casting surprises
  try {
    if (payload.durationAndInclusions && typeof payload.durationAndInclusions === 'object') {
      const dd = payload.durationAndInclusions;
      dd.duration = dd.duration !== undefined && dd.duration !== null ? String(dd.duration) : '';
      dd.location = dd.location !== undefined && dd.location !== null ? String(dd.location) : '';
      if (!Array.isArray(dd.includes)) dd.includes = [];
      else dd.includes = dd.includes.map(i => ({ label: String(i.label || ''), icon: String(i.icon || '') }));
    }
  } catch (e) { /* non-fatal */ }

  // If priceDetails has emiOptions, coerce months/amount to numbers where possible
  try {
    const pd = payload.priceDetails;
    if (pd && typeof pd === 'object' && pd.emiOptions && typeof pd.emiOptions === 'object') {
      ['noCostPlans', 'standardPlans'].forEach((listKey) => {
        const arr = pd.emiOptions[listKey];
        if (Array.isArray(arr)) {
          arr.forEach((it) => {
            if (it && typeof it === 'object') {
              if (it.months !== undefined) {
                const n = Number(it.months);
                if (!Number.isNaN(n)) it.months = n;
              }
              if (it.amount !== undefined) {
                const n = Number(it.amount);
                if (!Number.isNaN(n)) it.amount = n;
              }
            }
          });
        }
      });
    }
  } catch (e) { /* non-fatal */ }

  // Merge images from payload (if provided as csv or array) with uploaded ones
  if (payload.images && typeof payload.images === 'string') {
    // allow comma separated list
    const list = payload.images.split(',').map(s => s.trim()).filter(Boolean);
    payload.images = Array.isArray(list) ? list : [];
  }
  payload.images = [...(payload.images || []), ...images];

  // Debug: log the parsed durationAndInclusions for visibility during development
  try {
    // eslint-disable-next-line no-console
    console.log('createPackage: durationAndInclusions =>', JSON.stringify(payload.durationAndInclusions));
    try {
      // log includes types
      const incs = payload.durationAndInclusions && payload.durationAndInclusions.includes;
      // eslint-disable-next-line no-console
      console.log('createPackage: includes typeof =>', typeof incs, Array.isArray(incs) ? incs.map(it => ({rawType: typeof it, sample: it && (typeof it === 'object' ? JSON.stringify(it) : String(it).slice(0,80))})) : incs);
    } catch (e) {}
  } catch (e) {}

  const created = await Package.create(payload);
  try {
    // eslint-disable-next-line no-console
    console.log('created.durationAndInclusions =>', JSON.stringify(created.durationAndInclusions));
  } catch (e) {}
  return res.status(201).json(new ResponseHandler(201, normalizePackageForResponse(created), "Package created successfully!"));
});

// Get all packages
export const getAllPackages = AsyncHandler(async (req, res) => {
  const packages = await Package.find();
  const normalized = (packages || []).map(normalizePackageForResponse);
  return res.status(200).json(new ResponseHandler(200, normalized, "Packages fetched successfully!"));
});

// Get packages indexed by lowercased location
export const getPackagesByLocation = AsyncHandler(async (req, res) => {
  const packages = await Package.find();
  const normalized = (packages || []).map(normalizePackageForResponse);
  const byLocation = {};
  normalized.forEach((pkg) => {
    const locRaw = (pkg && pkg.location) || '';
    const loc = String(locRaw).trim().toLowerCase();
    const key = loc || 'unknown';
    if (!byLocation[key]) byLocation[key] = [];
    byLocation[key].push(pkg);
  });
  return res.status(200).json(new ResponseHandler(200, byLocation, 'Packages indexed by location'));
});

// Get package by slug
export const getPackageBySlug = AsyncHandler(async (req, res) => {
  const { slug } = req.params;
  const pack = await Package.findOne({ slug });
  if (!pack) throw new ErrorHandler(404, "Package not found!");
  return res.status(200).json(new ResponseHandler(200, normalizePackageForResponse(pack), "Package fetched successfully!"));
});

// Update package by slug
export const updatePackage = AsyncHandler(async (req, res) => {
  const { slug } = req.params;
  const updates = { ...(req.body || {}) };

  // Handle uploaded images for update
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const key = `image${i}`;
    if (req.files && req.files[key] && req.files[key][0] && req.files[key][0].path) {
      const url = await uploadOnCloudinary(req.files[key][0].path);
      if (url) images.push(url);
    }
  }
  // Normalize JSON fields that may arrive as strings
  try {
    if (typeof updates.images === 'string' && updates.images.trim()) updates.images = JSON.parse(updates.images);
  } catch (e) { /* leave as-is if not JSON */ }
  try {
    if (typeof updates.removedImages === 'string' && updates.removedImages.trim()) updates.removedImages = JSON.parse(updates.removedImages);
  } catch (e) { /* ignore */ }

  // If images provided as comma-separated string (legacy), normalize
  if (typeof updates.images === 'string') {
    const list = updates.images.split(',').map(s => s.trim()).filter(Boolean);
    updates.images = list;
  }

  // Fetch existing package to compute final images array
  const existing = await Package.findOne({ slug });
  if (!existing) throw new ErrorHandler(404, "Package not found!");

  // Start with provided images array (explicit replace) or existing images
  let finalImages = Array.isArray(updates.images) ? updates.images.slice() : (Array.isArray(existing.images) ? existing.images.slice() : []);

  // Remove any explicitly removed images
  if (Array.isArray(updates.removedImages) && updates.removedImages.length) {
    finalImages = finalImages.filter(url => !updates.removedImages.includes(url));
  }

  // Append newly uploaded image URLs
  if (images.length) finalImages = [...finalImages, ...images];

  // Ensure we set updates.images to the computed final array
  updates.images = finalImages;

  // Remove helper fields from updates so they don't persist accidentally
  delete updates.removedImages;

  // Parse other JSON fields defensively
  try { if (typeof updates.itinerary === 'string' && updates.itinerary.trim()) updates.itinerary = deepParse(updates.itinerary); } catch (e) {}
  try { if (typeof updates.priceDetails === 'string' && updates.priceDetails.trim()) updates.priceDetails = deepParse(updates.priceDetails); } catch (e) {}
  try { if (typeof updates.additionalInfo === 'string' && updates.additionalInfo.trim()) updates.additionalInfo = deepParse(updates.additionalInfo); } catch (e) {}
  try { if (typeof updates.durationAndInclusions === 'string' && updates.durationAndInclusions.trim()) updates.durationAndInclusions = deepParse(updates.durationAndInclusions); } catch (e) {}
  try { if (typeof updates.durationAndInclusions === 'object') updates.durationAndInclusions = deepParse(updates.durationAndInclusions); } catch (e) {}

  // Debug + fallback for update: if user sent stringified nested includes, try parsing
  try {
    // eslint-disable-next-line no-console
    console.log('DBG update: raw type of req.body.durationAndInclusions =>', typeof (req.body && req.body.durationAndInclusions));
    // eslint-disable-next-line no-console
    console.log('DBG update: raw req.body.durationAndInclusions =>', req.body && req.body.durationAndInclusions);
  } catch (e) {}
  try {
    if (updates.durationAndInclusions && typeof updates.durationAndInclusions === 'object') {
      // nothing
    } else if (req.body && typeof req.body.durationAndInclusions === 'string') {
      let attempt = req.body.durationAndInclusions;
      for (let i = 0; i < 4; i++) {
        try { attempt = JSON.parse(attempt); } catch (e) { break; }
      }
      if (attempt && typeof attempt === 'object') {
        updates.durationAndInclusions = attempt;
        // eslint-disable-next-line no-console
        console.log('DBG update: fallback parsed durationAndInclusions =>', updates.durationAndInclusions);
      }
    }
  } catch (e) { /* ignore */ }
  try { if (typeof updates.contact === 'string' && updates.contact.trim()) updates.contact = deepParse(updates.contact); } catch (e) {}

  // Parse and normalize other list-like fields that may be sent as strings
  try { if (typeof updates.themes === 'string' && updates.themes.trim()) updates.themes = deepParse(updates.themes); } catch (e) {}
  try { if (typeof updates.tripHighlights === 'string' && updates.tripHighlights.trim()) updates.tripHighlights = deepParse(updates.tripHighlights); } catch (e) {}
  try { if (typeof updates.inclusions === 'string' && updates.inclusions.trim()) updates.inclusions = deepParse(updates.inclusions); } catch (e) {}
  try { if (typeof updates.exclusions === 'string' && updates.exclusions.trim()) updates.exclusions = deepParse(updates.exclusions); } catch (e) {}

  // Coerce list-like update fields to arrays of strings
  try {
    if (updates.themes !== undefined) updates.themes = ensureStringArray(updates.themes, ',');
    if (updates.tripHighlights !== undefined) updates.tripHighlights = ensureStringArray(updates.tripHighlights, '||');
    if (updates.inclusions !== undefined) updates.inclusions = ensureStringArray(updates.inclusions, ',');
    if (updates.exclusions !== undefined) updates.exclusions = ensureStringArray(updates.exclusions, ',');
  } catch (e) { /* ignore */ }

  // Ensure these lists are arrays of strings
  try {
    if (updates.themes && !Array.isArray(updates.themes)) {
      if (typeof updates.themes === 'string') {
        // try split commas
        updates.themes = updates.themes.split(',').map(s => String(s).trim()).filter(Boolean);
      } else updates.themes = [];
    } else if (Array.isArray(updates.themes)) {
      updates.themes = updates.themes.map(t => String(t || ''));
    }
  } catch (e) {}
  try {
    if (updates.tripHighlights && !Array.isArray(updates.tripHighlights)) {
      if (typeof updates.tripHighlights === 'string') {
        // try || split as fallback
        updates.tripHighlights = updates.tripHighlights.split('||').map(s => String(s).trim()).filter(Boolean);
      } else updates.tripHighlights = [];
    } else if (Array.isArray(updates.tripHighlights)) {
      updates.tripHighlights = updates.tripHighlights.map(t => String(t || ''));
    }
  } catch (e) {}
  try {
    if (updates.inclusions && !Array.isArray(updates.inclusions)) {
      if (typeof updates.inclusions === 'string') {
        updates.inclusions = updates.inclusions.split(',').map(s => String(s).trim()).filter(Boolean);
      } else updates.inclusions = [];
    } else if (Array.isArray(updates.inclusions)) {
      updates.inclusions = updates.inclusions.map(t => String(t || ''));
    }
  } catch (e) {}
  try {
    if (updates.exclusions && !Array.isArray(updates.exclusions)) {
      if (typeof updates.exclusions === 'string') {
        updates.exclusions = updates.exclusions.split(',').map(s => String(s).trim()).filter(Boolean);
      } else updates.exclusions = [];
    } else if (Array.isArray(updates.exclusions)) {
      updates.exclusions = updates.exclusions.map(t => String(t || ''));
    }
  } catch (e) {}

  // normalize includes inside durationAndInclusions for updates as well
  try {
    if (updates.durationAndInclusions && typeof updates.durationAndInclusions === 'object') {
      const d = updates.durationAndInclusions;
      // Handle stringified includes (double-encoded)
      try {
        if (typeof d.includes === 'string' && d.includes.trim()) {
          const parsedIncludes = deepParse(d.includes);
          if (Array.isArray(parsedIncludes)) d.includes = parsedIncludes;
        }
      } catch (e) { /* ignore */ }

      if (Array.isArray(d.includes)) {
        d.includes = d.includes.map((it) => {
          if (!it) return null;
          if (typeof it === 'string') {
            try {
              const parsed = JSON.parse(it);
              if (parsed && typeof parsed === 'object') return { label: parsed.label || String(parsed), icon: parsed.icon || '' };
            } catch (e) {}
            return { label: it, icon: '' };
          }
          if (typeof it === 'object') return { label: it.label || '', icon: it.icon || '' };
          return null;
        }).filter(Boolean);
      }
    }
  } catch (e) { /* non-fatal */ }

  // Coerce updates.durationAndInclusions fields to expected simple types
  try {
    if (updates.durationAndInclusions && typeof updates.durationAndInclusions === 'object') {
      const ud = updates.durationAndInclusions;
      ud.duration = ud.duration !== undefined && ud.duration !== null ? String(ud.duration) : '';
      ud.location = ud.location !== undefined && ud.location !== null ? String(ud.location) : '';
      if (!Array.isArray(ud.includes)) ud.includes = [];
      else ud.includes = ud.includes.map(i => ({ label: String(i.label || ''), icon: String(i.icon || '') }));
    }
  } catch (e) { /* non-fatal */ }

  const pack = await Package.findOneAndUpdate({ slug }, updates, { new: true });
  if (!pack) throw new ErrorHandler(404, "Package not found!");
  return res.status(200).json(new ResponseHandler(200, normalizePackageForResponse(pack), "Package updated successfully!"));
});

// Delete package by slug
export const deletePackage = AsyncHandler(async (req, res) => {
  const { slug } = req.params;
  const pack = await Package.findOne({ slug });
  if (!pack) throw new ErrorHandler(404, "Package not found!");
  await pack.deleteOne();
  return res.status(200).json(new ResponseHandler(200, null, "Package deleted successfully!"));
});

export default {
  createPackage,
  getAllPackages,
  getPackageBySlug,
  updatePackage,
  deletePackage,
};
