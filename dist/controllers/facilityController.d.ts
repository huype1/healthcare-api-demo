import type { Request, Response } from 'express';
export declare const validateCreateFacility: import("express-validator").ValidationChain[];
export declare const validateUpdateFacility: import("express-validator").ValidationChain[];
export declare const validateFacilityId: import("express-validator").ValidationChain[];
export declare const listFacilities: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const getFacility: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const createFacility: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const updateFacility: (req: Request, res: Response, next: import("express").NextFunction) => void;
export declare const deleteFacility: (req: Request, res: Response, next: import("express").NextFunction) => void;
//# sourceMappingURL=facilityController.d.ts.map