const express = require("express");
const db = require("./db");
const config = require("./shared/config");
const handleError = require("./shared/errors/handle");
const usersRoute = require("./modules/users/_api");
const blogRoute = require("./modules/blogs/_api");
const commentRoute = require("./modules/comments/_api");
const cors = require('cors')

const app = express();
const upload = require("express-fileupload");
app.use(express.urlencoded({ extended: true }));
app.use(upload())
app.use(express.json());
app.use(cors())
app.use(usersRoute);
app.use(blogRoute);
app.use(commentRoute);
app.use(express.static(process.cwd() + "/uploads/"))
app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
