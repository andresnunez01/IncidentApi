import { Request,Response } from "express"
import { IncidentModel } from "../../data/models/incident.model";
import { EmailService } from "../../domain/service/email.service";
export class IncidentController{
    
    public getIncidents = async (req:Request,res:Response)=>{
        try {
            const incidents = await IncidentModel.find();
            res.json(incidents);
        } catch (error) {
            
        }
    }

    public createIncidents = async (req:Request,res:Response)=>{

        try {
                const { title, description, lat, lng } = req.body;
                console.log(req.body)
                const newIncident = await IncidentModel.create({
                    title : title,
                    description : description,
                    lat : lat,
                    lng : lng
                });
                // const emailService = new EmailService();
                // await emailService.sendEmail({
                //     to: "andres.nunez01@outlook.com",
                //     subject: title,
                //     htmlBody: `<h1>${description}</h1>`
                // });
                return res.json(newIncident)
            } catch (error) {
                
            }
    }

    public getIncidentById = async (req:Request,res:Response)=>{
        const { id } = req.params;
        try {
            const incident = await IncidentModel.findById(id);
            res.json(incident);
        } catch (error) {
            console.error(error)
        }
    }

    public updateIncident = async (req:Request,res:Response)=>{
        const { id } = req.params;
        const { title, description, lat, lng } = req.body;
        try {
            const incident = await IncidentModel.findByIdAndUpdate(id,{ 
                title, 
                description, 
                lat, 
                lng 
            });
            res.json(incident);
        } catch (error) {
            console.error(error)
        }
    }

    public deleteIncident = async (req:Request,res:Response)=>{
        const { id } = req.params;
        try {
            await IncidentModel.findByIdAndDelete(id);
            res.json({message: "Registro borrado"});
        } catch (error) {
            console.error(error)
        }
    }
}
