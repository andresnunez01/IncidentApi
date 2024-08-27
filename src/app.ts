import express,{Request,Response} from 'express'
import { envs } from './config/envs';
import { MongoDatabase } from './data/init';
import { IncidentModel } from './data/models/incident.model';
import { AppRoutes } from './presentation/routes';

console.log(envs.PORT)

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () => 
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL, 
        dbName: envs.MONGO_DB
    }))
();

// app.get("/",async(req:Request,res:Response)=>{
//     try {
//         const incidents = await IncidentModel.find();
//         res.json(incidents);
//     } catch (error) {
        
//     }
// });

// app.post("/", async (req:Request,res:Response)=>{
// try {
// console.log("first")
//     const { title, description, lat, lng } = req.body;
//     console.log(req.body)
//     const newIncident = await IncidentModel.create({
//         title : title,
//         description : description,
//         lat : lat,
//         lng : lng
//     });
//     return res.send(newIncident)
// } catch (error) {
    
// }
// })

app.listen(envs.PORT,()=>{
    console.log("Server running on PORT 3000")
})