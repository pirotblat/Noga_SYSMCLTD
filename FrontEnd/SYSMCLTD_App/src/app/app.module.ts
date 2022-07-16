import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { NgbdModalContentComponent } from './components/ngbd-modal-content/ngbd-modal-content.component';
import { CustomerFullComponent } from './components/customers/customer-full/customer-full.component';
import { AddressComponent } from './components/customers/customer-full/addresses/address/address.component';
import { ContactComponent } from './components/customers/customer-full/contacts/contact/contact.component';
import { AddressesComponent } from './components/customers/customer-full/addresses/addresses.component';
import { ContactsComponent } from './components/customers/customer-full/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CustomersComponent,
    FooterComponent,
    CustomerComponent,
    NgbdModalContentComponent,
    AddressesComponent,
    ContactsComponent,
    CustomerFullComponent,
    AddressComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
