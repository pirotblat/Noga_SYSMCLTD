import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input('customer') customer?: Customer;
  @Output() saveCustomer = new EventEmitter();

  customerForm = new FormGroup({
    customerId: new FormControl(this.customer?.customerId,Validators.required),
    name: new FormControl(this.customer?.name,Validators.required),
    customerNumber: new FormControl(this.customer?.customerNumber,[Validators.required, Validators.maxLength(9), Validators.pattern("^[0-9]*$")]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  get formControls(){
    return this.customerForm.controls;
  }

  onSubmit(): void {
    this.saveCustomer.emit();
  }

}


