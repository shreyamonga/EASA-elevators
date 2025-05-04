import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BridgeService } from '../modules/service/bridge.service';
import { CampaignSet, Compaign, EditCompaign } from '../campaign';
import { Category } from '../warehouse';
import { Country, Industory, States } from '../customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;


@Component({
  selector: 'app-edit-compaignset',
  templateUrl: './edit-compaignset.component.html',
  styleUrls: ['./edit-compaignset.component.css']
})
export class EditCompaignsetComponent implements OnInit {
  DynamicFiledPositionDetials: any[] = [];
  categorys: Category[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  industorys: Industory[] = [];
  // isLoading: boolean;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;
  isLoading: boolean = false;
  isdataLoading:boolean=false;
  compaign: CampaignSet[] = [];
  UserName: any;
  cstmrtype: any;
  optyp: any;
  compaigns: any = {

    CampaignSetName: "",
    CampaignAccess: "",
    Description: "",
    LeadSource: "",
    LeadPriority: "",
    LeadStatus: "",
    LeadFromDate: "",
    LeadToDate: "",
    OppType: "",
    OppSalePerson: "",
    OppStage: "",
    OppFromDate: "",
    OppToDate: "",
    BPType: "",
    BPSalePerson: "",
    BPCountry: "India",
    BPCountryCode: "IN",
    BPState: "",
    BPStateCode: "",
    BPIndustry: "",
    BPFromDate: "",
    BPToDate: "",
    MemberList: "",
    Status: "",
    CreateDate: this.newdate,
    CreateTime: "",
    CampaignSetOwner: "",
    CreateBy: "",
    AllLead: "",
    AllOpp: "",
    AllBP: "",
    id: "",
    LeadTypeOfLift:"",
	  OppTypeOfLift:"",
  };

  Countrys: string = 'IN, India';
  Statess: string = ''


  category: Category = {
    CategoryName: '',
    Status: '1',
    CreatedDate: this.newdate,
    CreatedTime: this.time,
    UpdatedDate: this.newdate,
    UpdatedTime: this.time,
  };
  empall: any;
  success: any;
  error: any;

  selectedDay: any;
  code: any[] = [];
  selectedDayState: any;
  codeState: any[] = [];
  source: any;
  dropdownList: any = [];
  dropdownList1: any = [];
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  input_fld: any = 'input-fld3';
  selectleadsource: any ;
  selectleadstatus: any ;
  selectOppEmployeee: any ;
  selectBPEmployeee: any ;
  selectIndustory: any ;
  selectedItems: any = [];
  dropdownListemp: any = [];//for empl
  dropdownListind: any = [];//for ind
  deselectCheck: boolean = false;
  deselectCheck1: boolean = false;
  deselectCheck2: boolean = false;

  CampaignOpportunityType:any;
  CampaignAccess:any;
  userStatus:any;
  leadStatus:any;
  filterleadstatus=new Array;
  savedModules: any[] = [];
  Headingss: any[] = [];
  // Country: any = 'IN, India';
  constructor(private _location: Location,private bridgeService2: BridgeService,
     private route: Router,public HeadingServices: HeadingServicesService, private router: ActivatedRoute, private bridgeService: BridgeService, private modalService: NgbModal,private _NotifierService: NotiferService,

    private http: HttpClient,
  ) { }

  ngOnInit(): void {

    if (!this.HeadingServices.isModuleView(2) || !this.HeadingServices.isModuleViewedit(2)) {
      this.route.navigate(['/dashboard']);
    }

    this.bridgeService.autoCall();
    this.CampaignOpportunityType=this.bridgeService.CampaignOpportunityType;
    this.CampaignAccess=this.bridgeService.CampaignAccess;
    this.userStatus=this.bridgeService.userStatus;
    this.leadStatus=this.bridgeService.leadStatus;
    this.Headingss = this.HeadingServices.getModule21();
    this.getempall();
    this.getCountry();
    this.code[0] = 'IN'
    this.getState('IN');
    this.getIndustory();
    this.getAllSource();
    // this.editCompaignSet();
    this.getLeadAll();
    this.getOpportunityList();
    this.getCustomerTypeList()
    this.getDynaimcFld('Campaign');
    this.compaigns.CreateBy = String(sessionStorage.getItem('SalesEmployeeCode'));
    this.compaigns.CampaignSetOwner = String(sessionStorage.getItem('SalesEmployeeCode'));
    // this.getDivisionList();
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);

    }
    // this.dropdownList = [
    //   { item_text: 'Sunday' },
    //   { item_text: 'Monday' },
    //   { item_text: 'Tuesday' },
    //   { item_text: 'Wednesday' },
    //   { item_text: 'Thursday' },
    //   { item_text: 'Friday' },
    //   { item_text: 'Satturday' },

