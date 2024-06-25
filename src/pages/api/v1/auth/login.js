// Modules
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Models
import User from '@/models/User';

// Helpers
import { responseCode } from "@/utils/responseCode";


export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(responseCode["Bad Request"]).json({
                        success: false,
                        message: "Please provide all details"
                    });
                }

                const user = await User.findOne({email}).populate('additional_info');
                if(!user) {
                    return res.status(responseCode.Unauthorized).json({
                        success: false,
                        message: `User is not registered with Us, Please signup to Continue`,
                    });
                }

                if (await compare(password, user.password)) {

                    const payload = {
                        email: user.email,
                        account_type: user.account_type,
                        id: user._id
                    };
                    const secret = process.env.JWT_SECRET;
                    const options = {
                        expiresIn: '1h'
                    }

                    const token = sign(payload, secret, options);

                    delete user.password;

                    return res.status(responseCode.OK).json({
                        success: true,
                        message: "User Login Successfully",
                        token,
                        user,
                    });

                } else {
                    return res.status(responseCode.Unauthorized).json({
                        success: false,
                        message: "Incorrect Password"
                    });
                }
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Login Failed, Please try after sometime"
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