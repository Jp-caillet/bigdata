# BigData

this is a little script using multi processing to insert a big csv 

## Installation
- install node v10
- install mongodb 
- git clone https://github.com/Jp-caillet/bigdata.git
- npm install 
- npm install pm2@3.2.5 -g
- cd bigdata
- mkdir csv


insert your csv file on ./bigdata and you must name it "StockEtablissement_utf8.csv"

## Start project

### split your file

node index.js

to split your file on multi file to make easier the insert

### start the insert 

- start a mongo connection on localhost:27017
- start insert with "pm2 start app.js"
- when you want to stop the process make "pm2 delete all"
- to see the activities of your process make "pm2 monit"

Thank for using this project