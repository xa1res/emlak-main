import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Browser: '/api' (proxy). SSR: tam URL (backend)
  private base = isPlatformBrowser(this.platformId)
    ? environment.apiUrl
    : (environment as any).serverApiUrl ?? 'http://localhost:5221/api';

  private pickArray(res: any): any[] {
    if (Array.isArray(res)) return res;
    if (!res || typeof res !== 'object') return [];
    // data / Data / items / Items / results / Results...
    const candidates = ['data','Data','items','Items','results','Results'];
    for (const key of candidates) {
      if (Array.isArray(res[key])) return res[key];
    }
    return [];
  }

  private buildParams(params?: Record<string, any>) {
    let p = new HttpParams();
    if (!params) return p;
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined || v === '') continue;
      p = p.set(k, String(v));
    }
    return p;
  }

  getIlanlar(params?: Record<string, any>) {
    return this.http
      .get<any>(`${this.base}/Ilanlar`, { params: this.buildParams(params) })
      .pipe(map(res => this.pickArray(res)));
  }

  getBlog(params?: Record<string, any>) {
  let p = new HttpParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== null && v !== undefined && v !== '') p = p.set(k, String(v));
  }

  return this.http.get<any>(`${this.base}/Blog`, { params: p }).pipe(
    map(res => Array.isArray(res) ? res : (res?.data ?? res?.Data ?? res?.items ?? res?.Items ?? []))
  );
}


  getDanismanlar() {
    return this.http
      .get<any>(`${this.base}/Danismanlar`)
      .pipe(map(res => this.pickArray(res)));
  }

  getIlanById(id: string) {
    return this.http.get<any>(`${this.base}/Ilanlar/${id}`);
  }
}
