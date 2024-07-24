const express = require("express")
const router = express.Router();

const {getAllData} = require("../Controller/Data")

router.route('/').get(getAllData);

module.exports = router;