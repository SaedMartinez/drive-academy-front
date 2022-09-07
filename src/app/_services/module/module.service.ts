import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModuleModel } from 'src/app/_model/module.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  BASE_URL = `${environment.backendAPI}/modules`;

  constructor(
    private http: HttpClient
  ) { }

  searchAllModulesByStudent(studentIdToSearch: number): Observable<ModuleModel[]>{
    return this.http.get<ModuleModel[]>(`${this.BASE_URL}/search/byStudent`, {
      params: {
        studentId: studentIdToSearch
      },
      responseType: "json"
    });
  }
}
