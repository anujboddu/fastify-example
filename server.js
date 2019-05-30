const fastify = require('fastify')({
    logger: true
  })
 
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'testing the fastify swagger api',
        version: '0.1.0'
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    exposeRoute: true,
    routePrefix: '/documentations'
  })
 
//decorator
fastify.decorateRequest('user', function () {
    // something very useful
  })

//   Hook
// Update our property
fastify.addHook('preHandler', (req, reply, next) => {
    var apiKey = req.headers.jwt;
    if (apiKey == '1'){
        req.user = 'anuj'
    } else {
        req.user = 'prasanth'
    }
    next()
  })

  fastify.use(require('cors')())
  fastify.register(require('./routes'));

  const config = require('config');
  let id = '2'
  let url = config.get('END_POINT_URL') + '?id=' + id
  console.log(url);
  // Run the server!
  fastify.listen(3000, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })