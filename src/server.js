import http from "node:http";

// Padrão de importação "CommonJS" -> require
// Padrão de importação "ESmodules" -> import -> "type": "module" no package.json

const users = [];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method == "GET" && url == "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method == "POST" && url == "/users") {
    users.push({ name: "Lucas", email: "lucas@example.com" });

    return res.end("Criação de usuários");
  }

  res.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
