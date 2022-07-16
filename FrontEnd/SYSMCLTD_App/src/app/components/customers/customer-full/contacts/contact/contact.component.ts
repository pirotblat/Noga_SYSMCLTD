import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input('contact') contact?: Contact;
  @Output() saveContact = new EventEmitter();

  contactForm = new FormGroup({
    fullName: new FormControl(this.contact?.fullName,Validators.required),
    officeNumber: new FormControl(this.contact?.officeNumber),
    email: new FormControl(this.contact?.email),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.saveContact.emit();
  }
}
