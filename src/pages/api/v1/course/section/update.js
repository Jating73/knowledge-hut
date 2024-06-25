// Models
import Section from "@/models/Section";

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

                const { section_name, section_id } = req.body;

                if (!section_name || !section_id) {
                    return res.status(responseCode["Bad Request"]).json({
                        success: false,
                        message: 'Provide all details'
                    });
                }

                const section = await Section.findByIdAndUpdate(section_id, { section_name }, { new: true });
                return res.status(responseCode.OK).json({
                    success: true,
                    message: "Section Updated Successfully",
                    section,
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