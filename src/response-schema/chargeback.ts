import z from "zod";

export const ChargeBackResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.string(),
   responseCode: z.literal(0),
});
