export const showUserInfo = (data) => {
    return{
        type: "CURRENT_USER",
        payload: data
    }
};