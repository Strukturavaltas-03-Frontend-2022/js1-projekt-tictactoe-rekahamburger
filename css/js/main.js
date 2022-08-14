

//sajnos egyedül nem tudtam megcsinálni a Js-et ezért használtam netes kódot segítségül

const player = "O";
const player2 = "X";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element != player && element != player2) {
            flag = false;
        }
    });
    board_full = flag;
};

const check_line = (a, b, c) => {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player || play_board[a] == player2)
    );
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return play_board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        return play_board[2];
    }
    return "";
};

const check_for_winner = () => {
    let res = check_match()
    if (res == player) {
        winner.innerText = " A játékos nyert!!";
        winner.classList.add("playerWin");
        board_full = true
    } else if (res == player2) {
        winner.innerText = "A kettes játékos nyert";
        winner.classList.add("player2Win");
        board_full = true
    } else if (board_full) {
        winner.innerText = "Draw!";
        winner.classList.add("draw");
    }
};

const render_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
        if (e == player || e == player2) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}


const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
        play_board[e] = player;
        game_loop();
        addplayer2Move();
    }
};





const addplayer2Move = () => {
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (play_board[selected] != "");
        play_board[selected] = player2;
        game_loop();
    }
};

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove("playerWin");
    winner.classList.remove("player2Win");
    winner.classList.remove("draw");
    winner.innerText = "";
    render_board();
};


render_board();
