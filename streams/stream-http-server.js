import http from "node:http";

import { Readable, Writable, Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * -1;

    console.log(result);

    callback(null, Buffer.from(result.toString()));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const buffer = Buffer.concat(buffers);

  // return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3333);
