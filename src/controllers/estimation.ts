import { EstimationModel } from "@naya_studio/schemas";
import axios from "axios";
import { Request, Response } from "express";
import { findEstimatedPriceAtQuantity } from "../utilities/linearFormula";

export async function earlyEstimation(req: Request, res: Response) {
  try {
    const { payload } = req.body;

    const quantity = payload.quantity

    if (!quantity || quantity < 1)
      throw new Error('Must include a quantity of at least 1 to estimate')

    // fetches the responses
    const quantities = [1, 100]
    const promiseList = quantities.map(quantity => axios.post("https://naya-early-estimation-tool-production-ybbseckska-ue.a.run.app/predict", {
      ...payload,
      quantity
    }))
    const [response1, response100] = await Promise.all(promiseList)
    
    // finds the pricing for quantity of 1
    const range1 = parseInt(response1.data.suggested_range.substring(4, 9))
    const maxPrice1 = Math.ceil(parseInt(response1.data.predicted_price.substring(1)) * (1 + range1/100))
    const minPrice1 = Math.ceil(parseInt(response1.data.predicted_price.substring(1)) * (1 - range1/100))
    const predictedPrice1 = response1.data.predicted_price.substring(1)

    // finds the pricing for quantity of 100
    const range100 = parseInt(response100.data.suggested_range.substring(4, 9))
    const maxPrice100 = Math.ceil(parseInt(response100.data.predicted_price.substring(1)) * (1 + range100 / 100))
    const minPrice100 = Math.ceil(parseInt(response100.data.predicted_price.substring(1)) * (1 - range100 / 100))
    const predictedPrice100 = response100.data.predicted_price.substring(1)

    // calculated pricing based on previous responses
    const calculatedPrice = findEstimatedPriceAtQuantity(predictedPrice1, predictedPrice100, quantity)
    const calculatedMin = findEstimatedPriceAtQuantity(minPrice1, minPrice100, quantity)
    const calculatedMax = findEstimatedPriceAtQuantity(maxPrice1, maxPrice100, quantity)

    // Needed for frontend display
    const responseEstimation = {
      predictedPrice: calculatedPrice,
      maxPrice: calculatedMax,
      minPrice: calculatedMin
    }

    // TODO: NEED TO CHANGE SCHEMA AND FINISH
    const estimation = new EstimationModel({
      ...payload,
      ...responseEstimation,
      priceRange: range1,
    });
    estimation.save();

    return res.status(200).json({ response: estimation });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}


export async function getCountOfEstimates(req : Request, res : Response){
  try {

    const count = await EstimationModel.find().count()
    return res.status(200).json({count : count})
    
  } catch (error : any) {
    return res.status(400).json({error : error.message})
  }
}

export async function editEstimate(req : Request, res : Response) {
  try {
    const {estimateId, update} = req.body.payload
    const estimate = await EstimationModel.findByIdAndUpdate(estimateId, update, {new : true})
    return res.status(200).json({payload : estimate})
  } catch (error : any) {
    return res.status(400).json({error : error.message})
    
  }
}