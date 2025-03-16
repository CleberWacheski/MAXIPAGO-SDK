export const TransactionStatus = {
   3: "Captured",
   7: "Declined",
   9: "Voided",
   10: "Paid",
   34: "Viewed",
   35: "Underpaid",
   36: "Overpaid",
   11: "PendingSettlement",
   18: "PendingVoid",
   30: "Authenticated",
   32: "AuthenticationStarted",
   33: "PendingEnrollment",
   44: "FraudApproved",
   45: "FraudDeclined",
   46: "FraudReview",
} as const;

export type Webhook = {
   transactionState: string; // Status original da transação
   transactionType: number; // Tipo da operação
   transactionID: string; // ID da transação gerado pela maxiPago!
   TID: string; // ID da transação gerado pela Adquirente
   orderID: string; // ID do pedido gerado pela maxiPago!
   transactionStatus: number; // Status da transação (retorno webhook)
   transactionDate: string; // Data da transação em fuso BRT (MM/DD/AAAA hh:mm:ss tt)
   NSU: string; // ID do pedido gerado pela Adquirente
   merchantId: string; // ID de loja que identifica o estabelecimento na maxiPago!
   transactionAmount: number; // Valor da transação
   recurrencyFlag?: "Y" | "N"; // Informa se é uma transação de Recorrência
   referenceNumber: string; // Identificador do pedido no estabelecimento
   processorCode: string; // Retorno do código da ABECs
   processorMessage: string; // Retorno da mensagem ABECs
   brandCode?: string; // Retorno do código ABECs (somente para Rede)
   brandMessage?: string; // Retorno da mensagem ABECs (somente para Rede)
   brandTid?: string; // Código identificador da transação na respectiva bandeira
   recurring?: {
      status: string; // Status da recorrência
      failedThreshold: number; // Número de tentativas declinadas necessárias para ação
      onFailureAction: string; // Ação aplicada ao atingir o limite de falhas
      runCount: number; // Número de parcelas já cobradas
      numberOfFailures: number; // Número de tentativas declinadas até o momento
      numberOfInstallments: number; // Número total de parcelas
   };
};
