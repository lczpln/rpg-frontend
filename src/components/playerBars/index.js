import React from 'react';

import mpIcon from '../../static/img/mp-icon.svg';
import hpIcon from '../../static/img/hp-icon.svg';
import expIcon from '../../static/img/exp-icon.svg';

export default function PlayerBars({ player }) {
    return (
        <div className="home-bars">
            <div className="home-back-bar">
                <div className="home-hp-bar" style={{ width: `${player.hp * 100 / player.hpMax}%` }}>
                    <img className="mr-3" src={hpIcon} alt="" width={30} height={30} />
                    <div>
                        <h3>
                            {player.hp} / {player.hpMax}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="home-back-bar">
                <div className="home-mp-bar" style={{ width: `${player.mp * 100 / player.mpMax}%` }}>
                    <img className="mr-3" src={mpIcon} alt="" width={30} height={30} />
                    <div>
                        <h3>
                            {player.mp} / {player.mpMax}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="home-back-bar">
                <div className="home-exp-bar" style={{ width: `${player.exp * 100 / player.expMax}%` }}>
                    <img className="mr-3" src={expIcon} alt="" width={30} height={30} />
                    <div>
                        <h3>
                            {Math.floor(player.exp * 100 / player.expMax)}%
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
