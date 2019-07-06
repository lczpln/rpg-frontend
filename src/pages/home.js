import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { playerAddExp } from '../store/actions/playerActions';

import PlayerBars from '../components/playerBars';

export default function Home(props) {
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

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
                        <button className="send mt-4" onClick={() => dispatch(playerAddExp(100))}>ADD EXP TESTE</button>
                    </div>
                </div>
                <PlayerBars player={player} />
            </div>
        </div>
    );
}
