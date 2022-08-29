
const axios = require('axios');
const { db } = require('../firestore');

// matchlist APIs
const ownApis = (fastify, _, done) => {
    fastify.post('/matchlist', async (req, reply) => {
        if (req.session.spotifyToken === undefined) {
            reply.status = 400;
            reply.send({ error: 'UNAUTHORIZED', mes: 'Unauthorized session.' });
            return;
        }

    });

    done();
}


module.exports = ownApis;