import { buildXMLCreateCard, buildXMLDeleteCard } from "@module/card";
import { buildXMLChargeBack } from "@module/chargeback";
import {
   buildXMLCreateCustomer,
   buildXMLDeleteCustomer,
   buildXMLUpdateCustomer,
} from "@module/customer";
import { buildXMLCreatePix } from "@module/pix";
import {
   buildXMLCreateRecurring,
   buildXMLDeleteRecurring,
   buildXMLUpdateRecurring,
} from "@module/recurring";
import {
   buildXMLCreateTransactionAuthorizationOnly,
   buildXMLCreateTransactionCaptureAfterAuthorization,
   buildXMLOrderQuery,
   buildXMLOrdersQuery,
   createBuildXMLDirectTransaction,
   createBuildXMLDirectTransactionWithToken,
} from "@module/transaction";
import { WebhookXMLHandler } from "@module/webhook";
import {
   buildXMLZeroDollar,
   buildXMLZeroDollarWithToken,
} from "@module/zerodollar";
import api from "./api";
import {
   CreateCardResponseSchema,
   DeleteCardResponseSchema,
} from "./response-schema/card";
import { ChargeBackResponseSchema } from "./response-schema/chargeback";
import {
   CreateCustomerResponseSchema,
   DeleteCustomerResponseSchema,
   UpdateCustomerResponseSchema,
} from "./response-schema/customer";
import { CreatePixResponseSchema } from "./response-schema/pix";
import {
   CancelRecurringResponseSchema,
   CreateRecurringResponseSchema,
   UpdateRecurringResponseSchema,
} from "./response-schema/recurring";
import {
   CreateDirectTransactionResponseSchema,
   CreateTransactionAuthorizationOnlyResponseSchema,
   CreateTransactionCaptureAfterAuthorizationSchema,
   CreateTransactionWithTokenResponseSchema,
} from "./response-schema/transaction";
import {
   OrderQueryResponseSchema,
   OrdersQueryResponseSchema,
} from "./response-schema/transaction-query";
import {
   CreateZeroDollarResponseSchema,
   CreateZeroDollarWithTokenResponseSchema,
} from "./response-schema/zerodollar";
import { CreateTransactionCaptureAfterAuthorization } from "./types/capture-after-authorization";
import { CreateCard, DeleteCard } from "./types/card";
import { ChargeBack } from "./types/chargeback";
import { MaxiPagoAuth } from "./types/common-request";
import {
   CreateCustomer,
   DeleteCustomer,
   UpdateCustomer,
} from "./types/customer";
import { CreateDirectTransactionWithToken } from "./types/direct-transaction-with-token";
import { CreatePix } from "./types/pix";
import { DeleteRecurring, UpdateRecurring } from "./types/recurrence";
import {
   CreateAuthorizationTransactionOnly,
   CreateDirectTransaction,
   CreateRecurring,
} from "./types/transaction";
import { OrderQuery, type OrdersQuery } from "./types/transaction-query";
import { ZeroDollar } from "./types/zero-dollar";
import { ZeroDollarWithToken } from "./types/zero-dollar-token";
import { RecursivePartial } from "./utils/recursive-partial";
import { formatResponse } from "./utils/utils";

export class MaxiPagoSDK {
   private readonly POST_API: string;
   private readonly POST_XML: string;
   private readonly REPORTS_API: string;
   constructor(
      private readonly auth: MaxiPagoAuth,
      private readonly env: "development" | "production",
      private readonly errorLogger?: (err: string) => void,
      private readonly requestLogger?: (
         request: string,
         response: string
      ) => void
   ) {
      this.POST_API =
         this.env === "development"
            ? "https://testapi.maxipago.net/UniversalAPI/postAPI"
            : "https://api.maxipago.net/UniversalAPI/postAPI";

      this.POST_XML =
         this.env === "development"
            ? "https://testapi.maxipago.net/UniversalAPI/postXML"
            : "https://api.maxipago.net/UniversalAPI/postXML";

      this.REPORTS_API =
         this.env === "development"
            ? "https://testapi.maxipago.net/ReportsAPI/servlet/ReportsAPI"
            : "https://api.maxipago.net/ReportsAPI/servlet/ReportsAPI";

      if (!this.auth.merchantId || !this.auth.merchantKey) {
         throw new Error("MerchantId and MerchantKey are required");
      }
   }

