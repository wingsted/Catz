class User {
    constructor(firstName, lastName, password, email, profileImageURL) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.profileImageURL = profileImageURL;
    }

    get name() {
        return this.firstName + " " + this.lastName
    }

};
