## MAXIPAGO SDK

#### EXAMPLE

```
import { MaxiPagoSDK } from "maxipago-sdk";

const auth = {
   merchantId: process.env.MAXIPAGO_MERCHANT_ID!,
   merchantKey: process.env.MAXIPAGO_MERCHANT_KEY!,
};

const sdk = new MaxiPagoSDK(auth, "development");

const response = await sdk.createPix({
   // ...
});

console.log(response);

```

#### DOCS

https://www.maxipago.com/developers/apidocs/
