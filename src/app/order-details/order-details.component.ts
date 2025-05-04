import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { Customer, Branch, EditBranch } from '../customer';
import { OrAttach, OrdersOne } from '../orders';
import { Quotation } from '../quotation';
import { Location } from '@angular/common';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
declare var $: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orders: OrdersOne[] = [];

  accesstoken:any;
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  idd: any;
  CardCode: any;
  isLoading: boolean = false;
  isLoading2: boolean = false;

  baseUrl2:any;
  orderAttach: OrAttach = {
    Attach: '',
    orderId: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),

  }

  orderid:any;
  savedModules: any[] = [];
  Headingss: any[] = [];
  constructor(
    private bridgeService: BridgeService,
    private route: Router,
    private router: ActivatedRoute,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private modalService: NgbModal,
    private _location: Location
  ) {
    this.baseUrl2=bridgeService.baseUrl2;
  }

  ngOnInit(): void {

    if (!this.HeadingServices.isModuleView(6)) {
      this.route.navigate(['/dashboard']);
    }

    this.bridgeService.autoCall();
    this.getQuotation();

    this.UserName = sessionStorage.getItem('UserName');
    this.accesstoken='&token='+sessionStorage.getItem('accesstoken');
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }

    this.Headingss = this.HeadingServices.getModule6();

    var priviousUrl = this.bridgeService.getPreviousUrl();
    var newcheck = priviousUrl.split('/');
    // console.log('newcheck',newcheck);
    // this.urlcheck=priviousUrl.split('/');

    if (newcheck[1] === 'order') {
      if(!!this.bridgeService.getBpCardcode()){
        this.orderid = this.bridgeService.getBpCardcode();
      }


    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }

  show_details() {
    $('.sho-high').show(500);
    $('.show-details').hide(500);
    $('.hide-details').show(500);
  }

  hide_details() {
    $('.sho-high').hide(500);
    $('.show-details').show(500);
    $('.hide-details').hide(500);
  }

  total_before: any = 0;
  total_after:any = 0;
  total_after_tax:any = 0;
  tax_Value:any = 0;
  total_Amount:any;
  orderAttachment:any[]=[];
  Items:any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null,detailTab:'Items',activityTab: 'note' };
  getQuotation(): void {
    this.isLoading=true;
    this.idd = this.router.snapshot.params.id;
    this.bridgeService.getOneOrderdata(this.idd).subscribe(
      (data: OrdersOne[]) => {
        var totalamount=new Array;
        this.isLoading=false;
        this.orders = data;
        this.total_after = 0;
        this.total_after_tax = 0;
        this.tax_Value = 0;
        this.total_Amount = 0;
        //  console.log('------orders------',this.orders)
        this.orderAttachment=data[0].AttachDetails;
        this.Items = this.orders[0]['DocumentLines'];
        // console.log('this.orders',this.orders);
        for (let i = 0; i < this.orders[0]['DocumentLines'].length; i++) {
          // var total=(this.orders[0]['DocumentLines'][i].Quantity
          var basic = Number(this.orders[0]['DocumentLines'][i].Quantity) * Number(this.orders[0]['DocumentLines'][i].UnitPrice);
          var afterfdis = basic - (basic * (Number(this.orders[0]['DocumentLines'][i].DiscountPercent) / 100))
          var aftersdis = afterfdis - (afterfdis * (Number(this.orders[0].DiscountPercent) / 100))
          var total = aftersdis + (aftersdis * (Number(this.orders[0]['DocumentLines'][i].TaxRate) / 100))
          totalamount.push(total);
          this.total_after += afterfdis;
          this.total_after_tax += aftersdis;
          this.tax_Value +=  (aftersdis * (Number(this.orders[0]['DocumentLines'][i].TaxRate) / 100));
        }

        this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);

        if(this.orders[0].FreightCharge != ''){
          this.total_Amount = Number(this.total_Amount) + Number(this.orders[0].FreightCharge);
          }
          this.total_Amount =  this.total_Amount.toFixed(2);
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */

  // details Attachment

  editfiles: any = [];



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
    // console.log(editfiles);
    this.prepareeditFilesList(editfiles.target.files);
  }


  deletebranch1: any;
  deleteAttach(confirmModal:any,id: number) {
   this.modalService
   .open(confirmModal, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
   .result.then(
     (result) => {
       this.closeResult = `Closed with: ${result}`;
     },
     (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     }
   );
   this.deletebranch1 = id;
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
  deletefileapi(imageid: any) {
    let ordId = this.router.snapshot.params.id;
    this.bridgeService.deleteorderAttachment(ordId, imageid).subscribe(
      (res) => {
        this.modalService.dismissAll();
        this.getQuotation();

      },
      (err) => (this.error = err)
    );
  }
  deleteeditFile(index: any) {

    Array.from(this.editfiles).splice(index, 1);
   // console.log(this.editfiles)

  }

  prepareeditFilesList(editfiles: Array<any>) {
    for (const item of editfiles) {
      // item.progress = 0;
      // this.editfiles.push(item);
      // console.log(this.files);

    }
    this.editfiles = editfiles;

    // this.fl=files
    // if (editfiles[0].size > 1055736 * 5) {
    //   this._NotifierService.showError("please select less than 5MB of size")

    // }
   // else{
      this.idd = this.router.snapshot.params.id;
      this.orderAttach.Attach = this.editfiles
      this.orderAttach.orderId = this.idd
      // console.log("frm", this.orderAttach)
      this.orderAttach.CreateDate=this.HeadingServices.getDate(),
      this.orderAttach.CreateTime=this.HeadingServices.getTime(),
        this.bridgeService.orderdetailsAttach(this.orderAttach).subscribe(
          (res: OrAttach) => {
            if (Object(res)['status'] == "200") {

              this._NotifierService.showSuccess('Attachment Added Successfully !');
            this.getQuotation();

            // setTimeout(() => {
            //   $(".edit-success-box-attch").fadeOut(1000);
              // this.getOppoAttachment();
            //  this.getOpportunity();
            // }, 2000);
          }
          else {
            this._NotifierService.showError(Object(res)['message']);

          }



      })
   // }


  }

  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  GoToPdf(id: any) {
   const encodedURL = btoa(id);
    const url = "../../assets/html/order.html?id="+id+this.accesstoken;

    window.open(url, '_blank');
  }

  isModuleViewadd(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
      return true;
    }
    return false;
  }

  isModuleViewedit(module_id: number): boolean {
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
      return true;
    }
    return false;
  }

  isModulefieldview(module_id: number, key: string): boolean {
    const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
    if (selectedModule) {
        const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
        return hasViewPermission;
    }
    return false;
  }

  LONG_DATA_LABELS: any[] = [
    {key:'carDesigns',label:'Car Designs',subkey:'carDesignsCost',sublabel:'Cost'},
    {key:'series',label:'Series',subkey:'seriesCost',sublabel:'Cost'},
    { key: 'sidePanels', label: 'Side Panels', subkey: 'sidePanelsCost', sublabel: 'Cost' },
    { key: 'rearPanels', label: 'Rear Panels', subkey: 'rearPanelsCost', sublabel: 'Cost' },
    { key: 'mirror', label: 'Mirror', subkey: 'mirrorCost', sublabel: 'Cost' },
    { key: 'handrail', label: 'Handrail', subkey: 'handrailCost', sublabel: 'Cost' },
    { key: 'flooring', label: 'Flooring', subkey: 'flooringCost', sublabel: 'Cost' },
    { key: 'ceiling', label: 'Ceiling', subkey: 'ceilingCost', sublabel: 'Cost' },
    { key: 'lighting', label: 'Lighting', subkey: 'lightingCost', sublabel: 'Cost' },
    { key: 'fan', label: 'Fan', subkey: 'fanCost', sublabel: 'Cost' },
    { key: 'COP_Plate', label: 'COP Plate', subkey: 'copPlateCost', sublabel: 'Cost' },
    { key: 'LOP_Plate', label: 'LOP Plate', subkey: 'lopPlateCost', sublabel: 'Cost' },
    { key: 'display', label: 'Display', subkey: 'displayCost', sublabel: 'Cost' },
    { key: 'pushButtons', label: 'Push Buttons', subkey: 'pushButtonsCost', sublabel: 'Cost' },
    { key: 'doorOperation', label: 'Door Operation', subkey: 'doorOperationCost', sublabel: 'Cost' },
    { key: 'doorClearOpeningsWidth', label: 'Door Clear Openings Width', subkey: 'doorClearOpeningsWidthCost', sublabel: 'Cost' },
    { key: 'doorClearOpeningHeight', label: 'Door Clear Opening Height', subkey: 'doorClearOpeningHeightCost', sublabel: 'Cost' },
    { key: 'carDoorPanel', label: 'Car Door Panel', subkey: 'carDoorPanelCost', sublabel: 'Cost' },
    { key: 'landingDoorFrame', label: 'Landing Door Frame', subkey: 'landingDoorFrameCost', sublabel: 'Cost' },
    { key: 'landingDoorPanel', label: 'Landing Door Panel', subkey: 'landingDoorPanelCost', sublabel: 'Cost' },
    { key: 'sensorOnCabin', label: 'Sensor On Cabin', subkey: 'sensorOnCabinCost', sublabel: 'Cost' },
    { key: 'cabinInterior', label: 'Cabin Interior', subkey: 'cabinInteriorCost', sublabel: 'Cost' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'carDoor', label: 'Car Door', subkey: 'carDoorCost', sublabel: 'Cost' },
    { key: 'customization', label: 'Customization(remarks)', subkey: 'customizationCost', sublabel: 'Cost' },
    { key: 'frame', label: 'Frame', subkey: 'frameCost', sublabel: 'Cost' },
    { key: 'lopCop', label: 'LOP COP', subkey: 'lopcopCost', sublabel: 'Cost' },
    { key: 'model', label: 'Model', subkey: 'modelCost', sublabel: 'Cost' },
    { key: 'modelNo', label: 'Model No' },
    { key: 'operation', label: 'Operation', subkey: 'operationCost', sublabel: 'Cost' },
    { key: 'Partition', label: 'Partition', subkey: 'partitionCost', sublabel: 'Cost' },
    { key: 'persons', label: 'Persons' },
    { key: 'pit', label: 'Pit', subkey: 'pitCost', sublabel: 'Cost' },
    { key: 'plateLOP', label: 'Plate LOP', subkey: 'plateLOPCost', sublabel: 'Cost' },
    { key: 'protection', label: 'Protection', subkey: 'protectionCost', sublabel: 'Cost' },
    { key: 'skirting', label: 'Skirting', subkey: 'skirtingCost', sublabel: 'Cost' },
    { key: 'speed', label: 'Speed', subkey: 'speedCost', sublabel: 'Cost' },
    { key: 'structure', label: 'Structure', subkey: 'structureCost', sublabel: 'Cost' }
  ];
  
  ELEVATOR_SHAFT_LABELS: any[] = [
    { key: 'shaftWidth', label: 'Shaft Width (plastered) in mm' },
    { key: 'shaftDepth', label: 'Shaft Depth (plastered) in mm' },
    { key: 'pit', label: 'Pit in mm' },
    { key: 'overhead', label: 'Overhead' },
    { key: 'machineRoomWidth', label: 'Machine Room Width (Plastered) in mm' },
    { key: 'machineRoomDepth', label: 'Machine Room Depth (Plastered) in mm' },
    { key: 'minimumFloorHeight', label: 'Minimum Floor Height in mm' },
    { key: 'totalCarTravel', label: 'Total Car Travel (Vertical Car Travel) in mm' },
    { key: 'lintelHeightCladding', label: 'Lintel Height + Cladding (40mm for Stone/20mm for Wood)' },
  ];
  ELEVATOR_SPECIFICATION_LABELS: any[] = [
    { key: 'Payload', label: 'Payload (live load capacity)' },
    { key: 'Capacity', label: 'Capacity (in person)' },
    { key: 'NoOfStops', label: 'Number of Stops' },
    { key: 'NoOfOpenings', label: 'Number of Openings' },
    { key: 'AccessibleSidesFront', label: 'Accessible Sides Front' },
    { key: 'AccessibleSidesRear', label: 'Accessible Sides Rear' },
    { key: 'AccessibleSides90Degree', label: 'Accessible Sides 90 Degree' },
    { key: 'FloorDesignation', label: 'Floor Designation' },
    { key: 'Speed', label: 'Speed (m/s)' },
    { key: 'CarWidth', label: 'Car width in mm' },
    { key: 'CarDepth', label: 'Car depth in mm' },
    { key: 'CarHeight', label: 'Car height in mm' },
    { key: 'StartStop', label: 'Start and stop' },
    { key: 'controlSystem', label: 'Control System' },
  ];
  TECHNICAL_DETAILS_LABELS: any[] = [
    { key: 'motor', label: 'Motor'  },
    { key: 'Gearbox', label: 'Gearbox' },
    { key: 'Controller', label: 'Controller'  },
  ];
  
  // ELEVATOR_STEEL_STRUCTURE_LABELS: any[] = [
  //   { key: 'Type', label: 'Type' },
  //   { key: 'verticalMembers', label: 'Vertical Members' },
  //   { key: 'horizontalMembers', label: 'Horizontal Members' },
  //   { key: 'foundation', label: 'Foundation' },
  //   { key: 'cladding', label: 'Cladding (optional)' },
  //   { key: 'anchorage', label: 'Anchorage' },
  // ];
  ELEVATOR_STEEL_STRUCTURE_LABELS: any[] = [ 
   
  
    { key: 'CladdingChoice', label: 'Cladding Choice', subkey: 'CladdingChoiceCost', sublabel: 'Cost' },
    { key: 'FoundationBolts', label: 'Foundation Bolts', subkey: 'FoundationBoltsCost', sublabel: 'Cost' },
  
    { key: 'HorizontalSheetMetal', label: 'Horizontal Sheet Metal', subkey: 'HorizontalSheetMetalCost', sublabel: 'Cost' },
    { key: 'HorizontalTubular', label: 'Horizontal Tubular', subkey: 'HorizontalTubularCost', sublabel: 'Cost' },
  
    { key: 'Type', label: 'Type', subkey: 'TypeCost', sublabel: 'Cost' },
  
    { key: 'VerticalSheetMetal', label: 'Vertical Sheet Metal', subkey: 'VerticalSheetMetalCost', sublabel: 'Cost' },
    { key: 'VerticalTubular', label: 'Vertical Tubular', subkey: 'VerticalTubularCost', sublabel: 'Cost' },
  ];
  
  DOORS_LABELS: any[] = [
    // { key: 'TypeOfDoor', label: 'Type of Door', subkey: 'TypeOfDoorCost', sublabel: 'Cost' },
    { key: 'DoorWidth', label: 'Door Width(in mm)' },
    { key: 'DoorHeight', label: 'Door Height(in mm)' },
    { key: 'DoorPanels', label: 'Door Panels' },
    { key: 'LandingDoorFrame', label: 'Landing Door Frame' },
    { key: 'CarInterlock', label: 'Car Interlock' },
    { key: 'LandingDoorInterlock', label: 'Landing Door Interlock' },
  ];
  
  SCOPE_OF_WORK_LABELS: any[] = [
    { key: 'PackingLoading', label: 'Packing Loading', subkey: 'PackingLoadingCost', sublabel: 'Cost' },
    { key: 'Transportation', label: 'Transportation', subkey: 'TransportationCost', sublabel: 'Cost' },
    { key: 'Unloading', label: 'Unloading', subkey: 'UnloadingCost', sublabel: 'Cost' },
    { key: 'Storing', label: 'Storing', subkey: 'StoringCost', sublabel: 'Cost' },
    { key: 'Scaffolding', label: 'Scaffolding', subkey: 'ScaffoldingCost', sublabel: 'Cost' },
    { key: 'IBEAM', label: 'IBEAM', subkey: 'IBEAMCost', sublabel: 'Cost' },
    { key: 'Liasoning', label: 'Liasoning', subkey: 'LiasoningCost', sublabel: 'Cost' },
    { key: 'License', label: 'License', subkey: 'LicenseCost', sublabel: 'Cost' },
    { key: 'IbeamforMachineBase', label: 'Ibeam for Machine Base', subkey: 'IbeamforMachineBaseCost', sublabel: 'Cost' },
    { key: 'IBeamShiftingtillMachineRoom', label: 'IBeam Shifting till Machine Room', subkey: 'IBeamShiftingtillMachineRoomCost', sublabel: 'Cost' },
    { key: 'MinorCivilWork', label: 'Minor Civil Work', subkey: 'MinorCivilWorkCost', sublabel: 'Cost' },
  ];

  OPTIONAL_FEATURES_LABELS: any[] = [
    { key: 'VVVFDrive', label: 'VVVF Drive', subkey: 'VVVFDriveCost', sublabel: 'Cost' },
    { key: 'overloadDevice', label: 'Overload Device', subkey: 'overloadDeviceCost', sublabel: 'Cost' },
    { key: 'automaticRescueDevice', label: 'Automatic Rescue Device', subkey: 'automaticRescueDeviceCost', sublabel: 'Cost' },
    { key: 'singlePhaseOperation', label: 'Single Phase Operation', subkey: 'singlePhaseOperationCost', sublabel: 'Cost' },
    { key: 'ViewWindow', label: 'View Window (80mm * 1000mm view slit in doors)', subkey: 'ViewWindowCost', sublabel: 'Cost' },
    { key: 'bigVisionGlassDoors', label: 'Big Vision Glass Doors', subkey: 'bigVisionGlassDoorsCost', sublabel: 'Cost' },
    { key: 'EmergencyTelephoneSystem', label: 'Emergency Telephone System (GSM)', subkey: 'EmergencyTelephoneSystemCost', sublabel: 'Cost' },
    { key: 'EmergencyTelephoneSystemPublic', label: 'Emergency Telephone System (Public Wireline Network)', subkey: 'EmergencyTelephoneSystemPublicCost', sublabel: 'Cost' },
    { key: 'BiometricAccess', label: 'Biometric Access', subkey: 'BiometricAccessCost', sublabel: 'Cost' },
    { key: 'CardReaderAccess', label: 'Card Reader Access', subkey: 'CardReaderAccessCost', sublabel: 'Cost' },
    { key: 'FullHeightCarOperatingPanel', label: 'Full Height Car Operating Panel', subkey: 'FullHeightCarOperatingPanelCost', sublabel: 'Cost' },
    { key: 'Intercom', label: 'Intercom (Press and Speak)', subkey: 'IntercomCost', sublabel: 'Cost' },
    { key: 'AttendantOperation', label: 'Attendant Operation', subkey: 'AttendantOperationCost', sublabel: 'Cost' },
    { key: 'ParkingKeySwitch', label: 'Parking Key Switch', subkey: 'ParkingKeySwitchCost', sublabel: 'Cost' },
    { key: 'DuplexAndTriplexCarGroupOperation', label: 'Duplex and Triplex Car Group Operation', subkey: 'DuplexAndTriplexCarGroupOperationCost', sublabel: 'Cost' },
    { key: 'TimedBlindFloor', label: 'Timed Blind Floor', subkey: 'TimedBlindFloorCost', sublabel: 'Cost' },
    { key: 'VoiceSynthesizerWithCustomizedMusic', label: 'Voice Synthesizer With Customized Music', subkey: 'VoiceSynthesizerWithCustomizedMusicCost', sublabel: 'Cost' },
    { key: 'handrail', label: 'Handrail', subkey: 'handrailCost', sublabel: 'Cost' }
  ];
  GUARANTEE_LABELS: any[] = [
    { key: 'Guarantee', label: 'Guarantee', subkey: 'GuaranteeCost', sublabel: 'Cost' },
    { key: 'GuaranteeDateOfDispatch', label: 'Guarantee from the date of dispatch', subkey: 'GuaranteeDateOfDispatchCost', sublabel: 'Cost' },
    { key: 'FreeMaintenancePeriod', label: 'Free Maintenance Period', subkey: 'FreeMaintenancePeriodCost', sublabel: 'Cost' },
    { key: 'FreeMaintenancePeriodDate', label: 'Free Maintenance Period from the date of intimation', subkey: 'FreeMaintenancePeriodDateCost', sublabel: 'Cost' }
  ];
  

}
