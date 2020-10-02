import { FileI } from './../shared/models/file.interface';
import { Product } from './../shared/models/product.interface';
import { User } from './../shared/models/user.interface';
import { RoleValidator } from './../helpers/roleValidator';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize, first, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator{
  public user$: Observable<User>;
  private filePath: any;
  private downloadUrl: Observable<string>;
  public actualProduct: any;
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    super();
    // Se recupera el usuario logueado
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        // Se comprueba que existe el usuario
        if (user) {
          // En el caso de que exista se recupera la coleccion user con el ducumento del usuario logueado
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error){
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<User>{
    try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }
    catch (error){
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<User>{
    try{
    const {user} = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.updateUserData(user);
    return user;
    }
    catch (error){
      console.log(error);
    }
  }

  onUpdateName(name: any){
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        // User is signed in.
        this.updateUserName(user, name);
      } else {
        // No user is signed in.
      }
    });
  }

  async logout(): Promise<any>{
    try{
    await this.afAuth.signOut();
    }
    catch (error){
      console.log(error);
    }
  }

  getCurrentUser(): Promise<any>{
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  private updateUserData(user: User){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      /* emailVerified: user.emailVerified, */
      displayName: user.displayName,
      role: 'NORMALUSER',
    };
    return userRef.set( data, {merge: true});
  }

  private updateUserName(user: User, name: string){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      /* emailVerified: user.emailVerified, */
      displayName: name,
      role: 'NORMALUSER',
    };

    return userRef.set( data, {merge: true});
  }

  // Obtiene un User
  public getUser(documentId: string) {
    return this.afs.collection('users').doc(documentId).snapshotChanges();
  }
  // Obtiene todos los Users
  public getUsers() {
    return this.afs.collection('users').snapshotChanges();
  }

  // METODOS CRUD PRODUCTOS

  // Crea un nuevo producto
  public createProduct(data: Product) {
    return this.afs.collection('products').add(data);
  }
  // Obtiene un producto
  public getProduct(documentId: string) {
    return this.afs.collection('products').doc(documentId).snapshotChanges();
  }
  // Obtiene todos los productos
  public getProducts() {
    return this.afs.collection('products').snapshotChanges();
  }
  // Actualiza un producto con una nueva imagen
  private updateProduct(documentId: string, data: any) {
    const product = {
      productName: data.productName,
      productDescription: data.productDescription,
      productImg: this.downloadUrl,
      productPrice: data.productPrice,
      productCode: data.productCode,
      coffeeDayPrice: data.coffeeDayPrice,
      isCoffeeDay: data.isCoffeeDay
    };
    return this.afs.collection('products').doc(documentId).update(product);
  }
  // Actualiza un producto manteniendo la imagen actual del producto
  private updateProductSinImg(documentId: string, data: any) {
    const product = {
      productName: data.productName,
      productDescription: data.productDescription,
      productImg: data.productImg,
      productPrice: data.productPrice,
      productCode: data.productCode,
      coffeeDayPrice: data.coffeeDayPrice,
      isCoffeeDay: data.isCoffeeDay
    };
    return this.afs.collection('products').doc(documentId).set(product);
  }
  // Subir imagen
  public preAddAndUpdateProduct(data: Product, image: FileI, isCreate: boolean, documentId: string): void{
    this.uploadImage(data, image, isCreate, documentId);
  }

  public preDeleteProduct(documentId: string): void{
    this.deleteProduct(documentId);
  }

  private deleteProduct(documentId: string){
    return this.afs.collection('products').doc(documentId).delete();
  }

  private saveProduct(data: Product){
    const product = {
      productName: data.productName,
      productDescription: data.productDescription,
      productImg: this.downloadUrl,
      productPrice: data.productPrice,
      productCode: data.productCode,
      coffeeDayPrice: data.coffeeDayPrice,
      isCoffeeDay: data.isCoffeeDay
    };
    this.afs.collection('products').add(product);
  }

  private uploadImage(data: Product, image: FileI, isCreate: boolean, documentId: string){
    if (isCreate === true){
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadUrl = urlImage;
            this.saveProduct(data);
            console.log('Producto Creado');
          });
        })
      ).subscribe();
    } else {
      if (image != null){
        this.filePath = `images/${image.name}`;
        const fileRef = this.storage.ref(this.filePath);
        const task = this.storage.upload(this.filePath, image);
        task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadUrl = urlImage;
            console.log('Producto Editado Con Img');
            this.updateProduct(documentId, data);
          });
        })
      ).subscribe();
      } else {
        console.log('Producto Editado Sin Img');
        this.updateProductSinImg(documentId, data);
      }
    }
  }
  public productDetail(product: Product){
    this.actualProduct = product;
  }

  public addCoffeeDay( data: any){
    return this.afs.collection('coffeeday').add(data);
  }

  public removeCoffeeDay(documentId: any){
    return this.afs.collection('coffeeday').doc(documentId).delete();
  }

  public updateIsCoffeeDayInProduct(documentId: any, iscoffee: any){
    const data = {
      isCoffeeDay: iscoffee
    }
    return this.afs.collection('products').doc(documentId).update(data);
  }

  public getCoffeesDay(){
    return this.afs.collection('coffeeday').snapshotChanges();
  }
}
