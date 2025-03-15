import { CreateCard, DeleteCard } from "src/types/card";
import { CommonRequest, MaxiPagoAuth } from "src/types/common-request";
import { xmlBuilder } from "src/utils/utils";

export const buildXMLCreateCard = (
   request: CreateCard,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<CreateCard> = {
      verification: MPAuth,
      command: "add-card-onfile",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};

export const buildXMLDeleteCard = (
   request: DeleteCard,
   MPAuth: MaxiPagoAuth
) => {
   const data: CommonRequest<DeleteCard> = {
      verification: MPAuth,
      command: "delete-card-onfile",
      request: request,
   };
   return xmlBuilder.buildObject({
      "api-request": data,
   });
};
