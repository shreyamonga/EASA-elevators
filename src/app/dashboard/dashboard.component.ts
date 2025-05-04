import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
// import { Chart } from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
// import 'chartjs-plugin-curve';
import { HttpClient } from '@angular/common/http';
import {ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bridge } from '../bridge';
import { DatePipe } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { KeyboardService } from '../keyboard.service';



declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  SelectedPerson:any;
  UserName: any;
  SalesEmployeeCode: any;
  baseUrl2: any;
  bridges: any[] = [];
  leadsource: any[] = [];
  role: any;
  BarBestSell:any;
  CollectionGraph:any;
  DealsChart: any;
  toFiveCustomer:any;
  barChart3:any;
  doughnut:any;
  revanue: any = 0;
  sales: any = 0;
  Customer:any = 0;
  allOrder:any = 0;
  sales_diff: any = 0;
  notification: any = 0;
  Leads:any = 0;
  isLoad:boolean=false;
  FirstLogin:any = 'false';
  Headingss: any[] = [];
  constructor(private modalService: NgbModal,
    private HeadingServices: HeadingServicesService, public datepipe: DatePipe, private bridgeService: BridgeService, private route: Router, private http: HttpClient, private _KeyboardService: KeyboardService) {
    this.baseUrl2 = this.bridgeService.baseUrl2;
  }
  ngAfterViewInit() {
    (document.querySelector('.sidebar') as HTMLElement)?.classList?.remove('d-none');
    (document.querySelector('.figma-sidebar') as HTMLElement)?.classList?.remove('d-none');
  }
  ngOnInit(): void {
    this.FirstLogin = sessionStorage.getItem('FirstLogin');
    if(this.FirstLogin == 'true'){
    this.isLoad = true;
    setTimeout(() => {
      sessionStorage.setItem('FirstLogin', 'false');
      this.isLoad = false;
    }, 4000);
    }
    this.bridgeService.autoCall();
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    this.Headingss = this.HeadingServices.getZeroModule();
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.ChartJs(this.SalesEmployeeCode);

    this.bridgeService.getempall().subscribe(
      (data: Bridge[]) => {
        this.bridges = data;
        console.log('employee list', this.bridges);
        for (let i = 0; i < this.bridges.length; i++) {
          if (this.bridges[i]['SalesEmployeeCode'] == '-1') {
            this.bridges.splice(i, 1);
          }
          if (this.bridges[i]['SalesEmployeeCode'] == '') {
            this.bridges.splice(i, 1);
          }
          if (this.bridges[i]['Active'] != 'tYES') {
                     this.bridges.splice(i, 1);
           }
        }


      },
      (err) => {
        console.log(err);

      }
    );

  }

  redirectwithsale(code:any,url:any){
    this.bridgeService.setSalepercode(code);
    this.route.navigate([url]);
  }
  getLeadsource(code:any){
   const dateObj = new Date();
  const month2 = dateObj.getMonth() + 1;
  const year = dateObj.getUTCFullYear();
  // const year1 = year+1;
  // const year2 = String(year)+'-'+String(year1);
  let startYear, endYear;

  if (month2 >= 4) {
    startYear = year;
    endYear = year + 1;
  } else {
    startYear = year - 1;
    endYear = year;
  }

  const year2 = `${startYear}-${endYear}`;

    this.bridgeService.getleadsourcedashboard(code,String(month2),year2).subscribe(
      (data: Bridge[]) => {
        this.leadsource = data;
      },
      (err) => {
        console.log(err);

      }
    );
  }

  ChartJs(code:any){
    this.SelectedPerson = code;
    this.bridgeService.getempall().subscribe(
      (data: Bridge[]) => {
        this.bridges = data;
        // console.log('employee list', this.bridges);
        for (let i = 0; i < this.bridges.length; i++) {
          if (this.bridges[i]['SalesEmployeeCode'] == '-1') {
            this.bridges.splice(i, 1);
          }
          if (this.bridges[i]['SalesEmployeeCode'] == '') {
            this.bridges.splice(i, 1);
          }
          if (this.bridges[i]['Active'] != 'tYES') {
                     this.bridges.splice(i, 1);
           }
        }


      },
      (err) => {
        console.log(err);

      }
    );


    this.getLeadsource(code);
    this.bridgeService.EmpDashboard(code).subscribe(
      (data: any) => {
        this.revanue = data.data[0].amount;
        this.sales = data.data[0].sale;
        this.Leads = data.data[0].Leads;
        this.Customer = data.data[0].Customer;
        this.allOrder = data.data[0].Order;
        this.notification = data.data[0].notification;
        console.log('Notification',this.notification);
      });

      this.bridgeService.BestsellingItembyAmount(code).subscribe((data)=>{
        var barChartdata2 = data;
        var bestSellingItem = [];
        var bestSellingCardName = [];
        for (let i = 0; i < barChartdata2.data.length; i++) {
          var newdata = barChartdata2.data[i].ItemName.trim().split(' ')
          bestSellingItem.push(newdata[0]);
          bestSellingCardName.push(barChartdata2.data[i].Total);
        }
        if (this.BarBestSell != undefined) {
          this.BarBestSell.destroy();
        }
    this.BarBestSell = new Chart("BarBestSell", {
      type: 'bar',
      data: {
        labels: bestSellingItem,
            datasets: [{
          label: 'Qualified',
          borderRadius: 15,
          data: bestSellingCardName,
              backgroundColor: [
            '#4a79e4',
          ],
          borderWidth: 1,
          barThickness: 9,
        },

        ]
      },
      options: {
        // events:[],
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false,
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              drawBorder: false
            }
          }
        },
        plugins:{
          legend: {
            display: false,
        }
      }
      },

    });

  })


    this.bridgeService.topFivecustomers(code,10).subscribe((data:any)=>{
      var top5bp = data.data;

      if (data['data'].length > 0) {
        var TopcustmerCardName = [];
        var TopcustmerTotal = [];
        // var ExtraTotal = [];
        var ExtraTotal2 = [];
        var hightestVal = 0;
      for (let i = 0; i < top5bp.length; i++) {

        TopcustmerTotal.push(top5bp[i].Total);
        // TopcustmerCardName.push(top5bp[i].CardName);
        var newdata = top5bp[i].CardName.trim().split(' ')
        TopcustmerCardName.push(newdata[0]);
        if(hightestVal <= top5bp[i].Total){
          hightestVal = top5bp[i].Total;
        }
      }
      for(let j = 0; j < top5bp.length; j++){
        ExtraTotal2.push((hightestVal-top5bp[j].Total));
      }


      if (this.toFiveCustomer != undefined) {
        this.toFiveCustomer.destroy();
      }
    this.toFiveCustomer = new Chart("toFiveCustomer", {
      type: 'bar',
      data: {

        labels: TopcustmerCardName,
            datasets: [{


          label: 'Top 10 Customer',
          data: TopcustmerTotal,
          borderRadius: 15,

              backgroundColor: [
            '#4A79E4'

          ],
          borderColor: [
            '#4A79E4'

          ],
          borderWidth: 1,
          barThickness: 9,
        },
        {
          data: ExtraTotal2,
          borderRadius: 15,

              backgroundColor: [
            '#E9EDF7'

          ],
          borderColor: [
            '#E9EDF7'

          ],
          borderWidth: 1,
          barThickness: 9,
          pointStyle: 'rectRot',
        // pointRadius: 5,
        // pointBorderColor: 'rgb(0, 0, 0)'

        }


        ]
      },
      options: {

        indexAxis: 'x',
        // events:[],
        plugins:{
          legend: {
            display: false,
        }
      },
        scales: {

          y: {
            grid: {
              display: false,
              drawBorder: false
            },
            beginAtZero: true,
            stacked: true
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            stacked: true
        },

        }


      }
    });
  }
});

