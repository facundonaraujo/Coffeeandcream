import { MailService } from '../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Mail } from 'src/app/models/mail.model';
import { ToastrService } from 'ngx-toastr';

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
  // Iconos
  faCheck = faCheck;
  faHome = faHome;
  faPhone = faPhone;
  faMobile = faMobile;
  faEnvelope = faEnvelope;

  constructor(
    public fb: FormBuilder,
    private mailService: MailService,
    private meta: Meta,
    private titleService: Title,
    public toasterService: ToastrService,
    ) {
      this.contactForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        affair: new FormControl('', [Validators.required]),
        message: new FormControl('', [Validators.required])
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

  public sendForm(form_data: any, form: any){
    const data: Mail = {
      asunto: form_data.affair,
      email: form_data.email,
      mensaje: form_data.message,
      nombre: form_data.name,
      tel: form_data.phone,
    };
    this.mailService.sendMessage(data).subscribe({
      next: (resp) => {
        form.form.markAsPristine();
        form.resetForm();
        this.toasterService.success('El formulario ha sido enviado', 'Operación exitosa');
      },
      error: (err) => {
        this.toasterService.error(err?.error?.msg, 'Operacion NO Exitosa ');
      }
    });
  }

}
