import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../shared/models/product.interface';
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
  public products = [];
  public coffeesDay = [];
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
  private newProductModalRef: NgbModalRef;
  private editProductModalRef: NgbModalRef;
  private deleteProductModalRef: NgbModalRef;
  public productImgActual: any;
  public isCreatingProduct = true;
  public isCoffeeDay = false;
  public coffeeDayPrice: any;

  constructor(
    private firestoreService: AuthService,
    public newProductModal: NgbModal,
    public editProductModal: NgbModal,
    public deleteProductModal: NgbModal,
    private cartService: CartService
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

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      });
    });
    this.firestoreService.getCoffeesDay().subscribe((coffeesSnapshot) => {
      this.coffeesDay = [];
      coffeesSnapshot.forEach((coffeeData: any) => {
        this.coffeesDay.push({
          id: coffeeData.payload.doc.id,
          data: coffeeData.payload.doc.data()
        });
      });
    });
  }
  // MODALES
  openNewProductModal(contenido): void {
    this.newProductModalRef = this.newProductModal.open(contenido);

  }
  closeNewProductModal(): void {
    this.newProductModalRef.close();
  }
  openEditProductModal(edit, productId): void {
    this.editProductModalRef = this.editProductModal.open(edit);
    const editSubscribe = this.firestoreService.getProduct(productId).subscribe((product) => {
      this.documentId = productId;
      this.editProductForm.setValue({
        id: productId,
        productName: product.payload.data()['productName'],
        productDescription: product.payload.data()['productDescription'],
        productPrice: product.payload.data()['productPrice'],
        productCode: product.payload.data()['productCode'],
        productImg: ''
      });
      this.productImgActual = product.payload.data()['productImg']
      this.coffeeDayPrice = product.payload.data()['productPrice']
      editSubscribe.unsubscribe();
    });

  }
  closeEditProductModal(): void {
    this.editProductModalRef.close();
  }
  openDeleteProductModal(deleteproduct, productId): void{
    this.deleteProductModalRef = this.deleteProductModal.open(deleteproduct);
    this.documentId = productId;
    console.log(this.documentId);
  }
  closeDeleteProductModal(): void{
    this.deleteProductModalRef.close();
  }

  // FORMULARIOS
  handleImage(event: any): void{
    this.image = event.target.files[0];
    console.log(this.image);
  }
  editIamge(event: any): void{
    this.editImage = event.target.files[0];
  }

  public newProduct(form) {
      this.coffeeDayPrice = 0;
      this.isCoffeeDay = false;
      const data: Product = {
        productName: form.productName,
        productDescription: form.productDescription,
        productImg: form.productImg,
        productPrice: form.productPrice,
        productCode: form.productCode,
        coffeeDayPrice: this.coffeeDayPrice,
        isCoffeeDay: this.isCoffeeDay
      };
      this.isCreatingProduct = true;
      this.firestoreService.preAddAndUpdateProduct(data, this.image, this.isCreatingProduct, this.documentId);
      this.closeNewProductModal();
      this.newProductForm.setValue({
          productName: '',
          productDescription: '',
          productImg: '',
          productPrice: '',
          productCode: '',
          id: '',
        });
  }
  public editProduct(form) {
    this.isCoffeeDay = false;
    if (this.editImage == null){
      const data: Product = {
        productName: form.productName,
        productDescription: form.productDescription,
        productImg: this.productImgActual,
        productPrice: form.productPrice,
        productCode: form.productCode,
        coffeeDayPrice: this.coffeeDayPrice,
        isCoffeeDay: this.isCoffeeDay
      };
      this.isCreatingProduct = false;
      this.firestoreService.preAddAndUpdateProduct(data, this.editImage, this.isCreatingProduct, this.documentId);
      this.closeEditProductModal();
      this.editProductForm.setValue({
      productName: '',
      productDescription: '',
      productImg: '',
      productPrice: '',
      productCode: '',
      id: '',
    });
      this.editImage = null;
    } else {
      const data: Product = {
        productName: form.productName,
        productDescription: form.productDescription,
        productImg: form.productImg,
        productPrice: form.productPrice,
        productCode: form.productCode,
        coffeeDayPrice: this.coffeeDayPrice,
        isCoffeeDay: this.isCoffeeDay
      };
      this.isCreatingProduct = false;
      this.firestoreService.preAddAndUpdateProduct(data, this.editImage, this.isCreatingProduct, this.documentId);
      this.closeEditProductModal();
      this.editProductForm.setValue({
      productName: '',
      productDescription: '',
      productImg: '',
      productPrice: '',
      productCode: '',
      id: '',
    });
      this.editImage = null;
    }
  }
  public deleteProduct(){
    this.firestoreService.preDeleteProduct(this.documentId);
    this.closeDeleteProductModal();
    this.documentId = '';
  }

  public addCoffeeDay(productId){
    this.isCoffeeDay = true;
    if (this.coffeeDayPrice !== 0 && this.coffeeDayPrice !== undefined && this.coffeeDayPrice !== null && this.coffeeDayPrice !== ''){
      this.firestoreService.updateIsCoffeeDayInProduct(productId, this.isCoffeeDay);
      const addCoffeeDaySubscribe = this.firestoreService.getProduct(productId).subscribe((product) => {
        const producto = {
          coffeeDayPrice: product.payload.data()['coffeeDayPrice'],
          isCoffeeDay: product.payload.data()['isCoffeeDay'],
          productCode: product.payload.data()['productCode'],
          productImg: product.payload.data()['productImg'],
          productName: product.payload.data()['productName'],
          productPrice: product.payload.data()['productPrice'],
          productId: product.payload.id
        };
        this.firestoreService.addCoffeeDay(producto);
      }).unsubscribe;
      this.coffeeDayPrice = 0;
    }else{
      window.alert('Debe modificar el precio del producto antes de agregarlo a cafés del día');
    }
  }

  public async deleteCoffeeDay(coffeeId, productId){
    this.isCoffeeDay = false;
    const valueIsCoffeeDay = false;
    const upd = await this.firestoreService.updateIsCoffeeDayInProduct(productId, valueIsCoffeeDay);
    const rem = await this.firestoreService.removeCoffeeDay(coffeeId);
  }
}
