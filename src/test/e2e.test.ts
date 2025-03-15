import { MaxiPagoSDK } from "src";
import { expect, test } from "vitest";

const auth = {
   merchantId: process.env.MAXIPAGO_MERCHANT_ID!,
   merchantKey: process.env.MAXIPAGO_MERCHANT_KEY!,
};

test.only("DEVE SER CAPAZ DE CRIAR UM CLIENTE", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   expect(customerId).toBeTruthy();
});

test("DEVE SER CAPAZ DE ATUALIZAR UM CLIENTE", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   await sdk.updateCustomer({
      customerId: "123456",
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
});

test("DEVE SER CAPAZ DE DELETAR UM CLIENTE", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   await sdk.deleteCustomer({
      customerId: "123456",
   });
});

test("DEVE SER CAPAZ DE CRIAR UM CARTÃO", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "5555555555554444",
      expirationMonth: "12",
      expirationYear: "2026",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   expect(token).toBeTruthy();
});

test("DEVE SER CAPAZ DE DELETAR UM CARTÃO", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "5555555555554444",
      expirationMonth: "12",
      expirationYear: "2026",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   await sdk.deleteCard({
      token: token,
   });
});

test("DEVE SER CAPAZ DE FAZER UMA VENDA COM CARTÃO TOKENIZADO APROVADO", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "4111111111111111",
      expirationMonth: "12",
      expirationYear: "2028",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   const response = await sdk.createTransactionWithToken({
      sale: {
         processorID: 1,
         referenceNum: "123456",
         payment: {
            currencyCode: "BRL",
            chargeTotal: "10.00",
         },
         transactionDetail: {
            payType: {
               onFile: {
                  customerId: customerId,
                  token: token,
                  cvvNumber: "123",
               },
            },
         },
      },
   });
   expect(response.orderID).toBeTruthy();
   expect(response.transactionID).toBeTruthy();
});

test("DEVE SER CAPAZ DE FAZER UMA VENDA COM CARTÃO TOKENIZADO DECLINADO", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "4111111111111111",
      expirationMonth: "12",
      expirationYear: "2028",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   await expect(() =>
      sdk.createTransactionWithToken({
         sale: {
            processorID: 1,
            referenceNum: "123456",
            payment: {
               currencyCode: "BRL",
               chargeTotal: "700.55",
            },
            transactionDetail: {
               payType: {
                  onFile: {
                     customerId: customerId,
                     token: token,
                     cvvNumber: "123",
                  },
               },
            },
         },
      })
   ).rejects.toThrow();
});

test("DEVE SER CAPAZ DE FAZER UMA TRANSAÇÃO ZERO DOLLAR COM TOKEN", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "4111111111111111",
      expirationMonth: "12",
      expirationYear: "2028",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   await sdk.zeroDollarWithToken({
      zeroDollar: {
         payment: {
            chargeTotal: "0.00",
         },
         processorID: 1,
         referenceNum: "123456",
         transactionDetail: {
            payType: {
               onFile: {
                  customerId: customerId,
                  token: token,
                  cvvNumber: "123",
               },
            },
         },
      },
   });
});

test("DEVE SER CAPAZ DE AUTORIZAR UMA COMPRA", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createTransactionAuthorizationOnly({
      auth: {
         payment: {
            chargeTotal: "100.00",
            creditInstallment: {
               chargeInterest: "Y",
               numberOfInstallments: 2,
            },
            currencyCode: "BRL",
         },
         processorID: 1,
         referenceNum: "123456",
         transactionDetail: {
            payType: {
               creditCard: {
                  cvvNumber: "123",
                  expMonth: "12",
                  expYear: "2028",
                  number: "4111111111111111",
               },
            },
         },
         billing: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
            companyName: "Maxipago",
         },
         customerIdExt: "46674194662",
         fraudCheck: "Y",
      },
   });
   expect(response.orderID).toBeTruthy();
   expect(response.transactionID).toBeTruthy();
});

test("DEVE SER CAPAZ DE CAPTURAR UMA COMPRA APOS SER AUTORIZADA", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createTransactionAuthorizationOnly({
      auth: {
         payment: {
            chargeTotal: "100.00",
            creditInstallment: {
               chargeInterest: "Y",
               numberOfInstallments: 2,
            },
            currencyCode: "BRL",
         },
         processorID: 1,
         referenceNum: "123456",
         transactionDetail: {
            payType: {
               creditCard: {
                  cvvNumber: "123",
                  expMonth: "12",
                  expYear: "2028",
                  number: "4111111111111111",
               },
            },
         },
         billing: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
            companyName: "Maxipago",
         },
         customerIdExt: "46674194662",
         fraudCheck: "Y",
      },
   });
   expect(response.orderID).toBeTruthy();
   expect(response.transactionID).toBeTruthy();

   const response2 = await sdk.createTransactionCaptureAfterAuthorization({
      capture: {
         orderID: response.orderID,
         payment: {
            chargeTotal: "100.00",
         },
         referenceNum: "123456",
      },
   });
   expect(response2.orderID).toBeTruthy();
   expect(response2.transactionID).toBeTruthy();
});

test("DEVE SER CAPAZ DE CRIAR UMA RECORRÊNCIA", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: 1,
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: 1,
            },
            currencyCode: "BRL",
         },
         transactionDetail: {
            payType: {
               creditCard: {
                  cvvNumber: "123",
                  expMonth: "12",
                  expYear: "2028",
                  number: "4111111111111111",
               },
            },
         },
         customerIdExt: "46674194662",
         billing: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
            companyName: "Maxipago",
         },
         recurring: {
            action: "new",
            onFailureAction: "pause",
            failureThreshold: 3,
            installments: "infinite",
            period: "monthly",
            frequency: 1,
            startDate: "2025-04-10",
         },
         shipping: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
         },
      },
   });
   expect(response.orderID).toBeTruthy();
});

