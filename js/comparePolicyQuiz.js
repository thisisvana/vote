$(document).ready(function(){
  //check if browser supports localStorage
  if(typeof(Storage) !== "undefined") {
    voteSet("libResult");
    voteSet("consResult");
    voteSet("greenResult");
    voteSet("ndpResult");
  }
  else {
  //error if localStorage is not excepted
    alert("Sorry, your browser does not support web storage... Voting disabled");
  }

  //Set results to localStorage amounts or to 0 on page load
  function voteSet(partyResult){
    if(localStorage.getItem(partyResult) == null){
      localStorage.setItem(partyResult, 0);
    }
  }

  //Destroy all localStorage variables and refreshes the page(to create localStorage variables again)
  $("#clear").click(function(){
    localStorage.clear();
    location.reload();
  });

  //Click function for filtering
  $(".filterButton").click(function(){
  //get filter data from button for use in toggling hide class
    var filter = $(this).data("filter");
  //toggle .hide class for applicable filtered items
    $("." + filter).each(function(){
      $(this).toggleClass("hide");
    });
  });

  //Assigning vote to appropriate party function
  function voteAssign(partySubString, num){
    switch(partySubString){
      case "l":
        localStorage.libResult = parseInt(localStorage.libResult) + num;
        break;
      case "c":
        localStorage.consResult = parseInt(localStorage.consResult) + num;
        break;
      case "g":
        localStorage.greenResult = parseInt(localStorage.greenResult) + num;
        break;
      case "n":
        localStorage.ndpResult = parseInt(localStorage.ndpResult) + num;
        break;
    }
  }

  //click function for voting on policies
  $(".voteButton").click(function(){
  //get vote data for voting results and localStorage
    var partyAndVoteNum = $(this).data("vote");
    //get first letter of party for use in tallying votes
    var partySubString = partyAndVoteNum.substr(0, 1);

  //check if localStorage.partyAndVoteNum exists if it doesn't, create it
  //set localStorage.partyAndVoteNum to true
    if(localStorage.getItem(partyAndVoteNum) === null) {
      localStorage.setItem(partyAndVoteNum, "true");
      voteAssign(partySubString, 1);
    }
    else{
  //if localStorage.partyAndVoteNum has value of true change value to false(prevents duplication)
      if(localStorage.getItem(partyAndVoteNum) === "true"){
        localStorage.setItem(partyAndVoteNum, "false");
        voteAssign(partySubString, -1);
      }
      else{
        localStorage.setItem(partyAndVoteNum, "true");
        voteAssign(partySubString, 1);
      }
    }
  //Update voting results
    $("#libResult").text(localStorage.libResult);
    $("#consResult").text(localStorage.consResult);
    $("#ndpResult").text(localStorage.ndpResult);
    $("#greenResult").text(localStorage.greenResult);
  });
});
