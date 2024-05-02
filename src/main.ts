import { createServer, IncomingMessage, ServerResponse } from 'http';
import fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let url = new URL(req.url ?? "", `http://${req.headers.host}`);
  let day = url.searchParams.get("day") ?? "";
  let level = url.searchParams.get('level') ?? "";
  let dayModule;
  if (fs.existsSync(`./days/day${day}.js`)){
    dayModule = await import(`./days/day${day}.js`);
  } else {
    return res.end(`Code for day ${day} not found.`);
  }

  let input = fs.readFileSync('../input.txt').toString();

  res.end(dayModule.main(level, input));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});