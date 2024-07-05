import { Readable } from "node:stream";

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

fetch("http://localhost:3333", {
  method: "POST",
  body: new OneToHundredStream(),
});
