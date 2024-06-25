// Modules
import crypto from 'crypto';

// Models
import User from '@/models/User';

// Helpers
import { responseCode } from "@/utils/responseCode";
import { sendEmail } from '@/utils/helper';

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const { email } = req.body;

                const userQuery = { email };
                const userDetails = await User.findOne(userQuery);

                if (!userDetails) {
                    return res.status(responseCode['Bad Request']).json({
                        success: false,
                        message: `The entered email ${email} is not registered with us.`
                    });
                }

                const token = crypto.randomBytes(20).toString('hex');

                const updatedUserDetails = await User.findOneAndUpdate(userQuery,
                    {
                        token: token,
                        reset_password_expire: Date.now() + 3600000,
                    },
                    {
                        new: true
                    }
                )

                const link = `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

                sendEmail(updatedUserDetails.email, 'Password Reset Link',
                    `Please use this link ${link} to reset your password`
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