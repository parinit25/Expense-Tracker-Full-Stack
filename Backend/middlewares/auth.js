const jwt = require("jsonwebtoken");
// Validating Access Token For Each Request //

exports.validateAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json(new ApiError(401, "Access Token Missing", null));
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(new ApiError(403, "Forbidden", null));
    }
    req.user = user;
    next();
  });
};
