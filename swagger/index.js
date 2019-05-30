
const swaggerOption = require('fastify-swagger')(
    {
        swagger: {
      info: {
          title: 'Fastify Benmarking',
          description: 'Fastify swagger api',
          version: '1.0.0'
      },
    },
    exposeRoute: true,
    routePrefix:'/documentation'
}
);

module.exports = [
    swaggerOption
]