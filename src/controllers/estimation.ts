import { EstimationModel } from "@naya_studio/schemas";
import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";

export async function earlyEstimation(req: Request, res: Response) {
  try {
    const { payload } = req.body;
    const response = await axios.post(
      "https://naya-early-estimation-tool-production-ybbseckska-ue.a.run.app/predict",
      payload
    );

    const estimation = new EstimationModel({
      ...payload,
      predictedPrice: response.data.predicted_price,
      priceRange: response.data.suggested_range,
    });
    estimation.save();
    return res.status(200).json({ response: response.data });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
