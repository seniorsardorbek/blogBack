const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    blog: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Blog",
    } 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
