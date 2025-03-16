/* eslint-disable @typescript-eslint/no-explicit-any */
import { xml2json } from "xml-js";
import { Builder, Options as XML2JSOptions } from "xml2js";

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
   xml = xml.replaceAll(`xml=<?xml version="1.0" encoding="UTF-8"?>`, "");
   xml = xml.replaceAll("rapi-response", "response");
   xml = xml.replaceAll("Request", "request");
   xml = xml.replaceAll("rapi-response", "response");
   xml = xml.replaceAll("api-response", "response");
   xml = xml.replaceAll("api-response", "response");
   xml = xml.replaceAll("transaction-response", "response");
   xml = xml.replaceAll("transaction-response", "response");
   xml = xml.replaceAll("transaction-event", "response");
   xml = xml.replaceAll("referenceNum>", "referenceNumber>");
   const jsonResponse = transformEmptyObjects(
      JSON.parse(xml2json(xml, options))
   );
   if (jsonResponse["request"] !== undefined) {
      if (jsonResponse["request"].response !== undefined) {
         return jsonResponse["request"].response;
      }
      return jsonResponse["Request"];
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
