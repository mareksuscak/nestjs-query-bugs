// Use admin then create user root
var adminDB = db.getSiblingDB('admin');
adminDB.createUser({
  user: 'superuser',
  pwd: 'superuser',
  roles: [{ role: 'root', db: 'admin' }],
});

// Authenticate as the root user
adminDB.auth('superuser', 'superuser');

// Create a new user in the target database
adminDB.createUser({
  user: _getEnv('MONGO_INITDB_NONROOT_USERNAME'),
  pwd: _getEnv('MONGO_INITDB_NONROOT_PASSWORD'),
  roles: [
    { role: 'readWrite', db: _getEnv('MONGO_INITDB_DATABASE') },
    { role: 'dbAdmin', db: _getEnv('MONGO_INITDB_DATABASE') },
    { role: 'root', db: 'admin' },
  ],
});

// Set the default write concern may be needed in some cases
// https://www.mongodb.com/docs/manual/reference/command/setDefaultRWConcern/#:~:text=MongoDB%20only%20applies%20the%20global,specified%20by%20the%20issuing%20client.
// adminDB.adminCommand({ "setDefaultRWConcern" : 1 })
