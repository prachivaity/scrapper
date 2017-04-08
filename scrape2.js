var request = require('request');
var cheerio = require('cheerio');


function query(event, connection) {
	connection.query(`INSERT INTO alumni_data SET ?`, event , function(err, result) {
   if(err) return err;
    console.log('data inserted from2');
  });
}



function scrape2(connection) {
    var json = {
                title : [],
                date  : [],
                month : [],
                venue : [],
                link : []
           };
var output = {
               events : []
             };

    url = 'https://raitalumni.dypatil.edu/events/?tag=live';

    request(url, function(error, response, html){
        if(error) return console.log("Network Error, please try again later");
        var $ = cheerio.load(html);

        $('p.event_name').each(function(){
            json.title.push($(this).text());
        });




        $('p.calendar_date').each(function(){
            json.date.push($(this).text());
        });

        $('span.calendar_month').each(function(){
            json.month.push($(this).text());
        });


        //var fulldate = $('p.calendar_date').concat($('p.calendar_day')).text();
        //console.log('all records: ' + fulldate);

        $('p.event_venue').each(function(){
            json.venue.push($(this).text().replace(/Venue: /g,''));
        });

        $('div.event-block').each(function(){
            json.link.push(`https://raitalumni.dypatil.edu${$(this).attr('data-href')}`);
        });

        // var title = $('p.event_name').each(function(){$(this).text()});
    		for(var i=0; i<json.title.length; i++){
            const tmp = {
                title : json.title[i],
                date : json.date[i],
                month : json.month[i],
                venue : json.venue[i],
                link : json.link[i]
            }
            connection.query(`SELECT title FROM alumni_data WHERE title = "${tmp.title}"`, function(err, result, fields) {
                if(err) return console.log(err);
                if (result.length > 0) return console.log("Event Already Exist in database");
                query(tmp, connection);
            });
        }

      });

}
module.exports = scrape2;     