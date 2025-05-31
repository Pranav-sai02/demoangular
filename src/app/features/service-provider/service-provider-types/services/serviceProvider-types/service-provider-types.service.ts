import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProviderTypes } from '../../models/ServiceProviderTypes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderTypesService {
  /** default JSON Server URL → adjust if you changed the port or route */
  private readonly baseUrl = 'http://fusionedge.runasp.net/Config/ServiceProviderTypes';

  constructor(private http: HttpClient) {}

  /** GET all */
  getAll(): Observable<ServiceProviderTypes[]> {
    return this.http.get<ServiceProviderTypes[]>(this.baseUrl);
  }

  /** GET single */
  get(id: number): Observable<ServiceProviderTypes> {
    return this.http.get<ServiceProviderTypes>(`${this.baseUrl}/${id}`);
  }

  /** POST create */
  create(payload: ServiceProviderTypes): Observable<ServiceProviderTypes> {
    return this.http.post<ServiceProviderTypes>(this.baseUrl, payload);
  }

  /** PUT update (JSON Server supports PUT for full update) */
  update(
    id: number,
    payload: ServiceProviderTypes
  ): Observable<ServiceProviderTypes> {
    return this.http.put<ServiceProviderTypes>(
      `${this.baseUrl}/${id}`,
      payload
    );
  }

  /** DELETE */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
