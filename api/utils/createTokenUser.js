const createTokenUser = (user) => {
    return {
        username: user.username,
        userId: user._id,
        isAdmin: user.isAdmin
    };
}

export default createTokenUser;