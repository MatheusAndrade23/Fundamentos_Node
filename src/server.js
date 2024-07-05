import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

// Padrão de importação "CommonJS" -> require
// Padrão de importação "ESmodules" -> import -> "type": "module" no package.json

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  if (method == "GET" && url == "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    const { name, email } = req.body;

    const user = {
      id: randomUUID(),
      name,
      email,
    };

    database.insert("users", user);

    return res.end("Criação de usuários");
  }

  res.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
