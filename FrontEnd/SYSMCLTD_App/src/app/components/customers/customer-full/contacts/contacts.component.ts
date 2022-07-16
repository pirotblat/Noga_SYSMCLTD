import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgbdModalContentComponent } from 'src/app/components/ngbd-modal-content/ngbd-modal-content.component';
import { Contact } from 'src/app/models/contact.model';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  @Input() contacts: Contact[] = [];
  @Input() customerId: number = 0;
  @Input() nameCustomer: string = '';
  contactUpdate!: Contact;
  title: string ='';
  subscriptions: Subscription[] = [];

  constructor(private srv: GeneralService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getContacts() {
    let subscriptionContact = new Subscription;
    subscriptionContact = this.srv.getCustomerContacts(this.customerId)
    .subscribe(c => {
      this.contacts = c;
    });
    this.subscriptions.push(subscriptionContact);
  }

  deleteContact(id: number, index: number) {
    if(confirm('האם אתה בטוח שברצונך למחוק הרשומה')) {
      let subscriptionDelete = new Subscription;
      subscriptionDelete = this.srv.deleteContact(id)
      .subscribe(c => {
        this.contacts.splice(index,1);
      })
      this.subscriptions.push(subscriptionDelete);
    }
  }

  addUpdateContact(content: any, id: number) {
    this.title =(id==0) ? 'הוסף איש קשר לקוח' : 'עדכן איש קשר לקוח';
    if(id != 0) {
      this.contactUpdate = {...this.contacts.find(c => c.id == id)!};
    } else {
      this.contactUpdate = {id:0, fullName: '', officeNumber: '', email: '', customerId: this.customerId};
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((res) => {
    }, (res) => {
    });
  }

  saveContact() {
    if(this.contactUpdate) {
      if(this.contactUpdate.id == 0) {
        this.addContact();
      } else {
        this.updateContact();
      }
    }
  }

  addContact() {
    let subscriptionSave = new Subscription;
    subscriptionSave = this.srv.addContact(this.contactUpdate)
    .subscribe(c => {
      this.getContacts();
      this.modalService.dismissAll();
    });
    this.subscriptions.push(subscriptionSave);
  }

  updateContact() {
    let subscriptionSave = new Subscription;
    subscriptionSave = this.srv.updateContact(this.contactUpdate)
    .subscribe(c => {
      this.getContacts();
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
