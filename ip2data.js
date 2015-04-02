module.exports = function(userConfig){


  var ip2dataConfig = userConfig;

/*
  // Config EXAMPLE

  var ip2dataConfig = {

    cache: {
      firebase: {
        firebaseUrl: "[FIREBASEURL]",
        firebaseKey: "[FIREBASEKEY]",
        expiration: 72, // Expiration in hours
        keyname: "ipcache"  
      }, 

      local: {
        expiration: 72 // Expiration in hours
      }, 
          
    },

    IpApiEndpoint: "http://www.telize.com/geoip/", // make sure to end with "/"


  }

*/

  // Node-rest-client Init

  var Client = require('node-rest-client').Client;
  client = new Client();


  // Firebase Init (only if firebase configuration is set)


  if (ip2dataConfig.cache.hasOwnProperty("firebase")){

    var Firebase = require('firebase');

    var dataRef = new Firebase(ip2dataConfig.cache.firebase.firebaseUrl)

    dataRef.authWithCustomToken(ip2dataConfig.cache.firebase.firebaseKey, function(error, result) {
      if (error) {
        // console.log("Firebase Login Failed!", error);
      } else {
        // console.log("Firebase Authenticated successfully");
        }
    });

  }

  // Cache Functions

  var cache = {

    localStorage: {},

    save: function(ip,result){
      cache.saveFirebase(ip,result)
      cache.saveLocal(ip,result)
    },

    saveFirebase: function(ip,result){

      if (ip2dataConfig.cache.hasOwnProperty("firebase")){

      var ipnodot = ip.replace(/\./g,'-')

      dataRef.child(ip2dataConfig.cache.firebase.keyname).child(ipnodot).update(result)

      } else {
        // console.log("no firebase config information")
      }

    },

    saveLocal: function(ip,result){
      cache.localStorage[ip] = result;
    },

    check: function(ip,cb){

      var cachecheck = cache.checkLocal(ip)

      if (cachecheck)
        cb(null,cachecheck)
      else
        cache.checkFirebase(ip, function(error,data){
          cb(null,data)
        })

    },
    
    checkFirebase: function(ip, cb){

    if (ip2dataConfig.cache.hasOwnProperty("firebase")){

      var ipnodot = ip.replace(/\./g,'-')

      dataRef.child(ip2dataConfig.cache.firebase.keyname).child(ipnodot).once('value', function(snapshot) {

        var exists = (snapshot.val() !== null);

        if (exists) {
          cb(null, snapshot.val())
        } else {
          cb(null,null)
          }

      });

    } else
    cb(null,null)

    },  

    checkLocal: function(ip){
      return cache.localStorage[ip]
    },  

  }

  // Get functions

  var get = {

    LocationOn: function(ip, callback){

      client.get(ip2dataConfig.IpApiEndpoint+ip, function(data, response){
        var dataLocation = {};
        var dataLocation = JSON.parse(data);
        cache.save(ip,dataLocation)
        callback(dataLocation);
      });

    },


    LocationOff: function(ip,cb){

    cache.check(ip,function(error,result){

      var cachecheck = result

            if (cachecheck){
              cb(null,result)
              // console.log("Ip information from cache")
            }
            else {
              get.LocationOn(ip, function(gggg){
              cb(null,gggg)
              // console.log("No cache available, information from the API")
              })
            }  

    });

    }
  }


  return get.LocationOff

}