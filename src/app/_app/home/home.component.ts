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

  columnNames = ['Nombre', 'Edad', 'CC', 'Licencia', '',];
  attributeNames = ['name', 'age', 'dni', 'license.typeName', 'details',];

  dummy = [
    {name: "sami1", age: "1", dni:"cc1"},
    {name: "sami2", age: "2", dni:"cc2"},
    {name: "sami3", age: "3", dni:"cc3"},
    {name: "sami4", age: "4", dni:"cc4"},
  ]
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
      console.log("nada mk");
    });
  }

  openStudentModal(student: StudentModel){
    this.dialog.open(StudentDetailsComponent, {
      data: {
        studentSelected: student  
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
