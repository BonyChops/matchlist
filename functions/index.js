const functions = require("firebase-functions");
const fastify = require('fastify')({
    logger: true,
    serverFactory: (handler) => {
        requestHandler = handler;
        return require('http').createServer();
    },
});
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');
const oauthPlugin = require('@fastify/oauth2');

const spotifyApis = require("./src/spotifyApis");
const ownApis = require("./src/ownApis");
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET,
    cookie: { secure: process.env.SECURE_COOKIE !== 'FALSE'},
});

fastify.register(oauthPlugin, {
    name: 'spotifyOAuth2',
    credentials: {
        client: {
            id: process.env.SPOTIFY_CLIENT_ID,
            secret: process.env.SPOTIFY_CLIENT_SECRET
        },
        auth: oauthPlugin.SPOTIFY_CONFIGURATION
    },
    startRedirectPath: '/api/login/spotify',
    callbackUri: `http://localhost:5000/api/login/spotify/callback`
});

fastify.register(oauthPlugin, {
    name: 'spotifyOAuth2WithPrivate',
    scope: ['playlist-read-private', 'user-library-read'],
    credentials: {
        client: {
            id: process.env.SPOTIFY_CLIENT_ID,
            secret: process.env.SPOTIFY_CLIENT_SECRET
        },
        auth: oauthPlugin.SPOTIFY_CONFIGURATION
    },
    startRedirectPath: '/api/login/spotify/private',
    callbackUri: `http://localhost:5000/api/login/spotify/callback`
});


fastify.register(spotifyApis, { prefix: "/api/spotify" });
fastify.register(ownApis, { prefix: "/api" });

fastify.addContentTypeParser('application/json', {}, (req, body, done) => {
    done(null, body.body);
});

// OAuth callback
fastify.get('/api/login/spotify/callback', async (req, reply) => {
    const result = await fastify.spotifyOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    console.log(result);

    req.log.info('The Spotify token is %o', result.token)
    req.session.spotifyToken = result.token.access_token;
    reply.send({ access_token: result.token.access_token });
});


exports.matchlistApi = functions.region('asia-northeast1').https.onRequest((req, res) => {
    fastify.ready((err) => {
        if (err) throw err;
        requestHandler(req, res);
    });
});