import React, { useEffect } from 'react';

import mpIcon from '../../static/img/mp-icon.svg';
import hpIcon from '../../static/img/hp-icon.svg';
import expIcon from '../../static/img/exp-icon.svg';

export default function PlayerBars({ player }) {
    useEffect(() => {
        console.log(player)
    })

    return (
        <div className="home-bars">
            <div className="home-back-bar">
                <div className="home-hp-bar" style={{ width: `${player.hp * 100 / player.hpMax}%` }}>
                    <div>
                        <img className="mr-3" src={hpIcon} alt="" width={30} height={30} />
                        <h3>
                            {player.hp} / {player.hpMax}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="home-back-bar">
                <div className="home-mp-bar" style={{ width: `${player.mp * 100 / player.mpMax}%` }}>
                    <div>
                        <img className="mr-3" src={mpIcon} alt="" width={30} height={30} />
                        <h3>
                            {player.mp} / {player.mpMax}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="home-back-bar">
                <div className="home-exp-bar" style={{ width: `${player.exp * 100 / player.expMax}%` }}>
                    <div>
                        <img className="mr-3" src={expIcon} alt="" width={30} height={30} />
                        <h3>
                            {Math.floor(player.exp * 100 / player.expMax)}%
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
