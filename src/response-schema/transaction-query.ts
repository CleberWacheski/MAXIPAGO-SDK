/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const extractString = (val: unknown): string | undefined => {
   if (typeof val === "string") return val;

   if (typeof val === "number" || typeof val === "boolean") return String(val);

   if (val && typeof val === "object") {
      for (const key in val as any) {
         const nested = (val as any)[key];
         const result = extractString(nested);
         if (result) return result;
      }
   }

   return undefined;
};

const anyStringSchema = z.preprocess((val) => extractString(val), z.string());

export const OrderQueryResponseSchema = z.object({
   header: z.object({
      errorCode: z.literal(0),
      errorMsg: z.string().optional(),
      command: z.string(),
      time: z.coerce.string(),
   }),
   result: z.object({
      resultSetInfo: z.object({
         totalNumberOfRecords: z.coerce.number(),
         pageToken: z.coerce.string(),
         pageNumber: z.coerce.number(),
         numberOfPages: z.coerce.number().optional(),
      }),
      records: z.object({
         record: z.object({
            transactionId: z.coerce.string(),
            referenceNumber: anyStringSchema,
            transactionType: z.coerce.string(),
            transactionAmount: z.coerce.string(),
            shippingAmount: z.coerce.string(),
            transactionDate: z.coerce.string(),
            orderId: anyStringSchema,
            splitPaymentOrderId: z.coerce.string(),
            userId: z.coerce.string(),
            customerId: anyStringSchema,
            companyName: z.coerce.string(),
            responseCode: z.coerce.string(),
            approvalCode: z.coerce.string(),
            paymentType: z.coerce.string(),
            bankRoutingNumber: z.coerce.string(),
            achAccountNumber: z.coerce.string(),
            avsResponseCode: z.coerce.string(),
            billingName: anyStringSchema,
            billingAddress1: anyStringSchema,
            billingAddress2: z.coerce.string(),
            billingCity: z.coerce.string(),
            billingState: z.coerce.string(),
            billingCountry: z.coerce.string(),
            billingZip: z.coerce.string(),
            billingPhone: z.coerce.string(),
            billingEmail: anyStringSchema,
            comments: z.coerce.string(),
            transactionStatus: z.coerce.string(),
            transactionState: z.coerce.string(),
            recurringPaymentFlag: z.coerce.string(),
            processorReturnedData: z.coerce.string(),
            gatewayDebitNetworkID: z.coerce.string(),
            creditCardType: z.coerce.string(),
            boletoUrl: z.coerce.string(),
            boletoNumber: z.coerce.string(),
            expirationDate: z.coerce.string(),
            processorID: z.coerce.string(),
            dateOfPayment: z.coerce.string(),
            dateOfFunding: z.coerce.string(),
            bankOfPayment: z.coerce.string(),
            branchOfPayment: z.coerce.string(),
            paidAmount: z.coerce.number(),
            bankFee: z.coerce.string(),
            netAmount: z.coerce.string(),
            returnCode: z.coerce.string(),
            clearingCode: z.coerce.string(),
            customField1: z.coerce.string(),
            customField2: z.coerce.string(),
            customField3: z.coerce.string(),
            customField4: z.coerce.string(),
            customField5: z.coerce.string(),
            numberOfInstallments: z.coerce.string(),
            chargeInterest: z.coerce.string(),
            processorTransactionID: z.coerce.string(),
            processorReferenceNumber: z.coerce.string(),
            brandCode: z.coerce.string(),
            brandMessage: z.coerce.string(),
            brandTransactionID: z.coerce.string(),
            brandMac: z.coerce.string(),
         }),
      }),
   }),
});

export const OrdersQueryResponseSchema = z.object({
   header: z.object({
      errorCode: z.literal(0),
      errorMsg: z.string().optional(),
      command: z.string(),
      time: z.coerce.string(),
   }),
   result: z.object({
      resultSetInfo: z.object({
         totalNumberOfRecords: z.coerce.number(),
         pageToken: z.coerce.string(),
         pageNumber: z.coerce.number(),
         numberOfPages: z.coerce.number().optional(),
      }),
      records: z.object({
         record: z
            .object({
               transactionId: z.coerce.string(),
               referenceNumber: anyStringSchema,
               transactionType: z.coerce.string(),
               transactionAmount: z.coerce.string(),
               shippingAmount: z.coerce.string(),
               transactionDate: z.coerce.string(),
               orderId: anyStringSchema,
               splitPaymentOrderId: z.coerce.string(),
               userId: z.coerce.string(),
               customerId: anyStringSchema,
               companyName: z.coerce.string(),
               responseCode: z.coerce.string(),
               approvalCode: z.coerce.string(),
               paymentType: z.coerce.string(),
               bankRoutingNumber: z.coerce.string(),
               achAccountNumber: z.coerce.string(),
               avsResponseCode: z.coerce.string(),
               billingName: anyStringSchema,
               billingAddress1: anyStringSchema,
               billingAddress2: z.coerce.string(),
               billingCity: z.coerce.string(),
               billingState: z.coerce.string(),
               billingCountry: z.coerce.string(),
               billingZip: z.coerce.string(),
               billingPhone: z.coerce.string(),
               billingEmail: anyStringSchema,
               comments: z.coerce.string(),
               transactionStatus: z.coerce.string(),
               transactionState: z.coerce.string(),
               recurringPaymentFlag: z.coerce.string(),
               processorReturnedData: z.coerce.string(),
               gatewayDebitNetworkID: z.coerce.string(),
               creditCardType: z.coerce.string(),
               boletoUrl: z.coerce.string(),
               boletoNumber: z.coerce.string(),
               expirationDate: z.coerce.string(),
               processorID: z.coerce.string(),
               dateOfPayment: z.coerce.string(),
               dateOfFunding: z.coerce.string(),
               bankOfPayment: z.coerce.string(),
               branchOfPayment: z.coerce.string(),
               paidAmount: z.coerce.number(),
               bankFee: z.coerce.string(),
               netAmount: z.coerce.string(),
               returnCode: z.coerce.string(),
               clearingCode: z.coerce.string(),
               customField1: z.coerce.string(),
               customField2: z.coerce.string(),
               customField3: z.coerce.string(),
               customField4: z.coerce.string(),
               customField5: z.coerce.string(),
               numberOfInstallments: z.coerce.string(),
               chargeInterest: z.coerce.string(),
               processorTransactionID: z.coerce.string(),
               processorReferenceNumber: z.coerce.string(),
               brandCode: z.coerce.string(),
               brandMessage: z.coerce.string(),
               brandTransactionID: z.coerce.string(),
               brandMac: z.coerce.string(),
            })
            .array(),
      }),
   }),
});
