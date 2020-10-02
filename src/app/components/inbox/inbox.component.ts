import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public noTieneMensajes = true;
  public showInbox = false;
  public showInboxD = false;
  public inbox = [];
  public inboxMesage = [];

  constructor(private contactService: ContactService) { }

  async ngOnInit() {
    await this.contactService.getMessages().subscribe((inboxSnapshot) => {
      this.inbox = [];
      inboxSnapshot.forEach((inboxData: any) => {
        this.inbox.push({
          id: inboxData.payload.doc.id,
          data: inboxData.payload.doc.data()
        });
      });
      if (typeof this.inbox !== undefined && this.inbox.length > 0){
        this.noTieneMensajes = false;
        this.showInbox = true;
        this.showInboxD = false;
        }else{
          this.noTieneMensajes = true;
        }
      }).unsubscribe;
  }

  async showMesagge(correoId){
    this.showInbox = false;
    this.showInboxD = true;
    await this.contactService.getIndividualMessage(correoId).subscribe((messageSnapshot) => {
      this.inboxMesage = [];
      this.inboxMesage.push({
          id: messageSnapshot.payload.id,
          data: messageSnapshot.payload.data()
        });
    }).unsubscribe;
  }

  hideMessage(){
    this.showInbox = true;
    this.showInboxD = false;
  }
}
