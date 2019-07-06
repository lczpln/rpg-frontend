import React from 'react';

import { useSelector } from 'react-redux';
import PlayerBars from '../components/playerBars';

export default function Home(props) {
    const player = useSelector(state => state.player);
    return (
        <div>
            <PlayerBars player={player} />
        </div>
    );
}
