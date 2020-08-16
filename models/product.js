var db = require('./db');

module.exports ={
  get: function(id, callback){
		var sql = "select * from product where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getAll: function(callback){
		var sql = "select * from product";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

  insert: function(product, callback){
  var sql = "insert into product values(?, ?, ?, ?)";
  db.execute(sql, [product.ID, product.name, product.quantity, product.price], function(status){
    if(status){
      callback(true);
    }else{
      callback(false);
    }
  });
},

  update: function(product, callback){
		var sql = "update product set name=?, quantity=?, price=? where id=?";
		db.execute(sql, [product.name, product.quantity, product.price, product.ID], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


  delete: function(id, callback){
		var sql = "delete from product where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
