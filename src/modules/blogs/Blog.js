const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    pictures: {
      type: mongoose.SchemaTypes.String,
      default : false , 
    },
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    views: {
      type: mongoose.SchemaTypes.Number,
      default : 0
    },

    likes: {
      type: [mongoose.SchemaTypes.String],
      default: [],
    },
    comments: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
