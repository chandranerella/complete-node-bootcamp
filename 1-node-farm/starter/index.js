//first core modules
const fs = require('fs')
const http = require('http')
const url = require('url')

//then include third party modules
const slugify = require('slugify')

//then any modules we have created.
const replaceTemplate = require('./modules/replaceTemplate')


// Blocking synchronous way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8')

// const textout = `This is what we know about avocado: ${text}`

// console.log(textout)
// fs.writeFileSync('./txt/output.txt', textout)

//This is top level code. It gets executed before everything since it's outside any function
const tempOverview = fs.readFileSync(`${__dirname}/templates/template_overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template_card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template_product.html`, 'utf-8')


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs)

//Non-blocking asynchron ous way
fs.readFile('./txt/start.txt', 'utf-8',(err, data1) => {
    console.log(data1)
    fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err, data2) => {
        console.log(data2)

        fs.readFile('./txt/append.txt', 'utf-8',(err, data3) => {
            console.log(data3)

            fs.writeFile('./txt/final.txt', `${data1}\n$\n${data3}`, err => {
                console.log('Written to final.txt')
            })
        })




    })
})



//create a server
const server = http.createServer((def, abc) => {
    console.log(url.parse(def.url))
    const {query, pathname} = url.parse(def.url, true)
    if (pathname === '/' || pathname === '/overview') {
        abc.writeHead(200, {'content-type': 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('\n')
        const overview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
        abc.end(overview)
    }
    else if (pathname === '/product') {
        const product = replaceTemplate(tempProduct, dataObj[query.id])
        abc.writeHead(200, {"content-type": 'text/html'})
        abc.end(product)
    }
    else if (pathname === '/api') {
        abc.writeHead(200, {'content-type': 'application/json'});
        replaceTemplate(tempProduct, )
        abc.end(data)
    }
    else {
        abc.writeHead(200, {
            'Content-type': 'text/html',
            'my-own-header': "I'm enjoying coding in Node.js"
        })
        abc.end('<h1>Page not found</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})