import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaCodes } from '../../models/AreaCodes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaCodesService {
  private apiUrl = 'http://fusionedge.runasp.net/Config/AreaCodes';

  constructor(private http: HttpClient) {}

  getAreaCodes(): Observable<AreaCodes[]> {
    return this.http.get<AreaCodes[]>(this.apiUrl);
  }

  addAreaCode(areaCode: AreaCodes): Observable<AreaCodes> {
    return this.http.post<AreaCodes>(this.apiUrl, areaCode);
  }

 updateAreaCode(areaCode: AreaCodes): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${areaCode.AreaCodeId}`, areaCode);
  }

  softDeleteAreaCode(areaCode: AreaCodes): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${areaCode.AreaCodeId}`, areaCode);
  }
}
