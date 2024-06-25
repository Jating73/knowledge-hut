// Modules
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Models
import User from '@/models/User';
import Profile from '@/models/Profile';

// Helpers
import { responseCode } from "@/utils/responseCode";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const { first_name, last_name, email, password, confirm_password, account_type } = req.body;

                if (!first_name || !last_name || !email || !password || !confirm_password) {
                    return res.status(responseCode['Bad Request']).json({
                        success: false,
                        message: "Please provide all details"
                    });
                }

                if (password != confirm_password) {
                    return res.status(responseCode['Bad Request']).json({
                        success: false,
                        message: "Password's don't match"
                    });
                }

                const userQuery = { email }
                const existingUser = await User.findOne(userQuery);

                if (existingUser) {
                    return res.status(responseCode['Bad Gateway']).json({
                        success: false,
                        message: "User Already Exists"
                    });
                }

                const hashedPassword = await hash(password, 12);

                const profileObj = {
                    gender: null,
                    date_of_birth: null,
                    about: null,
                    contact_no: null,
                };

                const profileDetails = await Profile.create(profileObj);

                const userObj = {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                    additional_info: profileDetails._id,
                    account_type: account_type,
                    image: `https://api.dicebear.com/5.x/initials/svg?seed=${first_name} ${last_name}`,
                };
                const userDetails = await User.create(userObj);

                delete userDetails.password;

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "User Registered Successfully",
                    user: userDetails
                });

            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "User can't be registered. Please try after sometime"
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