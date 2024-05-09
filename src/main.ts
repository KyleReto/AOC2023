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

  let testInput = fs.readFileSync('../testinput').toString();
  let input = fs.readFileSync('../input').toString();
  let testResult, finalResult: string;
  try {
    testResult = dayModule.main(level, testInput);
  } catch (err){
    testResult = "Error, check console for details.";
    console.error(err);
  }
  try {
    finalResult = dayModule.main(level, input);
  } catch (err){
    finalResult = "Error, check console for details.";
    console.error(err);
  }
 
  const output = `Test: ${testResult}\n\
Final: ${finalResult}`
  res.end(output);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});