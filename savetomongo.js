const shell = require('shelljs')
const pm2 = require('pm2')
const csv = require('csvtojson')
let MongoClient = require('mongodb').MongoClient



async function saveMultiple(data) {
let url = "mongodb://localhost:27017/";
  const csvFilePath='./csv/'+data.data
    await csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    
      MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        let dbo = db.db("test");
        dbo.collection("companies").insertMany(jsonObj, (err, res) => {
        if (err) throw err;
          console.log("test")
          shell.exec('rm -rf csv/'+data.data);
          process.send({
            type: 'process:msg',
            data: {
              success: true
            }
          })
          db.close();
        });
      });
    })
    

}

// receive message from master process
process.on('message',  async function(packet) {
  console.log('GET MESSAGE: ', packet.id);
  await saveMultiple(packet);
  /*process.send({
      type: 'process:msg',
      data: {
        success: true
      }
    })*/
  
});



