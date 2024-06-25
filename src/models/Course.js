import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        trim: true
    },
    course_description: {
        type: String,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    what_you_will_learn: {
        type: String
    },
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    course_content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    status: {
        type: String,
        enum: ["Draft", "Published"]
    },
    rating_and_review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    tag: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
    },
    students_enrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;