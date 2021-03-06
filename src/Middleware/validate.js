const respon = require('../Helpers/respon')
const jwt = require('jsonwebtoken')
const logger = require('../Configs/winston')

const checkToken = (role)=>{
    return function(req, res, next){
        const {authtoken} = req.headers
        let isAccess = false;

    if(!authtoken){
        const result ={
            msg: "Login dulu"
        }
        
        return respon(res, 401, result)
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode)=>{
        if(err){
            return respon(res, 401, err)
        }
        role.map(value =>{
            if (value == decode.role){
                isAccess = true
            }
        })
        if(isAccess){
            next()
        }else{
            logger.info("Get data was rejected cause not your role ", isAccess)
            return respon(res, 401, {msg: "not your role"})
        }
        
    })
    }
}

module.exports = checkToken