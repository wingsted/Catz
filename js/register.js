// HTML reference values

var createBtn = document.getElementById('createBtn');
var createUser = document.getElementById('createUsername');
var createPass = document.getElementById('createPassword');
var createFirst = document.getElementById('firstname');
var createSur = document.getElementById('surname');
var createEmail = document.getElementById('email');

// Helper methods

createBtn.onclick = function() {
    var user = new User(createUser.value, createUser.value, createPass.value, createFirst.value, createSur.value, createEmail.value);
    alert('User has been created!');
    db[user.userName] = user
    console.log("User was inserted into the database.")
    console.log("Current user database is:", db);
};
