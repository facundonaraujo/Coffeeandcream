import { MailService } from '../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
// ICONOS
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Formulario ccontacto
  public contactForm: FormGroup;
  private sendMessageModalRef: NgbModalRef;
  // Iconos
  faCheck = faCheck;

  constructor(
    public fb: FormBuilder,
    private maiñService: MailService,
    public sendMessageModal: NgbModal,
    private meta: Meta,
    private titleService: Title
    ) {
    this.contactForm = this.fb.group({
      contactName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required]],
      contactPhone: ['', [Validators.required]],
      contactAffair: ['', [Validators.required]],
      contactMessage: ['', [Validators.required]]
      });
   }

  ngOnInit(): void {
    this.titleService.setTitle('CooffeAndCream - Contacto');
    this.meta.addTag({
      name: 'CooffeAndCream',
      content: 'CooffeAndCream'
    });
    this.meta.updateTag({
        name: 'description',
        content: 'Ante caulquier duda contactenos y le respoderemos a la brevedad.'
    });
  }

  public sendForm(form, confirmsend){
    const data: any = {
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      contactAffair: form.contactAffair,
      contactMessage: form.contactMessage
    };
    this.maiñService.sendMessage(data);
    this.contactForm.reset();
    this.openConfirmSendModal(confirmsend);
  }

  openConfirmSendModal(confirmsend){
    this.sendMessageModalRef = this.sendMessageModal.open(confirmsend);
  }
}
