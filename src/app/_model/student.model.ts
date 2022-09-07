import { LicenseModel } from "./license.model";

export class StudentModel {
    id!: number;
    name!: string;
    age!: string;
    dni!: string;
    license!: LicenseModel;
}