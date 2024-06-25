// Modules
import { hash } from 'bcrypt';

// Models
import User from '@/models/User';

// Helpers
import { responseCode } from "@/utils/responseCode";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const { password, confirm_password, token } = req.body;

                if (password != confirm_password) {
                    return res.status(responseCode['Bad Request']).json({
                        success: false,
                        message: "Passwords Don't Match"
                    });
                }

                const userQuery = { token };
                const userDetails = await User.findOne(userQuery);

                if (!userDetails) {
                    return res.status(responseCode['Bad Request']).json({
                        success: false,
                        message: "Invalid Token"
                    });
                }

                if (userDetails.reset_password_expire < Date.now()) {
                    return res.status().json({
                        success: false,
                        message: "Token is expired, Please regenerate your token"
                    });
                }

                const hashedPassword = await hash(password, 12);

                await User.findOneAndUpdate(userQuery,
                    { password: hashedPassword },
                    { new: true }
                );

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "Password Updated Successfully"
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to reset password. Please try after sometime"
                });
            }
        }
        default: {
            return res.status(responseCode["Method Not Allowed"]).json({
                success: false,
                message: "Method not allowed"
            });
        }
    }
}