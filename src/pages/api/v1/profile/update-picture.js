// Models
import User from "@/models/User";

// Middleware
import auth from "@/middleware/auth";

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";
import { uploadImageToCloudinary } from "@/utils/helper";

async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const displayPicture = req.files.display_picture;
                const userId = req.user.id;

                const image = await uploadImageToCloudinary(
                    displayPicture,
                    process.env.FOLDER_NAME,
                    1000,
                    1000
                )
                const updatedProfile = await User.findByIdAndUpdate(
                    { _id: userId },
                    { image: image.secure_url },
                    { new: true }
                )

                delete updatedProfile.password;

                return res.status(responseCode.OK).json({
                    success: true,
                    message: `Image Updated Successfully`,
                    data: updatedProfile,
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to get user courses. Please try after sometime"
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