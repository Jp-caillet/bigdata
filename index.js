const fs = require('mz/fs');
const csv = require('fast-csv');
const streamToIterator = require('stream-to-iterator');
const shell = require('shelljs');
const { Schema } = mongoose = require('mongoose');
const csvSplitStream = require('csv-split-stream');

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

const Rank = mongoose.model('totos', rankSchema);

const nbligne  = shell.exec('cat StockEtablissement_utf8.csv  | wc -l ');
let nbligneR = Math.round(parseInt(nbligne.stdout)/100);
console.log(nbligneR);

return csvSplitStream.split(
  fs.createReadStream('StockEtablissement_utf8.csv'),
  {
    lineLimit: 250000
  },
  (index) => fs.createWriteStream(`csv/output-${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});

