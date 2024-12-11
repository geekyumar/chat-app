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
},

    socketMiddleware: async (socket, next) => {
    try {
        // Replace 'hvhkhkflhffu' with the real session ID from the client
        const sessId = socket.handshake.auth.sessId; // Pass sessId during handshake
        if (!sessId) {
            return next(new Error('Unauthorized: Token is missing'));
        }

        const session = await sessions.findOne({ sessId });
        if (!session) {
            return next(new Error('Unauthorized: Session invalid'));
        }

        const decoded = jwt.verify(session.jwtToken, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error('Unauthorized: Invalid token'));
        }

        // Attach user info to the socket
        socket.user = decoded;
        next(); // Proceed to the next middleware or connection handler
    } catch (error) {
        next(new Error('Unauthorized: ' + error.message));
    }
}
}