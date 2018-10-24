var con = require('../db-connect');

var userDAO = {

    findOne : (arr , callback)=>{
        var sql = `select * from users where id = ?`
        con.query(sql , arr , (err, result, fields) => {
            if (err) return callback(err);
            callback(null, result[0]);
        })
    },

    login : (arr , callback)=>{
        var sql = `select * from users where id = ? and pw = ?`
        con.query(sql , arr , (err, result, fields) => {
            if (err) return callback(err);
            callback(null, result[0]);
        })
    },

    signup : function(arr, callback){
        var sql = `insert into users set ?`
        con.query(sql , arr , function (err, result, fields) {
            if (err){
                callback(err)
                return;
            }
            callback(null, result);
        })
    },
}



module.exports = userDAO;