import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { playerLevelUp } from '../store/actions/playerActions';

export default function Auth({ children }) {
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (player.exp === 0 || player.exp < player.expMax) return
        dispatch(playerLevelUp())
    }, [player.exp])

    useEffect(() => {
        const user = window.localStorage.getItem("user") || null;

        if (!player.isLogged && window.location.pathname !== '/') {
            if (user) window.localStorage.setItem("user", false)
            window.location.href = "/";
        }


        if (!user && player.isLogged) {
            window.localStorage.setItem("user", true);
        }

    }, [player.isLogged])

    return (player.isLogged || window.location.pathname === '/') ? children : <div />;
}
