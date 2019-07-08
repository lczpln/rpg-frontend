import React, { useState, Fragment, useEffect } from 'react';

import { playerLogin } from '../store/actions/playerActions';

import api from '../static/services/api';

import { useDispatch, useSelector } from 'react-redux';

import loginImg from '../static/img/login.svg';
import loadingImg from '../static/img/loading.svg';
import Toast from '../components/toast';

export default function Login(props) {
    const isLogged = useSelector(state => state.player.isLogged);
    const [toast, setToast] = useState({
        type: '',
        message: '',
    })
    const [user, setUser] = useState({
        account: '',
        password: ''
    });

    useEffect(() => {
        if (isLogged) setTimeout(() => { props.history.push('/home') }, 1000);
    }, [isLogged])

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function makeLogin(e) {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post('/sso/login', user)

            if (!response.data) {
                setLoading(false);
                setUser({ account: '', password: '' })
                return setToast({ type: 'error', msg: 'Account or password is not correct.' })
            }
            setLoading(false);
            await dispatch(playerLogin(response.data));
            return setToast({ type: 'success', msg: 'Login successfully.' })
        } catch (error) {
            setLoading(false);
            setUser({ account: '', password: '' })
            return alert("Login error => " + error)
        }
    }

    return (
        <div className="background">
            <div className="flex-col justify-center align-center">
                <img className="mt-5" src={'https://www.tibiawiki.com.br/images/d/db/Gryphon_%28Mount%29.gif'} alt="" height={140} width={140} />
                <div className="login-box mt-5" style={isLogged ? { height: 'auto' } : {}}>
                    <div className="flex align-center">
                        <img src={loginImg} alt="" height={22} width={22} />
                        <h3 className="ml-2 tittle">Login</h3>
                    </div>
                    <form className="flex-col mt-1" onSubmit={(e) => makeLogin(e)}>
                        {!isLogged && (
                            <Fragment>
                                <div>
                                    <span>Account</span>
                                    <input
                                        onChange={(e) => setUser({ ...user, account: e.target.value })}
                                        type="text"
                                        required
                                        value={user.account}
                                    />
                                </div>
                                <div>
                                    <span>Password</span>
                                    <input
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        type="password"
                                        required
                                        value={user.password}
                                    />
                                </div>
                            </Fragment>
                        )}
                        <button disabled={loading || isLogged} className="mx-auto mt-2 send">
                            {(loading || isLogged) ? <img src={loadingImg} alt="" width={20} height={20} /> : "ENTRAR"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex justify-center">
                <Toast type={toast.type} msg={toast.msg} />
            </div>
        </div>
    );
}
