const gameBoard=document.querySelector('.gameBoard');
const gameTurn=document.querySelector('.gameTurn');
const endGame=document.querySelector('.endGame');
const endGameResult=document.querySelector('.endGameResult');
const newGameButton=document.querySelector('.newGameButton');
let xTurn=true;
let turn=0;
let maxTurn=9;
let players={
    x:'cross',
    o:'circle'
}
const winningPositions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
startGame();
function startGame(){
    createBoard();
    gameTurn.textContent=xTurn?'X':'O';
    turn=0;
    xTurn=true;
    endGame.classList.remove('show');
}
function createBoard(){
    while(gameBoard.firstElementChild){
        gameBoard.firstElementChild.remove();
    }
    for(let i=0;i<9;i++){
        const div=document.createElement('div');
        div.classList.add('cell');
        div.addEventListener('click', handleGame, {once:true});
        gameBoard.append(div);
    }
}
function handleGame(e){
    const currentCell=e.currentTarget;
    const currentTurn=xTurn?players.x:players.o;
    turn++;
    drawShape(currentCell, currentTurn);
    if(checkWinner(currentTurn))return;
    if(turn===maxTurn){
        showEndGame(false);
    }
    changeTurn();
}
function drawShape(element, newClass){
    element.classList.add(newClass);
}
function changeTurn(){
    xTurn=!xTurn;
    gameTurn.textContent=xTurn?'X':'O';
}
function checkWinner(currentPlayer){
    const cells=document.querySelectorAll('.cell');
    const winner=winningPositions.some(array=>{
        return array.every(position=>{
            return cells[position].classList.contains(currentPlayer);
        })
    })
    if(!winner)return;
    showEndGame(true);
    return true;
}
function showEndGame(winner){
    endGame.classList.add('show');
    if(winner){
        endGameResult.textContent=`${xTurn?'X':'O'} ES EL GANADOR!`;
    }
    else{
        endGameResult.textContent="EMPATE!";
    }
}
newGameButton.addEventListener('click', startGame);