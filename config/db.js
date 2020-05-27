const mongoose = require('mongoose');
//configuring data base
(async function (){
  try {
		let connection = await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		if(connection) console.log("Connected to mongoDB successfully");
	} catch (error) {
		console.log('Error', error);
	}
})();
