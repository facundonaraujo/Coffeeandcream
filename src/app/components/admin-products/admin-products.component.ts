import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../models/producto.model';
// Importacion de iconos
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  // Iconos
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faEdit  = faEdit;
  public faMugHot  = faMugHot;

  // Productos
  public products: Producto[] = [];
  public coffeesDay: Producto[] = [];
  public documentId: any;
  public currentStatus = 1;
  public newProductForm = new FormGroup({
    productName: new FormControl(''),
    productDescription: new FormControl(''),
    productImg: new FormControl(''),
    productPrice: new FormControl(''),
    productCode: new FormControl(''),
    id: new FormControl('')
  });
  public editProductForm = new FormGroup({
    productName: new FormControl(''),
    productDescription: new FormControl(''),
    productImg: new FormControl(''),
    productPrice: new FormControl(''),
    productCode: new FormControl(''),
    id: new FormControl('')
  });
  private image: any;
  private editImage: any;
  private newProductModalRef: NgbModalRef | any;
  private editProductModalRef: NgbModalRef | any;
  private deleteProductModalRef: NgbModalRef | any;
  public productImgActual: any;
  public isCreatingProduct = true;
  public isCoffeeDay = false;
  public coffeeDayPrice: any;

  constructor(
    private firestoreService: AuthService,
    public newProductModal: NgbModal,
    public editProductModal: NgbModal,
    public deleteProductModal: NgbModal,
    ) {
    this.newProductForm.setValue({
      productName: '',
      productDescription: '',
      productImg: '',
      productPrice: '',
      productCode: '',
      id: '',
    });
    this.editProductForm.setValue({
      productName: '',
      productDescription: '',
      productImg: '',
      productPrice: '',
      productCode: '',
      id: '',
    });
  }

  ngOnInit(): void {}

  // MODALES
  openNewProductModal(contenido: any): void {
    this.newProductModalRef = this.newProductModal.open(contenido);

  }

  closeNewProductModal(): void {
    this.newProductModalRef?.close();
  }

  openEditProductModal(edit: any, productId: number | any): void {
    // this.editProductModalRef = this.editProductModal.open(edit);
    // const editSubscribe = this.firestoreService.getProduct(productId).subscribe((product) => {
    //   this.documentId = productId;
    //   this.editProductForm.setValue({
    //     id: productId,
    //     productName: product.payload.data()['productName'],
    //     productDescription: product.payload.data()['productDescription'],
    //     productPrice: product.payload.data()['productPrice'],
    //     productCode: product.payload.data()['productCode'],
    //     productImg: ''
    //   });
    //   this.productImgActual = product.payload.data()['productImg']
    //   this.coffeeDayPrice = product.payload.data()['productPrice']
    //   editSubscribe.unsubscribe();
    // });
  }

  closeEditProductModal(): void {
    this.editProductModalRef?.close();
  }

  openDeleteProductModal(deleteproduct: any, productId: number | any): void{
    this.deleteProductModalRef = this.deleteProductModal.open(deleteproduct);
    this.documentId = productId;
    console.log(this.documentId);
  }

  closeDeleteProductModal(): void{
    this.deleteProductModalRef?.close();
  }

  // FORMULARIOS
  handleImage(event: any): void{
    this.image = event.target.files[0];
    console.log(this.image);
  }
  editIamge(event: any): void{
    this.editImage = event.target.files[0];
  }

  newProduct(form: any) {
      // this.coffeeDayPrice = 0;
      // this.isCoffeeDay = false;
      // const data: Product = {
      //   productName: form.productName,
      //   productDescription: form.productDescription,
      //   productImg: form.productImg,
      //   productPrice: form.productPrice,
      //   productCode: form.productCode,
      //   coffeeDayPrice: this.coffeeDayPrice,
      //   isCoffeeDay: this.isCoffeeDay
      // };
      // this.isCreatingProduct = true;
      // this.firestoreService.preAddAndUpdateProduct(data, this.image, this.isCreatingProduct, this.documentId);
      // this.closeNewProductModal();
      // this.newProductForm.setValue({
      //     productName: '',
      //     productDescription: '',
      //     productImg: '',
      //     productPrice: '',
      //     productCode: '',
      //     id: '',
      //   });
  }

  editProduct(form: any) {
    // this.isCoffeeDay = false;
    // if (this.editImage == null){
    //   const data: Product = {
    //     productName: form.productName,
    //     productDescription: form.productDescription,
    //     productImg: this.productImgActual,
    //     productPrice: form.productPrice,
    //     productCode: form.productCode,
    //     coffeeDayPrice: this.coffeeDayPrice,
    //     isCoffeeDay: this.isCoffeeDay
    //   };
    //   this.isCreatingProduct = false;
    //   this.firestoreService.preAddAndUpdateProduct(data, this.editImage, this.isCreatingProduct, this.documentId);
    //   this.closeEditProductModal();
    //   this.editProductForm.setValue({
    //   productName: '',
    //   productDescription: '',
    //   productImg: '',
    //   productPrice: '',
    //   productCode: '',
    //   id: '',
    // });
    //   this.editImage = null;
    // } else {
    //   const data: Product = {
    //     productName: form.productName,
    //     productDescription: form.productDescription,
    //     productImg: form.productImg,
    //     productPrice: form.productPrice,
    //     productCode: form.productCode,
    //     coffeeDayPrice: this.coffeeDayPrice,
    //     isCoffeeDay: this.isCoffeeDay
    //   };
    //   this.isCreatingProduct = false;
    //   this.firestoreService.preAddAndUpdateProduct(data, this.editImage, this.isCreatingProduct, this.documentId);
    //   this.closeEditProductModal();
    //   this.editProductForm.setValue({
    //   productName: '',
    //   productDescription: '',
    //   productImg: '',
    //   productPrice: '',
    //   productCode: '',
    //   id: '',
    // });
    //   this.editImage = null;
    // }
  }

  deleteProduct(){
    // this.firestoreService.preDeleteProduct(this.documentId);
    // this.closeDeleteProductModal();
    // this.documentId = '';
  }

  addCoffeeDay(id: number | any){

  }

  deleteCoffeeDay(id: number | any){

  }

}
