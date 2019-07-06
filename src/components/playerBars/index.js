import React, { useEffect } from 'react';

// import { Container } from './styles';

export default function PlayerBars({ player }) {
    useEffect(() => {
        console.log(player)
    })

    return (
        <div className="home-background">
            <div className="home-hp-bar"><span>{player.hp} / {player.hpMax}</span></div>
            <div className="home-mp-bar"><span>{player.mp} / {player.mpMax}</span></div>
        </div>
    );
}
