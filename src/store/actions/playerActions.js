export function playerLogin(player) {
    return { type: 'PLAYER_LOGIN', payload: player };
}

export function playerLogout() {
    return { type: 'PLAYER_LOGOUT' };
}

export function playerLevelUp() {
    return { type: 'ADD_LEVEL' };
}

export function playerAddExp(exp) {
    return { type: 'ADD_EXP', payload: exp };
}

export function playerRemoveHp(hp) {
    return { type: 'REMOVE_HP', payload: hp }
}

export function playerAddHp(hp) {
    return { type: 'ADD_HP', payload: hp }
}

export function playerSetHp(hp) {
    return { type: 'SET_HP', payload: hp }
}

export function playerAddItem(item) {
    return { type: 'ADD_ITEM', payload: item }
}

export function playerRemoveItem(item, removeQtd) {
    return { type: 'REMOVE_ITEM', payload: { name: item.name, qtd: removeQtd } }
}