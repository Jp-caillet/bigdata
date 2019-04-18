const { fork } = require('child_process');
const pm2 = require('pm2');

const testFolder = './csv/';
const fs = require('fs');

let i= 0;
const lsread = fs.readdirSync(testFolder);
pm2.connect( function(err) {
         if(err) {
           console.log(err);
           process.exit(2);
        }
     });

for(let i = 0 ; i<5 ; i++){
   if(lsread[i] != ".DS_Store"){
      
    pm2.start({
        script: 'savetomongo.js'
     }, function(err, apps) {
        
        pm2.sendDataToProcessId({
         type: 'process:msg',
         data: lsread[i],
         topic: 'toto',
         id: i
      }, function(err, res) {
         if (err) console.log(res);
    });
     });
      
  }
}

pm2.launchBus((err, bus) => {
      bus.on('process:msg', (packet) => {
      console.log('end: '+ packet.process.pm_id) 
        pm2.delete(packet.process.pm_id)
     })
    })