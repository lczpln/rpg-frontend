const INITIAL_STATE = {
    isLogged: false,
    name: '',
    class: '',
    img: '',
    hp: 0,
    hpMax: 0,
    mp: 0,
    mpMax: 0,
    atk: 0,
    def: 0,
    exp: 0,
    expMax: 0,
    level: 0,
    gold: 0,
    inventary: [],
    gainPerLevel: {
        hp: 0,
        mp: 0,
        atk: 0,
        def: 0,
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


export default function playerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "PLAYER_LOGIN":
            return { isLogged: true, ...action.payload }
        case "PLAYER_LOGOUT":
            return { ...state, isLogged: false }
        case "NEW_PLAYER":
            return { ...state, ...action.payload }
        case "ADD_ITEM":
            const item = state.inventary.find(item => item.name === action.payload.name) || null
            const newInventary = [];
            if (item) {

                state.inventary.map(item => (
                    item.name === action.payload.name
                        ? newInventary.push({ ...item, qtd: item.qtd + action.payload.qtd })
                        : newInventary.push(item)
                ))
                return { ...state, inventary: newInventary }
            } else {
                return { ...state, inventary: [...state.inventary, action.payload] }
            }
        case "ADD_HP":
            return { ...state, hp: state.hp + action.payload }
        case "REMOVE_HP":
            return { ...state, hp: state.hp - action.payload }
        case "SET_HP":
            return { ...state, hp: action.payload }
        case "ADD_HP_MAX":
            return { ...state, hpMax: state.hpMax + action.payload }
        case "ADD_MP":
            return { ...state, mp: state.mp + action.payload }
        case "ADD_MP_MAX":
            return { ...state, mpMax: state.mpMax + action.payload }
        case "ADD_ATK":
            return { ...state, atk: state.atk + action.payload }
        case "ADD_DEF":
            return { ...state, def: state.def + action.payload }
        case "ADD_EXP":
            return { ...state, exp: state.exp + action.payload }
        case "ADD_LEVEL":
            return {
                ...state,
                exp: 0,
                expMax: ((state.level + 1) * 2) * 300 + 150,
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