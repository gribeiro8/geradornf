module.exports = function (app) {


    //var evento = app.models.eventos;
    var fs = require('fs');
    var ajuste = require('../middleware/ajustetamanho');
    var verifica = require('../middleware/verifica');
    var validacampo = require('../middleware/validacampos');
    var geraraquivo = require('../middleware/geraarquivos');
    var processamento = require('../middleware/processamentos');

    var analisa = require('../middleware/analisapasta');

    var HomeController = {
        index: function (req, res) {

            res.render('home/index', {
            });

        },

        tratarjson: function (req, res) {


            var arquivos = analisa.analisa('configs/notas');

            for (var index in arquivos) {
                var texto = "";

                // -------------- NOME
                var arquivo = arquivos[index];
                var nomearquivo = arquivo.split('.');
                nomearquivo = nomearquivo[0];

                // -------------- ARQUIVOS
                var modelonota = JSON.parse(fs.readFileSync('configs/notas/'+arquivo, 'utf8'));
                var clientes = JSON.parse(fs.readFileSync('configs/modeloclientes.json', 'utf8'));


                // -------------- CLIENTES
                for (var index in clientes) {

                    // -------------- MODELO NOTA
                    for (var index1 in modelonota) {

                        var campo = modelonota[index1].conteudo;
                        var tamanhocampo = modelonota[index1].tam;
                        var completarcampo = modelonota[index1].completar;

                        // -------------- VALIDAÇÃO
                        if(modelonota[index1].validar=='s'){
                            var valida = validacampo[campo](clientes[index][campo]);
                            if(valida==false){
                                throw new Error('Há um erro na linha '+index+' na validação do '+campo);
                            }
                        }

                        // -------------- PADRÕES
                        clientes[index][campo]=verifica.valorpadrao(clientes[index][campo],campo);

                        // -------------- PROCESSAMENTO
                        if(modelonota[index1].processamento=='s'){
                            clientes[index][campo]=processamento[campo](clientes[index][campo]);
                            if(valida==false){
                                throw new Error('Há um erro na linha '+index+' na validação do '+campo);
                            }
                        }

                        // -------------- NULO
                        clientes[index][campo]=verifica.nulo(clientes[index][campo],campo,arquivo);

                        // -------------- COMPLENTAR
                        clientes[index][campo]=ajuste.completar(clientes[index][campo],tamanhocampo,completarcampo);


                        texto += clientes[index][campo];
                    }
                    texto+="\n";
                }


                geraraquivo.gerar(nomearquivo,texto);
            }


            jsontratado = "";


            res.render('home/embranco', {
                jsontratado: jsontratado
            });
        }


    }
    return HomeController;
}