import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModuleModel } from 'src/app/_model/module.model';
import { StudentModel } from 'src/app/_model/student.model';
import { ModuleService } from 'src/app/_services/module/module.service';
import { StudentService } from 'src/app/_services/student/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  columnNames = ['Modulo:', 'Clase Alcanzada', 'Estado'];
  attributeNames = ['moduleName', 'level_fk', 'moduleStatus',];

  dataSource = new MatTableDataSource<ModuleModel>();

  public loadingPage = false;
  public submitted = false;


  public studentForm!: FormGroup;
  studentSelected!: StudentModel;

  constructor(
    public dialogRef: MatDialogRef<StudentDetailsComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private moduleService: ModuleService,
    @Inject(MAT_DIALOG_DATA) data: any
    ) {
      this.studentSelected = data.studentSelected;
    }

  ngOnInit(): void {
    this.buildForm();
    this.fillForm();
    this.loadModulesByStudent();
  }

  get form() {
    return this.studentForm.controls;
  }

  buildForm(){
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      dni: ['', Validators.required],
      license: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  fillForm(){
    this.studentForm.patchValue({
      name: this.studentSelected.name,
      dni: this.studentSelected.dni,
      license: this.studentSelected.license.typeName,
      age: this.studentSelected.age
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      this.submitted = false;
      return;
    }

    this.loadingPage = true;
    let student = new StudentModel();
    student.id = this.studentSelected.id;
    student.name = this.form['name'].value;
    student.age = this.form['age'].value;
    student.dni = this.form['dni'].value;
    student.license = this.studentSelected.license;

    this.updateStudent(student);
    
  }

  loadModulesByStudent(){
    
    this.moduleService.searchAllModulesByStudent(this.studentSelected.id).subscribe( response => {
      if (response.length > 0) {
        this.dataSource.data = response;
      }
    });
  }

  updateStudent(student: StudentModel){
    this.studentService.updateStudent(student).subscribe( res => {
      console.log(`respuesta ok: ${res}`);
      this.dialogRef.close('reload');
    },err => {
      debugger;
      console.log(`Ups algo sucedio: ${err.error.errors[0].defaultMessage}`);
    }
    
    );
  }
    

}