
var express = require('express');
var mongoose = require('mongoose');

var uri = 'mongodb://localhost/mongoose-shared-connection';
global.db = mongoose.createConnection(uri);

var app = express();
var adbkit = require('adbkit');
var Promise = require('bluebird');
var routes = require('./routes');
var deviceModels = require('./deviceModel');
var client = adbkit.createClient();

app.get('/', routes.home);
//app.get('/insert', routes.insert);
app.get('/name', routes.modelName);
//app.get('/remove',routes.removeDev);

/***************************************************************************/
//add for adb listen devices to get device info ,and then save as db begin
//I will create restful api for them later!
/***************************************************************************/

//Insert db 
var deviceInfoInsert = function(name){
    deviceModels.find({name:name},function(err,docs){    
      if(err) return err;
        if(docs.length){
             console.log('deviceIsExisted:' + name); 
             return;
          }else{
             console.log('deviceInserted:' + name); 
             deviceModels.create({name: name, connect:'true'});
          }
    })
}
//remove db
var deviceInfoRemove = function(name){
  deviceModels.remove({name:name},function(err,doc){
    if(err) return err;
    console.log('deviceInfoRemove:' + name);
  })
}
//update db
var deviceInfoUpdate = function(name){
    console.log('deviceInfoUpdate:' + name);
}


//listen devices,Insert db
client.listDevices()
      .then(function(devices) {
      //debugger;
         if(!devices.length){console.log('no devices connect');}
         for(var i=0;i<devices.length;i++){
             var adbdevices = devices[i].id;
             console.log('listDevices:' + adbdevices);                  
             //deviceInfoInsert(adbdevices);              
         }
      })
      .catch(function(err) {
         console.error('Something went wrong:', err.stack)
});
//listen devices,Update db
client.trackDevices()
  .then(function(tracker) {
    tracker.on('add', function(device) {
      console.log('Device %s was plugged in', device.id);
      deviceInfoInsert(device.id);
    })
    tracker.on('remove', function(device) {
      console.log('Device %s was unplugged', device.id);
      deviceInfoRemove(device.id);
    })
    tracker.on('end', function() {
      console.log('Tracking stopped')
    })
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })
/***************************************************************************/
//add for adb listen devices to get device info ,and then save as db end
/***************************************************************************/
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 NOT-FOUND !');
})

app.use(function(req,res){
  res.type('text/plain');
  res.status(500);
  res.send('500 SERVER-ERROR !');
})

app.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});
