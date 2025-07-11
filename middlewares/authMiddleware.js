import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decodedToken; // Attach user info in request so other middlewars (controllers, routers or middleware can access it)
    next();
  });
};

export default requireAuth;
