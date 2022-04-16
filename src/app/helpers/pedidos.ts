
import { OrderStatus, PaymentMethod, Role } from '../models/enums.model';
import { Pedido } from './../models/pedido.model';

export const DEFAULT_ORDERS: Pedido[] = [
    {
        id: 1,
        total: 135,
        productos: [
            {
                producto: {
                    id: 1,
                    nombre: 'Cappuccino',
                    codigo: '1',
                    descripcion: 'El balance perfecto entre nuestro café espresso, leche vaporizada y abundante espuma de leche.',
                    img: '/assets/coffees-images/cappuccino.png',
                    precio: 65,
                    precioAnterior: 70,
                    isInOferta: true,
                },
                cantidad: 1
            },
            {
                producto:  {
                    id: 2,
                    nombre: 'Café Mocha',
                    codigo: '2',
                    descripcion: 'Delicioso e intenso chocolate, con café espresso y leche al vapor, coronado con crema batida.',
                    img: '/assets/coffees-images/caffe-mocha.png',
                    precio: 70,
                    precioAnterior: 80,
                    isInOferta: true,
                },
                cantidad: 1
            }
        ],
        status: OrderStatus.CONFIRMED,
        formaPago: PaymentMethod.CASH,
        cliente: {
            id: 1,
            email: 'user@user.com',
            password: '123456',
            nombre: 'Test User',
            role: Role.USER,
        }
    },
    {
        id: 2,
        total: 85,
        productos: [
            {
                producto: {
                    id: 3,
                    nombre: 'Espresso Lungo',
                    codigo: '3',
                    descripcion: 'Combinación de dos shots, Espresso Roast con una proporción mayor de agua.',
                    img: '/assets/coffees-images/espresso-lungo.png',
                    precio: 40,
                    isInOferta: false,
                },
                cantidad: 1
            },
            {
                producto: {
                    id: 4,
                    nombre: 'Espresso',
                    codigo: '4',
                    descripcion: 'Es la verdadera esencia del café en la forma más concentrada. El espresso es intenso y fuerte con un toque acaramelado.',
                    img: '/assets/coffees-images/espresso.png',
                    precio: 45,
                    isInOferta: false,
                },
                cantidad: 1
            }
        ],
        status: OrderStatus.CANCELED,
        formaPago: PaymentMethod.CASH,
        cliente: {
            id: 1,
            email: 'user@user.com',
            password: '123456',
            nombre: 'Test User',
            role: Role.USER,
        }
    },
]