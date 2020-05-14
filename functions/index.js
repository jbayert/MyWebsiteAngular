const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();




function push_random(arr,value) {
  arr.splice(Math.floor(Math.random() * (arr.length +1)  ), 0, value);
}

/*exports.randomizeGame = functions.firestore
    .ref('gameData/Empire/games/{gameID}/users')
    .onUpdate((change, context) => {
      if ((change.after.data().game_status === "playing")&&(change.before.data().game_status === "accepting users")){
        console.log("Starting Randimization");
        new_ids = []
        new_users = [];
        new_codenames = [];
        new_random_codenames = [];

        db.collection('/gameData/Empire/games/'+context.params.gameID+'/users').get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                new_ids.push(doc.id);
                new_users.push(doc.data().name);
                new_codenames.push(doc.data().codename);
                push_random(new_random_codenames,doc.data().codename)
         
            });
           
            db.doc('/gameData/Empire/games/'+context.params.gameID+'/game_data/random_codenames').set({
               ids:new_ids,
               users:new_users,
               random_codenames:new_random_codenames
            });
          
            db.doc('/gameData/Empire/games/'+context.params.gameID+'/game_data/final_data').set({
              ids:new_ids,
              users:new_users,
              codenames:new_codenames
           }); 

            console.log("Finish Randimization");
            return 0;
        }).catch((error) => {
          console.log(error);
        });
         
      }

      
      
      return 0;
});*/

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.createUserEmpire = functions.firestore
    .ref('gameData/Empire/games/{gameID}/users/{userDoc}')
    .onUpdate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      //const newValue = snap.data();

      console.log("Test",context.params.gameID,context.params.userDoc);

      /*db.ref('/gameData/Empire/games/'+context.params.gameID+'/names/'+context.params.userDoc).set({
        name:snap.data().name,
        uid:snap.data().uid
      });*/
      // access a particular field as you would any JS property
      //const name = newValue.name;
      //console.log(snap.data());
      // perform desired operations ...
      return 0;
});