    // ];

    for(let i=0; i<this.leadStatus.length; i++){
      this.filterleadstatus.push({ item_text: this.leadStatus[i] })
          }
          this.dropdownList1 = this.filterleadstatus


    // this.dropdownList1 = [
    //   { item_text: 'Follow Up' },
    //   { item_text: 'Demo' },
    //   { item_text: 'Proposal' },
    //   { item_text: 'Shared' },
    //   { item_text: 'Negotiation' },
    //   { item_text: 'Hold' },
    //   { item_text: 'Dead' },

    // ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_text',
      // idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,

      allowSearchFilter: true,
      enableCheckAll: true,



      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }

    this.dropdownSettings2 = {
      singleSelection: false,
      // idField: 'item_text',
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,

      allowSearchFilter: true
    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  };



  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {
    // console.log(items)
  }



  public onDeSelectAll(items: any) {
   // console.log(items);
  }

  onDeSelect(items: any) {
   // console.log("ff", items)

  }
  //for status
  onItemSelect1(item: any) {

  }
  onSelectAll1(items: any) {
   // console.log(items)
  }
  public onDeSelectAll1(items: any) {
   // console.log(items);
  }

  onDeSelect1(items: any) {
   // console.log("ff", items)

  }
  //for Employee

  onItemSelect2(item: any) {

  }
  onSelectAll2(items: any) {
   // console.log(items)
  }
  public onDeSelectAll2(items: any) {
   // console.log(items);
  }

  onDeSelect2(items: any) {
   // console.log("ff", items)

  }


  getDynaimcFld(name:any){
    this.bridgeService.GetDynamicFld(name).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.DynamicFiledPositionDetials = res.data;
          for(let i=0;i<this.DynamicFiledPositionDetials.length;i++){
            this.compaigns[this.DynamicFiledPositionDetials[i].field_name] = '';
          }

          this.editCompaignSet();
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

  idd: any;

  editCompaignSet() {
    this.idd = this.router.snapshot.params.id;
   // console.log("it", this.idd)
    this.isdataLoading=true;
    this.bridgeService.getEditCampaignSetdata(this.idd).subscribe(
      (data: any[]) => {
        this.compaign = data;
        this.isdataLoading=false;
        // console.log("asdad", data)
        // this.bridgeService.PostOnemember(data[0].MemberList);
        this.compaigns.id = this.idd;
        // this.Statess = data[0]['BPStateCode'] + ", " + data[0]['BPState'];
        this.compaign = Object(this.compaign[0]);
        this.compaigns.CampaignSetName = data[0]['CampaignSetName'];
        this.compaigns.CampaignAccess = data[0]['CampaignAccess'];
        this.compaigns.Description = data[0]['Description'];
        this.compaigns.LeadSource = data[0]['LeadSource'];
        this.compaigns.LeadPriority = data[0]['LeadPriority'];
        this.compaigns.LeadFromDate = data[0]['LeadFromDate'];
        this.compaigns.LeadToDate = data[0]['LeadToDate'];
        this.compaigns.LeadStatus = data[0]['LeadStatus'];
        this.compaigns.OppFromDate = data[0]['OppFromDate'];
        this.compaigns.OppToDate = data[0]['OppToDate'];
        this.compaigns.OppType = data[0]['OppType'];
        this.compaigns.Status = data[0]['Status'];
        if (data[0]['OppSalePerson'].length != 0) {
          this.compaigns.OppSalePerson = data[0]['OppSalePerson'];
        }

        this.compaigns.BPType = data[0]['BPType'];
        this.compaigns.LeadTypeOfLift = data[0]['LeadTypeOfLift']
        this.compaigns.OppTypeOfLift = data[0]['OppTypeOfLift']
        if (data[0]['BPSalePerson'].length != 0) {
          this.compaigns.BPSalePerson = data[0]['BPSalePerson'];
        }
        // console.log("emp4",data[0]['BPSalePerson'])
        this.compaigns.BPFromDate = data[0]['BPFromDate'];
        this.compaigns.BPToDate = data[0]['BPToDate'];
        if (data[0]['BPIndustry'].length != 0) {
          this.compaigns.BPIndustry = data[0]['BPIndustry'];
        }
        this.compaigns.BPCountry = data[0]['BPCountry'];
        this.compaigns.BPCountryCode = data[0]['BPCountryCode'];
        this.bridgeService.getStatedata(this.compaigns.BPCountryCode).subscribe(
          (datastate: States[]) => {
            this.statess = datastate;
            this.compaigns.BPState = data[0]['BPState'];
            this.compaigns.BPStateCode = data[0]['BPStateCode'];

          }
        );

        this.compaigns.AllLead = data[0]['AllLead'];
        this.compaigns.AllOpp = data[0]['AllOpp'];
        this.compaigns.AllBP = data[0]['AllBP'];

        var templeaad = this.compaigns.LeadSource.split(",")
        if (this.compaigns.LeadSource != '') {
          this.selectleadsource = this.compaigns.LeadSource.split(',');
        }
        else {
          this.compaigns.LeadSource = '';
        }
        //for status

        var tempStatus = this.compaigns.LeadStatus.split(",")
        if (this.compaigns.LeadStatus != '') {
          this.selectleadstatus = this.compaigns.LeadStatus.split(',');
        }
        else {
          this.compaigns.LeadStatus = '';
        }

        //For Employee
        var employeeitem1: any = [];
        for (let i = 0; i < this.compaigns.OppSalePerson.length; i++) {
          employeeitem1.push(this.compaigns.OppSalePerson[i].SalesEmployeeCode)

        }
        this.selectOppEmployeee = employeeitem1;

        //for BpEmployee

        // console.log("cc1", this.compaigns.BPSalePerson)
        var employeeitem2: any = [];
        for (let i = 0; i < this.compaigns.BPSalePerson.length; i++) {
          employeeitem2.push(this.compaigns.BPSalePerson[i].SalesEmployeeCode);
        }
        this.selectBPEmployeee = employeeitem2;

        //for Industory

        var employeeitem3: any = [];
        for (let i = 0; i < this.compaigns.BPIndustry.length; i++) {
          employeeitem3.push(this.compaigns.BPIndustry[i].IndustryCode);
        }
        this.selectIndustory = employeeitem3;


        for(let i=0;i<this.DynamicFiledPositionDetials.length;i++){
          this.compaigns[this.DynamicFiledPositionDetials[i].field_name] = data[0][this.DynamicFiledPositionDetials[i].field_name];
        }


        if (this.compaigns.AllLead == "1") {
          (document.getElementById("flexCheckDefaultAlllead")as HTMLInputElement).checked = true;
          $('.Alllead').attr("disabled", true);
          $('.Alllead').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
          "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
          "border-radius": "9px" });
          this.deselectCheck = true;

        }
        else {
          $('.Alllead').attr("disabled", false);
          $('.Alllead').css({ "background": "#fff", "color": "#000","z-index":"000" });
          (document.getElementById("flexCheckDefaultAlllead")as HTMLInputElement).checked = false;
          this.deselectCheck = false;
        }
        if (this.compaigns.AllOpp == "1") {
          $('.AllOppcl').attr("disabled", true);
          $('.AllOppcl').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
          "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
          "border-radius": "9px" });
          (document.getElementById("flexCheckDefault1")as HTMLInputElement).checked = true;
          this.deselectCheck1 = true;
          // this.setAttribute(".chk", "checked");

        }
        else {
          $('.AllOppcl').attr("disabled", false);
          $('.AllOppcl').css({ "background": "#fff", "color": "#000", "z-index":"000" });
          (document.getElementById("flexCheckDefault1")as HTMLInputElement).checked = false;
          this.deselectCheck1 = false;
        }
        if (this.compaigns.AllBP == "1") {
          (document.getElementById("flexCheckDefaultAllBP")as HTMLInputElement).checked = true;

          $('.AllBP').attr("disabled", true);
          $('.AllBP').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
          "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
          "border-radius": "9px" });
          this.deselectCheck2 = true;
        }
        else {
          $('.AllBP').attr("disabled", false);
          $('.AllBP').css({ "background": "#fff", "color": "#000", "z-index":"000" });
          (document.getElementById("flexCheckDefaultAllBP")as HTMLInputElement).checked = false;
          this.deselectCheck2 = false;
        }

        // this.compaigns.id = this.idd;
        // console.log("asd", this.compaigns.id)
      });
  }

  backClicked() {
    this._location.back();
  }
  resetAlerts() {
    this.error = '';
    this.success = '';
  }



  fireLead(event: any) {
    let isCheck = event.target.checked;
   // console.log(isCheck)
    if (isCheck) {

      $('.Alllead').attr("disabled", true);
      this.compaigns.AllLead = '1';
      $('.Alllead').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
      "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
      "border-radius": "9px" });
      this.deselectCheck = true;
    }
    else {
      $('.Alllead').attr("disabled", false);
      $('.Alllead').css({ "background": "#fff", "color": "#000" ,"z-index":"000" });
      this.compaigns.AllLead = '0';
      this.deselectCheck = false;

    }


  }


  fireAllOP(event: any) {
    var isOPcheck = event.target.checked
    if (isOPcheck) {

      $('.AllOppcl').attr("disabled", true);
      this.compaigns.AllOpp = '1';
      $('.AllOppcl').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
      "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
      "border-radius": "9px" });
      this.deselectCheck1 = true;
    }
    else {
      $('.AllOppcl').attr("disabled", false);
      $('.AllOppcl').css({ "background": "#fff", "color": "#000", "z-index":"000" });
      this.compaigns.AllOpp = '0';
      this.deselectCheck1 = false;

    }

  }
  fireBP(event: any) {
    var isBPCheck = event.target.checked
    if (isBPCheck) {
      $('.AllBP').attr("disabled", true);
      this.compaigns.AllBP = '1';
      $('.AllBP').css({ "background": "#ced5e6", "color": "#fff", "position": "absolute",
      "left": "0", "right": "0", "top": "3px", "bottom": "2px", "z-index": "55", "opacity": "0.4",
      "border-radius": "9px" });
      this.deselectCheck2 = true;

    }
    else {
      $('.AllBP').attr("disabled", false);
      $('.AllBP').css({ "background": "#fff", "color": "#000", "z-index":"000" });
      this.compaigns.AllBP = '0';
      this.deselectCheck2 = false;

    }
  }
  multiselct2: any[] = [];
  multiselct3: any[] = [];
  OpportunityEmployee: any = [];
  BPEmployee: any = [];
  IndustorySelect: any = [];

  addCampaignSet(f: NgForm) {
    // console.log(this.selectOppEmployeee);
    f = this.bridgeService.GlobaleTrimFunc(f);
    for(let [keys,value] of Object.entries(f.value)){
     if(!!!f.value[keys]){
        f.value[keys] = "";
      }
    }

    // console.log(this.selectleadsource);
    // return 1
    if (this.selectleadsource == undefined || this.selectleadsource.length == 0) {
      this.compaigns.LeadSource = "";
    }
    else {
      this.compaigns.LeadSource = this.selectleadsource.join(",");
    }

    //status
    if (this.selectleadstatus == undefined || this.selectleadstatus.length == 0) {
      this.compaigns.LeadStatus = ""
    }
    else {
      this.compaigns.LeadStatus = this.selectleadstatus.join(",");
    }


    //for Employee
    if (this.selectOppEmployeee == undefined || this.selectOppEmployeee.length == 0) {
      this.compaigns.OppSalePerson = ""
    }
    else {
      this.compaigns.OppSalePerson = this.selectOppEmployeee.join(",");
    }


    //for Bp Employee
    if (this.selectBPEmployeee == undefined || this.selectBPEmployeee.length == 0) {
      this.compaigns.BPSalePerson = ""
    }
    else {
      this.compaigns.BPSalePerson = this.selectBPEmployeee.join(",");
    }

    //for industory
    if (this.selectIndustory == undefined || this.selectIndustory.length == 0) {
      this.compaigns.BPIndustry = ""
    }
    else {
      this.compaigns.BPIndustry = this.selectIndustory.join(",");
    }




    this.resetAlerts();
    // this.compaigns.id =  this.router.snapshot.params.id;
    let num = (document.getElementById("flexCheckDefaultAlllead")as HTMLInputElement);
   // console.log("num", num)
    if (num.checked) {
      this.compaigns.AllLead = '1';
    }
    else {
      this.compaigns.AllLead = '0';
    }
    let numAop = (document.getElementById("flexCheckDefault1")as HTMLInputElement);
   // console.log("numAop", numAop)
    if (numAop.checked) {
      this.compaigns.AllOpp = '1';
    }
    else {
      this.compaigns.AllOpp = '0';
    }
    let numAbp = (document.getElementById("flexCheckDefaultAllBP")as HTMLInputElement);
   // console.log("numAbp", numAbp)
    if (numAbp.checked) {
      this.compaigns.AllBP = '1';
    }
    else {
      this.compaigns.AllBP = '0';
    }
    if (f.valid) {
      this.isLoading = true;

      this.bridgeService.updateCampaignSet(this.compaigns).subscribe(
        (res: Compaign) => {
          // console.log("artw", res);
          if (Object(res)['status'] == "200") {
            // this.compaign.push(res);
          //  console.log("cn", res)
            this.isLoading = false;
            $(".success-box").show();
            this.modalService.dismissAll();
            setTimeout(() => {
              $(".success-box").fadeOut(1000);
              this.route.navigate(['/campaign']);

              // var priviousUrl = this.bridgeService.getPreviousUrl();
              // this.router.navigate([priviousUrl]);
              // alert("CampaignSet Added Successfully Your Member List Will be Update after 24 hours")
            }, 2000);
            this._NotifierService.showSuccess('Campaign Set Updated Successfully !');
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
            this.isLoading = false;
          }
          // console.log(res);
        },
        (err: { message: any; }) => {
          this.isLoading = false;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    } else {
      this._NotifierService.showError('Please Filed All required field');
      this.isLoading = false;
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
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        }
        else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }

  employeeitem: any = [];
  getempall(): void {
    this.bridgeService.getAll().subscribe(
      (data: any) => {
        this.empall = data;
        for (let i = 0; i < this.empall.length; i++) {
          var itm1 = {
            item_id: this.empall[i].SalesEmployeeCode, item_text: this.empall[i].SalesEmployeeName
          }
          this.employeeitem.push(itm1)

        }
        this.dropdownListemp = this.employeeitem


      },

    );
  }

  selectChangeHandler(event: any) {
    this.bridgeService.getCountrydata().subscribe(
      (data: Country[]) => {
        this.code=data.filter((country:any)=>country.Code===event);
        this.compaigns.BPCountryCode = this.code[0].Code;
    this.compaigns.BPCountry = this.code[0].Name;
    this.getState(this.code[0].Code);
      });
  }
  getCountry(): void {
    this.bridgeService.getCountrydata().subscribe(
      (data: Country[]) => {
        this.countrys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  sourceitem: any = [];
  getAllSource(): void {
    this.bridgeService.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source = data;

        for (let i = 0; i < this.source.length; i++) {
          var itm = {
            item_text: this.source[i].Name
          }
          this.sourceitem.push(itm)

        }
        this.dropdownList = this.sourceitem
        // console.log("arif", this.sourceitem)
        // console.log("src", this.source)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  selectChangeHandlerState(event: any) {
    //update the ui
   // this.selectedDayState = event.target.value;
    this.bridgeService.getStatedata(this.compaigns.BPCountryCode).subscribe(
      (data: States[]) => {
        this.codeState = data.filter((state:any)=>state.Code===event);
        this.compaigns.BPStateCode = this.codeState[0].Code;
        this.compaigns.BPState = this.codeState[0].Name;

      }
    );
   // this.codeState = this.selectedDayState.split(',');

  }


  getState(evt:any): void {
    this.bridgeService.getStatedata(evt).subscribe(

      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  industoryitem: any = [];
  getIndustory(): void {
    this.bridgeService.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.industorys = data;

        for (let i = 0; i < this.industorys.length; i++) {
          var itm4 = {
            item_id: this.industorys[i].IndustryCode, item_text: this.industorys[i].IndustryName
          }
          this.industoryitem.push(itm4)

        }
        this.dropdownListind = this.industoryitem
        // console.log("code", this.dropdownListind)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  lead_Type:any;
  getLeadAll(): void {
    this.bridgeService.getLeadTypedata().subscribe(
      (data: any[]) => {
        this.lead_Type = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  
  getOpportunityList(): void {
    // console.log('check inside list data' , this.leadType);
    
    this.isLoading = true;
    this.bridgeService2.getOpportunityTypeData().subscribe(
      (data: any[]) => {
        this.optyp = data;
        // console.log(this.optyp);
        this.isLoading = false;
        // console.log('this.optyp name',this.optyp);
      },

    );
  }

  getCustomerTypeList(): void {
    this.isLoading = true;
    this.bridgeService2.getCustomerTypeData().subscribe(
      (data: any[]) => {
        this.isLoading = false;
        this.cstmrtype = data;
      },

    );
  }


}
