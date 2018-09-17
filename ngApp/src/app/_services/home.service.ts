import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

	private url = "http://localhost:3000/api";

	constructor(private _http: Http) { }

	getBuildings(){
		return this._http.get(this.url + '/buildings')
		.map((response: Response) => response.json())
		.catch((err) => Observable.throw(err.json()));
	}

	getRooms(id){
		return this._http.get(this.url + '/rooms/' + id)
		.map((response: Response) => response.json())
		.catch((err) => Observable.throw(err.json()));
	}

	getTenant() {
		return this._http.get(this.url + '/tenants')
		.map((response: Response) => response.json())
		.catch((err) => Observable.throw(err.json()));
	}

	insertTenant(tenant: any){
	  let headers = new Headers({'content-type': 'application/json'});
	  let options = new RequestOptions({headers: headers})
	  return this._http.post(this.url + '/tenants', JSON.stringify(tenant), options)
	  .map((response: Response) => response.json());
	}

	editTenant(id, tenant){
		let headers = new Headers({'content-type': 'application/json'});
		let options = new RequestOptions({headers: headers})
		return this._http.put(this.url + '/tenants/' + id, JSON.stringify(tenant), options)
		.map((response: Response) => response.json());
	}

	deleteTenant(id){
		return this._http.delete(this.url + '/tenants/' + id)
		.map((response: Response) => response.json())
		.catch((err) => Observable.throw(err.json()));
	}

}