import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BridgeService } from '../modules/service/bridge.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { LocalSetting } from '../modules/model/bridge';

@Component({
  selector: 'app-local-setting',
  templateUrl: './local-setting.component.html',
  styleUrls: ['./local-setting.component.scss']
})
export class LocalSettingComponent implements OnInit {
  addSmtp1: LocalSetting = {
    id: "",
    currency_value: sessionStorage.getItem('currencySymbol'),
    currency_type: sessionStorage.getItem('currencyCode'),
    export_status: false,
    custom_field1:"",
    custom_field2:"",
  };
  isLoading: boolean = false;
  allCurrecny: any[] = [];
  MName: any[] = [];
  ProjectSetting: any;
  baseUrl2:any;
  // exportStatus: any=false;

  constructor(private _location: Location, private bridgeService2: BridgeService, private _NotifierService: NotiferService) { }

  ngOnInit(): void {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
    this.addSmtp1.export_status = sessionStorage.getItem('exportStatus') == 'true' ? true : false;
    this.ProjectSetting = sessionStorage.getItem('ProjectSetting');
    this.ProjectSetting = JSON.parse(this.ProjectSetting);
    this.addSmtp1.custom_field1 = this.ProjectSetting[0].custom_field1;
    this.addSmtp1.custom_field2 = this.ProjectSetting[0].custom_field2;
    this.getAllCurrency();
    // this.moduleName();
  }
  backClicked() {
    this._location.back();
  }

  getAllCurrency(): void {
    this.bridgeService2.getCurrencyData().subscribe(
      (data: any[]) => {
        this.allCurrecny = data;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  // moduleName(): void {
  //   this.bridgeService2.getModuleName().subscribe(
  //     (data: any[]) => {
  //       console.log(data)
  //       this.MName = data;

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  fl: any = [];
  onFileChanged(event: any) {
    this.fl = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl.push(event.target.files[i]);
    }
  }
  addOpportunity(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.isLoading = true;
    if (f.valid) {
      this.addSmtp1.id = this.ProjectSetting[0].id;
      var filterVal = this.allCurrecny.filter((option: any) => {
        return option.currency_type == this.addSmtp1.currency_type
      });

    if (this.fl) {
      this.addSmtp1.custom_field1 = this.fl;
    }
    else {
      this.addSmtp1.custom_field1 = '';
    }
      // console.log(filterVal);
      this.addSmtp1.currency_value = filterVal[0]?.currency_value
      this.bridgeService2.SettingUpdate(this.addSmtp1).subscribe(
        (res: any) => {
          this.isLoading = false;
          if (Object(res)['status'] == "200") {
            this.ProjectSetting[0].custom_field1 = res.data.custom_field1;
            this.ProjectSetting[0].custom_field2 = res.data.custom_field2;
            sessionStorage.setItem('currencySymbol', filterVal[0]?.currency_value);
            sessionStorage.setItem('currencyCode', filterVal[0]?.currency_type);
            sessionStorage.setItem('exportStatus', this.addSmtp1.export_status);
            sessionStorage.setItem('ProjectSetting', JSON.stringify(this.ProjectSetting));

            this._NotifierService.showSuccess(' Update Successfully');
            // this.ngOnInit();
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;

          }
        },
        (err: any) => {

          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          alert(result);
        }
      );
    }

  }

}
