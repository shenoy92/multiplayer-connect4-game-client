import React, {useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import GameBoard from '../GameBoard/GameBoard';
import './Game.css';
import { winningArrays } from '../../common/data';
const Game = ({location}) => {
    const ENDPOINT = 'https://multiplayer-connectfour.herokuapp.com/';
    let socket;
    // const [ player, setPlayer ] = useState(0);
    // const [ playerTurn, setPlayerTurn ] = useState(1);
    // const [ result, setResult ] = useState(0);
    // const [ userJoinedRoom, setUserJoinedRoom ] = useState(false);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (payload) => {
            if(payload.errorMsg) {
                alert(payload.errorMsg);
              
            } else {
                const result = document.querySelector('#result')
                const displayCurrentPlayer = document.querySelector('#current-player');
                const displayPlayer = document.querySelector('#player')
                const squares = document.querySelectorAll('.grid div');
                let resultMsg = '';
                displayPlayer.innerHTML = payload.data.player;
                displayPlayer.classList = (payload.data.player === 1) ? "player-one" : "player-two";
                displayCurrentPlayer.firstElementChild.innerHTML = 1;
                function checkBoard (i, currentPlayer) {
                    for (let y = 0; y < winningArrays.length; y++) {
                        const square1 = squares[winningArrays[y][0]]
                        const square2 = squares[winningArrays[y][1]]
                        const square3 = squares[winningArrays[y][2]]
                        const square4 = squares[winningArrays[y][3]]
                
                        //check those squares to see if they all have the class of player-one
                        if (
                        square1.classList.contains('player-one') &&
                        square2.classList.contains('player-one') &&
                        square3.classList.contains('player-one') &&
                        square4.classList.contains('player-one'))
                        {
                            resultMsg = 'Player One Wins!';
                        }
                        //check those squares to see if they all have the class of player-two
                        if (
                        square1.classList.contains('player-two') &&
                        square2.classList.contains('player-two') &&
                        square3.classList.contains('player-two') &&
                        square4.classList.contains('player-two'))
                        {
                            resultMsg = 'Player Two Wins!';
                        }
                    }
                    socket.emit('player', { player: currentPlayer, squareIndex: i, gameResult: resultMsg })
                }
            
                for (let i = 0; i < squares.length; i++) {
                    // eslint-disable-next-line no-loop-func
                    squares[i].onclick = () => {
                        if((parseInt(displayPlayer.innerHTML)  === parseInt(displayCurrentPlayer.firstElementChild.innerHTML)) && (resultMsg === '') ) {
                            //if the square below your current square is taken, you can go ontop of it
                            if (squares[i + 7].classList.contains('taken') &&!squares[i].classList.contains('taken')) {
                                if (parseInt(displayCurrentPlayer.firstElementChild.innerHTML) === 1) {
                                    squares[i].classList.add('taken');
                                    squares[i].classList.add('player-one');
                                    checkBoard(i, 2)
                                } else if (parseInt(displayCurrentPlayer.firstElementChild.innerHTML)  === 2){
                                    squares[i].classList.add('taken');
                                    squares[i].classList.add('player-two');
                                    checkBoard(i, 1)
                                } 
                            } else {
                                alert('cant go here');
                            }
                        }
                    }
                }

                socket.on('play', ({ player, squareIndex, gameResult }) => {
                    if(!gameResult) {
                        displayCurrentPlayer.firstElementChild.innerHTML = player;
                        squares[squareIndex].classList.add('taken');
                        squares[squareIndex].classList.add(((player === 1) ? 'player-two' : 'player-one'));
                    } else {
                        squares[squareIndex].classList.add('taken');
                        squares[squareIndex].classList.add(((player === 1) ? 'player-two' : 'player-one'));
                        displayCurrentPlayer.style.display = 'none';
                        result.innerHTML = gameResult;
                    }
                });
            } 
        });
    }, []);

    return(
        <>
        <GameBoard/>
            {/* { userJoinedRoom ? <GameBoard/> : 'Loading...' } */}
        </>
)}

export default Game;