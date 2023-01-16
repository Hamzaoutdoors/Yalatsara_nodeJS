const createTokenUser = (user) => {
    return {
        username: user.username,
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
        img: user.img,
    };
}

export default createTokenUser;