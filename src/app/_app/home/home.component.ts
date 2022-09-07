import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from 'src/app/_model/student.model';
import { StudentService } from 'src/app/_services/student/student.service';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingPage = true;

  columnNames = ['Nombre', 'Edad', 'CC', 'Licencia', 'Ver detalle',];
  attributeNames = ['name', 'age', 'dni', 'license.typeName', 'details',];

  public dataSource = new MatTableDataSource<StudentModel>();

  st = new StudentModel();
  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadStudentsList();
  }

  loadStudentsList(){
    this.studentService.searchAllStudents().subscribe( response => {
      if(response.length > 0){
        this.dataSource.data = response;
        this.loadingPage = false;
      }
    },err => {
      console.log(err);
    });
  }

  openDetailStudentModal(student: StudentModel){
    this.dialog.open(StudentDetailsComponent, {
      data: {
        studentSelected: student ,
        title: 'Detalles de estudiante',
        operation: 'update'
      },
      width: '80%',
      height: '85%',
    }).afterClosed().subscribe( res => {
      if (res === 'reload') {
        this.ngOnInit();
      }
    });
  }

  openNewStudentModal(){
    this.dialog.open(StudentDetailsComponent, {
      data: {
        studentSelected: new StudentModel(),
        title: 'Nuevo Estudiante:',
        operation: 'new'
      },
      width: '80%',
      height: '85%',
    }).afterClosed().subscribe( res => {
      if (res === 'reload') {
        this.ngOnInit();
      }
    });
  }

}
