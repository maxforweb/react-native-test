export const modal = (type, errors) => {
    return{
        type:"MODAL",
        payload: type,
        errors: errors
    }
}