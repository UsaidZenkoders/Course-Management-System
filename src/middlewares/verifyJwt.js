const jwt=require("jsonwebtoken")
const verifyJwt = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: err});
      req.user = user;
      next();
    });
  };
  const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role==='admin') {
      return next();
    }
    res.status(403).json({ message: 'Admin access required' });
  };
  module.exports={verifyJwt,checkAdmin}