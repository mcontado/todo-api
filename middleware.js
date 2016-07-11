var cryptojs = require('crypto-js');

module.exports = function (db) {
	return {
		requireAuthentication: function (req, res, next) {
			var token = req.get('Auth') || '';

			//looking for token in the database (created via login)
			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				//successful token instance
				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user) {
				req.user = user;
				next();
			}).catch(function () {
				res.status(401).send();
			});

		}
	};
};