export interface Contact {
  id?: number;
  fullName: string;
  officeNumber?: string;
  email?: string;
  customerId: number | null;
  isDeleted?:boolean;
  created?: Date;
}
