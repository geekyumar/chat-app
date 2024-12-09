const sessions = require('../../models/sessions')
const jwt = require('jsonwebtoken')

module.exports = {
    authMiddleware :  async (req, res, next)=>{

        try {
            const sessId = req.cookies.SESSID;
            if (!sessId) {
                return res.redirect('/auth/login');
            }
        
            const ssidValidation = await sessions.findOne({ sessId });
            if (!ssidValidation) {
                return res.redirect('/auth/login');
            }
        
            const verified = jwt.verify(ssidValidation.jwtToken, process.env.JWT_SECRET);
            if (!verified) {
                return res.redirect('/auth/login');
            }
        
            next()
        } catch (error) {
            res.status(401).json({ error: "auth_failed: " + error.message });
        }
   
},

loginMiddleware: async (req, res, next)=>{
    try{
        const sessId = req.cookies.SESSID;
        if (sessId) {
            const ssidValidation = await sessions.findOne({ sessId });
            if (ssidValidation) {
                return res.redirect('/chat');
            }
        }
        next()

    } catch(error){
        return res.status(401).json({error: "auth_failed"})
    }
}
}