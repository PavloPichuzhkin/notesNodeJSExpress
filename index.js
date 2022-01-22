import express from 'express'
import router from './routes/notesRouter.js'
import bodyParser from 'body-parser';


const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use('', router);
app.use(router);


async function start() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

start();