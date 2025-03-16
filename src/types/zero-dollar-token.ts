export type ZeroDollarWithToken = {
   zeroDollar: {
      processorID: string;
      referenceNum: string;
      transactionDetail: TransactionDetail;
      payment: Payment;
   };
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

type Payment = {
   chargeTotal: string;
};
