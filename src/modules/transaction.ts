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
import { OrderQuery, type OrdersQuery } from "src/types/transaction-query";
import { RecursivePartial } from "src/utils/recursive-partial";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreateTransactionAuthorizationOnly = (
   request: RecursivePartial<CreateAuthorizationTransactionOnly>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<
      RecursivePartial<CreateAuthorizationTransactionOnly>
   > = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLCreateTransactionCaptureAfterAuthorization = (
   request: RecursivePartial<CreateTransactionCaptureAfterAuthorization>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<
      RecursivePartial<CreateTransactionCaptureAfterAuthorization>
   > = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const createBuildXMLDirectTransactionWithToken = (
   request: RecursivePartial<CreateDirectTransactionWithToken>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<
      RecursivePartial<CreateDirectTransactionWithToken>
   > = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const createBuildXMLDirectTransaction = (
   request: RecursivePartial<CreateDirectTransaction>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<RecursivePartial<CreateDirectTransaction>> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLOrderQuery = (
   request: RecursivePartial<OrderQuery>,
   MPAuth: MaxiPagoAuth
) => {
   const data: RapiRequest<RecursivePartial<OrderQuery>> = {
      verification: MPAuth,
      request: request,
      command: "transactionDetailReport",
   };
   return xmlBuilder.buildObject({
      "rapi-request": data,
   });
};

export const buildXMLOrdersQuery = (
   request: RecursivePartial<OrdersQuery>,
   MPAuth: MaxiPagoAuth
) => {
   const data: RapiRequest<RecursivePartial<OrdersQuery>> = {
      verification: MPAuth,
      request: request,
      command: "transactionDetailReport",
   };
   return xmlBuilder.buildObject({
      "rapi-request": data,
   });
};
