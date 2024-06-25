import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    time_duration: {
        type: String,
    },
    description: {
        type: String,
    },
    video_url: {
        type: String,
    },
});

const SubSection = mongoose.models.SubSection || mongoose.model('SubSection', subSectionSchema);

export default SubSection;