this.bridgeService.HotWarmDealsGraph(code).subscribe((data2)=>{
  // var barChartdata2 = data;
  var AllMonth = [];
  var HotDeals = [];
  var WarmDeals = [];
  for (let i = 0; i < data2.data.length; i++) {
    AllMonth.push(data2.data[i].Month);
    HotDeals.push(data2.data[i].HotLeadCount);
    WarmDeals.push(data2.data[i].WarmLeadCount);
  }

  if (this.DealsChart != undefined) {
    this.DealsChart.destroy();
  }
      this.DealsChart = new Chart("DealsChart", {
        type: 'bar',
        data: {
          labels: AllMonth,
          datasets: [
            {
              label: 'Hot Deals',
              data: HotDeals,
              borderRadius: 15,
              backgroundColor: [
                '#FE7A7A'
              ],
              borderColor: [
                '#FE7A7A'
              ],
              borderWidth: 1,
              barThickness: 10,
            },

            {
              label: 'Warm Deals',
              data: WarmDeals,
              borderRadius: 15,
              backgroundColor: [
                '#FFA63D'
              ],
              borderColor: [
                '#FFA63D'
              ],
              borderWidth: 1,
              barThickness: 10,
            }
          ]
        },
        options: {
          // events: [],
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
                drawBorder: false,
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                drawBorder: false
              }
            }
          }
        }

      });
    })


  // if (this.barChart3 != undefined) {
  //   this.barChart3.destroy();
  // }
  //     this.barChart3 = new Chart("barChart3", {
  //       type: 'bar',
  //       data: {
  //         labels: ['', '', '', '', ''],
  //         datasets: [
  //           {
  //             label: 'Overdue',
  //             data: [65, 59, 80, 81, 40],
  //             borderRadius: 15,
  //             backgroundColor: [
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF'
  //             ],
  //             borderColor: [
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF',
  //               '#95B5FF'
  //             ],
  //             borderWidth: 1,
  //             barThickness: 10,
  //           },

  //           {
  //             label: 'Open',
  //             data: [10, 11, 34, 23, 34],
  //             borderRadius: 15,
  //             backgroundColor: [
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4'
  //             ],
  //             borderColor: [
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4',
  //               '#4A79E4'
  //             ],
  //             borderWidth: 1,
  //             barThickness: 10,
  //           },
  //           {
  //             label: 'Closed',
  //             data: [4, 6, 8, 9, 5],
  //             borderRadius: 15,
  //             backgroundColor: [
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D'
  //             ],
  //             borderColor: [
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D',
  //               '#FFA63D'
  //             ],
  //             borderWidth: 1,
  //             barThickness: 10,
  //           },
  //         ]
  //       },
  //       options: {
  //         // events: [],
  //         plugins: {
  //           legend: {
  //             display: false,
  //           }
  //         },
  //         scales: {
  //           x: {
  //             beginAtZero: true,
  //             grid: {
  //               display: false,
  //               drawBorder: false,
  //             }
  //           },
  //           y: {
  //             beginAtZero: true,
  //             grid: {
  //               display: true,
  //               drawBorder: false
  //             }
  //           }
  //         }
  //       }

  //     });

      this.bridgeService.mostTypeofOrder(code).subscribe((data:any)=> {

        var barChartdata2 = data;
        var FastItemsCount = barChartdata2.data[0].FastItemsCount;
        var SlowItemsCount = barChartdata2.data[0].SlowItemsCount;
        var NotMovingItemsCount = barChartdata2.data[0].NotMovingItemsCount;


        var xpieValues2 = ["Slow Moving", "Fast Moving", "Non Moving"];
         var total= barChartdata2.data[0].FastItemsCount+barChartdata2.data[0].SlowItemsCount+barChartdata2.data[0].NotMovingItemsCount;


        var ypieValues2 = [Math.round(SlowItemsCount*100/total), Math.round(FastItemsCount*100/total), Math.round(NotMovingItemsCount*100/total)];


  if (this.doughnut != undefined) {
    this.doughnut.destroy();
  }

      this.doughnut = new Chart("doughnut", {
        type: 'doughnut',
        data: {
          labels: xpieValues2,
          datasets: [{
            label: 'My First Dataset',
            data: ypieValues2,
            backgroundColor: [
              '#1EF2FF',
              '#FFA63D',
              '#4A79E4'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          // events:[],
          // scales: {
          //   x: {
          //     beginAtZero: false,
          //     grid: {
          //       display: false,
          //       drawBorder: false,
          //     }
          //   },
          //   y: {
          //     beginAtZero: false,
          //     grid: {
          //       display: false,
          //       drawBorder: false
          //     }
          //   }
          // },
          plugins:{
            legend: {
              display: false,
          }
        }
        },

      });
    });


    const dateObj = new Date();
    const year = dateObj.getUTCFullYear();
    const year1 = year+1;
    const year2 = String(year)+'-'+String(year1);

    const Collectionbar:any = [];
    const Projectionbar:any = [];
    this.bridgeService.collectionProjection(code,year2).subscribe((data:any)=> {

      var collvsprojdata = data;

        // console.log(data['data'])
        for (let x in data['data']) {
          var qw = data['data'][x]['Collection'] + "";
          Collectionbar.push(qw)
        }
        for (let x in data['data']) {
          var qw = data['data'][x]['Projection'] + "";
          Projectionbar.push(qw)
        }
        // var ThisYeas = data['data'][11].Month.split('-');
        var d = new Date();
        var ThisYeas: any;
        if (d.getMonth() < 3) {
          ThisYeas = String(d.getFullYear());
          ThisYeas = ThisYeas.slice(2, 4);
          ThisYeas = Number(ThisYeas) - 1;
        }
        else {
          ThisYeas = String(d.getFullYear());
          ThisYeas = ThisYeas.slice(2, 4);
        }
        var ThisYeas2 = Number(ThisYeas) + 1;
        // console.log(this.targetbar)
  if (this.CollectionGraph != undefined) {
    this.CollectionGraph.destroy();
  }

    this.CollectionGraph = new Chart("CollectionGraph", {
      type: 'line',
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{
          label: 'Collection ',
          data: Collectionbar,
          fill: true,
          borderColor: '#4891e9',
          tension: 0.1
        },
        {
          label: 'Projection ',
          data: Projectionbar,
          fill: true,
          borderColor: '#21f2ff',
          tension: 0.1
        }]
      },
      options: {
        // events:[],
        plugins:{
          legend: {
            // display: false,
        },
      }
      }
    });

  });
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

}
