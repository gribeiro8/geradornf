var fs = require('fs');

/**
 * @name Analisa
 * @desc Recebe um diretório e retorna os arquivos que estão dentro
 * @example
 *      analisa('config/notas') // array('master.json','itens.js')
 * @param dir
 * @returns {Array}
 */
var analisa = function(dir) {

    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        results.push(file);
    });

    return results;
};

module.exports.analisa = analisa;