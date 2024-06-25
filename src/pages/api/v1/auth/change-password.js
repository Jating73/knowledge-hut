// Modules
import { compare } from 'bcrypt';

// Models
import User from '@/models/User';

// Helpers
import { responseCode } from "@/utils/responseCode";
import { sendEmail } from '@/utils/helper';
import auth from '@/middleware/auth';
import applyMiddleware from '@/utils/middlewareWrapper';


async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {
                const { old_password, new_password } = req.body;

                const userDetails = await User.findById(req.user.id);

                const isPasswordMatch = await compare(old_password, userDetails.password);

                if (!isPasswordMatch) {
                    return res.status(responseCode.Unauthorized).json({
                        success: false,
                        message: "Incorrect Password"
                    });
                }

                const hashedPassword = await hash(new_password, 12);

                const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
                    {
                        password: hashedPassword
                    },
                    {
                        new: true
                    }
                );

                sendEmail(updatedUserDetails.email,
                    `Password Updated Successfully for ${updatedUserDetails.first_name} ${updatedUserDetails.last_name}`,
                    passwordUpdated(
                        updatedUserDetails.email,
                        updatedUserDetails.first_name
                    )
                );

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "Password Updated Successfully"
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to change password. Please try after sometime"
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

export default applyMiddleware([auth], handler)