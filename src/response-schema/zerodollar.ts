import z from "zod";

export const CreateZeroDollarResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});

export const CreateZeroDollarWithTokenResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});
