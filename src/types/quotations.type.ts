/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IQuotation {
  id: number;
  product: string;
  productDescription: string;
  quotation: null | string;
  supplierName: string;
  location: null | string;
  availability: null | string;
  availableQuantity: null | string;
  unitPrice: null | string;
  createdAt: Date;
  emailReceivedAt: Date;
  isFreightPermitted: boolean | null;
  message: string;
  quotedProducts: any;
}

export interface IQuotationDetails {
  id: number;
  quotation: any;
  supplierName: string;
  location: string;
  createdAt: string;
  emailReceivedAt: string;
  isFreightPermitted: boolean;
  message: string;
  userEmail: string;
  quotedProducts: any[];
}
