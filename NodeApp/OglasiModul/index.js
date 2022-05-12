const fs = require('fs');
const PATH="oglasi.json";

let procitajPodatkeIzFajla=()=>{
    let oglasi=fs.readFileSync(PATH, (err, data) => {
        if (err) throw err;
            return data;
    });
    if(oglasi=="")
        oglasi="[]";
    return JSON.parse(oglasi);
}

let snimioglasi=(data)=>{
    fs.writeFileSync(PATH,JSON.stringify(data));
}

exports.sviOglasi = () => {
    return procitajPodatkeIzFajla();
}
exports.addOglas = (noviOglas) => {
    let nesto={};
    let id=1;
    let oglasi=this.sviOglasi();
    if(noviOglas.TekstOglasa.length<10 || noviOglas.TekstOglasa.length >180 || noviOglas.TekstOglasa.length=="" || noviOglas.TekstOglasa.length==undefined){
        return 0
        // let regex=/[0-9]/
        // regex.test(noviOglas.DatumIstekaOglasa)
    }
    if(oglasi.length>0){
        id=oglasi[oglasi.length-1].id+1;
    }
    nesto.id=id;
    nesto.Kategorija=noviOglas.Kategorija
    nesto.DatumIstekaOglasa=noviOglas.DatumIstekaOglasa
    nesto.Cena=noviOglas.Cena
    nesto.TekstOglasa=noviOglas.TekstOglasa
    nesto.Tag=noviOglas.Tag
    nesto.ElektronskaPosta={}
    nesto.ElektronskaPosta[noviOglas.tip]=noviOglas.ElektronskaPosta;
    oglasi.push(nesto)
    snimioglasi(oglasi);
    
}
exports.postaviOglas = (id,cena) => {
    let oglasi=this.sviOglasi();
    oglasi.forEach(element => {
    if(element.id==id)
        element.Cena=cena;
    });
    snimioglasi(oglasi)
}
exports.deleteOglas = (idBr) => {
    snimioglasi(this.sviOglasi().filter(oglas=>oglas.id!=idBr));
}
exports.getOglasByElektronskaPosta = (elektronskaposta,dugme) =>{
    // console.log(elektronskaposta, dugme)
    return this.sviOglasi().filter(oglas=>oglas.ElektronskaPosta[dugme]==elektronskaposta);
}
exports.getOglas = (id) => {
    return this.sviOglasi().find(x => x.id == id);
}