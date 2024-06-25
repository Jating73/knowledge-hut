// Models
import Category from "@/models/Category";

// Middleware

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";


async function handler(req, res) {
    switch (req.method) {
        case "GET": {

            try {

                const allCategories = await Category.find(
                    {},
                    { name: true, description: true }
                );
                return res.status(responseCode.OK).json({
                    success: true,
                    message: "All Categories fetched successfully",
                    data: allCategories,
                })
            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to get categories. Please try after sometime"
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

export default applyMiddleware([], handler);