   async createCustomer(dto: RecursivePartial<CreateCustomer>) {
      const XML = buildXMLCreateCustomer(dto, this.auth);
      const { data } = await api.post<string>(this.POST_API, XML);
      const response = formatResponse(data);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const parsedResponse = CreateCustomerResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data.result.customerId;
   }
   async updateCustomer(dto: RecursivePartial<UpdateCustomer>) {
      const XML = buildXMLUpdateCustomer(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = UpdateCustomerResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
   }
   async deleteCustomer(dto: RecursivePartial<DeleteCustomer>) {
      const XML = buildXMLDeleteCustomer(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = DeleteCustomerResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
   }
   async createCard(dto: RecursivePartial<CreateCard>) {
      const XML = buildXMLCreateCard(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = CreateCardResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data.result.token;
   }
   async deleteCard(dto: RecursivePartial<DeleteCard>) {
      const XML = buildXMLDeleteCard(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = DeleteCardResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
   }
   async createTransactionAuthorizationOnly(
      dto: RecursivePartial<CreateAuthorizationTransactionOnly>
   ) {
      const XML = buildXMLCreateTransactionAuthorizationOnly(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionAuthorizationOnlyResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async createTransactionCaptureAfterAuthorization(
      dto: RecursivePartial<CreateTransactionCaptureAfterAuthorization>
   ) {
      const XML = buildXMLCreateTransactionCaptureAfterAuthorization(
         dto,
         this.auth
      );
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionCaptureAfterAuthorizationSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async createTransactionWithToken(
      dto: RecursivePartial<CreateDirectTransactionWithToken>
   ) {
      const XML = createBuildXMLDirectTransactionWithToken(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionWithTokenResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async createDirectTransaction(
      dto: RecursivePartial<CreateDirectTransaction>
   ) {
      const XML = createBuildXMLDirectTransaction(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse =
         CreateDirectTransactionResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async chargeBack(dto: RecursivePartial<ChargeBack>) {
      const XML = buildXMLChargeBack(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = ChargeBackResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async createRecurring(dto: RecursivePartial<CreateRecurring>) {
      const XML = buildXMLCreateRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = CreateRecurringResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async updateRecurring(dto: RecursivePartial<UpdateRecurring>) {
      const XML = buildXMLUpdateRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = UpdateRecurringResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
   }
   async cancelRecurring(dto: RecursivePartial<DeleteRecurring>) {
      const XML = buildXMLDeleteRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = CancelRecurringResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
   }
   async orderQuery(dto: RecursivePartial<OrderQuery>) {
      const XML = buildXMLOrderQuery(dto, this.auth);
      const { data } = await api.post(this.REPORTS_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = OrderQueryResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async ordersQuery(dto: RecursivePartial<OrdersQuery>) {
      const XML = buildXMLOrdersQuery(dto, this.auth);
      const { data } = await api.post(this.REPORTS_API, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = OrdersQueryResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async zeroDollar(dto: RecursivePartial<ZeroDollar>) {
      const XML = buildXMLZeroDollar(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = CreateZeroDollarResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async zeroDollarWithToken(dto: RecursivePartial<ZeroDollarWithToken>) {
      const XML = buildXMLZeroDollarWithToken(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse =
         CreateZeroDollarWithTokenResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   async createPix(dto: RecursivePartial<CreatePix>) {
      const XML = buildXMLCreatePix(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      if (this.requestLogger) {
         this.requestLogger(XML, data);
      }
      const response = formatResponse(data);
      const parsedResponse = CreatePixResponseSchema.safeParse(response);
      if (!parsedResponse.success) {
         if (this.errorLogger) {
            this.errorLogger(
               JSON.stringify({
                  response,
                  errors: parsedResponse.error.issues.map((err) => err.path),
               })
            );
         }
         throw new Error(response);
      }
      return parsedResponse.data;
   }
   webHookHandler(xml: string) {
      const response = WebhookXMLHandler(xml);
      return response;
   }
}
