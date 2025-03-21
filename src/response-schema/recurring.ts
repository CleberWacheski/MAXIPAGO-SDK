import z from "zod";

export const CreateRecurringResponseSchema = z.object({
   responseCode: z.literal(0),
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.string(),
});

export const UpdateRecurringResponseSchema = z.object({
   errorCode: z.literal(0),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});

export const CancelRecurringResponseSchema = z.object({
   errorCode: z.literal(0),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});
