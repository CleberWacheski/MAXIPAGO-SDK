import z from "zod";

export const CreateCardResponseSchema = z.object({
   errorCode: z.coerce.number(),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
   result: z.object({
      token: z.string(),
   }),
});

export const DeleteCardResponseSchema = z.object({
   errorCode: z.coerce.number(),
   errorMessage: z.string().optional(),
   command: z.string(),
   time: z.coerce.number(),
});
