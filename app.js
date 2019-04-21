const pm2 = require('pm2')

const testFolder = './csv/'
const fs = require('fs')

const i = 0
const lsread = fs.readdirSync(testFolder)
pm2.connect((err) => {
  if (err) {
    console.log(err)
    process.exit(2)
  }

  pm2.start({
    script: 'savetomongo.js',
    instances: 4
  }, (errora, apps) => {
    if (errora) console.log(apps)
  })

  pm2.launchBus((errorb, bus) => {
    if (errorb) console.log(errorb)
    bus.on('process:msg', (packet) => {
      console.log('ca passe par la')
      if (!packet.data.ended) {
        if (lsread[0] === '.DS_Store') {
          lsread.shift()
        }
        pm2.sendDataToProcessId(packet.process.pm_id, {
          type: 'process:msg',
          data: lsread[0],
          topic: 'toto',
          id: i
        }, (errorc, res) => {
          if (errorc) console.log(res)
          lsread.shift()
        })
      }
    })
    bus.on('process:end', (packet) => {
      console.log('end')
      console.log(`end: ${packet.process.pm_id}`)
      pm2.sendDataToProcessId(packet.process.pm_id, {
        type: 'process:msg',
        data: lsread[0],
        topic: 'toto',
        id: i
      }, (errord, res) => {
        if (errord) console.log(res)
        lsread.shift()
      })
      // pm2.delete(packet.process.pm_id)
    })
  })
})

