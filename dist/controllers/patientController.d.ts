import type { Request, Response } from 'express';
export declare const validateCreatePatient: import("express-validator").ValidationChain[];
export declare const validateUpdatePatient: import("express-validator").ValidationChain[];
export declare const validatePatientId: import("express-validator").ValidationChain[];
export declare const listPatients: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const getPatient: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const createPatient: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const updatePatient: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const deletePatient: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=patientController.d.ts.map