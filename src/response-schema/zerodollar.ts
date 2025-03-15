import z from "zod";

export const CreateZeroDollarResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("VERIFIED"),
   responseCode: z.coerce.number(),
});

export const CreateZeroDollarWithTokenResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("VERIFIED"),
   responseCode: z.coerce.number(),
});
