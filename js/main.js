/*
 1. User writes username and password and presses Submit button.
 1a. validate input.
 2. Look up username in database.
 3. if username is not found, send "wrong username/password error"
 4. if username is found, check the hashed and salted password.
 5. if password/hash is not correct, send "wrong username/password error".
 6. if username and password is found and correct, do something.
 */

 //User class
class User {
    constructor(userName, firstName, lastName, password, email, profileImageURL) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.profileImageURL = profileImageURL;
    }

    // js get method - gets firstname + lastname
    get name() {
        return this.firstName + " " + this.lastName
    }

};      

class Post {
    constructor(owner, imageURL, title, body, comments, likes) {
        this.owner = owner;
        this.imageURL = imageURL;
        this.title = title;
        this.body = body;
        this.comments = comments;
        this.likes = likes;
    }
};

class Like {
    constructor(owner) {
        this.owner = owner;
    }
};

class Comment {
    constructor(owner, body, likes) {
        this.owner = owner;
        this.body = body;
        this.likes = likes;
    }
};

  
  // HTML reference values
  
  var loginContainer = document.getElementById("login");
  var submitBtn = document.getElementById('submit');
  var usernameField = document.getElementById('username');
  var passwordField = document.getElementById('password');

  var createBtn = document.getElementById('createBtn');
  var createUser = document.getElementById('createUsername');
  var createPass = document.getElementById('createPassword');
  var createFirst = document.getElementById('firstname');
  var createSur = document.getElementById('surname');
  var createEmail = document.getElementById('email');

  // Database
  
  var db = {
    thomasW: new User("Thomas", "Wingsted", "123", "w@w.com", "URL"),
    thomasU: new User("Thomas", "Wingsted", "123", "w@w.com", "URL")
  };
  console.log("Current user database is:", db);
  
  // Helper methods
  
  function showWrongUserPass() {
    alert('You have entered a wrong username/password.');
  };
  
  createBtn.onclick = function() {
     
      alert('User has been created!');
  };

  submitBtn.onclick = function() {
    console.log("Button is clicked");
  
    var username = usernameField.value;
    console.log("User did enter username:", username);
  
    var user = db[username];
    console.log("Lookup in database did find:", user);
  
    var password = passwordField.value;
    console.log("User did enter password:", password);
  
    if (user === undefined) {
      showWrongUserPass();
      return;
    };
  
    if (password !== user.password) {
      showWrongUserPass();  
      return;
    }
    
    console.log('You are now logged in!');
  };
  