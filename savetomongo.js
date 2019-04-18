const fs = require('mz/fs');
const csv = require('fast-csv');
const streamToIterator = require('stream-to-iterator');
const shell = require('shelljs');
const { Schema } = mongoose = require('mongoose');
const csvSplitStream = require('csv-split-stream');
const pm2 = require('pm2');

const uri = 'mongodb://localhost:27017/test';

mongoose.Promise = global.Promise;
mongoose.set('debug', false);

const rankSchema = new Schema({
 siren: String,
 nic: String,
 siret: String,
 statutdiffusionetablissement: String,
 datecreationetablissement: String,
 trancheeffectifsetablissement: String,
 anneeeffectifsetablissement: String,
 activiteprincipaleregistremetiersetablissement: String,
 to_char: String,
 etablissementsiege: String,
 nombreperiodesetablissement: String,
 complementadresseetablissement: String,
 numerovoieetablissement: String,
 indicerepetitionetablissement: String,
 typevoieetablissement: String,
 libellevoieetablissement: String,
 codepostaletablissement: String,
 libellecommuneetablissement: String,
 libellecommuneetrangeretablissement: String,
 distributionspecialeetablissement: String,
 codecommuneetablissement: String,
 codecedexetablissement: String,
 libellecedexetablissement: String,
 codepaysetrangeretablissement: String,
 libellepaysetrangeretablissement: String,
 complementadresse2etablissement: String,
 numerovoie2etablissement: String,
 indicerepetition2etablissement: String,
 typevoie2etablissement: String,
 libellevoie2etablissement: String,
 codepostal2etablissement: String,
 libellecommune2etablissement: String,
 libellecommuneetranger2etablissement: String,
 distributionspeciale2etablissement: String,
 codecommune2etablissement: String,
 codecedex2etablissement: String,
 libellecedex2etablissement: String,
 codepaysetranger2etablissement: String,
 libellepaysetranger2etablissement: String,
 datedebut: String,
 etatadministratifetablissement: String,
 enseigne1etablissement: String,
 enseigne2etablissement: String,
 enseigne3etablissement: String,
 denominationusuelleetablissement: String,
 activiteprincipaleetablissement: String,
 nomenclatureactiviteprincipaleetablissement: String,
 caractereemployeuretablissement: String
});

const Rank = mongoose.model('companies', rankSchema);


async function saveMultiple(data) {

  /*
  try {
    
    const conn = await mongoose.connect(uri,{ useNewUrlParser: true });

    //await Promise.all(Object.entries(conn.models).map(([k,m]) => m.deleteOne()));

    let headers = Object.keys(Rank.schema.paths)
    .filter(k => ['_id','__v'].indexOf(k) === -1);

    //console.log(headers);

    let stream = fs.createReadStream('csv/'+data.data)
    .pipe(csv({ headers }));

    const iterator = await streamToIterator(stream).init();

    let buffer = [],
    counter = 0;
    let i =0;
    for ( let docPromise of iterator ) {
      let doc = await docPromise;
      buffer.push(doc);
      counter++;
      i++;
      if ( counter > 1000 ) {
        //console.log("ok");
        await Rank.insertMany(buffer);
        buffer = [];
        counter = 0;
        
      }
    }
    console.log(i);
    if ( counter > 0 ) {
      await Rank.insertMany(buffer);
      buffer = [];
      counter = 0;

    }

    

  } catch(e) {
    console.error(e)
    console.log(e);
  } finally {


    shell.exec('rm -rf csv/'+data.data);
    console.log('process '+data.data+' end')
    
  }
  */
  console.log(data)

}

// receive message from master process
process.on('message', function(packet) {
  console.log('GET MESSAGE: ', packet.id);
  saveMultiple(packet);
  process.send({
      type: 'process:msg',
      data: {
        success: true
      }
    })
  
});



