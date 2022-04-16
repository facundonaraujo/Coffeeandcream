import { Mail } from '../models/mail.model'

export const DEFAULT_MAILS: Mail[] = [
    {
        id: 1,
        asunto: 'Feedback Pedido',
        email: 'user@user.com',
        mensaje:'Me gusto mucho el pedido, sigan asi!!!',
        nombre: 'Test User',
        tel: '123456',
    },
    {
        id: 2,
        asunto: 'Consulta pedidos al por mayor',
        email: 'facundoaraujo14@gmail.com',
        mensaje:'Hola, buenos días, estoy organizando una fiesta y queria saber si hacian pedidos al por mayor para poder encargar. Desde ya muchas gracias, saludos.',
        nombre: 'Facundo Araujo',
        tel: '123456',
    },
]