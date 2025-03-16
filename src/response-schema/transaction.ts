import z from "zod";

export const CreateTransactionAuthorizationOnlyResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});

export const CreateTransactionWithTokenResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});

export const CreateTransactionCaptureAfterAuthorizationSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});

export const CreateDirectTransactionResponseSchema = z.object({
   orderID: z.coerce.string(),
   transactionID: z.coerce.string(),
   responseMessage: z.coerce.string(),
   responseCode: z.literal(0),
});
