var db = require('./db');

module.exports ={
  get: function(id, callback){
		var sql = "select * from employee where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getemp: function(id, callback){
		var sql = "select * from employee where uname=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getAll: function(callback){
		var sql = "select * from employee";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

  insert: function(user, callback){
  var sql = "insert into employee values(?, ?, ?, ?, ?, ?)";
  db.execute(sql, [user.ID, user.name, user.uname, user.phone, user.gender, user.designation], function(status){
    if(status){
      callback(true);
    }else{
      callback(false);
    }
  });
},

  update: function(user, callback){
		var sql = "update employee set name=?, uname=?, phone=?, designation=? where id=?";
		db.execute(sql, [user.name, user.uname, user.phone, user.designation, user.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  updateemp: function(user, callback){
		var sql = "update employee set name=?,uname=?, phone=? where id=?";
		db.execute(sql, [user.name,user.uname, user.phone, user.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  delete: function(id, callback){
		var sql = "delete from employee where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
