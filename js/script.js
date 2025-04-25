let batfirst = "";
let tossWinner = "";
let tossLooser = "";
let lastSixBalls = [];

let firstInnings = {
    team: "",
    runs: 0,
    wickets: 0,
    balls: 0
  };
  
  let secondInnings = {
    team: "",
    runs: 0,
    wickets: 0,
    balls: 0
  };
  
  let isFirstInnings = true;
  
function prepareToss(){
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    if(team1 && team2){
        document.getElementById("leftTeam").innerHTML = team1;
        document.getElementById("rightTeam").innerHTML = team2;
        document.getElementById("tossSection").style.display = "flex";
    }else{
        alert("Enter Both Team Names.")
    }
}

function doToss(){
    
    const team1 = document.getElementById("leftTeam").innerText;
    const team2 = document.getElementById("rightTeam").innerText;
    const winner = Math.random() < 0.5 ? team1 : team2;


    // toss animation
    const tossbtn = document.querySelector(".tossButton");
    tossbtn.classList.add("animate");

    // remove animation class after toss done!

    setTimeout(() => {tossbtn.classList.remove("animate");
    
    document.getElementById("tossResult").style.display = "flex";
    document.getElementById("tossResult").innerText = winner + " Won the toss !"
    document.getElementById("tossSection").style.display = "none";
    document.getElementById("nextBtnDiv").style.display = "flex";
    document.getElementById("bat-ballSelection").style.display = "flex";
    document.getElementById("tossWinningTeam").innerText =  winner + " choose to "

    }, 2000);
}

function next(){
    localStorage.removeItem("finalScore");
    const selectedOption = document.getElementById("selectOpn").value;

    if(!selectedOption){
        alert("Please Select To Bat or Ball First.");
        return;
    }

    const team1 = document.getElementById("leftTeam").innerText;
    const team2 = document.getElementById("rightTeam").innerText;
    const tossWinner = document.getElementById("tossResult").innerText.split(" ")[0];

    let tossLooser = tossWinner === team1 ? team2 : team1;
    if(selectedOption === "BatFirst"){
        batfirst = tossWinner;
    }else if(selectedOption === "BallFirst"){
        batfirst = tossLooser;
    }

   
    document.getElementById("battingfirstTeam").innerText = batfirst;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("table").style.display = "flex"; 
    document.getElementById("lastSixBalls").style.display = "flex";
    document.getElementById("scoreCalculation").style.display = "flex";
    document.getElementById("endInningsBtn").style.display = "flex";
    
   
}

// Score Table Logic
   
    let totalRuns = 0;
    let totalWickets = 0;
    let balls = 0;
    let inningsEnded = false;

    function formatOvers(balls){
      const completeOver = Math.floor(balls / 6); 
      const remainingBalls = balls % 6;
      return `${completeOver}.${remainingBalls}`;
    }

   function updateDisplay(){
    
    document.getElementById("battingfirstTeam").innerText = batfirst;
    document.getElementById("runs").innerText = totalRuns;
    document.getElementById("wickets").innerText = totalWickets;
    document.getElementById("overs").innerText = formatOvers(balls);
   }

   function legalDelivery(){
    balls += 1;
   }
   function addRuns(runs){
    if(inningsEnded){
        return;
    }
    totalRuns += runs;
    legalDelivery();
    updateDisplay();
    updateLastSixBalls(runs.toString());
    checkMatchEndCondition();
   }
   function addWickets(){
    if (inningsEnded) return;
    
    totalWickets += 1;
    if (totalWickets >= 10) {
        endInnings();
        return;
    }

    legalDelivery();
    updateDisplay();
    updateLastSixBalls("W");
    checkMatchEndCondition();
}

   function addNoball(){
    if(inningsEnded) return;
    totalRuns += 1;
    updateDisplay();
    updateLastSixBalls("NB");
    checkMatchEndCondition();
   }
   function addWideball(){
    if(inningsEnded) return;
    totalRuns += 1;
    updateDisplay();
    updateLastSixBalls("WB");
    checkMatchEndCondition();
   }
   function dotball(){
    if(inningsEnded) return;
    legalDelivery();
    updateDisplay();
    updateLastSixBalls("•");
    checkMatchEndCondition();
   }

   function endInnings() {
    inningsEnded = true;

    if (isFirstInnings) {
        // Store first innings details
        firstInnings = {
            team: batfirst,
            runs: totalRuns,
            wickets: totalWickets,
            balls: balls
        };

        // Reset for second innings
        batfirst = (batfirst === document.getElementById("leftTeam").innerText)
                    ? document.getElementById("rightTeam").innerText
                    : document.getElementById("leftTeam").innerText;

        document.getElementById("battingfirstTeam").innerText = batfirst;

        totalRuns = 0;
        totalWickets = 0;
        balls = 0;
        inningsEnded = false;
        isFirstInnings = false;
        lastSixBalls = [];
        updateDisplay();

        alert("Innings Over! Now Second Innings Begins.");
    } else {
        // Store second innings details
        secondInnings = {
            team: batfirst,
            runs: totalRuns,
            wickets: totalWickets,
            balls: balls
        };

        localStorage.setItem("firstInnings", JSON.stringify(firstInnings));
        localStorage.setItem("secondInnings", JSON.stringify(secondInnings));

        // Navigate to result page
        window.location.href = "result.html";
    }
}

  
 function disableScoringButtons(){
 document.querySelectorAll(".score-btn").forEach(btn => btn.disabled = true); 
   }

   function updateLastSixBalls(outcome) {
    lastSixBalls.push(outcome);
    if (lastSixBalls.length > 6) {
        lastSixBalls.shift();
    }

    const display = document.getElementById("lastSixBalls");
    display.innerHTML = "Last 6 Balls: " + lastSixBalls.map((ball, i) => {
        let cls = "ball"; // default
        if (ball === "W") cls += " wicket";
        else if (ball === "1" || ball === "2" || ball === "3") cls += " Runs123"
        else if (ball === "NB") cls += " noball";
        else if (ball === "WB") cls += " wide";
        else if (ball === "4") cls += " boundary";
        else if (ball === "6") cls += " Six";
        else if (ball === "•") cls += " dot";

        return `<span class="${cls}">${ball}</span>${i < lastSixBalls.length - 1 ? '' : ''}`;
    }).join(" ");
}  
  
function checkMatchEndCondition() {
    if (!isFirstInnings && totalRuns > firstInnings.runs) {
        // Second team has won
        secondInnings = {
            team: batfirst,
            runs: totalRuns,
            wickets: totalWickets,
            balls: balls
        };

        localStorage.setItem("firstInnings", JSON.stringify(firstInnings));
        localStorage.setItem("secondInnings", JSON.stringify(secondInnings));
        window.location.href = "result.html"; // Navigate to result page
    }
}
