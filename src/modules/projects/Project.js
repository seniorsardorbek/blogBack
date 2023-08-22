const { default: mongoose } = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    description: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    link: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    pictures: {
      type: mongoose.SchemaTypes.String,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
