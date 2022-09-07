import { CourseModel } from "./course.model";
import { StudentModel } from "./student.model";

export class ModuleModel {
    id!: number;
    moduleName!: string;
    moduleStatus!: string
    course!: CourseModel;
    student!: StudentModel
}