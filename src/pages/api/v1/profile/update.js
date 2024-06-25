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

                const { date_of_birth = '', about = '', contact_no, gender = '' } = req.body;

                const userId = req.user.id;

                const user = await User.findById(userId);

                if (!user) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        message: "User Not Found"
                    });
                }

                const profile = await Profile.findById(user.additional_info);

                profile.date_of_birth = date_of_birth;
                profile.about = about;
                profile.contact_no = contact_no;
                profile.gender = gender;

                await profile.save();

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "Profile Updated Successfully",
                    profile
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to update profile details. Please try after sometime"
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