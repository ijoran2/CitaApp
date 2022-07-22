import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CitaDTO} from '../models/cita-dto';
import{ListaCategorias} from '../models/lista-categorias';
import { environment} from '../../environments/environment';
import{CitaCreate} from '../models/CitaCreate'

@Injectable({
  providedIn: 'root'
})
export class WebApiCrudService {
  cita: CitaCreate = new CitaCreate();
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCitas(): Observable<CitaDTO[]>{
    return this.http.get(environment.baseUrl).pipe(
      map(response => response as CitaDTO[])
    );
  }


 guardaCita(
  Estado:string,
  Fecha:string, 
   ):Observable<CitaCreate>{
     
      this.cita.Fecha = Fecha;
      this.cita.Estado = Estado;
    return this.http.post<CitaCreate>(environment.baseUrl,this.cita, {headers: this.httpHeaders});
 }

 editarCita(
  id:number,
  Fecha:string,
  Estado:string, 
 
  
  ):Observable<CitaCreate>{
     
      this.cita.id = id;
      this.cita.Fecha = Fecha;
      this.cita.Estado = Estado;
      return this.http.put<CitaCreate>(`${environment.baseUrl}${this.cita.id}`, this.cita, {headers: this.httpHeaders})
 }


 getCitaPorId(id:number): Observable<CitaCreate>{
  return this.http.get(environment.baseUrl + id).pipe(
    map(response => response as CitaCreate)
  );
}

borrarCita(id: number): Observable<CitaCreate>{
  return this.http.delete<CitaCreate>(`${environment.baseUrl}${id}`, {headers: this.httpHeaders})
}

}
