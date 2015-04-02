## Synopsis

Node.js module to return an object with location information from an IP address.
This module can be used with various free location API's and will cache the information locally and(optionally) on Firebase to avoid hiting the API too frequently

API's tested:

http://telize.com/geoip/

http://ip-api.com/json/


## Usage

Create a configuration variable. 

```js
var ip2dataConfig = {

  cache: {
    firebase: {
      firebaseUrl: "[FIREBASE_URL]",
      firebaseKey: "[FIREBASE_KEY]",
      expiration: 72, // Expiration in hours
      keyname: "ipcache"  
    }, 

    local: {
      expiration: 72 // Expiration in hours
    }, 
        
  },

  IpApiEndpoint: "http://www.telize.com/geoip/" // You can also use http://ip-api.com/json/

}
```

Initialize ip2data module

```js
var ip2data = require('ip2data')(ip2dataConfig)

```

Initiate the function passing the ip address. The result will be an object with informations such as city, latitude, longitude, depending on selected API.

```js
ip2data(ip,function(error,result){

  console.log(result)

});

```

## Motivation

Create an Angular app to show connected users in a map in real-time

## Installation
```
npm install ip2data
```

## License

(The MIT License)

Copyright (c) 2015 Geraldo Ramos (geraldo@hackhands.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.