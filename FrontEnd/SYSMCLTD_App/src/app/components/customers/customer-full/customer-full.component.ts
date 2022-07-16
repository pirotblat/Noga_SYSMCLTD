import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { Contact } from 'src/app/models/contact.model';
import { Customer } from 'src/app/models/customer.model';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-customer-full',
  templateUrl: './customer-full.component.html',
  styleUrls: ['./customer-full.component.css']
})
export class CustomerFullComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  id: number = 0;
  customer: Customer | null = null;
  addresses: Address[] = [];
  contacts: Contact[] = [];
  nameCustomer='';
  customerId!: number;

  constructor(private srv: GeneralService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    let subscriptionRoute = new Subscription;
    subscriptionRoute = this.route.params.subscribe(param => {
      this.id = +param['id'];
      this.getCustomerData();
    });
    this.subscriptions.push(subscriptionRoute);
  }

  getCustomerData() {
    let subscriptionCustomer = new Subscription;
    subscriptionCustomer = this.srv.getCustomer(this.id)
    .subscribe(c => {
      if(c) {
        this.customer = c;
        this.nameCustomer = this.customer.name;
        this.customerId = this.customer.customerId!;
        this.getCustomerAddresses();
      }
    });
    this.subscriptions.push(subscriptionCustomer);
  }

  getCustomerAddresses() {
    let subscriptionAddresses = new Subscription;
    subscriptionAddresses = this.srv.getCustomerAddresses(this.customer!.customerId!)
    .subscribe(c => {
      if(c) {
        this.customer!.addresses = c;
        this.addresses = c;
      }
      this.getCustomerContacts();
    });
    this.subscriptions.push(subscriptionAddresses);
  }

  getCustomerContacts() {
    let subscriptionContacts = new Subscription;
    subscriptionContacts = this.srv.getCustomerContacts(this.customer!.customerId!)
    .subscribe(c => {
      if(c) {
        this.customer!.contacts = c;
        this.contacts = c;
      }
    });
    this.subscriptions.push(subscriptionContacts);
  }

  goBack() {
    this.location.back()
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
