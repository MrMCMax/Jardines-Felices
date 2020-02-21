//SO2, CO, PM10
var fs = require("fs")
var csv = require('csv-parser')

const maxCO = 0.01
const maxSO2 = 125 
const maxPM10 = 50

//Funciones de parse de csv
function getFecha(row) {
    let string = row["0"] + "";
    let array = string.split(";")
    return array[0];
}

function getCO(row) {
    let array = (row["0"] + "").split(";")
    return array[4];
}

function getSO2(row) {
    let array = (row["0"] + "").split(";")
    return array[3];
}

function getPM10(row) {
    let array = (row["0"] + "").split(";")
    return array[2];
}

//Calcular indice de toxicidad
function calcularIndice(obj) {
    var media = (obj.co * 100 / maxCO) + (obj.so2 * 100 / maxSO2) + (obj.PM10 * 100 / maxPM10);
    media = media / 3;
    return media;
}

//Añadir datos a una vector llamado días
function addDia(row) {
    obj = { fecha: getFecha(row),
                co: getCO(row),
                so2: getSO2(row),
                PM10: getPM10(row)
    }
    obj.indice = calcularIndice(obj)
    dias[obj.fecha] = obj
}

var dias = []

function getNormalDate(dia, mes, anyo) {
    if (dia <= 9) {
        dia = "0" + dia;
    }
    if (mes <= 9) {
        mes = "0" + mes;
    }
    return dia + "/" + mes + "/" + anyo;
}
//Funciones para obtener informacion de dias
function getCOfromDay(dia, mes, anyo) {
    
    return dias[getNormalDate(dia, mes, anyo)].co;
}

function getSO2fromDay(dia, mes, anyo) {
    return dias[getNormalDate(dia, mes, anyo)].so2;
}

function getPM10fromDay(dia, mes, anyo) {
    return dias[getNormalDate(dia, mes, anyo)].PM10;
}
function getIndicefromDay(dia, mes, anyo) {
    return dias[getNormalDate(dia, mes, anyo)].indice;
}

//Leer archivo
fs.createReadStream('./3A.csv')
  .pipe(csv())
  .on('data', (row) => {
    addDia(row);
    console.log(getFecha(row))
    //Continuar
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log(getIndicefromDay("20/03/2018"))
  });
