import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  public sendMessage(data: any){
    this.afs.collection('contacts').add(data);
  }

  public getMessages(){
    return this.afs.collection('contacts').snapshotChanges();
  }

  public getIndividualMessage(idMessage: any){
    return this.afs.collection('contacts').doc(idMessage).snapshotChanges();
  }
}
