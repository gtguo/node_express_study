
var deviceModels = require('./deviceModel');
var adbkit = require('adbkit');
var Promise = require('bluebird');
var client = adbkit.createClient();
///var model = require('./modelA');


module.exports.home = function(req, res, next) {
  deviceModels.find({connect:"true"},function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

module.exports.modelName = function(req, res) {
  res.send('my model name is ' + deviceModels.modelName);
};
/*
var deviceInfoInsert = function(name,next){
    deviceModels.find({name:name},function(err,docs){    
      if(err) return next(err);
        if(docs.length){
             console.log('deviceIsExisted:' + name); 
             return;
          }else{
             console.log('deviceIsExisted:' + name); 
             deviceModels.create({name: name, connect:'true'});
          }
    })
}
//middleWare
module.exports.insert = function(req, res, next) {
    client.listDevices()
      .then(function(devices) {
      //debugger;
         if(!devices.length){console.log('no devices connect');}
         for(var i=0;i<devices.length;i++){
             var adbdevices = devices[i].id;
             console.log('adbdevices:' + adbdevices);                  
             deviceInfoInsert(adbdevices);              
         }
      })
      .catch(function(err) {
         console.error('Something went wrong:', err.stack)
      });
      res.send('Insert devices done !');
      //next();
};

module.exports.removeDev = function(req,res,next){
  deviceModels.remove({connect:'true'},function(err,doc){
    if(err) return next(err);
    res.send(doc);
  })
}
*/

