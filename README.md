# Coffe And Cream

# Objetivo

El objetivo del presente trabajo es diseñar y desarrollar una plataforma que tiene como objetivo realizar la compra de cafés.

# Definición funcional

La aplicación consiste en una tienda online donde el usuario puede elegir el/los cafés que desee y poder comprarlos a través de los medios de pago disponibles.

La aplicación se divide en varias secciones:

### Inicio

Se muestra la información mas relevante de la empresa(teléfonos, dirección, email, redes sociales, horarios de atención al publico). 

Se muestra una sección con los cafés que están en oferta(Solo por el día).

### Nosotros

Se muestra una breve descripción de la empresa. Se detalla la misión y visión de la empresa.

### Productos

Se destalla un listado de todos los productos disponibles para comprar, destacando los productos con ofertas. Al clickear sobre algún producto se navega a la pantalla del producto donde se visualizan mas detalles del producto y la opción de agregar al carrito.

### Contacto

Esta compuesto por un formulario, el cual solo se puede enviar cuando se completen todos los campos, Cambien se muestran lo datos de contacto de la empresa y horarios de atención.
Una vez enviado el mail llega a la bandeja de entrada del administrador,

Para poder realizar una compra en la plataforma es obligatorio el registro en la misma. Por lo que tiene una botón el cual abre un modal de login/registro.

### Perfil

Esta sección solo la pueden acceder los usuarios logueados en la app con el rol de Cliente.
En ella los clientes puede editar detalles de la cuenta( cambiar su nombre y contraseña) y pueden ver los pedidos que han realizado en la app.

### Administrador

Esta sección solo la pueden acceder los usuarios logueados en la app con el rol de Administrador.

Esta seccion se subdivide en:

- Administrar Productos

    El administrador puede crear/editar/eliminar productos

    El administrador puede agregar/eliminar cafés del día

- Administrar Pedidos

    El administrador puede ver una lista de los pedidos que se han realizado en la app y acceder a su detalle.

- Bandeja de entrada

    El administrador puede ver un listado de los mensajes que les envían los clientes a través del formulario de contacto en la sección de contacto.

### Carrito de compra

Los usuarios pueden agregar productos al carrito de compra, el cual se va actualizando cada vez que se agrega un producto. El cual cuenta con un botón de comprar, que lleva al cliente a una pantalla de checkout donde puede ver el detalle de su carrito(puede eliminar productos desde el detalle). Luego de confirmar pasa a la pantalla de elegir método de pago y luego a la de pagar.

Existen 2 tipos de usuarios:

### Cliente

Es el usuario final de la aplicación, es decir el que realiza la compra y utiliza todas las funciones de la app.

### Administrador

Es el encargado de administrar la plataforma. Puede crear/editar/eliminar productos, agregar/eliminar cafés del día, también puede ver los formularios que les son enviados por los clientes a través del formulario en la sección de contacto y por ultimo puede ver los pedidos que se han realizado en la app.

# **Definiciones técnicas**

La aplicación fue realizada en angular 11 para el frontend. Para el backend se utilizo NodeJs y Express. El front fue subido a firebase y el back a heroku. También se utilizo firebase para la autentificación.

# Anexo

## Links

- **FRONTEND:**  [https://coffee-and-cream.web.app/home](https://coffee-and-cream.web.app/home)

## Run app

Ejecute `npm start` para un servidor de desarrollo. Vaya a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

## Build app

Ejecute `ng build` para construir el proyecto. Los archivos de construcción se almacenarán en el directorio `/dist`. Usa la marca `--prod` para una compilación de producción.
