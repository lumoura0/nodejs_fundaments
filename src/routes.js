import { Database } from './database.js'
import { randomUUID } from "node:crypto"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Ambos ficam na URL
// Request Body: Envio de informação de um formulário (HTTPs)

// http://localhost:3333/users?userId=1
// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1
// POST http://localhost:3333/users

// Edição e Remoção do usuário

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body;

            const user = {
                id: randomUUID(),
                name,
                email,
            }
            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            database.update('users', id, {
                name, email,
            })
            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            database.delete('users', id)
            return res.writeHead(204).end()
        }
    }
]