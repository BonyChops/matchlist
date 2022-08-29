
const axios = require('axios');

// Spotify APIs
const spotifyApis = (fastify, _, done) => {
    fastify.get('/userinfo', async(req, reply) => {
        if(req.session.spotifyToken === undefined){
            reply.status = 400;
            reply.send({error: 'UNAUTHORIZED', mes: 'Unauthorized session.'});
            return;
        }
        const result = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                authorization: `Bearer ${req.session.spotifyToken}`
            },
            validateStatus: () => true
        });
        reply.status = result.status;
        reply.send({...result.data, access_token: req.session.spotifyToken});
    });

    fastify.get('/playlists', async(req, reply) => {
        if(req.session.spotifyToken === undefined){
            reply.status = 400;
            reply.send({error: 'UNAUTHORIZED', mes: 'Unauthorized session.'});
            return;
        }
        const result = await axios.get(`https://api.spotify.com/v1/users/${req.query.user_id}/playlists?limit=${req.query.limit ?? 50}&offset=${req.query.offset ?? 0}`, {
            headers: {
                authorization: `Bearer ${req.session.spotifyToken}`
            },
            validateStatus: () => true
        });
        reply.status = result.status;
        reply.send(result.data);
    });

    done();
}


module.exports = spotifyApis;