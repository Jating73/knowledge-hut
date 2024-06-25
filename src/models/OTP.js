import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5, //The document will be automatically deleted after 5-minutes of its creation
    },
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP;