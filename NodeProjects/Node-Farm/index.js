const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceTamplete = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

const templatesOverview = fs.readFileSync(
  "./public/templates/overview.html",
  "utf-8"
);

const templatesProduct = fs.readFileSync(
  "./public/templates/product.html",
  "utf-8"
);

const templatesProductCard = fs.readFileSync(
  "./public/templates/product-card.html",
  "utf-8"
);

const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   Overview page
  if (pathname === "/" || pathname === "/home" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTamplete(templatesProductCard, el))
      .join("");
    const output = templatesOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTamplete(templatesProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.end("Page not found!");
  }
});

const port = process.env.PORT || 8000;

server.listen(port, "127.0.0.1", () => {
  console.log(`Server listning on port : ${port} `);
});
