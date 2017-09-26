const {MongoClient}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/db').then((db)=>{
	console.log('Connection to MongoDB server from Node.js has been established');

	//insert one document into Users collection
	db.collection('Users',(error,collection)=>{
		if(error){
			return console.log('Error while fetching Users collection!',error);
		}
		collection.insertOne({
			name:'Anass Daoudi'
		}).then((result)=>{
			console.log('Inserted document is',JSON.stringify(result.ops,undefined,2))
		},(error)=>{
			console.log('Error while inserting the document!',error);
		});
	});

	//insert many documents once into Users collection
	db.collection('Users',(error,collection)=>{
		if(error){
			return console.log('Error while fetching Users collection!',error);
		}
		collection.insertMany([
			{
				name:'Anass Daoudi'
			},{
				name:'Someone Else'
			}
		]).then((result)=>{
			console.log('Inserted documents are',JSON.stringify(result.ops,undefined,2))
		},(error)=>{
			console.log('Error while inserting the documents!',error);
		});
	});

	db.close(false).then((result)=>{
			console.log('Connection to MongoDB server has been successfully closed.');
		},(error)=>{
			console.log('Error has been detected while closing connection to MongoDB server!',error);
		}
	);
},(error)=>{
	console.log('Error has been detected while connection Node.js to MongoDB server!',error);
});
