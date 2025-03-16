import { MaxiPagoAuth, TransactionRequest } from "src/types/common-request";
import { ZeroDollar } from "src/types/zero-dollar";
import { ZeroDollarWithToken } from "src/types/zero-dollar-token";
import { RecursivePartial } from "src/utils/recursive-partial";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLZeroDollar = (
   request: RecursivePartial<ZeroDollar>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<RecursivePartial<ZeroDollar>> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};

export const buildXMLZeroDollarWithToken = (
   request: RecursivePartial<ZeroDollarWithToken>,
   MPAuth: MaxiPagoAuth
) => {
   const data: TransactionRequest<RecursivePartial<ZeroDollarWithToken>> = {
      verification: MPAuth,
      order: request,
      version: "3.1.1.15",
   };
   return xmlBuilder.buildObject({
      "transaction-request": data,
   });
};
