import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    section_name: {
        type: String,
    },
    sub_section: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SubSection",
        }
    ],
});

const Section = mongoose.models.Section || mongoose.model('Section', sectionSchema);

export default Section;
