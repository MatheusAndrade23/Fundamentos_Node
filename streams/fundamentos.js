// Readable Streams -> Leitura de dados aos poucos
// Writable Streams -> Escrita de dados aos poucos

// req e res são streams por padrão
//_______________________

import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  content = 1;

  _read() {
    const i = this.content++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(i.toString());

        this.push(i);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * -1;

    callback(null, Buffer.from(result.toString()));
  }
}

class MultiplyByTwoStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * 2;

    console.log(result);

    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTwoStream());
