import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(403).json({ message: "No Token Provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate" });
    }
    req.user = decoded.user; //attach decoded user to the request object
    next();
  });
};

export default authenticateToken;
