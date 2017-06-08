var fs = require('fs');
var config = JSON.parse(fs.readFileSync('configs/modeloconfig.json', 'utf8'));

// Definindo variaveis comuns
var uf = config.uf;
var cnpj = config.cnpj;
var modelonota = config.modelonota;
var ano = config.ano;
var mes = config.mes;

function geranome(tipo) {
    return uf+cnpj+modelonota+"  "+ano+mes+tipo;
}

var gerar = function(tipo,texto) {

    var nome = geranome(config[tipo]);

    fs.writeFile('arquivos/'+nome, texto, function (err) {
        if (err) throw err;
        console.log('Arquivo '+[tipo]+' salvo! '+nome);
    });

}

module.exports.gerar = gerar;
