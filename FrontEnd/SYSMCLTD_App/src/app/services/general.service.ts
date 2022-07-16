import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { Contact } from '../models/contact.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  url = environment.baseURL;
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url + 'Customers');
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}Customers/${id}`);
  }

  getCustomerAddresses(customerId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.url}Addresses/customerAddresses/${customerId}`);
  }

  getCustomerContacts(customerId: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}Contacts/customerContacts/${customerId}`);
  }

  checkCustomer(customerNumber: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}Customers/customerNumber/${customerNumber}`);
  }

  addCustomer(customer:Customer) {
    return this.http.post<Customer>(this.url + 'Customers', customer);
  }

  updateCustomer(customer:Customer) {
    return this.http.put<Customer>(this.url + 'Customers/' + customer.id?.toString(), customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete<number>(this.url + 'Customers/' + id?.toString());
  }

  addAddress(address: Address) {
    return this.http.post<Address>(this.url + 'Addresses', address);
  }

  updateAddress(address: Address) {
    return this.http.put<Address>(this.url + 'Addresses/' + address.id?.toString(), address);
  }

  deleteAddress(id: number) {
    return this.http.delete<number>(this.url + 'Addresses/' + id?.toString());
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>(this.url + 'contacts', contact);
  }

  updateContact(contact:Contact) {
    return this.http.put<Contact>(this.url + 'contacts/' + contact.id?.toString(), contact);
  }

  deleteContact(id: number) {
    return this.http.delete<number>(this.url + 'Contacts/' + id?.toString());
  }

}
