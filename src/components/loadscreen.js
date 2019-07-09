import React, { useState, useEffect } from 'react';

import loadingImg from '../static/img/loading.svg';
import dragonImg from '../static/img/loading/icon-loading-dragon.gif';
import goblinImg from '../static/img/loading/icon-loading-goblin.gif';
import ratImg from '../static/img/loading/icon-loading-rat.gif';
import skeletonImg from '../static/img/loading/icon-loading-skeleton.gif';

export default function LoadScreen({ text }) {
    const [monsterImg, setMonsterImg] = useState('');
    const img = [dragonImg, goblinImg, ratImg, skeletonImg];

    useEffect(() => {
        randomMonsterImg()
    }, [])

    function randomMonsterImg() {
        const select = Math.floor(Math.random() * img.length);

        setMonsterImg(img[select]);
        console.log(monsterImg)
    }

    return (
        <div className="flex-col align-center justify-center absolute pin bg-ocean-dark">
            <img src={monsterImg} alt="" height={120} width={120} />
            <img className="mt-1" src={loadingImg} alt="" width={20} height={20} />
            <h3 className="mt-2">{text}</h3>
        </div>
    );
}
