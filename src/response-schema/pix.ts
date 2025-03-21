import z from "zod";

export const CreatePixResponseSchema = z.object({
   responseCode: z.literal(0),
   authCode: z.coerce.string(),
   orderID: z.coerce.string(),
   referenceNumber: z.coerce.string(),
   transactionID: z.coerce.string(),
   transactionTimestamp: z.coerce.string(),
   responseMessage: z.coerce.string(),
   avsResponseCode: z.coerce.string(),
   cvvResponseCode: z.coerce.string(),
   processorCode: z.coerce.string(),
   processorMessage: z.coerce.string(),
   processorName: z.coerce.string(),
   errorMessage: z.coerce.string().optional(),
   processorTransactionID: z.coerce.string(),
   processorReferenceNumber: z.coerce.string(),
   onlineDebitUrl: z.coerce.string(),
   emv: z.coerce.string(),
   imagem_base64: z.coerce.string(),
});
