// Models
import Section from "@/models/Section";
import Course from "@/models/Course";

// Middleware
import auth from "@/middleware/auth";
import isInstructor from "@/middleware/instructor";

// Helper
import applyMiddleware from "@/utils/middlewareWrapper";
import { responseCode } from "@/utils/responseCode";


async function handler(req, res) {
    switch (req.method) {
        case "POST": {

            try {

                const { section_name, course_id } = req.body;
                if (!section_name || !course_id) {
                    return res.status(400).json({
                        success: false,
                        message: 'Missing required properties'
                    });
                }

                const newSection = await Section.create({ section_name });

                const updatedCourseDetails = await Course.findByIdAndUpdate(
                    course_id,
                    {
                        $push: {
                            course_content: newSection._id,
                        }
                    },
                    { new: true },
                )
                    .populate({
                        path: "course_content",
                        populate: {
                            path: "sub_section",
                        },
                    })
                    .exec();

                return res.status(responseCode.OK).json({
                    success: true,
                    message: 'Section Created Successfully',
                    updatedCourseDetails,
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

export default applyMiddleware([auth, isInstructor], handler);