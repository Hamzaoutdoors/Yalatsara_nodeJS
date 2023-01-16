import jwt from "jsonwebtoken";

export const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '365d',
    });
    return token;
}

export const attachCookiesToResponse = ({res, user}) => {
    const token = createJWT({payload: user});

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
    });
};

export const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);
