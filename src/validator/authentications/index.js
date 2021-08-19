const InvariantError = require('../../exceptions/InvariantError');
const { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const result = PostAuthenticationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const result = PutAuthenticationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const result = DeleteAuthenticationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
