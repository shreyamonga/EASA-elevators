import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
declare var $: any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  p: number = 1;
  pagelimit: any = 10;

  Events: any[] = [];
  closeResult = '';
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  leadtype = 'All';
  followupdate = this.newdate;
  UserName: any;
  SalesEmployeeCode: any;
  barChartdata: any;
  barChartdata2: any;
  revanue: any;
  sales: any;
  sales_diff: any;
  notification: any;
  isLoading: boolean = false;

  error = '';
  success = '';
  nodata: boolean = false;

  httpClient: any;
  changeDate: any;
  UserId: any;
  notify: any;
  idd: any;

  searchValue: string = '';
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    // PageShow:10
  }
  totalCount:any;
  isLoading2: boolean = false;
  startind = 1;
  endind = 1;
  CurrentPage:any = 1;
  order_by_field:any = 'id';
  order_by_value:any = 'desc';
  filterLead: any = {
      CreateDate__gte: "",
      CreateDate__lte: ""
  };
  sortsend: boolean = false;
  constructor(private modalService: NgbModal, private router: ActivatedRoute, private bridgeService: BridgeService, private route: Router, private http: HttpClient) {

  }

  onDateClick(res: any) {
    this.followupdate = res.dateStr;

    this.changeDate = new Date(this.followupdate);
    // console.log(this.followupdate)
    this.changeDate = this.changeDate.toDateString();

  }

  ngOnInit(): void {
    this.getNotificationData();

    // this.bridgeService.autoCall();
    this.UserId = sessionStorage.getItem('UserId');

    $(".shohiclass").hide();

    this.UserName = sessionStorage.getItem('UserName');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');

  }

  RowPerPage() {
    this.pagination.PageNo = 1;
    this.reload();
  }
  reload() {
      this.getNotificationData();
  }
  
  pageChanged(event:any){
    this.pagination.PageNo = event;
    this.reload();
  }

  emptySeach(){
    this.searchValue = '';
    this.RowPerPage();
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

  getNotificationData(): void {
    this.isLoading2 = true;
    this.bridgeService.getNotification2(this.pagination,this.order_by_field,this.order_by_value,this.searchValue,this.filterLead).subscribe(

      (data: any) => {
        this.isLoading = false;
        // console.log(data)
        this.notify = data.data;
        this.idd = this.router.snapshot.params.id;
        this.totalCount = data.meta.count;
        this.CurrentPage = this.pagination.PageNo;
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
      (err: any) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  redirectonpage(item:any) {
        if(item != ''){
        if(item.ModuleName == "Lead"){
          this.route.navigate(['leads/table/lead-details/'+item.ModuleID]);
        }
        if(item.ModuleName == "Campaign"){
          this.route.navigate(['campaign/details/'+item.ModuleID]);
  
        }
        if(item.ModuleName == "Business Partner"){
          this.route.navigate(['/customer/customer-details/C'+ item.ModuleID]);
        }
        if(item.ModuleName == "Opportunity"){
          this.route.navigate(['/opportunity/opportunity-details/'+ item.ModuleID]);
        }
        if(item.ModuleName == "Quotation"){
          this.route.navigate(['/quotation/quotation-details/'+ item.ModuleID]);
        }
        if(item.ModuleName == "Order"){
          this.route.navigate(['/order/order-details/'+ item.ModuleID]);
        }
        if(item.ModuleName == "Delivery"){
          this.route.navigate(['/delivery/delivery-details/'+ item.ModuleID]);
        }
        if(item.ModuleName == "Invoice"){
          this.route.navigate(['/invoice/invoice-details/'+ item.ModuleID]);
        }
      }

  }

  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();
  }

  closeNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }

  resetfilter() {
    this.filterLead = {
      CreateDate__gte: "",
      CreateDate__lte: ""
  }
    this.RowPerPage();

  }


}
