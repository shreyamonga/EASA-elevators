import { Component, OnInit, Input,ElementRef,ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HeadingServicesService } from '../../modules/service/heading-services.service';
import { NgForm } from '@angular/forms';
import { Bridge2, EditBridge2, Follow, AddFollow2, } from 'src/app/bridge2';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { Bridge } from 'src/app/bridge';
import { HttpClient } from '@angular/common/http';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css'],
  providers: [NgbNavConfig]
})
export class SplitComponent implements OnInit {

  @ViewChild('confirmModal44') confirmModal44!: ElementRef;
  @ViewChild('ExcelsheetComponent', { static: false }) ExcelsheetComponent!: ElementRef | any;
  data: [][] | undefined;
  DynamicFiledPositionDetials: any[] = [];
  savedModules: any[] = [];
  UserId = sessionStorage.getItem('UserId');
  UserName: any;
  role: any;
  reportingTo: any;
  searchText!: string;
  searchValue: string = '';
  closeResult = '';

  nodata: boolean = false;
  isLoading: boolean = false;
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
  bridgess: Bridge[] = [];
  bridges2: Bridge2[] | any[] = [];
  bridgesdetails: any[] = [];
  //bridgesdetails: any;

  public tereer: any[] = [];

  bridges: any = {
    date: this.newdate, location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: this.UserId, timestamp: this.newdatetime, employeeId: this.UserId, numOfEmployee: '0', turnover: '', designation: '', status: 'New', leadType: '', Attach: '', Caption: '',
  };
  bridges22: EditBridge2[] = [];
  editbridges: any = {
    date: '', location: '', companyName: '', source: '', contactPerson: '',
    phoneNumber: '', message: '', email: '', productInterest: '',
    assignedTo: '', timestamp: '', employeeId: '', id: '', numOfEmployee: '0', turnover: '', designation: '', status: '', leadType: '', Attach: '', Caption: '',
  };
  Follow: Follow[] = [];

