import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import PlayerBars from '../components/playerBars';

export default function Home(props) {
    const player = useSelector(state => state.player);

    return (
        <div>
            <div className="home-background">
                <div className="player-card">
                    <div className="portrait">
                        <h3 className="creature-name">{player.playerName}</h3>
                        <img src={'https://www.tibiawiki.com.br/images/e/ef/Black_Knight.gif'} alt="" />
                    </div>
                    <div className="description">
                        <h3 className="description">Atk: <span>{player.atk}</span></h3>
                        <h3 className="description">Def: <span>{player.def}</span></h3>
                        <h3 className="description">Level: <span>{player.level}</span></h3>
                        <h3 className="description">Gold: <span>{player.gold}</span></h3>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="send play">PLAY !</button>
                </div>
                <PlayerBars player={player} />
            </div>
        </div>
    );
}
