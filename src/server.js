import http from "node:http";

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// Padrão de importação "CommonJS" -> require
// Padrão de importação "ESmodules" -> import -> "type": "module" no package.json

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
