export type ZeroDollar = {
   zeroDollar: {
      processorID: number;
      referenceNum: string;
      transactionDetail: TransactionDetail;
      payment: Payment;
   };
};

type TransactionDetail = {
   payType: PayType;
};

type PayType = {
   creditCard: CreditCard;
};

type CreditCard = {
   number: string;
   expMonth: string;
   expYear: string;
   cvvNumber: string;
};

type Payment = {
   chargeTotal: string;
};
