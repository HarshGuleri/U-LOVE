const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // { id, email }
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
};
