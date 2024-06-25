// Models
import User from "@/models/User";

// Middleware
import auth from "@/middleware/auth";

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";

async function handler(req, res) {
    switch (req.method) {
        case "GET": {

            try {

                const userId = req.user.id;

                const userDetails = await User.findById(userId).populate('additional_info').exec();

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "All Courses Fetched Successfully",
                    user: userDetails
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to get user details. Please try after sometime"
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