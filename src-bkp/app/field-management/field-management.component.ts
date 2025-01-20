import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';
import { Location } from '@angular/common';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { retry } from 'rxjs/operators';
import { AuthService , } from 'src/app/modules/service/AuthService.service';
@Component({
  selector: 'app-field-management',
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.scss']
})
export class FieldManagementComponent implements OnInit {

  @ViewChild('confirmLogout') confirmLogout!: ElementRef;
  Module: any[] = [];
  UserRole: any[] = [];
  AccessSuperModules: any[] = [];
  isanythingEdit:boolean = false;
  isLoading:boolean = false;
  openId: number | null = null; // Stores the index of the currently open module
  AddDynamicFields:any = sessionStorage.getItem('AddDynamicFields');

  constructor(private bridgeService: BridgeService,private _location: Location,
    private _NotifierService: NotiferService,private route: Router,private modalService: NgbModal,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.getModuleData();
    this.getRoles();

  }

  backClicked() {
    this._location.back();
  }

  AddDymainkey(mainarray:any,dynamicarray:any){
  // Iterate through mainarray and check if the key exists in dynamicarray
mainarray.forEach((mainItem: { key: any; is_dynamic: boolean; id: any; }) => {
  // Find the matching dynamicItem where field_name equals key
  const matchingDynamicItem = dynamicarray.find((dynamicItem: { field_name: any; }) => dynamicItem.field_name === mainItem.key);

  if (matchingDynamicItem) {
    // If a match is found, set is_dynamic to true and add the corresponding id
    mainItem.is_dynamic = true;
    mainItem.id = matchingDynamicItem.id;
  } else {
    // If no match is found, set is_dynamic to false and don't add an id
    mainItem.is_dynamic = false;
  }
});

    return mainarray
  }


AddDymainkey2(mainarray:any,dynamicarray:any){
  // Iterate through mainarray and check if the key exists in dynamicarray
mainarray.forEach((mainItem: { module_name: any; is_accessible: boolean; id: any; }) => {
  // Find the matching dynamicItem where field_name equals key
  const matchingDynamicItem = dynamicarray.find((dynamicItem: { module_name: any; }) => dynamicItem.module_name === mainItem.module_name);

  if (matchingDynamicItem) {
    mainItem.is_accessible = matchingDynamicItem.is_accessible;
  }
});
    return mainarray
  }


  // Fetch modules and subfields from the API
  getModuleData(): void {
    this.Module = [];
    this.isLoading = true;
    this.bridgeService.getFiledManagment().subscribe(
      (res: any) => {
        this.Module = res.data;
        for(let i = 0;i<this.Module.length;i++){
          this.Module[i].data = this.AddDymainkey(this.Module[i].data,this.Module[i].dynamic_data);
        }

      let AccessSuperModules2:any = sessionStorage.getItem('SuperAdminModuleAccess');

      this.AccessSuperModules = JSON.parse(AccessSuperModules2);

      this.Module = this.AddDymainkey2(this.Module,this.AccessSuperModules);

        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching module data', error);
      }
    );
  }

  // Toggle visibility of subfields for the selected module
  toggleSubfields(index: number): void {
    this.openId = this.openId === index ? null : index;
    this.SaveAction(this.oldsubfld,this.isEditIndex);
  }

