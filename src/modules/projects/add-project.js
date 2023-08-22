const Project = require('./Project');

const addProject = async (data) => {
  const result = await Project.create(data);

  return result;
};

module.exports = addProject;

