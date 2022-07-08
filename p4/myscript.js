


$(function () {

    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        playingNOW = "X",
        playerX=0,
        playerO=0,
        lastWin="",

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});

        document.getElementById("currentTurn").innerHTML= "Now Playing: Player X"; //informing players who should play next

        //informing players about the current scores for both Player X and Player O
        document.getElementById("scoreX").innerHTML= "Player X score: " + playerX;
        document.getElementById("scoreO").innerHTML= "Player O score: " + playerO;
    },


     //Returns whether the given score is a winning score.
    win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {

        if ($(this).html() !== EMPTY)
        {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);
        if (win(score[turn])) //checking if O or X currently has a winning pattern
        {

            document.getElementById("winnerText").innerHTML= "Player " + turn + " wins!!!"; //informing players about who won the game

            $('#myModal1').modal('show'); //showing winner modal

            setTimeout(function()
            {
              $('#myModal1').modal('hide'); //hiding winner modal after 4 seconds
            } , 4000)


            lastWin=turn;

            if(lastWin==="X") //checking who won the game
            {
              playerX++; //incrementing Player X score
              document.getElementById("scoreX").innerHTML= "Player X score: " + playerX; //updating Player X score
            }
            else
            {
              playerO++; //incrementing Player O score
              document.getElementById("scoreO").innerHTML= "Player O score: " + playerO; //updating Player O score
            }



            startNewGame(); //starting a new game


        }
        else if (moves === SIZE * SIZE) //checking if all spaces were filled out without a winner
        {
            $('#myModal2').modal('show'); //showing no winnner modal

            setTimeout(function()
            {
              $('#myModal2').modal('hide'); //hiding no winner modal after 4 seconds
            } , 4000)


            startNewGame(); //starting a new game
        }
        else
        {

            if(turn=="X") //checking value of turn to see who should play next
            {
              playingNOW="O";
            }
            else
            {
              playingNOW="X";
            }


            turn = turn === "X" ? "O" : "X"; //keeping track of whose turn it currently is

            $(document.getElementById("currentTurn").innerHTML= "Now Playing: Player " + playingNOW); //informing players of who should play next
        }
    },



    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        var board = $("<table border=1 cellspacing=0 bgcolor=yellow id=board>"), indicator = 1; //creating table for game
        for (var i = 0; i < SIZE; i += 1) { //outer loop to add 3 rows
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) { //inner loop to add cells
                var cell = $("<td height=100 width=100 align=center valign=center id=cell></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play(); //play function to create grid/table for game

    $("#btnRestart").click(startNewGame); //calling the start game function restart a game that was already in progress
});
