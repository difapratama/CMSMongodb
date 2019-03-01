var jwt = require('jsonwebtoken');

module.exports = {
    token: (req, res, next) => {

        var token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, 'this is secret', (err, decoded) => {
                console.log(err);
                
                if (err) {
                    return res.json({
                        valid: false,
                        message: 'token tidak sesuai'
                    })
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            return res.status(403).send({
                valid: false,
                message: 'token tidak tersedia'
            })
        }
    }
}