const shell = require('shelljs')
const csv = require('csvtojson')
const { MongoClient } = require('mongodb')

process.send({
  type: 'process:msg',
  data: {
    ended: false
  }
})

function createNewEntries(db, entries) {
  const collection = db.collection('companies')
  let bulkUpdateOps = []

  entries.forEach((doc) => {
    bulkUpdateOps.push({ insertOne: { document: doc } })

    if (bulkUpdateOps.length === 1000) {
      collection.bulkWrite(bulkUpdateOps).then(() => {

      })
      bulkUpdateOps = []
    }
  })

  setTimeout(() => {
    process.send({
      type: 'process:end',
      data: {
        ended: true
      }
    })
  }, 30000)

  if (bulkUpdateOps.length > 0) {
    collection.bulkWrite(bulkUpdateOps).then(() => {
      console.log('toto')
    })
  }
}

async function saveMultiple(data) {
  const url = 'mongodb://localhost:27017/'
  console.log(data)
  const csvFilePath = `./csv/${data.data}`
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
        if (err) throw err
        const dbo = db.db('test')
        await createNewEntries(dbo, jsonObj)
        shell.exec(`rm -rf csv/${data.data}`)
      })
    })
}

// receive message from master process
process.on('message', async (packet) => {
  console.log('GET MESSAGE: ', packet.id)
  await saveMultiple(packet)
  /* process.send({
      type: 'process:msg',
      data: {
        success: true
      }
    }) */
})

