const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistPayloadSchema } = require('./schema');

const PlaylistsValidator = {
  validatePlaylistPayload: (payload) => {
    const result = PlaylistPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
