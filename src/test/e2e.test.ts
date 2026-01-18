import { MaxiPagoSDK } from "src";
import { expect, test } from "vitest";

const auth = {
   merchantId: process.env.MAXIPAGO_MERCHANT_ID!,
   merchantKey: process.env.MAXIPAGO_MERCHANT_KEY!,
};

const sdk = new MaxiPagoSDK(auth, "development", (err) => {
   console.log(err);
});

test("DEVE SER CAPAZ DE CRIAR UM CLIENTE", async () => {
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
   const customerId = await sdk.createCustomer({
      customerIdExt: "46674194662",
      firstName: "REDE Teste",
      lastName: "REDE",
      zip: "06460040",
      email: "teste@teste.comm",
      dob: "12/02/1991",
      sex: "m",
   });
   await sdk.deleteCustomer({
      customerId,
   });
});

test("DEVE SER CAPAZ DE CRIAR UM CARTÃO", async () => {
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
         processorID: "1",
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
            processorID: "1",
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
         processorID: "1",
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
   const response = await sdk.createTransactionAuthorizationOnly({
      auth: {
         payment: {
            chargeTotal: "100.00",
            creditInstallment: {
               chargeInterest: "Y",
               numberOfInstallments: "2",
            },
            currencyCode: "BRL",
         },
         processorID: "1",
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
   const response = await sdk.createTransactionAuthorizationOnly({
      auth: {
         payment: {
            chargeTotal: "100.00",
            creditInstallment: {
               chargeInterest: "Y",
               numberOfInstallments: "2",
            },
            currencyCode: "BRL",
         },
         processorID: "1",
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

test.only("DEVE SER CAPAZ DE CRIAR UMA RECORRÊNCIA", async () => {
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: "1",
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: "1",
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
            failureThreshold: "3",
            installments: "infinite",
            period: "monthly",
            frequency: "1",
            startDate: "2025-12-15",
            firstAmount: "2000.50",
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
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: "1",
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: "1",
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
            failureThreshold: "3",
            installments: "infinite",
            period: "monthly",
            frequency: "1",
            startDate: "2025-12-10",
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
   const response = await sdk.createRecurring({
      recurringPayment: {
         processorID: "1",
         referenceNum: "123456",
         payment: {
            chargeTotal: "500.00",
            creditInstallment: {
               chargeInterest: "N",
               numberOfInstallments: "1",
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
            failureThreshold: "3",
            installments: "infinite",
            period: "monthly",
            frequency: "1",
            startDate: "2025-12-10",
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
         processorID: "1",
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

test("DEVE SER CAPAZ DE LIDAR COM OS DADOS DO WEBHOOK", () => {
   let response = sdk.webHookHandler(`
<Request>
<transaction-event>
<brandMessage>Success.</brandMessage>
<brandCode>00</brandCode>
<processorCode>00</processorCode>
<transactionStatus>3</transactionStatus>
<transactionType>CreditCardCapture</transactionType>
<transactionID>520330398</transactionID>
<tid>11182212131744289937</tid>
<brandTid></brandTid>
<orderID>0A0115CD:01850D44AB52:262C:156EDFB5</orderID>
<transactionState>Captured</transactionState>
<transactionDate>12-13-2022 17:54:46</transactionDate>
<nsu>384248853</nsu>
<merchantId>36xxx</merchantId>
<referenceNumber>2022121317515887</referenceNumber>
<transactionAmount>1</transactionAmount>
<processorMessage>Success.</processorMessage>
</transaction-event>
</Request>`);
   expect(response.orderID).toBe("0A0115CD:01850D44AB52:262C:156EDFB5");
   expect(response.transactionID).toBe(520330398);
   expect(response.referenceNumber).toBe(2022121317515887);
   expect(response.transactionStatus).toBe("Captured");
   expect(response.transactionType).toBe("CreditCardCapture");

   response = sdk.webHookHandler(`
xml=<?xml version="1.0" encoding="UTF-8"?>
<Request>
<transaction-event>
<processorCode>00</processorCode>
<transactionStatus>3</transactionStatus>
<transactionType>CreditCardCapture</transactionType>
<transactionID>520330398</transactionID>
<tid>11182212131744289937</tid>
<brandTid></brandTid>
<orderID>0A0115CD:01850D44AB52:262C:156EDFB5</orderID>
<transactionState>Captured</transactionState>
<transactionDate>12-13-2022 17:54:46</transactionDate>
<nsu>384248853</nsu>
<merchantId>3xxxx</merchantId>
<referenceNumber>2022121317515887</referenceNumber>
<transactionAmount>1</transactionAmount>
<processorMessage>Success.</processorMessage>
</transaction-event>
</Request>`);
   expect(response.orderID).toBe("0A0115CD:01850D44AB52:262C:156EDFB5");
   expect(response.transactionID).toBe(520330398);
   expect(response.transactionStatus).toBe("Captured");
   expect(response.transactionType).toBe("CreditCardCapture");
   expect(response.referenceNumber).toBe(2022121317515887);

   response = sdk.webHookHandler(`
     xml=<?xml version="1.0" encoding="UTF-8"?>
<Request>
<transaction-event>
<processorCode>25</processorCode>
<transactionStatus>7</transactionStatus>
<transactionType>CreditCardSale</transactionType>
<transactionID>13958523</transactionID>
<tid></tid>
<brandTid></brandTid>
<orderID>0A010497:0184F87F5A52:9816:5079CE74</orderID>
<transactionState>Declined</transactionState>
<transactionDate>12-09-2022 17:06:46</transactionDate>
<nsu></nsu>
<merchantId>1xxxxx</merchantId>
<referenceNumber>Order-202212099255</referenceNumber>
<transactionAmount>10.00</transactionAmount>
<processorMessage>Affiliation: Invalid parameter format.</processorMessage>
</transaction-event>
</Request>`);
   expect(response.orderID).toBe("0A010497:0184F87F5A52:9816:5079CE74");
   expect(response.transactionID).toBe(13958523);
   expect(response.referenceNumber).toBe("Order-202212099255");
   expect(response.transactionStatus).toBe("Declined");
   expect(response.transactionType).toBe("CreditCardSale");

   response = sdk.webHookHandler(`
      xml=<?xml version="1.0" encoding="UTF-8"?>
<transaction-response>
<authCode/>
<orderID/>
<referenceNum>4040764123</referenceNum>
<transactionID>460312421</transactionID>
<transactionTimestamp/>
<responseCode>0</responseCode>
<responseMessage>VOIDED</responseMessage>
<avsResponseCode/>
<cvvResponseCode/>
<processorCode>173</processorCode>
<processorMessage>Authorization expired.</processorMessage>
<processorName>REDE</processorName>
<errorMessage/>
<creditCardScheme>Visa</creditCardScheme>
</transaction-response>`);
   expect(response.orderID).toBe("");
   expect(response.referenceNumber).toBe(4040764123);
   expect(response.transactionID).toBe(460312421);

   response = sdk.webHookHandler(`
xml=<?xml version="1.0" encoding="UTF-8"?>
<transaction-response>
<authCode/>
<orderID/>
<referenceNum>4040764123</referenceNum>
<transactionID>460312421</transactionID>
<transactionTimestamp/>
<responseCode>0</responseCode>
<responseMessage>VOIDED</responseMessage>
<avsResponseCode/>
<cvvResponseCode/>
<processorCode>173</processorCode>
<processorMessage>Authorization expired.</processorMessage>
<processorName>REDE</processorName>
<errorMessage/>
<creditCardScheme>Visa</creditCardScheme>
</transaction-response>`);
   expect(response.orderID).toBe("");
   expect(response.referenceNumber).toBe(4040764123);
   expect(response.transactionID).toBe(460312421);

   response = sdk.webHookHandler(`
      xml=<?xml version="1.0" encoding="UTF-8"?>
<Request>
<transaction-event>
<orderID>0A0115CD:01850D44AB52:262C:156EDFB5</orderID>
<merchantId>716413</merchantId>
<recurringFlag>Y</recurringFlag>
<transactionDate>08-13-2024 17:54:46</transactionDate>
<brandCode>00</brandCode>
<brandTid>MBKRL4UJX0510</brandTid>
<referenceNumber>29506_CARTAO_1715282846.271611</referenceNumber>
<transactionType>CreditCardSale</transactionType>
<nsu>84248853</nsu>
<transactionStatus>3</transactionStatus>
<transactionID>621326149</transactionID>
<processorCode>00</processorCode>
<transactionAmount>0.01</transactionAmount>
<brandMessage>Success.</brandMessage>
<tid>10482405100408363699</tid>
<transactionState>Captured</transactionState>
<recurring>
<status>ACTIVE</status>
<failedThreshold>3</failedThreshold>
<onFailureAction>skip</onFailureAction>
<runCount>2</runCount>
<numberOfFailures>0</numberOfFailures>
<numberOfInstallments>-1</numberOfInstallments>
</recurring>
<processorMessage>Success.</processorMessage>
</transaction-event>
</Request>`);
   expect(response.orderID).toBe("0A0115CD:01850D44AB52:262C:156EDFB5");
   expect(response.referenceNumber).toBe("29506_CARTAO_1715282846.271611");
   expect(response.transactionID).toBe(621326149);
   expect(response.transactionStatus).toBe("Captured");
   expect(response.transactionType).toBe("CreditCardSale");

   response = sdk.webHookHandler(`
xml=<?xml version="1.0" encoding="UTF-8"?>
<Request>
<transaction-event>
<transactionStatus>3</transactionStatus>
<transactionType>PixSale</transactionType>
<orderID>0A01049C:017D4824A517:6280:5556432E</orderID>
<transactionState>Captured</transactionState>
<transactionDate>08-19-2017 00:56:27</transactionDate>
<merchantId>1xxxx</merchantId>
<transactionAmount>24.00</transactionAmount>
<referenceNumber>20200001</referenceNumber>
</transaction-event>
</Request>`);
   expect(response.orderID).toBe("0A01049C:017D4824A517:6280:5556432E");
   expect(response.referenceNumber).toBe(20200001);
   expect(response.transactionStatus).toBe("Captured");
   expect(response.transactionType).toBe("PixSale");
});

test("DEVE SER CAPAZ DE CONSULTAR VARIAS TRANSAÇÕES", async () => {
   let transaction = await sdk.ordersQuery({
      filterOptions: {
         pageSize: 100,
         period: "thismonth",
         orderByDirection: "desc",
      },
   });
   expect(transaction.result.records.record).toHaveLength(100);
   transaction = await sdk.ordersQuery({
      filterOptions: {
         pageSize: 100,
         period: "thismonth",
         orderByDirection: "desc",
         pageNumber: 2,
         pageToken: transaction.result.resultSetInfo.pageToken,
      },
   });
   expect(transaction.result.records.record).toHaveLength(100);
});
