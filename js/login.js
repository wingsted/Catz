// HTML reference values

var loginContainer = document.getElementById("login");
var submitBtn = document.getElementById('submit');
var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');

// Helper methods

// Helper method to show error message when credentials are wrong
function showWrongUserPass() {
    alert('You have entered a wrong username/password.');
};

// User clicks on login, method to handle.
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
