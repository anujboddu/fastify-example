const {
    // schema: weatherSchema,
    jwtSchema,
    schema: mappingSchema
} = require('./schemas')

const axios = require('axios');
const config = require('config');
var objectMapper = require('object-mapper');

module.exports = async function (fastify, opts) {
    // Declare a route
    fastify.register(async function (fastify) {
        // fastify.get('/digital/api/v1/weather', { schema: weatherSchema},weatherHandler)
        fastify.get('/', (req, reply) => {
            reply.send(`Hello ${req.user}!`)
        })
        fastify.get('/mapping', mappingHandler)

        fastify.register(require('fastify-jwt'), {
            secret: 'supersecret'
        })
        fastify.get('/jwt', (req, reply) => {
            fastify.axios(req, reply, 'get', options)
            const token = fastify.jwt.sign({ foo: 'bar' })
            // synchronously
            const decoded = fastify.jwt.verify(token)
            req.jwtVerify()
            reply.send(token)
        })
    })
}

// async function weatherHandler(req,reply) {

//     req.log.info('reponse from weatherhandler')
//     console.log('req.validationError',req.validationError)
//     console.log('req.query',req.query)
//     const q = req.query.q;

//     const appid = req.query.appid;


//     axios.get(`http://samples.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`)
//     .then(res => {
//     console.log(res.data);
//     reply.send(res.data)
//     }).catch(err =>{
//         console.log(err)
//     })
// }

async function mappingHandler(req, reply) {
    
    const src =

    {
        id: 123233,
        channel: "SHARE",
        consumerId: "453654772",
        demographicInfo: {
            firstName:'anuj',
            lastName:'boddu',
            dob:'04/29/1993'
        },
        policies: [
            {
                contractNumber: "H2343243",
                contractSts: "ACTV",
                products: [
                    {
                        productLine: "Health",
                        productPlan: "Blue Medicare",
                        lob: "MPP",
                        productId: 0
                    },
                    {
                        productLine: "Health",
                        productPlan: "Blue Medicare",
                        lob: "MPP",
                        productId: 0
                    }
                ],
                pcp: [
                    {
                        date: "2017-01-01",
                        providerLName: "KESDEN",
                        providerFName: "DANIEL",
                    }
                ],
                addresses: [
                    {
                        type: "Correspondence",
                        lineAd1: "8550 touchton rd",
                        lineAd2: "apt 1111",
                        cityNm: "jacksonville",
                        country: "USA"
                    },
                    {
                        type: "WORK",
                        lineAd1: "1234 gate parkway",
                        lineAd2: "apt 444",
                        cityNm: "dallas",
                        country: "USA"
                    },
                    {
                        type: "HOME",
                        lineAd1: "8544 cyberonics blvd",
                        lineAd2: "apt 1234",
                        cityNm: "houston",
                        country: "USA"
                    }
                ],
                groupNumber: "55544"
            },
            {
                contractNumber: "H124563",
                contractSts: "CANL",
                products: [
                    {
                        productLine: "Dental",
                        productPlan: "Dental Medicare",
                        lob: "AOS",
                        productId: 0
                    },
                    {
                        productLine: "Dental",
                        productPlan: "Dental Medicare Plan",
                        lob: "MFT",
                        productId: 0
                    }
                ],
                pcp: [
                    {
                        date: "2017-01-01",
                        providerLName: "asdgg",
                        providerFName: "dfgfhdf",
                    }
                ],
                addresses: [
                    {
                        type: "work",
                        lineAd1: "8550 qwerfv rd",
                        lineAd2: "apt 1111",
                        cityNm: "chicago",
                        country: "USA"
                    },
                    {
                        type: "Correspondence",
                        lineAd1: "dfdd parkway",
                        lineAd2: "apt 444",
                        cityNm: "illnois",
                        country: "USA"
                    },
                    {
                        type: "Home",
                        lineAd1: "7777 butler blvd",
                        lineAd2: "apt 1234",
                        cityNm: "houston",
                        country: "USA"
                    }
                ],
                groupNumber: "fvdf"
            }
        ],

        adresses: [
            {
                lineAd1: "8550 lincoln rd",
                lineAd2: "apt 1111",
                cityNm: "orlando",
                country: "USA"
            }
        ]

    }

    console.log(src.policies)
    // src.policies.map(addressType => {
    //     if (contracts.contractSts == 'ACTV') {
    //         console.log(contracts.addresses)
    //         contracts.addresses.map(addressType => {
    //             console.log('addressType', addressType.type)

    //             if (addressType.type == 'Correspondence') {
    //                 mailingAddress.push(addressType)
    //             }
    //             else {
    //                 console.log('in else')
    //             }
    //         })

    //     }
    //     else {
    //         console.log('in else')
    //     }
    // })


    // const activePolicies = src.policies.filter(policy => {
    //     if(policy.contractSts === 'ACTV'){
    //        return true;
    //     }
    //     return false;
    //    });


       
       const result = src.policies.map(policy => {
           policy.addresses = policy.addresses.filter(address => {
               if(address.type == 'Correspondence') {
                   return true;
               }
               return false;
           });
           return policy;
       });

       var mailingAddress = []
        result.map(memberData => 
        {
            var data = {
                contractNumber: memberData.contractNumber,
                contractSts: memberData.contractSts
            }
            data.addresses = memberData.addresses.map(address => {
                var updatedAddress = {
                    type: address.type,
                    lineAd1: address.lineAd1,
                    cityNm: address.cityNm
                }
                return updatedAddress;
            })
            mailingAddress.push(data);
        })
        var updatedResult = {
            firstName:src.demographicInfo.firstName,
            lastName:src.demographicInfo.lastName,
            dob:src.demographicInfo.dob,
            contracts:mailingAddress
        }






    // var map = {
    //     "id" : "partyId",
    //     "policies": "contracts",
    //     "policies[].contractNumber": "contracts[].contractId",
    //     "policies[].addresses[].lineAd1":"contracts[].addresses[].addressLine1",
    //     "policies[].addresses[].lineAd2":"contracts[].addresses[].addressLine2",
    // }

    // var map = {
    //         "id" : "partyId",
    //         "policies[].contractNumber": "contracts[].contractId",
    //         "policies[].contractSts": "contracts[].contractStatus",
    //         "policies[].products[]": "contracts[].productInfo",
    //         "policies[].products[].productLine": "contracts[].productInfo.productType",
    //     }


    // var dest = objectMapper(src, map);


    reply.send(updatedResult)


    fastify.axios()
} 