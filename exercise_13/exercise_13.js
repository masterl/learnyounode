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
var url = require('url')

function parsetime(time)
{
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

function unixtime(time)
{
    return { unixtime: time.getTime() }
}

var server = http.createServer(function(request,response){
    if(request.method === 'GET')
    {
        var parsed_url = url.parse(request.url,true)
        var query = parsed_url.query
        var ISODateTime = new Date(query.iso)
        var formatted_datetime = ''

        switch(parsed_url.pathname)
        {
            case '/api/parsetime':        
                formatted_datetime = JSON.stringify(parsetime(ISODateTime))
                break;
            case '/api/unixtime':
                formatted_datetime = JSON.stringify(unixtime(ISODateTime))
                break;
            default:
                response.writeHead(404,{'content-type':'text/plain'})
                response.end()
                return
        }
        response.end(formatted_datetime)
    }
    else
    {
        response.writeHead(404,{'content-type':'text/plain'})
        response.end("Not found")
    }
})

server.listen(Number(process.argv[2]))

server.addListener('connection',function(stream) {
    stream.setTimeout(5000);
});
