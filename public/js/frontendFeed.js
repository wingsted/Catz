// get html elements
var postsContainer = document.getElementById("postsContainer");
var alert = $("#alert");

// create post in memory variable
var posts = [];

function onPostClick(id) {
    console.log('POST CLICKED: ', id)
    window.location.href = "/feed/" + id;
}

// helper method to render the loaded posts
function renderPosts() {
    for (var i in posts) {
        var post = posts[i]

        var card = document.createElement('div');
        card.className = "card mb-4";

        var image = document.createElement('img');
        image.className = "card-img-top";
        image.src = post.imageURL;
        card.appendChild(image);

        // create card body div
        var cardBody = document.createElement('div');
        cardBody.className = "card-body";

        // create cart title h5
        var cardTitle = document.createElement('h4');
        cardTitle.className = "card-title";
        cardTitle.innerText = post.title;

        // add cart title to card body div
        cardBody.appendChild(cardTitle);

        // create cart owner p
        var cardOwner = document.createElement('p');
        cardOwner.className = "card-text";
        cardOwner.innerHTML = '<b>Created by: ' + post.owner.userName + '</b>';

        // add cart owner p to card body div
        cardBody.appendChild(cardOwner);

        // create cart text p
        var cardText = document.createElement('p');
        cardText.className = "card-text";
        cardText.innerText = post.body;

        // add cart text p to card body div
        cardBody.appendChild(cardText);

        // add cart body div to card div
        card.appendChild(cardBody);

        // create footer with comments and likes
        var cardFooter = document.createElement('div');
        cardFooter.className = "card-footer text-muted bg-white";
        cardFooter.innerHTML = 'Likes: ' + post.likes + '<br> Comments: ' + post.comments + '<br>';
        // create the post button
        var button = document.createElement('button');
        button.className = "btn btn-secondary my-2";
        button.innerText = "see more"
        button.onclick = function () {
            onPostClick(post.id);
        };
        cardFooter.appendChild(button)

        // add cart footer div to card div
        card.appendChild(cardFooter);

        // add card to post container
        postsContainer.appendChild(card);
    };
};

// helper method for loading posts
// method provides an offset parameter to load next posts,
// by default is 0 to load the latest posts
function loadPosts(offSet=0) {
    // create new AJAX request to load posts from DB
    var request = new XMLHttpRequest();

    // download the data and respond to response result
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // parse data response to JSON
            var json = JSON.parse(request.responseText);
            console.log("Got response from posts endpoint:");
            console.log(json);
            // add the posts to the local variable
            posts = json
            // render posts when download complete
            renderPosts();
        } else if (this.readyState == 4 && this.status != 200) {
            // there was an error, show it
            alert.show();
        }
    };

    // fire the request
    request.open("GET", "/posts", true);
    request.send();
};

// load first posts
loadPosts();
