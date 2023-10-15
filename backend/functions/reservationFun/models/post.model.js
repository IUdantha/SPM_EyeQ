// post.model.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  myFile: String,
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
