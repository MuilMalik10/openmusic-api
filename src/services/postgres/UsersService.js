/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashPassword, fullname],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('user gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. username sudah digunakan');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    const { id, password: hashPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
