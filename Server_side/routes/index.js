// backend/user/index.js
const express = require("express");
const userRouter = require("./Patient");
// const accountRouter = require("./account");
const hospitalRouter = require("./hospital");
const router = express.Router();



router.use("/patient", userRouter);
router.use("/hospital", hospitalRouter);
// router.use("/account", accountRouter);

module.exports = router;
