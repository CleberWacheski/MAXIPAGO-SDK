export type ChargeBack = {
   return: {
      orderID: string;
      referenceNum: string;
      payment: Payment;
   };
};

type Payment = {
   chargeTotal: number;
};
