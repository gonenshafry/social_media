const ip = require('ip');
const fs = require('fs');

exports.validate = function(lastip, errcnt, result) {
	if(result.length >0) {
		//user not found, check validation
		if(lastip==ip.address()) {
			if (errcnt > 0)
				errcnt--;
			console.log('You have ' + errcnt + ' tries left');
			if(errcnt<=0) {
				fs.createWriteStream('log.txt', {
  					flags: 'a' // 'a' means appending (old data will be preserved)
				});
				var date = new Date();
				logger.write(lastip + ' ' + date.getTime());
			}
		}
		//new ip
		else {
			lastip = ip.address();
			errcnt = 5;
		}
	}//user not found
}

exports.noval = function(val) {
	if(val == undefined || val == null)
		return true;
	return false;
}