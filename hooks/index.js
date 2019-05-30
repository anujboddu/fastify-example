
async function jwt (fastify,opts) {
    fastify.jwt(ots)
    return jwt;
}


// function apihit(reply, url, method, options = {}) {
//     axios.get(url,options).then({res =>
//       reply.send();
//     })
//   }
  
//   function apihit(reply, url, method, options = {}) {
//   axios({method: method, url: url})
//   .then({res =>
//       reply.send();
//     })
//   }

module.exports = jwt;