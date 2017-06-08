var fs = require('fs');

var valorpadrao = function(texto,campo) {

    var padroes = JSON.parse(fs.readFileSync('configs/padroes.json', 'utf8'));

    for (var index2 in padroes) {
        var campopadrao = padroes[index2].conteudo;
        if(campo==campopadrao){
            var valorpadrao = padroes[index2].valor;
            return valorpadrao;
        }

    }

    return texto;


};

var nulo = function(texto,campo,arquivo) {
    var modelonota = JSON.parse(fs.readFileSync('configs/notas/'+arquivo, 'utf8'));

    if(texto=="" || texto==undefined){
        for (var index2 in modelonota) {
            var camponulo = modelonota[index2].conteudo;
            if(campo==camponulo){
                return modelonota[index2].nulo;
            }
        }
    }else{
        return texto
    }
}

module.exports.valorpadrao = valorpadrao;
module.exports.nulo = nulo;