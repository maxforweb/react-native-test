export const deleteUser = (dataUser, allUsers) => {
    return{
        type: "DELETE",
        user: dataUser,
        allUsers: allUsers
    }
}