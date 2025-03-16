export type CreateDirectTransactionWithToken = {
   sale: Sale;
};

type Sale = {
   processorID: string;
   referenceNum: string;
   transactionDetail: TransactionDetail;
   payment: Payment;
};

type Payment = {
   currencyCode: "BRL";
   chargeTotal: string;
};

type TransactionDetail = {
   payType: PayType;
};

type PayType = {
   onFile: OnFile;
};

type OnFile = {
   customerId: string;
   token: string;
   cvvNumber: string;
};
