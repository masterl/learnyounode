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

var async = require('async')
var http = require('http')

var urls = [process.argv[2],process.argv[3],process.argv[4]]

var contents = ['','','']

var quantity = 0

function read_url(url, callback)
{
    var page_content = ''

    http.get(url, function(response)
    {
        response.setEncoding('utf8')
        response.on('data',function(data)
        {
            page_content += data
        })
        response.on('error',function(err){
            callback(err)
        })
        response.on('end',function(data)
        {
            callback(null,page_content)
        })
    })
}

async.map(urls, read_url, function(err, results){
    if(err)
    {
        console.error('Error! > ',err)
    }

    results.forEach(function(result){
        console.log(result)
    })
});