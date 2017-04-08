var request = require('request');
var cheerio = require('cheerio');







var output = {
               events : []
};




function query(event, connection) {
    connection.query(`INSERT INTO committee_data SET ?`, event , function(err, result) {
   if(err) return err;
    console.log('data inserted');
  });
}


function scrape6(connection) {


var api_key =  "EAACEdEose0cBANQxOqVZAtkyvakZBzGhaOjJhyoSQvwFjc8IadIWeyUvjct0SDy9BlVJDhHZCyFF7gU7SUM0fDhjW0ZBrqEuG5MwzHuSnDtaQXVr9dgdrjWbzD6BOZBuxWYwdYuIOs5ZCpjSMTtcvjdOTKOlEqzFubsak99Kit6riXECJFcJIUzi920960aZBsZD";
var url = `https://graph.facebook.com/v2.8/106731731504/feed?access_token=${api_key}`;
request(url, function(error, response, data){
  var json = JSON.parse(data);
  json['data'].forEach(post => {
    var posturl = 'https://www.facebook.com/'+post["id"].split("_")[0]+'/posts/'+post["id"].split("_")[1];
    const tmp = {
                title : post["message"],
                date : post["created_time"],
               //description : post["story"],
               // venue : json.venue[i],
                link : posturl,
            }

connection.query(`SELECT title FROM committee_data WHERE title = "${tmp.title}"`, function(err, result, fields) {
    if(err) return console.log(err);
    if (result.length > 0) return console.log("Event Already Exist in database");
    query(tmp, connection);
});

  });

});
        

}
module.exports = scrape6; 