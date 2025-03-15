import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { ZeroDollar } from "src/types/zero-dollar";
import { ZeroDollarWithToken } from "src/types/zero-dollar-token";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLZeroDollar = (
   request: ZeroDollar,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<ZeroDollar> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLZeroDollarWithToken = (
   request: ZeroDollarWithToken,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<ZeroDollarWithToken> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
