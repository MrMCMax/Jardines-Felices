//SO2, CO, PM10
var fs = require("fs")
var csv = require('csv-parser')
var http = require('http')
  
fs.readFile("./3A.csv", function(err, data) {
    if (!err) {
        let rest = data + "";
        rest = rest.substring(rest.indexOf("\n"), rest.length);
        rest = rest.replace(/(\r\n|\n|\r)/gm,";");
        fs.readFile('./jardins.html', function(err, html) {
            
            http.createServer(function(request, response) {
                response.writeHeader(200, {"content-Type": "text/html"});
                var pagina = html + "";
                var n = pagina.indexOf("<script>") + 8;
            
                response.write(pagina.substring(0, n));
                response.write("var data = ");
                response.write("\"" + rest.trim() + "\";");
                response.write(pagina.substring(n, html.length));
                response.end()
            }).listen(8000)
        })
   }
    

})
  
  
  
  
  
  
  
  
  
  
