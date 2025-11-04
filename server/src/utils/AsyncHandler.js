function AsyncHandler(requestInstance){
    return function(req, res, next){
        Promise
        .resolve(requestInstance(req, res, next))
        .catch(function(error){
            return next(error)
        })
    }
}

export default AsyncHandler