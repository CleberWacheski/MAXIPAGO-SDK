import z from "zod";

export const CreateTransactionAuthorizationOnlyResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("AUTHORIZED"),
   responseCode: z.coerce.number(),
});

export const CreateTransactionWithTokenResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("CAPTURED"),
   responseCode: z.coerce.number(),
});

export const CreateTransactionCaptureAfterAuthorizationSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("CAPTURED"),
   responseCode: z.coerce.number(),
});

export const CreateDirectTransactionResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.literal("CAPTURED"),
   responseCode: z.coerce.number(),
});
