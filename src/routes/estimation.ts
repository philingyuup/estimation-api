import { earlyEstimation, getCountOfEstimates } from "../controllers/estimation";

var express = require('express');

const router = express.Router();

router.post("/", earlyEstimation)

router.get("/all", getCountOfEstimates)

module.exports = router;
