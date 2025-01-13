import { Injectable } from '@angular/core';
import { BridgeService } from './bridge.service'; // Existing bridge service
import { Router } from '@angular/router';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
import { Observable } from 'rxjs';
import { HeadingServicesService } from './heading-services.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private bridgeService: BridgeService,
    private _NotifierService: NotiferService,
    private router: Router,
    public HeadingServices: HeadingServicesService,
  ) {}
  
  loginLoder:boolean = false;
  loginWithSession(
    loginPayload: { email: string; password: string, FCM: any,app_id: any },
    rememberMe: boolean
  ): Observable<any> {
    return new Observable((observer) => {
      this.bridgeService.MainSessionloginFunction(loginPayload).subscribe(
        (ressession: any) => {
          if (ressession.status === 200) {
            this.bridgeService.loginFunctionbyToken(false, loginPayload).subscribe(
              (res: any) => {
                if (res.message === "Success" && res.status === 200) {
                  if (res.data[0].Active === "tYES") {
                    const loginLoder = false;
                    const empName = `${res.data[0].firstName} ${res.data[0].lastName}`;
                    const empId = res.data[0].id;
                    const mobile = res.data[0].Mobile;
                    const role = res.data[0].RoleDetails.Name;
                    const reportingTo = res.data[0].reportingTo;
                    const roleid = res.data[0].role;
                    const SalesEmployeeCode = res.data[0].SalesEmployeeCode;
                    const user_id = res.data[0].user_id;
  
                    // Set session storage
                    sessionStorage.setItem('roleid', roleid);
                    sessionStorage.setItem('UserName', empName);
                    sessionStorage.setItem('client_id', res.data[0].client_id);
                    sessionStorage.setItem('ProjectSetting', JSON.stringify(res.data[0].ProjectSetting));
                    sessionStorage.setItem('Currency', res.data[0].ProjectSetting[0].currency_value);
                    sessionStorage.setItem('currencySymbol', res.data[0].ProjectSetting[0].currency_value);
                    sessionStorage.setItem('currencyCode', res.data[0].ProjectSetting[0].currency_type);
                    sessionStorage.setItem('exportStatus', res.data[0].ProjectSetting[0].export_status);
                    sessionStorage.setItem('UserId', empId);
                    sessionStorage.setItem('user_id', user_id);
                    sessionStorage.setItem('SuperAdminModuleAccess', JSON.stringify(ressession.module_data));
                    sessionStorage.setItem('SuperAdminReportAccess', JSON.stringify(ressession.report_data));
                    sessionStorage.setItem('AddDynamicFields', JSON.stringify(ressession.can_add_dynamic_fields));
                    sessionStorage.setItem('Mobile', mobile);
                    sessionStorage.setItem('role', role.toLowerCase());
                    // sessionStorage.setItem('FirstLogin', 'true');
                    sessionStorage.setItem('reportingTo', reportingTo);
                    sessionStorage.setItem('SalesEmployeeCode', SalesEmployeeCode);
  
                    this.bridgeService.getAccessManagementRole(roleid).subscribe(
                      (accessRes: any) => {
                        res.data[0].AccessManagement = accessRes.data;
                        this.bridgeService.logindatapost(res.data[0], ressession.module_data);
                        sessionStorage.setItem('savedModules', JSON.stringify(accessRes.data));
                      },
                      (accessError: any) => {
                        console.error('Error fetching access modules', accessError);
                      }
                    );
  
                    this.bridgeService.getFiledManagment().subscribe(
                      (accessRes: any) => {
                        if (accessRes && accessRes.status === 200) {
                          this.HeadingServices.logindatapost(accessRes.data);
                        } else {
                          this._NotifierService.showError(
                            'Unexpected response status: ' + accessRes.status
                          );
                        }
                      },
                      (accessError: any) => {
                        this._NotifierService.showError(
                          'Error fetching access modules. Please try again later:' + accessError.status
                        );
                      }
                    );
                    
                  } else {
                    this.loginLoder = false;
                    this._NotifierService.showError('Inactive User');
                  }
                } else {
                  this.loginLoder = false;
                  this._NotifierService.showError(res.message);
                }
              },
              (err) => {
                this.loginLoder = false;
                const result = err.message.split(':').slice(3).join(':');
                this._NotifierService.showError(result);
              }
            );
          } else {
            this.loginLoder = false;
            this._NotifierService.showError(ressession.errors);
          }
        },
        (err) => {
          this.loginLoder = false;
          const result = err.message.split(':').slice(3).join(':');
          this._NotifierService.showError(result);
        }
      );
    });
  }
  
}
