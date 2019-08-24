import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom'

import { playerAddHp, playerRemoveItem } from '../store/actions/playerActions';

import inventaryImg from '../static/img/icon-inventary.svg'
import backImg from '../static/img/icon-back.svg'
import LoadScreen from '../components/loadscreen';
import PlayerBars from '../components/playerBars';

export default function Inventary() {
    const [loading, setLoading] = useState(true);
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 1000)
    }, [])

    function onPlayerUseItem(item, qtd) {
        if (item.hp > 0) {
            dispatch(playerRemoveItem(item, qtd));
            dispatch(playerAddHp(item.hp));
        }
    }

    return (
        <div className="background">
        {loading && <LoadScreen text={`Unlocking your backpack...`} />}
            <div className="flex bg-black-dark justify-center align-center">
                <Link to="/home">
                    <img src={backImg} alt="" width={50} height={50} style={{ cursor: 'pointer', marginRight: '0.75em' }} />
                </Link>
                <img src={inventaryImg} alt="" width={60} height={60} />
                <h3 className="ml-3 text-white font-26">Inventary</h3>
            </div>
            <div className="bg-black flex justify-center" style={{ minHeight: 'calc(100vh - 116px)' }}>
                <div className="inventary-grid">
                    {player.inventary.map((item, _) => (
                        <div key={_} className="bg-grey-dark rounded-sm flex-col align-center p-2" style={{ width: 150, height: 150 }}>
                            <div className="rounded-full bg-white-dark flex align-center justiify-center" style={{ width: 45, height: 45 }}>
                                <img src={item.img} alt="" />
                            </div>
                            <h3 className="mt-1">{item.name.split("").map((w, i) => i === 0 ? w.toUpperCase() : w)}</h3>
                            <h3 className="text-white">x{item.qtd}</h3>
                            <button onClick={() => onPlayerUseItem(item, 1)} disabled={!item.usable} className="send mt-2">Use</button>
                        </div>
                    ))}
                </div>
            </div>
            {!loading && <PlayerBars player={player} />}
        </div>
    );
}
