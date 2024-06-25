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
                const { course_id } = req.query;

                const query = { _id: course_id };

                const courseDetails = await Course.find(query)
                    .populate({
                        path: 'instructor',
                        populate: {
                            path: 'additional_info'
                        }
                    })
                    .populate('category')
                    .populate({
                        path: 'course_content',
                        populate: {
                            path: 'sub_section'
                        }
                    })
                    .exec();

                if (!courseDetails) {
                    return res.status(responseCode["Not Found"]).json({
                        success: false,
                        message: `Unable to find Course Details with Course ID - ${course_id}`
                    });
                }

                return res.status(responseCode.OK).json({
                    success: true,
                    message: "Course Details Fetched Successfully",
                    course: courseDetails
                });

            } catch (error) {
                return res.status(responseCode['Internal Server Error']).json({
                    success: false,
                    message: "Unable to get course details. Please try after sometime"
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