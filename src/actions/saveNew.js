export const saveNew = (allUsers, user) => {
    return {
        type: "NEW",
        allUsers: allUsers,
        user: user
    }
}