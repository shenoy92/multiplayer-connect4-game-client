import React from 'react'

const GameBoard = () => {
    return (
        <div>
        <h1>Player :<span id="player"></span></h1>
        <h3 id="current-player">Player <span></span> turn</h3>
        <h3>Please start the game from the bottom</h3>
        <h3 id="result"></h3>

        <div className="grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="taken lastRow" ></div>
            <div className="taken lastRow"></div>
            <div className="taken lastRow"></div>
            <div className="taken lastRow"></div>
            <div className="taken lastRow"></div>
            <div className="taken lastRow"></div>
            <div className="taken lastRow"></div>
        </div>

        </div>
    )
}

export default GameBoard