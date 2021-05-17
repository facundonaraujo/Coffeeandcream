import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

// IMPORT DE ICONOS
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // Iconos
  public faCheck = faCheck;

  public product = [];
  public producto = {
    id: '',
    data: {}
  };
  public userLog: string;
  public userId: string;
  public addCantCartForm = new FormGroup({
    productCant: new FormControl(1)
  });
  public productAddCheck = false;
  public existeP = {
    idP: '',
    data: {}
  };

  constructor(
    private firestoreService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {}

  refrescarEstado() {

  }

  quitarDelCarrito() {}

  agregarAlCarrito(form) {}

}
