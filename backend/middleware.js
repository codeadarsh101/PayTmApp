const jwt = require("jsonwebtoken");
const  JWT_SECRET  = require("./config.js");


// build my own middleware..
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  //check the auth Header is present or correct 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Unauthorized: Invalid token",
    });
  }
};

module.exports = {
  authMiddleware,
};
