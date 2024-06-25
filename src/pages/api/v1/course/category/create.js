// Models
import Category from "@/models/Category";

// Middleware
import auth from "@/middleware/auth";
import isAdmin from "@/middleware/admin";

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";


async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const { name, description = "" } = req.body;

                if (!name) {
                    return res.status(responseCode["Bad Request"]).json({
                        success: false,
                        message: 'All fields are required'
                    })
                }

                const CategoryDetails = await Category.create({
                    name: name,
                    description: description,
                });

                return res.status(responseCode.OK).json({
                    success: true,
                    message: 'Category Created Successfully',
                });
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to create category. Please try after sometime"
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

export default applyMiddleware([auth, isAdmin], handler);