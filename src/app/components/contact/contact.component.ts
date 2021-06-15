import { MailService } from '../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
// ICONOS
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
  faHome = faHome;
  faPhone = faPhone;
  faMobile = faMobile;
  faEnvelope = faEnvelope;

  constructor(
    public fb: FormBuilder,
    private maiñService: MailService,
    public sendMessageModal: NgbModal,
    private meta: Meta,
    private titleService: Title
    ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      affair: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.titleService.setTitle('Coffee&Cream - Contacto');
    this.meta.addTag({
      name: 'Coffee&Cream',
      content: 'Coffee&Cream'
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
