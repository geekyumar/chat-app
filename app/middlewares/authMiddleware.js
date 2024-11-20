const sessions = require('../../models/sessions')

const authMiddleware =  async (req, res, next)=>{

    try{
        const sessId = req.cookies.SESSID
        const ssidValidation = await sessions.findOne({ sessId })
        if(!ssidValidation){
            res.redirect('/auth/login')
        }
        next()
    } catch(error){
        res.status(401).json({error: "auth_failed"})
    }
   
}

module.exports = authMiddleware