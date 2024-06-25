// Modules
import { verify } from "jsonwebtoken";

// Helpers
import { responseCode } from "@/utils/responseCode";


export default function auth(req, res, next) {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.headers.authorization && req.headers.authorization.replace('Bearer ', '');

        if (!token) {
            return res.status(responseCode.Unauthorized).json({
                success: false,
                message: "Token is Missing"
            });
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            return res.status(responseCode.Unauthorized).json({
                success: false,
                message: "Invalid Token"
            });
        }

        next();

    } catch (error) {
        return res.status(responseCode["Internal Server Error"]).json({
            success: false,
            message: 'Something Went Wrong While Verifying Token!',
        });
    }
}