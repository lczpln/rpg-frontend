import React, { useState } from 'react';

import { playerLogin } from '../store/actions/playerActions';

import { useDispatch } from 'react-redux';

import loginImg from '../static/img/login.svg';
import loadingImg from '../static/img/loading.svg';

export default function Login(props) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    var loginInterval = null;

    function makeLogin(e) {
        clearTimeout(loginInterval);

        e.preventDefault();

        setLoading(true);

        if (user.username !== 'admin' || user.password !== 'admin') return loginInterval = setTimeout(() => { setLoading(false) }, 500)

        dispatch(playerLogin());

        loginInterval = setTimeout(() => { setLoading(false); props.history.push('/home') }, 1000)
    }

    return (
        <div className="login-background">
            <img className="mt-5" src={'https://www.tibiawiki.com.br/images/d/db/Gryphon_%28Mount%29.gif'} alt="" height={140} width={140} />
            <div className="login-box mt-5">
                <div className="flex align-center">
                    <img src={loginImg} alt="" height={22} width={22} />
                    <h3 className="ml-2 tittle">Login</h3>
                </div>
                <form className="flex-col mt-1" onSubmit={(e) => makeLogin(e)}>
                    <div>
                        <span>Username</span>
                        <input
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            type="password"
                            required
                        />
                    </div>
                    <button disabled={loading} className="mx-auto mt-2 send">
                        {loading ? <img src={loadingImg} alt="" width={20} height={20} /> : "ENTRAR"}
                    </button>
                </form>
            </div>
        </div>
    );
}
