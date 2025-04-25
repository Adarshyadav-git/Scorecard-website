function showPlayerInput() {
  const teamA = document.getElementById("teamA").value;
  const teamB = document.getElementById("teamB").value;

  if (!teamA || !teamB) {
      alert("Please enter both team names!");
      return;
  }

  // hide team setup form

  document.querySelector(".teamSetup").style.display = "none";

  document.getElementById("playerDetails").style.display = "flex";
  document.getElementById("teamHeading").textContent = "Enter Player Names";
  document.getElementById("teamANameHeading").textContent = "Team " + teamA;
  document.getElementById("teamBNameHeading").textContent = "Team " + teamB;

  const teamAInputs = document.getElementById("teamAInputs");
  const teamBInputs = document.getElementById("teamBInputs");

  teamAInputs.innerHTML = '';
  teamBInputs.innerHTML = '';

  for (let i = 1; i <= 11; i++) {
      const playerA = document.createElement("input");
      playerA.type = "text";
      playerA.id = "AllplayersofA";
      playerA.placeholder = `Player ${i}`;
      teamAInputs.appendChild(playerA);

      const playerB = document.createElement("input");
      playerB.type = "text";
      playerB.id = "AllplayersofB";
      playerB.placeholder = `Player ${i}`;
      teamBInputs.appendChild(playerB);
  }
}

// it is for teamArranged function
function teamArranged(){
  const teamAplayer = document.getElementById("AllplayersofA").value;
  const teamBplayer = document.getElementById("AllplayersofB").value;

  if(!teamAplayer || !teamBplayer){
    alert("enter all player names.");
    return;
  }

// it is for toss
document.querySelector(".playerinfo").style.display = "none";

document.getElementById("tossSection").style.display = "flex";

}
function prepareToss(){
  const team1 = document.getElementById("teamA").value;
  const team2 = document.getElementById("teamB").value;

  if(team1 && team2){
      document.getElementById("leftTeam").innerHTML = team1;
      document.getElementById("rightTeam").innerHTML = team2;
      
  }
}

function doToss(){
  const team1 = document.getElementById("leftTeam").innerText;
  const team2 = document.getElementById("rightTeam").innerText;
  const winner = Math.random() < 0.5 ? team1 : team2;

  document.getElementById("tossResult").innerText = winner + "Won the toss!"
}