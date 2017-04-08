var mysql = require('mysql');
var request = require('request');
var cheerio = require('cheerio');

var scrape1 = require('./scrape1');
var scrape2 = require('./scrape2');
var scrape3 = require('./scrape3');
var scrape4 = require('./scrape4');
var scrape5 = require('./scrape5');
var scrape6 = require('./scrape6');
var scrape7 = require('./scrape7');
var scrape8 = require('./scrape8');
var scrape9 = require('./scrape9');
var scrape10 = require('./scrape10');
var scrape11 = require('./scrape11');

//var api_key =  "EAACEdEose0cBANQxOqVZAtkyvakZBzGhaOjJhyoSQvwFjc8IadIWeyUvjct0SDy9BlVJDhHZCyFF7gU7SUM0fDhjW0ZBrqEuG5MwzHuSnDtaQXVr9dgdrjWbzD6BOZBuxWYwdYuIOs5ZCpjSMTtcvjdOTKOlEqzFubsak99Kit6riXECJFcJIUzi920960aZBsZD";



var connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'raithub'
    });


connection.connect(function(error){
   if(!!error){
      console.log('Error');
   }else{
      console.log('Connected to the database!');
   }
});

scrape11(connection);
scrape10(connection);
scrape9(connection);
scrape8(connection);
scrape7(connection);
scrape6(connection);
scrape5(connection);
scrape4(connection);
scrape3(connection);
scrape1(connection);
scrape2(connection);




