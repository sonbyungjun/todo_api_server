var con = require('../db-connect');

var todoDAO = {

    add : function(params, cb){
        var sql = `insert into todos set ?`
        con.query(sql , params , function (err, result, fields) {
            if (err) return cb(err)
            cb(null, result);
        })
    },

    list : function(params, cb){
        var sql = `select * from todos where writer = ?`
        con.query(sql, params, function (err, results, fields) {
            if (err) return cb(err)
            cb(null, results);
        })
    },

    done :  function(params, cb){
        var sql = `update todos set is_done = ? where no = ?`
        con.query(sql , params , function (err, result, fields) {
            if (err) return cb(err)
            cb(null, result);
        })
    }


}

module.exports = todoDAO;