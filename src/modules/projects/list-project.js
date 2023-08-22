const Project = require('./Project');

const listProjects = async () => {
  const Projects = await Project.find();

  return Projects;
};

module.exports = listProjects;
