import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpBackend} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: any;
  private http:HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  // Load lables.json from assets
 load(): Promise<boolean> {
  let url = "assets/jsons/config.json"
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json')
  let options = {headers};
  return new Promise((resolve,reject)=>{
    this.http.get<any>(url,options).subscribe({
      next:(data)=>{
        this.config = data
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
  public get config() {
    return this._config;
  }

  // Set the config data
  private set config(config: any) {
    this._config = config;
  }
}