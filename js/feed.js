var postsContainer = document.getElementById("postsContainer");

let posts = db.posts
for (var post in posts) {
    var card = document.createElement('div');
    card.className = "card mb-4";

    var image = document.createElement('img');
    image.className = "card-img-top";
    image.src = posts[post].imageURL;
    card.appendChild(image);

    // create card body div
    var cardBody = document.createElement('div');
    cardBody.className = "card-body";

    // create cart title h5
    var cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = posts[post].title;

    // add cart title to card body div
    cardBody.appendChild(cardTitle);

    // create cart text p
    var cardText = document.createElement('p');
    cardText.className = "card-text";
    cardText.innerText = posts[post].body;

    // add cart text p to card body div
    cardBody.appendChild(cardText);

    // add cart body div to card div
    card.appendChild(cardBody);

    // add card to post container
    postsContainer.appendChild(card);
};