test("DEVE SER CAPAZ DE DELETAR UMA RECORRÊNCIA", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: 1,
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: 1,
            },
            currencyCode: "BRL",
         },
         transactionDetail: {
            payType: {
               creditCard: {
                  cvvNumber: "123",
                  expMonth: "12",
                  expYear: "2028",
                  number: "4111111111111111",
               },
            },
         },
         customerIdExt: "46674194662",
         billing: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
            companyName: "Maxipago",
         },
         recurring: {
            action: "new",
            onFailureAction: "pause",
            failureThreshold: 3,
            installments: "infinite",
            period: "monthly",
            frequency: 1,
            startDate: "2025-04-10",
         },
         shipping: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
         },
      },
   });

   await sdk.cancelRecurring({
      orderID: response.orderID,
   });
});

test("DEVE SER CAPAZ DE EDITAR UMA RECORRÊNCIA", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: 1,
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: 1,
            },
            currencyCode: "BRL",
         },
         transactionDetail: {
            payType: {
               creditCard: {
                  cvvNumber: "123",
                  expMonth: "12",
                  expYear: "2028",
                  number: "4111111111111111",
               },
            },
         },
         customerIdExt: "46674194662",
         billing: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
            companyName: "Maxipago",
         },
         recurring: {
            action: "new",
            onFailureAction: "pause",
            failureThreshold: 3,
            installments: "infinite",
            period: "monthly",
            frequency: 1,
            startDate: "2025-04-10",
         },
         shipping: {
            address: "Rua Marcos Penteado Ulhoa Rodrigues",
            address2: "11 Andar",
            city: "Barueri",
            country: "BR",
            district: "Barueri",
            email: "teste@teste.com",
            name: "Maxipago Brasil",
            phone: "1121218536",
            postalcode: "06460040",
            state: "SP",
         },
      },
   });
   await sdk.updateRecurring({
      orderID: response.orderID,
      billingInfo: {
         name: "Maxipago Brasil",
         address1: "Rua Marcos Penteado Ulhoa Rodrigues",
         address2: "11 Andar",
         city: "Barueri",
         zip: "06460040",
         country: "BR",
         email: "teste@teste.com",
         phone: "1121218536",
      },
      paymentInfo: {
         cardInfo: {
            expirationMonth: "12",
            creditCardNumber: "4111111111111111",
            expirationYear: "2028",
         },
         chargeTotal: "100.00",
      },
      recurring: {
         action: "disable",
         installments: "infinite",
         period: "annual",
         processorID: "1",
      },
      shippingInfo: {
         name: "Maxipago Brasil",
         address1: "Rua Marcos Penteado Ulhoa Rodrigues",
         address2: "11 Andar",
         city: "Barueri",
         zip: "06460040",
         country: "BR",
         email: "teste@teste.com",
         phone: "1121218536",
      },
   });
});

test("DEVE SER CAPAZ DE CONSULTAR UMA TRANSAÇÃO", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   const token = await sdk.createCard({
      customerId: customerId,
      creditCardNumber: "4111111111111111",
      expirationMonth: "12",
      expirationYear: "2028",
      billingName: "Maxipago Brasil",
      billingAddress1: "Rua Marcos Penteado Ulhoa Rodrigues",
      billingAddress2: "11 Andar",
      billingCity: "Barueri",
      billingState: "SP",
      billingZip: "06460040",
      billingCountry: "BR",
      billingPhone: "1121218536",
      billingEmail: "teste@teste.com",
   });
   const response = await sdk.createTransactionWithToken({
      sale: {
         processorID: 1,
         referenceNum: "123456",
         payment: {
            currencyCode: "BRL",
            chargeTotal: "10.00",
         },
         transactionDetail: {
            payType: {
               onFile: {
                  customerId: customerId,
                  token: token,
                  cvvNumber: "123",
               },
            },
         },
      },
   });
   const transaction = await sdk.orderQuery({
      filterOptions: {
         orderId: response.orderID,
      },
   });
   expect(transaction.result).toBeDefined();
});

test("DEVE SER CAPAZ DE CRIAR UMA TRANSAÇÃO PIX", async () => {
   const sdk = new MaxiPagoSDK(auth, "development");
   const response = await sdk.createPix({
      sale: {
         processorID: "1",
         referenceNum: "123456",
         customerIdExt: "46674194662",
         billing: {
            name: "Nome do comprador",
            address: "Rua teste, 0",
            address2: "11º Andar",
            district: "Santo André",
            city: "São Paulo",
            state: "SP",
            postalcode: "00000-000",
            country: "BR",
            phone: "(99) 99999-9999",
            email: "teste@maxipago.com",
            companyName: "maxiPago!",
         },
         transactionDetail: {
            payType: {
               pix: {
                  expirationTime: "86400",
                  paymentInfo:
                     "Smart TV LG 65´ 8K IPS NanoCell, Conexão WiFi e Bluetooth",
                  extraInfo: {
                     info: [
                        {
                           name: "TV8k",
                           value: "R$10000.00",
                        },
                        {
                           name: "Garantia Estendida",
                           value: "R$6.00",
                        },
                     ],
                  },
               },
            },
         },
         payment: {
            chargeTotal: "10006.00",
         },
      },
   });
   expect(response.orderID).toBeTruthy();
   expect(response.transactionID).toBeTruthy();
   expect(response.onlineDebitUrl).toBeTruthy();
});
