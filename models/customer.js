var db = require('./db');

module.exports ={
  get: function(id, callback){
		var sql = "select * from customer where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getAll: function(callback){
		var sql = "select * from customer";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

  insert: function(user, callback){
  var sql = "insert into customer values(?, ?, ?, ?)";
  db.execute(sql, [user.ID, user.name, user.uname, user.phone], function(status){
    if(status){
      callback(true);
    }else{
      callback(false);
    }
  });
},

  update: function(user, callback){
		var sql = "update customer set name=?, uname=?, phone=? where id=?";
		db.execute(sql, [user.name, user.uname, user.phone, user.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


  delete: function(id, callback){
		var sql = "delete from customer where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
