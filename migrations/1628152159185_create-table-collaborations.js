/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(30)',
      notNull: true,
      references: '"playlists"',
      onDelete: 'cascade',
    },
    user_id: {
      type: 'VARCHAR(30)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
