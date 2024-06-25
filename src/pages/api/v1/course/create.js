// Modules

// Models
import User from "@/models/User";
import Category from "@/models/Category";
import Course from "@/models/Course";

// Middlewares
import isInstructor from '@/middleware/instructor';
import auth from '@/middleware/auth';

// Helpers
import { responseCode } from "@/utils/responseCode";
import applyMiddleware from '@/utils/middlewareWrapper';
import { uploadImageToCloudinary } from "@/utils/helper";

async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const userId = req.user.id;

                const {
                    course_name,
                    course_description,
                    what_you_will_learn,
                    price,
                    tag,
                    category,
                    status,
                    instructions
                } = req.body;

                const thumbnail = req.files.thumbnailImage;

                if (
                    !course_name ||
                    !course_description ||
                    !what_you_will_learn ||
                    !price ||
                    !tag ||
                    !thumbnail ||
                    !category
                ) {
                    return res.status(responseCode["Bad Request"]).json({
                        success: false,
                        message: 'All Filds are mandatory',
                    });
                }

                if (!status || status === undefined) {
                    status = "Draft";
                }

                const instructorDetails = await User.findById(userId, {
                    account_type: "Instructor",
                });

                if (!instructorDetails) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        Message: 'Instructor Details Not Found',
                    });
                }

                const categoryDetails = await Category.findById(category);
                if (!categoryDetails) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        message: 'Category Details Not Found',
                    })
                }

                const thumbnailImage = await uploadImageToCloudinary(
                    thumbnail,
                    process.env.FOLDER_NAME
                );

                const newCourse = await Course.create({
                    course_name,
                    course_description,
                    instructor: instructorDetails._id,
                    what_you_will_learn,
                    price,
                    tag: tag,
                    category: categoryDetails._id,
                    thumbnail: thumbnailImage.secure_url,
                    status: status,
                    instructions: instructions,
                });

                await User.findByIdAndUpdate(

                    { _id: instructorDetails._id },
                    {
                        $push: {
                            courses: newCourse._id,
                        }
                    },
                    { new: true },
                );

                await Category.findByIdAndUpdate(
                    { _id: category },
                    {
                        $push: {
                            course: newCourse._id,
                        },
                    },
                    { new: true }
                );

                return res.status(responseCode.OK).json({
                    success: true,
                    data: newCourse,
                    message: "Course Created Successfully",
                });

            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to create course. Please try after sometime"
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

export default applyMiddleware([auth, isInstructor], handler)