/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addPlaylistSong(playlistId, songId) {
    const id = `songlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }

    await this._cacheService.delete(`songs:${playlistId}`);
  }

  async getPlaylistSongs(playlistId) {
    try {
      const result = await this._cacheService.get(`songs:${playlistId}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: `SELECT s.id, s.title, s.performer FROM songs s
          LEFT JOIN playlist_songs ps ON ps.song_id = s.id
          WHERE ps.playlist_id = $1
          GROUP BY s.id`,
        values: [playlistId],
      };
      const result = await this._pool.query(query);

      await this._cacheService.set(`songs:${playlistId}`, JSON.stringify(result.rows));
      return result.rows;
    }
  }

  async deletePlaylistSong(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal dihapus dari daftar playlist');
    }

    await this._cacheService.delete(`songs:${playlistId}`);
  }
}

module.exports = PlaylistSongsService;
