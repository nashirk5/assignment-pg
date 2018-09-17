import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../_services/home.service';

@Component({
	selector: 'app-edit-tenant',
	templateUrl: './edit-tenant.component.html',
	styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent implements OnInit {

	@Input() editTenant: any;
	@Input() buildings: any;
	@Output() updateTenantData = new EventEmitter();

	constructor(private _fb: FormBuilder, private _homeSrv: HomeService) { }

	tenantEditForm: FormGroup;

	rooms: Array<any>;

	newEditTenant = {};

	ngOnInit() {
		this.tenantEditForm = this._fb.group({
			'name': [this.editTenant['name'], Validators.required],
			'pan_no': [this.editTenant['pan_no'], Validators.required],
			'aadhar_no': [this.editTenant['aadhar_no'], Validators.required],
			'building_name': [this.editTenant['building_id'], Validators.required],
			'room_no': [this.editTenant['room_id'], Validators.required],
		});

		this.onChangeBuilding(this.tenantEditForm.controls['building_name'].value);

		this.tenantEditForm.controls['building_name'].valueChanges
		.subscribe(
			val => {
				this.onChangeBuilding(this.tenantEditForm.controls['building_name'].value);
			}
		)
	}

	onChangeBuilding(buildingId) {
		this._homeSrv.getRooms(buildingId)
			.subscribe(
				res => {
					this.rooms = res.data;
				}
			)
	}

	updateTenant(){
		this.newEditTenant['id'] = this.editTenant['id'];
		this.newEditTenant['name'] = this.tenantEditForm.controls['name'].value;
		this.newEditTenant['pan_no'] = this.tenantEditForm.controls['pan_no'].value;
		this.newEditTenant['aadhar_no'] = this.tenantEditForm.controls['aadhar_no'].value;
		this.newEditTenant['building_id'] = this.tenantEditForm.controls['building_name'].value
		this.newEditTenant['room_id'] = this.tenantEditForm.controls['room_no'].value;

		this.updateTenantData.emit(this.newEditTenant);
	}

}