const shell = require('shelljs')
const pm2 = require('pm2')
const csv = require('csvtojson')
let MongoClient = require('mongodb').MongoClient

process.send({
            type: 'process:msg',
            data: {
              ended: false
            }
          })

async function saveMultiple(data) {
let url = "mongodb://localhost:27017/";
  console.log(data)
  const csvFilePath='./csv/'+data.data
     csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
      MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
        if (err) throw err;
        let dbo = db.db("test")
        const callback = null
        await createNewEntries(dbo, jsonObj,callback)
        
          
        //const bulk = db.items.initializeUnorderedBulkOp();
       /* dbo.collection("companies").insertMany(jsonObj, (err, res) => {
        if (err) throw err;
          console.log("test")
          shell.exec('rm -rf csv/'+data.data);
          process.send({
            type: 'process:msg',
            data: {
              ended: true
            }
          })
          db.close();
        });*/
        shell.exec('rm -rf csv/'+data.data)
        
      });
    })
     
}

 function createNewEntries (db, entries, callback) {

    
    var collection = db.collection('companies'),          
        bulkUpdateOps = [];  
    const test = false;  
    
    entries.forEach(function(doc, done) {
      
        bulkUpdateOps.push({ "insertOne": { "document": doc } });

        if (bulkUpdateOps.length === 1000) {
            collection.bulkWrite(bulkUpdateOps).then(function(r) {
                // do something with result

            });
            bulkUpdateOps = [];
        }
    })

          setTimeout(function(){ 
            process.send({
            type: 'process:end',
            data: {
              ended: true
            }
          })
           }, 30000);
          
    
     
    
    if (bulkUpdateOps.length > 0) {
        collection.bulkWrite(bulkUpdateOps).then(function(r) {
            console.log("toto")
        });
    }
    

};



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



