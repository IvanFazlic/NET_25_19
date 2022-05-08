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
    let id=1;
    let oglasi=this.sviOglasi();
    if(oglasi.length>0){
        id=oglasi[oglasi.length-1].id+1;
    }
    noviOglas.id=id;
    oglasi.push(noviOglas)
    snimioglasi(oglasi);
}
exports.postaviOglas = (id,kategorija,datumistekaoglasa,cena) => {
    let oglasi=this.sviOglasi();
    oglasi.forEach(element => {
        if(element.id==id && element.kategorija==kategorija && element.datumistekaoglasa==datumistekaoglasa)
            element.cena=cena;
    });
    snimioglasi(oglasi);
}
exports.deleteOglas = (idNum) => {
    snimioglasi(this.sviOglasi().filter(oglas=>oglas.id!=idNum));
}
exports.getOglasByElektronskaPosta = (elektronskaposta,tip) =>{
    return this.sviOglasi().filter(oglas=>oglas.tip.elektronskaposta==elektronskaposta);
}
exports.getOglas = (id) => {
    return this.sviOglasi().find(x => x.id == id);
}