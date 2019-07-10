import React, { useState, useEffect, Fragment } from 'react';

import api from '../static/services/api';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import {
    playerRemoveHp,
    playerAddExp,
    playerSetHp,
    playerAddItem,
    setMapSecret
} from '../store/actions/playerActions';
import LoadScreen from '../components/loadscreen';

import bloodImg from '../static/img/blood-effect.gif';

export default function Battle(props) {
    const [playerBloodEffect, setPlayerBloodEffect] = useState(false);
    const [monsterBloodEffect, setMonsterBloodEffect] = useState(false);
    const [playerAttackEffect, setPlayerAttackEffect] = useState('');
    const [monsterAttackEffect, setMonsterAttackEffect] = useState('');
    const [loading, setLoading] = useState(true);
    const [monster, setMonster] = useState({})
    const [battleEndMessage, setBattleEndMessage] = useState('');
    const [lootMsg, setLootMsg] = useState('');
    const [playerTurn, setPlayerTurn] = useState(true)
    const [drops, setDrops] = useState([])
    const [battleStatus, setBattleStatus] = useState({
        playerDead: false,
        monsterDead: false,
    })
    const player = useSelector(state => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props)
        if (!player.mapSecret || player.mapSecret !== props.match.params.secret) {
            return props.history.push("/home");
        }
        getMonsterData()
    }, [])

    useEffect(() => {
        if (checkBattleStatus('player')) {
            setPlayerTurn(false);
            dispatch(setMapSecret(''))
            setBattleEndMessage(`You went defeated by ${(monster.name.split("").map((w, _) => _ === 0 ? w.toUpperCase() : w)).join("")}.`)
        } else {
            setPlayerTurn(true);
        }
    }, [player.hp])

    useEffect(() => {
        if (checkBattleStatus('monster')) {
            dispatch(playerAddExp(monster.exp))
            dispatch(setMapSecret(''))
            setBattleEndMessage(`${(monster.name.split("").map((w, _) => _ === 0 ? w.toUpperCase() : w)).join("")} is defeated, you gain ${monster.exp} experience points.`)
            setPlayerTurn(false);
        } else {
            if (!playerTurn) setTimeout(() => { monsterAttack() }, 1500);
        }
    }, [monster.hp])

    async function getMonsterData() {
        const response = await api.get('/monsters/frog');

        if (!response) return;

        const dropArray = []

        response.data.items.map(item => {
            let randChance = Math.floor(Math.random() * 100 + 1);
            if (item.chance <= randChance) {
                let qtdChance = Math.floor(Math.random() * item.qtdMax + 1);
                dropArray.push({ ...item, qtd: qtdChance })
            }
        })

        setMonster(response.data)
        setDrops(dropArray)
        setTimeout(() => { setLoading(false) }, 1000);
    }

    function checkBattleStatus(creature) {
        if (creature === 'monster') {
            if (monster.hp <= 0) {
                setBattleStatus({ ...battleStatus, monsterDead: true })
                return true
            } else {
                return false
            }
        } else if (creature === 'player') {
            if (player.hp <= 0) {
                setBattleStatus({ ...battleStatus, playerDead: true })
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    function monsterAttack() {
        const atkFormula = ((Math.floor(Math.random() * 6) + monster.atk) - player.def) - (Math.floor(Math.random() * -3));
        applyMonsterAttackEffect()
        if (atkFormula > 0) {
            if (player.hp - atkFormula < 0) {
                setTimeout(() => { dispatch(playerSetHp(0)) }, 500)
            } else {
                setTimeout(() => { dispatch(playerRemoveHp(atkFormula)) }, 500)
            }
        } else {
            setTimeout(() => { dispatch(playerRemoveHp(1)) }, 500)
        }
    }

    function playerAtk() {
        const atkFormula = ((Math.floor(Math.random() * 6) + player.atk) - monster.def) - (Math.floor(Math.random() * -3));
        applyPlayerAttackEffect()
        if (atkFormula > 0) {
            if (monster.hp - atkFormula < 0) {
                setTimeout(() => { setMonster({ ...monster, hp: 0 }) }, 500)
            } else {
                setTimeout(() => { setMonster({ ...monster, hp: monster.hp - atkFormula }) }, 500)
            }
        } else {
            setTimeout(() => { setMonster({ ...monster, hp: monster.hp - 1 }) }, 500)
        }
        setPlayerTurn(false);
    }

    function playerLootItem(item) {
        const newDrops = [...drops.filter(_ => _.name !== item.name)]

        setDrops(newDrops);
        setLootMsg('You looted all items.')
        dispatch(playerAddItem(item));
    }

    function applyPlayerAttackEffect() {
        setPlayerAttackEffect('walkBot')
        setTimeout(() => { setMonsterBloodEffect(true) }, 500)
        setTimeout(() => { setPlayerAttackEffect(''); setMonsterBloodEffect(false) }, 1500)
    }

    function applyMonsterAttackEffect() {
        setMonsterAttackEffect('walkTop')
        setTimeout(() => { setPlayerBloodEffect(true) }, 500)
        setTimeout(() => { setMonsterAttackEffect(''); setPlayerBloodEffect(false) }, 1500)
    }

    return (
        ((player.mapSecret) || (player.mapSecret === props.match.params.secret) || (monster && monster.hp <= 0) || (player.hp <= 0)) ? (
            <Fragment>
                <div className={`absolute pin-t flex-col align-center justify-center pt-5`} style={{ width: '100vw' }}>
                    <div className={`${playerAttackEffect} relative`}>
                        <h3>{player.name}</h3>
                        {playerBloodEffect && (
                            <div className="absolute pin flex justify-center align-center">
                                <img src={bloodImg} alt="" width={45} height={45} />
                            </div>
                        )}
                        <img src={player.img} alt="" width={45} height={45} />
                    </div>
                    <h3 className="mt-2">{player.hp} / {player.hpMax}</h3>
                </div>
                <div className={`flex-col absolute pin-b align-center justify-center pb-5`} style={{ width: '100vw' }}>
                    <div className={`${monsterAttackEffect} relative`}>
                        <h3 style={{ textTransform: 'capitalize' }}>{monster.name}</h3>
                        {monsterBloodEffect && (
                            <div className="absolute pin flex justify-center align-center">
                                <img src={bloodImg} alt="" width={45} height={45} />
                            </div>
                        )}
                        <img className={monster.hp > 0 && "rotate-180"} src={monster.hp > 0 ? monster.img : monster.imgDead} alt="" width={45} height={45} />
                    </div>
                    <h3>{monster.hp} / {monster.hpMax}</h3>
                </div>
                <button disabled={!playerTurn} onClick={() => playerAtk()} className="send absolute pin-t">Attack</button>
                {battleStatus.monsterDead && (
                    <div>
                        <h3>Loot:</h3>
                        <ul>{drops.length > 0 ? (
                            drops.map((item, _) => (
                                <li key={_}>
                                    <img src={item.img} alt="" />
                                    <h3>{item.name} x{item.qtd}</h3>
                                    <button onClick={() => playerLootItem(item)} className="send">Loot</button>
                                </li>
                            ))) : (
                                <h3>{lootMsg ? lootMsg : 'Nothing.'}</h3>
                            )
                        }
                        </ul>
                    </div>
                )}
                {(battleStatus.monsterDead || battleStatus.playerDead) && (
                    <div className="flex-col">
                        <h3>{battleEndMessage}</h3>
                        <Link to="/home">
                            <button className="send">BACK TO MAINSCREEN</button>
                        </Link>
                    </div>
                )}
                {loading && <LoadScreen text={`Searching for monsters...`} />}
            </Fragment>
        ) : (
                <LoadScreen text={`Ops! 404 :(`} />
            )
    );
}
