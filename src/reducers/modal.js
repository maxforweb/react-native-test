const modal = (state = false, action) => {
    switch(action.type){
        case"MODAL":
            return {
                visibility: action.payload,
                errors: action.errors
            }

        default: return {
                visibility: false,
                errors: []
        }
    }
}

export default modal;