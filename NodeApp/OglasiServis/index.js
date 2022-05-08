var express = require('express');
var oglasiModul=require('OglasiModul');
var app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(request, response)=>{
    response.send("Server je podignut na portu 3000");
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
app.put('/postavicenu/:id/:kategorija/:datumistekaoglasa/:cena',(request, response)=>{
    oglasiModul.postaviOglas(request.params["id"],request.params["kategorija"],request.params["datumistekaoglasa"],request.params["cena"]);
    response.end("Cena je postavljena");
});
//radi
app.delete('/deleteoglas/:id',(request, response)=>{
    oglasiModul.deleteOglas(request.params["id"]);
    response.end("Oglas je obrisan");
});
//?
app.get('/getoglasbyelektronskaposta',(request, response)=>{
    response.send(oglasiModul.getOglasByElektronskaPosta(request.query["elektronskaposta"],request.query["tip"]));
});

app.get('/getoglasbyid/:id',(request, response)=>{
    response.send(oglasiModul.getOglas(request.params["id"]));
})

app.listen(port,()=>{console.log(`startovan server na portu ${port}`)});
