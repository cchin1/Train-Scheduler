
    // Initialize Firebase using Candice's snippet
    var config = {
        apiKey: "AIzaSyDA3PyLqYQGvRVGv0p17VnM2tTtd_l4g_c",
        authDomain: "uw-coding-bootcamp-2525e.firebaseapp.com",
        databaseURL: "https://uw-coding-bootcamp-2525e.firebaseio.com",
        projectId: "uw-coding-bootcamp-2525e",
        storageBucket: "uw-coding-bootcamp-2525e.appspot.com",
        messagingSenderId: "668409885681",
        appId: "1:668409885681:web:dcb882a43c6c58cc"
      };
  
      firebase.initializeApp(config);
  
      var database = firebase.database();
  

 // Button for adding a train
 $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency= $("#frequency-input").val().trim();

// Storing new trains
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      frequency: trainFrequency
    };

// Uploading new trains
      database.ref().push(newTrain);
      console.log(newTrain);
      alert("Train added!");

// Clear fields so new train can be added    
    $("#train-input").val("")
    $("#destination-input").val("")
    $("#frequency-input").val("")

    });

// Calculate next train time
function getTrainTime(t, f) {

  var now = moment();
  console.log(now);
  
  var first = moment(t, "HH:mm");
  console.log(first);

  if (moment(now).isBefore(first)) {
    return [first.format("HH:mm"), (first.diff(now, 'minutes'))];
  }

  while (moment(now).isAfter(first)) {
    first.add(f, 'm');
  } 

  return [first.format("HH:mm"), (first.diff(now, 'minutes'))];
};

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;

  var trainArrival = getTrainTime(trainFrequency)[0];
  var trainMinutesAway = getTrainTime(trainFrequency)[1];

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutesAway + "</td></tr>");

  });

  
  
      // Assumptions
      var tFrequency = 3;
  
      // Time is 3:30 AM
      var firstTime = "03:30";
  
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  