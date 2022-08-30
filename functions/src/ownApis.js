
const axios = require('axios');
const { db } = require('../firestore');

// matchlist APIs
const ownApis = (fastify, _, done) => {
    fastify.get('/matchlist', async (req, reply) => {
        if (req.session.spotifyToken === undefined) {
            reply.status = 400;
            reply.send({ error: 'UNAUTHORIZED', mes: 'Unauthorized session.' });
            return;
        }
        const result = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                authorization: `Bearer ${req.session.spotifyToken}`
            },
            validateStatus: () => true
        });

        const doc = await db.collection('matchlists').add({test: "test"});
        await doc.collection('playlists').add({test:" test"});

    });

    done();
}


module.exports = ownApis;