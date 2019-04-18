let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

const csvFilePath='./csv/output-0.csv'
const csv = require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
	  if (err) throw err;
	  var dbo = db.db("test");
	  dbo.collection("companies").insertMany(jsonObj, (err, res) => {
		if (err) throw err;
		db.close();
	  });
	});
})