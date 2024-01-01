const fs = require('fs');
const http = require('http')
const req = require('url')


// const data = fs.readFileSync('./input.txt', 'utf-8')

// console.log(data)

// const textOut = `This is the input that he have from input.txt: ${data} created on ${Date.now()}`
// console.log(textOut)

// fs.writeFileSync('./output.txt', textOut)

// fs.readFile('./file1.txt', 'utf-8', (err1, data1) => {
//     console.log(data1)
//     fs.readFile('./file2.txt', 'utf-8', (err2, data2) => {
//         console.log(data2)
//         fs.writeFile('./append.txt', `${data1}\n${data2}`, 'utf-8', (err3, data) => {
//             console.log("Successfully appended")
//         })
//     })
// })

// console.log("It's asynchronous if it shows up first.")


// const hello = 'Hello World';
// console.log(hello)

//FILE_END

//SERVER_START

const server = http.createServer((req, res) => {
    console.log(req.url)
    const pathName = req.url
    if (pathName === '/') {
        res.end('This is the info page')
    }
    else {
        res.writeHead(404, {

        })
        res.end('<h1>Page not Found.</h1>');
    }
    // res.end("Responding from server!")
})

server.listen(8000, () => {
    console.log("Listening on Port 8000")
})

