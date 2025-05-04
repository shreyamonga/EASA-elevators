import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Customer, Industory, Country, States, PaymentTerm } from '../customer';
import { Quotation, QuotationItem } from '../quotation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Item } from '../warehouse';
declare var $: any;

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.scss'],
})
export class QuotationAddComponent implements OnInit {
  DynamicFiledPositionDetials: any[] = [];
  totalSubAmount: number = 0;
  CountItem: Number = 0;
  //searchValue: string = "";
  searchValue1: string = "";
  Totfunction: number = 0;
  UnitPriceTotal: number = 0;
  customers: Customer[] = [];
  industorys: Industory[] = [];
  countrys: Country[] = [];
  statess: States[] = [];
  statess2: States[] = [];
  businesspartners: BusinessPartners[] = [];
  opportunitys: opportunity[] = [];
  bridgess: Bridge[] = [];
  quotationsitem: QuotationItem[] = [];
  isLoading2: boolean = false;
  isdataLoading: boolean = false;
  quotations: Quotation[] = [];
  closeResult = '';
  paymentterms: PaymentTerm[] = [];
  selectedPassenger: any
  selectedCarDesign: any
  selectedSeries: any
  selectedTypeOfDoor: any
  hideAllExtraFeilds: boolean = false
  selectedCarDesigns!: string;
  selectedModel!: string;
  selectedAutomaticDoor!: string
  showCladding: boolean = false
  quotation: any = {
    CreatedByPerson: sessionStorage.getItem('SalesEmployeeCode'),
    is_draft: 0,
    DocTotal: '',
    U_QUOTNM: '',
    TaxDate: this.HeadingServices.getDate(),
    DocDueDate: '',
    ContactPersonCode: '',
    DiscountPercent: '0',
    DocDate: this.HeadingServices.getDate(),
    CardCode: '',
    CardName: '',
    Comments: '',
    SalesPersonCode: '',
    departement: '2',
    PRID: '',
    BPLID: '',
    Attach: '',
    OpportunityID: '',
    FreightCharge: '',
    PaymentGroupCode: '',
    U_OPPID: null,
    U_OPPRNM: '',
    AddressExtension: {
      BillToId: '',
      ShipToId: '',
      BillToBuilding: '',
      ShipToState: '',
      BillToCity: '',
      ShipToCountry: 'IN',
      BillToZipCode: '',
      ShipToStreet: '',
      BillToState: '',
      ShipToZipCode: '',
      BillToStreet: '',
      ShipToBuilding: '',
      ShipToCity: '',
      BillToCountry: 'IN',
      U_SCOUNTRY: 'India',
      U_SSTATE: '',
      U_SHPTYPB: '',
      U_BSTATE: '',
      U_BCOUNTRY: 'India',
      U_SHPTYPS: '',
    },
    DocumentLines: '',
    CreateDate: this.HeadingServices.getDate(),
    CreateTime: this.HeadingServices.getTime(),
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),

    TypeOfLift: '',
    TypeOfInstallation: '',

    Machine: '',

    Version: '',
    NoOfElevators: '',
    StandardSpecification: '',
    // added by ranjeet
    TypeOfInstallationCost: 0,
    MachineCost: 0,
    LongData: {
      carDesigns: '',
      model: '',

      passengers: '',
      series: '',
      sidePanels: '',
      rearPanels: '',
      mirror: '',
      flooring: '',
      ceiling: '',
      lighting: '',
      fan: '',
      frame: '',
      COP_Plate: '',
      LOP_Plate: '',
      display: '',
      pushButtons: '',
      doorOperation: '',
      doorClearOpeningsWidth: '',
      doorClearOpeningHeight: '',
      carDoorPanel: '',
      Interlock: '',
      landingDoorFrame: '',
      landingDoorPanel: '',
      sensorOnCabin: '',
      typeOfDoor: '',
      remarks1: '',  // Added for Remark 1
      remarks2: '',  // Added for Remark 2
      handrail: '',
      Partition: '',
      plateLOP: '',
      carDoor: '',
      skirting: '',
      protection: '',
      modelNo: '',

      pit: '',
      speed: '',
      capacity: '',
      persons: '',
      cabinInterior: '',
      ddd: '',
      operation: '',
      customization: '',
      lopCopRemark: '',
      lopCop: '',
      structure: '',
      // added by ranjeet (manual cost field keys)
      seriesCost: 0,
      carDesignsCost: 0,
      sidePanelsCost: 0,
      rearPanelsCost: 0,
      mirrorCost: 0,
      handrailCost: 0,
      flooringCost: 0,
      ceilingCost: 0,
      lightingCost: 0,
      fanCost: 0,
      copPlateCost: 0,
      lopPlateCost: 0,
      displayCost: 0,
      pushButtonsCost: 0,
      doorOperationCost: 0,
      doorClearOpeningsWidthCost: 0,
      doorClearOpeningHeightCost: 0,
      carDoorPanelCost: 0,
      landingDoorFrameCost: 0,
      landingDoorPanelCost: 0,
      sensorOnCabinCost: 0,
      skirtingCost: 0,
      protectionCost: 0,
      modelCost: 0,
      frameCost: 0,
      partitionCost: 0,
      plateLOPCost: 0,
      carDoorCost: 0,
      pitCost: 0,
      speedCost: 0,
      cabinInteriorCost: 0,
      structureCost: 0,
      claddingCost: 0,
      customizationCost: 0,
      operationCost: 0,
      lopcopCost: 0,
    },


    ElevatorShaft: {
      shaftWidth: '',
      shaftDepth: '',
      pit: '',
      overhead: '',
      minimumFloorHeight: '',
      totalCarTravel: '',
      lintelHeightCladding: '',
      machineWidth: '',
      machineDepth: '',
    },

    ElevatorSpecification: {
      Payload: '',
      Capacity: '',
      NoOfStops: '',
      NoOfOpenings: '',
      AccessibleSidesFront: '',
      AccessibleSidesRear: '',
      AccessibleSides90Degree: '',
      FloorDesignation: '',
      Speed: '',
      CarWidth: '',
      CarDepth: '',
      CarHeight: '',
      StartStop: '',
      SpeedValue: '',
      ControlSytem: '',
    },


    ElevatorSteelStructure: {
      Type: '',
      VerticalSheetMetal: '',
      VerticalTubular: '',
      HorizontalSheetMetal: '',
      HorizontalTubular: '',
      FoundationBolts: '',
      CladdingChoice: '',
      Anchorage: '',
      //added by ranjeet
      TypeCost: 0,
      VerticalSheetMetalCost: 0,
      VerticalTubularCost: 0,
      HorizontalSheetMetalCost: 0,
      HorizontalTubularCost: 0,
      FoundationBoltsCost: 0,
      CladdingChoiceCost: 0,

    },


    Doors: {
      TypeOfDoor: '',
      DoorWidth: '',
      DoorHeight: '',
      DoorPanels: '',
      LandingDoorFrame: '',
      CarInterlock: '',
      LandingDoorInterlock: '',
      LandingDoor: '',
      landingDoorPanel: '',
      interlockMechanicalElectrical: '',
      automaticDoors: '',
      sensorOnCabinDoor: '',
      carDoorPanel: '',
      LandingDoorPanel: '',
      //added by ranjeet





      TypeOfDoorCost: 0,
      DoorWidthCost: 0,
      DoorHeightCost: 0,
      LandingDoorFrameCost: 0,
      DoorPanelsCost: 0,
      CarInterlockCost: 0,
      LandingDoorInterlockCost: 0,
      LandingDoorCost: 0,
      LandingDoorPanelCost: 0,
      InterlockCost: 0,
      automaticDoorsCost: 0,
      sensorOnCabinDoorCost: 0,
      carDoorPanelCost: 0,





    },

    ScopeOfWork: {
      PackingLoading: '',
      Transportation: '',
      Unloading: '',
      Storing: '',
      Scaffolding: '',
      IBEAM: '',

      Liasoning: '',
      License: '',
      IbeamforMachineBase: '',
      IBeamShiftingtillMachineRoom: '',
      MinorCivilWork: '',
      // added by ranjeet
      PackingLoadingCost: 0,
      TransportationCost: 0,
      UnloadingCost: 0,
      StoringCost: 0,
      ScaffoldingCost: 0,
      IBEAMCost: 0,
      LiasoningCost: 0,
      LicenseCost: 0,
      IbeamforMachineBaseCost: 0,
      IBeamShiftingtillMachineRoomCost: 0,
      MinorCivilWorkCost: 0,


    },


    OptionalFeatures: {
      ViewWindow: '',
      EmergencyTelephoneSystem: '',
      EmergencyTelephoneSystemPublic: '',
      BiometricAccess: '',
      CardReaderAccess: '',
      FullHeightCarOperatingPanel: '',
      Intercom: '',
      AttendantOperation: '',
      ParkingKeySwitch: '',
      DuplexAndTriplexCarGroupOperation: '',
      TimedBlindFloor: '',
      VoiceSynthesizerWithCustomizedMusic: '',
      Handrail: '',
      OverloadDevice: '',
      VVVFDrive: '',
      SinglePhaseOperation: '',

      // added by ranjeet
      ViewWindowCost: 0,
      EmergencyTelephoneSystemCost: 0,
      EmergencyTelephoneSystemPublicCost: 0,
      BiometricAccessCost: 0,
      CardReaderAccessCost: 0,
      FullHeightCarOperatingPanelCost: 0,
      IntercomCost: 0,
      AttendantOperationCost: 0,
      ParkingKeySwitchCost: 0,
      DuplexAndTriplexCarGroupOperationCost: 0,
      TimedBlindFloorCost: 0,
      AutomaticRescueCost: 0,
      OverloadDeviceCost: 0,

      VoiceSynthesizerWithCustomizedMusicCost: 0,
      HandrailCost: 0,

      SinglePhaseOperationCost: 0,
      VVVFDriveCost: 0,
    },


    Guarantee: {
      Guarantee: '',
      GuaranteeDateOfDispatch: '',
      FreeMaintenancePeriod: '',
      FreeMaintenancePeriodDate: '',
      // added by ranjeet
      GuaranteeCost: 0,
      GuaranteeDateOfDispatchCost: 0,
      FreeMaintenancePeriodCost: 0,
      FreeMaintenancePeriodDateCost: 0,

    },


    // ElevatorSteelStructure: [],
    CabinDesign: [],
    TechnicalDetails: {
      motor: '',
      Gearbox: '',
      Controller: ''
    },


