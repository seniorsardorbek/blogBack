const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const { getComments, postComments, deleteComment } = require("./_controllers");

const router = express.Router();

router.get("/comments/:id", isLoggedIn, getComments);
router.post("/comments/:id", isLoggedIn, postComments);
router.delete("/comments/:id", isLoggedIn, deleteComment);

module.exports = router;
