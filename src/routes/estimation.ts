import { earlyEstimation, getCountOfEstimates } from "../controllers/estimation";

var express = require('express');

const router = express.Router();

router.post("/", earlyEstimation)

router.get("/count", getCountOfEstimates)

module.exports = router;