    Others: [],
    
AdvancePercentage:'',
AdvanceDate:'',
AdvanceAmount:'',
DrawingPercentage:'',
DrawingDate:'',
DrawingAmount:'',
PreProductionPercentage:'',
PreProductionDate:'',
PreProductionAmount:'',
PostProductionPercentage:'',
PostProductionDate:'',
PostProductionAmount:'',
PreDispatchPercentage:'',
PreDispatchDate:'',
PreDispatchAmount:'',
PostDispatchPercentage:'',
PostDispatchDate:'',
PostDispatchAmount:'',
MechanicalPercentage:'',
MechanicalDate:'',
MechanicalAmount:'',
HandoverPercentage:'',
HandoverlDate:'',
HandoverAmount:'',

  };


  error = '';
  success = '';
  role: any;
  UserId: any;
  reportingTo: any;
  UserName: any;
  isLoading: boolean = false;
  baseUrl2: any;
  showshipaddressBool: boolean = true;
  urlcheck: any;
  opportunityItem: any;
  order_Item: any;
  bpid: any;
  bp_name: any[] = [];
  oppid: any;

  ItemNAme: any;
  ItemQty: any;
  ItemDis: any;
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  ItemDueDate: any;
  TaxCode: any;
  TaxRate: any;

  contactPersoneList: any;
  selectedDayItem: string = '';
  cardco: any;
  dumystate: any;
  total_Amount: any;
  CurrentBranch: any;
  BP_Detailsdata: any[] = [];
  branchs: any[] = [];
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  ShippingType: any;
  customertype: any[] = [];
  Headingss: any[] = [];
  order_by_field: any = 'id';
  order_by_value: any = 'desc';
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
  startind = 1;
  endind = 1;
  totalCount: any;

  order_by_field2: any = 'id';
  order_by_value2: any = 'desc';
  pagination2: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
  items: Item[] = [];
  searchValue2: string = '';
  paginDisplay: boolean = true;
  savedModules: any[] = [];
  // showStandardFields : boolean =false
  // showPassengerField : boolean = false
  // showPoweredCoatedFields : boolean = false
  // showSSVerticalFields : boolean = false; 
  // showCarDesignFields : boolean = false




  showPassengerField = false;
  showStandardFields = false;
  showCustomizedFields = false;
  showAceCourtyardFields = false;
  showPoweredCoatedFields = false;
  showAwesomeCarDesignsFields = false
  showEliteCarDesignsFields = false
  showGrandeFields = false
  showUberFields = false



  FreightLongData = {

    StandardSpecification: 'As per IS 14665',
    StartStop: 'Acceleration and Deceleration through a VVVF Drive system',
    Anchorage: 'Anchorage from Building is mandatory for deflection'



  }

  SpecialElevator = {
    DoorClearOpeningsWidht: '800 mm Automatic Telescopic Side Opening 2 panel door with VVVF for soft closing & opening with Nudging function',
    DoorClearOpeningHeightinmm: '2100 mm Automatic Telescopic Side Opening 2 panel door with VVVF for soft closing & opening with Nudging function',
    sensorOnCabinDoor: 'CE certified Optical light curtain'
  }




  DumbwaitersData = {
    Motor: 'Industrial Duty Brake Motor with integrated Disc brake',
    Gearbox: 'Self-Lubricated Gearbox. Lubricated for life long use',
    Controller: 'Call & Dispatch Mode'
  }





  selectedFieldsDumbwaiters = { ...this.DumbwaitersData }

  // selectedFieldsStretcher elevatoris.DumbwaitersData}



  // Default values based on series selection
  msPowderCoatedFields = {
    sidePanels: 'Stylish Patterned Panel with Striped Bottom half',
    rearPanels: 'Bottom Half - Striped Patterned Panel',
    mirror: 'Top half mirror on rear wall',
    flooring: 'High Density Vinyl - Grey',
    ceiling: 'Single sheet flat panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted SS hairline Finish',
    lopPlate: 'Surface Mounted SS hairline Finish',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2000 mm',
    carDoorPanel: 'MSPC',
    landingDoorFrame: 'MSPC - Slimline 50mm',
    landingDoorPanel: 'MSPC',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  ssVerticalFields = {
    sidePanels: 'Vertical SS Panels',
    rearPanels: 'Bottom Half - Vertical SS Panels',
    mirror: 'Top half mirror on rear wall',
    flooring: 'High Density Vinyl - Grey',
    ceiling: 'SS Patterned Single sheet flat panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted SS hairline Finish',
    lopPlate: 'Surface Mounted SS hairline Finish',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Hairline/Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2000 mm',
    carDoorPanel: 'SS Hairline',
    landingDoorFrame: 'SS Hairline - Slimline 50mm',
    landingDoorPanel: 'SS Hairline',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  preCoatedSSFields = {
    sidePanels: 'Pre-Coated SS Finish Horizontal Panels with Rose Mirror Strips',
    rearPanels: 'Pre-Coated SS Finish Horizontal Panels with Rose Mirror Strips with half Height Mirror',
    mirror: 'Top half mirror on rear wall',
    flooring: 'High Density Vinyl - Grey',
    ceiling: 'SS Patterned Single sheet flat panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted SS hairline Finish',
    lopPlate: 'Surface Mounted SS hairline Finish',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Hairline/Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'SS Finish',
    landingDoorFrame: 'SS Finish - 90mm',
    landingDoorPanel: 'SS Finish',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };


  coffeeBeanFields = {
    sidePanels: 'Stylish Wave Patterned Panel',
    rearPanels: 'Wave Patterned Panel in center',
    mirror: 'Two Slim Full Height Mirror on Rear Panel',
    flooring: 'Marble - Crème Polarsis',
    ceiling: 'SS Bronze Mirror Patterned Single Sheet Panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted Bronze Hairline',
    lopPlate: 'Surface Mounted Bronze Hairline',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Rose Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Coffee Bean Colored Metal Sheet Panels',
    landingDoorFrame: 'Coffee Bean Colored Metal Sheet Frame-90mm',
    landingDoorPanel: 'Coffee Bean Colored Metal Sheet Panels',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };


  ssClassicFields = {
    sidePanels: 'Stainless Steel Hairline Finish Horizontal Panels with Rose Mirror Strips',
    rearPanels: 'SS Hairline Finish Horizontal Panels with Rose Mirror Strips',
    mirror: 'Top half mirror on rear wall',
    handrail: 'SS Hairline',
    flooring: 'Arabescato Tile (high Density)',
    ceiling: 'SS Designer roof with Rose strips',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted SS hairline Finish',
    lopPlate: 'Surface Mounted SS hairline Finish',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Hairline/Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'SS Hairline Finish',
    landingDoorFrame: 'SS Hairline Finish-90mm',
    landingDoorPanel: 'SS Hairline Finish',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  darkWoodFields = {
    sidePanels: 'Stylish Patterned Panel with Striped Bottom half',
    rearPanels: 'Bottom Half - Striped Patterned Panel',
    mirror: 'Top Half Mirror on Rear Wall',
    handrail: 'SS Bronze',
    flooring: 'High density PVC - Wood',
    ceiling: 'SS Bronze Mirror - Single sheet flat panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Surface Mounted Bronze Finish',
    lopPlate: 'Surface Mounted Bronze Finish',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Rose Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Dark Wood Colored Metal Sheet Panels',
    landingDoorFrame: 'Dark Wood Colored Metal Sheet Frame-90mm',
    landingDoorPanel: 'Dark Wood Colored Metal Sheet Panels',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  glenberryFields = {
    sidePanels: 'Horizontal Panels Checkered with SS Rose Mirror Strips',
    rearPanels: 'Horizontal Panels Checkered with SS Rose Mirror Strips',
    mirror: 'Top Half Mirror on Rear Wall',
    handrail: 'SS Bronze',
    flooring: 'Marble - Red Sparkling',
    ceiling: 'SS Rose Mirror - Single sheet flat panel',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Red Touch - Glass COP',
    lopPlate: 'Red Touch - Glass LOP',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Mirror Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Rose Mirror Panel',
    landingDoorFrame: 'Rose Hairline -Wide 90mm',
    landingDoorPanel: 'Rose Mirror Panel',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  castSilverFields = {
    sidePanels: 'Vertical Hash Silver with SS Black Hairline Panels',
    rearPanels: 'Vertical Hash Silver Panels',
    mirror: 'Vertical full height Mirror on Sides',
    handrail: 'Hash Silver',
    flooring: 'Grigio Serena Tile (high Density)',
    ceiling: 'Wave Laser Cut Black Mirror Ceiling',
    lighting: 'Backlit with LED Downlights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'SS Textured Hash with SS back plate',
    lopPlate: 'SS Textured',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Textured Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Hash Silver Panels',
    landingDoorFrame: 'Hash Silver Panels-90mm',
    landingDoorPanel: 'Hash Silver Panels',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  patinaGoldFields = {
    sidePanels: 'Vertical Hash Gold with SS Black Hairline Panel',
    rearPanels: 'Vertical Hash Gold Panels',
    mirror: 'Vertical full height Mirror on Sides',
    handrail: 'Hash Gold',
    flooring: 'Black Marquina Tile (high Density)',
    ceiling: 'Wave Laser Cut Black Mirror Ceiling',
    lighting: 'Blacklite LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'SS Bronze Hairline with SS Bronze back plate',
    lopPlate: 'SS Bronze Hairline',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Bronze Hairline Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Hash Gold Panels',
    landingDoorFrame: 'Hash Gold Panels-90mm',
    landingDoorPanel: 'Hash Gold Panels',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  javaLatticeFields = {
    sidePanels: 'Vertical Checkered Panels with SS Rose Mirror Strips',
    rearPanels: 'Vertical Checkered Panels',
    mirror: 'Vertical full height Mirror on center',
    flooring: 'ROSO LEVANTO Tile (high Density)',
    ceiling: 'Laser Cut Bronze Backlit Mirror Ceiling',
    lighting: 'LED Down Ceiling Lights',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'SS Bronze Hairline with SS Bronze back plate',
    lopPlate: 'SS Bronze Hairline',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Bronze Hairline Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Rose Mirror Panel',
    landingDoorFrame: 'Rose Hairline -Wide 90mm',
    landingDoorPanel: 'Rose Mirror Panel',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  tanWoodFields = {
    sidePanels: 'Wood Finish & Vertical Leather buttoned Panels',
    rearPanels: 'Vertical Patterned Wood finish Panels',
    mirror: 'Oval Shape half Looking Glass',
    handrail: 'Leather',
    flooring: 'Honey Onyx Tile (high Density)',
    ceiling: 'Laser Cut Double Layered SS Rose Mirror',
    lighting: 'Laser Cut Backlit',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'SS Bronze Hairline with SS Bronze back plate',
    lopPlate: 'SS Bronze Hairline',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Bronze Hairline Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Wood Finish Panels',
    landingDoorFrame: 'Wood Finish Panels -Wide 120 mm',
    landingDoorPanel: 'Wood Finish Panels',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  spiritedCongacFields = {
    sidePanels: 'Horizontal Leather Panels with Rose Mirror & Rose Hairline Panels',
    rearPanels: 'Horizontal Leather Panels with Rose Mirror Panels',
    mirror: 'Half Rose Mirror',
    handrail: 'Leather',
    flooring: 'Black Antigua Tile (high Density)',
    ceiling: 'Laser Cut Double Layered SS Rose Mirror',
    lighting: 'Laser Cut Backlit',
    fan: 'Hidden Cross Flow Blower',
    copPlate: 'Black bold Spanish Indicator (UFO)',
    lopPlate: 'Black bold Spanish Indicator (UFO)',
    display: 'Seven Segment with position & directional indicator',
    pushButtons: 'Soft touch with visual LED SS Bronze Hairline Finish',
    doorOperation: 'Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function',
    doorClearOpeningsWidth: '800 mm',
    doorClearOpeningHeight: '2100 mm',
    carDoorPanel: 'Rose Mirror Panel',
    landingDoorFrame: 'Rose Hairline -Wide 120mm',
    landingDoorPanel: 'Rose Mirror Panel',
    sensorOnCabin: 'Multi beam Optical light curtain'
  };

  dropdownOptions = {
    sidePanels: [

      "Stylish Patterned Panel with Striped Bottom half",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Bottom Half - Striped Patterned Panel",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
    mirror: [
      "Top half mirror on rear wall",
      "Two Slim Full Height Mirror on Rear Panel",
      "Full Height Mirror on Rear Panel",
      "No Mirror"
    ],
    handrail: [
      "SS Hairline",
      "SS Bronze",
      "Hash Silver",
      "Hash Gold",
      "Leather"
    ],
    flooring: [
      "High Density Vinyl - Grey",
      "Marble - Crème Polarsis (coffee bean)",
      "Arabescato Tile (SS Std)",
      "High density PVC - Wood",
      "Marble - Red Sparkling (Glenberry)",
      "Grigio Serena Tile (Cast Silver)",
      "Black Marquina Tile (Patina Gold)",
      "Roso Levanto Tile (Java Lattice)",
      "Honey Onyx Tile (Spirited Cognac)",
      "Black Antigua Tile (Tan Wood)",
      "Client Scope"
    ],
    ceiling: [
      "Single sheet flat panel MS",
      "SS Patterned Single sheet flat panel",
      "SS Bronze Mirror Patterned Single Sheet Panel",
      "SS Designer roof with Rose strips",
      "SS Bronze Mirror - Single sheet flat panel",
      "SS Rose Mirror - Single sheet flat panel",
      "Minimalist with Milky white Acrylic Sheet",
      "Laser Cut Bronze Backlit Mirror Ceiling"
    ],
    lighting: ["LED Down Ceiling Lights"],
    fan: ["Hidden Cross Flow Blower"],
    copPlate: [
      "Surface Mounted SS hairline Finish",
      "Surface Mounted Bronze Hairline",
      "Red Touch - Glass COP",
      "SS Textured Hash with SS back plate",
      "SS Bronze Hairline with SS Bronze back plate",
      "Black bold Spanish Indicator (UFO)"
    ],
    lopPlate: [
      "Surface Mounted SS hairline Finish",
      "Surface Mounted Bronze Hairline",
      "Red Touch - Glass LOP",
      "SS Textured",
      "Black bold Spanish Indicator (UFO)"
    ],
    display: [
      "Seven Segment Serial Communication segment & directional indicator."
    ],
    pushButtons: ["With braille", "Without braille"],
    typeOfDoor: ["Solid Doors", "Big Vision Glass Doors", "View Window"],
    doorOperation: [
      "Automatic Side/Center Opening 2 panel doors with soft close & Open with Nudging function"
    ],
    doorClearOpeningsWidth: ["600 mm", "700 mm", "800 mm", "900 mm", "1000 mm"],
    doorClearOpeningHeight: ["2000 mm", "2100 mm"],
    carDoorPanel: [
      "MSPC",
      "SS Hairline",
      "SS Finish",
      "Coffee Bean Colored Metal Sheet Panels",
      "SS Hairline Finish",
      "Dark Wood Colored Metal Sheet Panels",
      "Rose Mirror Panel",
      "Hash Silver Panels",
      "Hash Gold Panels",
      "Wood Finish Panels"
    ],
    landingDoorFrame: [
      "MSPC",
      "SS Hairline",
      "SS Finish",
      "Coffee Bean Colored Metal Sheet Frame",
      "SS Hairline Finish",
      "Dark Wood Colored Metal Sheet Frame",
      "Rose Hairline",
      "Hash Silver Panels",
      "Hash Gold Panels",
      "Wood Finish Panels"
    ],
    landingDoorPanel: [
      "MSPC",
      "SS Hairline",
      "SS Finish",
      "Coffee Bean Colored Metal Sheet Panels",
      "SS Hairline Finish",
      "Dark Wood Colored Metal Sheet Panels",
      "Rose Mirror Panel",
      "Hash Silver Panels",
      "Hash Gold Panels",
      "Wood Finish Panels"
    ]
  };

  dropdownOptionsForSidePanel1 = {
    sidePanels: [
      "Vertical SS Panels",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Bottom Half - Vertical SS Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel2 = {
    sidePanels: [
      "Pre Coated SS Finish Horizontal Panels with Rose Mirror Strips",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Pre Coated SS Finish Horizontal Panels with Rose Mirror Strips with half Height Mirror",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel3 = {
    sidePanels: [
      "Stylish Wave Patterned Panel",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Wave Patterned Panel in center",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }
  dropdownOptionsForSidePanel4 = {
    sidePanels: [
      "Stainless Steel Hairline Finish Horizontal Panels with Rose Mirror Strips",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "SS Hairline Finish Horizontal Panels with Rose Mirror Strips",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel5 = {
    sidePanels: [
      "Stylish Patterned Panel with Striped Bottom half",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Bottom Half - Striped Patterned Panel",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }


  dropdownOptionsForSidePanel6 = {
    sidePanels: [
      "Horizontal Panels Checkered with SS Rose Mirror Strips",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Horizontal Panels Checkered with SS Rose Mirror Strips",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }



  dropdownOptionsForSidePanel7 = {
    sidePanels: [
      "Vertical Hash Silver Panels with SS Mirror Panel",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Vertical Hash Silver Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel8 = {
    sidePanels: [
      "Vertical Hash Gold Panels with SS Black Mirror Panel",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Vertical Hash Gold Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel9 = {
    sidePanels: [
      "Vertical Checkered Panels with SS Rose Mirror Strips",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Vertical Checkered Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel11 = {
    sidePanels: [
      "Horizontal Leather Panels with Rose Mirror & Rose Hairline Panels",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Horizontal Leather Panels With Rose Mirror Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }

  dropdownOptionsForSidePanel10 = {
    sidePanels: [
      "Wood Finish & Vertical Leather buttoned Panles",
      "Full Glass on left side",
      "Full Glass on right side"
    ],
    rearPanels: [
      "Vertical Patterned Wood finish Panels",
      "No Mirror",
      "Full Glass on Rear panel"
    ],
  }


  dropdownOptionsForSSverticalCeiling = {
    ceiling: [
      "Single sheet flat panel MS",
      "SS Patterned Single sheet flat panel",
      "SS Bronze Mirror Patterned Single Sheet Panel",
      "SS Designer roof with Rose strips",
      "SS Bronze Mirror - Single sheet flat panel",
      "SS Rose Mirror - Single sheet flat panel",
      "Minimalistist with Milky white Acrylic Sheet",
      "Wave Laser Cut Black Mirror Ceiling",
      "Laser Cut Bronze Backlit Mirror Ceiling",
      "Laser Cut Double Layered SS Rose Mirror"

    ],

  }




  selectedFieldsElevators = { ...this.FreightLongData }
  selectedFieldsSpecialElevators = { ...this.SpecialElevator }



  selectedFields = { ...this.msPowderCoatedFields }; // Default to MS powder coated
  selectedSeriesPowderCoated: any
  selectedSeriesSSvertical: any
  selectedSeriesPreCoatedSS: any
  selectedSeriesCoffeeBean: any
  selectedSeriesSSclassic: any
  selectedSeriesDarkWood: any

  selectedSeriesGleberry: any
  selectedSeriesCastSilver: any
  selectedSeriesPatinaGold: any
  selectedSeriesJavaLattice: any
  selectedSeriesSpiritedCognac: any
  selectedSeriesTanWood: any








  dropdownOptionsForSidePanelFreight = {
    sidePanels: [
      "Mild Steel cold formed & paint finished",
      "Stainless Steel cold formed & paint finished"
    ],
    rearPanels: [
      "Mild Steel cold formed & paint finished",
      "Stainless Steel cold formed & paint finished"
    ],
    flooring: [
      "MS Heavy Checkered Plate",
      "SS Checkered Plate"
    ],
    model: [
      'Automobile – SS - MD – MRL- STD',
      'Automobile – SS - AD – MRL-STD',
      'Automobile – SS - MD – MR- STD',
      'Automobile – SS - AD – MR-STD',
      'Automobile – MS - MD – MRL- STD',
      'Automobile – MS - AD – MRL-STD',
      'Automobile – MS - MD – MR- STD',
      'Automobile – MS - AD – MR-STD',
      'Freight – SS - MD – MRL- STD',
      'Freight – SS - AD – MRL-STD',
      'Freight – SS - MD – MR- STD',
      'Freight – SS - AD – MR-STD',
      'Freight – MS - MD – MRL- STD',
      'Freight – MS - AD – MRL-STD',
      'Freight – MS - MD – MR- STD',
      'Freight – MS - AD – MR-STD'
    ],
    protection: [
      "Impact Resistant Beam at 600 mm level on all sides."
    ],
    skirting: [
      "3 mm plate to prevent cabin damage."
    ],
    lighting: [
      "LED Lighting"
    ],
    fan: [
      "Round cross flow fan"
    ],
    frame: [
      "Mild Steel front Peripheral frame.",
      "Stainless Steel front Peripheral frame."
    ]
  }





  dropdownValuesForDumbwaiters = {
    model: [
      "DW-SS-FLD",
      "DW-MS-FLD",
      "DW-SS-CMD",
      "DW-MS-CMD",
      "DW-SS-SOD",
      "DW-MS-SOD",
      "SW-SS-VBP",
      "DW-MS-VBP"
    ],
    sidePanels: [
      "Mild Steel Single panel cold formed",
      "Stainless Steel 304 grade Single panel Cold formed"
    ],
    rearPanels: [
      "Mild Steel Single panel cold formed",
      "Stainless Steel 304 grade Single panel Cold formed"
    ],
    partition: [
      "Removable Glass Partition"
    ],
    lighting: [
      "LED Down Lighting"
    ],
    carDoor: [
      "Collapsible Manual Door",
      "Side opening Collapsible Door",
      "Vertical Bi-Parting Door",
      "Open type (No door)"
    ],
    plateLOP: [
      "Stainless Steel Brush Finish"
    ],
    display: [
      "Seven Segment car position with directional indicator"
    ],
    landingDoor: [
      "Collapsible Manual Doors",
      "Foldable Doors",
      "Vertical Bi-Parting Doors",
      "Side Opening Sliding Doors"
    ],
    typeOfDoor: [
      "Collapsible Manual Door. The door slides open horizontally",
      "Foldable type door with a View Window. The door folds open horizontally sideways in two parts.",
      "Side Opening Door with a View Window. The door opens horizontally sideways in two parts.",
      "Vertical Bi-Parting Door with a View Window. The door opens vertically in two parts. One half goes Up and the other half goes Down."
    ],
    // doorWidth: [],
    // doorHeight: [],
    landingDoorFrame: [
      "Stainless Steel 304 grade Panel",
      "Mild Steel Panel"
    ],
    landingDoorPanel: [
      "Stainless Steel 304 grade Panel",
      "Mild Steel Panel"
    ],
    interlockMechanicalElectrical: [
      "CMD: Mechanical Interlock (to facilitate that the car remains stationary when the door is open and prevent the landing door from opening when the car is not at floor level)",
      "FD: Electrical Interlock (To facilitate that the car remains stationary when the door is open)",
      "VBD: Electrical Interlock (To facilitate that the car remains stationary when the door is open)",
      "SOD: Electrical Interlock (To facilitate that the car remains stationary when the door is open)"
    ]
  };



  dropdownValuesForStretcherElevator = {
    model: [
      "Automobile – SS - MD – MRL- STD",
      "Automobile – SS - AD – MRL-STD",
      "Automobile – SS - MD – MR- STD",
      "Automobile – SS - AD – MR-STD",
      "Automobile – MS - MD – MRL- STD",
      "Automobile – MS - AD – MRL-STD",
      "Automobile – MS - MD – MR- STD",
      "Automobile – MS - AD – MR-STD",
      "Freight – SS - MD – MRL- STD",
      "Freight – SS - AD – MRL-STD",
      "Freight – SS - MD – MR- STD",
      "Freight – SS - AD – MR-STD",
      "Freight – MS - MD – MRL- STD",
      "Freight – MS - AD – MRL-STD",
      "Freight – MS - MD – MR- STD",
      "Freight – MS - AD – MR-STD"
    ],
    sidePanels: [
      "Mild Steel cold formed & paint finished.",
      "Stainless Steel cold formed & paint finished."
    ],
    rearPanels: [
      "Mild Steel cold formed & paint finished.",
      "Stainless Steel cold formed & paint finished."
    ],
    flooring: [
      "MS Heavy Checkered Plate",
      "SS Checkered Plate",
      "High Density Grey Vinyl"
    ],
    protection: [
      "Impact Resistant Beam at 600 mm level on all sides."
    ],
    skirting: [
      "3 mm plate to prevent cabin damage."
    ],
    lighting: [
      "LED Lighting"
    ],
    fan: [
      "Round cross flow fan"
    ],
    frame: [
      "Mild Steel front Peripheral frame.",
      "Stainless Steel front Peripheral frame."
    ]
  };

  dropdownValuesForFreightElevators = {
    typeOfDoor: [
      "Manual Doors - Impact Resistant Doors",
      "Automatic Doors (Automatic Centre Opening 6 panel Type) Mild Steel Painted Finish with VVVF for soft close & open with Nudging function"
    ],
    manualDoorOptions: {
      doorWidth: ["2600 mm"],
      doorHeight: ["2100 mm"],
      doorPanels: [
        "Cold formed vertical channels. High resistance to impact. Overhung type with rollers which are bearing mounted. Steel stokers at bottom. Channel type cold formed sill ddd with frame."
      ],
      landingDoorFrame: ["Mild Steel Paint / PC Finish"],
      carInterlock: [
        "The car door is fitted with an electrical interlock and the car will not move unless the door is closed."
      ],
      landingDoorInterlock: [
        "The landing door has a mechanical cum electrical interlock. The door will not open unless the car is at floor level and the car will not move unless the door is closed."
      ]
    },
    automaticDoorOptions: {
      doorWidth: ["2600 mm"],
      doorHeight: ["2100 mm"],
      doorPanels: ["Mild Steel Painted / PC Finish", "Stainless Steel Grade 304"],
      doorFrame: ["Mild Steel Paint / PC Finish", "Stainless Steel Grade 304"],
      carInterlock: [
        "The car door is fitted with an electrical interlock and the car will not move unless the door is closed."
      ],
      landingDoorFrame: [
        "The landing door has a mechanical cum electrical interlock. The door will not open unless the car is at floor level and the car will not move unless the door is closed."
      ]
    }
  };


  carDesignOptions = [
    'Smart City Elevator - Basic "MS Powder Coated"',
    'Smart City Elevator – Awesome "SS Precoated Finish"',

    'Smart City Elevator – Awesome "Silver TEX"',
    'Smart City Elevator – Elite “Stainless Steel Classic"',
    'Smart City Elevator – Elite “Dark Wood"',
    'Smart City Elevator – Elite “Coffee Bean"',
    'Smart City Elevator – Grande "Glenberry"',
    'Smart City Elevator – Grande “Royal White Gold"',
  ];

  modelOptions = [
    'Passenger - Basic "MS Powder Coated"',
    'Passenger - Awesome "SS Precoated Finish"',
    'Passenger - Awesome "Silver TEX"',
    'Passenger - Elite "Stainless Steel Classic"',
    'Passenger - Elite "Dark Wood"',
    'Passenger - Elite "Coffee Bean"',
    'Passenger - Grande "Glenberry"',
    'Passenger - Grande "Royal White Gold"'


  ];



  // dropdownData = {
  //   'Smart City Elevator - Basic "MS Powder Coated"': {
  //     'Passenger - Basic "MS Powder Coated"': {
  //       sidePanels: [
  //         'Std: Vertical Metal Sheet Panels Powder Coated',
  //         'Full Glass on left side',
  //         'Full Glass on right side'
  //       ],
  //       rearPanels: [
  //         'Std: Bottom Half Vertical Metal Sheet Panels Powder Coated',
  //         'Vertical Metal Sheet Panels Powder Coated with no Mirror',
  //         'Full Glass on Rear Panel'
  //       ],
  //       mirror: ['Std: Top Half Mirror on Rear Wall', 'No Mirror', 'Full Height Mirror'],
  //       flooring: ['High Density Grey Vinyl', 'Client Scope'],
  //       ceiling: ['Powder Coated'],
  //       lightings: ['LED Down Lighting'],
  //       fan: ['Hidden Cross Flow Fan'],
  //       copPlate: ['Std: Stainless Steel Brush Finish'],
  //       display: ['Seven segment, overload & directional indicator.'],
  //       pushButtons: ['Soft touch with visual LED']
  //     }
  //   },
  //   'Smart City Elevator – Awesome "SS Precoated Finish"': {
  //     'Passenger - Awesome "SS Precoated Finish"': {
  //       sidePanels: [
  //         'Std: Precoated SS Panels',
  //         'Full Glass on left side',
  //         'Full Glass on right side'
  //       ],
  //       rearPanels: [
  //         'Std: Precoated SS panel at the bottom',
  //         'Precoated SS Panel with no Mirror',
  //         'Full Glass on Rear Panel'
  //       ],
  //       mirror: ['Std: Top Half Mirror on Rear Wall', 'No Mirror', 'Full Height Mirror'],
  //       flooring: ['High Density Vinyl Grey Color', 'Client Scope'],
  //       ceiling: ['SS Precoated Finish'],
  //       lightings: ['LED Down Lighting'],
  //       fan: ['Hidden Cross Flow Fan'],
  //       copPlate: ['Std: Stainless Steel Brush Finish'],
  //       display: ['Seven segment, overload & directional indicator.'],
  //       pushButtons: ['Soft touch with visual LED']
  //     }
  //   }
  // };


  Cardesign: any[] = [
    { id: 1, name: 'Smart City Elevator – Basic "MS Powder Coated"' },
    { id: 2, name: 'Smart City Elevator – Awesome "SS Precoated Finish"' },
    { id: 3, name: 'Smart City Elevator – Awesome "Silver TEX"' },
    { id: 4, name: 'Smart City Elevator – Elite "Stainless Steel Classic"' },
    { id: 5, name: 'Smart City Elevator – Elite "Dark Wood"' },
    { id: 6, name: 'Smart City Elevator – Elite "Coffee Bean"' },
    { id: 7, name: 'Smart City Elevator – Grande "Glenberry"' },
    { id: 8, name: 'Smart City Elevator – Grande "Royal White Gold"' }
  ];

  ModelDesign: any[] = [
    { id: 1, name: 'Passenger - Basic "MS Powder Coated"' },
    { id: 2, name: 'Passenger - Awesome "SS Precoated Finish"' },
    { id: 3, name: 'Passenger - Awesome "Silver TEX"' },
    { id: 4, name: 'Passenger - Elite "Stainless Steel Classic"' },
    { id: 5, name: 'Passenger - Elite "Dark Wood"' },
    { id: 6, name: 'Passenger - Elite "Coffee Bean"' },
    { id: 7, name: 'Passenger - Grande "Glenberry"' },
    { id: 8, name: 'Passenger - Grande "Royal White Gold"' }
  ];

  AutomaticDoor: any[] = [
    { id: 1, name: 'Basic "MS Powder Coated"' },
    { id: 2, name: 'Awesome "SS Precoated Finish"' },
    { id: 3, name: 'Awesome "Silver TEX"' },
    { id: 4, name: 'Elite "Stainless Steel Classic"' },
    { id: 5, name: 'Elite "Dark Wood"' },
    { id: 6, name: 'Elite "Coffee Bean"' },
    { id: 7, name: 'Grande "Glenberry"' },
    { id: 8, name: 'Grande "Royal White Gold"' }
  ];


  sidePanels: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"',
      data: [
        "Std: Vertical Metal Sheet Panels Powder Coated",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Std: Precoated SS Panels",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Std: Patterned SS Precoated Textured Finish Panels",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Std: Stainless 304 grade horizontal Panels with Rose Mirror Strips",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Std: Patterned Dark Wood Colored Metal Sheet Panels",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Std: Patterned Coffee Bean Colored Metal Sheet Panels",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Std: Caramel Brown textured colored sheet with Rose Mirror Strips",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Std: Folded Gold Hairline, Royal White & Pearl Squares",
        "Full Glass on left side",
        "Full Glass on right side"
      ]
    }
  ];

  rearPanels: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"',
      data: [
        "Std: Bottom Half Vertical Metal Sheet Panels Powder Coated",
        "Vertical Metal Sheet Panels Powder Coated with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Std: Precoated SS panel at the bottom",
        "Precoated SS Panel with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Std: Patterned SS Precoated Textured Finish Panels at the bottom",
        "Patterned SS Precoated Textured Finish Panels with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Std: Stainless 304 grade horizontal Panels with Rose Mirror Strips",
        "Stainless 304 grade horizontal Panels with Rose Mirror Strips with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Std: Patterned Dark Wood Colored Metal Sheet Panels",
        "Patterned Dark Wood Colored Metal Sheet Panels with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Std: Single Centre Patterned Coffee Bean Colored Metal Sheet Panels",
        "Single Centre Patterned Coffee Bean Colored Metal Sheet Panels no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Std: Caramel Brown textured colored sheet with Rose Mirror Strips",
        "Caramel Brown textured colored sheet with Rose Mirror Strips with no Mirror",
        "Full Glass on Rear Panel"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Std: Gold Hairline Strip on Bottom and Top",
        "Folded Gold Hairline, Royal White & Pearl Squares with Gold hairline strip and no Mirror",
        "Full Glass on Rear Panel"
      ]
    }
  ];

  mirror: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Std: Top Half Mirror on Rear Wall",
        "No Mirror",
        "Full Height Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Std: Top Half Mirror on Rear Wall",
        "No Mirror",
        "Full Height Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Std: Top Half Mirror on Rear Wall",
        "No Mirror",
        "Full Height Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Std: Top Half Mirror on Rear Wall",
        "No Mirror",
        "Full Height Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Std: Top Half Mirror on Rear Wall",
        "No Mirror",
        "Full Height Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Std: Two Slim Full Height Mirror on Rear Panel",
        "Full Height Mirror",
        "No Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Std: Two Slim Full Height Mirror on Rear Panel",
        "Full Height Mirror",
        "No Mirror"
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Std: Full Height Mirror on Rear Panel",
        "No Mirror"
      ]
    }
  ];

  flooringOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "High Density Grey Vinyl ",
        "Client Scope",
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "High Density Vinyl Grey Color",
        "Client Scope",
      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "High Density Vinyl Grey Color",
        "Client Scope",
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "High Density Vinyl Grey Color",
        "Client Scope",
      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "High Density Wooden Flooring",
        "Client Scope",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Polaris Marble Stone",
        "Client Scope",
      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Red Quartz Marble",
        "Client Scope",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Polaris Marble Stone",
        "Client Scope",
      ]
    }
  ];

  ceilingOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Powder Coated",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "SS Precoated Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "SS Precoated Textured Finish Panels",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Designer Stainless with Rose Mirror Bands",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Bronze Mirror Finish",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Bronze Mirror Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Rose Mirror Finish",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Gold Mirror Finish",

      ]
    }
  ];

  lightingsOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "LED Down Lighting",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "LED Down Lighting",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "LED Down Lighting",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "LED Down Lighting",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "LED Down Lighting",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "LED Down Lighting",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "LED Down Lighting",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "LED Down Lighting",

      ]
    }
  ];

  fanOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Hidden Cross Flow Fan",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Hidden Cross Flow Fan",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Hidden Cross Flow Fan",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Hidden Cross Flow Fan",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Hidden Cross Flow Fan",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Hidden Cross Flow Fan",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Hidden Cross Flow Fan",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Hidden Cross Flow Fan",

      ]
    }
  ];

  copPlateOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Std: Stainless Steel Brush Finish",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Std: Stainless Steel Brush Finish",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Std: Stainless Steel Brush Finish",

      ]
    }
  ];

  displayOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Seven segment, overload & directional indicator",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Seven segment, overload & directional indicator",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Seven segment, overload & directional indicator",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Seven segment, overload & directional indicator",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Seven segment, overload & directional indicator",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Seven segment, overload & directional indicator",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Seven segment, overload & directional indicator",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Seven segment, overload & directional indicator",

      ]
    }
  ];

  pushButtonOptions: any[] = [
    {
      car: 'Smart City Elevator – Basic "MS Powder Coated"', model: 'Passenger - Basic "MS Powder Coated"', data: [
        "Soft touch with visual LED",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "SS Precoated Finish"', model: 'Passenger - Awesome "SS Precoated Finish"', data: [
        "Soft touch with visual LED",

      ]
    },
    {
      car: 'Smart City Elevator – Awesome "Silver TEX"', model: 'Passenger - Awesome "Silver TEX"', data: [
        "Soft touch with visual LED",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Stainless Steel Classic"', model: 'Passenger - Elite "Stainless Steel Classic"', data: [
        "Soft touch with visual LED",

      ]
    },
    {
      car: 'Smart City Elevator – Elite "Dark Wood"', model: 'Passenger - Elite "Dark Wood"', data: [
        "Soft touch with visual LED",


      ]
    },
    {
      car: 'Smart City Elevator – Elite "Coffee Bean"', model: 'Passenger - Elite "Coffee Bean"', data: [
        "Soft touch with visual LED",

      ]
    },
    {
      car: 'Smart City Elevator – Grande "Glenberry"', model: 'Passenger - Grande "Glenberry"', data: [
        "Soft touch with visual LED",


      ]
    },
    {
      car: 'Smart City Elevator – Grande "Royal White Gold"', model: 'Passenger - Grande "Royal White Gold"', data: [
        "Soft touch with visual LED",

      ]
    }
  ];




  carDoorPanel: any[] = [
    {
      automatic: 'Basic "MS Powder Coated"', data: [
        "Powder Coated Metal Sheet Panels",

      ]
    },
    {
      automatic: 'Awesome "SS Precoated Finish"', data: [
        "Precoated SS Panels",

      ]
    },
    {
      automatic: 'Awesome"Silver TEX"', data: [
        "SS Precoated Textured Finish Panels",

      ]
    },
    {
      automatic: 'Elite "Stainless Steel Classic"', data: [
        "Stainless Steel 304 grade Panel",

      ]
    },
    {
      automatic: 'Elite "Dark Wood"', data: [
        "Dark Wood Colored Metal Sheet Panels",

      ]
    },
    {
      automatic: 'Elite "Coffee Bean"', data: [
        "Coffee Bean Colored Metal Sheet Panels",

      ]
    },
    {
      automatic: 'Grande "Glenberry"', data: [
        "Rose Mirror Finish",

      ]
    },
    {
      automatic: 'Grande "Royal White Gold"', data: [
        "Gold Mirror Door Panel",

      ]
    },
  ];

  LandingDoorPanel: any[] = [
    { automatic: 'Basic "MS Powder Coated"', data: ["Powder Coated Metal Sheet Panels"] },
    { automatic: 'Awesome "SS Precoated Finish"', data: ["Precoated SS designer Panels"] },
    { automatic: 'Awesome "Silver TEX"', data: ["SS Precoated Textured Finish Panels"] },
    { automatic: 'Elite "Stainless Steel Classic"', data: ["Stainless Steel 304 grade Panel"] },
    { automatic: 'Elite "Dark Wood"', data: ["Dark Wood Colored Metal Sheet Panels"] },
    { automatic: 'Elite "Coffee Bean"', data: ["Coffee Bean Colored Metal Sheet Panels"] },
    { automatic: 'Grande "Glenberry"', data: ["Rose Mirror Finish"] },
    { automatic: 'Grande "Royal White Gold"', data: ["Gold Mirror Door Panel"] }
  ];


  LandingDoorFrame: any[] = [
    { automatic: 'Basic "MS Powder Coated"', data: ["Powder Coated Metal Frame"] },
    { automatic: 'Awesome "SS Precoated Finish"', data: ["Precoated SS Frame"] },
    { automatic: 'Awesome "Silver TEX"', data: ["SS Precoated Textured Finish Frame"] },
    { automatic: 'Elite "Stainless Steel Classic"', data: ["Stainless Steel 304 grade Frame"] },
    { automatic: 'Elite "Dark Wood"', data: ["Dark Wood Colored Metal Frame"] },
    { automatic: 'Elite "Coffee Bean"', data: ["Coffee Bean Colored Metal Frame"] },
    { automatic: 'Grande "Glenberry"', data: ["Rose Mirror Finished Frame"] },
    { automatic: 'Grande "Royal White Gold"', data: ["Gold Mirror Door Frame"] }
  ];

  SensorOnCabinDoor: any[] = [
    { automatic: 'Basic "MS Powder Coated"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Awesome "SS Precoated Finish"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Awesome "Silver TEX"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Elite "Stainless Steel Classic"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Elite "Dark Wood"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Elite "Coffee Bean"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Grande "Glenberry"', data: ["CE certified Optical light curtain"] },
    { automatic: 'Grande "Royal White Gold"', data: ["CE certified Optical light curtain"] }
  ];

  sidePanelsData: any[] = [];
  rearPanelsData: any[] = [];
  mirrorData: any[] = [];
  flooringData: any[] = [];
  ceilingData: any[] = [];
  lightingsData: any[] = [];
  fanData: any[] = [];
  copPlateData: any[] = [];
  displayData: any[] = [];
  pushButtonData: any[] = [];
  carDoorPanelData: any[] = [];
  LandingDoorPanelData: any[] = [];
  LandingDoorFrameData: any[] = [];
  SensorOnCabinDoorData: any[] = [];

  updateDropdownValues() {
    this.sidePanelsData = [];
    this.rearPanelsData = [];
    this.mirrorData = [];
    this.flooringData = [];
    this.ceilingData = [];
    this.lightingsData = [];
    this.fanData = [];
    this.copPlateData = [];
    this.displayData = [];
    this.pushButtonData = [];


    for (let i = 0; i < this.sidePanels.length; i++) {
      if (this.quotation.LongData.model == this.sidePanels[i].model && this.quotation.LongData.carDesigns == this.sidePanels[i].car) {
        this.sidePanelsData = this.sidePanels[i].data;
        // this.rearPanelsData = this.rearPanels[i].data
      }
      // console.log("sidepanels", this.sidePanelsData)
    }


    for (let i = 0; i < this.rearPanels.length; i++) {
      if (this.quotation.LongData.model == this.rearPanels[i].model && this.quotation.LongData.carDesigns == this.rearPanels[i].car) {
        // this.sidePanelsData = this.rearPanels[i].data;
        this.rearPanelsData = this.rearPanels[i].data
      }
      console.log("rearPanelsData", this.sidePanelsData)
    }

    for (let i = 0; i < this.mirror.length; i++) { // Added loop for mirror panel
      if (this.quotation.LongData.model == this.mirror[i].model && this.quotation.LongData.carDesigns == this.mirror[i].car) {
        this.mirrorData = this.mirror[i].data;
      }
      console.log("mirrorData", this.sidePanelsData)
    }

    for (let i = 0; i < this.flooringOptions.length; i++) {
      if (this.quotation.LongData.model == this.flooringOptions[i].model && this.quotation.LongData.carDesigns == this.flooringOptions[i].car) {
        this.flooringData = this.flooringOptions[i].data;
      }
    }
    for (let i = 0; i < this.ceilingOptions.length; i++) {
      if (this.quotation.LongData.model == this.ceilingOptions[i].model && this.quotation.LongData.carDesigns == this.ceilingOptions[i].car) {
        this.ceilingData = this.ceilingOptions[i].data;
      }
    }
    for (let i = 0; i < this.lightingsOptions.length; i++) {
      if (this.quotation.LongData.model == this.lightingsOptions[i].model && this.quotation.LongData.carDesigns == this.lightingsOptions[i].car) {
        this.lightingsData = this.lightingsOptions[i].data;
      }
    }
    for (let i = 0; i < this.fanOptions.length; i++) {
      if (this.quotation.LongData.model == this.fanOptions[i].model && this.quotation.LongData.carDesigns == this.fanOptions[i].car) {
        this.fanData = this.fanOptions[i].data;
      }
    }
    for (let i = 0; i < this.copPlateOptions.length; i++) {
      if (this.quotation.LongData.model == this.copPlateOptions[i].model && this.quotation.LongData.carDesigns == this.copPlateOptions[i].car) {
        this.copPlateData = this.copPlateOptions[i].data;
      }
    }
    for (let i = 0; i < this.displayOptions.length; i++) {
      if (this.quotation.LongData.model == this.displayOptions[i].model && this.quotation.LongData.carDesigns == this.displayOptions[i].car) {
        this.displayData = this.displayOptions[i].data;
      }
    }
    for (let i = 0; i < this.pushButtonOptions.length; i++) {
      if (this.quotation.LongData.model == this.pushButtonOptions[i].model && this.quotation.LongData.carDesigns == this.pushButtonOptions[i].car) {
        this.pushButtonData = this.pushButtonOptions[i].data;
      }
    }
  }


  updateAutomaticDoorValues() {
    this.carDoorPanelData = [];
    this.LandingDoorPanelData = [];
    this.LandingDoorFrameData = [];
    this.SensorOnCabinDoorData = [];
    this.selectedAutomaticDoor = this.quotation.Doors.automaticDoors;

    for (let i = 0; i < this.carDoorPanel.length; i++) {
      if (this.selectedAutomaticDoor == this.carDoorPanel[i].automatic) {
        this.carDoorPanelData = this.carDoorPanel[i].data;

      }
    }

    for (let i = 0; i < this.LandingDoorPanel.length; i++) {
      if (this.selectedAutomaticDoor == this.LandingDoorPanel[i].automatic) {
        this.LandingDoorPanelData = this.LandingDoorPanel[i].data;

      }
    }


    for (let i = 0; i < this.LandingDoorFrame.length; i++) {
      if (this.selectedAutomaticDoor == this.LandingDoorFrame[i].automatic) {
        this.LandingDoorFrameData = this.LandingDoorFrame[i].data;

      }
    }

    for (let i = 0; i < this.SensorOnCabinDoorData.length; i++) {
      if (this.selectedAutomaticDoor == this.SensorOnCabinDoor[i].automatic) {
        this.SensorOnCabinDoorData = this.SensorOnCabinDoor[i].data;

      }
    }

  }


  constructor(
    private modalService: NgbModal,
    private bridgeService2: BridgeService,
    private router: Router,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService,
    private http: HttpClient,
    private _location: Location
  ) {
    this.baseUrl2 = this.bridgeService2.baseUrl2;

  }

  ngOnInit(): void {

    if (!this.HeadingServices.isModuleView(5) || !this.HeadingServices.isModuleViewadd(5)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.ShippingType = this.bridgeService2.ShippingType;

    this.quotation.DocDueDate = this.HeadingServices.getPlusDayDate(30);
    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.quotation.SalesPersonCode = sessionStorage.getItem('SalesEmployeeCode');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule5();
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.getDynaimcFld('Quotation');
    this.getBridge();
    this.getIndustory();
    this.getCountry();
    this.getPaymentTerms();
    this.getBusinessPartmers();
    this.getOpportunity();
    this.getQuotationItem();
    this.getCustomerTypeList();
    this.bridgeService2.getStatedata('IN').subscribe(
      (data: States[]) => {
        this.statess2 = data;
        this.statess = data;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

    if (this.bridgeService2.getOpportunityID() != undefined) {
      var OppID = this.bridgeService2.getOpportunityID();
      this.selectChangeOpportunity(OppID);
    }

    if (this.bridgeService2.getBpCardcode() != undefined) {
      var CardCode = this.bridgeService2.getBpCardcode();
      this.selectChangeHandlerItem(CardCode);
    }

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
  }


  getDynaimcFld(name: any) {
    this.bridgeService2.GetDynamicFld(name).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.DynamicFiledPositionDetials = res.data;
          for (let i = 0; i < this.DynamicFiledPositionDetials.length; i++) {
            this.quotation[this.DynamicFiledPositionDetials[i].field_name] = '';
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

  getCustomerTypeList(): void {
    this.isLoading2 = true;
    this.bridgeService2.getBranchMasterPagination({
      PageNo: 1,
      maxItem: 'all'
    }, '', 'id', 'desc').subscribe(
      (data: any) => {
        this.customertype = data.data;

        if (this.customertype.length != 0) {
          this.quotation.BPLID = this.customertype[0].BPLId;
        }

      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }
  getPaymentTerms(): void {
    this.isLoading = true;
    this.bridgeService2.getPaymentTermsdata().subscribe(
      (data: PaymentTerm[]) => {
        this.paymentterms = data;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  ITemDataUpdate(event: any) {
  }
  getBranch(CardCode: any) {
    this.bridgeService2.getCustomerBranchdata(CardCode).subscribe((data: any[]) => {
      this.branchs = data;
      console.log('check data12', this.branchs);


    }, (err: string) => {
      this.error = err;
    }
    );

  }
  getBridge(): void {
    this.isLoading = true;
    this.bridgeService2.getAll().subscribe(
      (data: Bridge[]) => {
        this.isLoading = false;
        this.bridgess = data;
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
  getIndustory(): void {
    this.bridgeService2.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.industorys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  getCountry(): void {
    this.bridgeService2.getCountrydata().subscribe(
      (data: Country[]) => {
        this.countrys = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  selectedDay: any;
  code: any[] = ['IN', 'India'];
  filterVal: any = "";
  selectChangeHandler(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    // this.quotation.AddressExtension.BillToCountry = this.code[0]
    this.quotation.AddressExtension.U_BCOUNTRY = this.code[1]
    this.getState();
  }
  selectedDayState: any;
  codeState: any[] = [];
  selectChangeHandlerState(event: any) {
    // ;
    this.filterVal = this.statess.filter(($option: any) => $option.Code == event?.target?.value || event)[0];
    // console.log("qer", this.filterVal);
    // ;
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;
    this.quotation.AddressExtension.BillToState = this.codeState[0]
    this.quotation.AddressExtension.U_BSTATE = this.codeState[1]
    //  ;
    // console.log("qer1", this.quotation.AddressExtension.U_BSTATE);
  }
  getState(): void {
    this.bridgeService2.getStatedata(this.code[0]).subscribe(
      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  selectedDay2: any;
  code2: any[] = [];
  selectChangeHandler2(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code2[0] = this.filterVal.Code;
    this.code2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_SCOUNTRY = this.code2[1]
    this.getState2();
  }
  selectedDayState2: any;
  codeState2: any[] = [];

  selectChangeHandlerState2(event: any) {
    this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
    // console.log("qer6", this.filterVal);
    // this.selectedDayState2 = event.target.value;
    // this.codeState2 = this.selectedDayState2.split(',');
    this.codeState2[0] = this.filterVal.Code;
    this.codeState2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.ShipToState = this.codeState2[0]
    this.quotation.AddressExtension.U_SSTATE = this.codeState2[1]
    // console.log("qer1", this.quotation.AddressExtension.U_SSTATE);
  }
  getState2(): void {
    this.bridgeService2.getStatedata(this.code2[0]).subscribe(
      (data: States[]) => {
        this.statess2 = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  getBusinessPartmers(): void {
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.businesspartners = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }
  getOpportunity(): void {
    this.isLoading = true;
    this.bridgeService2.getOpportunityShortdata().subscribe(
      (data: opportunity[]) => {
        this.isLoading = false;
        this.opportunitys = data;
        //  console.log(this.opportunitys);

      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        this.error = err;
      }
    );
  }

  public QuatItems: any[] = [];
  itemPageNo: number = 1;

  CategroyIDD: any = 0;
  getQuotationItem2(id: any): void {
    this.CategroyIDD = id;
    this.paginDisplay = false;
    $('#CateCate').hide();
    $('#cateITem').show();
    $('.toggle-show').hide();
    $('.toggle-show1').show();
    this.isLoading2 = true;
    this.bridgeService2.getItemByPagination(this.pagination2, this.searchValue2, this.CategroyIDD, this.order_by_field2, this.order_by_value2).subscribe(
      (data: any) => {
        this.items = data.data;
        this.totalCount = data.meta.count;
        this.isLoading2 = false;
        if (this.pagination2.maxItem != 'All') {
          this.startind = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + 1;
          this.endind = ((this.pagination2.PageNo - 1) * Number(this.pagination2.maxItem)) + Number(this.pagination2.maxItem);
          if (this.endind > this.totalCount) {
            this.endind = this.totalCount;
          }
          this.pagination2.PageShow = Number(this.pagination2.maxItem);
        }
        else {
          this.isLoading2 = false;
          this.startind = 1;
          this.endind = this.totalCount;
          this.pagination2.PageShow = Number(this.totalCount);
        }
        if (this.totalCount == 0) {
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
  RowPerPage2() {
    this.pagination.PageNo = 1;
    this.getQuotationItem2(this.CategroyIDD);
  }
  emptySeach() {
    this.searchValue1 = '';
    this.getQuotationItem();
  }

  pageChanged2(event: any) {
    this.pagination2.PageNo = event;
    this.getQuotationItem2(this.CategroyIDD);
  }
  emptySeach2() {
    this.searchValue2 = '';
    this.RowPerPage2();
  }
  categorys: any[] = []
  getQuotationItem(): void {
    this.isLoading = true;
    this.bridgeService2.getItemCateByPagination(this.pagination, this.searchValue1, this.order_by_field, this.order_by_value).subscribe(
      (data: any) => {
        this.categorys = data.data;
        this.totalCount = data.meta.count;
        this.isLoading = false;
        if (this.pagination.maxItem != 'All') {
          this.startind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + 1;
          this.endind = ((this.pagination.PageNo - 1) * Number(this.pagination.maxItem)) + Number(this.pagination.maxItem);
          if (this.endind > this.totalCount) {
            this.endind = this.totalCount;
          }
          this.pagination.PageShow = Number(this.pagination.maxItem);
        }
        else {
          this.startind = 1;
          this.endind = this.totalCount;
          this.pagination.PageShow = Number(this.totalCount);
        }
        if (this.totalCount == 0) {
          this.startind = this.totalCount;
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = err;
      }
    );
  }

  RowPerPage() {
    this.pagination.PageNo = 1;
    this.getQuotationItem();
  }

  pageChanged(event: any) {
    this.pagination.PageNo = event;
    this.getQuotationItem();
  }
  // emptySeach(){
  //   this.searchValue = '';
  //   this.RowPerPage();
  // }

  open(content: any, item: any) {
    if (this.QuatItems.map(($item: any) => $item.ItemCode).includes(item.ItemCode)) {
      return;
    }
    else {
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );

      this.ItemId = item.id;
      this.ItemNAme = item.ItemName;
      this.ItemQty = 1;
      this.ItemDis = item.Discount;
      this.ItemCode = item.ItemCode;
      this.ItemPrice = item.UnitPrice;
      this.ItemDueDate = ''
      this.TaxCode = item.TaxCode;
      // this.TaxCode = 'IGST12';
      this.TaxRate = item.Tax;
    }
  }
  // addItemType: string = 'paid';
  add_items() {
    $('#add_quat').hide();
    $('#select_item').show();
    $('#CateCate').show();
    $('#cateITem').hide();
    $('#selected_item').hide();

    $('.toggle-show').show();
    $('.toggle-show1').hide();
  }

  getValues(obj: {}) {
    return Object.values(obj);
  }
  back() {
    this.searchValue1 = '';
    this.searchValue2 = '';
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
  }
  back2() {
    this.searchValue1 = '';
    this.searchValue2 = '';
    this.paginDisplay = true;
    this.getQuotationItem();
    $('#add_quat').hide();
    $('#select_item').show();
    $('#CateCate').show();
    $('#cateITem').hide();
    $('#selected_item').hide();

    $('.toggle-show').show();
    $('.toggle-show1').hide();
  }
  showitem() {
    if (this.CountItem == 0) {
      $('#add_quat').hide();
      $('#select_item').show();
      $('#selected_item').hide();


      $('#CateCate').show();
      $('#cateITem').hide();
      $('.toggle-show').show();
      $('.toggle-show1').hide();
    } else {
      $('#add_quat').hide();
      $('#select_item').hide();
      $('#selected_item').show();
    }
  }


  editItemArray(content: any, item: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    //console.log('item',item);
    this.ItemId = item.id;
    this.ItemNAme = item.ItemDescription;
    this.ItemQty = item.Quantity;
    this.ItemDis = item.DiscountPercent;
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.ItemDueDate = ''
    this.TaxCode = 'IGST12';
    this.TaxRate = item.TaxRate;
  }

  UpdateQuotationItem(f: NgForm) {
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (!/^[0-9]*$/.test(this.ItemDis) || !/^[0-9]*$/.test(this.ItemQty) || !/^[0-9]*$/.test(this.TaxRate)) {
      this._NotifierService.showError('Invalid input');
    }
    else {
      $('#add_quat').hide();
      $('#select_item').hide();
      $('#selected_item').show();

      this.CountItem = this.QuatItems.length;


      if (this.CountItem == 0) {
        this.QuatItems.push({
          id: this.QuatItems.length + 1,
          Quantity: this.ItemQty,
          UnitPrice: this.ItemPrice,

          DueDate: this.ItemDueDate,
          DiscountPercent: this.ItemDis,
          ItemCode: this.ItemCode,
          ItemDescription: this.ItemNAme,
          TaxCode: 'IGST12',
          TaxRate: this.TaxRate || 0,
        });
      } else {
        var check: boolean = false;
        for (let i = 0; i < this.QuatItems.length; i++) {
          if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
            check = false;
            this.QuatItems[i]['Quantity'] = this.ItemQty;
            this.QuatItems[i]['DiscountPercent'] = this.ItemDis;
            this.QuatItems[i]['TaxRate'] = this.TaxRate;
            this.QuatItems[i]['DueDate'] = this.ItemDueDate;
            break;
          } else {
            check = true;
          }
        }
        if (check) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Quantity: this.ItemQty,
            UnitPrice: this.ItemPrice,
            DueDate: this.ItemDueDate,
            DiscountPercent: this.ItemDis,
            ItemCode: this.ItemCode,
            ItemDescription: this.ItemNAme,
            TaxCode: 'IGST12',
            TaxRate: this.TaxRate || 0,
          });
        }
      }

      this.modalService.dismissAll();
    }
  }


  add_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (item == this.QuatItems[i]['ItemCode']) {
        if (this.QuatItems[i]['Quantity'] < 10000000) {
          this.QuatItems[i]['Quantity'] += 1;
          break;
        }
        else {
          this._NotifierService.showError('You can not take value grater then 10000000');
        }
      }
    }
  }

  remove_array(item: number) {
    this.QuatItems.splice(item, 1);
  }

  minus_qty(item: number) {
    for (let i = 0; i < this.QuatItems.length; i++) {
      if (item == this.QuatItems[i]['ItemCode']) {
        if (this.QuatItems[i]['Quantity'] > 1) {
          this.QuatItems[i]['Quantity'] -= 1;
          break;
        }
        else {
          this._NotifierService.showError('You cannot take Value less than 1');
        }

      }
    }
  }

  // CountItem: Number = 0;
  sendarray() {
    var totalamount: Number = 0;
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount = Number(totalamount) + Number(total);
    }
    this.Totfunction = Number(totalamount);
    // this.total_Amount = totalamount.toFixed(2);
    if (this.quotation.FreightCharge != '') {
      this.Totfunction = Number(this.Totfunction) + Number(this.quotation.FreightCharge);
    }
    this.Totfunction = Number(this.Totfunction);
    // if(this.quotation.FreightCharge != ''){
    // this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
    // }
    // this.total_Amount =  Number(this.total_Amount).toFixed(2);

    this.quotation.DocumentLines = this.QuatItems;
    this.CountItem = this.quotation.DocumentLines.length;
    this.totalsum();

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

  selectChangeOpportunity(event: any) {
    this.isdataLoading = true;
    this.bridgeService2.getOneOpportunitydata(event?.id ?? event).subscribe(
      (data: any) => {
        this.quotation.U_OPPID = data[0]['id'];

        if (data[0].OppItem.length != 0) {
          const newArray = this.bridgeService2.replaceKeyInArray(data[0].OppItem, 'Tax', 'TaxRate');
          data[0].OppItem = newArray;
        }
        this.calculatitonFuntion(data[0].OppItem);
        this.quotation.U_OPPRNM = data[0]['OpportunityName'];
        this.cardco = data[0]['CardCode'];
        this.selectChangeHandlerItem(this.cardco);


        this.quotation.SalesPersonCode = data[0]['SalesPerson'];
        $('#BusinessPartner').attr('disabled', true);
        $('#SalesPersonCode').attr('disabled', true);
      });

  }

  changeCal() {
    this.calculatitonFuntion(this.QuatItems);
  }
  calculatitonFuntion(NewArr: any) {

    this.QuatItems = [];
    var totalamount: any = 0;
    for (let i = 0; i < NewArr.length; i++) {
      this.QuatItems.push({
        id: NewArr[i].id,
        Quantity: NewArr[i].Quantity,
        UnitPrice: NewArr[i].UnitPrice,
        DiscountPercent: NewArr[i].DiscountPercent,
        ItemCode: NewArr[i].ItemCode,
        ItemDescription: NewArr[i].ItemDescription,
        TaxCode: NewArr[i].TaxCode,
        TaxRate: NewArr[i].TaxRate || 0,
      });
    }



    this.quotation.DocumentLines = this.QuatItems;
    this.CountItem = this.QuatItems.length
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount = Number(totalamount) + Number(total);
    }
    this.Totfunction = Number(totalamount);
    // this.total_Amount = totalamount.toFixed(2);
    if (this.quotation.FreightCharge != '') {
      this.Totfunction = Number(this.Totfunction) + Number(this.quotation.FreightCharge);
    }
    this.Totfunction = Number(this.Totfunction);
    this.totalsum();

    // this.total_Amount = totalamount.toFixed(2);
    // if(this.quotation.FreightCharge != ''){
    // this.total_Amount = Number(this.total_Amount) + Number(this.quotation.FreightCharge);
    // }
    // this.total_Amount =  Number(this.total_Amount).toFixed(2);
  }

  selectChangeHandlerItem(event: any) {
    //console.log(event?.target?.value)
    this.isdataLoading = true;
    this.bridgeService2.getOneCustomerdata(event?.target?.value || event).subscribe(
      (data: any) => {
        // this.isdataLoading=false;
        this.quotation.CardCode = data[0]['CardCode'];
        this.quotation.CardName = data[0]['CardName'];
        // this.selectedDayItem = data[0]['CardCode'];
        // this.CurrentBranch = data[0]['BPLID'];
        this.getBranch(data[0]['CardCode']);
        this.bridgeService2.getContactPersone(data[0]['CardCode']).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
            this.quotation.ContactPersonCode = this.contactPersoneList[0].InternalCode;

          });

        this.BP_Detailsdata = data
        // console.log(data)
        // this.quotation.AddressExtension.BillToId = String(this.BP_Detailsdata[0].BPAddresses[0].id)
        if (this.BP_Detailsdata[0].PayTermsGrpCode.length != 0) {
          this.quotation.PaymentGroupCode = String(this.BP_Detailsdata[0].PayTermsGrpCode[0].GroupNumber)
        }
        // this.quotation.SalesPersonCode = this.BP_Detailsdata[0].SalesPersonCode;
        if (this.BP_Detailsdata[0].BPAddresses.length != 0) {
          this.quotation.AddressExtension.BillToId = String(this.BP_Detailsdata[0].BPAddresses[0].id)
          this.quotation.AddressExtension.ShipToId = String(this.BP_Detailsdata[0].BPAddresses[1].id)

          this.quotation.AddressExtension.BillToBuilding = this.BP_Detailsdata[0].BPAddresses[0].AddressName;
          this.quotation.AddressExtension.BillToZipCode = this.BP_Detailsdata[0].BPAddresses[0].ZipCode;
          this.quotation.AddressExtension.BillToCountry = this.BP_Detailsdata[0].BPAddresses[0].Country;
          this.quotation.AddressExtension.U_BCOUNTRY = this.BP_Detailsdata[0].BPAddresses[0].U_COUNTRY;
          this.quotation.AddressExtension.BillToState = this.BP_Detailsdata[0].BPAddresses[0].State;
          this.quotation.AddressExtension.U_BSTATE = this.BP_Detailsdata[0].BPAddresses[0].U_STATE;
          this.quotation.AddressExtension.BillToCity = this.BP_Detailsdata[0].BPAddresses[0].City;
          this.quotation.AddressExtension.U_SHPTYPB = this.BP_Detailsdata[0].BPAddresses[0].U_SHPTYP;
          this.quotation.AddressExtension.BillToStreet = this.BP_Detailsdata[0].BPAddresses[0].Street;

          this.quotation.AddressExtension.ShipToBuilding = this.BP_Detailsdata[0].BPAddresses[1].AddressName;
          this.quotation.AddressExtension.ShipToZipCode = this.BP_Detailsdata[0].BPAddresses[1].ZipCode;
          this.quotation.AddressExtension.ShipToCountry = this.BP_Detailsdata[0].BPAddresses[1].Country;
          this.quotation.AddressExtension.U_SCOUNTRY = this.BP_Detailsdata[0].BPAddresses[1].U_COUNTRY;
          this.quotation.AddressExtension.ShipToState = this.BP_Detailsdata[0].BPAddresses[1].State;
          this.quotation.AddressExtension.U_SSTATE = this.BP_Detailsdata[0].BPAddresses[1].U_STATE;
          this.quotation.AddressExtension.ShipToCity = this.BP_Detailsdata[0].BPAddresses[1].City;
          this.quotation.AddressExtension.U_SHPTYPS = this.BP_Detailsdata[0].BPAddresses[1].U_SHPTYP;
          this.quotation.AddressExtension.ShipToStreet = this.BP_Detailsdata[0].BPAddresses[1].Street;
        }

        setTimeout(() => this.isdataLoading = false, 2000)

      });

  }



  // addNewFeilds(data: any){
  //   console.log('check data' , data);
  //   if(data === 'PassengerElevator')
  //     {
  //     this.showPassengerField = true
  //   }

  // }

  // changePassenger(data : any) {
  //   console.log('check data' , data);
  //   if(data === 'StandardPassenger'){
  //     this.showStandardFields = true
  //   }

  // }
  // changeCarDesign(data : any){
  //   console.log('check car design' , data);
  //   if(data === 'courtyardVista'){
  //     this.showCarDesignFields = true
  //   }

  // }
  // changeSeries(data : any){
  //   console.log('check series' , data);
  //   if(data === 'poweredCoated'){
  //     this.showPoweredCoatedFields = true
  //   }
  // }

  // formatLabel(key: string): string {
  //   return key.replace(/([A-Z])/g, ' $1').trim(); // Add a space before uppercase letters and trim the result
  // }




  /// new

  addNewFeilds(selectedLift: string) {
    this.quotation.LongData.passengers = "";
    this.quotation.LongData.carDesigns = "";
    this.quotation.LongData.series = "";
    this.quotation.LongData.typeOfDoor = "";
    this.quotation.LongData.handrail = "";
    this.quotation.LongData.remarks1 = "";
    this.quotation.LongData.frame = "";
    this.quotation.LongData.fan = "";
    this.quotation.LongData.cladding = "";
    this.quotation.LongData.customization = "";
    this.quotation.LongData.model = "";
    this.quotation.LongData.structure = "";
    this.quotation.LongData.operation = "";
    this.quotation.LongData.lopPlate = "";
    this.quotation.LongData.COP_Plate = "";
    this.quotation.LongData.pit = "";
    this.quotation.LongData.speed = "";
    this.quotation.LongData.cabinInterior = "";
    this.quotation.LongData.lopCop = "";
    this.quotation.LongData.skirting = "";
    this.quotation.LongData.protection = "";
    this.quotation.LongData.ceiling = "";
    this.quotation.LongData.remarks2 = "";
    this.quotation.LongData.sensorOnCabin = "";
    this.quotation.LongData.doorOperation = "";
    this.quotation.LongData.modelNo = "";
    this.quotation.LongData.carDoor = "";
    this.quotation.LongData.sidePanels = "";
    this.quotation.LongData.rearPanels = "";
    this.quotation.LongData.lighting = "";
    this.quotation.LongData.display = "";
    this.quotation.LongData.mirror = "";
    this.quotation.LongData.doorClearOpeningsWidth = "";
    this.quotation.LongData.plateLOP = "";
    this.quotation.LongData.capacity = "";
    this.quotation.LongData.persons = "";
    this.quotation.LongData.Partition = "";
    this.quotation.LongData.flooring = "";
    this.quotation.LongData.pushButtons = "";
    //cost keys
    this.quotation.LongData.carDesignsCost = 0;
    this.quotation.LongData.seriesCost = 0;
    this.quotation.LongData.sidePanelsCost = 0;
    this.quotation.LongData.rearPanelsCost = 0;
    this.quotation.LongData.mirrorCost = 0;
    this.quotation.LongData.handrailCost = 0;
    this.quotation.LongData.flooringCost = 0;
    this.quotation.LongData.ceilingCost = 0;
    this.quotation.LongData.lightingCost = 0;
    this.quotation.LongData.fanCost = 0;
    this.quotation.LongData.copPlateCost = 0;
    this.quotation.LongData.lopPlateCost = 0;
    this.quotation.LongData.displayCost = 0;
    this.quotation.LongData.pushButtonsCost = 0;
    this.quotation.LongData.doorOperationCost = 0;
    this.quotation.LongData.doorClearOpeningsWidthCost = 0;
    this.quotation.LongData.doorClearOpeningHeightCost = 0;
    this.quotation.LongData.carDoorPanelCost = 0;
    this.quotation.LongData.landingDoorFrameCost = 0;
    this.quotation.LongData.landingDoorPanelCost = 0;
    this.quotation.LongData.sensorOnCabinCost = 0;
    this.quotation.LongData.skirtingCost = 0;
    this.quotation.LongData.protectionCost = 0;
    this.quotation.LongData.modelCost = 0;
    this.quotation.LongData.partitionCost = 0;
    this.quotation.LongData.frameCost = 0;
    this.quotation.LongData.pitCost = 0;
    this.quotation.LongData.speedCost = 0;
    this.quotation.LongData.cabinInteriorCost = 0;
    this.quotation.LongData.structureCost = 0;
    this.quotation.LongData.claddingCost = 0;
    this.quotation.LongData.operationCost = 0;
    this.quotation.LongData.customizationCost = 0;
    this.quotation.LongData.carDoorCost = 0;
    this.quotation.LongData.plateLOPCost = 0;
    this.quotation.LongData.lopcopCost = 0;

    // Elevator Shaft
    this.quotation.ElevatorShaft.shaftWidth = "";
    this.quotation.ElevatorShaft.pit = "";
    this.quotation.ElevatorShaft.shaftDepth = "";
    this.quotation.ElevatorShaft.lintelHeightCladding = "";
    this.quotation.ElevatorShaft.machineWidth = "";
    this.quotation.ElevatorShaft.machineDepth = "";
    this.quotation.ElevatorShaft.minimumFloorHeight = "";
    this.quotation.ElevatorShaft.overhead = "";
    this.quotation.ElevatorShaft.totalCarTravel = "";

    // Elevator Specification
    this.quotation.ElevatorSpecification.Payload = "";
    this.quotation.ElevatorSpecification.Capacity = "";
    this.quotation.ElevatorSpecification.NoOfStops = "";
    this.quotation.ElevatorSpecification.NoOfOpenings = "";
    this.quotation.ElevatorSpecification.AccessibleSidesFront = "";
    this.quotation.ElevatorSpecification.AccessibleSidesRear = "";
    this.quotation.ElevatorSpecification.AccessibleSides90Degree = "";
    this.quotation.ElevatorSpecification.FloorDesignation = "";
    this.quotation.ElevatorSpecification.Speed = "";
    this.quotation.ElevatorSpecification.CarWidth = "";
    this.quotation.ElevatorSpecification.CarDepth = "";
    this.quotation.ElevatorSpecification.CarHeight = "";
    this.quotation.ElevatorSpecification.StartStop = "";
    this.quotation.ElevatorSpecification.SpeedValue = "";

    // Elevator Steel Structure
    this.quotation.ElevatorSteelStructure.Type = "";
    this.quotation.ElevatorSteelStructure.VerticalSheetMetal = "";
    this.quotation.ElevatorSteelStructure.VerticalTubular = "";
    this.quotation.ElevatorSteelStructure.HorizontalSheetMetal = "";
    this.quotation.ElevatorSteelStructure.FoundationBolts = "";
    this.quotation.ElevatorSteelStructure.HorizontalTubular = "";
    this.quotation.ElevatorSteelStructure.CladdingChoice = "";
    this.quotation.ElevatorSteelStructure.Anchorage = "";
    //cost
    this.quotation.ElevatorSteelStructure.TypeCost = 0;
    this.quotation.ElevatorSteelStructure.VerticalSheetMetalCost = 0;
    this.quotation.ElevatorSteelStructure.VerticalTubularCost = 0;
    this.quotation.ElevatorSteelStructure.HorizontalSheetMetalCost = 0;
    this.quotation.ElevatorSteelStructure.HorizontalTubularCost = 0;
    this.quotation.ElevatorSteelStructure.FoundationBoltsCost = 0;
    this.quotation.ElevatorSteelStructure.CladdingChoiceCost = 0;

    this.quotation.Doors.TypeOfDoor = "";
    this.quotation.Doors.DoorWidth = "";
    this.quotation.Doors.DoorHeight = "";
    this.quotation.Doors.DoorPanels = "";
    this.quotation.Doors.LandingDoor = "";
    this.quotation.Doors.LandingDoorPanel = "";
    this.quotation.Doors.sensorOnCabinDoor = "";

    this.quotation.Doors.LandingDoorFrame = "";
    this.quotation.Doors.CarInterlock = "";
    this.quotation.Doors.automaticDoors = "";
    this.quotation.Doors.LandingDoorInterlock = "";
    this.quotation.Doors.DoorClearOpeningsWidht = "";
    this.quotation.Doors.DoorClearOpeningHeightinmm = "";

    this.quotation.Doors.TypeOfDoorCost = 0;
    this.quotation.Doors.LandingDoorCost = 0;
    this.quotation.Doors.LandingDoorInterlockCost = 0;
    this.quotation.Doors.DoorWidthCost = 0;
    this.quotation.Doors.DoorHeightCost = 0;
    // this.quotation.Doors.sensorOnCabinDoorCost = 0;
    this.quotation.Doors.TransportationCost = 0;
    this.quotation.Doors.Interlock = 0;
    this.quotation.Doors.carDoorPanel = 0;

    this.quotation.Doors.LandingDoorFrameCost = 0;
    this.quotation.Doors.DoorPanelsCost = 0;
    this.quotation.Doors.CarInterlockCost = 0;
    this.quotation.Doors.LandingDoorPanelCost = 0;
    this.quotation.Doors.InterlockCost = 0;
    this.quotation.Doors.automaticDoorsCost = 0;
    this.quotation.Doors.carDoorPanelCost = 0;

    // Scope Of Work
    this.quotation.ScopeOfWork.PackingLoading = '';
    this.quotation.ScopeOfWork.Transportation = '';
    this.quotation.ScopeOfWork.Unloading = '';
    this.quotation.ScopeOfWork.Storing = '';
    this.quotation.ScopeOfWork.Scaffolding = '';
    this.quotation.ScopeOfWork.IBEAM = '';
    this.quotation.ScopeOfWork.Liasoning = '';
    this.quotation.ScopeOfWork.License = '';
    this.quotation.ScopeOfWork.IbeamforMachineBase = '';
    this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoom = '';
    this.quotation.ScopeOfWork.MinorCivilWork = '';

    this.quotation.ScopeOfWork.PackingLoadingCost = 0;
    this.quotation.ScopeOfWork.TransportationCost = 0;
    this.quotation.ScopeOfWork.UnloadingCost = 0;
    this.quotation.ScopeOfWork.StoringCost = 0;
    this.quotation.ScopeOfWork.ScaffoldingCost = 0;
    this.quotation.ScopeOfWork.IBEAMCost = 0;
    this.quotation.ScopeOfWork.LiasoningCost = 0;
    this.quotation.ScopeOfWork.LicenseCost = 0;
    this.quotation.ScopeOfWork.IbeamforMachineBaseCost = 0;
    this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoomCost = 0;
    this.quotation.ScopeOfWork.MinorCivilWorkCost = 0;

    // Optional Features
    this.quotation.OptionalFeatures.ViewWindow = '';
    this.quotation.OptionalFeatures.EmergencyTelephoneSystem = '';
    this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublic = '';
    this.quotation.OptionalFeatures.BiometricAccess = '';
    this.quotation.OptionalFeatures.CardReaderAccess = '';
    this.quotation.OptionalFeatures.FullHeightCarOperatingPanel = '';
    this.quotation.OptionalFeatures.Intercom = '';
    this.quotation.OptionalFeatures.AttendantOperation = '';
    this.quotation.OptionalFeatures.ParkingKeySwitch = '';
    this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperation = '';
    this.quotation.OptionalFeatures.TimedBlindFloor = '';
    this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusic = '';
    this.quotation.OptionalFeatures.Handrail = '';
    this.quotation.OptionalFeatures.OverloadDevice = '';
    this.quotation.OptionalFeatures.VVVFDrive = '';
    this.quotation.OptionalFeatures.SinglePhaseOperation = '';
    this.quotation.OptionalFeatures.AutomaticRescue = '';

    this.quotation.OptionalFeatures.ViewWindowCost = 0;
    this.quotation.OptionalFeatures.EmergencyTelephoneSystemCost = 0;
    this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublicCost = 0;
    this.quotation.OptionalFeatures.BiometricAccessCost = 0;
    this.quotation.OptionalFeatures.CardReaderAccessCost = 0;
    this.quotation.OptionalFeatures.FullHeightCarOperatingPanelCost = 0;
    this.quotation.OptionalFeatures.IntercomCost = 0;
    this.quotation.OptionalFeatures.AttendantOperationCost = 0;
    this.quotation.OptionalFeatures.ParkingKeySwitchCost = 0;
    this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperationCost = 0;
    this.quotation.OptionalFeatures.TimedBlindFloorCost = 0;
    this.quotation.OptionalFeatures.OverloadDeviceCost = 0;
    this.quotation.OptionalFeatures.AutomaticRescueCost = 0;
    this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusicCost = 0;
    this.quotation.OptionalFeatures.HandrailCost = 0;
    this.quotation.OptionalFeatures.VVVFDriveCost = 0;
    this.quotation.OptionalFeatures.SinglePhaseOperationCost = 0;

    // Guarantee
    this.quotation.Guarantee.Guarantee = '';
    this.quotation.Guarantee.GuaranteeDateOfDispatch = '';
    this.quotation.Guarantee.FreeMaintenancePeriod = '';
    this.quotation.Guarantee.FreeMaintenancePeriodDate = '';

    this.quotation.Guarantee.GuaranteeCost = 0;
    this.quotation.Guarantee.GuaranteeDateOfDispatchCost = 0;
    this.quotation.Guarantee.FreeMaintenancePeriodCost = 0;
    this.quotation.Guarantee.FreeMaintenancePeriodDateCost = 0;

   if(this.quotation.TypeOfLift==='Freight elevator' || this.quotation.TypeOfLift == 'Stretcher elevator'){
    this.quotation.StandardSpecification=this.selectedFieldsElevators.StandardSpecification;
   }
    this.showPassengerField = selectedLift === 'Passenger Elevator';
    if (selectedLift === 'Freight elevator') {
      this.showStandardFields = false
      this.showCustomizedFields = false

      this.selectedFieldsElevators = { ...this.FreightLongData }
      console.log('check', { ...this.FreightLongData });

    }
  }

  changeCarDesign(selectedDesign: string) {
    this.selectedCarDesign = selectedDesign
    this.showAceCourtyardFields = selectedDesign === 'ACE courtyard Vista';
    this.showAwesomeCarDesignsFields = selectedDesign === 'Awesome Lanai Patio';
    this.showEliteCarDesignsFields = selectedDesign === 'Elite Mayfair Portico';
    this.showGrandeFields = selectedDesign === 'Grande Manhattan Foyer';
    this.showUberFields = selectedDesign === 'Uber Parisian Boulevard'
  }

  changeTypeOfDoor(selectedTypeOfDoor: any) {
    console.log('check type of door', selectedTypeOfDoor);
    this.selectedTypeOfDoor = selectedTypeOfDoor
    console.log('check', this.selectedTypeOfDoor);


  }

  // changeSide(selectedSidePanel : any , index : number){
  //   console.log('check' , index);

  //   console.log('check' , selectedSidePanel);

  // // Ensure the selected value is updated in LongData
  // this.LongData[index].sidePanels = selectedSidePanel;

  // // Also update the quotation object
  // this.quotation.LongData[index].sidePanels = selectedSidePanel;

  // console.log('Updated Quotation LongData:', this.quotation.LongData);
  // }

  changeSeries(selectedSeries: string) {

    console.log('check ', this.hideAllExtraFeilds);

    this.selectedSeries = selectedSeries
    this.showPoweredCoatedFields = selectedSeries !== '';

    if (selectedSeries === 'MS powder coated') {
      this.selectedFields = { ...this.msPowderCoatedFields };
      this.selectedSeriesPowderCoated = selectedSeries === 'MS powder coated'
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false

    } else if (selectedSeries === 'SS vertical') {
      this.selectedFields = { ...this.ssVerticalFields };
      this.selectedSeriesSSvertical = selectedSeries === 'SS vertical'
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false

    } else if (selectedSeries === 'Pre Coated SS Finish') {
      this.selectedFields = { ...this.preCoatedSSFields };
      this.selectedSeriesPreCoatedSS = selectedSeries === 'Pre Coated SS Finish'
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false

    } else if (selectedSeries === 'CoffeeBean') {
      this.selectedFields = { ...this.coffeeBeanFields };
      this.selectedSeriesCoffeeBean = selectedSeries === 'CoffeeBean'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false

    } else if (selectedSeries === 'SS Classic') {
      this.selectedFields = { ...this.ssClassicFields };
      this.selectedSeriesSSclassic = selectedSeries === 'SS Classic'


      this.selectedSeriesPowderCoated = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false

    } else if (selectedSeries === 'DarkWood') {
      this.selectedFields = { ...this.darkWoodFields };
      this.selectedSeriesDarkWood = selectedSeries === 'DarkWood'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false
    } else if (selectedSeries === 'Glenberry') {
      this.selectedFields = { ...this.glenberryFields };
      this.selectedSeriesGleberry = selectedSeries === 'Glenberry'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false



    } else if (selectedSeries === 'Cast Silver') {
      this.selectedFields = { ...this.castSilverFields };
      this.selectedSeriesCastSilver = selectedSeries === 'Cast Silver'

      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false

      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false


    } else if (selectedSeries === 'Patina Gold') {
      this.selectedFields = { ...this.patinaGoldFields };
      this.selectedSeriesPatinaGold = selectedSeries === 'Patina Gold'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesJavaLattice = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false
    } else if (selectedSeries === 'Java Lattice') {
      this.selectedFields = { ...this.javaLatticeFields };
      this.selectedSeriesJavaLattice = selectedSeries === 'Java Lattice'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesSpiritedCognac = false
      this.selectedSeriesTanWood = false
    } else if (selectedSeries === 'Tan Wood') {
      this.selectedFields = { ...this.tanWoodFields };
      this.selectedSeriesTanWood = selectedSeries === 'Tan Wood'
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesSpiritedCognac = false

    } else if (selectedSeries === 'Spirited Congac') {
      this.selectedSeriesSpiritedCognac = { ...this.spiritedCongacFields };
      this.selectedSeriesPreCoatedSS = false
      this.selectedSeriesSSvertical = false
      this.selectedSeriesPowderCoated = false
      this.selectedSeriesCoffeeBean = false
      this.selectedSeriesSSclassic = false
      this.selectedSeriesDarkWood = false
      this.selectedSeriesGleberry = false
      this.selectedSeriesPatinaGold = false
      this.selectedSeriesCastSilver = false
      this.selectedSeriesTanWood = false

    }



  }


  changePassenger(selectedPassenger: string) {
    // if(selectedPassenger === '' ){
    //   this.hideAllExtraFeilds = true
    // }
    // else {
    //   this.hideAllExtraFeilds = false

    // }
    this.selectedPassenger = selectedPassenger
    this.showStandardFields = selectedPassenger === 'Standard Passenger';
    this.showCustomizedFields = selectedPassenger === 'Customized Passenger';

    if (this.showStandardFields) {
      // Apply MS Powder Coated Fields only for Standard Passenger
      this.selectedFields = { ...this.msPowderCoatedFields };
      // added by ranjeet (manual cost field keys)
      this.quotation.LongDatasidePanelsCost = '',
        this.quotation.rearPanelsCost = '';
      this.quotation.mirrorCost = '';
      this.quotation.handrailCost = '';
      this.quotation.flooringCost = '';
      this.quotation.ceilingCost = '';
      this.quotation.lightingCost = '';
      this.quotation.fanCost = '';
      this.quotation.copPlateCost = '';
      this.quotation.plateLOPCost = '';
      this.quotation.carDoorCost = '';


      this.quotation.lopPlateCost = '';
      this.quotation.displayCost = '';
      this.quotation.pushButtonsCost = '';

    }
    else if (this.showCustomizedFields) {
      this.selectedFields.pushButtons = ''
      this.selectedFields.display = ''




    }
  }





  setAddress(id: any, type: any) {
    var data: any;
    this.bridgeService2.getOneBpBranch1(id).subscribe((res: any[]) => {
      if (Object(res)['status'] == "200") {
        data = Object(res)['data'][0];



        if (type == 'billing') {
          this.quotation.AddressExtension.BillToBuilding = data.AddressName;
          this.quotation.AddressExtension.BillToZipCode = data.ZipCode;
          this.quotation.AddressExtension.BillToCountry = data.Country;
          this.quotation.AddressExtension.U_BCOUNTRY = data.U_COUNTRY;
          this.quotation.AddressExtension.BillToState = data.State;
          this.quotation.AddressExtension.U_BSTATE = data.U_STATE;
          this.quotation.AddressExtension.BillToCity = data.City;
          this.quotation.AddressExtension.U_SHPTYPB = data.U_SHPTYP;
          this.quotation.AddressExtension.BillToStreet = data.Street;
        }
        else {
          this.quotation.AddressExtension.ShipToBuilding = data.AddressName;
          this.quotation.AddressExtension.ShipToZipCode = data.ZipCode;
          this.quotation.AddressExtension.ShipToCountry = data.Country;
          this.quotation.AddressExtension.U_SCOUNTRY = data.U_COUNTRY;
          this.quotation.AddressExtension.ShipToState = data.State;
          this.quotation.AddressExtension.U_SSTATE = data.U_STATE;
          this.quotation.AddressExtension.ShipToCity = data.City;
          this.quotation.AddressExtension.U_SHPTYPS = data.U_SHPTYP;
          this.quotation.AddressExtension.ShipToStreet = data.Street;
        }
      }

      else {
        this._NotifierService.showError(Object(res)['message']);
        this.isLoading = false;
      }
    }, (err: string) => {
      this.error = err;
    }
    );
  }
  OrderCancel() {
    this.isLoading = false;
    this.modalService.dismissAll();
  }
  previewData: any;
  // total_Amountpreview: any;
  // totalbeforediscount: any;

  fl: any = [];
  onFileChanged(event: any) {
    this.fl = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.fl.push(event.target.files[i]);
    }
  }



  addQuotation(f: NgForm, isdraft: any) {


    console.log('check series', this.selectedSeries);

console.log('check showStandardFields' , this.showStandardFields);


    console.log('check quotation', this.quotation);
    if (this.quotation.TypeOfLift === 'Freight elevator' || this.quotation.TypeOfLift === 'Stretcher elevator') {
      this.quotation.StandardSpecification = this.selectedFieldsElevators.StandardSpecification
    }

    if (this.quotation.TypeOfLift === 'Special elevator') {
      this.quotation.StandardSpecification = this.quotation.StandardSpecification
    }

    // this.quotation.LongData = [
    this.quotation.LongData = {
      carDesigns: this.quotation.LongData.carDesigns,
      // passengers: this.selectedPassenger,
      // series: this.selectedSeries,
      // sidePanels: this.selectedFields.sidePanels,
      // rearPanels: this.selectedFields.rearPanels,
      // flooring: this.selectedFields.flooring,
      // ceiling: this.selectedFields.ceiling,
      // lighting: this.selectedFields.lighting,
      // fan: this.selectedFields.fan,
      // COP_Plate: this.selectedFields.copPlate,
      // LOP_Plate: this.quotation.LongData.LOP_Plate,
      // display: this.selectedFields.display,
      // pushButtons: this.selectedFields.pushButtons,
      // doorOperation: this.selectedFields.doorOperation,
      // doorClearOpeningsWidth: this.selectedFields.doorClearOpeningsWidth,
      // doorClearOpeningHeight: this.selectedFields.doorClearOpeningHeight,
      // carDoorPanel: this.selectedFields.carDoorPanel,
      // landingDoorFrame: this.selectedFields.landingDoorFrame,
      // landingDoorPanel: this.selectedFields.landingDoorPanel,
      // sensorOnCabin: this.selectedFields.sensorOnCabin,




      passengers:  this.showStandardFields ? this.selectedPassenger : this.quotation.LongData.passengers,
      series: this.showStandardFields ? this.selectedSeries :  this.quotation.LongData.series,
      model: this.quotation.LongData.model,
      sidePanels: this.showStandardFields ? this.selectedFields.sidePanels : this.quotation.LongData.sidePanels,
      rearPanels: this.showStandardFields ? this.selectedFields.rearPanels : this.quotation.LongData.rearPanels,
      mirror:  this.showStandardFields ? this.selectedFields.mirror :  this.quotation.LongData.mirror,
      flooring: this.showStandardFields ? this.selectedFields.flooring : this.quotation.LongData.flooring,
      ceiling: this.showStandardFields ? this.selectedFields.ceiling: this.quotation.LongData.ceiling,
      lighting: this.showStandardFields ? this.selectedFields.lighting : this.quotation.LongData.lighting,
      fan: this.showStandardFields ? this.selectedFields.fan : this.quotation.LongData.fan,
      COP_Plate: this.showStandardFields ? this.selectedFields.copPlate : this.quotation.LongData.copPlate,
      LOP_Plate: this.showStandardFields ?  this.selectedFields.lopPlate : this.quotation.LongData.LOP_Plate,
      display:  this.showStandardFields ? this.selectedFields.display  : this.quotation.LongData.display,
      pushButtons: this.showStandardFields ? this.selectedFields.pushButtons  : this.quotation.LongData.pushButtons, 
      doorOperation: this.showStandardFields ? this.selectedFields.doorOperation  : this.quotation.LongData.doorOperation,
      doorClearOpeningsWidth : this.showStandardFields ? this.selectedFields.doorClearOpeningsWidth  :  this.quotation.LongData.doorClearOpeningsWidth,
      doorClearOpeningHeight:  this.showStandardFields ? this.selectedFields.doorClearOpeningHeight  : this.quotation.LongData.doorClearOpeningHeight,
      carDoorPanel:  this.showStandardFields ? this.selectedFields.carDoorPanel  : this.quotation.LongData.carDoorPanel,
      landingDoorFrame:  this.showStandardFields ? this.selectedFields.landingDoorFrame  : this.quotation.LongData.landingDoorFrame,
      landingDoorPanel:  this.showStandardFields ? this.selectedFields.landingDoorPanel  : this.quotation.LongData.landingDoorPanel,
      sensorOnCabin:  this.showStandardFields ? this.selectedFields.sensorOnCabin  : this.quotation.LongData.sensorOnCabin,
      typeOfDoor:   this.selectedTypeOfDoor,
      remarks1: this.quotation.LongData.remarks1,
      remarks2: this.quotation.LongData.remarks2,
      carDoor: this.quotation.LongData.carDoor,

      frame: this.quotation.LongData.frame,
      skirting: this.quotation.LongData.skirting,
      protection: this.quotation.LongData.protection,
      pit: this.quotation.LongData.pit,
      speed: this.quotation.LongData.speed,
      capacity: this.quotation.LongData.capacity,
      operation: this.quotation.LongData.operation,
      customization: this.quotation.LongData.customization,
      lopCopRemark: this.quotation.LongData.lopCopRemark,
      structure: this.quotation.LongData.structure,
      lopCop: this.quotation.LongData.lopCop,
      persons: this.quotation.LongData.persons,
      cabinInterior: this.quotation.LongData.cabinInterior,
      Partition: this.quotation.LongData.Partition,
      modelNo: this.quotation.LongData.modelNo,
      plateLOP: this.quotation.LongData.plateLOP,
      handrail: this.quotation.LongData.handrail,
      // added by ranjeet 
      carDesignsCost: this.quotation.LongData.carDesignsCost,
      seriesCost: this.quotation.LongData.seriesCost,
      sidePanelsCost: this.quotation.LongData.sidePanelsCost,
      rearPanelsCost: this.quotation.LongData.rearPanelsCost,
      mirrorCost: this.quotation.LongData.mirrorCost,
      handrailCost: this.quotation.LongData.handrailCost,
      flooringCost: this.quotation.LongData.flooringCost,
      ceilingCost: this.quotation.LongData.ceilingCost,
      lightingCost: this.quotation.LongData.lightingCost,
      fanCost: this.quotation.LongData.fanCost,
      copPlateCost: this.quotation.LongData.copPlateCost,
      plateLOPCost: this.quotation.LongData.plateLOPCost,
      carDoorCost: this.quotation.LongData.carDoorCost,



      lopPlateCost: this.quotation.LongData.lopPlateCost,
      displayCost: this.quotation.LongData.displayCost,
      pushButtonsCost: this.quotation.LongData.pushButtonsCost,
      doorOperationCost: this.quotation.LongData.doorOperationCost,
      doorClearOpeningsWidthCost: this.quotation.LongData.doorClearOpeningsWidthCost,
      doorClearOpeningHeightCost: this.quotation.LongData.doorClearOpeningHeightCost,
      carDoorPanelCost: this.quotation.LongData.carDoorPanelCost,
      landingDoorFrameCost: this.quotation.LongData.landingDoorFrameCost,
      landingDoorPanelCost: this.quotation.LongData.landingDoorPanelCost,
      sensorOnCabinCost: this.quotation.LongData.sensorOnCabinCost,
      skirtingCost: this.quotation.LongData.skirtingCost,
      protectionCost: this.quotation.LongData.protectionCost,
      pitCost: this.quotation.LongData.pitCost,
      speedCost: this.quotation.LongData.speedCost,
      cabinInteriorCost: this.quotation.LongData.cabinInteriorCost,
      structureCost: this.quotation.LongData.structureCost,
      claddingCost: this.quotation.LongData.claddingCost,
      customizationCost: this.quotation.LongData.customizationCost,
      operationCost: this.quotation.LongData.operationCost,
      lopcopCost: this.quotation.LongData.lopcopCost,
      modelCost: this.quotation.LongData.modelCost,
      partitionCost: this.quotation.LongData.partitionCost,
      frameCost: this.quotation.LongData.frameCost,


    };
    // console.log('check value inie' , this.quotation.LongData[0].series);

    this.quotation.ElevatorShaft = {
      shaftWidth: this.quotation.ElevatorShaft.shaftWidth,
      shaftDepth: this.quotation.ElevatorShaft.shaftDepth,
      pit: this.quotation.ElevatorShaft.pit,
      overhead: this.quotation.ElevatorShaft.overhead,
      minimumFloorHeight: this.quotation.ElevatorShaft.minimumFloorHeight,
      totalCarTravel: this.quotation.ElevatorShaft.totalCarTravel,
      lintelHeightCladding: this.quotation.ElevatorShaft.lintelHeightCladding,



      machineWidth: this.quotation.ElevatorShaft.machineWidth,
      machineDepth: this.quotation.ElevatorShaft.machineDepth,

    };
    this.quotation.ElevatorSpecification = {
      Payload: this.quotation.ElevatorSpecification.Payload,
      Capacity: this.quotation.ElevatorSpecification.Capacity,
      NoOfStops: this.quotation.ElevatorSpecification.NoOfStops,
      NoOfOpenings: this.quotation.ElevatorSpecification.NoOfOpenings,
      AccessibleSidesFront: this.quotation.ElevatorSpecification.AccessibleSidesFront,
      AccessibleSidesRear: this.quotation.ElevatorSpecification.AccessibleSidesRear,
      AccessibleSides90Degree: this.quotation.ElevatorSpecification.AccessibleSides90Degree,
      FloorDesignation: this.quotation.ElevatorSpecification.FloorDesignation,
      Speed: this.quotation.ElevatorSpecification.Speed,
      CarWidth: this.quotation.ElevatorSpecification.CarWidth,
      CarDepth: this.quotation.ElevatorSpecification.CarDepth,
      CarHeight: this.quotation.ElevatorSpecification.CarHeight,
      SpeedValue: this.quotation.ElevatorSpecification.SpeedValue,
      ControlSytem: this.quotation.ElevatorSpecification.ControlSytem,
      StartStop: this.quotation.TypeOfLift === 'Freight elevator' ? this.selectedFieldsElevators.StartStop : this.quotation.ElevatorSpecification.StartStop,
    };

    if (this.quotation.TypeOfLift === 'Freight elevator' || this.quotation.TypeOfLift === 'Dumbwaiters' || this.quotation.TypeOfLift === 'Stretcher elevator' || this.quotation.TypeOfLift === 'Special elevator') {

      this.quotation.ElevatorSteelStructure = {
        Type: this.quotation.ElevatorSteelStructure.Type,
        VerticalSheetMetal: this.quotation.ElevatorSteelStructure.VerticalSheetMetal,
        VerticalTubular: this.quotation.ElevatorSteelStructure.VerticalTubular,
        HorizontalSheetMetal: this.quotation.ElevatorSteelStructure.HorizontalSheetMetal,
        HorizontalTubular: this.quotation.ElevatorSteelStructure.HorizontalTubular,
        FoundationBolts: this.quotation.ElevatorSteelStructure.FoundationBolts,
        CladdingChoice: this.quotation.ElevatorSteelStructure.CladdingChoice,
        Anchorage: this.selectedFieldsElevators.Anchorage,
        TypeCost: this.quotation.ElevatorSteelStructure.TypeCost,
        VerticalSheetMetalCost: this.quotation.ElevatorSteelStructure.VerticalSheetMetalCost,
        VerticalTubularCost: this.quotation.ElevatorSteelStructure.VerticalTubularCost,
        HorizontalSheetMetalCost: this.quotation.ElevatorSteelStructure.HorizontalSheetMetalCost,
        HorizontalTubularCost: this.quotation.ElevatorSteelStructure.HorizontalTubularCost,
        FoundationBoltsCost: this.quotation.ElevatorSteelStructure.FoundationBoltsCost,
        CladdingChoiceCost: this.quotation.ElevatorSteelStructure.CladdingChoiceCost,

      };

    }
    else {
      this.quotation.ElevatorSteelStructure = []
    }

    if (this.quotation.TypeOfLift === 'Dumbwaiters') {

      this.quotation.TechnicalDetails = {

        motor: this.selectedFieldsDumbwaiters.Motor,
        Gearbox: this.selectedFieldsDumbwaiters.Gearbox,
        Controller: this.selectedFieldsDumbwaiters.Controller,

      };

    }
    else {
      this.quotation.TechnicalDetails = []
    }




    this.quotation.Doors =
    {
      TypeOfDoor: this.quotation.Doors.TypeOfDoor,
      DoorWidth: this.quotation.Doors.DoorWidth,
      DoorHeight: this.quotation.Doors.DoorHeight,
      DoorPanels: this.quotation.Doors.DoorPanels,
      LandingDoorFrame: this.quotation.Doors.LandingDoorFrame,
      CarInterlock: this.quotation.Doors.CarInterlock,
      automaticDoors: this.quotation.Doors.automaticDoors,
      LandingDoorInterlock: this.quotation.Doors.LandingDoorInterlock,
      LandingDoor: this.quotation.Doors.LandingDoor,
      DoorClearOpeningsWidht: this.selectedFieldsSpecialElevators.DoorClearOpeningsWidht,
      DoorClearOpeningHeightinmm: this.selectedFieldsSpecialElevators.DoorClearOpeningHeightinmm,
      sensorOnCabinDoor: this.selectedFieldsSpecialElevators.sensorOnCabinDoor,
      carDoorPanel: this.quotation.Doors.carDoorPanel,
      Interlock: this.quotation.Doors.Interlock,
      LandingDoorPanel: this.quotation.Doors.LandingDoorPanel,
      // added by ranjeet
      TypeOfDoorCost: this.quotation.Doors.TypeOfDoorCost,
      DoorWidthCost: this.quotation.Doors.DoorWidthCost,
      DoorHeightCost: this.quotation.Doors.DoorHeightCost,
      LandingDoorInterlockCost: this.quotation.Doors.LandingDoorInterlockCost,
      LandingDoorCost: this.quotation.Doors.LandingDoorCost,
      LandingDoorFrameCost: this.quotation.Doors.LandingDoorFrameCost,
      DoorPanelsCost: this.quotation.Doors.DoorPanelsCost,
      CarInterlockCost: this.quotation.Doors.CarInterlockCost,
      LandingDoorPanelCost: this.quotation.Doors.LandingDoorPanelCost,
      InterlockCost: this.quotation.Doors.InterlockCost,
      automaticDoorsCost: this.quotation.Doors.automaticDoorsCost,
      carDoorPanelCost: this.quotation.Doors.carDoorPanelCost,
    };




    this.quotation.ScopeOfWork = {
      PackingLoading: this.quotation.ScopeOfWork.PackingLoading,
      Transportation: this.quotation.ScopeOfWork.Transportation,
      Unloading: this.quotation.ScopeOfWork.Unloading,
      Storing: this.quotation.ScopeOfWork.Storing,
      Scaffolding: this.quotation.ScopeOfWork.Scaffolding,
      IBEAM: this.quotation.ScopeOfWork.IBEAM,
      Liasoning: this.quotation.ScopeOfWork.Liasoning,
      License: this.quotation.ScopeOfWork.License,
      IbeamforMachineBase: this.quotation.ScopeOfWork.IbeamforMachineBase,
      IBeamShiftingtillMachineRoom: this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoom,
      MinorCivilWork: this.quotation.ScopeOfWork.MinorCivilWork,
      //added by ranjeet

      PackingLoadingCost: this.quotation.ScopeOfWork.PackingLoadingCost,
      TransportationCost: this.quotation.ScopeOfWork.TransportationCost,
      UnloadingCost: this.quotation.ScopeOfWork.UnloadingCost,
      StoringCost: this.quotation.ScopeOfWork.StoringCost,
      ScaffoldingCost: this.quotation.ScopeOfWork.ScaffoldingCost,
      IBEAMCost: this.quotation.ScopeOfWork.IBEAMCost,
      LiasoningCost: this.quotation.ScopeOfWork.LiasoningCost,
      LicenseCost: this.quotation.ScopeOfWork.LicenseCost,
      IbeamforMachineBaseCost: this.quotation.ScopeOfWork.IbeamforMachineBaseCost,
      IBeamShiftingtillMachineRoomCost: this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoomCost,
      MinorCivilWorkCost: this.quotation.ScopeOfWork.MinorCivilWorkCost,

    };

    this.quotation.OptionalFeatures = {
      ViewWindow: this.quotation.OptionalFeatures.ViewWindow,
      EmergencyTelephoneSystem: this.quotation.OptionalFeatures.EmergencyTelephoneSystem,
      EmergencyTelephoneSystemPublic: this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublic,
      BiometricAccess: this.quotation.OptionalFeatures.BiometricAccess,
      CardReaderAccess: this.quotation.OptionalFeatures.CardReaderAccess,
      FullHeightCarOperatingPanel: this.quotation.OptionalFeatures.FullHeightCarOperatingPanel,
      Intercom: this.quotation.OptionalFeatures.Intercom,
      AttendantOperation: this.quotation.OptionalFeatures.AttendantOperation,
      ParkingKeySwitch: this.quotation.OptionalFeatures.ParkingKeySwitch,
      DuplexAndTriplexCarGroupOperation: this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperation,
      TimedBlindFloor: this.quotation.OptionalFeatures.TimedBlindFloor,
      VoiceSynthesizerWithCustomizedMusic: this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusic,
      Handrail: this.quotation.OptionalFeatures.Handrail,
      VVVFDrive: this.quotation.OptionalFeatures.VVVFDrive,
      SinglePhaseOperation: this.quotation.OptionalFeatures.SinglePhaseOperation,
      OverloadDevice: this.quotation.OptionalFeatures.OverloadDevice,
      AutomaticRescue: this.quotation.OptionalFeatures.AutomaticRescue,






      //added by ranjeet
      ViewWindowCost: this.quotation.OptionalFeatures.ViewWindowCost,
      EmergencyTelephoneSystemCost: this.quotation.OptionalFeatures.EmergencyTelephoneSystemCost,
      EmergencyTelephoneSystemPublicCost: this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublicCost,
      BiometricAccessCost: this.quotation.OptionalFeatures.BiometricAccessCost,
      CardReaderAccessCost: this.quotation.OptionalFeatures.CardReaderAccessCost,
      FullHeightCarOperatingPanelCost: this.quotation.OptionalFeatures.FullHeightCarOperatingPanelCost,
      IntercomCost: this.quotation.OptionalFeatures.IntercomCost,
      AttendantOperationCost: this.quotation.OptionalFeatures.AttendantOperationCost,
      ParkingKeySwitchCost: this.quotation.OptionalFeatures.ParkingKeySwitchCost,
      DuplexAndTriplexCarGroupOperationCost: this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperationCost,
      TimedBlindFloorCost: this.quotation.OptionalFeatures.TimedBlindFloorCost,



      VoiceSynthesizerWithCustomizedMusicCost: this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusicCost,
      HandrailCost: this.quotation.OptionalFeatures.HandrailCost,
      VVVFDriveCost: this.quotation.OptionalFeatures.VVVFDriveCost,
      SinglePhaseOperationCost: this.quotation.OptionalFeatures.SinglePhaseOperationCost,
      OverloadDeviceCost: this.quotation.OptionalFeatures.OverloadDeviceCost,
      AutomaticRescueCost: this.quotation.OptionalFeatures.AutomaticRescueCost,
    };


    this.quotation.Guarantee = {
      Guarantee: this.quotation.Guarantee.Guarantee,
      GuaranteeDateOfDispatch: this.quotation.Guarantee.GuaranteeDateOfDispatch,
      FreeMaintenancePeriod: this.quotation.Guarantee.FreeMaintenancePeriod,
      FreeMaintenancePeriodDate: this.quotation.Guarantee.FreeMaintenancePeriodDate,
      // added by ranjeet
      // added by ranjeet
      GuaranteeCost: this.quotation.Guarantee.GuaranteeCost,
      GuaranteeDateOfDispatchCost: this.quotation.Guarantee.GuaranteeDateOfDispatchCost,
      FreeMaintenancePeriodCost: this.quotation.Guarantee.FreeMaintenancePeriodCost,
      FreeMaintenancePeriodDateCost: this.quotation.Guarantee.FreeMaintenancePeriodDateCost,
    };




    console.log('check LongData', this.quotation.LongData);

    if (isdraft == 'draft') {
      this.quotation.is_draft = 1
    }
    else {
      this.quotation.is_draft = 0
    }
    f = this.bridgeService2.GlobaleTrimFunc(f);
    this.resetAlerts();
    for (let [keys, value] of Object.entries(f.value)) {

      if (!!!f.value[keys]) {
        f.value[keys] = "";

      }
    }
    if (this.fl) {
      this.quotation.Attach = this.fl;
    }
    else {
      this.quotation.Attach = '';
    }

    if (f.valid || this.quotation.is_draft == 1) {
      if (this.CountItem == 0 && this.quotation.is_draft == 0) {
        this._NotifierService.showError('please Select Atleast One Item');
        $('.item-list-area').css('border', '2px solid red');
        $('.item-list-area').css(
          'box-shadow',
          '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)'
        );
      } else {
        $('.item-list-area').css('border', 'none');
        $('.item-list-area').css('box-shadow', 'none');
        this.isLoading = true;
        this.quotation.CreateDate = this.HeadingServices.getDate(),
          this.quotation.CreateTime = this.HeadingServices.getTime(),
          this.quotation.UpdateDate = this.HeadingServices.getDate(),
          this.quotation.UpdateTime = this.HeadingServices.getTime(),
          this.quotation = this.bridgeService2.replaceNullWithSpace(this.quotation);
        if (this.total_Amount == undefined || this.total_Amount == '') {
          this.quotation.DocTotal = 0
        }
        else {
          this.quotation.DocTotal = this.total_Amount;
        }
        if (this.quotation.FreightCharge == '') {
          this.quotation.FreightCharge = 0
        }
        if (this.quotation.DocumentLines.length != 0) {
        }

        this.quotation.OpportunityID = this.quotation.U_OPPID;
        // console.log('check this.quotation' , this.quotation);
        // console.log('check docu' , this.quotation.DocumentLines);
        // console.log('check long' , this.quotation.LongData);
        var Payload = JSON.parse(JSON.stringify(this.quotation))

        Payload.Attach = this.quotation.Attach;
        console.log('check payload', Payload);

        this.bridgeService2.storeQuotation(Payload).subscribe(
          (res: Quotation) => {
            if (Object(res)['status'] == "200") {
              this._NotifierService.showSuccess(this.Headingss[0].leftheading + " " + this.Headingss[0].heading103 + " " + this.Headingss[0].heading106);
              this.modalService.dismissAll();
              this.router.navigate(['/quotation']);
              this.isLoading = false;
            }

            else {
              this._NotifierService.showError(Object(res)['message']);
              this.isLoading = false;
            }
          },
          (err) => {
            this.isLoading = false;
            const delim = ':';
            const name = err.message;
            const result = name.split(delim).slice(3).join(delim);
            this._NotifierService.showError(result);
          }
        );
      }
    }
    else {
      this._NotifierService.showError('Please fill valid data');
      for (let i = 0; i < Object.keys(f.value).length; i++) {
        var keyys = Object.keys(f.value)[i];
        if (f.value[keyys].length == 0) {
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
          else if ($("textarea[name=" + keyys + "]").hasClass('required-fld')) {
            $("textarea[name=" + keyys + "]").addClass("red-line-border");
            $("textarea[name=" + keyys + "]").focus();
          }
        } else {
          $("input[name=" + keyys + "]").removeClass("red-line-border");
          $("select[name=" + keyys + "]").removeClass("red-line-border");
          $("textarea[name=" + keyys + "]").removeClass("red-line-border");
          $("ng-select[name=" + keyys + "]").removeClass("red-line-border");
        }
      }
    }
  }

  changeModel(selectedModel: string) {
    console.log('changeModel', selectedModel);

    const modelMapping: { [key: string]: string } = {
      'Classic': 'HL 15',
      'Comfort': 'HL 30',
      'Swift': 'HL 40',
      'Pro': 'HL 50'
    };
    this.quotation.LongData.modelNo = modelMapping[selectedModel];
  }

  toggleCladding(selectedStructure: any) {
    this.showCladding = ["MS. Ex with cladding", "Alu. Ex with cladding"].includes(selectedStructure);
  }

  updateCapacity(payload: number) {
    if (payload && !isNaN(payload)) {
      this.quotation.ElevatorSpecification.Capacity = (payload / 68).toFixed(2);
    } else {
      this.quotation.ElevatorSpecification.Capacity = null;
    }
  }


  showshipaddress() {
    let num = (document.getElementById('showshipaddress') as HTMLInputElement);
    if (num.checked) {
      $('.showshipaddress').show();
      this.showshipaddressBool = true;
    } else {
      $('.showshipaddress').hide();
      this.showshipaddressBool = false;
    }
  }

  backClicked() {
    this._location.back();
  }

  openPrviewLg(content: any) {
    this.modalService.open(content, { modalDialogClass: 'preview-dialog', size: 'xl' });
  }

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
  //       return hasEditPermission;
  //   }
  //   return false;
  // }

  updateTotalAmount(data: any): void {

    console.log("update function", this.quotation.TypeOfInstallationCost);
    this.totalSubAmount = Number(this.quotation.TypeOfInstallationCost || 0) +
      Number(this.quotation.MachineCost || 0) +
      Number(this.quotation.LongData.carDesignsCost || 0) +
      Number(this.quotation.LongData.seriesCost || 0) +
      Number(this.quotation.LongData.sidePanelsCost || 0) +
      Number(this.quotation.LongData.rearPanelsCost || 0) +
      Number(this.quotation.LongData.mirrorCost || 0) +
      Number(this.quotation.LongData.handrailCost || 0) +
      Number(this.quotation.LongData.flooringCost || 0) +
      Number(this.quotation.LongData.ceilingCost || 0) +
      Number(this.quotation.LongData.lightingCost || 0) +
      Number(this.quotation.LongData.fanCost || 0) +
      Number(this.quotation.LongData.copPlateCost || 0) +
      Number(this.quotation.LongData.plateLOPCost || 0) +
      Number(this.quotation.LongData.carDoorCost || 0) +




      Number(this.quotation.LongData.lopPlateCost || 0) +
      Number(this.quotation.LongData.displayCost || 0) +
      Number(this.quotation.LongData.pushButtonsCost || 0) +
      Number(this.quotation.LongData.doorOperationCost || 0) +
      Number(this.quotation.LongData.doorClearOpeningsWidthCost || 0) +
      Number(this.quotation.LongData.doorClearOpeningHeightCost || 0) +
      Number(this.quotation.LongData.carDoorPanelCost || 0) +
      Number(this.quotation.LongData.landingDoorFrameCost || 0) +
      Number(this.quotation.LongData.landingDoorPanelCost || 0) +
      Number(this.quotation.LongData.sensorOnCabinCost || 0) +
      Number(this.quotation.LongData.protectionCost || 0) +
      Number(this.quotation.LongData.pitCost || 0) +
      Number(this.quotation.LongData.speedCost || 0) +
      Number(this.quotation.LongData.customizationCost || 0) +
      Number(this.quotation.LongData.operationCost || 0) +
      Number(this.quotation.LongData.lopcopCost || 0) +
      Number(this.quotation.LongData.cabinInteriorCost || 0) +
      Number(this.quotation.LongData.structureCost || 0) +
      Number(this.quotation.LongData.claddingCost || 0) +
      Number(this.quotation.LongData.modelCost || 0) +
      Number(this.quotation.LongData.partitionCost || 0) +
      Number(this.quotation.LongData.frameCost || 0) +
      Number(this.quotation.LongData.skirtingCost || 0) +

      Number(this.quotation.Doors.TypeOfDoorCost || 0) +
      Number(this.quotation.Doors.DoorWidthCost || 0) +
      Number(this.quotation.Doors.LandingDoorInterlockCost || 0) +
      Number(this.quotation.Doors.DoorHeightCost || 0) +
      Number(this.quotation.Doors.LandingDoorCost || 0) +
      Number(this.quotation.Doors.DoorPanelsCost || 0) +
      Number(this.quotation.Doors.CarInterlockCost || 0) +
      Number(this.quotation.Doors.LandingDoorFrameCost || 0) +
      Number(this.quotation.Doors.automaticDoorsCost || 0) +
      Number(this.quotation.Doors.carDoorPanelCost || 0) +
      Number(this.quotation.Doors.LandingDoorPanelCost || 0) +
      Number(this.quotation.Doors.InterlockCost || 0) +


      Number(this.quotation.ElevatorSteelStructure.TypeCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.VerticalSheetMetalCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.VerticalTubularCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.HorizontalSheetMetalCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.HorizontalTubularCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.FoundationBoltsCost || 0) +
      Number(this.quotation.ElevatorSteelStructure.CladdingChoiceCost || 0) +




      Number(this.quotation.ScopeOfWork.PackingLoadingCost || 0) +
      Number(this.quotation.ScopeOfWork.TransportationCost || 0) +
      Number(this.quotation.ScopeOfWork.UnloadingCost || 0) +
      Number(this.quotation.ScopeOfWork.StoringCost || 0) +
      Number(this.quotation.ScopeOfWork.ScaffoldingCost || 0) +
      Number(this.quotation.ScopeOfWork.IBEAMCost || 0) +
      Number(this.quotation.ScopeOfWork.LiasoningCost || 0) +
      Number(this.quotation.ScopeOfWork.LicenseCost || 0) +
      Number(this.quotation.ScopeOfWork.IbeamforMachineBaseCost || 0) +
      Number(this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoomCost || 0) +
      Number(this.quotation.ScopeOfWork.MinorCivilWorkCost || 0) +

      Number(this.quotation.OptionalFeatures.ViewWindowCost || 0) +
      Number(this.quotation.OptionalFeatures.EmergencyTelephoneSystemCost || 0) +
      Number(this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublicCost || 0) +
      Number(this.quotation.OptionalFeatures.BiometricAccessCost || 0) +
      Number(this.quotation.OptionalFeatures.CardReaderAccessCost || 0) +
      Number(this.quotation.OptionalFeatures.FullHeightCarOperatingPanelCost || 0) +
      Number(this.quotation.OptionalFeatures.IntercomCost || 0) +
      Number(this.quotation.OptionalFeatures.AttendantOperationCost || 0) +
      Number(this.quotation.OptionalFeatures.ParkingKeySwitchCost || 0) +
      Number(this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperationCost || 0) +
      Number(this.quotation.OptionalFeatures.TimedBlindFloorCost || 0) +
      Number(this.quotation.OptionalFeatures.AutomaticRescueCost || 0) +
      Number(this.quotation.OptionalFeatures.OverloadDeviceCost || 0) +
      Number(this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusicCost || 0) +
      Number(this.quotation.OptionalFeatures.HandrailCost || 0) +
      Number(this.quotation.OptionalFeatures.SinglePhaseOperationCost || 0) +
      Number(this.quotation.OptionalFeatures.VVVFDriveCost || 0) +


      //Guarantee
      Number(this.quotation.Guarantee.GuaranteeCost || 0) +
      Number(this.quotation.Guarantee.GuaranteeDateOfDispatchCost || 0) +
      Number(this.quotation.Guarantee.FreeMaintenancePeriodCost || 0) +
      Number(this.quotation.Guarantee.FreeMaintenancePeriodDateCost || 0);

    //  console.log("subtotal",this.totalSubAmount);
    //return this.totalSubAmount
    this.totalsum();
  }

  totalsum() {

    this.total_Amount = Number(Number(this.totalSubAmount) + Number(this.Totfunction)).toFixed(2);
    console.log("toalsum", this.total_Amount)
  }

  updatePersons() {
    if (this.quotation.LongData.capacity) {
      this.quotation.LongData.persons = (this.quotation.LongData.capacity / 68).toFixed(2);
    } else {
      this.quotation.LongData.persons = '';
    }
  }

  onPackingLoadingChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.PackingLoadingCost = 0;
      this.updateTotalAmount('');
    }
  }
  onTransportationChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.TransportationCost = 0;
      this.updateTotalAmount('');
    }
  }
  onUnloadingChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.UnloadingCost = 0;
      this.updateTotalAmount('');
    }
  }
  onStoringChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.StoringCost = 0;
      this.updateTotalAmount('');
    }
  }
  onScaffoldingChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.ScaffoldingCost = 0;
      this.updateTotalAmount('');
    }
  }
  onIBEAMChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.IBEAMCost = 0;
      this.updateTotalAmount('');
    }
  }
  onLiasoningChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.LiasoningCost = 0;
      this.updateTotalAmount('');
    }
  }
  onLicenseChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.LicenseCost = 0;
      this.updateTotalAmount('');
    }
  }
  onIbeamforMachineBaseChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.IbeamforMachineBaseCost = 0;
      this.updateTotalAmount('');
    }
  }
  onIBeamShiftingtillMachineRoomChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoomCost = 0;
      this.updateTotalAmount('');
    }
  }
  onMinorCivilWorkChange(value: string) {
    if (value !== 'In EASA scope') {
      this.quotation.ScopeOfWork.MinorCivilWorkCost = 0;
      this.updateTotalAmount('');
    }
  }
  onOverloadDeviceChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.OverloadDeviceCost = 0;
      this.updateTotalAmount('');
    }
  }

  onAutomaticRescueChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.AutomaticRescueCost = 0;
      this.updateTotalAmount('');
    }
  }

  onVVVFDriveChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.VVVFDriveCost = 0;
      this.updateTotalAmount('');
    }
  }
  onSinglePhaseOperationChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.SinglePhaseOperationCost = 0;
      this.updateTotalAmount('');
    }
  }

  onViewWindowChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.ViewWindowCost = 0;
      this.updateTotalAmount('');
    }
  }

  onEmergencyTelephoneSystemChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.EmergencyTelephoneSystemCost = 0;
      this.updateTotalAmount('');
    }
  }

  onEmergencyTelephoneSystemPublicChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublicCost = 0;
      this.updateTotalAmount('');
    }
  }
  onBiometricAccessCostChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.BiometricAccessCost = 0;
      this.updateTotalAmount('');
    }
  }
  onCardReaderAccessChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.CardReaderAccessCost = 0;
      this.updateTotalAmount('');
    }
  }
  onFullHeightCarOperatingPanelChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.FullHeightCarOperatingPanelCost = 0;
      this.updateTotalAmount('');
    }
  }
  onIntercomChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.IntercomCost = 0;
      this.updateTotalAmount('');
    }
  }
  onAttendantOperationChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.AttendantOperationCost = 0;
      this.updateTotalAmount('');
    }
  }

  onParkingKeySwitchChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.ParkingKeySwitchCost = 0;
      this.updateTotalAmount('');
    }
  }

  onDuplexAndTriplexCarGroupOperationChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperationCost = 0;
      this.updateTotalAmount('');
    }
  }
  onTimedBlindFloorChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.TimedBlindFloorCost = 0;
      this.updateTotalAmount('');
    }
  }
  onHandrailChange(value: string) {
    if (value !== 'yes') {
      this.quotation.OptionalFeatures.HandrailCost = 0;
      this.updateTotalAmount('');
    }
  }



}
