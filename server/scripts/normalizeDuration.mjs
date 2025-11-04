import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../src/database/db.connect.js';
import Package from '../src/models/package.model.js';

dotenv.config();

async function tryParse(v) {
  if (v === undefined || v === null) return v;
  if (typeof v === 'object') return v;
  if (typeof v !== 'string') return v;
  let s = v.trim();
  if (!s) return s;
  try { s = s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); } catch (e) {}
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) s = s.slice(1, -1);
  try { return JSON.parse(s); } catch (e) { return v; }
}

async function normalizeIncludesArray(arr) {
  if (!arr) return [];
  const out = [];
  if (!Array.isArray(arr)) return out;
  for (const it of arr) {
    if (!it) continue;
    if (typeof it === 'string') {
      const p = await tryParse(it);
      if (Array.isArray(p)) { p.forEach(x => out.push(String(x))); continue; }
      if (p && typeof p === 'object') { out.push({ label: String(p.label || ''), icon: String(p.icon || '') }); continue; }
      out.push({ label: String(it), icon: '' });
    } else if (typeof it === 'object') {
      out.push({ label: String(it.label || ''), icon: String(it.icon || '') });
    } else {
      out.push({ label: String(it), icon: '' });
    }
  }
  return out.filter(Boolean);
}

async function run() {
  try {
    await connectDB();
    const packages = await Package.find();
    console.log(`Found ${packages.length} packages`);
    let updated = 0;
    for (const pkg of packages) {
      let changed = false;
      let dai = pkg.durationAndInclusions;
      const parsed = await tryParse(dai);
      if (typeof parsed === 'string' || typeof dai === 'string') {
        // parsed is string -> try JSON parse
        try {
          dai = JSON.parse(parsed);
        } catch (e) {
          // leave
        }
      } else if (parsed && typeof parsed === 'object') {
        dai = parsed;
      }

      if (dai && typeof dai === 'object') {
        // normalize duration & location
        const nd = {};
        nd.duration = dai.duration ? String(dai.duration) : '';
        nd.location = dai.location ? String(dai.location) : '';
        nd.includes = await normalizeIncludesArray(dai.includes);

        // check if different
        const same = JSON.stringify(pkg.durationAndInclusions) === JSON.stringify(nd);
        if (!same) {
          pkg.durationAndInclusions = nd;
          await pkg.save();
          updated++;
          changed = true;
        }
      }

      if (!changed) {
        // nothing
      }
    }
    console.log(`Updated ${updated} packages`);
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
  }
}

run();
