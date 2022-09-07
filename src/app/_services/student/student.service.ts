import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from 'src/app/_model/student.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = `${environment.backendAPI}/v1/students`;

  constructor(
    private http: HttpClient
  ) { }

  searchAllStudents(): Observable<StudentModel[]>{
    return this.http.get<StudentModel[]>(`${this.BASE_URL}/all`, {
      responseType: "json"
    });
  }
}
