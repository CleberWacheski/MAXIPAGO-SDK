import z from "zod";

export const CreateCustomerResponseSchema = z.object({
   errorCode: z.literal(0),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
   result: z.object({
      customerId: z.coerce.string(),
   }),
});

export const UpdateCustomerResponseSchema = z.object({
   errorCode: z.literal(0),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});

export const DeleteCustomerResponseSchema = z.object({
   errorCode: z.literal(0),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});
