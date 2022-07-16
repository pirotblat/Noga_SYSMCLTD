import { Address } from "./address.model";
import { Contact } from "./contact.model";

export interface Customer {
  id?: number | null;
  customerId: number | null;
  name: string;
  customerNumber: number | null;
  isDeleted?:boolean;
  created?: Date;
  addresses?: Address[];
  contacts?: Contact[];
}
