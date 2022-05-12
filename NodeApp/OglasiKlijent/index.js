const express = require("express");
const fs=require("fs");
const app = express();
const path = require('path');
const axios = require('axios');
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let procitajPoNazivuStranice=(naziv)=>{
    return fs.readFileSync(path.join(__dirname+"/view/"+naziv+".html"),"utf-8")
}

app.get("/",(req,res)=>{
    res.send(procitajPoNazivuStranice("index"));
});

app.get("/svioglasi",(req,res)=>{
    axios.get('http://localhost:3000/svioglasi')
    .then(response => {
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("svioglasi").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    }); 
});
app.get("/izmeniCenu",(req,res)=>{
    axios.get('http://localhost:3000/svioglasi')
    .then(response => {
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("izmeniCenu").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    }); 
});
app.post("/izmeniCenu",(req,res)=>{
    axios.put(`http://localhost:3000/izmeniCenu/${req.body.id}/${req.body.cena}`).then(response=>{
        console.log(response.data.id)
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("svioglasi").replace("#{data}",prikaz));
    })
    
});


app.get("/dodajoglas",(req,res)=>{
    
    axios.get('http://localhost:3000/dodajoglas')
    .then(response => {
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("dodajOglas").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    });
    
    
});
app.post("/snimioglas",(req,res)=>{
    axios.post("http://localhost:3000/dodajoglas",{
        Kategorija:req.body.kategorija,
        DatumIstekaOglasa:req.body.datum,
        Cena:req.body.cena,
        TekstOglasa:req.body.tekst,
        Tag:req.body.tag,
        ElektronskaPosta:req.body.elektronskaposta,
        tip:req.body.dugme
    })
    res.redirect("/svioglasi");
})

app.get("/filtrirajPostom",(req,res)=>{
    axios.get('http://localhost:3000/svioglasi')
    .then(response => {
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("filtrirajPostom").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    }); 
});
app.get("/pronadjiPutemID",(req,res)=>{
    axios.get('http://localhost:3000/svioglasi')
    .then(response => {
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("pronadjiPutemID").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    }); 
});

app.get("/getoglasbyelektronskaposta",(req,res)=>{
    axios.get(`http://localhost:3000/getoglasbyelektronskaposta?elektronskaposta=${req.query["elektronskaposta"]}&dugme=${req.query["dugme"]}`)
    .then(response=>{
        console.log(response)
        let prikaz="";
        response.data.forEach(element => {
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${element.id}</div>
            <div>Kategorija: ${element.Kategorija}</div>
            <div>Datum: ${element.DatumIstekaOglasa}</div>
            <div>Cena: ${element.Cena}</div>
            <div>Tekst oglasa: ${element.TekstOglasa}</div>
            <a href="/detaljnije/${element.id}">Detaljnije</a>
            <a href="/deleteoglas/${element.id}">Obrisi</a>
            </div>`;
        });
        
        res.send(procitajPoNazivuStranice("svioglasi").replace("#{data}",prikaz));
    })
});
app.get("/getoglasbyid",(req,res)=>{
    axios.get(`http://localhost:3000/filtrirajpoid?id=${req.query["id"]}`)
    .then(response=>{
        console.log(response)
        let prikaz="";
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${response.data.id}</div>
            <div>Kategorija: ${response.data.Kategorija}</div>
            <div>Datum: ${response.data.DatumIstekaOglasa}</div>
            <div>Cena: ${response.data.Cena}</div>
            <div>Tekst oglasa: ${response.data.TekstOglasa}</div>
            <p><a href="/detaljnije/${response.data.id}">Detaljnije</a></p>
            <p><a href="/deleteoglas/${response.data.id}">Obrisi</a></p>
            </div>`;
        
        res.send(procitajPoNazivuStranice("svioglasi").replace("#{data}",prikaz));
    })
});

app.get("/detaljnije/:id",(req,res)=>{
    axios.get(`http://localhost:3000/getoglasbyid/${req.params["id"]}`)
    .then(response => {
        let privatno="";
        let sluzbeno="";
        if(response.data.ElektronskaPosta.sluzbena==undefined){
            response.data.ElektronskaPosta.sluzbena="";
            privatno="Privatna pošta: ";
        }
        if(response.data.ElektronskaPosta.privatna==undefined){
            response.data.ElektronskaPosta.privatna="";
            sluzbeno="Sluzbena pošta: ";
        }
        let prikaz="";
            prikaz+=`
            <div class="grid-item">
            <div>ID: ${response.data.id}</div>
            <div>Kategorija: ${response.data.Kategorija}</div>
            <div>Datum: ${response.data.DatumIstekaOglasa}</div>
            <div>Cena: ${response.data.Cena}</div>
            <div>Tekst oglasa: ${response.data.TekstOglasa}</div>
            <div>Tag: ${response.data.Tag}</div>
            <div>${sluzbeno}${response.data.ElektronskaPosta.sluzbena}</div>
            <div>${privatno}${response.data.ElektronskaPosta.privatna}</div>
            <a href="/deleteoglas/${response.data.id}">Obrisi</a>
            </div>`;
        res.send(procitajPoNazivuStranice("svioglasi").replace("#{data}",prikaz));
    })
    .catch(error => {
        console.log(error);
    });
});
app.get("/deleteoglas/:id",(req,res)=>{
    axios.delete(`http://localhost:3000/deleteoglas/${req.params["id"]}`)
    res.redirect("/svioglasi");
});

app.listen(port,()=>{console.log(`klijent na portu ${port}`)});