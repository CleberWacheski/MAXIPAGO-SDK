import { CreateTransactionCaptureAfterAuthorization } from "src/types/capture-after-authorization";
import {
   MaxiPagoAuth,
   RapiRequest,
   TransactionRequest,
} from "src/types/common-request";
import { CreateDirectTransactionWithToken } from "src/types/direct-transaction-with-token";
import {
   CreateAuthorizationTransactionOnly,
   CreateDirectTransaction,
} from "src/types/transaction";
import { OrderQuery } from "src/types/transaction-query";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreateTransactionAuthorizationOnly = (
   request: CreateAuthorizationTransactionOnly,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<CreateAuthorizationTransactionOnly> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLCreateTransactionCaptureAfterAuthorization = (
   request: CreateTransactionCaptureAfterAuthorization,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<CreateTransactionCaptureAfterAuthorization> =
      {
         verification: MPAuth,
         order: request,
         version: "3.1.1.15",
      };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const createBuildXMLDirectTransactionWithToken = (
   request: CreateDirectTransactionWithToken,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<CreateDirectTransactionWithToken> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const createBuildXMLDirectTransaction = (
   request: CreateDirectTransaction,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<CreateDirectTransaction> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLOrderQuery = (
   request: OrderQuery,
   MPAuth: MaxiPagoAuth
) => {
   const data: RapiRequest<OrderQuery> = {
      verification: MPAuth,
      request: request,
      command: "transactionDetailReport",
   };
   return xmlBuilder.buildObject({
      "rapi-request": data,
   });
};
