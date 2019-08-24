import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { playerLevelUp } from '../store/actions/playerActions';
import api from '../static/services/api';

export default function Auth({ children }) {
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (player.exp === 0 || player.exp < player.expMax) return
        dispatch(playerLevelUp())
    }, [player.exp])

    useEffect(() => {
        playerSave()
    }, [player])

    useEffect(() => {
        if (!player.isLogged && window.location.pathname !== '/') {
            window.location.href = "/";
        }
    })

    async function playerSave() {
        if (!player.isLogged) return false;

        try {
            await api.put(`/player/${player._id}`, player);
        } catch (error) {
            return alert("Player save error, you lost connection to server ?");
        }
    }

    return (player.isLogged || window.location.pathname === '/') ? children : <div />;
}
