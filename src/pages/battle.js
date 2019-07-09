import React, { useState, useEffect } from 'react';

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

export default function Battle(props) {
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
            if (!playerTurn) monsterAttack()
        }
    }, [monster.hp])

    async function getMonsterData() {
        const response = await api.get('/monsters/rat');

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
        setTimeout(() => { setLoading(false) }, 600);
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

        if (atkFormula > 0) {
            if (player.hp - atkFormula < 0) {
                dispatch(playerSetHp(0))
            } else {
                dispatch(playerRemoveHp(atkFormula))
            }
        } else {
            dispatch(playerRemoveHp(1))
        }
    }

    function playerAtk() {
        const atkFormula = ((Math.floor(Math.random() * 6) + player.atk) - monster.def) - (Math.floor(Math.random() * -3));

        if (atkFormula > 0) {
            if (monster.hp - atkFormula < 0) {
                setMonster({ ...monster, hp: 0 })
            } else {
                setMonster({ ...monster, hp: monster.hp - atkFormula })

            }
        } else {
            setMonster({ ...monster, hp: monster.hp - 1 })
        }
        setPlayerTurn(false);
    }

    function playerLootItem(item) {
        const newDrops = [...drops.filter(_ => _.name !== item.name)]

        setDrops(newDrops);
        setLootMsg('You looted all items.')
        dispatch(playerAddItem(item));
    }

    return (
        ((player.mapSecret) || (player.mapSecret === props.match.params.secret) || (monster && monster.hp <= 0) || (player.hp <= 0)) ? (
            <div>
                <div>
                    <h3>{player.name}</h3>
                    <img src={player.img} alt="" />
                </div>
                <div className="flex">
                    <h3>{player.hp} / {player.hpMax}</h3>
                </div>
                <div>
                    <h3>{monster.name}</h3>
                    <img src={monster.img} alt="" />
                </div>
                <div className="flex">
                    <h3>{monster.hp} / {monster.hpMax}</h3>
                </div>
                <button disabled={!playerTurn} onClick={() => playerAtk()} className="send">Attack</button>
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
            </div>
        ) : (
                <LoadScreen text={`Ops! 404 :(`} />
            )
    );
}
