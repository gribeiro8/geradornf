var moment = require('moment');

var dataemissao = function(texto) {
    return moment().format('YYYYMMDD');
};

module.exports.dataemissao = dataemissao;