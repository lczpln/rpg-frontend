import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function Auth({ children }) {
    const isLogged = useSelector(state => state.player.isLogged);

    useEffect(() => {
        if (!isLogged && window.location.pathname !== '/') {
            window.location.href = "/";
        }
    }, [isLogged])

    return (isLogged || window.location.pathname === '/') ? children : <div />;
}
