const User = require('../../models/user/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    try {
        const cookies = req?.cookies;
        const { user, pwd } = req.body;
        if (!user || !pwd) res
            .status(400)
            .json({ "message": "usrname and password in required" });
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401);
        
        // console.log("pwwwd==>",pwd, foundUser);
        const match = await bcrypt.compare(pwd, foundUser.password);

        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: user,
                        roles: roles
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            )

            const newRefreshToken = jwt.sign(
                { username: foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "20s" }
                )
                
                let newRefreshTokenArray =
                !cookies?.jwt
                    ? foundUser.refreshToken
                    : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt)

            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await User.findOne({ refreshToken }).exec();

                if (!foundToken) {
                    console.log('attempted refresh token reuse at login!')
                    newRefreshTokenArray = [];
                }

                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            }

            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = foundUser.save();
            console.log(result);

            res.cookie("jwt", newRefreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,  //(Thunder client error) required in production
                maxAge: 24 * 60 * 60 * 1000,
            });

            // send authorization roles and acess token to user
            res.json({ accessToken, roles });
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        console.log(err);
    }

}

module.exports = { handleLogin }