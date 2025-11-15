export type CreateDirectTransaction = {
   sale: Auth;
};

export type CreateAuthorizationTransactionOnly = {
   auth: Auth;
};

export type CreateRecurring = {
   recurringPayment: Auth;
};

type Auth = {
   processorID: string;
   referenceNum: string;
   fraudCheck: "Y" | "N";
   customerIdExt: string;
   billing: Billing;
   shipping: Shipping;
   transactionDetail: TransactionDetail;
   payment: Payment;
   saveOnFile: SaveOnFile;
   recurring: Recurring;
};

type SaveOnFile = {
   customerToken: string;
};

type Billing = {
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

type Shipping = {
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
};

type TransactionDetail = {
   payType: PayType;
};

type PayType = {
   creditCard: CreditCard;
   onFile: OnFile;
};

type CreditCard = {
   number: string;
   expMonth: string;
   expYear: string;
   cvvNumber: string;
};

type OnFile = {
   customerId: string;
   token: string;
   cvvNumber: string;
};

type Payment = {
   chargeTotal: string;
   currencyCode: string;
   creditInstallment: CreditInstallment;
};

type CreditInstallment = {
   numberOfInstallments: string;
   chargeInterest: "Y" | "N";
};

type Recurring = {
   action: "new";
   startDate: string;
   period:
      | "annual"
      | "quarterly"
      | "monthly"
      | "weekly"
      | "daily"
      | "biMonthly"
      | "semiAnnual";
   frequency: string;
   onFailureAction: "skip" | "pause";
   installments: string;
   failureThreshold: string;
   firstAmount: string;
   lastAmount: string;
};
