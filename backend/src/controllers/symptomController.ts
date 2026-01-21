import { Request, Response } from "express";
import Symptom from "../models/symptom";

const SymptomControl = {
  add: async ( req : Request, res : Response ) => {
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { painScale ,notes, water, weight } = req.body
        if ( painScale === null || painScale < 0 || painScale> 10 ) {
            return res.status(400).json ({ message: "Pain Scale must be 0-10" });
        }

        const newSymptom= new Symptom({
            userId: userId,
            painScale,
            notes,
            water,
            weight,
            date: new Date()
        })
        await newSymptom.save()

        const previousSymptom = await Symptom.findOne({
            userId: userId,
          }).sort({ date: -1 }).skip(1); // Get the previous entry (skip latest)

        if(previousSymptom && painScale> previousSymptom.painScale){
            return res.status(201).json({
                message: "Symptom logged successfully",
                symptom: newSymptom,
                suggestPlanChange: true,
                prompt: "Your pain has increased since your last entry. Would you like to update your plan?",
              });
        }
        res.status(201).json({message:"Symptom logged successfully",Symptom:newSymptom})
    }catch(err:any){
        res
        .status(500)
        .json({ message: err.message || "Internal server error" });
    }

},
    get : async( req : Request , res : Response )=>{

        try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const symptoms= await Symptom.find({userId}).sort({date:-1})
        res.status(201).json({symptoms})
        } catch ( err : any ) {
            res.status(500).json({ message:err.message || "Internal server error"})
        }

    }
}

export default SymptomControl