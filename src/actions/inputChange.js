export const inputChange = (value, user, num) => {
    return{
        type: "CHANGE",
        value: value,
        user: user,
        num: num
    }

}