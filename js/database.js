var db = {

    users: {
        thomasW: new User("thomasW", "Thomas", "Wingsted", "123", "w@w.com", "URL"),
    },

    posts: {
        1: new Post("Thomas", "../img/homeCover.png", "title1", "body1"),
        2: new Post("Thomas", "../img/homeCover.png", "title2", "body2"),
        3: new Post("Thomas", "../img/homeCover.png", "title3", "body3")
    },

    comments: {

    },

    likes: {

    }
};
console.log("Current user database is:", db);