  // Handle actions like edit, delete, etc.
  isEditIndex:any = -1;
  oldsubnamevalu:any = '';
  oldsubfld:any = {label:'0'};
  handleAction(subfield: any,index:any): void {
    this.oldsubnamevalu = subfield.label;
    this.oldsubfld = subfield;
    // alert(this.oldsubnamevalu);
    this.isEditIndex = index;
    this.isanythingEdit = true;
    // Implement your action logic here (e.g., edit, delete)
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  closeResult = '';
  deleteAttach(confirmModal2: any) {
    this.modalService
      .open(confirmModal2, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  Disabelfieldid:any = 0;
  deleteAttach2(confirmModal22: any,subfield:any) {
    this.Disabelfieldid = subfield.id;
    this.modalService
      .open(confirmModal22, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnDestroy() {
    debugger
    if (this.isanythingEdit) {
      this.modalService.open(this.confirmLogout, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        modalDialogClass: 'confirm-modal modal-dialog-centered'
      }).result.then(
        (result) => {
          if (result === 'OK') {
            this.closeResult = `Closed with: ${result}`;
            this.SaveChange();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(`Modal dismissed with reason: ${reason}`);
        }
      );
    }
  }

  SaveAction(subfield: any,index:any): void {
    if(subfield.label.trim() == ''){
      this._NotifierService.showError('do not set the blank value it replaced with old value');
    subfield.label = this.oldsubnamevalu;
    }
    // alert(this.isEditIndex);
    // this.subfield.label= this.subfield.label.trim();
    this.isEditIndex = -1;
    // Implement your action logic here (e.g., edit, delete)
  }

  // ngOnDestroy(): void {
  //   if(this.isanythingEdit){
  //   if (confirm('Are you want to Save Changes ? You have to login Again')) {
  //     this.SaveChange();
  //   }
  // }
  // }



  getRoles() {
      this.bridgeService.GetWorkflow().subscribe(
        (data: any) => {
          this.UserRole = data.data;
        },
        (error: any) => {
          // console.error('Error fetching components', error);
        }
      );
}


SaveChange2(){
  var Payload = {
    "id":this.Disabelfieldid,
    "status":0
}
  this.bridgeService.DisableDynamicFiledManagment(Payload).subscribe(
    (res: any) => {
      this.modalService.dismissAll();
      if (Object(res)['status'] == "200") {
        this.isLoading = false;
        this._NotifierService.showSuccess('Save Changes Successfully !');
        // this.route.navigate(['/login']);
        const email = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
        const password = localStorage.getItem('currentUserPassword') || sessionStorage.getItem('currentUserPassword');

        if (email && password) {
          const loginPayload = { email: email, password: password, FCM: '',"app_id": "2" };
          this.authService.loginWithSession(loginPayload, false).subscribe(
            (userData) => {
              console.log('Login Success:', userData);
            },
            (error) => {
              console.error('Login Error:', error);
            }
          );
        }
        this.getModuleData();
        this.SaveAction(this.oldsubfld,this.isEditIndex);
        this.isanythingEdit = false;
      }
      else {
        this._NotifierService.showError(Object(res)['message']);
        this.isLoading = false;
      }
    },
    (err: { message: any; }) => {
      this.isLoading = false;
      const delim = ':';
      const name = err.message;
      const result = name.split(delim).slice(3).join(delim);
      this._NotifierService.showError(result);
    }
  );
}
  SaveChange(){
    this.isLoading = true;
    this.bridgeService.SaveFiledManagment(this.Module).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this._NotifierService.showSuccess('Save Changes Successfully !');
          // this.route.navigate(['/login']);
          // this.getModuleData();
          // this.SaveAction(this.oldsubfld,this.isEditIndex);
          const email = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
          const password = localStorage.getItem('currentUserPassword') || sessionStorage.getItem('currentUserPassword');

          if (email && password) {
            const loginPayload = { email: email, password: password, FCM: '',"app_id": "2" };
            this.authService.loginWithSession(loginPayload, false).subscribe(
              (userData) => {
                console.log('Login Success:', userData);
              },
              (error) => {
                console.error('Login Error:', error);
              }
            );
          }
          this.isanythingEdit = false;
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
          this.isLoading = false;
        }
      },
      (err: { message: any; }) => {
        this.isLoading = false;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );

  }



  AddUser:any = {
    model_name:'',
    field_data: [
      {
        field_name:'',
        field_type:'CharField',
        verbose_name:'',
        data_option:[],
        data_type:'text',
      }
    ]
  };
  transformString(input: string): string {
    return input.trim().toLowerCase().replace(/\s+/g, '_');
  }
  isEdit:boolean= false;
  // isLoading:boolean= false;
  openmaximize(content: any, isEdit: boolean,item2:any,tab_section:any) {
    this.AddUser.model_name = item2.module_name;
    this.AddUser.field_data[0].field_type = 'CharField';
    this.AddUser.field_data[0].verbose_name = '';
    this.AddUser.field_data[0].field_name = '';
    this.AddUser.field_data[0].data_option = [];
    this.AddUser.field_data[0].data_type = 'text';
    this.addresses = [
      {
      value: '',
    }
  ]

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'figma-cards-modal confirm-modal confirm2-modal modal-dialog-centered', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

  }



  public addresses: any[] = [
    {
    value: '',
  }
];

  removeAddress(i: number) {
    this.addresses.splice(i, 1);
  }

  addAddress() {
    this.addresses.push({
      value: ''});
  }

  AppruvedPosition2(){
    this.isanythingEdit = false;
    this.isLoading = true;
    if(this.AddUser.field_data[0].verbose_name.trim() != ''){
      this.AddUser.field_data[0].field_name = this.transformString(this.AddUser.field_data[0].verbose_name)
      if(this.AddUser.field_data[0].data_type == 'Dropdown'){
        this.AddUser.field_data[0].data_option = [];
        for(let i=0;i<this.addresses.length;i++){
          this.AddUser.field_data[0].data_option.push(this.addresses[i].value);
        }
        this.AddUser.field_data[0].data_option = JSON.stringify(this.AddUser.field_data[0].data_option);
      }
    this.bridgeService.UpdateSingleField(this.AddUser).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.isLoading = false;
          this.getModuleData();
          this._NotifierService.showSuccess("Field Added Successfully");
          this.modalService.dismissAll();
          const email = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
          const password = localStorage.getItem('currentUserPassword') || sessionStorage.getItem('currentUserPassword');

          if (email && password) {
            const loginPayload = { email: email, password: password, FCM: '',"app_id": "2" };
            this.authService.loginWithSession(loginPayload, false).subscribe(
              (userData) => {
                console.log('Login Success:', userData);
              },
              (error) => {
                console.error('Login Error:', error);
              }
            );
          }

        }
        else {
          this.isLoading = false;
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }
  else{
    this.isLoading = false;
    this._NotifierService.showError('Please Enter the Title');
  }
  }



}

