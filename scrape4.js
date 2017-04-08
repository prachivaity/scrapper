

var request = require('request');
var cheerio = require('cheerio');












function query(event, connection) {
    connection.query(`INSERT INTO scrapped_data SET ?`, event , function(err, result) {
   if(err) return err;
    console.log('data inserted from4');
  });
}


function scrape4(connection) {




  var json = {
                title : [],
                //date  : [],
                //venue : [],
                description : [],
                link : []
           };
var output = {
               events : []
             };




    url = 'http://www.dypatil.edu/category/featured-updates/page/2/';

    request(url, function(error, response, html){
        if(error) return console.log("Network Error, please try again later");
        var $ = cheerio.load(html);

         $('h4.post-title').each(function(){
               json.title.push($(this).children('a').text());
                //console.log($(this).children('a').text())

            });


       // $('.entry-date.published').each(function(){
         //   json.date.push($(this).text());
        //});

        $('div.article-body').each(function(){
            json.description.push($(this).text());
        });

        


       // console.log('title'+fulldate);


       // $('p.event_venue').each(function(){
        //    json.venue.push($(this).text().replace(/Venue: /g,''));
       // });

       $('h4.post-title').each(function(){
            json.link.push($(this).children('a').attr('href'));
            // console.log($(this).children('a').attr('href'))
        });

        // var title = $('p.event_name').each(function(){$(this).text()});
            for(var i=0; i<json.title.length; i++){
            const tmp = {
                title : json.title[i],
                //date : json.date[i],
                 description : json.description[i],
               // venue : json.venue[i],
                link : json.link[i]
            }

            connection.query(`SELECT title FROM scrapped_data WHERE title = "${tmp.title}"`, function(err, result, fields) {
                if(err) return console.log(err);
                if (result.length > 0) return console.log("Event Already Exist in database");
                query(tmp, connection);
            });
        }

      });

}
module.exports = scrape4; 