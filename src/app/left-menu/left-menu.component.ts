import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { KeyboardService } from '../keyboard.service';

declare var $: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  @ViewChild('leftNavbar') leftNavbar: any;
  private socket!: WebSocket;
  private Paymentsocket!: WebSocket;
  private LicenanceExpire!: WebSocket;
  UserName = sessionStorage.getItem('UserName');
  UserId = sessionStorage.getItem('UserId');
  role = sessionStorage.getItem('role');
  currentURL: string = "";
  SessionId: any;
  hiddingLeftNav: any = { match: ["#/", "", "#/login"] };
  urlcheck: any;
  isLead: boolean = false;
  isSetting: boolean = false;
  isLocation: boolean = false;
  loginData: any;
  Headingss: any[] = [];
  savedModules: any[] = [];
  AccessSuperModules: any[] = [];
  SocektMessage: any[] = [];
  showPaymentAlert: boolean = false;
  LicenceMEssage: boolean = false;
  PaymentMessage:any = '';
  headingline:any = '';
  fl: any = [];
  flAttach:any='';
  isLoading2: boolean = false;
  indus:any = {
    title: "",
    description: "",
    feedbacktype: "",
    Attach: ""
  };
  typeOptions: string[] = ['Frontend', 'Backend', 'Others'];
  constructor(private route: Router, private router: ActivatedRoute,
    private _NotifierService: NotiferService,
    private modalService: NgbModal, private bridgeService2: BridgeService,
    private HeadingServices: HeadingServicesService,
    private _KeyboardService: KeyboardService) {
  }
  ngAfterViewInit() {
    this.leftMenuCaller();
  }
  ngOnInit() {

    this.bridgeService2.getLoginData().subscribe(($loginHit: any) => {
      // debugger
      this.UserName = this.UserName = $loginHit?.userName;
      this.UserId = this.UserId = $loginHit?.id;
      this.role = this.role = $loginHit['RoleDetails']?.Name?.toLowerCase();
      this.savedModules = $loginHit?.AccessManagement;
      this.AccessSuperModules = JSON.parse($loginHit?.module_data);
    })


    this.HeadingServices.getLoginData().subscribe(($loginHit2: any) => {
      // console.log($loginHit2);
      sessionStorage.setItem('Allfields', JSON.stringify($loginHit2));
      this.HeadingServices.getAllFields();
      this.HeadingServices.changeFieldName();
      this.HeadingServices.changeFieldName2();
      this.HeadingServices.changeFieldName3();
      this.HeadingServices.changeFieldName4();
      this.HeadingServices.changeFieldName5();
      this.HeadingServices.changeFieldName6();
      this.HeadingServices.changeFieldName7();
      this.HeadingServices.changeFieldName8();
      this.HeadingServices.changeFieldName21();
    })
    this.currentURL = window.location.href;
    if (this.currentURL.includes('leads')) {
      this.isLead = true;
    }
    else {
      this.isLead = false;
    }
    if (this.currentURL.includes('setting')) {
      this.isSetting = true;
    }
    else {
      this.isSetting = false;
    }
    if (this.currentURL.includes('locationTracking')) {
      this.isLocation = true;
    }
    else {
      this.isLocation = false;
    }
    $(document).ready(function () {
      if ($(".dropdown-container li a").hasClass('active')) {
        $(".Inventory").addClass('active');
        $(".dropdown-container").addClass('active');
        $('.fa-down').addClass("rotate");
      }
    });

    $(document).ready(function () {
      if ($(".dropdown-container3 li a").hasClass('active')) {
        $(".Inventory3").addClass('active');
        $(".dropdown-container3").addClass('active');
        $('.fa-down').addClass("rotate");
      }
    });

    this.Headingss = this.HeadingServices.getReturnLeftMenu();
    // console.log(this.Headingss)
    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

    const AccessModulesString = sessionStorage.getItem('SuperAdminModuleAccess');
    if (AccessModulesString) {
      this.AccessSuperModules = JSON.parse(AccessModulesString);
    }


    // Socekt Connection

    this.socket = this.bridgeService2.getNotificationSocket();
    this.Paymentsocket = this.bridgeService2.getPaymentAlertSocket();

    this.Paymentsocket.addEventListener('message', (event) => {
      // console.log(JSON.parse(event.data).message)
      if(JSON.parse(event.data).message.logined_client_id == sessionStorage.getItem('client_id')){

          this.PaymentMessage = JSON.parse(event.data).message.msg;
          this.headingline = JSON.parse(event.data).message.heading;
          this.showPaymentAlert = true;

      }
    });


    this.LicenanceExpire = this.bridgeService2.getLicenaceExpireSocket();

    this.LicenanceExpire.addEventListener('message', (event) => {
      // console.log(JSON.parse(event.data))
      if(JSON.parse(event.data).message.logined_client_id == sessionStorage.getItem('client_id')){

          this.LicenceMEssage = true;
          setTimeout(()=>{
            this.LicenceMEssage = false;
          this.Logout();
          }, 5000);
      }
    });


    this.socket.addEventListener('open', (event) => {
      // console.log('WebSocket connection opened:', event);
      this.sendMessage('Hello Server!'); // Use socket here
    });

    this.socket.addEventListener('message', (event) => {

      if(JSON.parse(event.data).message.base_url == this.bridgeService2.baseUrl2){
      if(JSON.parse(event.data).message.client_id == sessionStorage.getItem('client_id')){
        if(JSON.parse(event.data).message.manager_id.includes(sessionStorage.getItem('UserId'))){
      this.SocektMessage.push(JSON.parse(event.data).message);
      for(let i=0;i<JSON.parse(event.data).message.user_list.length;i++){
        if(JSON.parse(event.data).message.user_list[i].emp_id == sessionStorage.getItem('UserId')){
      sessionStorage.setItem('unreadCount', JSON.parse(event.data).message.user_list[i].unread_count);
        }
      }
      setTimeout(()=>{
        $(".notification_"+Number(this.SocektMessage.length-1)).addClass('show');
        this.CloseNotifiationaftertime(Number(this.SocektMessage.length-1));
      }, 500);
    }
  }
}
    });

    this.socket.addEventListener('close', (event) => {
      // console.log('WebSocket connection closed:', event);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });

    this.Paymentsocket.addEventListener('close', (event) => {
      // console.log('WebSocket connection closed:', event);
    });

    this.Paymentsocket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
    });
  }


  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  }

  closePaymentALert(status:boolean){
    this.showPaymentAlert = status;
  }

  CloseNotifiation(indexToRemove:any){
    $(".notification_"+indexToRemove).removeClass('show');
    setTimeout(()=>{
    this.SocektMessage.splice(indexToRemove, 1);
  }, 500);
  }


  CloseNotifiationaftertime(indexToRemove:any){
    setTimeout(()=>{
    $(".notification_"+indexToRemove).removeClass('show');
    setTimeout(()=>{
      this.SocektMessage.splice(indexToRemove, 1);
    }, 500);
  }, 5000);
  }


  redirectonpage(item:any,indexToRemove:any){
    this.CloseNotifiation(indexToRemove);
    // console.log(item);
      if(item.module_name == "Lead"){
        this.route.navigate(['leads/table/lead-details/'+item.module_id]);
      }
      if(item.module_name == "Campaign"){
        this.route.navigate(['campaign/details/'+item.module_id]);

      }
      if(item.module_name == "Business Partner"){
        this.route.navigate(['/customer/customer-details/C'+ item.module_id]);
      }
      if(item.module_name == "Opportunity"){
        this.route.navigate(['/opportunity/opportunity-details/'+ item.module_id]);
      }
      if(item.module_name == "Quotation"){
        this.route.navigate(['/quotation/quotation-details/'+ item.module_id]);
      }
      if(item.module_name == "Order"){
        this.route.navigate(['/order/order-details/'+ item.module_id]);
      }
      if(item.module_name == "Delivery"){
        this.route.navigate(['/delivery/delivery-details/'+ item.module_id]);
      }
      if(item.module_name == "Invoice"){
        this.route.navigate(['/invoice/invoice-details/'+ item.module_id]);
      }
      if(item.module_name == "Target Assignment"){
        this.route.navigate(['/target-assisment/target-assisment-details/'+ item.module_id]);
      }
  }
  reloadMenu() {
    // Logic to reload the left menu component
    // console.log('Left menu component reloaded');
    // Add the logic to refresh or reload your menu data
  }


  querysParam(key: any, value: any) {
    this.route.navigate(['/locationTracking'], {
      queryParams: { [this.bridgeService2.encoderData(key)]: this.bridgeService2.encoderData(value) }
    })
    this.isLocation = true;
  }
  MyLocation() {
    this.route.navigate(['/Mylocationlocation/one/', sessionStorage.getItem('UserId')]);
  }
  burgerToggle(leftNavbar: any) {
    if ($('.sidebar').hasClass("active")) {
      $(".sidebar").removeClass("active");
      $('.new-tabl th').removeClass("active");
      $('.sidebar .nav-links li').removeClass("activee");
      $('.fa-down4').show();
      this.leftnavbarPass(false);
    }
    // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
    else {
      $(".sidebar").removeClass("active");
      $('.sidebar').addClass("active");
      $('.new-tabl th').addClass("active");
      $('.sidebar .nav-links li').addClass("activee");
      $('.fa-down4').hide();
      this.leftnavbarPass(true);
    }
  }
  leftnavbarPass(leftNavbar: any) {
    this.bridgeService2.leftNavBar.next(leftNavbar)
  }

  leftMenuCaller() {
    if (this.hiddingLeftNav.match.includes(window.location.hash)) {
      this.leftNavbar.nativeElement.classList.add('d-none');
    }
  }

  falseDropdown() {
    this.isLead = false;
    this.isLocation = false;
    this.isSetting = false;
    $('.Inventory3').removeClass("active");
    $('.dropdown-container3').removeClass("active");
    $('.fa-down').removeClass("rotate");
    $('.Inventory2').removeClass("active");
    $('.dropdown-container2').removeClass("active");
    $('.fa-down2').removeClass("rotate");
    this.CardcodeRemoveFilter();
  }

  sublist() {
    this.isLead = false;
    this.isLocation = false;
    this.isSetting = false;
    $('.Inventory').toggleClass("active");
    $('.dropdown-container').toggleClass("active");
    $('.fa-down').toggleClass("rotate");
    this.CardcodeRemoveFilter();
  }

  CardcodeRemoveFilter() {
    this.bridgeService2.setSalepercode(undefined);
    this.bridgeService2.setBpCardcode(undefined);
    this.bridgeService2.setLeadID(undefined);
    this.bridgeService2.setOpportunityID(undefined);
    this.bridgeService2.SetQuotationId(undefined);
    this.bridgeService2.SetOrderId(undefined);
    this.bridgeService2.SetOrderType(undefined);
    this.bridgeService2.setAllFilter('', undefined);
    this.bridgeService2.resetUserFilter();


    this.isLocation = false;
  }

  sublist2() {
    $('.Inventory2').toggleClass("active");
    $('.dropdown-container2').toggleClass("active");
    // $('.dropdown-container2').toggle(80);
    $('.fa-down2').toggleClass("rotate");

    if ($(".dropdown-container2 li a").hasClass('active')) {
      $(".Inventory2").addClass('active');
      $(".dropdown-container2").addClass('active');
      $('.fa-down').addClass("rotate");
    }
    this.CardcodeRemoveFilter();
  }
  sublist3() {
    $('.Inventory3').toggleClass("active");
    $('.dropdown-container3').toggleClass("active");
    $('.fa-down').toggleClass("rotate");
    this.CardcodeRemoveFilter();
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

  Logout() {
    this.modalService.dismissAll();
    this.bridgeService2.logout();
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

  error = '';
  success = '';


  resetAlerts() {
    this.error = '';
    this.success = '';
  }


  isModuleView(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    const AccessSuperModules = this.AccessSuperModules?.filter((module: any) => module.module_name === selectedModule[0].module_name);
    // console.log(selectedModule[0].module_name)
    // console.log(AccessSuperModules)
    if ((selectedModule && selectedModule.length > 0 && selectedModule[0].is_view) && AccessSuperModules[0].is_accessible == true) {
      return true;
    }
    return false;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css`,backdrop:'static' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }


  addFeedback(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    for(let [keys,value] of Object.entries(f.value)){
      if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    const indus = {
      title: this.indus.title || "",
      description: this.indus.description || "",
      feedbacktype: this.indus.feedbacktype || "",
      customer_id: sessionStorage.getItem('client_id'),
      user_id: sessionStorage.getItem('user_id'),
      Attach: this.fl
    };

    this.isLoading2 = true;
    if (f.valid) {

      this.bridgeService2.insertFeedback(indus).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.isLoading2 = false;
            this._NotifierService.showSuccess('Feedback Form Saved');
            this.reseForm();
            this.modalService.dismissAll();
          }
          else {
        this._NotifierService.showError(Object(res)['message']);
            this.isLoading2 = false;
          }
        },
        (err) => {
          this.isLoading2 = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);

        this._NotifierService.showError(result);

        }
      );
    } else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
            $("password[name=" + keyys + "]").addClass("red-line-border");
            $("password[name=" + keyys + "]").focus();
          }
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("password[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }

  reseForm(){
    this.indus = {
      title: "",
      description: "",
      feedbacktype: "",
      Attach: ""
    };
  }

  getspit(dat:any){
    // var ret = dat.split("\\");
    // return ret[ret.length-1]
    return dat;
  }

  onFileChanged(event: any) {
    this.fl = [];
    if(event.target.files.length > 1){
      this.flAttach = event.target.files.length+ ' Files';
    }
    else{
    this.flAttach = event.target.files[0].name;
    }
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl.push(event.target.files[i]);
    }

    event.target.value = '';
  }
}
