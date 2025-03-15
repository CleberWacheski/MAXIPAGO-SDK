import z from "zod";

export const CreateRecurringResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("APPROVED"),
   responseCode: z.coerce.number(),
});

export const UpdateRecurringResponseSchema = z.object({
   errorCode: z.coerce.number(),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});

export const CancelRecurringResponseSchema = z.object({
   errorCode: z.coerce.number(),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});
