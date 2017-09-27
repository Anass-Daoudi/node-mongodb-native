const {MongoClient,ObjectID}=require('mongodb');


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

	//find document(s) that match the filter criteria
	db.collection('Users',(error,collection)=>{
		if(error){
			return console.log('Error while fetching Users collection!',error);
		}
		let cursor=collection.find({
			//Use _id as filter criteria
			_id:new ObjectID('59cabfab94da892a1cf2b090')
		});

		//call toArray() method on the cursor object let getting an array of all documents
		//that the cursor iterate on
		//Note: When the cursor had been already accessed using its methods like next, the array
		//will get just those not accessed documents.
		//To get all documents even if the cursor had been accessed, call rewind() on the cursor object
		//to reset it then call toArray() method 

		cursor.toArray().then((documents)=>{
			console.log('The eventual searched document is',JSON.stringify(documents,undefined,2));
			//Multiple retured documents are possible due to the filter criteria
		},(error)=>{
			console.log('Error has been detected while searching the document!',error);
		});
	});

	//find one document
	//Suppose that we have 3 documents with the same name 'Anass Daoudi'
	//findOne method using the filter criteria {name:'Anass Daoudi'} will
	//just return the first document that match it 
	db.collection('Users',(error,collection)=>{
		if(error){
			return console.log('Error while fetching Users collection!',error);
		}
		collection.findOne({
			name:'Anass Daoudi'
		}).then((result)=>{
			console.log('The first eventual searched document',JSON.stringify(result,undefined,2));
		},(error)=>{
			console.log('Error has been detected while searching the document!',error);
		});
	});

	//delete one document that match the filter criteria
	 db.collection('Users').deleteOne({
     	name: 'Anass Daoudi'
     }).then((result) => {
     	console.log('Result information',result);
     }, (error) => {
     	console.log('Error has been detected while deleting the document!',error);
     });

     //delete all documents that match the filter criteria
     db.collection('Users').deleteMany({
     	name: 'Anass Daoudi'
     }).then((result) => {
     	console.log('Result information',result);
     }, (error) => {
     	console.log('Error has been detected while deleting the document(s)!',error);
     });

     //delete one document that match the criteria filter and return it
     db.collection('Users').findOneAndDelete({
     	_id:new ObjectID('59cc11040b2acb16acee7832')
     }).then((result)=>{
     	console.log('Eventual deleted document returned',JSON.stringify(result.value,undefined,2));
     },(error)=>{
     	console.log('Error has been detected while deleting the document!',error);
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
