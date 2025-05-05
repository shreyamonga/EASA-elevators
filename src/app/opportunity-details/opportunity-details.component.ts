import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';
import { oneopportunity, opportunity } from '../opportunity';
import {
  Stages, CreateStages, ChangeStages, SecondStage, ThirdStage, Negotiation1Stage, Negotiation2Stage, OrderConfirmationStage, PreNIStage,
  Negotiation3Stage, OrderBookingStage,
  ClosureStage, CompleteStages,
  PreNIChecklist, EditChecklist
} from '../stage';
import { Chatter, Activity, EditActivity, OppoAttach, } from '../chatter';
import { Location } from '@angular/common';
import { Bridge2, Follow, AddFollow2 } from '../bridge2';
import { Quotation } from '../quotation';
import { Bridge } from '../bridge';

import { Orders } from '../orders';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { HeadingServicesService } from '../modules/service/heading-services.service';
declare var $: any;
interface Floor {

  FNO: any;
  floorMaking: any;
  noOfOpening: any,
  sidesOfOpening: any,
  SW: any;
  SD: any;
  FH: any;
  DW: any;
  DH: any;
  LE: any;
  RE: any;
}
@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})


export class OpportunityDetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  @ViewChild('ExcelsheetComponent', { static: false }) ExcelsheetComponent!: ElementRef | any;
  DynamicFiledPositionDetials: any[] = [];
  baseUrl2: any;
  preNiChecklistStage: any
  genericPriceValue: any
  isLoading: boolean = false;
  activity: Activity[] = [];
  Nego1OfferPrice: any
  checkStageStatus: any
  Activitys: Activity = {
    SourceID: '',
    SourceType: 'Opportunity',
    Subject: '',
    Comment: '',
    ParticipantsType: '',
    Name: '',
    RelatedTo: 'hi',
    Emp: '',
    Title: '',
    Description: '',
    From: this.HeadingServices.getDate(),
    To: this.HeadingServices.getDate(),
    Time: this.HeadingServices.getTime(),
    Allday: 'false',
    Location: '',
    Host: '',
    Participants: [],
    Document: '',
    Repeated: '',
    Priority: 'low',
    ProgressStatus: 'WIP',
    Status: 1,
    ToTime: this.HeadingServices.getTime(),
    Type: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime()
  };
  Editactivity: EditActivity[] = [];

  EdiitActivitys: EditActivity = {
    Opp_Id: '',
    Subject: '',
    Comment: '',
    Name: '',
    RelatedTo: '',
    Emp: '',
    Title: '',
    Description: '',
    From: '',
    To: '',
    Time: '',
    Allday: 'false',
    Location: '',
    Host: '',
    Participants: [],
    Document: '',
    Repeated: '',
    Priority: '',
    ProgressStatus: '',
    Type: '',
    Status: 1,
    ToTime: this.HeadingServices.getTime(),
    CreateDate: '',
    CreateTime: '',
    id: ''
  };
  chatters: Chatter[] = [];
  chatterr: Chatter = {
    Message: '',
    SourceID: '', Mode: "",
    SourceType: 'Opportunity',
    Emp: '',
    Emp_Name: '',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime()
  };
  stages: any[] = [];
  quotationsList: Quotation[] = [];
  ordersList: Orders[] = [];
  opportunitys: any[] = [];
  closeResult = '';
  UserName: any;
  error = '';
  success = '';
  isPreNiChecklist: any
  nego1ApprovedByName: any
  // OpportunityStatus='';
  idd: any;
  stageId: any;
  Contactperson: any;
  stage_lenght: any;
  addAttachment: boolean = false
  showPreAttach: boolean = false
  bridges2: Bridge2[] = [];
  isPreNIList: boolean = false
  stage: Stages = {
    SequenceNo: '',
    Name: '',
    Stageno: '',
    ClosingPercentage: '0.0',
    Cancelled: 'tNO',
    IsSales: 'tYES',
    IsPurchasing: 'tYES',
    Comment: '',
    File: '',
    CreateDate: this.HeadingServices.getDate(),
    UpdateDate: this.HeadingServices.getDate(),
    Status: '',
    Opp_Id: '',
    Class: '',
    Color: '',
    popup1: '', popup2: '', popup3: ''
  };
  isChecklistData: boolean = false
  ViewNumberOfStop: boolean = false
  Createstages: CreateStages[] = [];
  NumberOfStop: any
  Createstage: CreateStages = {
    SequenceNo: '',
    Name: '',
    Stageno: '',
    ClosingPercentage: '0.0',
    Cancelled: 'tNO',
    IsSales: 'tYES',
    IsPurchasing: 'tYES',
    CreateDate: this.HeadingServices.getDate(),
    UpdateDate: this.HeadingServices.getDate(),
    Opp_Id: ''
  };
  Changestages: ChangeStages[] = [];
  drawingAttachmentStatus: any
  Secondstages: SecondStage[] = []
  Thirdstages: ThirdStage[] = []
  Negotiation1stages: Negotiation1Stage[] = []
  Negotiation2stages: Negotiation2Stage[] = []
  Negotiation3stages: Negotiation3Stage[] = []
  Closurestages: ClosureStage[] = []
  OrderBookings: OrderBookingStage[] = []
  OrderConfirmationStages: OrderConfirmationStage[] = []
  PreNIstages: PreNIStage[] = []

  firstStageNoOfStops: any
  firstCallOfferPrice: any
  nego1PersonDoingNegotiation: any
  nego1Negotiation1Remarks: any
  nego1GenericPrice: any
  nego1OfferPrice: any
  nego1GAP: any
  nego1DiscussionOverPrice: any
  nego2Remarks: any
  nego1ApprovedBy: any
  nego1ApprovalStatus: any
  nego1Negotiation1Price: any

  Changestage: ChangeStages = {
    StageStatus: '',
    Stageno: '',
    id: '',
    File: 'abc.png',
    Stage_Id: '',
    Opp_Id: '',
    Name: '',
    ProjectName: '',
    BillingName: '',
    KeyDecisionMaker: '',
    keyDecisionMakerMobile: '',
    keyDecisionMakerEmail: '',
    PmMobile: '',
    PmEmail: '',
    personFromPurchaseMobile: '',
    personFromPurchaseEmail: '',
    architectEmail: '',
    builderEmail: '',
    contractorEmail: '',
    interiorDesignerEmail: '',
    PMName: '',
    PersonFromPurchase: '',
    BillingAddress: '',
    ShippingAddress: '',
    ArchitectName: '',
    ArchitectNumber: 0,
    BuilderName: '',
    BuilderNumber: 0,
    // contactEmail:'',
    ContractorName: '',
    ContractorNumber: 0,
    InteriorDesignerName: '',
    InteriorDesignerNumber: 0,
    Space: '',
    InstallationPlace: '',
    StructureRequired: '',
    TimePeriodForLiftRequirement: '',
    TypeLiftRequired: '',
    TypeOfProperty: '',
    SpecificNeed: '',
    TypeOfMaterialToBeTransported: '',
    TypeOfIndustry: '',
    Capacity: '',
    MR_MRL: '',
    CabinDepth: 0,
    CabinWidth: 0,
    CabinHeight: 0,
    DoorWidth: 0,
    DoorHeight: 0,
    CabinInteriorFinish: '',
    DoorFinish: '',
    DoorType: '',
    OpeningSided: '',
    PitDepth: 0,
    OverHead: '',
    TotalTravel: '',
    NonStandardFeature: '',
    Remarks: '',
    NumberOfStop: 0,
    NumberOfOpening: 0,
    AppointmentBooking: '',
    SiteCity: '',
    SiteState: '',
    SiteZipcode: '',
    OfferPrice: '',
    SiteAddress: '',
    Floor: [],// This will hold the floor data array
  };



  Secondstage: SecondStage = {
    // Stage 2
    id: '',
    StageStatus: '',
    Stageno: '',
    Stage_Id: '',
    Opp_Id: '',
    PhysicalCopyOfRGF: 'abc.png',
    SitePicture: 'abc.png',
    BDMPictures: 'abc.png',
    CatalogHandover: '',
    NumberOfStop: 0,
    FinalRGFSentToClient: '',
    ProcessFlowPresented: '',
    CustomizationsIfAny: '',
    Opening: '',
    BuddyUp: '',
    OfferedPrice: 0,
    DrawingToBeSharedBy: '',
    DrawingAttachment: 'abc.png',
  };

  Thirdstage: ThirdStage = {
    // Stage 3
    StageStatus: '',
    id: '',
    Stageno: '',
    Stage_Id: '',
    Opp_Id: '',
    TechnicalPPTShared: '',
    Remarks: '',
    AnyUpdation: '',
    DrawingShared: '',
    File: 'abc.png',
  };




  Negotiation1stage: Negotiation1Stage = {
    // Stage 3
    StageStatus: '',
    id: '',
    Stageno: '',
    Stage_Id: '',
    Opp_Id: '',
    PersonDoingNegotiation: '',
    Remarks: '',
    GenericPrice: 0,
    GAP: 0,
    DiscussionOverPrice: '',
    ApprovedBy: '',
    //  OfferPrice:0,

    Negotiation1Price: '',
    ApprovalStatus: ''

  };

  Negotiation2stage: Negotiation2Stage = {
    // Stage 5
    StageStatus: '',
    id: '',
    Stageno: '',
    Stage_Id: '',
    Opp_Id: '',
    Negotiation2Price: '',
    CreatedBy: '',
    Remarks: '',
    File: 'abc.png',
    Negotiation3: '',


  };


  Negotiation3stage: Negotiation3Stage = {
    // Stage 5.1
    StageStatus: '',
    Stageno: '',
    Stage_Id: '',
    id: '',
    Opp_Id: '',
    Negotiation3Price: '',
    ApprovedBy: '',
    CreatedBy: '',
    Remarks: '',
    File: 'abc.png',
  }


  Closurestage: ClosureStage = {
    // Stage 6
    StageStatus: '',
    id: '',
    Stageno: '',
    Stage_Id: '',
    Opp_Id: '',
    PCHApproval: '',
    Remarks: '',
    File: 'abc.png',
  };
  OrderBookingstage: OrderBookingStage = {
    // Stage 7
    StageStatus: '',
    Stageno: '',
    id: '',
    Stage_Id: '',
    Opp_Id: '',
    CreatedBy: '',
    Remarks: '',
    PaymentProof: 'abc.png',
    SignedQuote: 'abc.png',
    LOI: 'abc.png'
  };


  OrderConfirmationstage: OrderConfirmationStage = {
    // Stage 7
    StageStatus: '',
    Stageno: '',
    id: '',
    Stage_Id: '',
    Opp_Id: '',
    CreatedBy: '',
    Remarks: '',
    EquipmentNumber: '',
    Order_Id: '',
    OrderName: '',
    FinanceApproval: '',
  };

  PreNIstage: PreNIStage = {
    // Stage 7
    Stageno: '',
    StageStatus: '',
    id: '',
    Stage_Id: '',
    Opp_Id: '',
    HandoverForm: '',
    PreNIChecklist_File: 'abc.png',
    PreNIChecklist: '',
    Handover: 'abc.png',
    MOM: 'abc.png',
    CreatedBy: '',
  };

  state: any
  checklist1 = [
    { ID: 'C1', REQUIRED_Installation: 'Lift Shaft, Pit, Over Head / M/C Room Structure Completed As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C2', REQUIRED_Installation: 'Pit Finished To Required Depth As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C3', REQUIRED_Installation: 'Waterproofing of Pit Completed', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C4', REQUIRED_Installation: 'Hoisting Beams / Hooks Of Adequate Capacity As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C5', REQUIRED_Installation: 'Door Lintel On Every Floor ENTRANCE Provided As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C6', REQUIRED_Installation: 'Front Entrance Walls Provided On All Floors as per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C7', REQUIRED_Installation: 'Smoke Vent in Over Head Area Provided ( Min Size 450mm*450mm )', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C8', REQUIRED_Installation: 'Door Opening Full Width Available On Lowest Floor.', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C9', REQUIRED_Installation: 'FFL Marking in Front Of Lift Entrance Provided in all Floors.', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C10', REQUIRED_Installation: 'Plastering In Lift Shaft at all floors Completed', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C11', REQUIRED_Installation: 'White Washing / Painting Completed in Lift Shaft on All Floors.', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C12', REQUIRED_Installation: 'Lockable Store Room available Near Lift Shaft ( Approx 30 Sq M / Per Lift )', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C13', REQUIRED_Installation: 'Clean & Dry Pit & Lift Well Available ( VERY CRITICAL )', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C14', REQUIRED_Installation: 'Safe , Clear & unobstructed access to Lift Shaft & M/C Room Available', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C15', REQUIRED_Installation: 'Suitable Notch in Sill fixing area of Landing Door available as per GAD ', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C16', REQUIRED_Installation: 'Scaffolding & Safety Barricading Fixed In Lift Shaft As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C17', REQUIRED_Installation: 'Cut Out For LOP Provided On Front Wall of All Floor as per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C18', REQUIRED_Installation: 'Steel Beams ( Machine Support Beams ) available at Top Floor.', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C19', REQUIRED_Installation: 'Marking for Cutouts for Beams Provided in walls in OH area', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C20', REQUIRED_Installation: 'Cutouts in walls in Over Head area for Beams Provided', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'CE1', REQUIRED_Installation: 'Permanent Working Lights (Bulkhead Fitting ) in Lift Shaft Provided', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'CE2', REQUIRED_Installation: 'Single Ph Power Switch / Socket Provided at all floors for Hammer Drill M/c', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'CE3', REQUIRED_Installation: 'Earthing Provided On Steel Scaffolding', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },

  ];

  checklist2 = [
    { ID: 'C21', REQUIRED_Installation: 'Rope Cutouts Provided In Floor Slab of Machine Room', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C22', REQUIRED_Installation: 'Safe Staircase , Door, Lighting , Exhaust-Fan Provided in M/C Room', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C23', REQUIRED_Installation: 'Plastering of Walls & Roof Completed in Machine Room', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C24', REQUIRED_Installation: 'White Washing / Painting Completed in Machine Room', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },


  ];

  checklist3 = [
    { ID: 'C25', REQUIRED_Installation: 'Cladding / Architraves provided on all Lift Door Entrances', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C26', REQUIRED_Installation: 'Buffer Block ( RCC ) Provided In Lift Pit as per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C27', REQUIRED_Installation: 'FINAL Finish / W/Washing / Painting Completed in Lift Shaft / MR', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'C28', REQUIRED_Installation: 'Pit Ladder Provided in Lift Pit ( Required where Pit Depth > / = 1350 mm )', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E4', REQUIRED_Installation: '3 Phase Power + Double Earthing + MCB + RCCB Provided As Per GAD', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E5', REQUIRED_Installation: 'Exhaust Fan Provided IN Lift Well or M/C Room', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E6', REQUIRED_Installation: 'Earthing Bracket Provided Near Lift Controller', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E7', REQUIRED_Installation: 'Double Earthing Terminated On Earthing Bracket ( VERY CRITICAL )', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E8', REQUIRED_Installation: 'Fire Extinguisher Provided near Lift Controller', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E9', REQUIRED_Installation: 'Danger Plate (440 V) Provided on Controller', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E10', REQUIRED_Installation: 'Proper Lighting Working in Lift shaft', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E11', REQUIRED_Installation: 'Louvers Provided on Smoke Vent in Lift Shaft', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
    { ID: 'E12', REQUIRED_Installation: 'Louvers Provided on Exhaust Fan', NA: false, Done: false, When: '', Plan01: '', Plan02: '', Plan03: '', Plan04: '', AllPlan: '' },
  ];


  Specs = [
    {
      Pax: '',
      kg: '',
      Stops: '',
      Speed: '',
      Pit_GAD: '',
      Pit_SITE: '',
      Travel_GAD: '',
      Travel_SITE: '',
      OH_GAD: '',
      OH_SITE: '',
      SH_GAD: '',
      SH_SITE: '',
    },

  ];

  Stops_Counting = [
    {
      Floor_Markings: '',
      Front_Openings: '',
      Back_Openings: '',
      Left_Right_Openings: '',
      Floor_to_Floor: '',
      As_per_GAD: '',
    }
  ]



  editChecklist: EditChecklist = {
    CUSTOMER_SCOPE_LIFTNO: '',
    CUSTOMER_SCOPE_TOWER: '',
    SUPERVISOR_NAME: '',
    ORDER_NUMBER: '',
    PROJECT_NAME: '',
    SITE_ADDRESS: '',
    TYPE_OF_LIFT: '',
    TYPE_OF_DOORS: '',
    DATE_OF_VISIT: '',
    SITE_READY_UP_TO_WHICH_FLOOR: '',
    EXPECTED_SITE_READY_DATE: '',
    SIGNATURE: '',
    CUSTOMER_REP_NAME: '',
    MOBILE_NO: '',
    CheckList1: [],
    CheckList2: [],
    CheckList3: [],
    Scope_Job_Name: '',
    Scope_Lift_No: '',
    Scope_Order_Date: '',
    Scope_EASA_Job_No: '',
    Scope_Site_address: '',
    Scope_Tower: '',
    Scope_Type_of_Drive: '',
    Scope_Type_of_Lift: '',
    Scope_Type_of_Door: '',
    Scope_Date_of_Visit: '',
    Scope_Site_Ready_up_to_Which_Floor: '',
    Scope_Expected_Site_Ready_Date: '',
    Scope_Supervisor: '',
    Scope_Signature: '',
    Scope_Customer_Rep_Name: '',
    Scope_Mobile_No: '',
    Specs: [],
    Stops_Counting: [],
    CreatedBy: '',
    Opp_Id: '',
    Stage_Id: ''

  }


  PreNiChecklist: PreNIChecklist = {
    CUSTOMER_SCOPE_LIFTNO: '',
    CUSTOMER_SCOPE_TOWER: '',
    SUPERVISOR_NAME: '',
    ORDER_NUMBER: '',
    PROJECT_NAME: '',
    SITE_ADDRESS: '',
    TYPE_OF_LIFT: '',
    TYPE_OF_DOORS: '',
    DATE_OF_VISIT: '',
    SITE_READY_UP_TO_WHICH_FLOOR: '',
    EXPECTED_SITE_READY_DATE: '',
    SIGNATURE: '',
    CUSTOMER_REP_NAME: '',
    MOBILE_NO: '',
    CheckList1: [],
    CheckList2: [],
    CheckList3: [],
    Scope_Job_Name: '',
    Scope_Lift_No: '',
    Scope_Order_Date: '',
    Scope_EASA_Job_No: '',
    Scope_Site_address: '',
    Scope_Tower: '',
    Scope_Type_of_Drive: '',
    Scope_Type_of_Lift: '',
    Scope_Type_of_Door: '',
    Scope_Date_of_Visit: '',
    Scope_Site_Ready_up_to_Which_Floor: '',
    Scope_Expected_Site_Ready_Date: '',
    Scope_Supervisor: '',
    Scope_Signature: '',
    Scope_Customer_Rep_Name: '',
    Scope_Mobile_No: '',
    Specs: [],
    Stops_Counting: [],
    CreatedBy: '',
    Opp_Id: '',
    Stage_Id: ''

  }

  Completestages: CompleteStages[] = [];
  Completetage: CompleteStages = {
    Remarks: '',
    Status: 'sos_Sold',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    Opp_Id: ''
  };

  contactPersoneList: any;
  selectedDay: any;
  UserId: any;
  role: any;
  reportingTo: any;
  curntDate: any;
  CreatedDate: any
  opportunityAttach: OppoAttach = {
    Attach: '',
    oppId: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),

  }

  urlcheck: any;
  opporid: any;
  cardName: any;
  FileAttachment: any
  // numOfStops: number = 0;
  stops: any[] = [];
  stop: number = 0
  bridgess: Bridge[] = [];
  upperReportingData: any[] = []
  checkboxStates: boolean[][] = [];
  SalesEmployeeCode: any
  loginRole: any
  @ViewChild('f') form!: NgForm;
  accesstoken: any;
  CampaignFrequency: any;
  TaskProgressStatus: any;
  OrderStage: any;
  Headingss: any[] = [];
  commonObj: any = { isContact: true, bpAddreassMerge: null, detailTab: 'Items', activityTab: 'event' };
  ticketsAll: any[] = [];
  savedModules: any[] = [];
  stageID: any
  stage2ID: any
  stage3ID: any
  stage4ID: any
  stage5ID: any
  stage6ID: any
  stage7ID: any
  stage8ID: any
  stage9ID: any
  stage10ID: any
  AddFollow2: AddFollow2 = { "Subject": "", "Mode": "", "Comment": "", "CreateDate": this.HeadingServices.getDate(), "CreateTime": this.HeadingServices.getTime(), "Emp": '', "Emp_Name": "", "From": this.HeadingServices.getDate(), "SourceID": "82", "SourceType": "", "Time": this.HeadingServices.getTime(), "Type": "Followup", "leadType": '' };
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef,
    private _NotifierService: NotiferService, private HeadingServices: HeadingServicesService, private route: Router, private bridgeService2: BridgeService, private router: ActivatedRoute, private http: HttpClient,
    private routers: Router, private _location: Location) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;
  }

  ngOnInit(): void {
    this.initializeCheckboxStates();
    // setTimeout(()=>{
    this.getChecklistDetails();
    // }, 3000);



    this.scrollToBottom();
    this.getleadFollow2();
    this.getBridge();
    this.getUpperReporting()
    this.SalesEmployeeCode = sessionStorage.getItem('SalesEmployeeCode');
    this.loginRole = sessionStorage.getItem('role');
    console.log('check role', this.loginRole);

    console.log('check code', this.SalesEmployeeCode);

    this.accesstoken = '&token=' + sessionStorage.getItem('accesstoken');
    this.commonObj.addonsTabsActivity = '';
    this.bridgeService2.autoCall();
    this.CampaignFrequency = this.bridgeService2.CampaignFrequency;
    this.TaskProgressStatus = this.bridgeService2.TaskProgressStatus;
    this.OrderStage = this.bridgeService2.OrderStage;
    this.curntDate = this.HeadingServices.getDate();

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule4();
    if (this.UserName == undefined) {
      this.route.navigate(['/login']);
    }
    this.router.params.subscribe(params => {
      this.idd = params['id'];
      if (this.idd != undefined) {
        this.loadData();
      }
    });

    this.idd = this.router.snapshot.params.id;
    this.getOpportunity(this.idd);
    this.getStages();
    this.getActivity();
    this.getLead();
    this.getQuotationList();
    this.getOrderList();
    this.getDynaimcFld('opportunity');
    this.getAllOrdersList();

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".hover-show12");
      if (!$('.edit-delete').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.hide();
      }
    });

    this.Activitys.Repeated = '';
    this.Activitys.Participants = '';
    var priviousUrl = this.bridgeService2.getPreviousUrl();
    this.urlcheck = priviousUrl.split('/');
    if (this.urlcheck[1] === 'opportunity') {
      this.opporid = this.bridgeService2.getBpCardcode();
    }


    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }

  }

  getChecklistDetails() {
    this.bridgeService2.getCheckListData(this.router.snapshot.params.id).subscribe(
      (res: any) => {
        console.log('check resp', res);
        if (Object(res)['status'] == "200") {
          this.editChecklist = res.data[0];
          this.checklist1 = res.data[0]?.CheckList1; // Assign checklist data
          this.checklist2 = res.data[0]?.CheckList2; // Assign checklist data
          this.checklist3 = res.data[0]?.CheckList3; // Assign checklist data
          this.Specs = res.data[0]?.Specs; // Assign checklist data
          // this.Stops_Counting = res.data[0].Stops_Counting
          if (Array.isArray(res.data[0]?.Stops_Counting)) {
            this.Stops_Counting = res.data[0].Stops_Counting.map((item: any) => ({
              ...item,
              Floor_Markings: item.Floor_Markings === "true" || item.Floor_Markings === true,
              Front_Openings: item.Front_Openings === "true" || item.Front_Openings === true,
              Back_Openings: item.Back_Openings === "true" || item.Back_Openings === true,
              Left_Right_Openings: item.Left_Right_Openings === "true" || item.Left_Right_Openings === true
            }));
            console.log('check stops', this.Stops_Counting);

          } else {
            this.Stops_Counting = [];
          }
          this.cd.detectChanges(); // Force Angular to detect changes


          console.log("Processed Stops_Counting:", JSON.stringify(this.Stops_Counting, null, 2));


          // this.isChecklistData = res.data.length ;
          if (res.data.length) {
            this.isChecklistData = true
          }
          else {
            this.isChecklistData = false
          }
          console.log('check data', this.isChecklistData);
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


  calculateGAP() {
    const offer = this.firstCallOfferPrice || 0;
    const generic = this.Negotiation1stage.GenericPrice || 0;
    this.genericPriceValue = offer - generic;
    this.Negotiation1stage.GAP = this.genericPriceValue
    console.log('generic price ', this.genericPriceValue);

  }

  getDynaimcFld(name: any) {
    this.bridgeService2.GetDynamicFld(name).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.DynamicFiledPositionDetials = res.data;
          for (let i = 0; i < this.DynamicFiledPositionDetials.length; i++) {
            this.opportunitys[this.DynamicFiledPositionDetials[i].field_name] = '';
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

  loadData(): void {
    this.getOpportunity(this.idd)
  }
  getQuotationList(): void {
    this.bridgeService2.getQuotationShortdata().subscribe(
      (data: Quotation[]) => {
        this.quotationsList = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getOrderList(): void {
    this.bridgeService2.getOrderShortdata().subscribe(
      (data: Orders[]) => {
        this.ordersList = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  getLead(): void {
    this.isLoading = true;
    this.bridgeService2.getLeadShortdata().subscribe(
      (data: Bridge2[]) => {
        this.bridges2 = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }

  Opportunity_name: any;
  opportunitytype: any[] = [];
  total_after: any;
  total_Amount: any;
  getoppoAttach: any[] = [];
  customers: any[] = [];
  Items: any[] = [];
  Allopportunitys: any[] = [];
  AllQuotations: any[] = [];
  AllOrders: any[] = [];
  AllOrdersList: any[] = []
  Sname: any;
  sid: any;
  lastStage: any;

  total_before: any = 0;
  total_after_tax: any = 0;
  tax_Value: any = 0;
  getOpportunity(idd: any): void {
    this.isLoading = true;
    this.idd = idd;
    this.bridgeService2.getOneOpportunitydata(this.idd).subscribe(
      (data: oneopportunity[]) => {
        this.isLoading = false;
        var totalamount = new Array;
        this.opportunitys = data;
        this.Changestage.ProjectName = this.opportunitys[0].OpportunityName
        this.CreatedDate = this.opportunitys[0].StartDate
        this.Contactperson = this.opportunitys[0].ContactPersonName
        // this.contactEmail = this.opportunitys[0].EmailAddress
        // this.contactNumber = this.opportunitys[0].Phone1
        this.getoppoAttach = data[0].Attach;
        this.selectedDay = this.opportunitys[0]['CardCode'];
        this.Opportunity_name = this.opportunitys[0]['OpportunityName'];
        this.Items = this.opportunitys[0]['OppItem']
        this.getCustomer(this.selectedDay);

        this.total_after = 0;
        this.total_after_tax = 0;
        this.tax_Value = 0;
        this.total_Amount = 0;
        for (let i = 0; i < this.opportunitys[0]['OppItem'].length; i++) {
          // var total=(this.opportunitys[0]['OppItem'][i].Quantity
          var basic = Number(this.opportunitys[0]['OppItem'][i].Quantity) * Number(this.opportunitys[0]['OppItem'][i].UnitPrice);
          var afterfdis = basic - (basic * (Number(this.opportunitys[0]['OppItem'][i].DiscountPercent) / 100))
          var aftersdis = afterfdis - (afterfdis * (Number(0) / 100))
          var total = aftersdis + (aftersdis * (Number(this.opportunitys[0]['OppItem'][i].Tax) / 100))
          totalamount.push(total);
          this.total_after += afterfdis;
          this.total_after_tax += aftersdis;
          this.tax_Value += (aftersdis * (Number(this.opportunitys[0]['OppItem'][i].Tax) / 100));
        }
        this.total_Amount = totalamount.reduce((a: any, b: any) => a + Number(b), 0);

        // Contact Person
        this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
          });

        // Opportunity
        this.getAllOpportunity(this.selectedDay);


        // Quotation
        this.getAllQuotation(this.idd);

        // Quotation
        this.getAllOrder(this.idd);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }


    );
  }
  getAllOpportunity(CardCode: any): void {
    this.bridgeService2.getOpportunityByPagination({ PageNo: 1, maxItem: 'All', }, '', { CardCode: CardCode }, 'id', 'desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.Allopportunitys = data.data;
        }

        else {
          this._NotifierService.showError(data.message);
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

  getAllQuotation(OppID: any): void {
    this.bridgeService2.getQuotationByPagination({ PageNo: 1, maxItem: 'All', }, '', { OppID: OppID }, 'id', 'desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.AllQuotations = data.data;
        }

        else {
          this._NotifierService.showError(data.message);
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

  getAllOrder(OppID: any): void {
    this.bridgeService2.getOrderByPagination({ PageNo: 1, maxItem: 'All', }, '', { OppID: OppID }, 'id', 'desc').subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.AllOrders = data.data;
        }

        else {
          this._NotifierService.showError(data.message);
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
  getCustomer(Cidd: any): void {
    this.bridgeService2.getOneCustomerdata(Cidd).subscribe((data: any) => {
      this.customers = data;
      this.SiteCity = this.customers[0].BPAddresses[1].City
      this.SiteZipcode = this.customers[0].BPAddresses[1].ZipCode
      this.SiteState = this.customers[0].BPAddresses[1].State
      this.SiteAddress = this.customers[0].BPAddresses[1].AddressName

      this.contactEmail = this.customers[0].EmailAddress
      console.log('check email ', this.contactEmail);

      this.contactNumber = this.customers[0].Phone1
      console.log('check email ', this.contactNumber);



    },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  createQuptation(id: any, type: any) {
    if (type == 'Order') {
      this.bridgeService2.setOpportunityID(id);
      this.bridgeService2.setAllFilter('', undefined);
      this.route.navigate(['/order/add-order']);
    }
    else {
      // this.bridgeService2._quotation(item);
      this.bridgeService2.setOpportunityID(id);
      this.bridgeService2.setAllFilter('', undefined);
      this.route.navigate(['/quotation/add-quotation']);
    }
  }
  current_stage_number: any;
  current_stage_name: any;
  current_stage_Status: any;
  current_stage_comment: any;
  current_stage_opp_status: any;
  current_stage_StartDate: any;
  CabinInteriorFinishVal: any;
  Stage1Name: any
  StageName: any
  ProjectName: any
  BillingName: any

  KeyDecisionMaker: any

  keyDecisionMakerMobile: any
  keyDecisionMakerEmail: any
  PmMobile: any
  PmEmail: any
  personFromPurchaseMobile: any
  personFromPurchaseEmail: any
  architectEmail: any
  builderEmail: any
  contractorEmail: any
  interiorDesignerEmail: any

  PMName: any

  Name: any

  PersonFromPurchase: any
  BillingAddress: any
  ShippingAddress: any
  ArchitectName: any
  ArchitectNumber: any
  BuilderName: any
  BuilderNumber: any
  contactEmail: any
  ContractorNumber: any
  ContractorName: any
  InteriorDesignerName: any
  InteriorDesignerNumber: any
  Space: any
  InstallationPlace: any
  StructureRequired: any
  TimePeriodForLiftRequirement: any
  TypeLiftRequired: any
  TypeOfProperty: any
  SpecificNeed: any
  TypeOfMaterialToBeTransported: any
  TypeOfIndustry: any
  Capacity: any
  MR_MRL: any
  CabinDepth: any
  CabinWidth: any
  CabinHeight: any
  DoorWidth: any
  DoorHeight: any
  CabinInteriorFinish: any
  DoorFinish: any
  DoorType: any
  OpeningSided: any
  PitDepth: any
  OverHead: any
  TotalTravel: any
  NonStandardFeature: any
  Remarks: any
  NumberOfOpening: any
  AppointmentBooking: any
  CustomizationsIfAny: any
  BuddyUp: any
  OfferedPrice: any
  ProcessFlowPresented: any
  CatalogHandover: any
  FinalRGFSentToClient: any
  DrawingToBeSharedBy: any
  DrawingToBeSharedByID: any
  DrawingAttachment: any
  NumberOfStopImpactMeeting: any
  OpeningImpactMeeting: any
  SitePicture: any
  BDMPictures: any
  PhysicalCopyOfRGF: any
  DrawingSharedFile: any
  RemarksStage3: any
  TechnicalPPTShared: any
  DrawingShared: any
  AnyUpdation: any
  DrawingAttachmentTechMeeting: any
  PersonDoingNegotiation: any
  ApprovedByNego1: any
  ApprovalSalesEmployeeName: any
  disableApprove: boolean = false
  RemarksStage4: any
  GAP: any
  DiscussionOverPrice: any
  Negotiation1Price: any
  GenericPrice: any
  OfferPrice: any
  Negotiation3: any
  RemarksStage5: any
  Negotiation2Price: any
  Negotiation3Price: any
  finalAttachmentNego2: any
  finalAttachmentFileNego2: any
  RemarksStage6: any
  RemarksNego3: any
  finalAttachmentNegotiation3: any
  finalAttachmentFileNego3: any
  finalAttachmentClosure: any
  finalAttachmentClosureName: any
  RemarksStage7: any
  SignedQuote: any
  PaymentProof: any
  LOIAttachment: any
  HandoverForm: any
  PreNIChecklist: any
  PreNIChecklist_File: any
  Handover: any
  MOM: any
  OrderName: any
  FinanceApproval: any
  RemarksStage8: any
  EquipmentNumber: any
  PCHApproval: any
  current_stage_EndDate: any;
  current_stage_DocId: any = '';
  stagenumber: any;
  SiteCity: any;
  SiteZipcode: any;
  SiteState: any;
  SiteAddress: any;
  offerPrice: any;
  // contactEmail:any;
  contactNumber: any;

  goToPage(name: any, idd: any) {
    this.bridgeService2.setAllFilter('', undefined);
    if (name == 'Lead') {
      this.routers.navigate(['/leads/table/lead-details/' + idd]);
    }
    else if (name == 'Order') {
      this.routers.navigate(['/order/order-details/' + idd]);
    }
    else {
      this.routers.navigate(['/quotation/quotation-details/' + idd]);
    }
  }
  current_active_stage: any;
  getStages(): void {
    this.idd = this.router.snapshot.params.id;
    this.bridgeService2.getStagedata(this.idd).subscribe(
      (data: any[]) => {
        this.stages = data;
        this.firstStageNoOfStops = this.stages[0].StageDetail[0]?.NumberOfStop
        this.firstCallOfferPrice = this.stages[0].StageDetail[0]?.OfferPrice

        this.nego1PersonDoingNegotiation = this.stages[3].StageDetail[0]?.PersonDoingNegotiation
        console.log('check person doing nego ', this.nego1PersonDoingNegotiation);
        this.nego1Negotiation1Remarks = this.stages[3].StageDetail[0]?.Remarks
        this.nego1GenericPrice = this.stages[3].StageDetail[0]?.GenericPrice
        this.nego1OfferPrice = this.stages[3].StageDetail[0]?.OfferPrice
        this.nego1GAP = this.stages[3].StageDetail[0]?.GAP
        this.nego1DiscussionOverPrice = this.stages[3].StageDetail[0]?.DiscussionOverPrice
        this.nego1ApprovedBy = this.stages[3].StageDetail[0]?.ApprovedBy


        this.nego1ApprovalStatus = this.stages[3].StageDetail[0]?.ApprovalStatus
        this.nego1Negotiation1Price = this.stages[3].StageDetail[0]?.Negotiation1Price
        this.nego2Remarks = this.stages[4].StageDetail[0]?.Remarks
        this.calculateGAP();
        for (let i = 0; i < this.stages.length; i++) {
          // this.lastStage = this.stages[i]['Status'];
          if (this.stages[i]['Status'] == 2 || this.stages[i]['Status'] == 3) {
            this.stages[i]['Class'] = 'first-stage';
            this.stages[i]['Color'] = 'complete-stage';
            this.Sname = this.stages[i]['Name'];
            this.current_stage_comment = this.stages[i]['Comment'];

            if (this.stages[0]) {
              this.stageID = this.stages[0].StageDetail[0]?.['id']
              this.StageName = this.stages[i].StageDetail[0]?.['Name']
              this.CabinInteriorFinishVal
                = this.stages[0].StageDetail[0]?.['CabinInteriorFinish'];

              this.Stage1Name
                = this.stages[0].StageDetail[0]['Name'];
              this.DoorFinish
                = this.stages[0].StageDetail[0]['DoorFinish'];
              this.ProjectName
                = this.stages[0].StageDetail[0]['ProjectName']
              this.BillingName
                = this.stages[0].StageDetail[0]['BillingName']
              this.KeyDecisionMaker
                = this.stages[0].StageDetail[0]['KeyDecisionMaker']

              // new keys
              this.keyDecisionMakerMobile
                = this.stages[0].StageDetail[0]['keyDecisionMakerMobile']
              this.keyDecisionMakerEmail
                = this.stages[0].StageDetail[0]['keyDecisionMakerEmail']
              this.PmMobile
                = this.stages[0].StageDetail[0]['PmMobile']
              this.PmEmail
                = this.stages[0].StageDetail[0]['PmEmail']
              this.personFromPurchaseMobile
                = this.stages[0].StageDetail[0]['personFromPurchaseMobile']
              this.personFromPurchaseEmail
                = this.stages[0].StageDetail[0]['personFromPurchaseEmail']
              this.architectEmail
                = this.stages[0].StageDetail[0]['architectEmail']
              this.builderEmail
                = this.stages[0].StageDetail[0]['builderEmail']
              this.contractorEmail
                = this.stages[0].StageDetail[0]['contractorEmail']
              this.interiorDesignerEmail
                = this.stages[0].StageDetail[0]['interiorDesignerEmail']

              this.PMName
                = this.stages[0].StageDetail[0]['PMName']
              this.PersonFromPurchase
                = this.stages[0].StageDetail[0]['PersonFromPurchase']
              this.BillingAddress
                = this.stages[0].StageDetail[0]['BillingAddress']
              this.ShippingAddress
                = this.stages[0].StageDetail[0]['ShippingAddress']
              this.ArchitectNumber
                = this.stages[0].StageDetail[0]['ArchitectNumber']
              this.ArchitectName
                = this.stages[0].StageDetail[0]['ArchitectName']
              this.BuilderName
                = this.stages[0].StageDetail[0]['BuilderName']
              this.BuilderNumber
                = this.stages[0].StageDetail[0]['BuilderNumber']
              this.CabinDepth
                = this.stages[0].StageDetail[0]['CabinDepth']

              this.CabinHeight
                = this.stages[0].StageDetail[0]['CabinHeight']
              this.CabinWidth
                = this.stages[0].StageDetail[0]['CabinWidth']
              this.contactEmail
                = this.stages[0].StageDetail[0]['contactEmail']
              this.ContractorNumber
                = this.stages[0].StageDetail[0]['ContractorNumber']

              this.ContractorName
                = this.stages[0].StageDetail[0]['ContractorName']
              this.DoorWidth
                = this.stages[0].StageDetail[0]['DoorWidth']
              this.DoorHeight
                = this.stages[0].StageDetail[0]['DoorHeight']

              this.InteriorDesignerName
                = this.stages[0].StageDetail[0]['InteriorDesignerName']
              this.InteriorDesignerNumber
                = this.stages[0].StageDetail[0]['InteriorDesignerNumber']
              this.Space
                = this.stages[0].StageDetail[0]['Space']
              this.InstallationPlace
                = this.stages[0].StageDetail[0]['InstallationPlace']
              this.StructureRequired
                = this.stages[0].StageDetail[0]['StructureRequired']
              this.TimePeriodForLiftRequirement
                = this.stages[0].StageDetail[0]['TimePeriodForLiftRequirement']
              this.TypeLiftRequired
                = this.stages[0].StageDetail[0]['TypeLiftRequired']

              this.TypeOfProperty
                = this.stages[0].StageDetail[0]['TypeOfProperty']

              this.SpecificNeed
                = this.stages[0].StageDetail[0]['SpecificNeed']

              this.TypeOfMaterialToBeTransported
                = this.stages[0].StageDetail[0]['TypeOfMaterialToBeTransported']
              this.TypeOfIndustry
                = this.stages[0].StageDetail[0]['TypeOfIndustry']
              this.Capacity
                = this.stages[0].StageDetail[0]['Capacity']

              this.MR_MRL
                = this.stages[0].StageDetail[0]['MR_MRL']

              this.DoorType
                = this.stages[0].StageDetail[0]['DoorType']

              this.OpeningSided
                = this.stages[0].StageDetail[0]['OpeningSided']

              this.PitDepth
                = this.stages[0].StageDetail[0]['PitDepth']
              this.OverHead
                = this.stages[0].StageDetail[0]['OverHead']
              this.TotalTravel
                = this.stages[0].StageDetail[0]['TotalTravel']
              this.NonStandardFeature
                = this.stages[0].StageDetail[0]['NonStandardFeature']

              this.Remarks
                = this.stages[0].StageDetail[0]['Remarks']
              this.NumberOfStop
                = this.stages[0].StageDetail[0]['NumberOfStop']
              this.NumberOfOpening
                = this.stages[0].StageDetail[0]['NumberOfOpening']
              this.AppointmentBooking
                = this.stages[0].StageDetail[0]['AppointmentBooking']
              this.SiteCity
                = this.stages[0].StageDetail[0]['SiteCity']
              this.SiteState
                = this.stages[0].StageDetail[0]['SiteState']
              this.SiteZipcode
                = this.stages[0].StageDetail[0]['SiteZipcode']
              this.FileAttachment
                = this.stages[0].StageDetail[0]['File_data']
              console.log('check filedata', this.FileAttachment);

              this.SiteAddress
                = this.stages[0].StageDetail[0]['SiteAddress']
              this.OfferPrice
                = this.stages[0].StageDetail[0]['OfferPrice']

            }

            if (this.stages[1]) {
              this.stage2ID = this.stages[1].StageDetail[0]?.['id']

              // stage10ID


              this.CustomizationsIfAny
                = this.stages[1].StageDetail[0]?.['CustomizationsIfAny']
              this.BuddyUp
                = this.stages[1].StageDetail[0]?.['BuddyUp']
              this.OfferedPrice
                = this.stages[1].StageDetail[0]?.['OfferedPrice']
              this.ProcessFlowPresented
                = this.stages[1].StageDetail[0]?.['ProcessFlowPresented']
              this.CatalogHandover
                = this.stages[1].StageDetail[0]?.['CatalogHandover']
              this.FinalRGFSentToClient
                = this.stages[1].StageDetail[0]?.['FinalRGFSentToClient']
              this.DrawingToBeSharedBy
                = this.stages[1].StageDetail[0]['DrawingToBeSharedBy_Detail'][0]?.SalesEmployeeName
              console.log('check ', this.DrawingToBeSharedBy);
              this.DrawingToBeSharedByID
                = this.stages[1].StageDetail[0]['DrawingToBeSharedBy_Detail'][0]?.SalesEmployeeCode
              console.log('check ', this.DrawingToBeSharedBy);


              this.DrawingAttachment

                = this.stages[1].StageDetail[0]?.['DrawingAttachment']
              this.NumberOfStopImpactMeeting
                = this.stages[1].StageDetail[0]?.['NumberOfStop']
              this.OpeningImpactMeeting
                = this.stages[1].StageDetail[0]?.['Opening']

              this.SitePicture

                = this.stages[1].StageDetail[0]?.['SitePicture']
              this.BDMPictures

                = this.stages[1].StageDetail[0]?.['BDMPictures']
              this.PhysicalCopyOfRGF

                = this.stages[1].StageDetail[0]?.['PhysicalCopyOfRGF']
            }
            if (this.stages[2]) {
              this.stage3ID = this.stages[2].StageDetail[0]?.['id']

              this.RemarksStage3
                = this.stages[2].StageDetail[0]?.['Remarks']
              this.TechnicalPPTShared
                = this.stages[2].StageDetail[0]?.['TechnicalPPTShared']
              this.DrawingShared
                = this.stages[2].StageDetail[0]?.['DrawingShared']
              this.AnyUpdation
                = this.stages[2].StageDetail[0]?.['AnyUpdation']
              this.DrawingAttachmentTechMeeting
                = this.stages[2].StageDetail[0]?.['File_data'][0]?.File
              this.DrawingSharedFile = this.stages[2].StageDetail[0]?.['File_data']
            }
            if (this.stages[3]) {
              this.stage4ID = this.stages[3].StageDetail[0]?.['id']

              this.RemarksStage4
                = this.stages[3].StageDetail[0]?.['Remarks']

              this.PersonDoingNegotiation
                = this.stages[3].StageDetail[0]?.['PersonDoingNegotiation']
              this.GAP
                = this.stages[3].StageDetail[0]?.['GAP']
              this.DiscussionOverPrice
                = this.stages[3].StageDetail[0]?.['DiscussionOverPrice']
              this.Negotiation1Price
                = this.stages[3].StageDetail[0]?.['Negotiation1Price']
              // this.OfferPriceNego1
              // = this.stages[3].StageDetail[0]['Negotiation1Price']
              this.ApprovedByNego1
                = this.stages[3].StageDetail[0]?.['ApprovedBy']
              this.ApprovalSalesEmployeeName
                = this.stages[3].StageDetail[0]?.['ApprovedBy_Detail']?.[0].SalesEmployeeName
              if (this.ApprovalSalesEmployeeName) {
                this.disableApprove = true
              }
              else {
                this.disableApprove = false
              }
              this.GenericPrice
                = this.stages[3].StageDetail[0]?.['GenericPrice']

            }
            if (this.stages[4]) {
              this.stage5ID = this.stages[4].StageDetail[0]?.['id']

              this.RemarksStage5
                = this.stages[4].StageDetail[0]?.['Remarks']
              this.Negotiation2Price
                = this.stages[4].StageDetail[0]?.['Negotiation2Price']

              this.Negotiation3
                = this.stages[4].StageDetail[0]?.['Negotiation3']
              this.finalAttachmentNego2
                = this.stages[4].StageDetail[0]?.['File_data'][0]?.File
              this.finalAttachmentFileNego2 = this.stages[4].StageDetail[0]?.['File_data']




            }



            if (this.stages[5] && this.stages[5].Name === 'Negotiation 3') {
              this.stage6ID = this.stages[5].StageDetail[0]?.['id']

              this.RemarksNego3
                = this.stages[5].StageDetail[0]?.['Remarks']
              this.Negotiation3Price
                = this.stages[5].StageDetail[0]?.['Negotiation3Price']
              this.finalAttachmentNegotiation3
                = this.stages[5].StageDetail[0]?.['File_data'][0]?.File
              this.finalAttachmentFileNego3 = this.stages[5].StageDetail[0]?.['File_data']
              console.log('inside ');


            }
            if (this.stages[6] && this.stages[6].Name === 'Closure') {
              this.stage7ID = this.stages[6].StageDetail[0]?.['id']

              this.RemarksStage6
                = this.stages[6].StageDetail[0]?.['Remarks']
              this.PCHApproval
                = this.stages[6].StageDetail[0]?.['PCHApproval']
              this.finalAttachmentClosure
                = this.stages[6].StageDetail[0]?.['File_data']


            }
            if (this.stages[5] && this.stages[5].Name === 'Closure') {
              this.stage7ID = this.stages[5].StageDetail[0]?.['id']

              this.RemarksStage6
                = this.stages[5].StageDetail[0]?.['Remarks']
              this.PCHApproval
                = this.stages[5].StageDetail[0]?.['PCHApproval']
              this.finalAttachmentClosure
                = this.stages[5].StageDetail[0]?.['File_data']
              this.finalAttachmentClosureName
                = this.stages[6].StageDetail[0]?.['File_data']?.[0].File
            }

            if (this.stages[6] && this.stages[6].Name === 'Order Booking') {
              console.log('check stage 6');
              this.stage8ID = this.stages[6].StageDetail[0]?.['id']

              this.RemarksStage7
                = this.stages[6].StageDetail[0]?.['Remarks']
              this.LOIAttachment = this.stages[6].StageDetail[0]?.['LOI']
              this.PaymentProof = this.stages[6].StageDetail[0]?.['PaymentProof']
              this.SignedQuote = this.stages[6].StageDetail[0]?.['SignedQuote']


            }
            if (this.stages[7] && this.stages[7].Name === 'Order Booking') {
              this.stage8ID = this.stages[7].StageDetail[0]?.['id']

              this.RemarksStage7
                = this.stages[7].StageDetail[0]?.['Remarks']
              this.LOIAttachment = this.stages[7].StageDetail[0]?.['LOI']
              this.PaymentProof = this.stages[7].StageDetail[0]?.['PaymentProof']
              this.SignedQuote = this.stages[7].StageDetail[0]?.['SignedQuote']


            }

            if (this.stages[8] && this.stages[8].Name === 'Order Confirmation') {
              this.stage9ID = this.stages[8].StageDetail[0]?.['id']

              this.RemarksStage8
                = this.stages[8].StageDetail[0]?.['Remarks']
              this.FinanceApproval
                = this.stages[8].StageDetail[0]?.['FinanceApproval']
              this.OrderName
                = this.stages[8].StageDetail[0]?.['OrderName']
              this.EquipmentNumber
                = this.stages[8].StageDetail[0]?.['EquipmentNumber']
            }

            if (this.stages[7] && this.stages[7].Name === 'Order Confirmation') {
              this.stage9ID = this.stages[7].StageDetail[0]?.['id']

              this.RemarksStage8
                = this.stages[7].StageDetail[0]?.['Remarks']
              this.FinanceApproval
                = this.stages[7].StageDetail[0]?.['FinanceApproval']
              this.OrderName
                = this.stages[7].StageDetail[0]?.['OrderName']
              this.EquipmentNumber
                = this.stages[7].StageDetail[0]?.['EquipmentNumber']
            }
            if (this.stages[8] && this.stages[8].Name === 'Sales to pre-NI') {
              this.stage10ID = this.stages[8].StageDetail[0]?.['id']

              this.isPreNiChecklist = this.stages[8].StageDetail[0]?.PreNIChecklist
              console.log('check', this.isPreNiChecklist);
              if (this.isPreNiChecklist === 'yes') {
                this.isPreNiChecklist = true
              }
              else {
                this.isPreNiChecklist = false
              }

              this.preNiChecklistStage = this.stages[8].StageDetail[0]?.id
              this.HandoverForm = this.stages[8].StageDetail[0]?.['HandoverForm']
              this.PreNIChecklist = this.stages[8].StageDetail[0]?.['PreNIChecklist']
              this.PreNIChecklist_File = this.stages[8].StageDetail[0]?.['PreNIChecklist_File']
              this.Handover = this.stages[8].StageDetail[0]?.['Handover']
              this.MOM = this.stages[8].StageDetail[0]?.['MOM']

              if (this.stages[8].StageDetail[0]?.PreNIChecklist) {
                this.isPreNIList = true
                console.log('check value of pre', this.isPreNIList);

              }
              else {
                this.isPreNIList = false
                console.log('check value of pre', this.isPreNIList);
              }


            }
            if (this.stages[9] && this.stages[9].Name === 'Sales to pre-NI') {
              this.stage10ID = this.stages[9].StageDetail[0]?.['id']

              this.isPreNiChecklist = this.stages[9].StageDetail[0]?.PreNIChecklist
              console.log('check', this.isPreNiChecklist);
              if (this.isPreNiChecklist === 'yes') {
                this.isPreNiChecklist = true
              }
              else {
                this.isPreNiChecklist = false
              }

              this.preNiChecklistStage = this.stages[9].StageDetail[0].id
              this.HandoverForm = this.stages[9].StageDetail[0]?.['HandoverForm']
              this.preNiChecklistStage = this.stages[9].StageDetail[0].id
              // this.HandoverForm = this.stages[9].StageDetail[0]?.['HandoverForm']
              this.PreNIChecklist = this.stages[9].StageDetail[0]?.['PreNIChecklist']
              this.PreNIChecklist_File = this.stages[9].StageDetail[0]?.['PreNIChecklist_File']

              console.log('chekc file pre ni', this.PreNIChecklist_File);

              this.Handover = this.stages[9].StageDetail[0]?.['Handover']
              this.MOM = this.stages[9].StageDetail[0]?.['MOM']
              if (this.stages[9].StageDetail[0].PreNIChecklist) {
                this.isPreNIList = true
                console.log('check value of pre', this.isPreNIList);

              }
              else {
                this.isPreNIList = false
                console.log('check value of pre', this.isPreNIList);
              }


            }
            this.current_stage_EndDate = this.stages[i]['EndDate'];
            this.current_stage_Status = this.stages[i]['Status'];
            console.log('check status of stagge', this.current_stage_Status);

          }
          else if (this.stages[i]['Status'] == '1') {
            this.stages[i]['Class'] = 'first-stage';
            this.stages[i]['Color'] = 'current-stage';
            this.current_stage_number = this.stages[i]['Stageno'];
            this.current_stage_name = this.stages[i]['Name'];
            this.current_active_stage = this.stages[i]['Name'];
          }
          else {
            this.stages[i]['Class'] = 'second-stage';
            this.stages[i]['Color'] = 'pending-stage';
          }
        }
        // console.log(this.stagenumber);
        // console.log(this.lastStage);

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    setTimeout(() => {
      this.initializeStopsCounting();
    }, 5000);

  }


  initializeCheckboxStates() {
    const rows = 4; // Number of rows (Floor Markings, Front Openings, etc.)
    const stops = this.firstStageNoOfStops || 5; // Default to 5 stops if undefined
    this.checkboxStates = Array.from({ length: rows }, () =>
      Array(stops).fill(false)
    );
  }

  // Function to return an array for Stops
  getStopsArray(): number[] {
    return Array.from({ length: this.firstStageNoOfStops }, (_, i) => i + 1);
  }


  addStage(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    if (f.valid) {
      this.Createstage.Opp_Id = this.router.snapshot.params.id;
      this.bridgeService2.storeStage(this.Createstage).subscribe(
        (res: CreateStages) => {
          if (Object(res)['status'] == '200') {
            // Update the list of cars
            this.Createstages.push(res)
            this._NotifierService.showSuccess('Stage' + " " + this.Headingss[0].heading103 + " " + this.Headingss[0].heading106);
            this.modalService.dismissAll();
            this.ngOnInit();
            f.reset();
          } else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    }

    else {
      // console.log(this.order);
      // console.log(f.value);
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }

  validate(input: any) {
    //console.log('input',input.target.value)

    if (/^\s/.test(input.target.value)) {
      input.target.value = '';
    }
  }

  ActivitysParticipants: any[] = [];
  backClicked() {
    this._location.back();
  }
  addActivityEvents(f: NgForm) {

    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.Activitys.SourceID = this.idd;
    this.Activitys.Emp = this.UserId;
    this.Activitys.From = this.Activitys.From;
    if (this.ActivitysParticipants.length == 0 && this.Activitys.Type == 'Task') {
      this._NotifierService.showError('Select Participants');
    }
    else {
      if (this.Activitys.Type == 'Task') {
        this.Activitys.Participants = this.ActivitysParticipants.toString();
      }
      else {
        this.Activitys.Participants = '';
      }

      if (f.valid) {

        this.bridgeService2.storeactivity(this.Activitys).subscribe(
          (res: Activity) => {
            if (Object(res)['status'] == "200") {
              this._NotifierService.showSuccess(this.Activitys.Type + ' ' + this.Headingss[0].heading103 + " " + this.Headingss[0].heading106);
              this.modalService.dismissAll();
              this.getActivity();
              f.reset();
            }
            else {
              this._NotifierService.showError(Object(res)['message']);
            }
          },
          (err) => {
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            this._NotifierService.showError(result);

          }
        );
      }
      else {
        for (let i = 0; i < Object.keys(f.value).length; i++) {
          var keyys = Object.keys(f.value)[i];
          if (f.value[keyys].length == 0) {

            if ($("input[name=" + keyys + "]").hasClass('required-fld')) {
              $("input[name=" + keyys + "]").addClass("red-line-border");
              $("input[name=" + keyys + "]").focus();
              $('.help-block').show();
            }
            if ($("select[name=" + keyys + "]").hasClass('required-fld')) {
              $("select[name=" + keyys + "]").addClass("red-line-border");
              $("select[name=" + keyys + "]").focus();
              $('.help-block').show();
            }
            if ($("password[name=" + keyys + "]").hasClass('required-fld')) {
              $("password[name=" + keyys + "]").addClass("red-line-border");
              $("password[name=" + keyys + "]").focus();
              $('.help-block').show();
            }

            if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
              $("textarea[name=" + keyys + "]").addClass("red-line-border");
              $("textarea[name=" + keyys + "]").focus();
              $('.help-block').show();
            }
          }
          else {
            $("input[name=" + keyys + "]").removeClass("red-line-border");
            $("select[name=" + keyys + "]").removeClass("red-line-border");
            $("password[name=" + keyys + "]").removeClass("red-line-border");
            $("textarea[name=" + keyys + "]").removeClass("red-line-border");
          }
        }
      }
    }
  }



  deleteActivity(id: number) {
    if (confirm("Are you want to Delete this Activity ?")) {
      this.resetAlerts();
      this.bridgeService2.deleteActivity(id).subscribe(
        (res) => {
          this.activity = this.activity.filter(function (item) {
            return item['id'] && +item['id'] !== +id;
          });
          // window.location.href = 'users';
          // this.success = 'Deleted successfully';
        },
        (err) => { this.error = err; }
      );
    }
    else {
      // window.location.href = 'users';
    }
  }


  editdeletepop(item: Activity) {
    $('.hover-show' + item.id).toggle();
  }


  editdeletepop1(item: Activity) {
    $('.hover-show' + item.id).toggle();
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
  openEdit(contentEdit: any) {
    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css`, backdrop: 'static' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    // console.log(item);

  }
  openEdit2(contentEdit2: any, Stage: any, state: any) {
    console.log('check nego', this.nego1ApprovedBy);

    if (Stage.Status === 0) {
      return;
    }
    if (Stage.Status == 3 || Stage.Status == 2) {
      this.Changestage.CabinInteriorFinish = this.CabinInteriorFinishVal
      this.Changestage.Name = this.StageName
      this.Changestage.DoorFinish = this.DoorFinish;
      this.Changestage.ProjectName = this.ProjectName;
      this.Changestage.BillingName = this.BillingName;
      this.Changestage.KeyDecisionMaker = this.KeyDecisionMaker;
      this.Changestage.keyDecisionMakerMobile = this.keyDecisionMakerMobile;
      this.Changestage.keyDecisionMakerEmail = this.keyDecisionMakerEmail;
      this.Changestage.PmMobile = this.PmMobile;
      this.Changestage.PmEmail = this.PmEmail;
      this.Changestage.personFromPurchaseMobile = this.personFromPurchaseMobile;
      this.Changestage.personFromPurchaseEmail = this.personFromPurchaseEmail;
      this.Changestage.architectEmail = this.architectEmail;
      this.Changestage.builderEmail = this.builderEmail;
      this.Changestage.contractorEmail = this.contractorEmail;
      this.Changestage.interiorDesignerEmail = this.interiorDesignerEmail;
      this.Changestage.PMName = this.PMName;
      this.Changestage.PersonFromPurchase = this.PersonFromPurchase;
      this.Changestage.BillingAddress = this.BillingAddress;
      this.Changestage.ShippingAddress = this.ShippingAddress;
      this.Changestage.ArchitectNumber = this.ArchitectNumber;
      this.Changestage.ArchitectName = this.ArchitectName;
      this.Changestage.BuilderName = this.BuilderName;
      this.Changestage.BuilderNumber = this.BuilderNumber;
      this.Changestage.CabinDepth = this.CabinDepth;
      this.Changestage.CabinHeight = this.CabinHeight;
      this.Changestage.CabinWidth = this.CabinWidth;
      this.Changestage.ContractorNumber = this.ContractorNumber;
      this.Changestage.ContractorName = this.ContractorName;
      this.Changestage.DoorWidth = this.DoorWidth;
      this.Changestage.DoorHeight = this.DoorHeight;
      this.Changestage.InteriorDesignerName = this.InteriorDesignerName;
      this.Changestage.InteriorDesignerNumber = this.InteriorDesignerNumber;
      this.Changestage.Space = this.Space;
      this.Changestage.InstallationPlace = this.InstallationPlace;
      this.Changestage.StructureRequired = this.StructureRequired;
      this.Changestage.TimePeriodForLiftRequirement = this.TimePeriodForLiftRequirement;
      this.Changestage.TypeLiftRequired = this.TypeLiftRequired;
      this.Changestage.TypeOfProperty = this.TypeOfProperty;
      this.Changestage.SpecificNeed = this.SpecificNeed;
      this.Changestage.TypeOfMaterialToBeTransported = this.TypeOfMaterialToBeTransported;
      this.Changestage.TypeOfIndustry = this.TypeOfIndustry;
      this.Changestage.Capacity = this.Capacity;
      this.Changestage.MR_MRL = this.MR_MRL;
      this.Changestage.DoorType = this.DoorType;
      this.Changestage.OpeningSided = this.OpeningSided;
      this.Changestage.PitDepth = this.PitDepth;
      this.Changestage.OverHead = this.OverHead;
      this.Changestage.TotalTravel = this.TotalTravel;
      this.Changestage.NonStandardFeature = this.NonStandardFeature;
      this.Changestage.Remarks = this.Remarks;
      this.Changestage.NumberOfStop = this.NumberOfStop;
      this.Changestage.NumberOfOpening = this.NumberOfOpening;
      this.Changestage.AppointmentBooking = this.AppointmentBooking;
      this.Changestage.SiteCity = this.SiteCity;
      this.Changestage.SiteState = this.SiteState;
      this.Changestage.SiteZipcode = this.SiteZipcode;
      // this.Changestage.File_data = this.FileAttachment;  
      this.Changestage.SiteAddress = this.SiteAddress;
      this.Changestage.OfferPrice = this.OfferPrice;


      // stage 2
      this.Secondstage.CustomizationsIfAny = this.CustomizationsIfAny;
      this.Secondstage.BuddyUp = this.BuddyUp;
      this.Secondstage.OfferedPrice = this.OfferedPrice;
      this.Secondstage.ProcessFlowPresented = this.ProcessFlowPresented;
      this.Secondstage.CatalogHandover = this.CatalogHandover;
      this.Secondstage.FinalRGFSentToClient = this.FinalRGFSentToClient;
      this.Secondstage.DrawingToBeSharedBy = this.DrawingToBeSharedBy;
      this.Secondstage.NumberOfStop = this.NumberOfStopImpactMeeting;
      this.Secondstage.Opening = this.OpeningImpactMeeting;
      this.Secondstage.DrawingAttachment = this.DrawingAttachment;
      console.log('check drawing to be shared data', this.Secondstage.DrawingAttachment);
      this.Secondstage.SitePicture = this.SitePicture;
      this.Secondstage.BDMPictures = this.BDMPictures;
      this.Secondstage.PhysicalCopyOfRGF = this.PhysicalCopyOfRGF;
      console.log('check BDMPictures to be shared data', this.BDMPictures);

      // stage 3
      this.Thirdstage.TechnicalPPTShared = this.TechnicalPPTShared
      this.Thirdstage.Remarks = this.RemarksStage3
      this.Thirdstage.AnyUpdation = this.AnyUpdation
      this.Thirdstage.DrawingShared = this.DrawingShared
      // this.Thirdstage.File = this.DrawingAttachmentTechMeeting
      if (this.DrawingAttachmentTechMeeting) {
        this.addAttachment = true
      }

      // Stage 4
      this.Negotiation1stage.Remarks = this.RemarksStage4;
      this.Negotiation1stage.PersonDoingNegotiation = this.PersonDoingNegotiation;
      this.Negotiation1stage.GAP = this.GAP;
      this.Negotiation1stage.DiscussionOverPrice = this.DiscussionOverPrice;
      this.Negotiation1stage.Negotiation1Price = this.Negotiation1Price;
      // this.Negotiation1stage.OfferPriceNego1 = this.OfferPriceNego1; // Uncomment if needed
      this.Negotiation1stage.ApprovedBy = this.ApprovedByNego1;
      this.Negotiation1stage.GenericPrice = this.GenericPrice;
      this.Negotiation1stage.ApprovalStatus = this.nego1ApprovalStatus == 0 ? 'Pending' :
        this.nego1ApprovalStatus == 1 ? 'Approved' : 'Rejected'

      // Stage 5

      this.Negotiation2stage.Negotiation3 = this.Negotiation3
      this.Negotiation2stage.Remarks = this.RemarksStage5

      this.Negotiation2stage.Negotiation2Price = this.Negotiation2Price

      this.Negotiation2stage.File = this.Negotiation3


      //stage 6 
      this.Negotiation3stage.Remarks = this.RemarksNego3
      console.log('check remarkssssssssssssss', this.RemarksNego3);
      this.Negotiation3stage.Negotiation3Price = this.Negotiation3Price
      // this.Negotiation3stage.Remarks = this.RemarksNego3


      //stage 7
      this.Closurestage.PCHApproval = this.PCHApproval
      this.Closurestage.Remarks = this.RemarksStage6


      // this.Closurestage.File = this.stages[6].StageDetail[0]?.['File_data'][0].File

      //stage 8
      this.OrderBookingstage.Remarks = this.RemarksStage7

      //order confirmation
      this.OrderConfirmationstage.FinanceApproval = this.FinanceApproval
      this.OrderConfirmationstage.EquipmentNumber = this.EquipmentNumber
      this.OrderConfirmationstage.Remarks = this.RemarksStage8
      this.OrderConfirmationstage.OrderName = this.OrderName

      //preNi

      this.PreNIstage.HandoverForm = this.HandoverForm
      this.PreNIstage.PreNIChecklist = this.PreNIChecklist


      // this.PreNIstage.HandoverForm = 



    }
    this.checkStageStatus = Stage.Status


    this.ViewNumberOfStop = false
    this.Sname = Stage.Name;
    this.sid = Stage.Stageno;
    this.Changestage.ProjectName = this.opportunitys[0].OpportunityName
    // City,State and Zipcode auto fetch from BP
    this.Changestage.SiteCity = this.SiteCity
    this.Changestage.SiteState = this.SiteState

    this.Changestage.SiteZipcode = this.SiteZipcode
    this.Changestage.SiteAddress = this.SiteAddress
    // this.Changestage.contactNumber = this.contactNumber
    // this.Changestage.email = this.contactEmail

    // In Stage tech meeting auto fetch offer price of first call


    //negotiation 1 office price auto fetch from first call stage
    // this.Negotiation1stage.OfferPrice = this.firstCallOfferPrice
    this.Nego1OfferPrice = this.firstCallOfferPrice
    let approvedByName = '';
    if (this.upperReportingData.length > 0 && this.nego1ApprovedBy) {
      const match = this.upperReportingData.find(item => item.id == this.nego1ApprovedBy);
      approvedByName = match?.SalesEmployeeName || '';
      this.nego1ApprovedByName = approvedByName
    }
    // this.Nego2OfferPrice = this.firstCallOfferPrice
    this.CreatedDate = this.opportunitys[0].StartDate
    this.stageId = Stage.id
    // this.stageId = Stage.Stageno;
    this.Contactperson = this.opportunitys[0].ContactPersonName
    console.log('check stage id', this.stageId)
    this.current_stage_name = Stage.Name;
    this.current_stage_comment = Stage.Comment;
    this.current_stage_opp_status = Stage.OpportunityStatus;
    this.current_stage_StartDate = Stage.StartDate;
    this.current_stage_EndDate = Stage.EndDate;
    this.current_stage_DocId = Stage.DocId;
    this.current_stage_Status = Stage.Status;
    console.log('check status of stage', this.current_active_stage, this.current_stage_Status);
    this.Secondstage.Opening = this.stages[0]?.StageDetail[0]?.NumberOfOpening;
    if (this.current_stage_name == 'Lead') {
      if (this.opportunitys[0].U_LEADID != 0) {
        // this.Changestage.DocId = String(this.opportunitys[0].U_LEADID);
      }
    }
    else {
      // this.Changestage.DocId = '';
    }

    if ((Stage.Status == 2 || Stage.Status == 1) || (Stage.Status === 3 && state === 'update')) {
      // && (this.current_stage_name === 'Negotiation 1' || this.current_stage_name === 'Negotiation 2')
      this.modalService.open(contentEdit2, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }



  openChecklist(openChecklistModal: any) {
    this.modalService.open(openChecklistModal, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css ' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateChecklist(openEditChecklistModal: any) {
    console.log('check response dta', this.editChecklist);

    this.modalService.open(openEditChecklistModal, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css ' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit22(contentEdit22: any, Stagename: any, Stage: any) {
    this.Sname = Stagename;
    this.sid = Stage;
    this.modalService.open(contentEdit22, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  generateFields(event: any) {
    this.NumberOfStop = event.data
    if (this.NumberOfStop > 0) {
      this.ViewNumberOfStop = true
    }
    else {
      this.ViewNumberOfStop = false
    }
    this.stops = Array.from({ length: this.NumberOfStop }, () => ({

      FNO: '',
      floorMaking: '',
      noOfOpening: '',
      sidesOfOpening: '',
      SW: '',
      SD: '',
      FH: '',
      DW: '',
      DH: '',
      LE: '',
      RE: ''
    }));
    console.log(this.stops);
  }
  fl: any = []
  sitePicture: any = []
  drawingAttachment: any = []
  bdmPictures: any = []
  phyicalCopyOfRgf: any = []
  technicalPartDoc: any = []
  finalAttachment: any = []
  closureAttachment: any = []
  finalAttachmentNego3: any = []
  paymentProof: any = []
  signedQuote: any = []
  LOIDoc: any = []
  handoverAttachment: any = []
  preNIDoc: any = []
  momFormAttachment: any = []

  onFileChanged(event: any, data: any) {
    console.log('check data ', data);


    if (data === 'sitePicture') {
      this.selectedSitePictures = event.target.files;
      this.fileError = ''; // Clear the error when files are selected
      // this.sitePicture = Array.from(event.target.files);

      for (let i = 0; i < event.target.files.length; i++) {
        this.sitePicture.push(event.target.files[i])
      }
      console.log('sitePicture', this.sitePicture);

    }


    if (data === 'attachments') {
      // this.fl = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.fl.push(event.target.files[i])
      }
      console.log('attachments', this.fl);

    }
    if (data === 'DrawingAttachment') {
      this.selectedDrawingAttachment = event.target.files;
      this.fileError = ''; // Clear the error when files are selected
      // this.drawingAttachment = Array.from(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        this.drawingAttachment.push(event.target.files[i])
      }
      console.log('drawingAttachment', this.drawingAttachment);
    }

    if (data === 'closureAttachment') {
      // this.closureAttachment = [];
      this.closureAttachmentError = ''; // Clear error
      for (let i = 0; i < event.target.files.length; i++) {
        this.closureAttachment.push(event.target.files[i])
      }
      console.log('closureAttachment', this.closureAttachment);
      // this.closureAttachment = event.target.files.length > 0 ? Array.from(event.target.files) : [];

    }

    if (data === 'phyicalCopyOfRgf') {
      this.selectedPhysicalCopyOfRgf = event.target.files;
      this.physicalCopyOfRgfError = ''; // Clear the error when files are selected
      this.phyicalCopyOfRgf = Array.from(event.target.files);
    }
    if (data === 'bdmPictures') {
      this.bdmPictures = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.bdmPictures.push(event.target.files[i])
      }
      console.log('bdmPicture', this.bdmPictures);

    }
    if (data === 'technicalPartDoc') {
      this.technicalPartDoc = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.technicalPartDoc.push(event.target.files[i])
      }
      console.log('technicalPartDoc', this.technicalPartDoc);

    }

    // if (data === 'attachments') {
    //   // this.fl = [];
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.fl.push(event.target.files[i])
    //   }
    //   console.log( 'attachments' , this.fl);

    // }
    if (data === 'finalAttachment') {
      this.finalAttachment = event.target.files.length > 0 ? Array.from(event.target.files) : [];
      this.finalAttachmentError = ''; // Clear error
    }



    if (data === 'nego3Attachment') {
      this.finalAttachmentNego3 = [];
      for (let i = 0; i < event.target.files.length; i++) {
        this.finalAttachmentNego3.push(event.target.files[i])
      }
      console.log('nego3Attachment', this.finalAttachmentNego3);

    }


    if (data === 'paymentProof') {

      // this.selectedPaymentProof = event.target.files;
      this.paymentProofError = ''; // Clear the error when files are selected
      // this.paymentProof = Array.from(event.target.files);



      for (let i = 0; i < event.target.files.length; i++) {
        this.paymentProof.push(event.target.files[i])
      }
      console.log('paymentProof', this.paymentProof);
    }

    if (data === 'signedQuote') {


      // this.selectedSignedQuote = event.target.files;
      this.signedQuoteError = ''; // Clear the error when files are selected
      // this.signedQuote = Array.from(event.target.files);

      for (let i = 0; i < event.target.files.length; i++) {
        this.signedQuote.push(event.target.files[i])
      }
      console.log('signedQuote', this.signedQuote);
    }
    if (data === 'LOIDoc') {

      // this.selectedLOI = event.target.files;
      this.LoiPoError = ''; // Clear the error when files are selected
      // this.LOIDoc = Array.from(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        this.LOIDoc.push(event.target.files[i])
      }
      console.log('LOIDoc', this.LOIDoc);
    }
    if (data === 'handoverAttachment') {
      // this.handoverAttachment = [];
      // for (let i = 0; i < event.target.files.length; i++) {
      //   this.handoverAttachment.push(event.target.files[i])
      // }
      // console.log( 'handoverAttachment' , this.handoverAttachment);
      // this.selectedHandOverAttachment = event.target.files;
      this.handOverAttachmentError = ''; // Clear the error when files are selected
      // this.handoverAttachment = Array.from(event.target.files);


      for (let i = 0; i < event.target.files.length; i++) {
        this.handoverAttachment.push(event.target.files[i])
      }
      console.log('handoverAttachment', this.handoverAttachment);
    }
    if (data === 'momFormAttachment') {
      // this.momFormAttachment = [];
      // for (let i = 0; i < event.target.files.length; i++) {
      //   this.momFormAttachment.push(event.target.files[i])
      // }
      // console.log( 'momFormAttachment' , this.momFormAttachment);
      // this.selectedMomFormAttachment = event.target.files;
      this.momFormAttachmentError = ''; // Clear the error when files are selected
      for (let i = 0; i < event.target.files.length; i++) {
        this.momFormAttachment.push(event.target.files[i])
      }
      // this.momFormAttachment = Array.from(event.target.files);




    }

    // if(data === 'handoverAttachment'){
    //   this.handoverAttachment = [];
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     this.handoverAttachment.push(event.target.files[i])
    //   }
    //   console.log( 'handoverAttachment' , this.handoverAttachment);
    // }

    if (data === 'preNIDoc') {
      // this.preNIDoc = [];
      // for (let i = 0; i < event.target.files.length; i++) {
      //   this.preNIDoc.push(event.target.files[i])
      // }
      // this.selectedPreNIattachement = event.target.files;
      this.preNIattachmentError = ''; // Clear the error when files are selected
      // this.preNIDoc = Array.from(event.target.files);
      // console.log( 'preNIDoc' , this.preNIDoc);



      for (let i = 0; i < event.target.files.length; i++) {
        this.preNIDoc.push(event.target.files[i])
      }
      console.log('preNIDoc', this.preNIDoc);
    }


    // console.log(event.target.files);



  }

  selectedSitePictures: File[] = []; // Store selected files
  selectedDrawingAttachment: File[] = [];
  selectedPhysicalCopyOfRgf: File[] = []
  selectedSignedQuote: File[] = []
  selectedLOI: File[] = []
  selectedPaymentProof: File[] = []
  selectedHandOverAttachment: File[] = []
  selectedMomFormAttachment: File[] = []
  selectedPreNIattachement: File[] = []
  selectedTechnicalDoc: File[] = []
  selectedFinalAttachment: File[] = []
  fileError: string = ''; // Error message for file validation
  physicalCopyOfRgfError: string = ''
  // technicalPartDocError :string = ''
  finalAttachmentError: string = ''
  closureAttachmentError: string = ''
  paymentProofError: String = ''
  signedQuoteError: String = ''
  LoiPoError: String = ''
  handOverAttachmentError: String = ''
  momFormAttachmentError: String = ''
  preNIattachmentError: string = ''

  validateForm(): boolean {
    let isValid = true;

    // Validate Site Picture
    if (this.selectedSitePictures.length === 0) {
      this.fileError = 'Site Picture is required!';
      isValid = false;
    } else {
      this.fileError = '';
    }

    // Validate Physical Copy of RGF
    if (this.selectedPhysicalCopyOfRgf.length === 0) {
      this.physicalCopyOfRgfError = 'Physical Copy Of RGF is required!';
      isValid = false;
    } else {
      this.physicalCopyOfRgfError = '';
    }

    return isValid;
  }


  validateFinalAttachment(): boolean {
    if (!this.finalAttachment || this.finalAttachment.length === 0) {
      this.finalAttachmentError = 'Final Attachment is required!';
      return false;
    } else {
      this.finalAttachmentError = '';
      return true;
    }
  }

  validateClosureAttachment(): boolean {
    if (!this.closureAttachment || this.closureAttachment.length === 0) {
      this.closureAttachmentError = 'Attachment is required!';
      return false;
    } else {
      this.closureAttachmentError = '';
      return true;
    }
  }
  // OrderBookingAttachment(): boolean {


  //   if (this.paymentProof.length === 0) {
  //     this.paymentProofError = 'Payment proof is required!';
  //     return false;
  //   } else {
  //     this.paymentProofError = '';
  //     return true;
  //   }


  //   if (this.signedQuote.length === 0) {
  //     this.signedQuoteError = 'Signed Quote is required!';
  //     return false;
  //   } else {
  //     this.signedQuoteError = '';
  //     return true;
  //   }

  //   if (this.LOIDoc.length === 0) {
  //     this.LoiPoError = 'Signed Quote is required!';
  //     return false;
  //   } else {
  //     this.LoiPoError = '';
  //     return true;
  //   }




  // }

  OrderBookingAttachment(): boolean {
    let isValid = true;

    if (this.paymentProof.length === 0) {
      this.paymentProofError = 'Payment proof is required!';
      isValid = false;
    } else {
      this.paymentProofError = '';
    }

    if (this.signedQuote.length === 0) {
      this.signedQuoteError = 'Signed Quote is required!';
      isValid = false;
    } else {
      this.signedQuoteError = '';
    }

    if (this.LOIDoc.length === 0) {
      this.LoiPoError = 'LOI Document is required!';
      isValid = false;
    } else {
      this.LoiPoError = '';
    }

    return isValid;
  }

  SalesToPreAttachment(): boolean {

    let isValid = true;
    if (this.handoverAttachment.length === 0) {
      this.handOverAttachmentError = 'AOS Attachment is required!';
      isValid = false;

    } else {
      this.handOverAttachmentError = '';

    }

    if (this.showPreAttach && this.preNIDoc.length === 0) {
      this.preNIattachmentError = 'Pre-NI checklist Attachment is required!';
      isValid = false;

    } else {
      this.preNIattachmentError = '';

    }


    if (this.momFormAttachment.length === 0) {
      this.momFormAttachmentError = 'MOM form Attachment is required!';
      isValid = false;
    } else {
      this.momFormAttachmentError = '';
    }
    return isValid;
  }


  changeProcessFlow(val: any) {
    console.log('check select value', val);
    this.Secondstage.ProcessFlowPresented = val
  }

  changeCatalogHandover(val: any) {
    this.Secondstage.CatalogHandover = val
  }

  changeFinalRGFSentToClient(val: any) {
    this.Secondstage.FinalRGFSentToClient = val
  }

  changeDrawingShared(val: any) {
    console.log('check drawing val', val);
    if (val === 'yes') {
      this.addAttachment = true
    }
    else {
      this.addAttachment = false
    }


  }
  changePreNI(val: any) {
    if (val === 'yes') {
      this.showPreAttach = true
    }
    else {
      this.showPreAttach = false

    }
  }
  // Stops_Counting: any[] = [];

  // Function to generate Stops_Counting array dynamically
  initializeStopsCounting() {
    console.log('check stopss', this.firstStageNoOfStops);

    // this.Stops_Counting = Array.from({ length: this.firstStageNoOfStops }, () => ({
    //   Floor_Markings: false,
    //   Front_Openings: false,
    //   Back_Openings: false,
    //   Left_Right_Openings: false,
    //   Floor_to_Floor: '',
    //   As_per_GAD: ''
    // }));
  }

  updateCheckilist(f: NgForm) {
    console.log('check update', f);
    console.log('check inside edit', this.editChecklist);
    this.editChecklist.Opp_Id = this.router.snapshot.params.id;
    this.editChecklist.Stage_Id = this.preNiChecklistStage;
    // this.editChecklist.Stops_Counting = this.Stops_Counting 
    this.bridgeService2.updateChecklist(this.editChecklist).subscribe(
      (res: any) => {
        if (res.status == '200') {
          console.log('Payload sent', this.editChecklist);
          this._NotifierService.showSuccess('Checklist updated successfully');
          this.modalService.dismissAll();
          this.ngOnInit();
          f.reset();
        } else {
          this._NotifierService.showError(res.message);
        }
      },
      (err) => {
        const result = err.message.split(":").slice(3).join(":");
        this._NotifierService.showError(result);
      }
    );

  }


  saveCheckilist(f: NgForm) {
    const filteredChecklist = this.checklist1
      .filter(item =>
        item.REQUIRED_Installation ||
        item.NA ||
        item.Done ||
        item.When ||
        item.Plan01 ||
        item.Plan02 ||
        item.Plan03 ||
        item.Plan04
      );
    const payload = {
      CheckList1: filteredChecklist
    };
    const filteredChecklist2 = this.checklist2
      .filter(item =>
        item.REQUIRED_Installation ||
        item.NA ||
        item.Done ||
        item.When ||
        item.Plan01 ||
        item.Plan02 ||
        item.Plan03 ||
        item.Plan04
      );
    const payload2 = {
      CheckList2: filteredChecklist2
    };
    const filteredChecklist3 = this.checklist3
      .filter(item =>
        item.REQUIRED_Installation ||
        item.NA ||
        item.Done ||
        item.When ||
        item.Plan01 ||
        item.Plan02 ||
        item.Plan03 ||
        item.Plan04
      );
    const payload3 = {
      CheckList3: filteredChecklist3
    };
    const filteredStops = this.Stops_Counting
      .filter(item =>
        item.Floor_Markings ||
        item.Front_Openings ||
        item.Back_Openings ||
        item.Left_Right_Openings ||
        item.Floor_to_Floor ||
        item.As_per_GAD

      );
    const payload4 = {
      CheckList3: filteredStops
    };
    this.PreNiChecklist.CreatedBy = this.SalesEmployeeCode;
    this.PreNiChecklist.Opp_Id = this.router.snapshot.params.id;
    this.PreNiChecklist.Stage_Id = this.preNiChecklistStage;
    this.PreNiChecklist.CheckList1 = this.checklist1;
    this.PreNiChecklist.CheckList2 = this.checklist2;
    this.PreNiChecklist.CheckList3 = this.checklist3;
    this.PreNiChecklist.Specs = this.Specs;
    this.PreNiChecklist.Stops_Counting = this.Stops_Counting
    this.bridgeService2.createChecklist(this.PreNiChecklist).subscribe(
      (res: any) => {
        if (res.status == '200') {
          console.log('Payload sent', this.PreNiChecklist);
          this._NotifierService.showSuccess('Checklist added successfully');
          this.modalService.dismissAll();
          this.ngOnInit();
          f.reset();
        } else {
          this._NotifierService.showError(res.message);
        }
      },
      (err) => {
        const result = err.message.split(":").slice(3).join(":");
        this._NotifierService.showError(result);
      }
    );
  }



  ChangeStage(f: NgForm, stageStatus: any, state: any) {
    console.log('check stageStatus', stageStatus);

    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    console.log('check ffffffff', f);
    if (f.valid) {



      let payload: any;
      if (this.sid == 1) {
        this.Changestage.StageStatus = stageStatus
        this.Changestage.Opp_Id = this.router.snapshot.params.id;
        this.Changestage.Stage_Id = this.stageId;
        this.Changestage.Stageno = this.sid;
        if (state == 'update') {
          this.Changestage.id = this.stageID;

        }


        // if(this.checkStageStatus == 2){
        //   this.Changestage.File = this.FileAttachment
        // }else{
        this.Changestage.File = this.fl;

        // }
        this.Changestage.Floor = this.stops;
        payload = this.Changestage;
      }
      else if (this.sid == 2) {
        if (this.checkStageStatus == 2 && this.SitePicture.length > 0) {
          this.fileError = ''
        }
        if (this.checkStageStatus == 1 && !this.validateForm()) {
          return; // Stop execution if validation fails
        }
        this.Secondstage.StageStatus = stageStatus
        this.Secondstage.Opp_Id = this.router.snapshot.params.id;
        this.Secondstage.Stage_Id = this.stageId;
        this.Secondstage.Stageno = this.sid;
        this.Secondstage.NumberOfStop = this.firstStageNoOfStops
        //files upload
        // if(this.checkStageStatus == 1){
        this.Secondstage.PhysicalCopyOfRGF = this.phyicalCopyOfRgf;
        this.Secondstage.SitePicture = this.sitePicture;
        this.Secondstage.DrawingAttachment = this.drawingAttachment;
        this.Secondstage.BDMPictures = this.bdmPictures;
        this.Secondstage.OfferedPrice = this.firstCallOfferPrice;
        if (state == 'update') {
          this.Secondstage.id = this.stage2ID;

        }
        // }
        // else{
        //   this.Secondstage.DrawingAttachment = this.DrawingAttachment;
        //   console.log('check drawing to be shared data' , this.Secondstage.DrawingAttachment);     
        //   this.Secondstage.SitePicture = this.SitePicture;
        //   this.Secondstage.BDMPictures = this.BDMPictures;
        //   this.Secondstage.PhysicalCopyOfRGF = this.PhysicalCopyOfRGF;
        // }


        payload = this.Secondstage;
      }
      else if (this.sid == 3) {
        this.Thirdstage.StageStatus = stageStatus
        this.Thirdstage.Opp_Id = this.router.snapshot.params.id;
        this.Thirdstage.Stage_Id = this.stageId;
        this.Thirdstage.Stageno = this.sid;
        //files upload


        // if(this.checkStageStatus == 1) {
        this.Thirdstage.File = this.technicalPartDoc;
        if (state == 'update') {
          this.Thirdstage.id = this.stage3ID;

        }
        // }else{
        //   this.Thirdstage.File = this.DrawingSharedFile
        //   this.Thirdstage.TechnicalPPTShared = this.TechnicalPPTShared
        //   this.Thirdstage.Remarks = this.RemarksStage3
        //   this.Thirdstage.AnyUpdation = this.AnyUpdation
        //   this.Thirdstage.DrawingShared = this.DrawingShared
        // }

        payload = this.Thirdstage;
      }
      else if (this.sid == 4) {
        this.Negotiation1stage.StageStatus = stageStatus
        this.Negotiation1stage.Opp_Id = this.router.snapshot.params.id;
        this.Negotiation1stage.Stage_Id = this.stageId;
        this.Negotiation1stage.Stageno = this.sid;
        if (state == 'update') {
          this.Negotiation1stage.id = this.stage4ID;

        }
        payload = this.Negotiation1stage;

      }
      else if (this.sid == 5) {

        if (this.checkStageStatus == 1 && !this.validateFinalAttachment()) {
          return; // Stop execution if validation fails
        }
        this.Negotiation2stage.StageStatus = stageStatus

        this.Negotiation2stage.Opp_Id = this.router.snapshot.params.id;
        this.Negotiation2stage.Stage_Id = this.stageId;
        this.Negotiation2stage.Stageno = this.sid;

        this.Negotiation2stage.CreatedBy = this.SalesEmployeeCode
        //files upload
        // if(this.checkStageStatus == 1){
        this.Negotiation2stage.File = this.finalAttachment;
        if (state == 'update') {
          this.Negotiation2stage.id = this.stage5ID;

        }

        // }
        // else{
        //   this.Negotiation2stage.File = this.finalAttachmentFileNego2
        // }
        payload = this.Negotiation2stage;

      }
      else if (this.sid == 5.1) {
        this.Negotiation3stage.StageStatus = stageStatus

        this.Negotiation3stage.Opp_Id = this.router.snapshot.params.id;
        this.Negotiation3stage.Stage_Id = this.stageId;
        this.Negotiation3stage.Stageno = this.sid;

        this.Negotiation3stage.CreatedBy = this.SalesEmployeeCode
        this.Negotiation3stage.ApprovedBy = this.SalesEmployeeCode

        // this.Negotiation3stage.Negotiation1ApprovedBy = this.SalesEmployeeCode

        //files upload
        this.Negotiation3stage.File = this.finalAttachmentNego3;
        if (state == 'update') {
          this.Negotiation3stage.id = this.stage6ID;

        }

        payload = this.Negotiation3stage;

      }

      else if (this.sid == 6) {
        if (this.checkStageStatus == 2 && this.finalAttachmentClosure.length > 0) {
          this.closureAttachmentError = ''
        }
        if (this.checkStageStatus == 1 && !this.validateClosureAttachment()) {
          return; // Stop execution if validation fails
        }
        this.Closurestage.StageStatus = stageStatus
        this.Closurestage.Opp_Id = this.router.snapshot.params.id;
        this.Closurestage.Stage_Id = this.stageId;
        this.Closurestage.Stageno = this.sid;
        if (state == 'update') {
          this.Closurestage.id = this.stage7ID;

        }

        // this.Closurestage.CreatedBy = this.SalesEmployeeCode
        //files upload

        // if(this.checkStageStatus == 1){
        this.Closurestage.File = this.closureAttachment;

        // }
        // else{
        //   this.Closurestage.File = this.finalAttachmentFileNego2
        // }
        payload = this.Closurestage;

      }
      else if (this.sid == 7) {
        if (this.checkStageStatus == 2 && this.finalAttachmentClosure.length > 0) {
          this.paymentProofError = ''
          this.signedQuoteError = ''
          this.LoiPoError = ''

        }
        if (this.checkStageStatus == 1 && !this.OrderBookingAttachment()) {
          return; // Stop execution if validation fails
        }
        this.OrderBookingstage.StageStatus = stageStatus

        this.OrderBookingstage.Opp_Id = this.router.snapshot.params.id;
        this.OrderBookingstage.Stage_Id = this.stageId;
        this.OrderBookingstage.Stageno = this.sid;

        this.OrderBookingstage.CreatedBy = this.SalesEmployeeCode
        //files upload
        this.OrderBookingstage.PaymentProof = this.paymentProof;
        this.OrderBookingstage.SignedQuote = this.signedQuote;
        this.OrderBookingstage.LOI = this.LOIDoc;
        if (state == 'update') {
          this.OrderBookingstage.id = this.stage8ID;

        }
        payload = this.OrderBookingstage;
        console.log('check order', payload);


      }
      else if (this.sid == 8) {
        this.OrderConfirmationstage.StageStatus = stageStatus
        this.OrderConfirmationstage.Opp_Id = this.router.snapshot.params.id;
        this.OrderConfirmationstage.Stage_Id = this.stageId;
        this.OrderConfirmationstage.Stageno = this.sid;

        this.OrderConfirmationstage.CreatedBy = this.SalesEmployeeCode
        if (state == 'update') {
          this.OrderConfirmationstage.id = this.stage9ID;

        }
        payload = this.OrderConfirmationstage;
        console.log('check order confirm', payload);
      }


      else if (this.sid == 9) {

        if (this.checkStageStatus == 2 && this.handoverAttachment.length > 0) {
          this.handOverAttachmentError = ''
        }
        if (this.checkStageStatus == 2 && this.momFormAttachment.length > 0) {
          this.momFormAttachmentError = ''
        }
        if (this.checkStageStatus == 2 && this.preNIDoc.length > 0) {
          this.preNIattachmentError = ''
        }
        if (this.checkStageStatus == 1 && !this.SalesToPreAttachment()) {
          return; // Stop execution if validation fails
        }
        // if (!this.SalesToPreAttachment()) {
        //   return; // Stop execution if validation fails
        // }
        this.PreNIstage.StageStatus = stageStatus
        this.PreNIstage.Opp_Id = this.router.snapshot.params.id;
        this.PreNIstage.Stage_Id = this.stageId;
        this.PreNIstage.Stageno = this.sid;

        this.PreNIstage.CreatedBy = this.SalesEmployeeCode
        //files upload
        this.PreNIstage.Handover = this.handoverAttachment;
        this.PreNIstage.MOM = this.momFormAttachment;
        this.PreNIstage.PreNIChecklist_File = this.preNIDoc;
        if (state == 'update') {
          this.PreNIstage.id = this.stage10ID;

        }
        payload = this.PreNIstage;

      }




      // this.state = state ? state : 'create' 

      if (payload) {
        if (state === 'create') {
          this.bridgeService2.ChangeStage(payload, this.sid, 'create').then(
            (res: any) => {
              if (res.status == '200') {
                if (this.sid == 1) {
                  this.Changestages.push(res);
                  console.log('check inside res', this.Changestages);

                } else if (this.sid == 2) {
                  this.Secondstages.push(res);
                }

                console.log('Payload sent', payload);
                if (stageStatus == 2) {
                  this._NotifierService.showSuccess('Stage Saved' + ' ' + this.Headingss[0].heading106);
                }
                else {
                  this._NotifierService.showSuccess('Stage Complete' + ' ' + this.Headingss[0].heading106);

                }
                this.modalService.dismissAll();
                this.ngOnInit();
                f.reset();
              } else {
                this._NotifierService.showError(res.message);
              }
            },
            (err) => {
              const result = err.message.split(":").slice(3).join(":");
              this._NotifierService.showError(result);
            }
          );
        }
        else if (state === 'update') {
          console.log('in UPDATE');
          this.bridgeService2.ChangeStage(payload, this.sid, 'update').then(
            (res: any) => {
              if (res.status == '200') {
                if (this.sid == 1) {
                  this.Changestages.push(res);
                } else if (this.sid == 2) {
                  this.Secondstages.push(res);
                }
                else if (this.sid == 3) {
                  this.Thirdstages.push(res);
                }

                console.log('Payload sent', payload);
                this._NotifierService.showSuccess('Stage Updated' + ' ' + this.Headingss[0].heading106);
                this.modalService.dismissAll();
                this.ngOnInit();
                f.reset();
              } else {
                this._NotifierService.showError(res.message);
              }
            },
            (err) => {
              const result = err.message.split(":").slice(3).join(":");
              this._NotifierService.showError(result);
            }
          );
        }

      }
    }
    else {
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }


  EditStage(f: NgForm) {
    console.log('inside edit stage', f)


  }

  // ChangeStage(f: NgForm) {
  //   f = this.bridgeService2.GlobaleTrimFunc(f);
  //   this.resetAlerts();
  //   if (f.valid) {
  //     this.Changestage.Opp_Id = this.router.snapshot.params.id;
  //     this.Changestage.Stage_Id = this.stageId;
  //     this.Changestage.Stageno = this.sid;
  //     this.Changestage.File=this.fl
  //     this.Changestage.Floor = this.stops
  //     console.log("change", this.Changestage.Stage_Id, this.Changestage.Opp_Id);
  //     console.log('check second' , this.Secondstage);

  //     if(this.sid == 1){
  //       this.bridgeService2.ChangeStage(this.Changestage).subscribe(
  //         (res: ChangeStages) => {
  //           if (Object(res)['status'] == '200') {

  //             this.Changestages.push(res)

  //             console.log('check second payload' , this.Secondstages);

  //             this._NotifierService.showSuccess('Stage Complete'+this.Headingss[0].heading106);
  //             this.modalService.dismissAll();
  //             this.ngOnInit();
  //             f.reset();
  //           }


  //           else {
  //             this._NotifierService.showError(Object(res)['message']);
  //           }
  //         },
  //         (err) => {
  //           const delim = ":"
  //           const name = err.message
  //           const result = name.split(delim).slice(3).join(delim)
  //           this._NotifierService.showError(result);
  //         }
  //       );
  //     }


  //   }

  //   else {
  //     for (let i = 0; i < Object.keys(f.value).length; i++) {
  //       var keyys = Object.keys(f.value)[i];
  //       if (f.value[keyys].length == 0) {
  //         if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
  //           $('input[name=' + keyys + ']').addClass('red-line-border');
  //           $('input[name=' + keyys + ']').focus();
  //         }
  //         if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
  //           $('select[name=' + keyys + ']').addClass('red-line-border');
  //           $('select[name=' + keyys + ']').focus();
  //         }
  //         if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
  //           $('textarea[name=' + keyys + ']').addClass('red-line-border');
  //           $('textarea[name=' + keyys + ']').focus();
  //         }
  //       } else {
  //         $('input[name=' + keyys + ']').removeClass('red-line-border');
  //         $('select[name=' + keyys + ']').removeClass('red-line-border');
  //         $('textarea[name=' + keyys + ']').removeClass('red-line-border');
  //       }
  //     }
  //   }
  // }



  CompleteStage(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    this.Completetage.Opp_Id = this.router.snapshot.params.id;
    this.bridgeService2.CompleteStage(this.Completetage).subscribe(
      (res: CompleteStages) => {
        // Update the list of cars
        this.Completestages.push(res)
        this._NotifierService.showSuccess('Stages Completed' + this.Headingss[0].heading106);
        window.location.reload();
        //  this.router.navigate(['/opportunity']);
        // this.success = 'Created successfully';
        f.reset();
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        this._NotifierService.showError(result);
        // window.location.reload();
      }
    );
  }

  getparticipants: any;
  getActivity(): void {
    this.bridgeService2.getActivityByPagination({ PageNo: 1, maxItem: 'All', }, '', { SourceID: this.idd, SourceType: 'Opportunity' }, 'id', 'desc', this.UserId).subscribe(
      // this.bridgeService2.getActivitydata(this.UserId).subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.activity = data.data;
        }

        else {
          this._NotifierService.showError(data.message);
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



  EditActivity(fe: NgForm) {
    fe = this.bridgeService2.GlobaleTrimFunc(fe);
    this.resetAlerts();
    var time = this.EdiitActivitys.Time;
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    this.EdiitActivitys.Time = time.join('');
    // this.EdiitActivitys.Participants = this.pills1;
    this.EdiitActivitys.To = this.EdiitActivitys.From;
    if (fe.valid) {
      this.bridgeService2.storeEditactivity(this.EdiitActivitys).subscribe(
        (res: EditActivity) => {
          // Update the list of cars
          this.Editactivity.push(res);

          this._NotifierService.showSuccess('Events' + this.Headingss[0].heading104 + " " + this.Headingss[0].heading106);
          this.getActivity();
          fe.reset();
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
          // window.location.reload();
        }
      );
    }

    else {
      for (let i = 0; i < Object.keys(fe.value).length; i++) {
        var keyys = Object.keys(fe.value)[i];
        if (fe.value[keyys].length == 0) {
          if ($('input[name=' + keyys + ']').hasClass('required-fld')) {
            $('input[name=' + keyys + ']').addClass('red-line-border');
            $('input[name=' + keyys + ']').focus();
          }
          if ($('select[name=' + keyys + ']').hasClass('required-fld')) {
            $('select[name=' + keyys + ']').addClass('red-line-border');
            $('select[name=' + keyys + ']').focus();
          }
          if ($('textarea[name=' + keyys + ']').hasClass('required-fld')) {
            $('textarea[name=' + keyys + ']').addClass('red-line-border');
            $('textarea[name=' + keyys + ']').focus();
          }
        } else {
          $('input[name=' + keyys + ']').removeClass('red-line-border');
          $('select[name=' + keyys + ']').removeClass('red-line-border');
          $('textarea[name=' + keyys + ']').removeClass('red-line-border');
        }
      }
    }
  }



  editfiles: any = [];



  oneditFileDropped($event: any) {
    this.prepareeditFilesList($event);
  }


  fileeditBrowseHandler(editfiles: any) {
    this.prepareeditFilesList(editfiles.target.files);
  }
  deletebranch1: any;
  deleteAttach(confirmModal: any, id: number) {
    this.modalService
      .open(confirmModal, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
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
    this.opportunityAttach.Attach = this.editfiles
    this.opportunityAttach.oppId = this.idd
    // console.log("frm", this.opportunityAttach)
    this.bridgeService2.opportunitydetailsAttach(this.opportunityAttach).subscribe(
      (res: OppoAttach) => {
        if (Object(res)['status'] == "200") {

          // this._NotifierService.showSuccess('Added Attachment Successfully !');

          this.getOpportunity(this.idd);
        }
        else {
          this._NotifierService.showError(Object(res)['message']);

        }



      })
    // }


  }

  // bridgess: any[] = [];
  getBridge(): void {
    this.bridgeService2.getAll().subscribe(
      (data: any[]) => {
        this.bridgess = data;
        console.log('check data of user', this.bridgess);

        for (let i = 0; i < this.bridgess.length; i++) {
          if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
            this.bridgess.splice(i, 1);
          }
          if (this.bridgess[i]['SalesEmployeeCode'] == '') {
            this.bridgess.splice(i, 1);
          }
        }
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getUpperReporting(): void {
    this.bridgeService2.getAllUpperReporting().subscribe(
      (data: any[]) => {
        this.upperReportingData = data;
        console.log('check data of user1234', this.upperReportingData);

        // for (let i = 0; i < this.bridgess.length; i++) {
        //   if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
        //     this.bridgess.splice(i, 1);
        //   }
        //   if (this.bridgess[i]['SalesEmployeeCode'] == '') {
        //     this.bridgess.splice(i, 1);
        //   }
        // }
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }



  selectChangeHandler3(event: any) {

    var id = event;
    console.log('check select id', event);

    this.bridgeService2.getoneemployee(id).subscribe(
      (data: any) => {
        // this.opportunity.SalesPersonName = data[0]['userName'];

        // this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
        // this.opportunity.DataOwnershipName = data[0]['userName'];
        // this.opportunity.DataOwnershipfield = data[0]['SalesEmployeeCode'];

        // console.log('this.opportunity.SalesPersonName',this.opportunity.SalesPersonName);
      });
  }

  getDrawingToStatus(event: any) {
    var id = event;
    this.bridgeService2.getDrawingStatus(id, this.SalesEmployeeCode).subscribe(
      (data: any) => {
        this.drawingAttachmentStatus = data[0].button_status
        console.log('check button ', this.drawingAttachmentStatus);

        // this.opportunity.SalesPersonName = data[0]['userName'];

        // this.opportunity.SalesPerson = data[0]['SalesEmployeeCode'];
        // this.opportunity.DataOwnershipName = data[0]['userName'];
        // this.opportunity.DataOwnershipfield = data[0]['SalesEmployeeCode'];

        console.log('DATA', data);
      });
  }




  open(template: any, type: any) {

    this.Activitys.Type = type;
    if (type == 'Event') {
      this.Activitys.From = this.HeadingServices.getDate();
      this.Activitys.To = this.HeadingServices.getDate();
      this.Activitys.Time = this.HeadingServices.getTime();
      this.Activitys.ToTime = this.HeadingServices.getTime();
    }
    else if (type == 'Task') {
      this.Activitys.From = this.HeadingServices.getDate();
      this.Activitys.To = this.HeadingServices.getDate();
      this.Activitys.Time = this.HeadingServices.getTime();
      this.Activitys.ToTime = this.HeadingServices.getTime();
    }
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-activity-modal` })
  }
  selectYpe() {
    this.ActivitysParticipants = [];
    if (this.Activitys.ParticipantsType == 'Employee') {
      this.getBridge();
    }
    else if (this.Activitys.ParticipantsType == 'ContactPerson') {
      this.bridgeService2.getContactPersone(this.selectedDay).subscribe(
        (data: any) => {
          this.contactPersoneList = data;
        });
    }
  }
  openLinkHitter(CardCode: string) {
    this.route.navigate(['/opportunity']);
    this.bridgeService2.setBpCardcode(CardCode);
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

  // isModulefieldview(module_id: number, key: string): boolean {
  //   const selectedModule = this.savedModules?.find((module: any) => module.module_id === module_id);
  //   if (selectedModule) {
  //       const hasViewPermission = selectedModule.data.some((item: any) => item.key === key && item.view);
  //       return hasViewPermission;
  //   }
  //   return false;
  // }

  deletefileapi(imageid: any) {
    let ordId = this.router.snapshot.params.id;
    this.bridgeService2.deleteoppoAttachment(ordId, imageid).subscribe(
      (res) => {
        this.modalService.dismissAll();
        this.getOpportunity(this.idd);

      },
      (err) => (this.error = err)
    );
  }

  Type: any = 'Opportunity';
  openfollowup(id: any) {
    this.ExcelsheetComponent.openfollowup22(id, this.Type);
  }

  Follow: Follow[] = [];
  nodata: boolean = false;
  isLoading2: boolean = false;
  isdataLoading: boolean = false;
  getleadFollow2(): void {
    this.isLoading2 = true;
    this.idd = this.router.snapshot.params.id;
    this.bridgeService2.getFollowdata(this.idd).subscribe(
      (data: Follow[]) => {
        this.isLoading2 = false;
        this.Follow = data
        console.log('HELLOthis.Follow', this.Follow)
        this.Follow.sort(function (a: any, b: any) {
          return Number(new Date(b.UpdateDate)) - Number(new Date(a.UpdateDate));
        });

        if (this.Follow.length <= 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
        }

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  receiveData(data: string) {
    if (data == 'true') {
      this.ngOnInit();
    }
  }

  convertTo12Hour(timeString: string): string {
    const [hours, minutes, seconds] = timeString.split(':'); // Split the time string
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${adjustedHour}:${minutes} ${ampm}`;
  }



  GoToPdf(id: any) {
    const encodedURL = btoa(id);
    const url = "../../assets/html/opportunity.html?id=" + id + this.accesstoken;
    window.open(url, '_blank');
  }

  GoToChecklistPdf(id: any) {
    const encodedURL = btoa(id);
    const url = "../../assets/html/opportunityChecklist.html?id=" + id + this.accesstoken;
    window.open(url, '_blank');
  }
  GoToAOSFormPdf(id: any) {
    const encodedURL = btoa(id);
    const url = "../../assets/html/opportunityAOSForm.html?id=" + id + this.accesstoken;
    window.open(url, '_blank');
  }
  // getFileName(filePath?: string): string {
  //   if (!filePath) return '';
  //   const parts = filePath.split('/');
  //   const fileName = parts[parts.length - 1];
  //   return decodeURIComponent(fileName); // handles %20 and other encodings
  // }
  getFileName(filePath?: string): string {
    if (!filePath) return '';
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    return decodeURIComponent(fileName);
  }


  getAllOrdersList() {
    this.bridgeService2.getOrderListing(this.SalesEmployeeCode).subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.AllOrdersList = data.data;
        }

        else {
          this._NotifierService.showError(data.message);
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

}


