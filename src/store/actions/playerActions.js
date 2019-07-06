export function playerLogin() {
    return { type: 'PLAYER_LOGIN' };
}

export function playerLevelUp() {
    return { type: 'ADD_LEVEL' };
}

export function playerAddExp(exp) {
    return { type: 'ADD_EXP', payload: exp };
}