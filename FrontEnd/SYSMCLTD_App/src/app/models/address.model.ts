export interface Address {
  id?: number;
  city: string;
  street: string;
  customerId: number | null;
  isDeleted?:boolean;
  created?: Date;
}
