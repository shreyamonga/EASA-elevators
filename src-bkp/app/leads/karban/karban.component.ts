import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'xlsx';
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { CardSettingsModel, DragEventArgs,ActionEventArgs,KanbanComponent  } from '@syncfusion/ej2-angular-kanban';
//import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
enableRipple(true);
import { HeadingServicesService } from '../../modules/service/heading-services.service';
import { NgForm } from '@angular/forms';
import { AddFollow2, Follow, Bridge2, EditBridge2 } from 'src/app/bridge2';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { Bridge } from 'src/app/bridge';
import { HttpClient } from '@angular/common/http';
//import { kanbanData } from 'src/app/data';
import { closest } from '@syncfusion/ej2-base';
import { DatePipe } from '@angular/common';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-karban',
  templateUrl: './karban.component.html',
  styleUrls: ['./karban.component.scss']
})
export class KarbanComponent implements OnInit {


  @ViewChild('KanbanA') kanbanObjA!: KanbanComponent;
  @ViewChild('confirmModal44') confirmModal44!: ElementRef;

  allowDragAndDrop: Boolean = false;



data: [][] | undefined;

DynamicFiledPositionDetials: any[] = [];
  UserId = sessionStorage.getItem('UserId');
  UserName: any;
  role: any;
  reportingTo: any;
  searchValue: string = '';
  closeResult = '';

  nodata: boolean = false;
  error = '';
  success = '';

  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  //  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);

  getValues(obj: {}) {
    return Object.values(obj)
  }
  newdatetime = this.newdate + " " + this.time;
  bridgess: Bridge[] | any[] = [];
  bridgessList: Bridge[] = [];
  bridges2: Bridge2[] = [];
  bridges: any = {
    date: this.newdate, location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: this.UserId, timestamp: this.newdatetime, employeeId: this.UserId, numOfEmployee: '0', turnover: '', designation: '', status: 'New', leadType: '',
    Attach: '', Caption: '',
  };
  bridges22: EditBridge2[] = [];
  editbridges: any = {
    date: '', location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: '', timestamp: '', employeeId: '', id: '', numOfEmployee: '0', turnover: '', designation: '', status: '', leadType: '',Attach:'', Caption:'',
  };
  followup: any[] = [];
  hold: any[] = [];
  New: any[] = [];
  Junk: any[] = [];
  Qualified: any[] = [];
  Follow: Follow[] = [];
  AddFollow2s: AddFollow2[] = [];
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.HeadingServices.getDate(), "CreateTime": this.HeadingServices.getTime(), "Emp": '', "Emp_Name": "", "From": this.newdate, "SourceID": "82", "SourceType": "", "Time": this.inputElementTime, "Type": '', "leadType": '' };

  leadtype = 'All';

  cate = 'All';
  leadtype2 = 'All';
  status= 'All';
  status2: any={};
  cate2 = 'All';
  assignedTo= 'All';
  assignto2: any = {};
  source= 'All';
  source2: any={};
  leadpriority= 'All';
  leadpriority2: any={};

  leadgenerated='All';
  leadgeneratedfrom:any='';
  leadgeneratedto:any='';

  defaultleadtype: any;
  defaultleadstatus: any;
  defaultleadcat: any;
  dropdownSettings1 = {};
  dropdownList1: any = [];
  dropdownLead: any[] = [];
  dropdowncategory: any[] = [];
  AssigneddropdownList: any[] = [];
  sourcedropdownList: any[] = [];//for status


  exedate: any;
  execname: any;
  exeEemail: any;
  exelocation: any;
  exesource: any;
  exeremarks: any;
  exeproductinterest: any;
  exedesignation: any;
  exenoofemp: any;
  exeturnover: any;

  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  public tereer: any[] = [];
  lead_id: any;
  baseUrl2: any;

  Weekdate:any;
  monthlydate:any;
  yearlydate:any;
  selectedData:any[]=[];

  filterLead: any = {};
  searchname: any;
  urlcheck: any;
  isLoading:boolean=false;
  leadStatus:any;

  pagination: any = {
    PageNo: 1,
    maxItem: 'All',
    PageShow:'All',
  }
  startind = 1;
  endind = 1;
  totalCount:any;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  Headingss: any[] = [];
  savedModules: any[] = [];
  constructor(private router: Router,public datepipe: DatePipe, private http: HttpClient, private bridgeService2: BridgeService, configtab: NgbNavConfig, private modalService: NgbModal,public HeadingServices: HeadingServicesService,private _NotifierService: NotiferService) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
    // customize default values of navs used by this component tree
    configtab.destroyOnHide = false;
    configtab.roles = false;
  }

  ngOnInit(): void {
    if (!this.HeadingServices.isModuleView(1)) {
      this.router.navigate(['/dashboard']);
    }
    if(this.bridgeService2.getSalepercode() != undefined){
      if (!Array.isArray(this.filterLead.assignedTo)) {
        this.filterLead.assignedTo = [];
      }
      const codes = String(this.bridgeService2.getSalepercode());
    this.filterLead.assignedTo.push(codes);
    }
    this.leadStatus = this.bridgeService2.leadStatus;
    this.Headingss = this.HeadingServices.getModule2();
    this.UserName = sessionStorage.getItem('UserName');
    // this.UserId = sessionStorage.getItem('UserId');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }




    $('.multipledropdown').hide();
    this.getDynaimcFld('Lead');
    this.getAllSource();
    this.getBridge();
    this.getBridgelist();

    this.dropdowncategory = [
      { item_text: 'Assigned' },
      { item_text: 'UnAssigned' }
    ]

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });


    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel");
      if((document.getElementById("mySidepanel") as HTMLInputElement) != null){
      if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
        $('#mySidepanel').removeClass('sidepanel2');
        $('#mySidepanel').addClass('mySidepanelGo');
      }
    }
    });

    var priviousUrl = this.bridgeService2.getPreviousUrl();

    this.urlcheck = priviousUrl.split('/');
    if (this.urlcheck[1] == 'lead-details') {

      this.searchname = this.bridgeService2.getseach();
      this.searchValue = this.searchname;
      // console.log('Search name',this.searchname);


    }

    this.getLeadAll();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }


  searchEvent(name: any) {
    // console.log("changed", name.target.value);
    this.bridgeService2.pushSearch(name.target.value);
  }


  // kanban view
  public isExpanded: Boolean = false;

  public cardSettings: CardSettingsModel = {
    contentField: 'companyName',
    headerField: 'id'

  }
  onOpen(args:any) {
    // Preventing the modal dialog Open
    args.cancel = true;
  }



  onKanbanBDragStop(args: DragEventArgs) {
    if(args.data.length != 0){
var data:any = args.data[0];
data.assignedTo = data.assignedTo.id;
data.employeeId = data.employeeId.id;
this.isLoading = true;
    this.bridgeService2.editleadstest(data).subscribe(
      (res: any) => {
        if (Object(res)['status'] == '200') {
        // this._NotifierService.showError('Success update');
        this.reload();
      } else {
        this._NotifierService.showError(Object(res)['message']);
        this.isLoading = false;
      }
      },
      (err) => {
        this.modalService.dismissAll();
        const delim = ":"
        this.isLoading = false;
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
        // this.ngOnInit();
      }
    );
  }
  else{
    this._NotifierService.showError('Please drop the data properly');
  }
}

