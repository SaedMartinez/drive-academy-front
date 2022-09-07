import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from 'src/app/_model/student.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = `${environment.backendAPI}/students`;

  constructor(
    private http: HttpClient
  ) { }

  searchAllStudents(): Observable<StudentModel[]>{
    return this.http.get<StudentModel[]>(`${this.BASE_URL}/all`, {
      responseType: "json"
    });
  }

  searchStudent(nameToSearch?: string, idToSearch?: number, other?: string): Observable<StudentModel>{
    return this.http.get<StudentModel>(`${this.BASE_URL}/search/student`, {
      params: {
        name: nameToSearch != undefined ? nameToSearch : 'sin_nombre',
        id: idToSearch != undefined ? idToSearch : 0
      },
      responseType: "json"
    });
  }

  updateStudent(student: StudentModel): Observable<Object>{
    return this.http.put( `${this.BASE_URL}/update/student`, student, {
      responseType: "json"
    });
  }
}
