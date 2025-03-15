export type CreateTransactionCaptureAfterAuthorization = {
   capture: Capture;
};

type Capture = {
   orderID: string;
   referenceNum: string;
   payment: Payment;
};

type Payment = {
   chargeTotal: string;
};
