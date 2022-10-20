import express from'express';
const app = express();
import cfenv from "cfenv";
const appEnv = cfenv.getAppEnv(); 
import fetch from 'node-fetch';
import cors from 'cors';
import { cors } from './config.json'
app.use(cors({
    origin: cors
}));


app.get('/', async function (req, res) {
    const bearerHeader = req.headers['authorization'];
    let url = `${appEnv.app.cf_api}/v2/spaces`
    let text;
    try {

        let resp = await fetch(url, { method: 'GET', headers: {'Authorization': bearerHeader}});        
        text = await resp.text()
    } catch (error) {
        text = error;
    }
    
    res.send(text)

//     res.send(`
//   <!DOCTYPE html>
//   <html>
//   <head>
//   <title>Node</title>
//   </head>
//   <body>
  
//   <h1>Lab 1</h1>
//   <p>${JSON.stringify(appEnv)}</p>
//   <hr></hr>
//   <p>${text}</p>
//   <hr></hr>
//   <p>${bearerHeader}</p>
//   </body>
//   </html>  
//   `)
})
 
app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url)
});