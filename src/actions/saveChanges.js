export const saveChanges = (allUsers, user) => {
    return {
        type: "SAVE",
        allUsers: allUsers,
        user: user
    }
}