const InvariantError = require('../../exceptions/InvariantError');
const { ExportPayloadSchema } = require('./schema');

const ExportsValidator = {
  validateExportPayload: (payload) => {
    const result = ExportPayloadSchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = ExportsValidator;
