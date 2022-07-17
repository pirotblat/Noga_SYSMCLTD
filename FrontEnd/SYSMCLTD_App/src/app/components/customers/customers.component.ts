import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { GeneralService } from 'src/app/services/general.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { NgbdModalContentComponent } from '../ngbd-modal-content/ngbd-modal-content.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  constructor(private srv: GeneralService,
              private modalService: NgbModal,
              private router: Router) { }

  customers: Customer[] = [];
  customerUpdate!: Customer;
  subscriptions: Subscription[] = [];
  title: string ='';

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    let subscriptionGet = new Subscription;
    subscriptionGet = this.srv.getCustomers()
    .subscribe(c => {
      this.customers = c;
    })
    this.subscriptions.push(subscriptionGet);
  }

  deleteCustomer(id: number, index: number) {
    if(confirm('האם אתה בטוח שברצונך למחוק הרשומה')) {
      let subscriptionDelete = new Subscription;
      subscriptionDelete = this.srv.deleteCustomer(id)
      .subscribe(c => {
        this.customers.splice(index,1);
      })
      this.subscriptions.push(subscriptionDelete);
    }
  }

  addUpdateCustomer(content: any, id: number) {
    this.title =(id==0) ? 'הוסף לקוח' : 'עדכן לקוח';
    if(id != 0) {
      this.customerUpdate = {...this.customers.find(c => c.id == id)!};
    } else {
      this.customerUpdate = {id:0, customerId: null,name:'',customerNumber: null};
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((res) => {
    }, (res) => {
    });
  }

  saveCustomer() {
    if(this.customerUpdate) {
      if(this.customerUpdate.id == 0) {
        this.addCustomer();
      } else {
        this.updateCustomer();
      }
    }
  }

  addCustomer() {
    let subscriptionCheck = new Subscription;
    subscriptionCheck = this.srv.checkCustomer(this.customerUpdate.customerNumber!)
    .subscribe(findCustomer => {
      if(!findCustomer) {
        let subscriptionSave = new Subscription;
        this.customerUpdate.customerNumber = +this.customerUpdate.customerNumber!;
        subscriptionSave = this.srv.addCustomer(this.customerUpdate)
        .subscribe(c => {
          this.getCustomers();
          this.modalService.dismissAll();
        });
        this.subscriptions.push(subscriptionSave);
      } else {
        this.openModal(`קיים לקוח עם אותו מספר מזהה ${this.customerUpdate.customerNumber}`)
      }
    }, error =>{
      console.log(error);
    });
    this.subscriptions.push(subscriptionCheck);
  }

  updateCustomer() {
    let subscriptionSave = new Subscription;
    this.customerUpdate.customerNumber = +this.customerUpdate.customerNumber!;
    subscriptionSave = this.srv.updateCustomer(this.customerUpdate)
    .subscribe(c => {
      this.getCustomers();
      this.modalService.dismissAll();
    });
    this.subscriptions.push(subscriptionSave);
  }

  openModal(msg: string) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.msg = msg;
  }

  showCustomer(id: number) {
    if(id != 0) {
      this.router.navigate(['/customers', id]);
    }
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
