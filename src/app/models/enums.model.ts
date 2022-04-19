export enum Role{
    USER = 'USER_ROLE', 
    ADMIN = 'ADMIN_ROLE' 
}

export enum OrderStatus{
    NOT_CONFIRMED = 'No Confirmado',
    CONFIRMED = 'Confirmado',
    COMPLETED = 'Completado',
    CANCELED = 'Cancelado'
}

export enum PaymentMethod{
    CASH = 'Efectivo',
    CREDIT_cARD = 'Tarjeta de crédito',
}

export enum ShippingMethod{
    ENVIO_DOMICILIO = 'Envio a domicilio',
    RETIRO_LOCAL = 'Retiro en el local',
}