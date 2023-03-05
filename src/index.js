let addToy = false;
const toyData = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const toyImgs = document.getElementsByClassName("toy-avatar")
const newToyName = document.querySelector("input[name='name']");
const newToyImageSrc = document.querySelector("input[name='image']");
const newToySubmit = document.getElementsByClassName("add-toy-form")[0];
const likeButton = document.querySelector(".like-btn");
let newToyNameInput = newToyName.value;
let newToyImageSrcInput = newToyImageSrc.value;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Fetch and create toy cards
fetch(toyData)
  .then((response) => response.json())
  .then(data => {
    for(const toy in data) {
      const newToy = document.createElement("div");
      newToy.setAttribute("class", "card");
      toyCollection.appendChild(newToy)

      //Generate toy card name
      const newToyHead = document.createElement("h2");
      newToyHead.innerText = data[toy]["name"];

      //Create picture of toy in card
      const newToyImg = document.createElement("img");
      newToyImg.setAttribute("src", data[toy]["image"])
      newToyImg.classList.add("toy-avatar");

      //Create new toy like counter
      let likeNumber = data[toy]["likes"];
      const newToyLikes = document.createElement("p");
      newToyLikes.innerText = "This toy has " + likeNumber + " likes.";

      //Create new toy button
      const newToyButton = document.createElement("button");
      const toyDataId = toyData + data[toy]["id"]
      newToyButton.classList.add("like-btn");
      newToyButton.id = data[toy]["id"];
      newToyButton.innerText = "Like ❤️"

    //Add event listener to like
    //Increment likes on click (PATCH)
    newToyButton.addEventListener("click", () => {
      likeNumber++;
      newToyLikes.innerText = "This toy has " + likeNumber + " likes.";
      fetch(`http://localhost:3000/toys/${newToyButton.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"likes": likeNumber})
        }) 
        .then(res => res.json())
        .then(data => console.log("hello"))
      })

      //console.log(event.target.id)

      //Add all the elements in order
      newToy.appendChild(newToyHead);
      newToy.appendChild(newToyImg);
      newToy.appendChild(newToyLikes);
      newToy.appendChild(newToyButton);
    }
  })

//Add new toy
//Add event listener to submit
newToySubmit.addEventListener("submit", (event) => {
  console.log(newToyName)
  console.log(newToyImageSrc)
  const toyObj = {"name": newToyName.value, "image": newToyImageSrc.value, "likes": 0}
  addToyForm(toyObj)})

function addToyForm(toyObj){
  fetch(toyData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => {
    console.log(res)
    res.json()})
}