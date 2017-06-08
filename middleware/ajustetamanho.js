
var completar = function(texto,tamanho,completar) {

    if(texto=="" || texto==undefined){
        var countchar = 0;
    }else{
        var countchar = texto.length;
    }

    var diferenca = tamanho - countchar;

    var textoextra = "";
    if(diferenca>0){
        for(var i=0; i<diferenca; i++){
            textoextra+=completar;
        }
        texto = texto+textoextra;
    }else{
            texto = texto.substring(0, tamanho);

    }
    return texto;


};

module.exports.completar = completar;