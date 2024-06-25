// Modules

// Models
import Category from "@/models/Category";

// Helpers
import { responseCode } from "@/utils/responseCode";
import applyMiddleware from '@/utils/middlewareWrapper';



async function handler(req, res) {
    switch (req.method) {
        case "GET": {

            try {

                const { category_id } = req.query;

                const selectedCategory = await Category.findById(categoryId)
                    .populate("courses")
                    .exec();

                if (!selectedCategory) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        message: "Data Not Found",
                    });
                }

                const differentCategories = await Category.find({
                    _id: { $ne: categoryId },
                })
                    .populate("courses")
                    .exec();

                return res.status(responseCode.OK).json({
                    success: true,
                    data: {
                        selected_category: selectedCategory,
                        different_category: differentCategories,
                    }
                })

            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to get all courses. Please try after sometime",
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

export default applyMiddleware([], handler)