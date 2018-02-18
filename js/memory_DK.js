memoryGame = {};
memoryGame.clickedCard = 0;
memoryGame.truePairs = 0;
memoryGame.paused = false;
memoryGame.array = ['images/1.jpeg', 'images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg'];

memoryGame.double = function(arr) {
    result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(arr[i]);
        result.push(arr[i]);
    }
    return result;
}

memoryGame.shuffle = function(a) {
    var j, x, i;
    for (var i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

memoryGame.createBoard = function() {
    var board = document.getElementById('board');
    var counter = 1;
    for (i = 0; i < 3; i++) {
        var row = document.createElement("div");
        row.className = "row";
        for (j = 0; j < 4; j++) {
            var col = document.createElement("div");
            col.className = "card";
            col.id = counter;
            col.style.backgroundImage = "url('images/card_bg.jpeg')";
            col.addEventListener("click", memoryGame.showCard);
            row.appendChild(col);
            counter++;
        }
        board.appendChild(row);
    }
    document.body.append(board);
}

var card1, card2;

memoryGame.showCard = function(event) {
    if(!memoryGame.paused) {
        var card = event.target;
        var cardId = card.id;
        card.style.backgroundImage = "url(" + memoryGame.array[cardId - 1] + ")";
        if (memoryGame.clickedCard === 0) {
            card1 = card;
            memoryGame.clickedCard = 1;
        } else {
            card2 = card;
            if (card1.style.backgroundImage === card2.style.backgroundImage) {
                memoryGame.truePairs++;
                memoryGame.clickedCard = 0;
            } else {
                memoryGame.paused = true;
                setTimeout(function() {
                    card1.style.backgroundImage = "url('images/card_bg.jpeg')";
                    card2.style.backgroundImage = "url('images/card_bg.jpeg')";
                    memoryGame.clickedCard = 0;
                    memoryGame.paused = false;
                }, 2000);
            }
        }
        if (memoryGame.truePairs === memoryGame.array.length/2) {
            location.reload();
        }
    }
}

memoryGame.startMusic = function() {
    var vid = document.getElementById("music");
    vid.autoplay = true;
    vid.loop = true;
}

memoryGame.start = function () {
    memoryGame.startMusic();
    memoryGame.createBoard();
    memoryGame.array = memoryGame.double(memoryGame.array);
    memoryGame.array = memoryGame.shuffle(memoryGame.array);
    memoryGame.showCard();
}

memoryGame.start();