import { xml2json } from "xml-js";
import { Builder, Options as XML2JSOptions } from "xml2js";

const isDebug = process.env.NODE_ENV != "production";

export const convertResponse = (value: any, parentElement: any) => {
   try {
      const keyNo = Object.keys(parentElement._parent).length;
      const keyName = Object.keys(parentElement._parent)[keyNo - 1];
      parentElement._parent[keyName] = nativeType(value);
   } catch (e) {
      console.log(e);
   }
};

export const transformEmptyObjects = (obj: any): any => {
   if (obj === null || obj === undefined) return obj;

   if (typeof obj === "object") {
      if (Object.keys(obj).length === 0) {
         return ""; //
      }
      for (const key in obj) {
         obj[key] = transformEmptyObjects(obj[key]);
      }
   }
   return obj;
};

export const formatResponse = (xml: string) => {
   const options = {
      compact: true,
      trim: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: true,
      ignoreComment: true,
      ignoreCdata: false,
      ignoreDoctype: true,
      textFn: convertResponse,
   };
   xml = xml.replace("rapi-response", "response");
   xml = xml.replace("rapi-response", "response");
   xml = xml.replace("api-response", "response");
   xml = xml.replace("api-response", "response");
   xml = xml.replace("transaction-response", "response");
   xml = xml.replace("transaction-response", "response");
   const jsonResponse = transformEmptyObjects(
      JSON.parse(xml2json(xml, options))
   );
   if (isDebug) {
      console.log("development mode");
      console.log(xml);
      console.log(jsonResponse);
   }
   if (typeof jsonResponse.response !== "undefined") {
      return jsonResponse.response;
   } else {
      return transformEmptyObjects(JSON.parse(xml2json(xml, options)));
   }
};

function nativeType(value: any) {
   const nValue = Number(value);
   if (!isNaN(nValue)) {
      return nValue;
   }
   const bValue = value.toLowerCase();
   if (bValue === "true") {
      return true;
   } else if (bValue === "false") {
      return false;
   }
   return value;
}

export const XML_OPTIONS: XML2JSOptions = {
   explicitRoot: false,
   ignoreAttrs: false,
   mergeAttrs: true,
   explicitArray: true,
};

export const xmlBuilder = new Builder(XML_OPTIONS);
