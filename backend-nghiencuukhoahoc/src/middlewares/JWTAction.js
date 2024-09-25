require("dotenv").config();
var jwt = require("jsonwebtoken");

const nonSercurePaths = ["/", "/register", "/login", "/logout"];
const createJWT = (payload) => {
  let key = process.env.SECRETKEYADMIN;
  // console.log("create key", key);

  let token;
  try {
    token = jwt.sign(payload, key, { expiresIn: "5h" });
  } catch (e) {
    console.log("Error while creating JWT:", e);
  }

  return token;
};

const verifyToken = (token) => {
  let key = process.env.SECRETKEYADMIN;
  // console.log("key", key);
  // console.log("token", token);
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    console.log("Error while verifying JWT:", e);
  }

  return decoded;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = (req, res, next) => {
  if (nonSercurePaths.includes(req.path)) return next();
  let cookie = req.cookies;
  let tokenFromHeader = extractToken(req);
  // console.log("Cookie:", cookie);
  // console.log("Token from Header:", tokenFromHeader);

  if ((cookie && cookie.jwt) || tokenFromHeader) {
    let token = cookie && cookie.jwt ? cookie.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    // console.log("check decode: ", decoded);
    if (decoded) {
      req.user = decoded;
      req.token = token;

      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "không xác thực được user",
      });
    }
  } else {
    return res.status(402).json({
      EC: -1,
      DT: "",
      EM: "không thể xác thực được user này",
    });
  }
};

// const checkUserPermission = (req, res, next) => {
//   if (nonSercurePaths.includes(req.path) || req.path === "/account")
//     return next();
//   if (req.user) {
//     let email = req.user.email;
//     let roles = req.user.groupWithRoles.Roles;
//     let currentUrl = req.path;
//     if (!roles || roles.length === 0) {
//       return res.status(403).json({
//         EC: -1,
//         DT: "",
//         EM: "you dont have permission to access thuisss resourse",
//       });
//     }
//     let canAccess = roles.some(
//       (item) => item.url === currentUrl || currentUrl.includes(item.url)
//     );

//     console.log("check can access", canAccess);

//     if (canAccess === true) {
//       next();
//     } else {
//       return res.status(403).json({
//         EC: -1,
//         DT: "",
//         EM: "you dont have permission to access thuisaa resourse",
//       });
//     }
//   } else {
//     return res.status(401).json({
//       EC: -1,
//       DT: "",
//       EM: "not authenticated user",
//     });
//   }
// };

module.exports = {
  createJWT,
  verifyToken,
  checkUserJWT,

  //   checkUserPermission,
};
