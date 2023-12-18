db.createUser({
  user: process.env['MONGO_INITDB_NONROOT_USERNAME'],
  pwd: process.env['MONGO_INITDB_NONROOT_PASSWORD'],
  roles: [
    { role: 'readWrite', db: process.env['MONGO_INITDB_DATABASE'] },
    { role: 'dbAdmin', db: process.env['MONGO_INITDB_DATABASE'] },
    { role: 'root', db: 'admin' },
  ],
});
