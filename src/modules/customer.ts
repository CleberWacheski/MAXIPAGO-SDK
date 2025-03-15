import { CommonRequest, MaxiPagoAuth } from "../types/common-request";
import {
   CreateCustomer,
   DeleteCustomer,
   UpdateCustomer,
} from "../types/customer";
import { xmlBuilder } from "../utils/utils";

export const buildXMLCreateCustomer = (
   request: CreateCustomer,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<CreateCustomer> = {
      verification: MPAuth,
      command: "add-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLUpdateCustomer = (
   request: UpdateCustomer,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<UpdateCustomer> = {
      verification: MPAuth,
      command: "update-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLDeleteCustomer = (
   request: DeleteCustomer,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<DeleteCustomer> = {
      verification: MPAuth,
      command: "delete-consumer",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};
