var casper = require('casper').create();
var fs = require('fs');
var utils = require('utils');

var data = fs.read('data.js');
var results = [];
var filename = createFileName();
//console.log('read data:', data);

//split it into an array
arrdata = data.split('\n');

//sanity check
console.log('There were ' + arrdata.length + ' lines read into the array');

casper.start('http://casperjs.org/', function() {
    console.log('starting');
    fs.write(filename, '{"scrapes": \r\n' + '\t"output": { \r\n',  'a');
    rollit(arrdata);
    console.log(JSON.stringify(arrdata);
});
//lets roll through the array

function rollit(arrdata){
    for(var i=0; i < arrdata.length; i++) {

         // show each line 
        //console.log("Here's a line " + arrdata[i]);

        //do some shit with the lines here
        //lets re-var the name so my dumbass isn't confused.

        var input = arrdata[i];
        //console.log('Revaring to ' + input );

        var site = 'http://kaseyclark.com/?s=' + input;
        //console.log('Site query url is ' + site);

        //can't get casper to initate from here....
            casper.thenOpen(site,function(){
                   console.log(this.getTitle());
                   
                   fs.write(filename, '\t \t ["QUERYSTRING": "' + site + '" ], ["Title": "' + this.getTitle() + '"], \r\n',  'a');
                });

            }
            casper.then(function(){
            fs.write(filename, '\t}\r\n' + '} \r\n',  'a');
            
            });
};


function createFileName(){
    var filename = Date.now();
    console.log(filename);
    filename = filename + '.json'
    console.log('filename for this run is: ' +filename);
    return filename;
}


//casper.start('http://opuesta.net/tccp/tccp2014/', function() {
//    this.echo(this.getTitle());
        //if(this.exsists('
//});

casper.run();

