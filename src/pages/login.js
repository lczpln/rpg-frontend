import React from 'react';

import loginImg from '../static/img/login.svg';

export default function Login() {
    return (
        <div className="login-background">
            <img className="mt-5" src={'https://www.tibiawiki.com.br/images/d/db/Gryphon_%28Mount%29.gif'} alt="" height={200} width={200} />
            <div className="login-box mt-5">
                <div className="flex align-center">
                    <img src={loginImg} alt="" height={22} width={22} />
                    <h3 className="ml-2 tittle">Login</h3>
                </div>
                <div className="flex-col mt-1">
                    <div>
                        <span>Username</span>
                        <input type="text" />
                    </div>
                    <div>
                        <span>Password</span>
                        <input type="password" />
                    </div>
                    <input className="mx-auto mt-2" type="submit" value="ENTRAR" />
                </div>
            </div>
        </div>
    );
}
