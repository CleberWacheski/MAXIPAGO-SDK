export type CreateCustomer = {
   customerIdExt: string;
   firstName: string;
   lastName: string;
   address1: string;
   address2: string;
   city: string;
   state: string;
   zip: string;
   country: string;
   phone: string;
   email: string;
   dob: string;
   sex: string;
};
export type UpdateCustomer = CreateCustomer & {
   customerId: string;
};
export type DeleteCustomer = {
   customerId: string;
};
