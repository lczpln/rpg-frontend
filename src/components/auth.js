import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function Auth({ children }) {
    const isLogged = useSelector(state => state.player.isLogged);

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
