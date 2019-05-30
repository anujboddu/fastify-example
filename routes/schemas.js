const schema = {
 tag: ['weather'],
    headers: {
     type: 'object',
     properties: {
         q: {type: 'string'},
         appid: {tpe: 'string'}
     },
     additionalProperties: false   
    },
    response: {
        200: {
            type: 'object',
            description: 'successful response',
            properties: {
                partyId: {type: 'number'},
                channel: {type: 'string'}
            }
        }
    }
}

const jwtSchema = {
    tag: ['weather'],
    headers: {
     type: 'object',
     required: ['authorization'],
     properties: {
         q: {type: 'string'},
         appid: {tpe: 'string'}
     },
     additionalProperties: false   
    },
    response: {
        200: {
            type: 'object',
            description: 'successful response',
            properties: {
                activeContracts: {
                    type: 'array'
                }
            }
        }
    }
}

const mappingSchema = {
    // tag: ['weather'],
    // headers: {
    //  type: 'object',
    //  properties: {
    //      q: {type: 'string'},
    //      appid: {tpe: 'string'}
    //  },
    //  additionalProperties: false   
    // },
    // response: {
    //     200: {
    //         type: 'object',
    //         description: 'successful response',
    //         properties: {
    //             s: {type: 'number'},
    //             channel: {type: 'string'}
    //         }
    //     }
    // }
}




module.exports = {
    schema,
    jwtSchema,
    mappingSchema
}