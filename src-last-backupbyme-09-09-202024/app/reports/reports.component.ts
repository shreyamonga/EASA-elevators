import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Industry } from '../bridge';
import * as XLSX from 'xlsx';
import { BridgeService } from '../modules/service/bridge.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  p: number = 1;
  sortedColumn: string = '';
  sortsend: boolean | undefined;
  industry: Industry[] = [];
  indus: Industry = {
    IndustryDescription: "",
    IndustryName: "",
    IndustryCode: ''
  }
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  searchValue: string = '';
  isLoading: boolean = false;
  isLoading2: boolean = false;
  nodata: boolean = false;
  pagelimit: any = 10;
  startind = 1;
  endind = 1;
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow:10
  }
  ReportModule:any[] = []
  totalCount:any;
  commonObj : any={exportLoading:false}
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  AllReport:boolean = true;
  Table2Show:boolean = false;
  ModuleItem:any = '';
  ModuleItemSub:any = '';
  count = new Array();
  filteruser:any = {report_category:''};
  Datas: any[] = [];
  DataHeadingkey:any;
  DataHeading:any;
  filterLead: any = {};
  DetailModule:any = '';
  filter_customer: any = {Name:'',ctype:'',industry:'',saleemp:'',pterms:''};
  getValues(obj: {}) {
    return Object.values(obj)
  }
  constructor(private modalService: NgbModal,
    private HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, private route: Router, public bridgeService2: BridgeService) { }

  ngOnInit(): void {
    this.bridgeService2.autoCall();
    this.getIndustryList();
    this.getReportCategory();
    this.UserName = sessionStorage.getItem('UserName');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).ready(function () {
      $('.hover-show').hide()
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

  }

  setModule(item:any){
    this.Table2Show = false;
    this.ModuleItemSub = '';
    this.filteruser.report_category = item.id;
    this.ModuleItem = item.title;
    this.AllReport = false;
    this.getIndustryList();
  }
  allReport(){
    this.Table2Show = false;
    this.AllReport = true;
    this.ModuleItemSub = '';
    this.ModuleItem = '';
    this.filteruser.report_category = '';
    this.getIndustryList();
  }

  isloadging:boolean = false;
  goDetail(item: any){
    this.isloadging = true;
    var isExist:boolean = false;
    for(let i=0;i<this.bridgeService2.FilterTabs.length;i++){
      if(this.bridgeService2.FilterTabs[i].id == item.id){
        isExist = true;
      }
    }

    this.ModuleItem = '';
    this.ModuleItemSub = item.title;
    this.DetailModule = item.report_category;

    this.bridgeService2.reportDetails(item.id).subscribe(
      (data: any) => {
        this.isloadging = false;
        this.Datas = data.data;
        const firstObject = this.Datas[0];
        this.DataHeadingkey =  Object.keys(firstObject);
        this.DataHeading = Object.keys(firstObject).map(key => key.replace(/_/g, ' '));
        // console.log(this.DataHeading)
      },
      (err) => {
        this.isloadging = false;
        console.log(err);
        this.error = err;
      }
    );

    this.Table2Show = true;
    if(!isExist){
    this.bridgeService2.FilterTabs.push(item);
    }
  }
  bridgess: any[] = [];
  getBridge(): void {
    let tmp: any[] = [];
    this.bridgeService2.getAll().subscribe(
      (data: any[]) => {
        this.bridgess = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  source1: any;
  getAllSource(): void {
    let sourcetmp: any[] = [];
    this.bridgeService2.getAllSourcedata().subscribe(
      (data: any[]) => {
        this.source1 = data;
        // console.log(this.source1)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  optyp: any;

  getOpportunityList(): void {
    this.bridgeService2.getOpportunityTypeData().subscribe(
      (data: any[]) => {
        this.optyp = data;
        // console.log('this.optyp name', this.optyp);



      },

    );
  }
  cstmrtype: any[] = [];
  getCustomerTypeList(): void {
    this.isLoading = true;
    this.bridgeService2.getCustomerTypeData().subscribe(
      (data: any[]) => {
        //this.isLoading = false;
        this.cstmrtype = data;
        this.isLoading = false;


      },

    );
  }
  businesspartners:any[] = [];
  getBusinessPartmers(): void {
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: any[]) => {
        this.businesspartners = data;
        // console.log(this.businesspartners)

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  industorys:any[] = [];
  getIndustory(): void {
    this.isLoading = true;
    this.bridgeService2.getIndustorydata().subscribe(
      (data: any[]) => {
        this.industorys = data;
        this.isLoading = false;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  paymentterms:any[] = [];
  getPaymentTerms(): void {
    this.isLoading = true;
    this.bridgeService2.getPaymentTermsdata().subscribe(
      (data: any[]) => {
        this.paymentterms = data;
        this.isLoading = false;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  resetfilter() {
    this.filterLead = {}
    this.filter_customer = {Name:'',ctype:'',industry:'',saleemp:'',pterms:''};

  }

  ExportIt(Type:any) {
    let element = document.getElementById('LeadsTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'LeadsTable.xlsx');

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
  remove_array(item: number) {
    // this.allReport();
    this.bridgeService2.FilterTabs.splice(item, 1);
    if(this.bridgeService2.FilterTabs.length == 0){
      this.allReport();
    }
    else{
      if(item != 0){
        this.goDetail(this.bridgeService2.FilterTabs[item-1]);
      }
      else{
        this.goDetail(this.bridgeService2.FilterTabs[0]);
      }
    }
  }
  editdeletepop(item: any) {
    $('.hover-show').hide();
    $('.hover-show' + item.id).toggle();

  }


  getReportCategory(): void {
    this.bridgeService2.getReportCatrogydata().subscribe(
      (data: any[]) => {
        this.ReportModule = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  reload() {
    this.count = [];
      $('#selectAll1').prop('checked', false);
      this.commonObj.tbCheckM_1 = false;
      this.commonObj.tbCheckM_2 = false;
      this.getIndustryList();
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  pageChanged(event:any){
    this.pagination.PageNo = event;
    this.reload();
  }
  togglesortType(key: any) {
    this.sortsend = !this.sortsend;
    this.order_by_field = key;
    if(this.sortsend == true){
      this.order_by_value = 'asc';
    }
    else{
      this.order_by_value = 'desc';
    }
    this.RowPerPage();
  }
  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
  }
  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  getIndustryList(): void {
    this.isLoading2 = true;
    this.bridgeService2.getReportsByPagination(this.pagination,this.searchValue,this.order_by_field,this.order_by_value,this.filteruser).subscribe(
      (data: any) => {
        this.industry = data.data;
        this.totalCount = data.meta.count;
        this.isLoading2 = false;
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
      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  isEdit:boolean = false;
  open(content: any, isEdit:boolean,data:any) {
    this.isEdit = isEdit;
    if(isEdit == true){
      this.indus = JSON.parse(JSON.stringify(data));
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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


}
