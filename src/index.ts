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
   createBuildXMLDirectTransaction,
   createBuildXMLDirectTransactionWithToken,
} from "@module/transaction";
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
import { OrderQueryResponseSchema } from "./response-schema/transaction-query";
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
import { OrderQuery } from "./types/transaction-query";
import { ZeroDollar } from "./types/zero-dollar";
import { ZeroDollarWithToken } from "./types/zero-dollar-token";
import { formatResponse } from "./utils/utils";

export class MaxiPagoSDK {
   private readonly POST_API: string;
   private readonly POST_XML: string;
   private readonly REPORTS_API: string;
   constructor(
      private readonly auth: MaxiPagoAuth,
      private readonly env: "development" | "production"
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

   async createCustomer(dto: CreateCustomer) {
      const XML = buildXMLCreateCustomer(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = CreateCustomerResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
      return parsedResponse.result.customerId;
   }
   async updateCustomer(dto: UpdateCustomer) {
      const XML = buildXMLUpdateCustomer(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = UpdateCustomerResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
   }
   async deleteCustomer(dto: DeleteCustomer) {
      const XML = buildXMLDeleteCustomer(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = DeleteCustomerResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
   }
   async createCard(dto: CreateCard) {
      const XML = buildXMLCreateCard(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = CreateCardResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
      return parsedResponse.result.token;
   }
   async deleteCard(dto: DeleteCard) {
      const XML = buildXMLDeleteCard(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = DeleteCardResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
      return response;
   }
   async createTransactionAuthorizationOnly(
      dto: CreateAuthorizationTransactionOnly
   ) {
      const XML = buildXMLCreateTransactionAuthorizationOnly(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionAuthorizationOnlyResponseSchema.parse(response);
      return parsedResponse;
   }
   async createTransactionCaptureAfterAuthorization(
      dto: CreateTransactionCaptureAfterAuthorization
   ) {
      const XML = buildXMLCreateTransactionCaptureAfterAuthorization(
         dto,
         this.auth
      );
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionCaptureAfterAuthorizationSchema.parse(response);
      return parsedResponse;
   }
   async createTransactionWithToken(dto: CreateDirectTransactionWithToken) {
      const XML = createBuildXMLDirectTransactionWithToken(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse =
         CreateTransactionWithTokenResponseSchema.parse(response);
      return parsedResponse;
   }
   async createDirectTransaction(dto: CreateDirectTransaction) {
      const XML = createBuildXMLDirectTransaction(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse =
         CreateDirectTransactionResponseSchema.parse(response);
      return parsedResponse;
   }
   async chargeBack(dto: ChargeBack) {
      const XML = buildXMLChargeBack(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse = ChargeBackResponseSchema.parse(response);
      return parsedResponse;
   }
   async createRecurring(dto: CreateRecurring) {
      const XML = buildXMLCreateRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse = CreateRecurringResponseSchema.parse(response);
      return parsedResponse;
   }
   async updateRecurring(dto: UpdateRecurring) {
      const XML = buildXMLUpdateRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = UpdateRecurringResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
      return response;
   }
   async cancelRecurring(dto: DeleteRecurring) {
      const XML = buildXMLDeleteRecurring(dto, this.auth);
      const { data } = await api.post(this.POST_API, XML);
      const response = formatResponse(data);
      const parsedResponse = CancelRecurringResponseSchema.parse(response);
      if (parsedResponse.errorCode != 0) {
         throw new Error(parsedResponse.errorMessage);
      }
      return response;
   }
   async orderQuery(dto: OrderQuery) {
      const XML = buildXMLOrderQuery(dto, this.auth);
      const { data } = await api.post(this.REPORTS_API, XML);
      const response = formatResponse(data);
      const parsedResponse = OrderQueryResponseSchema.parse(response);
      if (parsedResponse.header.errorCode != 0) {
         throw new Error(parsedResponse.header.errorMsg || "Error");
      }
      return parsedResponse;
   }
   async zeroDollar(dto: ZeroDollar) {
      const XML = buildXMLZeroDollar(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse = CreateZeroDollarResponseSchema.parse(response);
      return parsedResponse;
   }
   async zeroDollarWithToken(dto: ZeroDollarWithToken) {
      const XML = buildXMLZeroDollarWithToken(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse =
         CreateZeroDollarWithTokenResponseSchema.parse(response);
      return parsedResponse;
   }
   async createPix(dto: CreatePix) {
      const XML = buildXMLCreatePix(dto, this.auth);
      const { data } = await api.post(this.POST_XML, XML);
      const response = formatResponse(data);
      const parsedResponse = CreatePixResponseSchema.parse(response);
      return parsedResponse;
   }
}
