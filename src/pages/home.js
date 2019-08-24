import React, { useState, useEffect, Fragment } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import PlayerBars from '../components/playerBars';

import mapImg from '../static/img/map-icon.svg';
import shopImg from '../static/img/shop-icon.svg';
import inventaryImg from '../static/img/icon-inventary.svg';
import questImg from '../static/img/icon-quest.svg';
import LoadScreen from '../components/loadscreen';

export default function Home(props) {
    const player = useSelector(state => state.player);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 1000);
    }, [])

    return (
        <Fragment>
            <div className="background">
                <div className="player-card">
                    <div className="portrait">
                        <h3 className="creature-name">{player.name}</h3>
                        <img src={player.img} alt="" height={45} width={45} />
                    </div>
                    <div className="description">
                        <h3 className="description">Atk: <span>{player.atk}</span></h3>
                        <h3 className="description">Def: <span>{player.def}</span></h3>
                        <h3 className="description">Level: <span>{player.level}</span></h3>
                        <h3 className="description">Gold: <span>{player.gold}</span></h3>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link to="/map">
                        <img className="mr-4" style={{ cursor: 'pointer' }} src={mapImg} alt="" width={60} height={60} />
                    </Link>
                    <Link to="/shop">
                        <img className="mr-4" style={{ cursor: 'pointer' }} src={shopImg} alt="" width={60} height={60} />
                    </Link>
                    <Link to="/inventary">
                        <img className="mr-4" style={{ cursor: 'pointer' }} src={inventaryImg} alt="" width={60} height={60} />
                    </Link>
                    <Link to="/quests">
                        <img style={{ cursor: 'pointer' }} src={questImg} alt="" width={60} height={60} />
                    </Link>
                </div>
                {!loading && <PlayerBars player={player} />}
            </div>
            {loading && <LoadScreen text={`Cleaning your shoes...`} />}
        </Fragment>
    );
}
