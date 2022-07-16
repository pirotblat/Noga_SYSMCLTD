import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgbdModalContentComponent } from 'src/app/components/ngbd-modal-content/ngbd-modal-content.component';
import { Address } from 'src/app/models/address.model';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit, OnDestroy {

  @Input() addresses: Address[] = [];
  @Input() customerId: number = 0;
  @Input() nameCustomer: string = '';
  addressUpdate!: Address;
  title: string ='';
  subscriptions: Subscription[] = [];

  constructor(private srv: GeneralService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getAddresses() {
    let subscriptionAddresses = new Subscription;
    subscriptionAddresses = this.srv.getCustomerAddresses(this.customerId)
    .subscribe(c => {
      this.addresses = c;
    });
    this.subscriptions.push(subscriptionAddresses);
  }

  deleteAddress(id: number, index: number) {
    if(confirm('האם אתה בטוח שברצונך למחוק הרשומה')) {
      let subscriptionDelete = new Subscription;
      subscriptionDelete = this.srv.deleteAddress(id)
      .subscribe(c => {
        this.addresses.splice(index,1);
      })
      this.subscriptions.push(subscriptionDelete);
    }
  }

  addUpdateAddress(content: any, id: number) {
    this.title =(id==0) ? 'הוסף כתובת לקוח' : 'עדכן כתובת לקוח';
    if(id != 0) {
      this.addressUpdate = {...this.addresses.find(c => c.id == id)!};
    } else {
      this.addressUpdate = {id:0, city: '', street:'', customerId: this.customerId};
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((res) => {
    }, (res) => {
    });
  }

  saveAddress() {
    if(this.addressUpdate) {
      if(this.addressUpdate.id == 0) {
        this.addAddresses();
      } else {
        this.updateAddresses();
      }
    }
  }

  addAddresses() {
    let subscriptionSave = new Subscription;
    subscriptionSave = this.srv.addAddress(this.addressUpdate)
    .subscribe(c => {
      this.getAddresses();
      this.modalService.dismissAll();
    });
    this.subscriptions.push(subscriptionSave);
  }

  updateAddresses() {
    let subscriptionSave = new Subscription;
    subscriptionSave = this.srv.updateAddress(this.addressUpdate)
    .subscribe(c => {
      this.getAddresses();
      this.modalService.dismissAll();
    });
    this.subscriptions.push(subscriptionSave);
  }

  openModal(msg: string) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.msg = msg;
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
