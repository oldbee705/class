window.onload = function (){
  var fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;
  var reload = document.getElementById('reload');
  reload.onclick = restart;
  model.generateShipLocations();
  binding();
}

var view = {
  displaymessage: function(msg) {
    var messagearea = document.getElementById('messagearea');
    messagearea.innerHTML = msg;
  },
  displayhit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute('class', 'hit');
  },
  displaymiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  }
};

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [
    { locations: ['0', '0', '0'], hits: ['', '', ''] },
    { locations: ['0', '0', '0'], hits: ['', '', ''] },
    { locations: ['0', '0', '0'], hits: ['', '', ''] },
  ],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayhit(guess);
        view.displaymessage('HIT!');
      if (this.isSunk(ship)) {
        view.displaymessage('You sank my battleship!');
        this.shipsSunk++;
      }
      return true;
      }
    }
    view.displaymiss(guess);
    view.displaymessage('You missed.');
    return false;
  },
  
  isSunk: function(ship) {
    var count = 0;
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] === 'hit' ) {
        count++
        console.log(count)
      }
    }
    if(Math.floor(count*100/this.shipLength)<67){
      return false;
    }
    return true;
  },

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      }while(this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + '' + (col + i));
      } else {
        newShipLocations.push((row + i) + '' + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

function parseguess(guess) {
  if (guess === null || guess.length !== 2) {
    alert('Oops, please enter a letter and a number on the board.');
  } else {
    firstchar = guess.charAt(0);
    var row = guess.charAt(0);
    var column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board.");
    }else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
      alert("Oops, that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}

var controller = {
  guesses : 0,
  processguess: function(guess){
    var location = parseguess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        alert('You sank all my battleships, in ' + this.guesses + 'guesses');
        view.displaymessage('You sank all my battleships, in ' + this.guesses + 'guesses');
      }
    }
  }
}

function handleFireButton() {
  var guessInput = document.getElementById('guessInput');
  var guess = guessInput.value;
  controller.processguess(guess);
  guessInput.value = '';
}

function handleKeyPress(e) {
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function restart (){
  window.location.reload()
}

function binding(){
  var firez = document.getElementsByTagName('td')
  var tdnodes = document.getElementsByTagName('td').length
  for(var i=0; i<tdnodes ; i++){
    firez[i].onclick = firem
  }
  function firem(){
    var guess = this.id
    controller.processguess(guess);
  }

}