const express = require("express")
const router = express.Router();

const { getAllData , getDataById } = require("../Controller/Data")

router.route('/').get(getAllData);

router.get("/:id", getDataById);

module.exports = router;