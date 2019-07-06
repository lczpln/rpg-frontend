import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { playerLevelUp } from '../store/actions/playerActions';

export default function Auth({ children }) {
    const isLogged = useSelector(state => state.player.isLogged);
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (player.exp >= player.expMax) {
            dispatch(playerLevelUp())
        }
    }, [player.exp])

    useEffect(() => {
        const user = window.localStorage.getItem("user") || null;

        if (!isLogged && window.location.pathname !== '/') {
            if (user) window.localStorage.setItem("user", false)
            window.location.href = "/";
        }


        if (!user && isLogged) {
            window.localStorage.setItem("user", true);
        }

    }, [isLogged])

    return (isLogged || window.location.pathname === '/') ? children : <div />;
}
