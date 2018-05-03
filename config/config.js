/** 
 * These are lists of environment variables 
 * 
 * envBuild[directory] = [...environmentVariables]
 * Will need to add other types of servers later in development. (i.e )
 */

const envBuild = {
  'server': [
    'PORT=3000'
  ],
  'client': [
    'NODE_ENV=DEVELOPMENT',
    'DEBUG=TRUE',
    'ENVPREFIX=REACT_APP_',
    'REST_SERVER_URL=http://localhost:4990',
    'SOCKET_SERVER_URL=http://localhost:4155',
    'REACT_APP_SOCKET_SERVER_URL=http://localhost:4155',
    'REACT_APP_REST_SERVER_URL=http://localhost:4990'
  ]
};

module.exports = envBuild;