import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpBackend} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private _lables: any;
  private http:HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  // Load lables.json from assets
 load(): Promise<boolean> {
  let url = "assets/jsons/labels.json"
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json')
  let options = {headers};
  return new Promise((resolve,reject)=>{
    this.http.get<any>(url,options).subscribe({
      next:(data)=>{
        this.lables = data
        resolve(true) 
      },
      error:(err)=>{
        console.log(err)
        reject(false)
      }

    })
  })

 }
  // Get the loaded Lables
  public get lables() {
    return this._lables;
  }

  // Set the Lables data
  private set lables(lables: any) {
    this._lables = lables;
  }
}
