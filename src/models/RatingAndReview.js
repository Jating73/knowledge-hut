import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
    },
    reviews: {
        type: String,
        required: true,
    }
});

const RatingAndReview = mongoose.models.RatingAndReview || mongoose.model('RatingAndReview', ratingAndReviewSchema);

export default RatingAndReview