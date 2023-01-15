
const http = require("http");

const fs = require('fs')

const fsPromises = require('fs/promises')

const { squareNum, fibonacci } = require("./operations");

const server = http.createServer (async(req, res) => {
  const path = req.url;
  const method = req.method;

  console.log(new Date(), method, path);

  if (path.includes("squareNum") && method === "GET") {
    const n = parseInt(path.split("/").pop());

    return res.end(
      JSON.stringify({
        data: squareNum(n),
      })
    );
  } else if (path.includes("fibonacci") && method === "GET") {
    const num = parseInt(path.split("/").pop());
    return res.end(
      JSON.stringify({
        data: fibonacci(num),
      })
    );
  } else if(path.includes("chunked") && method === "GET") {
    res.write("first chunk\n");
    res.write("second chunk\n");

    return res.end("last chunk");
  }
//  js runs synchronously so if there is any big file so this block the another program so we use async await  

//   else if (path.includes('file') && method === 'GET') {

//     const filename = path.split('/').pop();

//     const data = fs.readFileSync('./' + filename)

//     return res.end(data)
//   }

  else if (path.includes('file') && method === 'GET') {

    const filename = path.split('/').pop();
    
    try { 
        const data = await fsPromises.readFile('./' + filename)
        return res.end(data)}

    catch(err) {
            return res.end('404 Request not found')
        }
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World",
    })
  );
  console.log("request received");
});

server.listen(3030);
console.log("server is listening on http://localhost:3030");
