module.exports = function (req, res, next){
    if(!req.user.isAdmin){
        if(
            // (req.method === 'POST' || req.method === 'DELETE') && 
        req.baseUrl === '/api/categories'){
            return res.status(403).send({
                message:`Access denied! Admin can ${req.method === 'PUT' ? 'Update' : req.method} the categories`,
                error: true,
                data: []
            })
        }
        else{
            next();
        }
    }
    else{
        next();
    }
}