  AddFollow2s: AddFollow2[] = [];
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.newdate, "CreateTime": this.time, "Emp": '', "Emp_Name": "", "From": this.newdate, "SourceID": "82", "SourceType": "", "Time": this.inputElementTime, "Type": "Followup", "leadType": '' };

  leadtype = 'All';

  cate = 'All';
  leadtype2 = 'All';
  status = 'All';
  status2: any = {};
  cate2 = 'All';
  assignedTo = 'All';
  assignto2: any = {};
  source = 'All';
  source2: any = {};
  leadpriority = 'All';
  leadpriority2: any = {};
  leadgenerated = 'All';
  leadgeneratedfrom: any = '';
  leadgeneratedto: any = '';


  defaultleadtype: any;
  defaultleadstatus: any;
  defaultleadcat: any;
  dropdownSettings1 = {};
  dropdownList1: any = [];
  dropdownLead: any[] = [];
  dropdowncategory: any[] = [];
  AssigneddropdownList: any[] = [];
  sourcedropdownList: any[] = [];//for status
  baseUrl2: any;

  source1: any;

  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  lead_id: any;
  selectedDate: any[] = [];
  startind = 1;
  endind = 1;
  totalCount:any;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';

  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  filterLead: any = {};
  fileattachList: any[] = [];
  commonObj: any = { activeUserId: null }
  Weekdate: any;
  monthlydate: any;
  yearlydate: any;
  ModeOfCommunication: any;
  leadStatus: any;
  filterleadstatus = new Array;
  Headingss: any[] = [];
  constructor(private router: Router, public datepipe: DatePipe, private bridgeService2: BridgeService, private http: HttpClient, configtab: NgbNavConfig, private modalService: NgbModal,public HeadingServices: HeadingServicesService,private _NotifierService: NotiferService,) {
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
    this.ModeOfCommunication = this.bridgeService2.ModeOfCommunication;
    this.leadStatus = this.bridgeService2.leadStatus;
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.Headingss = this.HeadingServices.getModule2();
    this.role = sessionStorage.getItem('role');
    // this.tereer = this.bridgess;
    this.reportingTo = sessionStorage.getItem('reportingTo');
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }

    this.getAllSource();
    this.getBridge();
    this.getBridge2();
    this.getDynaimcFld('Lead');

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });



    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel2");
      if ((document.getElementById("mySidepanel") as HTMLInputElement) != null) {
        if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
          (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
          $('#mySidepanel').removeClass('sidepanel2');
          $('#mySidepanel').addClass('mySidepanelGo');
          $('.sidepanel').hide();
        }
      }
    });
    this.getLeadAll();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
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
    $('.sidepanel').hide();
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
      this.getBridge2();
  }
  allLeads() {
    this.getBridge2();
  }
  // filter close


  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  addLeads(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
      }
    }
    if (f.valid) {
      this.isLoading = true;
      this.bridgeService2.addlead(this.bridges).subscribe(
        (res: Bridge2) => {
          if (Object(res)['status'] == "200") {
            // Update the list of cars
            // this.bridges2.push(res)
            // Inform the user
            this.isLoading = false;
            this._NotifierService.showSuccess("Lead Add Successfully !")
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
          // Reset the form
        },
        (err) => {
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg`,backdrop:'static' }).result.then((result) => {
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

  lead_Type: any;
  filterLeadPriority = new Array;
  getLeadAll(): void {
    this.bridgeService2.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;
        for (let i = 0; i < this.lead_Type.length; i++) {
          this.filterLeadPriority.push({ item_text: this.lead_Type[i].Name })
        }
        // console.log(this.source1)
        this.dropdownLead = this.filterLeadPriority

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getAllSource(): void {
    let sourcetmp: any[] = [];
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        for (let i = 0; i < data.length; i++) {
          sourcetmp.push({ item_id: i, item_text: data[i].Name });
        }
        this.sourcedropdownList = sourcetmp;


      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  pagenumber: number = 1;
  leadCount: any;
  nodetaildata:boolean = false;
  firstleaddata=10;
  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  getBridge2(): void {
    this.isLoading = true;
    // console.log(this.filterLead)
    this.bridgeService2.getLeadByPagination(this.pagination,this.searchValue,this.filterLead,this.order_by_field,this.order_by_value,'lead').subscribe(
      (data: any) => {
        if (data.status == "200") {
        this.bridges2 = data.data;
        if(this.commonObj.activeUserId == null){
        this.commonObj.activeUserId = data.data[0].id;
        }
        if (data.data.length == 0) {
          this.nodetaildata = true;
        } else {
          this.bridgesdetails = Array(data.data[0]);
          this.nodetaildata = false;
        }
        this.leaddetailsopen(this.commonObj.activeUserId);
        this.bridgeService2.leadgetlist(this.commonObj.activeUserId).subscribe((data: any) => {
          this.fileattachList = data;
          // console.log(this.fileattachList);
        });
        this.bridgeService2.getFollowLeaddata(this.commonObj.activeUserId).subscribe(
          (data: Follow[]) => {
            this.isLoading = false;
            this.Follow = data;

            if (this.Follow.length <= 0) {
              this.nodata = true;

            } else {
              this.nodata = false;
            }

          },
          (err) => {
            this.isLoading = false;
            console.log(err);
            this.error = err;
          }
        );
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
        this.nodetaildata = true;
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


  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  fileBrowseHandler(event: any) {
    const files = event.target.files;
    this.prepareFilesList(files);
  
    // Reset the input field value to allow re-upload of the same file
    event.target.value = null;
  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }


 prepareFilesList(files: Array<any>) {

   let attachmentUserID = Number(this.UserId);


   // for (const item of files) {
   //   item.progress = 0;
   //   this.files.push(item);
   // }

   this.bridgeService2.leadAttach(this.commonObj.activeUserId, attachmentUserID, this.newdate, this.time, files).subscribe((data: any) => {
     if (Object(data)['status'] == "200") {

       this._NotifierService.showSuccess('Attachment Added Successfully');
       this.ngOnInit();
       // $(".success-box2").show();


     }
     else {
       this._NotifierService.showError(Object(data)['message']);
     }
   });

   // this.uploadFilesSimulator(0);
 }


  onScroll(): void {
    if(this.totalCount > Number(this.pagination.maxItem)){
      this.pagination.maxItem = String(Number(this.pagination.maxItem)+10);
      this.getBridge2();
    }
  }
  openEdit(contentEdit: any, item: any) {
    this.commonObj.bigScreenMode = false;
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg `,backdrop:'static' }).result.then((result) => {
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

  openEdit2(contentEdit: any, item: any) {
this.commonObj.bigScreenMode = false;
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css`,backdrop:'static' }).result.then((result) => {
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

  }

  editLeads(fb: NgForm) {
    fb = this.bridgeService2.GlobaleTrimFunc(fb);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(fb.value)) {
      if (!!!fb.value[keys]) {
        fb.value[keys] = "";
      }
    }
    if (fb.valid) {
      this.isLoading = true;
      this.bridgeService2.editleads(this.editbridges).subscribe(
        (res: EditBridge2) => {
          if (Object(res)['status'] == "200") {

            this.isLoading = false;
            this._NotifierService.showSuccess("Lead Updated Successfully !");
            this.modalService.dismissAll();
            this.getBridge2();
          }
          else {
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
          this.getBridge2();
          this.isLoading = false;
        }
      );
    }
    else {
      for (let i = 0; i < Object.keys(fb.value).length; i++) {
        var keyys = Object.keys(fb.value)[i];
        if (fb.value[keyys].length == 0) {

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

  editdeletepop(item: Bridge2) {
    $('.hover-show' + item.id).toggle()
  }

  addNotes(contentEdit: any) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg`,backdrop:'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


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

  leaddetailsopen(id: number | any) {
    this.isLoading = true;
    this.commonObj.activeUserId = id;
    this.bridgeService2.getOneLeaddata(id).subscribe(
      (data: Bridge2[]) => {
        this.isLoading = false;
        this.bridgesdetails = data;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
    // get attachment list
    this.bridgeService2.leadgetlist(id).subscribe((data: any) => {
      this.fileattachList = data;
      // console.log(this.fileattachList);
    });

    // get attachment list
    this.bridgeService2.getFollowLeaddata(id).subscribe(
      (data: Follow[]) => {
        this.isLoading = false;
        this.Follow = data;

        if (this.Follow.length <= 0) {
          this.nodata = true;

        } else {
          this.nodata = false;
        }

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }





  getBridge(): void {
    let tmp: any[] = [];
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.bridgess = data;
        // console.log(this.bridgess);
        this.tereer = this.bridgess;
        for (let i = 0; i < this.bridgess.length; i++) {
          tmp.push({ item_id: i, item_text: data[i].firstName });
          if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
            this.bridgess.splice(i, 1);
          }
          if (this.bridgess[i]['SalesEmployeeCode'] == '') {
            this.bridgess.splice(i, 1);
          }
        }
        this.AssigneddropdownList = tmp;
        if (this.bridgess.length == 0) {
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

    this.findassaignName = this.bridgess.find((obj: any) => obj.id === name);
    this.selectedName = this.findassaignName.SalesEmployeeName

  }

  AssignTo(contentEdit: any, item: Bridge2) {

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal`,backdrop:'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.lead_id = [item.id];
    this.selectedValue = item.assignedTo.SalesEmployeeCode;
    this.selectedName = item.assignedTo.SalesEmployeeName;
    // console.log(this.lead_id);
    // var mutdelete = new Array();
    // this.lead_id.push(item.id);
    // console.log(this.lead_id);
  }

  // Assign_() {
  //   if (confirm('Are You Sure Do You Want To Assign Lead')) {



  //     this.bridgeService2.leadAssign(this.lead_id, this.selectedValue).subscribe(
  //       (res: any) => {
  //         if (Object(res)['status'] == "200") {

  //           this.ngOnInit();
  //           this.modalService.dismissAll();
  //         }
  //         else {
  //           this._NotifierService.showError(Object(res)['message']);
  //         }
       
  //       },
  //       (err) => {
  //         const delim = ":"
  //         const name = err.message
  //         const result = name.split(delim).slice(3).join(delim)
  //         this._NotifierService.showError(result);
          
  //       }
  //     );

     
  //   }
  // }

  
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

 

  receiveData(data: string) {
    if(data == 'true'){
      this.ngOnInit();
    }
  }
  openfollowup(id:any){
    this.ExcelsheetComponent.openfollowup22(id);
  }
  sortedColumn: string = '';
  sortsend: boolean | undefined;

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
  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.sortedColumn = key + String(this.sortsend);
    // this._NotifierService.showError(this.sortedColumn);
  }

  mouseEnterMessage(item: Bridge2) {
    $('.messageContainer' + item.id).toggle();
    this.LeadFoolwup = this.bridges2.filter((itemid: any) => itemid.id === item.id);
    this.LeadFoolwupdata = this.LeadFoolwup[0].message
    // this.LeadFoolwup=this.bridgess.filter((itemid:any)=>itemid.id===item.id);
    // console.log('------------1--------',this.LeadFoolwup);


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

  hidetextbox(event: any) {
    $('.messageContainer' + event).hide();
  }


  files: any[] = [];

  // fileattachment list

  deleteattachment(id: any) {

    var lead_id = this.commonObj.activeUserId;
    // console.log('id',id);
    // console.log('lead_id',lead_id);

    if (confirm("Are You Sure Do You Want To Delete File")) {
      this.bridgeService2.deleteattach(id, lead_id).subscribe((data: any) => {

        if (Object(data)['status'] == "200") {

          this._NotifierService.showSuccess('Attachment deleted Successfully')
          this.ngOnInit();
        }
        else {
          this._NotifierService.showError(Object(data)['message']);
        }
      });
    }
    else {

    }

  }
  LeadFoolwup: any[] = [];
  LeadFoolwupdata: any;
  mouseLeaveMessage1(item: any) {
    $('.messageContainer1' + item.id).hide();
  }
  mouseEnterMessage1(item: any) {
    $('.messageContainer1' + item.id).show();
    this.LeadFoolwup = this.bridges2.filter((itemid: any) => itemid.id === item.id);
    this.LeadFoolwupdata = this.LeadFoolwup[0].message
  }

  // isModuleViewadd(module_id: number): boolean {
  //   const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
  //   if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
  //     return true;
  //   }
  //   return false;
  // }

  // isModuleViewedit(module_id: number): boolean {
  //   const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
  //   if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
  //     return true;
  //   }
  //   return false;
  // }

//   isModulefieldview(module_id: number, key: string): boolean {
//     const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
//     if (selectedModule) {
//         const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
//         return hasViewPermission;
//     }
//     return false;
// }

// isModulefieldedit(module_id: number, key: string): boolean {
//   // debugger
//   const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
//   if (selectedModule) {
//     // debugger
//       const hasEditPermission = selectedModule.data.some((item: any) => item.key === key && item.edit);
//       //
//  // console.log(key,hasEditPermission)
//       return hasEditPermission;
//   }
//   return false;
// }

getDynaimcFld(name:any){
  this.bridgeService2.GetDynamicFld(name).subscribe(
    (res: any) => {
      if (Object(res)['status'] == "200") {
        this.DynamicFiledPositionDetials = res.data;
        for(let i=0;i<this.DynamicFiledPositionDetials.length;i++){
          this.bridges[this.DynamicFiledPositionDetials[i].field_name] = '';
        }
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

//commonObj : any={exportLoading:false,previousItem:'form'}
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
