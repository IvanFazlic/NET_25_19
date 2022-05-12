const { response } = require('express');
var express = require('express');
var oglasiModul=require('OglasiModul');
var app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(request, response)=>{
    response.send("Server radi");
});
//radi
app.get('/svioglasi',(request, response)=>{
    response.send(oglasiModul.sviOglasi())
});
//radi
app.post('/dodajoglas',(request, response)=>{
    oglasiModul.addOglas(request.body);
    response.end("Oglas je dodat");
})
//radi
app.get('/dodajoglas',(request, response)=>{
    response.send(oglasiModul.sviOglasi())
})
//radi
app.put('/postavicenu/:id/:kategorija/:datumistekaoglasa/:cena',(request, response)=>{
    oglasiModul.postaviOglas(request.params["id"],request.params["kategorija"],request.params["datumistekaoglasa"],request.params["cena"]);
    response.end("Cena je postavljena");
});
//radi
app.delete('/deleteoglas/:id',(request, response)=>{
    oglasiModul.deleteOglas(request.params["id"]);
    response.end("Oglas je obrisan");
});
//radi
app.get('/getoglasbyelektronskaposta',(request, response)=>{
    response.send(oglasiModul.getOglasByElektronskaPosta(request.query["elektronskaposta"], request.query["dugme"]));
});
//radi
app.get('/getoglasbyid/:id',(request, response)=>{
    console.log(oglasiModul.getOglas(request.params["id"]))
    response.send(oglasiModul.getOglas(request.params["id"]));
})
app.get('/filtrirajpoid',(request, response)=>{
    response.send(oglasiModul.getOglas(request.query["id"]));
});

app.listen(port,()=>{console.log(`Server je startovan na portu ${port}`)});
