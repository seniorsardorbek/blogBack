const Comments = require('./Comments');

const listComments = async ({id}) => {
  const data = await Comments.find().where('blog' , id);

  return data;
};

module.exports = listComments;
