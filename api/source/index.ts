if( process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
import http from 'http';
import express, { Express } from 'express';
import routes from './routes/routes';

const PORT = process.env.SERVER_PORT || 4000;

const router: Express = express();


router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    /*if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }*/
    next();
});

router.use('/', routes);

router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
httpServer.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));