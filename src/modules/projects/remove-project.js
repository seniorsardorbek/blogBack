const { NotFoundError } = require('../../shared/errors');
const Project = require('./Project');

const removeProject = async ({ id }) => {
  const existing = await Project.findById(id);

  if (!existing) {
    throw new NotFoundError('Project is not found!');
  }

  return Project.findByIdAndRemove(id);
};

module.exports = removeProject;
