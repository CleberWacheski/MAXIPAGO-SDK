export type DeleteRecurring = {
   orderID: string;
};

export type UpdateRecurring = {
   orderID: string;
   paymentInfo: PaymentInfo;
   recurring: Recurring;
   billingInfo: BillingInfo;
   shippingInfo: ShippingInfo;
};

type PaymentInfo = {
   cardInfo: {
      creditCardNumber: string;
      expirationMonth: string;
      expirationYear: string;
   };
   chargeTotal: string;
};

type Recurring = {
   processorID: string;
   action: "enable" | "disable";
   installments: string;
   nextFireDate: string;
   fireDay: string;
   period:
      | "annual"
      | "quarterly"
      | "monthly"
      | "weekly"
      | "daily"
      | "biMonthly"
      | "semiAnnual";
   lastDate: string;
   firstAmount: string;
   lastAmount: string;
};

type BillingInfo = {
   name: string;
   address1: string;
   address2: string;
   city: string;
   zip: string;
   country: string;
   email: string;
   phone: string;
};

type ShippingInfo = {
   name: string;
   address1: string;
   address2: string;
   city: string;
   zip: string;
   country: string;
   email: string;
   phone: string;
};
