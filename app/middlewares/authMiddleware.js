const sessions = require('../../models/sessions')

module.exports = {
    authMiddleware :  async (req, res, next)=>{

    try{
        const sessId = req.cookies.SESSID
        const ssidValidation = await sessions.findOne({ sessId })
        if(!ssidValidation){
            res.redirect('/auth/login')
        } else {
            next()
        }
    } catch(error){
        res.status(401).json({error: "auth_failed"})
    }
   
},

loginMiddleware: async (req, res, next)=>{
    try{
        const sessId = req.cookies.SESSID
        const ssidValidation = await sessions.findOne({ sessId })
        if(ssidValidation){
            res.redirect('/chat')
        } else {
            next()
        }
    } catch(error){
        res.status(401).json({error: "auth_failed"})
    }
}
}