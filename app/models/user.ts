import mongoose, {Schema} from "mongoose";

const user = new Schema({
    amount: Number,
    fullName: String,
    userName: String,
});

const User = mongoose.models.User || mongoose.model("User", user);

export default User;