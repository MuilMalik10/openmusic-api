/* eslint-disable no-underscore-dangle */
class ExportsHandler {
  constructor({ producerService, playlistsService, validator }) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportHandler = this.postExportHandler.bind(this);
  }

  async postExportHandler(request, h) {
    this._validator.validateExportPayload(request.payload);

    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { targetEmail } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

    const message = {
      playlistId,
      targetEmail,
    };

    await this._producerService.sendMessage('export:songs', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
