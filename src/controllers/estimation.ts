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
    
    const range = parseInt(response.data.suggested_range.substring(4, 9))

    const maxPrice = Math.ceil(parseInt(response.data.predicted_price.substring(1)) * (1 + range/100))
    const minPrice = Math.ceil(parseInt(response.data.predicted_price.substring(1)) * (1 - range/100))
   
    const estimation = new EstimationModel({
      ...payload,
      predictedPrice: Math.ceil(response.data.predicted_price.substring(1)),
      priceRange: range,
      maxPrice : maxPrice,
      minPrice : minPrice
    });
    estimation.save();

    return res.status(200).json({ response: estimation });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}
