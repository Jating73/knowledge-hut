// Modules

// Models
import Course from "@/models/Course";

// Helpers
import { responseCode } from "@/utils/responseCode";
import applyMiddleware from '@/utils/middlewareWrapper';


async function handler(req, res) {
    switch (req.method) {
        case "GET": {

            try {

                const query = {};
                const options = {
                    course_name: true,
                    price: true,
                    thumbnail: true,
                    instructor: true,
                    rating_and_review: true,
                    students_enrolled: true,
                }

                const allCourses = await Course.find(query, options).populate('instructor').exec();

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "All Courses Fetched Successfully",
                    courses: allCourses
                });
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