const PlaylistSongsHandler = require('./handler');
const routes = require('./router');

module.exports = {
  name: 'playlist_songs',
  version: '1.0.0',
  register: async (server, { playlistSongsService, playlistsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler({
      playlistSongsService, playlistsService, validator,
    });
    server.route(routes(playlistSongsHandler));
  },
};