openNav() {
  (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
  (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
  $('#mySidepanel').addClass('sidepanel2');
  $('#mySidepanel').removeClass('mySidepanelGo');
  $('.sidepanel').show();

}

/* Set the width of the sidebar to 0 (hide it) */
closeNav() {
  (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
  $('#mySidepanel').removeClass('sidepanel2');
  $('#mySidepanel').addClass('mySidepanelGo');
}

resetfilter() {
  this.filterLead = {}
  this.RowPerPage();

}
RowPerPage() {
  this.pagination.PageNo = 1;
  this.reload();
}
reload() {
    this.getBridge();
}

emptySeach(){
  this.searchValue = '';
  this.RowPerPage();
}
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addLeads(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for(let [keys,value] of Object.entries(f.value)){
      if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }
    if (f.valid) {
      this.isLoading = true;
      this.bridgeService2.addlead(this.bridges).subscribe(
        (res: Bridge2) => {
          if (Object(res)['message'] == "successful") {
            // Update the list of cars
            // this.bridges2.push(res)
            // Inform the user
            this.isLoading = false;
            this.modalService.dismissAll();
            this._NotifierService.showSuccess("Lead Updated Successfully !");
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
          // Reset the form
        },
        (err) => {
          this.isLoading = false;
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          //  this.ngOnInit();
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


  open(content: any) {
    this.commonObj.bigScreenMode = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg `,backdrop:'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.commonObj.bigScreenMode = false;
    });
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

  getDynaimcFld(name:any){
    this.bridgeService2.GetDynamicFld(name).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.DynamicFiledPositionDetials = res.data;
          for(let i=0;i<this.DynamicFiledPositionDetials.length;i++){
            this.bridges[this.DynamicFiledPositionDetials[i].field_name] = '';
          }
          // this.openEdit();
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }


  source1: any;
  getAllSource(): void {
    let sourcetmp: any[] = [];
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        for (let i = 0; i < data.length; i++) {
          sourcetmp.push({ item_id: i, item_text: data[i].Name });
        }
        this.sourcedropdownList = sourcetmp;
        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  lead_Type:any;
  filterLeadPriority=new Array;
  getLeadAll(): void {
    this.bridgeService2.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;
        for(let i=0; i<this.lead_Type.length; i++){
          this.filterLeadPriority.push({item_text: this.lead_Type[i].Name})
        }
        // console.log(this.source1)
        this.dropdownLead=this.filterLeadPriority
        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }


  getBridgelist(): void {
    let tmp: any[] = [];
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgessList = data;
        // console.log(this.bridgessList);
        this.tereer = this.bridgessList;
        // console.log(this.tereer);
        for (let i = 0; i < data.length; i++) {
          tmp.push({ item_id: i, item_text: data[i].firstName });

          if (this.bridgessList[i]['SalesEmployeeCode'] == '-1') {
            this.bridgessList.splice(i, 1);
          }
          if (this.bridgessList[i]['SalesEmployeeCode'] == '') {
            this.bridgessList.splice(i, 1);
          }
        }
        this.AssigneddropdownList = tmp;

        if (this.bridgessList.length == 0) {
          this.nodata = true;
        }
        else {
          this.nodata = false;
        }
        // console.log(this.bridgess);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  nodetaildata:boolean = false;
  getBridge(): void {
    this.isLoading = true;
    // console.log(this.filterLead)
    this.bridgeService2.getLeadByPagination(this.pagination,this.searchValue,this.filterLead,this.order_by_field,this.order_by_value,'lead').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.bridgess = data.data;
        this.selectedData = data.data;
        // console.log(this.bridgess);
        if (data.data.length == 0) {
          this.nodetaildata = true;
        } else {
          this.nodetaildata = false;
        }

        this.followup = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Follow Up");
        this.hold = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Hold");
        this.New = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "New");
        // this.Junk = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Junk");
        this.Qualified = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Qualified");


        this.totalCount = data.meta.count;
        this.isLoading = false;
        if(this.pagination.maxItem != 'All'){
        this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
        this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
        if (this.endind > this.totalCount) {
          this.endind = this.totalCount;
        }
        this.pagination.PageShow = Number(this.pagination.maxItem);
      }
      else{
        this.startind = 1;
        this.endind = this.totalCount;
        this.pagination.PageShow = Number(this.totalCount);
      }
      if(this.totalCount == 0){
        this.startind = this.totalCount;
      }
    }

    else {
      this._NotifierService.showError(data.message);
      this.totalCount = 0;
      this.isLoading = false;
    }
  },
      (err) => {
        this.isLoading = false;
        this.totalCount = 0;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );

  }


  //  edit lead section open

  openEdit(contentEdit: any, item: any) {
    this.commonObj.bigScreenMode = false;
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg`,backdrop:'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.commonObj.bigScreenMode = false;
    });

    this.editbridges.id = String(item.id);
    this.editbridges.date = item.date;
    this.editbridges.companyName = item.companyName;
    this.editbridges.source = item.source;
    //console.log(this.editbridges.source);
    this.editbridges.email = item.email;
    this.editbridges.location = item.location;
    this.editbridges.contactPerson = item.contactPerson;
    this.editbridges.phoneNumber = item.phoneNumber;
    this.editbridges.message = item.message;
    this.editbridges.productInterest = item.productInterest;
    this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
    this.editbridges.employeeId = item.employeeId.id;
    this.editbridges.timestamp = item.timestamp;
    this.editbridges.status = item.status;
    this.editbridges.leadType = item.leadType;
    this.editbridges.designation = item.designation;
    this.editbridges.turnover = item.turnover;
    this.editbridges.numOfEmployee = item.numOfEmployee;
    // console.log(this.editbridges.employeeId);
    for(let i=0;i<this.DynamicFiledPositionDetials.length;i++){
      if(item[this.DynamicFiledPositionDetials[i].field_name] == null){
        item[this.DynamicFiledPositionDetials[i].field_name] = '';
      }
      this.editbridges[this.DynamicFiledPositionDetials[i].field_name] = item[this.DynamicFiledPositionDetials[i].field_name];
    }

  }

  editLeads(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for(let [keys,value] of Object.entries(fb.value)){
      if(!!!fb.value[keys]){
        fb.value[keys] = "";
      }
    }
    if (fb.valid) {
      this.isLoading = true;
      this.bridgeService2.editleads(this.editbridges).subscribe(
        (res: EditBridge2) => {
          if (Object(res)['status'] == "200") {
            this.isLoading = false;
            this.modalService.dismissAll();
            this._NotifierService.showSuccess("Lead Updated Successfully !");
          }
          else{
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }


        },
        (err) => {
          this.modalService.dismissAll();
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          this.ngOnInit();
        }
      );
    }
    else{
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

          if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
            $("input[name=" + keyys + "]").addClass("red-line-border");
            $("input[name=" + keyys + "]").focus();
          }
          else if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
            $("select[name=" + keyys + "]").addClass("red-line-border");
            $("select[name=" + keyys + "]").focus();
          }
          else if ($("ng-select[name=" + keyys + "]").hasClass('required-fld')) {
            $("ng-select[name=" + keyys + "]").addClass("red-line-border");
            $("ng-select[name=" + keyys + "]").focus();
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

  editdeletepop(item: Bridge2) {
    $('.hover-show' + item.id).toggle()
  }



  JunkId: any;
  confirmModal(confirmModal2: any, JunkId: any) {
    this.JunkId = JunkId;
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


  multipleDelete1(count: any) {
    this.bridgeService2.junkleads(count, 1).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        // this.isLoading3 = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }

  // delete lead close

  filterDropdown(e: any) {

    let searchString = e.target.value;
    this.tereer = this.bridgess;
    this.tereer = this.bridgess.filter(
      (user: any) => {
        return user.SalesEmployeeName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())

      }
    );
  }

  selectValue(name: any) {
    this.selectedValue = name;
    // console.log(this.selectedValue);

    this.findassaignName = this.bridgessList.find((obj: any) => obj.id === name);
    this.selectedName = this.findassaignName.SalesEmployeeName

  }

  AssignTo(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal`,backdrop:'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.lead_id = [item.id];
    this.selectedValue=item.assignedTo.SalesEmployeeCode;
    this.selectedName = item.assignedTo.SalesEmployeeName;
    // console.log(this.lead_id);
    // var mutdelete = new Array();
    // this.lead_id.push(item.id);
    // console.log(this.lead_id);
  }

  closeResultAssign = '';

  Assign_(confirmModalAssign: any) {
    debugger
    this.modalService
      .open(confirmModalAssign, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
      .result.then(
        (result) => {
          if (result === 'OK') {
            this.bridgeService2.leadAssign(this.lead_id, this.searchAssignValue).subscribe(
              (res: any) => {
                if (Object(res)['status'] == "200") {
                  this.modalService.dismissAll();
                  this.searchAssignValue = null;
                  this.reload();
                } else {
                  this._NotifierService.showError(Object(res)['message']);
                }
              },
              (err) => {
                const delim = ':';
                const name = err.message;
                const result = name.split(delim).slice(3).join(delim);
                this._NotifierService.showError(result);
              }
            );
          }
        },
        (reason) => {
          this.closeResultAssign = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  
   
  LeadFoolwup:any[]=[];
  LeadFoolwupdata:any;
  mouseEnter() {
    $('.tableview').show();
    $('.shortview').hide();
  }
  mouseLeave() {
    $('.tableview').hide();

  }
  multipledropdownhide() {
    $('.tableview').hide();
    $('.shortview').hide();
  }
  mouseEntershortby() {
    $('.shortview').show();
    $('.tableview').hide();
  }
  mouseLeavetable() {
    $('.tableview').hide();
  }
  mouseLeaveshort() {
    $('.shortview').hide();
  }
  mouseLeaveMessage1(item:any){
    $('.messageContainer1'+item.id).hide();
  }
  mouseEnterMessage1(item:any){
    $('.messageContainer1'+item.id).show();
     this.LeadFoolwup=this.selectedData.filter((itemid:any)=>itemid.id===item.id);
     this.LeadFoolwupdata=this.LeadFoolwup[0].message
// console.log('-------------',this.LeadFoolwupdata);

  }
  mouseEnterMessage(item:Bridge2){
$('.messageContainer'+item.id).toggle();


this.editbridges.id = String(item.id);
this.editbridges.date = item.date;
this.editbridges.companyName = item.companyName;
this.editbridges.source = item.source;
//console.log(this.editbridges.source);
this.editbridges.email = item.email;
this.editbridges.location = item.location;
this.editbridges.contactPerson = item.contactPerson;
this.editbridges.phoneNumber = item.phoneNumber;
// this.editbridges.message = item.message;
this.editbridges.message = '';
this.editbridges.productInterest = item.productInterest;
this.editbridges.assignedTo = Object.values(item.assignedTo)[0];
this.editbridges.employeeId = item.employeeId.id;
this.editbridges.timestamp = item.timestamp;
this.editbridges.status = item.status;
this.editbridges.leadType = item.leadType;
this.editbridges.designation = item.designation;
this.editbridges.turnover = item.turnover;
this.editbridges.numOfEmployee = item.numOfEmployee;
// console.log('------2-------',this.editbridges);


  }
  hidetextbox(event:any){
   $('.messageContainer'+event).hide();
  }



// filter start

allLeads(){
  this.getBridge();
}




onFileChange(evt: any) {

  const target: DataTransfer = <DataTransfer>(evt.target);
  // console.log("target", target)

  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];



    this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    // console.log("this.data", this.data)

    this.confirmModal(this.confirmModal44,'')

  };

  // this.isLoading = false;
  reader.readAsBinaryString(target.files[0]);
}


CallImport(data:any){
  var x: number[][] = data.slice(1);
  var excelupload = new Array();
  // console.log("excelupload", excelupload)
  let leng = x.length;
  for (let i = 0; i < leng; i++) {

    let y = x[i];
    let assto = '';
    if (y[0] == undefined) {
      // console.log("ifpart")
      this.exedate = ' ';
    }
    else {
      // console.log("elsepart")
      this.exedate = new Date((y[0] - (25567 + 2)) * 86400 * 1000);


      let m2 = this.exedate.getMonth() + 1;
      let month = (m2 < 10 ? '0' : '') + m2;
      let day = (this.exedate.getDate() < 10 ? '0' : '') + this.exedate.getDate();

      let year2 = this.exedate.getUTCFullYear();
      let newdate2 = year2 + "-" + month + "-" + day;
      if (newdate2 == "NaN-NaN-NaN") {
        this.exedate = y[0];
      }
      else {
        this.exedate = newdate2;
      }
      // console.log("newdate2",newdate2)
      y[0] = this.exedate;
    }


    if (y[2] == undefined) {
      this.execname = '';
    }
    else {
      this.execname = y[2];
    }

    // if (y[3] == undefined) {
    //   this.exesource = '';
    // }
    // else {
    //   this.exesource = y[3];
    // }

    if (y[5] == undefined) {
      this.exeremarks = '';
    }
    else {
      this.exeremarks = y[5];
    }

    if (y[7] == undefined) {
      this.exeproductinterest = '';
    }
    else {
      this.exeproductinterest = y[7];
    }

    if (y[8] == undefined) {
      this.exedesignation = '';
    }
    else {
      this.exedesignation = y[8];
    }
    if (y[9] == undefined) {
      this.exenoofemp = 0;
    }
    else {
      this.exenoofemp = y[9];
    }

    if (y[10] == undefined) {
      this.exeturnover = '';
    }
    else {
      this.exeturnover = y[10];
    }
    if (y[1] == undefined) {
      this.exelocation = '';
    }
    else {
      this.exelocation = y[1];
    }

    if (y[6] == undefined) {
      this.exeEemail = '';
    }
    else {
      this.exeEemail = y[6];
    }
    if (y[4] != undefined) {
      var empArray = {
        "date": this.exedate,
        "location": this.exelocation,
        "companyName": this.execname,
        "source": 'Others',
        "contactPerson": y[3],
        "phoneNumber": y[4],
        "message": this.exeremarks,
        "email": this.exeEemail,
        "productInterest": this.exeproductinterest,
        "assignedTo": this.UserId,
        "employeeId": this.UserId,
        "timestamp": this.HeadingServices.getDateTime(),
        "designation": this.exedesignation,
        "numOfEmployee": this.exenoofemp,
        "turnover": this.exeturnover,
        "status": 'New',
        "leadType": '',
        "Attach": '',
        "Caption": ''

      };
      excelupload.push(empArray);
    }
  }
  // console.log("exceluploadfinal", excelupload)
  // this.isLoading = true;
  this.bridgeService2.adduploadlead(excelupload).subscribe(
    (res: any) => {
      // console.log("rslt", data);
      if (Object(res)['message'] == "successful") {
        this._NotifierService.showSuccess('Data Imported Successfully');

        this.modalService.dismissAll();
        setTimeout(() => {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }, 1000);
      }
      else {
        //  this.isLoading = false;
        this._NotifierService.showError(Object(res)['message']);
      }
    });


}

commonObj : any={exportLoading:false,previousItem:'form'}
bigScreenOrMid() {
  if ((document.querySelector('.figma-cards-modal') as any).classList.contains('figma-cards-modal-lg')) {
    this.commonObj.bigScreenMode = true;
    (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-full');
    (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-lg');
  } else {
    this.commonObj.bigScreenMode = false;
    (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-lg');
    (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-full');
  }


}
}
