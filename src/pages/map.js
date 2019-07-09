import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import mapImg from '../static/img/map-icon.svg';
import backImg from '../static/img/icon-back.svg';
import { setMapSecret } from '../store/actions/playerActions';

export default function Map(props) {
    const [mapSecret, setSecret] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setSecret(mapSecretGenerate())
    }, [])

    function mapSecretGenerate() {
        return Math.floor(Math.random() * 12345678910).toString();
    }

    return (
        <div className="background">
            <div className="flex justify-center align-center">
                <Link to="/home">
                    <img src={backImg} className="mr-5" alt="" width={50} height={50} style={{ cursor: 'pointer' }} />
                </Link>
                <img src={mapImg} alt="" width={60} height={60} />
                <h3 className="ml-3 text-white font-26">Map</h3>
            </div>
            <div>
                <Link to={`/battle/1/${mapSecret}`} onClick={() => dispatch(setMapSecret(mapSecret))}>
                    <h3>Quiet forest</h3>
                </Link>
                <Link to={`/battle/2/${mapSecret}`} onClick={() => dispatch(setMapSecret(mapSecret))}>
                    <h3>Scalding desert</h3>
                </Link>
                <Link to={`/battle/3/${mapSecret}`} onClick={() => dispatch(setMapSecret(mapSecret))}>
                    <h3>Rough seas</h3>
                </Link>
            </div>
        </div >
    );
}
