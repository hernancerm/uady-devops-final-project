import { Request, Response } from "express";

export const TestController: any = () => {
  const get = async (req: Request, res: Response) => {  
    try {          
      return res.status(200)
    } catch (error) {
      return res.status(500).json({ error: "Unexpected DB error" });
    }
  };

  return { get };
};