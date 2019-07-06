const INITIAL_STATE = {
    isLogged: false,
    hp: 0,
    hpMax: 0,
    mp: 0,
    mpMax: 0,
    atk: 0,
    def: 0,
    exp: 0,
    expMax: 0,
    level: 0,
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
            return { ...state, exp: action.payload }
        case "ADD_EXP_MAX":
            return { ...state, expMax: action.payload }
        case "ADD_LEVEL":
            return { ...state, level: action.payload }
        default:
            return { ...state }
    }
}