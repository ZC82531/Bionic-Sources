//Linear Gradient Styling
let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#ffe259", "#ffa751"],
                ["#ee9ca7", "#ffdde1"],
            ],
            transitionSpeed: 3000,
            loop: true,
        }
    }
};

let granimInstance = new Granim(options);

//Object Reference
const database = firebase.database().ref();

  // DOM elements
  const allMessages = document.querySelector(".body");
  const messageElement = document.querySelector("#text");
  const button = document.querySelector("#send");

  // Event listener for the send button
  button.addEventListener("click", function (event) {
    event.preventDefault();

    let response = messageElement.value;
    messageElement.value = "";

    // Create message data
    let element = {
      RESPONDENT: response,
    };

    // Push data to the database
    database.push(element);
  });

  // Event listener for child added
  database.on("child_added", function(childData){
    let messageData = childData.val();
    
    if(messageData.USER != undefined){
    let userMessage = document.createElement("p");
    userMessage.id = "user";
    userMessage.innerHTML = "User: "+messageData.USER;
    allMessages.append(userMessage);
    }

    if(messageData.RESPONDENT != undefined){
        let respondentMessage = document.createElement("p");
        respondentMessage.id = "respondent";
        respondentMessage.innerHTML = "You: "+messageData.RESPONDENT;
        allMessages.append(respondentMessage);
    }
  });

//Typing Animation
    var typed = new Typed('#typed_2',{
        stringsElement: '#second',
        typeSpeed: 50,
        backSpeed: 200,
        loop: true,
      });