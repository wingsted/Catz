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
