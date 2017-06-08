var nome = function(texto) {

    return true;

};

var cpf = function(texto) {
    var texto = texto+"";
    if(texto.length!=11){
        console.log("cpf com menos de 11 caracters");
        return false;
    }
};

module.exports.cpf = cpf;

module.exports.nome = nome;