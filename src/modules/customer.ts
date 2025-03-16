import { RecursivePartial } from "src/utils/recursive-partial";
import { CommonRequest, MaxiPagoAuth } from "../types/common-request";
import {
   CreateCustomer,
   DeleteCustomer,
   UpdateCustomer,
} from "../types/customer";
import { xmlBuilder } from "../utils/utils";

export const buildXMLCreateCustomer = (
   request: RecursivePartial<CreateCustomer>,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<RecursivePartial<CreateCustomer>> = {
      verification: MPAuth,
      command: "add-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLUpdateCustomer = (
   request: RecursivePartial<UpdateCustomer>,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<RecursivePartial<UpdateCustomer>> = {
      verification: MPAuth,
      command: "update-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLDeleteCustomer = (
   request: RecursivePartial<DeleteCustomer>,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<RecursivePartial<DeleteCustomer>> = {
      verification: MPAuth,
      command: "delete-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};
