// The MIT License (MIT)

// Copyright (c) 2015 Leonardo de Oliveira Lourenço

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var http = require('http')

var server = http.createServer(function(request,response){
    switch(request.url)
    {
        case '/':
            if(request.method === 'POST')
            {
                response.writeHead(200,{'content-type':'text/plain'})
                request.on('data',function(chunk){
                    console.log(chunk.toString().toUpperCase())
                    response.write(chunk.toString().toUpperCase())
                })
                request.on('end',function(data){
                    response.end()
                })
            }
            else
            {
                console.log('ERROR! Method: ',request.method)
            }
            break;
        default:
            response.writeHead(400,{'content-type':'text/plain'})
            console.log('ERROR! Url: ',request.url)
    }
})

server.listen(Number(process.argv[2]))

server.addListener('connection',function(stream) {
    stream.setTimeout(5000);
});
