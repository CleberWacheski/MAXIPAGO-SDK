import { TransactionStatus, Webhook } from "src/types/webhook";
import { formatResponse } from "src/utils/utils";

export const WebhookXMLHandler = (xml: string) => {
   const response: Webhook = formatResponse(xml);
   const transactionStatusKey =
      response.transactionStatus as keyof typeof TransactionStatus;

   return {
      ...response,
      transactionStatus: TransactionStatus[transactionStatusKey],
   };
};
