import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_services/home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const toast = (Swal as any).mixin({
	toast: true,
	position: 'top',
	showConfirmButton: false,
	timer: 3500
});

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public tenants: Array<any>;

	public editTenant: Array<any>;
	
	public newTenants = {};

	public buildings: Array<any>;

	public rooms: Array<any>;

	public tenantsTableStatus: boolean = true;

	public editTenantDiv: boolean = false;

	public tenantForm: FormGroup;

	constructor(private _homeSrv: HomeService, private _fb: FormBuilder) { }

	ngOnInit() {
		this.getTenants();
		this.getBuildings();

		this.tenantForm = this._fb.group({
			'name': ['', Validators.required],
			'pan_no': ['', Validators.required],
			'aadhar_no': ['', Validators.required],
			'building_name': ['', Validators.required],
			'room_no': ['', Validators.required],
		});

		this.tenantForm.controls['building_name'].valueChanges
		.subscribe(
			val => {
				this.onChangeBuilding(this.tenantForm.controls['building_name'].value);
			}
		)
	}

	getTenants() {
		this._homeSrv.getTenant()
			.subscribe(res => this.tenants = res.data);
	}

	getBuildings() {
		this._homeSrv.getBuildings()
			.subscribe(res => this.buildings = res.data);
	}

	onClickAdd() {
		this.tenantsTableStatus = false;
	}

	onClickBack() {
		this.tenantsTableStatus = true;
	}

	onClickEdit(tenant){
		this.editTenantDiv = true;
		this.editTenant = tenant;
	}

	onClickEditBack(){
		this.editTenantDiv = false;
	}

	onChangeBuilding(buildingId) {
		this._homeSrv.getRooms(buildingId)
			.subscribe(
				res => {
					this.rooms = res.data;
				},
				error => {
					toast({
						type: 'error',
						text: error
					});
				}
			)
	}

	addTenant() {
		if (this.tenantForm.valid) {
			this.newTenants['name'] = this.tenantForm.controls['name'].value;
			this.newTenants['pan_no'] = this.tenantForm.controls['pan_no'].value;
			this.newTenants['aadhar_no'] = this.tenantForm.controls['aadhar_no'].value;
			this.newTenants['building_id'] = this.tenantForm.controls['building_name'].value
			this.newTenants['room_id'] = this.tenantForm.controls['room_no'].value;
			
			this._homeSrv.insertTenant(this.newTenants)
				.subscribe(
					res => {
						this.getTenants();
						toast({
							type: 'success',
							text: 'Tenant has been added successfully'
						});
						this.tenantsTableStatus = true;
					},
					err => {
						toast({
							type: 'error',
							text: err.error
						});
					}
				);
		} else {
			toast({
				type: 'error',
				text: 'Please fill the all details.'
			});
		}
	}

	onSubmitUpdateTenantData(event){
		var id = event['id']
		this._homeSrv.editTenant(id, event)
		.subscribe(
			res => {
				toast({
					type: 'success',
					text: 'Tenant has been updated successfully'
				});
				this.getTenants();
				this.editTenantDiv = false;
			},
			err => {
				toast({
					type: 'error',
					text: err.error
				});
			}
		);
	}

	onClickDelete(id) {
		Swal({
			title: 'Are you sure?',
			text: 'You will not be able to recover this record!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.value) {
				this._homeSrv.deleteTenant(id)
					.subscribe(
						res => {
							toast({
								type: 'success',
								text: 'Tenant has been deleted successfully'
							});
							this.getTenants();
						},
						err => {
							toast({
								type: 'error',
								text: err.error
							});
						}
					)
			}
		});
	}

}