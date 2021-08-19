/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'SMALLINT',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    genre: {
      type: 'VARCHAR(20)',
    },
    duration: {
      type: 'SMALLINT',
    },
    inserted_at: {
      type: 'VARCHAR(25)',
      notNull: true,
    },
    updated_at: {
      type: 'VARCHAR(25)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
