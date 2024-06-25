// Modules

// Helpers
import { responseCode } from "@/utils/responseCode";


export default function isInstructor(req, res, next) {
    try {
        if (req.user.account_type !== 'Instructor') {
            return res.status(responseCode.Unauthorized).json({
                success: false,
                message: 'Unauthorized Access'
            })
        }
        next();
    } catch (error) {
        return res.status(responseCode["Internal Server Error"]).json({
            success: false,
            message: 'Unable to Verify User Role',
        });
    }
}