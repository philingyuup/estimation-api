/**
 * Uses the slope-intercept formula (y=mx+b) between prices at quantity 1 and quantity 100, to calculate a price for a certain quantity
 * @param priceAt1 - price of fabrication when quantity is 1
 * @param priceAt100 - price of fabrication when quantity is 100
 * @param quantity - total quantity
 * @returns The estimated price for 1 unit (when ordering quantity)
 */
const findEstimatedPriceAtQuantity = (priceAt1: number, priceAt100: number, quantity: number) => ((priceAt100 - priceAt1) / 99) * (quantity - 1) + priceAt1