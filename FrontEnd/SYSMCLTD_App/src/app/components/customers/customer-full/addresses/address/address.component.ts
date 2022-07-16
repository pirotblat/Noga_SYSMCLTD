import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input('address') address?: Address;
  @Output() saveAddress = new EventEmitter();

  addressForm = new FormGroup({
    city: new FormControl(this.address?.city,Validators.required),
    street: new FormControl(this.address?.street,Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.saveAddress.emit();
  }
}
