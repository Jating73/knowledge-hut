import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contact_no: {
        type: Number,
        trim: true
    }
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;