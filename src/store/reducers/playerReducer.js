const INITIAL_STATE = {
    isLogged: false,
    playerName: 'Admin',
    hp: 75,
    hpMax: 100,
    mp: 100,
    mpMax: 100,
    atk: 12,
    def: 20,
    exp: 0,
    expMax: 100,
    level: 1,
    gold: 0,
    gainPerLevel: {
        hp: 14,
        mp: 10,
        atk: 8,
        def: 20,
    },
    equiped: {
        handRight: '',
        handLeft: '',
        helmet: '',
        armor: '',
        legs: '',
        boots: '',
        ring: '',
        amulet: ''
    },
    spells: []
}

const expFormula = INITIAL_STATE.level + 1 * 300 + 100;

export default function playerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "PLAYER_LOGIN":
            return { ...state, isLogged: true }
        case "PLAYER_LOGOUT":
            return { ...state, isLogged: false }
        case "NEW_PLAYER":
            return { ...state, ...action.payload }
        case "ADD_HP":
            return { ...state, hp: action.payload }
        case "ADD_HP_MAX":
            return { ...state, hpMax: action.payload }
        case "ADD_MP":
            return { ...state, mp: action.payload }
        case "ADD_MP_MAX":
            return { ...state, mpMax: action.payload }
        case "ADD_ATK":
            return { ...state, atk: action.payload }
        case "ADD_DEF":
            return { ...state, def: action.payload }
        case "ADD_EXP":
            return { ...state, exp: state.exp + action.payload }
        case "ADD_LEVEL":
            return {
                ...state,
                exp: 0,
                expMax: expFormula,
                hpMax: state.hpMax + state.gainPerLevel.hp,
                mpMax: state.mpMax + state.gainPerLevel.mp,
                atk: state.atk + state.gainPerLevel.atk,
                def: state.def + state.gainPerLevel.def,
                level: state.level + 1
            }
        default:
            return { ...state }
    }
}