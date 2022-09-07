import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/_services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columnNames = ['Nombre', 'Edad', 'CC', 'Licencia', 'nose',];
  attributeNames = ['name', 'age', 'dni', 'license', 'idk',];

  dummy = [
    {name: "sami1", age: "1", dni:"cc1"},
    {name: "sami2", age: "2", dni:"cc2"},
    {name: "sami3", age: "3", dni:"cc3"},
    {name: "sami4", age: "4", dni:"cc4"},
  ]
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadStudentsList();
  }

  loadStudentsList(){
    this.studentService.searchAllStudents().subscribe( response => {
      if(response.length > 0){
        this.dataSource.data = response;
      }
    },err => {
      console.log("nada mk");
    });
  }

}
