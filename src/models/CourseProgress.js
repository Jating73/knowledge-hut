import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.SchemaType.Types.ObjectId,
        ref: "Course",
    },
    completed_videos: [
        {
            type: mongoose.SchemaType.Types.ObjectId,
            ref: "SubSection"
        }
    ]
});

const CourseProgress = mongoose.models.CourseProgress || mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress