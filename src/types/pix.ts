export type CreatePix = {
   sale: Sale;
};

export type Sale = {
   processorID: string;
   referenceNum: string;
   customerIdExt: string;
   billing: Billing;
   transactionDetail: TransactionDetail;
   payment: Payment;
};

export type Billing = {
   name: string;
   address: string;
   address2: string;
   district: string;
   city: string;
   state: string;
   postalcode: string;
   country: string;
   phone: string;
   email: string;
   companyName: string;
};

export type Documents = {
   document: Document[];
};

export type Document = {
   documentType: string;
   documentValue: string;
};

export type Payment = {
   chargeTotal: string;
};

export type TransactionDetail = {
   payType: PayType;
};

export type PayType = {
   pix: Pix;
};

export type Pix = {
   expirationTime: string;
   paymentInfo: string;
   extraInfo: ExtraInfo;
};

export type ExtraInfo = {
   info: Info[];
};

export type Info = {
   name: string;
   value: string;
};
