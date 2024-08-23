"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.authMiddleware = void 0;
const jwt_1 = require("../configs/jwt");
// check the token
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        res.status(401).json({ message: "Invalid token." });
        return;
    }
    req.user = decoded;
    next();
};
exports.authMiddleware = authMiddleware;
// auth the role
const auth = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Access denied. You don't have the required role.",
            });
            return;
        }
        next();
    };
};
exports.auth = auth;
