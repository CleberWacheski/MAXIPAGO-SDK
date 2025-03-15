export type MaxiPagoAuth = {
   merchantId: string;
   merchantKey: string;
};

export type CommonRequest<T> = {
   verification: MaxiPagoAuth;
   command:
      | "add-consumer"
      | "update-consumer"
      | "delete-consumer"
      | "add-card-onfile"
      | "delete-card-onfile"
      | "modify-recurring"
      | "cancel-recurring";
   request: T;
};

export type TransactionRequest<T> = {
   version: "3.1.1.15";
   verification: MaxiPagoAuth;
   order: T;
};

export type RapiRequest<T> = {
   verification: MaxiPagoAuth;
   command: "transactionDetailReport";
   request: T;
};
