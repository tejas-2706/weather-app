import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface AuthenticatedRequest extends Request {
    userId?: string; // Add userId property
}

export const authMiddleware = (req:AuthenticatedRequest, res:any, next:any) => {
    const authHeader = req.headers.get?.('authorization') || "";
    // req.headers['authorization'] 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Provide Token / Incorrect Token"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded:any = verify(token, JWT_SECRET);

        if(decoded && decoded.userId){
            req.userId = String(decoded.userId);
            next();
        }

    } catch (err) {
        return res.status(403).json({
            message: "Token Verification Failed"
        });
    }
};

