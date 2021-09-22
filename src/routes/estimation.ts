import { earlyEstimation, getCountOfEstimates, editEstimate } from "../controllers/estimation";

var express = require('express');

const router = express.Router();

router.post("/", earlyEstimation)

router.put("/", editEstimate)

router.get("/count", getCountOfEstimates)

module.exports = router;
