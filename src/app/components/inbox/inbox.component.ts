import { MailService } from './../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/models/mail.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public noTieneMensajes = true;
  public showInbox = false;
  public showInboxD = false;
  public inbox: Mail[] = [];
  public inboxMesage: Mail | any;

  constructor(private mailService: MailService) { }

  ngOnInit() {}

  showMesagge(correoId: number | any){
    // this.showInbox = false;
    // this.showInboxD = true;
    // await this.contactService.getIndividualMessage(correoId).subscribe((messageSnapshot) => {
    //   this.inboxMesage = [];
    //   this.inboxMesage.push({
    //       id: messageSnapshot.payload.id,
    //       data: messageSnapshot.payload.data()
    //     });
    // }).unsubscribe;
  }

  hideMessage(){
    this.showInbox = true;
    this.showInboxD = false;
  }
}
