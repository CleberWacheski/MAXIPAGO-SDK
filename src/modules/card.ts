import { CreateCard, DeleteCard } from "src/types/card";
import { CommonRequest, MaxiPagoAuth } from "src/types/common-request";
import { RecursivePartial } from "src/utils/recursive-partial";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreateCard = (
   request: RecursivePartial<CreateCard>,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<RecursivePartial<CreateCard>> = {
      verification: MPAuth,
      command: "add-card-onfile",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLDeleteCard = (
   request: RecursivePartial<DeleteCard>,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<RecursivePartial<DeleteCard>> = {
      verification: MPAuth,
      command: "delete-card-onfile",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};
