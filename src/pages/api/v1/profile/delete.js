// Models
import User from "@/models/User";
import Profile from "@/models/Profile";

// Middleware
import auth from "@/middleware/auth";

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";


async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const userId = req.user.id;

                const userDetails = await User.findById(userId).exec();

                if (!userDetails) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        message: "User Not Found"
                    });
                }

                await Profile.findByIdAndDelete(userDetails.additional_info);
                await User.findByIdAndDelete(userId);

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "User Account Deleted Successfully"
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to delete user. Please try after sometime"
                });
            }
            break;
        }
        default: {
            return res.status(responseCode["Method Not Allowed"]).json({
                success: false,
                message: "Method not allowed"
            });
        }
    }
}

export default applyMiddleware([auth], handler);