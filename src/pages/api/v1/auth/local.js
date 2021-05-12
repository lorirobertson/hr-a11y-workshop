import createHandler from '@middleware/createHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

var db = global.db;

const apiRoute = createHandler();

const createToken = async (secret, payload) => {
    const sanitizedUserObj = _.pick(payload, ['id', 'fullName', 'username', 'email', 'role', 'organizations', 'img']);
    const token = jwt.sign(sanitizedUserObj, secret, { expiresIn: process.env.TOKEN_EXPIRATION });
    return { token, payload: sanitizedUserObj };
};

apiRoute.post(async (req, res) => {
    const identity = req.body.identifier;
    const password = req.body.password;

    const user = await global.db['users'].findOne({username: identity});

    console.log(user);

    if (!user) {
        res.status(401).json({ status: 401, data: 'Authentication failed.' });
        return;
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user?.password);
        
        if (!passwordMatch) {
            res.status(401).json({ status: 401, data: 'Authentication failed.' });
            return;
        }

        const { token, payload } = await createToken(process.env.SECRET, user);

        res.json({ status: 200, data: { token, user: payload } });
    } catch(err) {
        console.error(err);
        res.status(500).end(err.toString());
    }; 
})

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};