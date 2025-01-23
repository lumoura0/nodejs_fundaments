import http from "node:http"
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Criar um usuário {name, email, senha}
// Listagem de usuários
// Edição de usuários
// Remoção de usuários

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        req.params = { ...routeParams.groups }

        return route.handler(req, res)
    }

    return res.end("hello world")
})

server.listen(3333)