import 'dotenv/config';
import {checkToken} from "./middlewares/authMiddlewares";
const gateway = require('fast-gateway')

export type JWT = {
    userId?: string;
    role?: string;
};

const server = gateway({
    routes: [
        {
            prefix: '/user',
            target: 'http://localhost:8090'

        },
        {
            prefix: '/debate-zone',
            target: 'http://localhost:8092',
            middlewares: [
                checkToken
            ],
        },
        {
            prefix: '/notification',
            target: 'http://localhost:8093',
            middlewares: [
                checkToken
            ],
        },
        {
            prefix: '/streaming',
            target: 'http://localhost:8091'
        },
    ]
})

server.start(8080).then(() => {
    console.log('Gateway started!')
}).catch((err: any) => {
    console.error(err)
})
