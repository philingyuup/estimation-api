import { earlyEstimation } from "../controllers/estimation";

var express = require('express');

const router = express.Router();

router.post("/", earlyEstimation)

module.exports = router;
