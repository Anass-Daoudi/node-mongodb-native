const {MongoClient}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/db').then((db)=>{
	console.log('Connection to MongoDB server from Node.js has been established');


	db.close(false).then((result)=>{
			console.log('Connection to MongoDB server has been successfully closed.');
		},(error)=>{
			console.log('Error has been detected while closing connection to MongoDB server!',error);
		}
	);
},(error)=>{
	if(error){
		return console.log('Error has been detected while connection Node.js to MongoDB server!',error);
	}
});
