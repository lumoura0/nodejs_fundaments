import http from "node:http"

// Criar um usuário {name, email, senha}
// Listagem de usuários
// Edição de usuários
// Remoção de usuários


// HTTP
// Método HTTP
// URL
const users = []
const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === "GET" && url === "/users") {
        return res
            .setHeader("Content-Type", "application/json")
            .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {
        users.push({
            id: ,
            name: "shiro",
            email: "example@email.com"
        })
        return res.writeHead(201).end()
    }

    return res.end("hello world")
})

server.listen(3333)