import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bridge } from '../bridge';
import { BridgeService } from '../modules/service/bridge.service';
import { BusinessPartners } from '../businesspartners';
import { opportunity } from '../opportunity';
import { HeadingServicesService } from '../modules/service/heading-services.service';
import { NotiferService } from '../modules/service/helpers/notifer.service';
import { Customer, Industory, Country, States, PaymentTerm } from '../customer';
import { Quotation, EditQuotation, QuotationItem } from '../quotation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Item } from '../warehouse';
declare var $: any;


@Component({
  selector: 'app-quotation-edit',
  templateUrl: './quotation-edit.component.html',
  styleUrls: ['./quotation-edit.component.css']
})
export class QuotationEditComponent implements OnInit {
  DynamicFiledPositionDetials: any[] = [];
  baseUrl2: any;
  totalSubAmount: number = 0;
  Totfunction: number = 0;
  searchValue1: string = '';
  //searchValue: any;
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
  quotations2: any[] = [];
  quotations: EditQuotation[] = [];
  savedModules: any[] = [];
  selectedPassenger: any
  selectedCarDesign: any
  selectedSeries: any
  selectedTypeOfDoor: any
  isCarDesignFilled: boolean = false
  isSeriesAceCourtyard: boolean = false
  isSeriesAwesome: boolean = false
  isSeriesElite: boolean = false
  isSeriesGrande: boolean = false
  isSeriesUber: boolean = false
  isSeriesCastSilver: boolean = false
  isSeriesMSPowderCoated: boolean = false
  isSeriesSSvertical: boolean = false
  isSeriesPreCoatedSSfinish: boolean = false
  isSeriesCoffeeBean: boolean = false
  isSeriesDarkWood: boolean = false
  isSeriesSSclassic: boolean = false
  isSeriesPatinaGold: boolean = false
  isSeriesJavaLattice: boolean = false
  isSeriesGlanberry: boolean = false
  isSeriesTanWood: boolean = false
  isSeriesSpiritedCongac: boolean = false
  selectedCarDesigns!: string;
  selectedModel!: string;
  selectedAutomaticDoor!: string
  showCladding: boolean = false


  closeResult = '';
  quotation: any = {
    CreatedByPerson: sessionStorage.getItem('SalesEmployeeCode'),
    is_draft: '',
    DocTotal: '',
    id: '', U_QUOTNM: '', TaxDate: '',
    DocDueDate: '',
    ContactPersonCode: '',
    DiscountPercent: '0',
    DocDate: '',
    CardCode: '',
    CardName: '',
    Comments: '',
    SalesPersonCode: '',
    PRID: '',
    BPLID: '',
    Attach: '',
    OpportunityID: '',
    FreightCharge: '',
    PaymentGroupCode: '',
    U_OPPID: '',
    U_OPPRNM: '',
    AddressExtension: {
      BillToId: '',
      ShipToId: '',
      BillToBuilding: '',
      ShipToState: '',
      BillToCity: '',
      ShipToCountry: '',
      BillToZipCode: '',
      ShipToStreet: '',
      BillToState: '',
      ShipToZipCode: '',
      BillToStreet: '',
      ShipToBuilding: '',
      ShipToCity: '',
      BillToCountry: '',
      U_SCOUNTRY: '',
      U_SSTATE: '',
      U_SHPTYPB: '',
      U_BSTATE: '',
      U_BCOUNTRY: '',
      U_SHPTYPS: '',
    },



    DocumentLines: '',
    CreateDate: '',
    CreateTime: '',
    UpdateDate: this.HeadingServices.getDate(),
    UpdateTime: this.HeadingServices.getTime(),
    TypeOfLift: '',
    TypeOfInstallation: '',
    Machine: '',
    Version: '',
    StandardSpecification: '',
    NoOfElevators: '',
    // added by ranjeet
    TypeOfInstallationCost: 0,
    MachineCost: 0,

    LongData: {
      carDesigns: '',
      passengers: '',
      series: '',
      sidePanels: '',
      rearPanels: '',
      mirror: '',
      flooring: '',
      ceiling: '',
      lighting: '',
      fan: '',
      lopPlate: '',
      copPlate: '',
      display: '',
      pushButtons: '',
      doorOperation: '',
      doorClearOpeningsWidth: '',
      doorClearOpeningHeight: '',
      carDoorPanel: '',
      landingDoorFrame: '',
      landingDoorPanel: '',
      sensorOnCabin: '',
      typeOfDoor: '',
      remarks1: '',  // ✅ Added for Remark 1
      remarks2: '',  // ✅ Added for Remark 2
      handrail: '',
      model: '',
      modelNo: '',
      Partition: '',
      frame: '',
      pit: '',
      speed: '',
      protection: '',
      cabinInterior: '',
      lopCop: '',
      structure: '',
      operation: '',
      cladding: '',

      customization: '',
      carDoor: '',
      plateLOP: '',
      capacity: '',
      skirting: '',
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
      partitionCost: 0,
      frameCost: 0,
      pitCost: 0,
      speedCost: 0,
      cabinInteriorCost: 0,
      structureCost: 0,
      claddingCost: 0,
      operationCost: 0,
      customizationCost: 0,
      carDoorCost: 0,
      plateLOPCost: 0,
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
      LandingDoorPanel: '',
      Interlock: '',
      carDoorPanel: '',
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
      carDoorPanelCost: 0,


      automaticDoorsCost: 0,
      // sensorOnCabinDoorCost: 0




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
      AutomaticRescue: '',

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


    ElevatorSteelStructure: {
      Type: '',
      VerticalSheetMetal: '',
      VerticalTubular: '',
      HorizontalSheetMetal: '',
      HorizontalTubular: '',
      FoundationBolts: '',
      CladdingChoice: '',
      Anchorage: '',
      TypeCost: 0,
      VerticalSheetMetalCost: 0,
      VerticalTubularCost: 0,
      HorizontalSheetMetalCost: 0,
      HorizontalTubularCost: 0,
      FoundationBoltsCost: 0,
      CladdingChoiceCost: 0,
    },

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
  dummyarray: any;

  CardCode: any
  CountItem: Number = 0;
  idd: any;
  code_State1: any;
  code_BState1: any;
  code_State2: any;
  code_BState2: any;

  selectedDay2: any;
  code2: any[] = [];
  codeType2: any;
  code12: any;
  selectedDayState2: any;
  codeState2: any[] = [];
  codeState2_: any;

  selectedDay: any;
  code: any[] = [];
  codeType1: any;
  code1: any;
  // selectedDayState: any;
  // codeState: any;
  codeState_: any;
  codeState1: any;

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
  ShippingType: any;
  branchs: any[] = [];
  paymentterms: PaymentTerm[] = [];
  customertype: any[] = [];
  Headingss: any[] = [];
  startind = 1;
  endind = 1;
  totalCount: any;
  order_by_field: any = 'id';
  order_by_value: any = 'desc';
  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
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



  showPassengerField = false;
  showStandardFields = false;
  showCustomizedFields = false;
  showAceCourtyardFields = false;
  showPoweredCoatedFields = false;
  showAwesomeCarDesignsFields = false
  showEliteCarDesignsFields = false
  showGrandeFields = false
  showUberFields = false
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

  FreightLongData = {

    StandardSpecification: 'As per IS 14665',
    StartStop: 'Acceleration and Deceleration through a VVVF Drive system',
    Anchorage: 'Anchorage from Building is mandatory for deflection'
  }

  SpecialElevator = {
    DoorClearOpeningsWidht: '800 mm Automatic Telescopic Side Opening 2 panel door with VVVF for soft closing & opening with Nudging function',
    DoorClearOpeningHeightinmm: '2100 mm Automatic Telescopic Side Opening 2 panel door with VVVF for soft closing & opening with Nudging function'
  }

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
        "The landing door has a mechanical cum electrical interlock. The door will not open unless the car is at flooring level and the car will not move unless the door is closed."
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
        "The landing door has a mechanical cum electrical interlock. The door will not open unless the car is at flooring level and the car will not move unless the door is closed."
      ]
    }
  };



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
      "CMD: Mechanical Interlock (to facilitate that the car remains stationary when the door is open and prevent the landing door from opening when the car is not at flooring level)",
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



  DumbwaitersData = {
    Motor: 'Industrial Duty Brake Motor with integrated Disc brake',
    Gearbox: 'Self-Lubricated Gearbox. Lubricated for life long use',
    Controller: 'Call & Dispatch Mode'
  }





  selectedFieldsDumbwaiters = { ...this.DumbwaitersData }

  selectedFields: any
  selectedFieldsElevators = { ...this.FreightLongData }
  selectedFieldsSpecialElevators = { ...this.SpecialElevator }
  constructor(private modalService: NgbModal, private bridgeService2: BridgeService,
    public HeadingServices: HeadingServicesService,
    private _NotifierService: NotiferService, private router: Router, private http: HttpClient, private router2: ActivatedRoute,
    private _location: Location) {

  }

  ngOnInit(): void {
    console.log('check selected item', this.quotation.LongData.carDesigns);


    this.baseUrl2 = this.bridgeService2.baseUrl2;


    if (!this.HeadingServices.isModuleView(5) || !this.HeadingServices.isModuleViewedit(5)) {
      this.router.navigate(['/dashboard']);
    }
    this.bridgeService2.autoCall();
    this.ShippingType = this.bridgeService2.ShippingType;

    this.UserName = sessionStorage.getItem('UserName');
    this.UserId = sessionStorage.getItem('UserId');
    this.role = sessionStorage.getItem('role');
    this.reportingTo = sessionStorage.getItem('reportingTo');
    this.Headingss = this.HeadingServices.getModule5();
    if (this.UserName == undefined) {
      this.router.navigate(['/login']);
    }
    this.getBridge();
    this.getDynaimcFld('Quotation');
    this.getIndustory();
    this.getCountry();
    this.getBusinessPartmers();
    this.getOpportunity();
    this.getQuotationItem();
    this.getPaymentTerms();
    this.getQuotation();
    this.getCustomerTypeList();

    const savedModulesString = sessionStorage.getItem('savedModules');
    if (savedModulesString) {
      this.savedModules = JSON.parse(savedModulesString);
    }
    // if(){

    // }



  }

  getDynaimcFld(name: any) {
    this.bridgeService2.GetDynamicFld(name).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.DynamicFiledPositionDetials = res.data;
          for (let i = 0; i < this.DynamicFiledPositionDetials.length; i++) {
            this.quotation[this.DynamicFiledPositionDetials[i].field_name] = '';
          }

          // this.getQuotation();
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
  getCustomerTypeList(): void {
    this.isLoading2 = true;
    this.bridgeService2.getBranchMasterPagination({
      PageNo: 1,
      maxItem: 'all'
    }, '', 'id', 'desc').subscribe(
      (data: any) => {
        this.customertype = data.data;


      },
      (err) => {
        this.isLoading2 = false;
        console.log(err);
        this.error = err;
      }
    );
  }
  getBranch(CardCode: any) {
    this.bridgeService2.getCustomerBranchdata(CardCode).subscribe((data: any[]) => {
      this.branchs = data;

    }, (err: string) => {
      this.error = err;
    }
    );

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

  updateCapacity(payload: number) {
    if (payload && !isNaN(payload)) {
      this.quotation.ElevatorSpecification.Capacity = (payload / 68).toFixed(2);
    } else {
      this.quotation.ElevatorSpecification.Capacity = null;
    }
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
    this.isLoading = true;
    this.bridgeService2.getIndustorydata().subscribe(
      (data: Industory[]) => {
        this.isLoading = false;
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
  filterVal: any;

  selectChangeHandler(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code[0] = this.filterVal.Code;
    this.code[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_BCOUNTRY = this.code[1]
    this.getState();
    // this.quotation.AddressExtension.U_BSTATE="Select State"
  }
  selectedDayState: any;
  codeState: any[] = [];
  selectChangeHandlerState(event: any) {
    // console.log(this.statess)
    this.filterVal = this.statess2.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal)
    this.codeState[0] = this.filterVal.Code;
    this.codeState[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_BSTATE = this.codeState[1]
    // console.log("qer333", this.quotation.AddressExtension.U_BSTATE);
  }
  getState(): void {
    this.bridgeService2.getStatedata(this.code[0]).subscribe(
      (data: States[]) => {
        this.statess2 = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  // selectedDay2: any;
  // code2: any[]= [];
  selectChangeHandler2(event: any) {
    this.filterVal = this.countrys.filter(($option: any) => $option.Code == event)[0];
    // console.log(this.filterVal);
    this.code2[0] = this.filterVal.Code;
    this.code2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.U_SCOUNTRY = this.code2[1]
    this.getState2();
    this.quotation.AddressExtension.U_SSTATE = "Select State"
  }

  selectChangeHandlerState2(event: any) {

    this.filterVal = this.statess.filter(($option: any) => $option.Code == event)[0];
    this.codeState2[0] = this.filterVal.Code;
    this.codeState2[1] = this.filterVal.Name;
    this.quotation.AddressExtension.ShipToState = this.codeState2[0]
    this.quotation.AddressExtension.U_SSTATE = this.codeState2[1]
    // console.log("qer1", this.quotation.AddressExtension.U_SSTATE);

  }
  getState2(): void {
    this.bridgeService2.getStatedata(this.code2[0]).subscribe(
      (data: States[]) => {
        this.statess = data;

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }




  getBusinessPartmers(): void {
    this.isLoading = true;
    this.bridgeService2.getBusinessPartmersShortdata().subscribe(
      (data: BusinessPartners[]) => {
        this.isLoading = false;
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



  getQuotation(): void {


    this.isLoading = true;
    this.idd = this.router2.snapshot.params.id;

    this.bridgeService2.getOneQuotationdata(this.idd).subscribe(
      (data: any[]) => {
        this.isLoading = false;
        var totalamount: any = 0;
        this.quotations2 = data;
        this.quotation.Version = this.quotations2[0].Version;
        this.quotation.NoOfElevators = this.quotations2[0].NoOfElevators;
        this.quotation.Machine = this.quotations2[0].Machine;
        this.quotation.TypeOfLift = this.quotations2[0].TypeOfLift;
        this.quotation.TypeOfInstallation = this.quotations2[0].TypeOfInstallation;
        this.quotation.TypeOfInstallationCost = this.quotations2[0].TypeOfInstallationCost;
        this.quotation.MachineCost = this.quotations2[0].MachineCost;
        this.quotation.StandardSpecification = this.quotations2[0].StandardSpecification;



        //LongData when Car designs is selected
        if (this.quotations2[0].LongData[0].carDesigns) {
          this.isCarDesignFilled = true
        }
        if (this.quotations2[0].LongData[0].carDesigns === 'ACE courtyard Vista') {
          this.isSeriesAceCourtyard = true
        }

        if (this.quotations2[0].LongData[0].carDesigns === 'Awesome Lanai Patio') {
          this.isSeriesAwesome = true
        }
        if (this.quotations2[0].LongData[0].carDesigns === 'Elite Mayfair Portico') {
          this.isSeriesElite = true
        }
        if (this.quotations2[0].LongData[0].carDesigns === 'Grande Manhattan Foyer') {
          this.isSeriesGrande = true
        }
        if (this.quotations2[0].LongData[0].carDesigns === 'Uber Parisian Boulevard') {
          this.isSeriesUber = true
        }



        // when customized passenger is selected

        if (this.quotations2[0].LongData[0].passengers == 'Customized Passenger') {
          this.showCustomizedFields = true
        }
        else if (this.quotations2[0].LongData[0].passengers == 'Standard Passenger') {
          this.showStandardFields = true
        }

        //when series is selected
        if (this.quotations2[0].LongData[0].series === 'MS powder coated') {
          this.isSeriesMSPowderCoated = true
        } else if (this.quotations2[0].LongData[0].series === 'SS vertical') {
          this.isSeriesSSvertical = true
        } else if (this.quotations2[0].LongData[0].series === 'Pre Coated SS Finish') {
          this.isSeriesPreCoatedSSfinish = true
        } else if (this.quotations2[0].LongData[0].series === 'Coffee Bean') {
          this.isSeriesCoffeeBean = true
        } else if (this.quotations2[0].LongData[0].series === 'Dark wood') {
          this.isSeriesDarkWood = true
        } else if (this.quotations2[0].LongData[0].series === 'SS classic') {
          this.isSeriesSSclassic = true
        } else if (this.quotations2[0].LongData[0].series === 'Glenberry') {
          this.isSeriesGlanberry = true
        } else if (this.quotations2[0].LongData[0].series === 'Cast Silver') {
          this.isSeriesCastSilver = true
        } else if (this.quotations2[0].LongData[0].series === 'Patina Gold') {
          this.isSeriesPatinaGold = true
        } else if (this.quotations2[0].LongData[0].series === 'Java lattice') {
          this.isSeriesJavaLattice = true
        } else if (this.quotations2[0].LongData[0].series === 'Tan Wood') {
          this.isSeriesTanWood = true
        } else if (this.quotations2[0].LongData[0].series === 'Spirited Congac') {
          this.isSeriesSpiritedCongac = true
        }


        if (this.isSeriesMSPowderCoated) {
          this.selectedFields = { ...this.msPowderCoatedFields };
        } else if (this.isSeriesSSvertical) {
          this.selectedFields = { ...this.ssVerticalFields };
        } else if (this.isSeriesPreCoatedSSfinish) {
          this.selectedFields = { ...this.preCoatedSSFields };
        } else if (this.isSeriesCoffeeBean) {
          this.selectedFields = { ...this.coffeeBeanFields };
        } else if (this.isSeriesDarkWood) {
          this.selectedFields = { ...this.darkWoodFields };
        } else if (this.isSeriesSSclassic) {
          this.selectedFields = { ...this.ssClassicFields };
        } else if (this.isSeriesGlanberry) {
          this.selectedFields = { ...this.glenberryFields };
        } else if (this.isSeriesCastSilver) {
          this.selectedFields = { ...this.castSilverFields };
        } else if (this.isSeriesPatinaGold) {
          this.selectedFields = { ...this.patinaGoldFields };
        } else if (this.isSeriesJavaLattice) {
          this.selectedFields = { ...this.javaLatticeFields };
        }

        else if (this.isSeriesTanWood) {
          this.selectedFields = { ...this.tanWoodFields };
        }
        else if (this.isSeriesPatinaGold) {
          this.selectedFields = { ...this.spiritedCongacFields };
        }
       

        // get longData 
        this.quotation.LongData.passengers = this.quotations2[0].LongData[0].passengers;
        this.quotation.LongData.carDesigns = this.quotations2[0].LongData[0].carDesigns;
        this.quotation.LongData.series = this.quotations2[0].LongData[0].series;
        this.quotation.LongData.typeOfDoor = this.quotations2[0].LongData[0].typeOfDoor;
        this.quotation.LongData.handrail = this.quotations2[0].LongData[0].handrail;
        this.quotation.LongData.remarks1 = this.quotations2[0].LongData[0].remarks1;
        this.quotation.LongData.frame = this.quotations2[0].LongData[0].frame;
        this.quotation.LongData.fan = this.quotations2[0].LongData[0].fan;
        this.quotation.LongData.cladding = this.quotations2[0].LongData[0].cladding;
        this.quotation.LongData.customization = this.quotations2[0].LongData[0].customization;
        this.quotation.LongData.model = this.quotations2[0].LongData[0].model;
        this.quotation.LongData.structure = this.quotations2[0].LongData[0].structure;
        this.quotation.LongData.operation = this.quotations2[0].LongData[0].operation;
        this.quotation.LongData.lopPlate = this.quotations2[0].LongData[0].LOP_Plate;
        this.quotation.LongData.copPlate = this.quotations2[0].LongData[0].COP_Plate;
        this.quotation.LongData.pit = this.quotations2[0].LongData[0].pit;
        this.quotation.LongData.speed = this.quotations2[0].LongData[0].speed;
        this.quotation.LongData.cabinInterior = this.quotations2[0].LongData[0].cabinInterior;
        this.quotation.LongData.lopCop = this.quotations2[0].LongData[0].lopCop;
        this.quotation.LongData.skirting = this.quotations2[0].LongData[0].skirting;
        this.quotation.LongData.protection = this.quotations2[0].LongData[0].protection;
        this.quotation.LongData.ceiling = this.quotations2[0].LongData[0].ceiling;
        this.quotation.LongData.remarks2 = this.quotations2[0].LongData[0].remarks2;
        this.quotation.LongData.sensorOnCabin = this.quotations2[0].LongData[0].sensorOnCabin;
        this.quotation.LongData.doorOperation = this.quotations2[0].LongData[0].doorOperation;
        //this.quotation.LongData.model = this.quotations2[0].LongData[0].model;
        this.quotation.LongData.modelNo = this.quotations2[0].LongData[0].modelNo;
        this.quotation.LongData.carDoor = this.quotations2[0].LongData[0].carDoor;
        this.quotation.LongData.sidePanels = this.quotations2[0].LongData[0].sidePanels;
        this.quotation.LongData.rearPanels = this.quotations2[0].LongData[0].rearPanels;
        this.quotation.LongData.lighting = this.quotations2[0].LongData[0].lighting;
        this.quotation.LongData.display = this.quotations2[0].LongData[0].display;
        this.quotation.LongData.mirror = this.quotations2[0].LongData[0].mirror;
        this.quotation.LongData.doorClearOpeningsWidth = this.quotations2[0].LongData[0].doorClearOpeningsWidth;
        this.quotation.LongData.plateLOP = this.quotations2[0].LongData[0].plateLOP;
        this.quotation.LongData.capacity = this.quotations2[0].LongData[0].capacity;
        this.quotation.LongData.persons = this.quotations2[0].LongData[0].persons;
        this.quotation.LongData.Partition = this.quotations2[0].LongData[0].Partition;
        this.quotation.LongData.flooring = this.quotations2[0].LongData[0].flooring;
        this.quotation.LongData.pushButtons = this.quotations2[0].LongData[0].pushButtons;

        // added by ranjeet - get cost feilds of longData
        this.quotation.LongData.carDesignsCost = this.quotations2[0].LongData[0].carDesignsCost;
        this.quotation.LongData.seriesCost = this.quotations2[0].LongData[0].seriesCost;
        this.quotation.LongData.sidePanelsCost = this.quotations2[0].LongData[0].sidePanelsCost;
        this.quotation.LongData.rearPanelsCost = this.quotations2[0].LongData[0].rearPanelsCost;
        this.quotation.LongData.mirrorCost = this.quotations2[0].LongData[0].mirrorCost;
        this.quotation.LongData.handrailCost = this.quotations2[0].LongData[0].handrailCost;
        this.quotation.LongData.flooringCost = this.quotations2[0].LongData[0].flooringCost;
        this.quotation.LongData.ceilingCost = this.quotations2[0].LongData[0].ceilingCost;
        this.quotation.LongData.lightingCost = this.quotations2[0].LongData[0].lightingCost;
        this.quotation.LongData.fanCost = this.quotations2[0].LongData[0].fanCost;
        this.quotation.LongData.copPlateCost = this.quotations2[0].LongData[0].copPlateCost;
        this.quotation.LongData.lopPlateCost = this.quotations2[0].LongData[0].lopPlateCost;
        this.quotation.LongData.displayCost = this.quotations2[0].LongData[0].displayCost;
        this.quotation.LongData.pushButtonsCost = this.quotations2[0].LongData[0].pushButtonsCost;
        this.quotation.LongData.doorOperationCost = this.quotations2[0].LongData[0].doorOperationCost;
        this.quotation.LongData.doorClearOpeningsWidthCost = this.quotations2[0].LongData[0].doorClearOpeningsWidthCost;
        this.quotation.LongData.doorClearOpeningHeightCost = this.quotations2[0].LongData[0].doorClearOpeningHeightCost;
        this.quotation.LongData.carDoorPanelCost = this.quotations2[0].LongData[0].carDoorPanelCost;
        this.quotation.LongData.landingDoorFrameCost = this.quotations2[0].LongData[0].landingDoorFrameCost;
        this.quotation.LongData.landingDoorPanelCost = this.quotations2[0].LongData[0].landingDoorPanelCost;
        this.quotation.LongData.sensorOnCabinCost = this.quotations2[0].LongData[0].sensorOnCabinCost;
        this.quotation.LongData.skirtingCost = this.quotations2[0].LongData[0].skirtingCost;
        this.quotation.LongData.protectionCost = this.quotations2[0].LongData[0].protectionCost;
        this.quotation.LongData.modelCost = this.quotations2[0].LongData[0].modelCost;
        this.quotation.LongData.partitionCost = this.quotations2[0].LongData[0].partitionCost;
        this.quotation.LongData.frameCost = this.quotations2[0].LongData[0].frameCost;
        this.quotation.LongData.pitCost = this.quotations2[0].LongData[0].pitCost;
        this.quotation.LongData.speedCost = this.quotations2[0].LongData[0].speedCost;
        this.quotation.LongData.cabinInteriorCost = this.quotations2[0].LongData[0].cabinInteriorCost;
        this.quotation.LongData.structureCost = this.quotations2[0].LongData[0].structureCost;
        this.quotation.LongData.claddingCost = this.quotations2[0].LongData[0].claddingCost;
        this.quotation.LongData.operationCost = this.quotations2[0].LongData[0].operationCost;
        this.quotation.LongData.customizationCost = this.quotations2[0].LongData[0].customizationCost;
        this.quotation.LongData.carDoorCost = this.quotations2[0].LongData[0].carDoorCost;
        this.quotation.LongData.plateLOPCost = this.quotations2[0].LongData[0].plateLOPCost;
        this.quotation.LongData.lopcopCost = this.quotations2[0].LongData[0].lopcopCost;


        // get Elevator Shaft data

        this.quotation.ElevatorShaft.shaftWidth = this.quotations2[0].ElevatorShaft[0].shaftWidth;
        this.quotation.ElevatorShaft.pit = this.quotations2[0].ElevatorShaft[0].pit;
        this.quotation.ElevatorShaft.shaftDepth = this.quotations2[0].ElevatorShaft[0].shaftDepth;
        this.quotation.ElevatorShaft.lintelHeightCladding = this.quotations2[0].ElevatorShaft[0].lintelHeightCladding;
        this.quotation.ElevatorShaft.machineWidth = this.quotations2[0].ElevatorShaft[0].machineWidth;
        this.quotation.ElevatorShaft.machineDepth = this.quotations2[0].ElevatorShaft[0].machineDepth;
        this.quotation.ElevatorShaft.minimumFloorHeight = this.quotations2[0].ElevatorShaft[0].minimumFloorHeight;
        this.quotation.ElevatorShaft.overhead = this.quotations2[0].ElevatorShaft[0].overhead;
        this.quotation.ElevatorShaft.totalCarTravel = this.quotations2[0].ElevatorShaft[0].totalCarTravel;

        // get Elevator Specification data

        this.quotation.ElevatorSpecification.Payload = this.quotations2[0].ElevatorSpecification[0].Payload;
        this.quotation.ElevatorSpecification.Capacity = this.quotations2[0].ElevatorSpecification[0].Capacity;
        this.quotation.ElevatorSpecification.NoOfStops = this.quotations2[0].ElevatorSpecification[0].NoOfStops;
        this.quotation.ElevatorSpecification.NoOfOpenings = this.quotations2[0].ElevatorSpecification[0].NoOfOpenings;
        this.quotation.ElevatorSpecification.AccessibleSidesFront = this.quotations2[0].ElevatorSpecification[0].AccessibleSidesFront;
        this.quotation.ElevatorSpecification.AccessibleSidesRear = this.quotations2[0].ElevatorSpecification[0].AccessibleSidesRear;
        this.quotation.ElevatorSpecification.AccessibleSides90Degree = this.quotations2[0].ElevatorSpecification[0].AccessibleSides90Degree;
        this.quotation.ElevatorSpecification.FloorDesignation = this.quotations2[0].ElevatorSpecification[0].FloorDesignation;
        this.quotation.ElevatorSpecification.Speed = this.quotations2[0].ElevatorSpecification[0].Speed;
        this.quotation.ElevatorSpecification.CarWidth = this.quotations2[0].ElevatorSpecification[0].CarWidth;
        this.quotation.ElevatorSpecification.CarDepth = this.quotations2[0].ElevatorSpecification[0].CarDepth;
        this.quotation.ElevatorSpecification.CarHeight = this.quotations2[0].ElevatorSpecification[0].CarHeight;
        this.quotation.ElevatorSpecification.StartStop = this.quotations2[0].ElevatorSpecification[0].StartStop;
        this.quotation.ElevatorSpecification.SpeedValue = this.quotations2[0].ElevatorSpecification[0].SpeedValue;



        //get Elevator Steel Structure data
        if (this.quotations2[0].ElevatorSteelStructure.length > 0) {
          this.quotation.ElevatorSteelStructure.Type = this.quotations2[0].ElevatorSteelStructure[0].Type;
          this.quotation.ElevatorSteelStructure.VerticalSheetMetal = this.quotations2[0].ElevatorSteelStructure[0].VerticalSheetMetal;
          this.quotation.ElevatorSteelStructure.VerticalTubular = this.quotations2[0].ElevatorSteelStructure[0].VerticalTubular;
          this.quotation.ElevatorSteelStructure.HorizontalSheetMetal = this.quotations2[0].ElevatorSteelStructure[0].HorizontalSheetMetal;
          this.quotation.ElevatorSteelStructure.FoundationBolts = this.quotations2[0].ElevatorSteelStructure[0].FoundationBolts;
          this.quotation.ElevatorSteelStructure.HorizontalTubular = this.quotations2[0].ElevatorSteelStructure[0].HorizontalTubular;
          this.quotation.ElevatorSteelStructure.CladdingChoice = this.quotations2[0].ElevatorSteelStructure[0].CladdingChoice;
          this.quotation.ElevatorSteelStructure.Anchorage = this.quotations2[0].ElevatorSteelStructure[0].Anchorage;
          this.quotation.ElevatorSteelStructure.TypeCost = this.quotations2[0].ElevatorSteelStructure[0].TypeCost;
          this.quotation.ElevatorSteelStructure.VerticalSheetMetalCost = this.quotations2[0].ElevatorSteelStructure[0].VerticalSheetMetalCost;
          this.quotation.ElevatorSteelStructure.VerticalTubularCost = this.quotations2[0].ElevatorSteelStructure[0].VerticalTubularCost;
          this.quotation.ElevatorSteelStructure.HorizontalSheetMetalCost = this.quotations2[0].ElevatorSteelStructure[0].HorizontalSheetMetalCost;
          this.quotation.ElevatorSteelStructure.HorizontalTubularCost = this.quotations2[0].ElevatorSteelStructure[0].HorizontalTubularCost;
          this.quotation.ElevatorSteelStructure.FoundationBoltsCost = this.quotations2[0].ElevatorSteelStructure[0].FoundationBoltsCost;
          this.quotation.ElevatorSteelStructure.CladdingChoiceCost = this.quotations2[0].ElevatorSteelStructure[0].CladdingChoiceCost;

        }

        //get TechnicalDetails data
        if (this.quotations2[0].TechnicalDetails[0]) {
          this.quotation.TechnicalDetails.Motor = this.quotations2[0].TechnicalDetails[0].Motor;
          this.quotation.TechnicalDetails.Gearbox = this.quotations2[0].TechnicalDetails[0].Gearbox;
          this.quotation.TechnicalDetails.Controller = this.quotations2[0].TechnicalDetails[0].Controller;
        }

        // get Doors data
        this.quotation.Doors.TypeOfDoor = this.quotations2[0].Doors[0].TypeOfDoor;
        this.quotation.Doors.DoorWidth = this.quotations2[0].Doors[0].DoorWidth
        this.quotation.Doors.DoorHeight = this.quotations2[0].Doors[0].DoorHeight
        this.quotation.Doors.DoorPanels = this.quotations2[0].Doors[0].DoorPanels
        this.quotation.Doors.LandingDoor = this.quotations2[0].Doors[0].LandingDoor
        this.quotation.Doors.LandingDoorPanel = this.quotations2[0].Doors[0].LandingDoorPanel
        this.quotation.Doors.sensorOnCabinDoor = this.quotations2[0].Doors[0].sensorOnCabinDoor
        this.quotation.Doors.LandingDoorFrame = this.quotations2[0].Doors[0].LandingDoorFrame
        this.quotation.Doors.CarInterlock = this.quotations2[0].Doors[0].CarInterlock
        this.quotation.Doors.automaticDoors = this.quotations2[0].Doors[0].automaticDoors
        this.quotation.Doors.LandingDoorInterlock = this.quotations2[0].Doors[0].LandingDoorInterlock
        this.quotation.Doors.DoorClearOpeningsWidht = this.quotations2[0].Doors[0].DoorClearOpeningsWidht
        this.quotation.Doors.DoorClearOpeningHeightinmm = this.quotations2[0].Doors[0].DoorClearOpeningHeightinmm
        this.quotation.Doors.TypeOfDoorCost = this.quotations2[0].Doors[0].TypeOfDoorCost
        this.quotation.Doors.LandingDoorCost = this.quotations2[0].Doors[0].LandingDoorCost
        this.quotation.Doors.LandingDoorInterlockCost = this.quotations2[0].Doors[0].LandingDoorInterlockCost
        this.quotation.Doors.DoorWidthCost = this.quotations2[0].Doors[0].DoorWidthCost
        this.quotation.Doors.DoorHeightCost = this.quotations2[0].Doors[0].DoorHeightCost
        // this.quotation.Doors.sensorOnCabinDoorCost = this.quotations2[0].Doors[0].sensorOnCabinDoorCost
        this.quotation.Doors.TransportationCost = this.quotations2[0].Doors[0].TransportationCost
        this.quotation.Doors.Interlock = this.quotations2[0].Doors[0].Interlock
        this.quotation.Doors.carDoorPanel = this.quotations2[0].Doors[0].carDoorPanel
        this.quotation.Doors.LandingDoorFrameCost = this.quotations2[0].Doors[0].LandingDoorFrameCost
        this.quotation.Doors.DoorPanelsCost = this.quotations2[0].Doors[0].DoorPanelsCost
        this.quotation.Doors.CarInterlockCost = this.quotations2[0].Doors[0].CarInterlockCost
        this.quotation.Doors.LandingDoorPanelCost = this.quotations2[0].Doors[0].LandingDoorPanelCost
        this.quotation.Doors.InterlockCost = this.quotations2[0].Doors[0].InterlockCost
        this.quotation.Doors.automaticDoorsCost = this.quotations2[0].Doors[0].automaticDoorsCost
        this.quotation.Doors.carDoorPanelCost = this.quotations2[0].Doors[0].carDoorPanelCost

 
        // get Scope of work data

        this.quotation.ScopeOfWork.PackingLoading = this.quotations2[0].ScopeOfWork[0].PackingLoading;
        this.quotation.ScopeOfWork.Transportation = this.quotations2[0].ScopeOfWork[0].Transportation;
        this.quotation.ScopeOfWork.Unloading = this.quotations2[0].ScopeOfWork[0].Unloading;
        this.quotation.ScopeOfWork.Storing = this.quotations2[0].ScopeOfWork[0].Storing;
        this.quotation.ScopeOfWork.Scaffolding = this.quotations2[0].ScopeOfWork[0].Scaffolding;
        this.quotation.ScopeOfWork.IBEAM = this.quotations2[0].ScopeOfWork[0].IBEAM;
        this.quotation.ScopeOfWork.Liasoning = this.quotations2[0].ScopeOfWork[0].Liasoning;
        this.quotation.ScopeOfWork.License = this.quotations2[0].ScopeOfWork[0].License;
        this.quotation.ScopeOfWork.IbeamforMachineBase = this.quotations2[0].ScopeOfWork[0].IbeamforMachineBase;
        this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoom = this.quotations2[0].ScopeOfWork[0].IBeamShiftingtillMachineRoom;
        this.quotation.ScopeOfWork.MinorCivilWork = this.quotations2[0].ScopeOfWork[0].MinorCivilWork;
        //added by ranjeet - get all cost fields
        this.quotation.ScopeOfWork.PackingLoadingCost = this.quotations2[0].ScopeOfWork[0].PackingLoadingCost;
        this.quotation.ScopeOfWork.TransportationCost = this.quotations2[0].ScopeOfWork[0].TransportationCost;
        this.quotation.ScopeOfWork.UnloadingCost = this.quotations2[0].ScopeOfWork[0].UnloadingCost;
        this.quotation.ScopeOfWork.StoringCost = this.quotations2[0].ScopeOfWork[0].StoringCost;
        this.quotation.ScopeOfWork.ScaffoldingCost = this.quotations2[0].ScopeOfWork[0].ScaffoldingCost;
        this.quotation.ScopeOfWork.IBEAMCost = this.quotations2[0].ScopeOfWork[0].IBEAMCost;
        this.quotation.ScopeOfWork.LiasoningCost = this.quotations2[0].ScopeOfWork[0].LiasoningCost;
        this.quotation.ScopeOfWork.LicenseCost = this.quotations2[0].ScopeOfWork[0].LicenseCost;
        this.quotation.ScopeOfWork.IbeamforMachineBaseCost = this.quotations2[0].ScopeOfWork[0].IbeamforMachineBaseCost;
        this.quotation.ScopeOfWork.IBeamShiftingtillMachineRoomCost = this.quotations2[0].ScopeOfWork[0].IBeamShiftingtillMachineRoomCost;
        this.quotation.ScopeOfWork.MinorCivilWorkCost = this.quotations2[0].ScopeOfWork[0].MinorCivilWorkCost;

        //get Optional Features data

        this.quotation.OptionalFeatures.ViewWindow = this.quotations2[0].OptionalFeatures[0].ViewWindow;
        this.quotation.OptionalFeatures.EmergencyTelephoneSystem = this.quotations2[0].OptionalFeatures[0].EmergencyTelephoneSystem;
        this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublic = this.quotations2[0].OptionalFeatures[0].EmergencyTelephoneSystemPublic;
        this.quotation.OptionalFeatures.BiometricAccess = this.quotations2[0].OptionalFeatures[0].BiometricAccess;
        this.quotation.OptionalFeatures.CardReaderAccess = this.quotations2[0].OptionalFeatures[0].CardReaderAccess;
        this.quotation.OptionalFeatures.FullHeightCarOperatingPanel = this.quotations2[0].OptionalFeatures[0].FullHeightCarOperatingPanel;
        this.quotation.OptionalFeatures.Intercom = this.quotations2[0].OptionalFeatures[0].Intercom;
        this.quotation.OptionalFeatures.AttendantOperation = this.quotations2[0].OptionalFeatures[0].AttendantOperation;
        this.quotation.OptionalFeatures.ParkingKeySwitch = this.quotations2[0].OptionalFeatures[0].ParkingKeySwitch;
        this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperation = this.quotations2[0].OptionalFeatures[0].DuplexAndTriplexCarGroupOperation;
        this.quotation.OptionalFeatures.TimedBlindFloor = this.quotations2[0].OptionalFeatures[0].TimedBlindFloor;
        this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusic = this.quotations2[0].OptionalFeatures[0].VoiceSynthesizerWithCustomizedMusic;
        this.quotation.OptionalFeatures.Handrail = this.quotations2[0].OptionalFeatures[0].Handrail;
        this.quotation.OptionalFeatures.OverloadDevice = this.quotations2[0].OptionalFeatures[0].OverloadDevice;
        this.quotation.OptionalFeatures.VVVFDrive = this.quotations2[0].OptionalFeatures[0].VVVFDrive;
        this.quotation.OptionalFeatures.SinglePhaseOperation = this.quotations2[0].OptionalFeatures[0].SinglePhaseOperation;
        this.quotation.OptionalFeatures.AutomaticRescue = this.quotations2[0].OptionalFeatures[0].AutomaticRescue;
        //get all cost fields Added by Ranjeet
        this.quotation.OptionalFeatures.ViewWindowCost = this.quotations2[0].OptionalFeatures[0].ViewWindowCost;
        this.quotation.OptionalFeatures.EmergencyTelephoneSystemCost = this.quotations2[0].OptionalFeatures[0].EmergencyTelephoneSystemCost;
        this.quotation.OptionalFeatures.EmergencyTelephoneSystemPublicCost = this.quotations2[0].OptionalFeatures[0].EmergencyTelephoneSystemPublicCost;
        this.quotation.OptionalFeatures.BiometricAccessCost = this.quotations2[0].OptionalFeatures[0].BiometricAccessCost;
        this.quotation.OptionalFeatures.CardReaderAccessCost = this.quotations2[0].OptionalFeatures[0].CardReaderAccessCost;
        this.quotation.OptionalFeatures.FullHeightCarOperatingPanelCost = this.quotations2[0].OptionalFeatures[0].FullHeightCarOperatingPanelCost;
        this.quotation.OptionalFeatures.IntercomCost = this.quotations2[0].OptionalFeatures[0].IntercomCost;
        this.quotation.OptionalFeatures.AttendantOperationCost = this.quotations2[0].OptionalFeatures[0].AttendantOperationCost;
        this.quotation.OptionalFeatures.ParkingKeySwitchCost = this.quotations2[0].OptionalFeatures[0].ParkingKeySwitchCost;
        this.quotation.OptionalFeatures.DuplexAndTriplexCarGroupOperationCost = this.quotations2[0].OptionalFeatures[0].DuplexAndTriplexCarGroupOperationCost;
        this.quotation.OptionalFeatures.TimedBlindFloorCost = this.quotations2[0].OptionalFeatures[0].TimedBlindFloorCost;
        this.quotation.OptionalFeatures.OverloadDeviceCost = this.quotations2[0].OptionalFeatures[0].OverloadDeviceCost;
        this.quotation.OptionalFeatures.AutomaticRescueCost = this.quotations2[0].OptionalFeatures[0].AutomaticRescueCost;
        this.quotation.OptionalFeatures.VoiceSynthesizerWithCustomizedMusicCost = this.quotations2[0].OptionalFeatures[0].VoiceSynthesizerWithCustomizedMusicCost;
        this.quotation.OptionalFeatures.HandrailCost = this.quotations2[0].OptionalFeatures[0].HandrailCost;
        this.quotation.OptionalFeatures.VVVFDriveCost = this.quotations2[0].OptionalFeatures[0].VVVFDriveCost;
        this.quotation.OptionalFeatures.SinglePhaseOperationCost = this.quotations2[0].OptionalFeatures[0].SinglePhaseOperationCost;

        //get Guarantee data

        this.quotation.Guarantee.Guarantee = this.quotations2[0].Guarantee[0].Guarantee;
        this.quotation.Guarantee.GuaranteeDateOfDispatch = this.quotations2[0].Guarantee[0].GuaranteeDateOfDispatch;
        this.quotation.Guarantee.FreeMaintenancePeriod = this.quotations2[0].Guarantee[0].FreeMaintenancePeriod;
        this.quotation.Guarantee.FreeMaintenancePeriodDate = this.quotations2[0].Guarantee[0].FreeMaintenancePeriodDate;
        // get all cost fields Added by Ranjeet
        this.quotation.Guarantee.GuaranteeCost = this.quotations2[0].Guarantee[0].GuaranteeCost;
        this.quotation.Guarantee.GuaranteeDateOfDispatchCost = this.quotations2[0].Guarantee[0].GuaranteeDateOfDispatchCost;
        this.quotation.Guarantee.FreeMaintenancePeriodCost = this.quotations2[0].Guarantee[0].FreeMaintenancePeriodCost;
        this.quotation.Guarantee.FreeMaintenancePeriodDateCost = this.quotations2[0].Guarantee[0].FreeMaintenancePeriodDateCost;


        this.quotation.TaxDate = this.quotations2[0].TaxDate;
        this.quotation.is_draft = this.quotations2[0].is_draft;
        this.quotation.DocDueDate = this.quotations2[0].DocDueDate;
        this.quotation.FreightCharge = Number(this.quotations2[0].FreightCharge);
        this.quotation.ContactPersonCode = String(this.quotations2[0].ContactPersonCode);
        this.quotation.DiscountPercent = Number(this.quotations2[0].DiscountPercent);
        this.quotation.DocDate = this.quotations2[0].DocDate;
        this.quotation.CardCode = this.quotations2[0].CardCode;
        this.quotation.BPLID = this.quotations2[0].BPLID;

        this.getBranch(this.quotation.CardCode);
        this.quotation.CardName = this.quotations2[0].CardName;
        this.quotation.Comments = this.quotations2[0].Comments;
        this.quotation.SalesPersonCode = this.quotations2[0].SalesPersonCode;
        // this.quotation.SalesPersonCode = this.quotations2[0].SalesPersonCode[0].SalesEmployeeCode;
        this.quotation.U_OPPID = this.quotations2[0].U_OPPID;
        this.quotation.U_OPPRNM = this.quotations2[0].U_OPPRNM;
        this.quotation.DocumentLines = this.quotations2[0].DocumentLines;
        this.quotation.CreateDate = this.quotations2[0].CreateDate;
        this.quotation.CreateTime = this.quotations2[0].CreateTime;
        this.quotation.U_QUOTNM = this.quotations2[0].U_QUOTNM;
        this.quotation.PaymentGroupCode = this.quotations2[0].PaymentGroupCode;

        this.quotation.AddressExtension = this.quotations2[0].AddressExtension;
        this.codeType1 = this.quotations2[0].AddressExtension.ShipToCountry;

        this.quotation.AdvancePercentage = this.quotations2[0].AdvancePercentage
        this.quotation.AdvanceDate = this.quotations2[0].AdvanceDate
        this.quotation.AdvanceAmount = this.quotations2[0].AdvanceAmount
        this.quotation.DrawingPercentage = this.quotations2[0].DrawingPercentage
        this.quotation.DrawingDate = this.quotations2[0].DrawingDate
        this.quotation.DrawingAmount = this.quotations2[0].DrawingAmount
        this.quotation.PreProductionPercentage = this.quotations2[0].PreProductionPercentage
        this.quotation.PreProductionDate = this.quotations2[0].PreProductionDate
        this.quotation.PreProductionAmount = this.quotations2[0].PreProductionAmount
        this.quotation.PostProductionPercentage = this.quotations2[0].PostProductionPercentage
        this.quotation.PostProductionDate = this.quotations2[0].PostProductionDate
        this.quotation.PostProductionAmount = this.quotations2[0].PostProductionAmount
        this.quotation.PreDispatchPercentage = this.quotations2[0].PreDispatchPercentage
        this.quotation.PreDispatchDate = this.quotations2[0].PreDispatchDate
        this.quotation.PreDispatchAmount = this.quotations2[0].PreDispatchAmount
        this.quotation.PostDispatchPercentage = this.quotations2[0].PostDispatchPercentage
        this.quotation.PostDispatchDate = this.quotations2[0].PostDispatchDate
        this.quotation.PostDispatchAmount = this.quotations2[0].PostDispatchAmount
        this.quotation.MechanicalPercentage = this.quotations2[0].MechanicalPercentage
        this.quotation.MechanicalDate = this.quotations2[0].MechanicalDate
        this.quotation.MechanicalAmount = this.quotations2[0].MechanicalAmount
        this.quotation.HandoverPercentage = this.quotations2[0].HandoverPercentage
        this.quotation.HandoverlDate = this.quotations2[0].HandoverlDate
        this.quotation.HandoverAmount = this.quotations2[0].HandoverAmount


        // console.log(this.quotations2[0].AddressExtension.BillToCountry)
        this.quotation.AddressExtension.BillToCountry = this.quotations2[0].AddressExtension.BillToCountry;
        // this.codeType2 = this.quotations2[0].AddressExtension[0].BillToCountry;
        this.selectedDayState = this.quotations2[0].AddressExtension.U_BSTATE;
        this.codeState_ = this.quotations2[0].AddressExtension.BillToState;
        this.selectedDayState2 = this.quotations2[0].AddressExtension.U_SSTATE;
        this.codeState2_ = this.quotations2[0].AddressExtension.ShipToState;
        this.dummyarray = this.quotation.AddressExtension;

        this.updateTotalAmount();
        // $('#BusinessPartner').attr('disabled', true);
        // // $('#BPLID').attr("disabled", true);
        // $('#SalesPersonCode').attr('disabled', true);
        // $('#opportunityName').attr('disabled', true);
        // const newArray = this.bridgeService2.replaceKeyInArray(this.quotation.DocumentLines, 'TaxRate', 'Tax');
        // this.quotation.DocumentLines = newArray;
        for (let i = 0; i < this.quotation.DocumentLines.length; i++) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Oid: this.quotation.DocumentLines[i].id,
            Quantity: this.quotation.DocumentLines[i].Quantity,
            UnitPrice: this.quotation.DocumentLines[i].UnitPrice,
            DueDate: this.quotation.DocumentLines[i].DueDate,
            DiscountPercent: this.quotation.DocumentLines[i].DiscountPercent,
            ItemCode: this.quotation.DocumentLines[i].ItemCode,
            ItemDescription: this.quotation.DocumentLines[i].ItemDescription,
            TaxCode: this.quotation.DocumentLines[i].TaxCode,
            TaxRate: this.quotation.DocumentLines[i].TaxRate || 0,
          });
         
        }

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
        this.CountItem = this.quotations2[0].DocumentLines.length;
        this.quotation.id = String(this.quotations2[0].id);

        this.bridgeService2.getContactPersone(this.quotation.CardCode).subscribe(
          (data: any) => {
            this.contactPersoneList = data;
          });
        // this.http.post(this.baseUrl2 + '/businesspartner/employee/' + 'all', { "CardCode": this.quotation.CardCode }).toPromise().then((data: any) => {
        //   this.contactPersoneList = data['data'];
        // });

        for (let i = 0; i < this.DynamicFiledPositionDetials.length; i++) {
          if (this.quotations2[0][this.DynamicFiledPositionDetials[i].field_name] == null) {
            this.quotations2[0][this.DynamicFiledPositionDetials[i].field_name] = '';
          }
          this.quotation[this.DynamicFiledPositionDetials[i].field_name] = this.quotations2[0][this.DynamicFiledPositionDetials[i].field_name];
        }


        this.bridgeService2.getStatedata(this.quotation.AddressExtension.BillToCountry).subscribe(
          (data: States[]) => {
            this.statess2 = data;
            // console.log(this.statess);

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      
        this.bridgeService2.getStatedata(this.quotation.AddressExtension.ShipToCountry).subscribe(
          (data: States[]) => {
            this.statess = data;
          

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );

      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );

  }


  changePassenger(selectedPassenger: string) {
    this.selectedPassenger = selectedPassenger
    this.showStandardFields = selectedPassenger === 'Standard Passenger';
    this.showCustomizedFields = selectedPassenger === 'Customized Passenger';

    if (this.showStandardFields) {
      // Apply MS Powder Coated Fields only for Standard Passenger
      this.selectedFields = { ...this.msPowderCoatedFields };
    }
    else if (this.showCustomizedFields) {
      this.selectedFields.pushButtons = ''
      this.selectedFields.display = ''

      // Ensure all fields are included to avoid missing properties error
      // this.selectedFields = {
      //   sidePanels: '',
      //   rearPanels: '',
      //   mirror: '',
      //   flooring: '',
      //   ceiling: '',
      //   lighting: '',
      //   fan: '',
      //   copPlate: '',
      //   lopPlate: '',
      //   display: '',
      //   pushButtons: '',
      //   doorOperation: '',
      //   doorClearOpeningsWidth: '',
      //   doorClearOpeningHeight: '',
      //   carDoorPanel: '',
      //   landingDoorFrame: '',
      //   landingDoorPanel: '',
      //   sensorOnCabin: '',
      // };


    }
  }

  changeSeries(selectedSeries: string) {
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






      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false


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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

    } else if (selectedSeries === 'Coffee Bean') {
      this.selectedFields = { ...this.coffeeBeanFields };
      this.selectedSeriesCoffeeBean = selectedSeries === 'Coffee Bean'
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

      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

    } else if (selectedSeries === 'Dark Wood') {
      this.selectedFields = { ...this.darkWoodFields };
      this.selectedSeriesDarkWood = selectedSeries === 'Dark Wood'
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

      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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

      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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

      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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


      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

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

      this.isSeriesCastSilver = false
      this.isSeriesMSPowderCoated = false
      this.isSeriesSSvertical = false
      this.isSeriesPreCoatedSSfinish = false
      this.isSeriesCoffeeBean = false
      this.isSeriesDarkWood = false
      this.isSeriesSSclassic = false
      this.isSeriesPatinaGold = false
      this.isSeriesJavaLattice = false
      this.isSeriesGlanberry = false
      this.isSeriesTanWood = false
      this.isSeriesSpiritedCongac = false

    }



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
    this.pagination2.PageNo = 1;
    this.getQuotationItem2(this.CategroyIDD);
  }
  emptySeach(){
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
  // emptySeach() {
  //   this.searchValue = '';
  //   this.RowPerPage();
  // }


  ItemNAme: any;
  ItemQty: any;
  ItemDis: any;
  ItemDueDate: any;
  ItemId: any;
  ItemCode: any;
  ItemPrice: any;
  TaxCode: any;
  TaxRate: any;
  open(content: any, item: any) {
    if (this.QuatItems.map(($item: any) => $item.ItemCode).includes(item.ItemCode)) {
      return;
    }
    else {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered figma-cards-modal figma-cards-modal-lg custom-modal-css' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      this.ItemId = item.id;
      this.ItemNAme = item.ItemName;
      this.ItemQty = 1;
      this.ItemDis = item.Discount;
      this.ItemDueDate = '';
      this.ItemCode = item.ItemCode;
      this.ItemPrice = item.UnitPrice;
      this.TaxCode = item.TaxCode;
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
    $('#add_quat').show();
    $('#select_item').hide();
    $('#selected_item').hide();
  }
  back2() {
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
    // console.log('item',item);
    this.ItemId = item.id;
    this.ItemNAme = item.ItemDescription;
    this.ItemQty = item.Quantity;
    this.ItemDis = item.DiscountPercent;
    this.ItemDueDate = item.DueDate
    this.ItemCode = item.ItemCode;
    this.ItemPrice = item.UnitPrice;
    this.TaxCode = item.TaxCode;
    this.TaxRate = item.TaxRate;
  }
  ITemDataUpdate(event: any) {
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
          DiscountPercent: this.ItemDis,
          DueDate: this.ItemDueDate,
          ItemCode: this.ItemCode,
          ItemDescription: this.ItemNAme,
          TaxCode: this.TaxCode,
          TaxRate: this.TaxRate || 0,
        });

      }
      else {
        var check: boolean = false;
        for (let i = 0; i < this.QuatItems.length; i++) {
          if (this.ItemCode == this.QuatItems[i]['ItemCode']) {
            check = false;
            this.QuatItems[i]['Quantity'] = this.ItemQty;
            this.QuatItems[i]['DiscountPercent'] = this.ItemDis;
            this.QuatItems[i]['TaxRate'] = this.TaxRate;
            this.QuatItems[i]['DueDate'] = this.ItemDueDate;
            break;
          }
          else {
            check = true;
          }

        }
        if (check) {
          this.QuatItems.push({
            id: this.QuatItems.length + 1,
            Quantity: this.ItemQty,
            UnitPrice: this.ItemPrice,
            DiscountPercent: this.ItemDis,
            DueDate: this.ItemDueDate,
            ItemCode: this.ItemCode,
            ItemDescription: this.ItemNAme,
            TaxCode: this.TaxCode,
            TaxRate: this.TaxRate || 0,
          });
        }
      }

      console.log(this.ItemDueDate)
      console.log(this.QuatItems)
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
  total_Amount: any;
  sendarray() {
    var totalamount: any = 0;
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


    // console.log(this.QuatItems)
    // console.log(this.quotation.DocumentLines);

    for (var x = 0; x < this.QuatItems.length; x++) {

      for (var y = 0; y < this.quotation.DocumentLines.length; y++) {

        if (this.QuatItems[x]['ItemCode'] == this.quotation.DocumentLines[y]['ItemCode']) {
          Object.assign(this.QuatItems[x], { id: this.quotation.DocumentLines[x].id }, { LineNum: this.quotation.DocumentLines[x].LineNum }, { QuotationID: this.quotation.DocumentLines[x].QuotationID });
        }
        else {
          // console.log(this.QuatItems[x]['ItemCode']);
          // console.log(this.quotation.DocumentLines[y]['ItemCode']);
        }
      }

    }

    this.CountItem = this.QuatItems.length;
    for (let i = 0; i < this.QuatItems.length; i++) {
      this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
      // console.log('this.QuatItems test',this.QuatItems[i]['Oid']);
      if (this.QuatItems[i]['id'] == undefined) {
        this.QuatItems[i]['id'] = '';
      }
    }
    this.quotation.DocumentLines = this.QuatItems;
    this.totalsum();
    // console.log(this.QuatItems);
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
  cardco: any;
  CurrentBranch: any;


  selectChangeOpportunity(event: any) {
    this.isdataLoading = true;
    this.bridgeService2.getOneOpportunitydata(event?.id ?? event).subscribe(
      (data: any) => {
        this.quotation.U_OPPID = String(data[0]['id']);
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
    this.calculatitonFuntionOfDiscount(this.QuatItems);
  }

  calculatitonFuntionOfDiscount(NewArr: any) {

    var totalamount: any = 0;
    this.quotation.DocumentLines = this.QuatItems;
    this.CountItem = this.QuatItems.length
    for (let i = 0; i < this.QuatItems.length; i++) {
      delete this.QuatItems[i]['id'];
      this.QuatItems[i]['id'] = this.QuatItems[i]['Oid'];
      var basic = Number(this.QuatItems[i].Quantity) * Number(this.QuatItems[i].UnitPrice);
      var afterfdis = basic - (basic * (Number(this.QuatItems[i].DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(this.quotation.DiscountPercent) / 100))
      var total = aftersdis + (aftersdis * (Number(this.QuatItems[i].TaxRate) / 100))
      totalamount = Number(totalamount) + Number(total);
    }
    this.Totfunction = Number(totalamount);
    if (this.quotation.FreightCharge != '') {
      this.Totfunction = Number(this.Totfunction) + Number(this.quotation.FreightCharge);
    }
    this.Totfunction = Number(this.Totfunction);
  }

  calculatitonFuntion(NewArr: any) {

    this.QuatItems = [];
    var totalamount: any = 0;
    for (let i = 0; i < NewArr.length; i++) {
      this.QuatItems.push({
        id: NewArr[i].id,
        Quantity: NewArr[i].Quantity,
        UnitPrice: NewArr[i].UnitPrice,
        DueDate: NewArr[i].DueDate,
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
      if (this.QuatItems[i]['id'] == undefined) {
        this.QuatItems[i]['id'] = '';
      }
      totalamount = Number(totalamount) + Number(total);
    }
    this.Totfunction = Number(totalamount);
    if (this.quotation.FreightCharge != '') {
      this.Totfunction = Number(this.Totfunction) + Number(this.quotation.FreightCharge);
    }
    this.Totfunction = Number(this.Totfunction);
  }
  contactPersoneList: any;
  selectedDayItem: string = '';
  quotationCardName: any;
  quotationCardCode: any;



  isdataLoading: boolean = false;
  BP_Detailsdata: any[] = [];

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
        console.log(data)
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

  changeModel(selectedModel: string) {
    console.log('changeModel', selectedModel);

    const modelMapping: { [key: string]: string } = {
      'Classic': 'HL 15',
      'Comfort': 'HL 30',
      'Swift': 'HL 40',
      'Pro': 'HL 50'
    };
    this.quotation.LongData.modelNo = modelMapping[selectedModel] || '';
  }


  updatePersons() {
    if (this.quotation.LongData.capacity) {
      this.quotation.LongData.persons = (this.quotation.LongData.capacity / 68).toFixed(2);
    } else {
      this.quotation.LongData.persons = '';
    }
  }


  toggleCladding(selectedStructure: any) {
    this.showCladding = ["MS. Ex with cladding", "Alu. Ex with cladding"].includes(selectedStructure);
  }

  updateQuotation(f: NgForm, isdraft: any) {
    console.log('test draft', isdraft);

    console.log('f', f);


    console.log('check series', this.selectedSeries);

    this.quotation.LongData = {


      passengers: this.quotation.LongData.passengers,
      typeOfDoor: this.quotation.LongData.typeOfDoor,
      series: this.quotation.LongData.series,
      carDesigns: this.quotation.LongData.carDesigns,


      sidePanels: this.quotation.LongData.sidePanels,
      rearPanels: this.quotation.LongData.rearPanels,
      mirror: this.quotation.LongData.mirror,
      flooring: this.quotation.LongData.flooring,
      ceiling: this.quotation.LongData.ceiling,
      lighting: this.quotation.LongData.lighting,
      fan: this.quotation.LongData.fan,
      COP_Plate: this.quotation.LongData.copPlate,
      LOP_Plate: this.quotation.LongData.lopPlate,
      display: this.quotation.LongData.display,
      pushButtons: this.quotation.LongData.pushButtons,
      doorOperation: this.quotation.LongData.doorOperation,
      doorClearOpeningsWidth: this.quotation.LongData.doorClearOpeningsWidth,
      doorClearOpeningHeight: this.quotation.LongData.doorClearOpeningHeight,
      carDoorPanel: this.quotation.LongData.carDoorPanel,
      landingDoorFrame: this.quotation.LongData.landingDoorFrame,
      landingDoorPanel: this.quotation.LongData.landingDoorPanel,
      sensorOnCabin: this.quotation.LongData.sensorOnCabin,
      cabinInterior: this.quotation.LongData.cabinInterior,
      lopCop: this.quotation.LongData.lopCop,
      skirting: this.quotation.LongData.skirting,
      remarks1: this.quotation.LongData.remarks1,
      remarks2: this.quotation.LongData.remarks2,
      handrail: this.quotation.LongData.handrail,
      model: this.quotation.LongData.model,
      modelNo: this.quotation.LongData.modelNo,
      carDoor: this.quotation.LongData.carDoor,
      plateLOP: this.quotation.LongData.plateLOP,
      capacity: this.quotation.LongData.capacity,
      persons: this.quotation.LongData.persons,
      Partition: this.quotation.LongData.Partition,
      frame: this.quotation.LongData.frame,
      cladding: this.quotation.LongData.cladding,
      customization: this.quotation.LongData.customization,
      structure: this.quotation.LongData.structure,
      operation: this.quotation.LongData.operation,
      pit: this.quotation.LongData.pit,
      speed: this.quotation.LongData.speed,
      protection: this.quotation.LongData.protection,


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
      lopPlateCost: this.quotation.LongData.lopPlateCost,
      displayCost: this.quotation.LongData.displayCost,
      pushButtonsCost: this.quotation.LongData.pushButtonsCost,
      doorOperationCost: this.quotation.LongData.doorOperationCost,
      doorClearOpeningsWidthCost: this.quotation.LongData.doorClearOpeningsWidthCost,
      doorClearOpeningHeightCost: this.quotation.LongData.doorClearOpeningHeightCost,
      carDoorPanelCost: this.quotation.LongData.carDoorPanelCost,
      partitionCost: this.quotation.LongData.partitionCost,
      frameCost: this.quotation.LongData.frameCost,
      pitCost: this.quotation.LongData.pitCost,
      speedCost: this.quotation.LongData.speedCost,
      cabinInteriorCost: this.quotation.LongData.cabinInteriorCost,
      structureCost: this.quotation.LongData.structureCost,
      claddingCost: this.quotation.LongData.claddingCost,
      operationCost: this.quotation.LongData.operationCost,
      customizationCost: this.quotation.LongData.customizationCost,
      landingDoorFrameCost: this.quotation.LongData.landingDoorFrameCost,
      landingDoorPanelCost: this.quotation.LongData.landingDoorPanelCost,
      sensorOnCabinCost: this.quotation.LongData.sensorOnCabinCost,
      skirtingCost: this.quotation.LongData.skirtingCost,
      protectionCost: this.quotation.LongData.protectionCost,
      modelCost: this.quotation.LongData.modelCost,
      carDoorCost: this.quotation.LongData.carDoorCost,
      plateLOPCost: this.quotation.LongData.plateLOPCost,
      lopcopCost: this.quotation.LongData.lopcopCost,
    };
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
      DoorClearOpeningsWidht: this.selectedFieldsSpecialElevators.DoorClearOpeningsWidht,
      DoorClearOpeningHeightinmm: this.selectedFieldsSpecialElevators.DoorClearOpeningHeightinmm,
      sensorOnCabinDoor: this.quotation.Doors.sensorOnCabinDoor,
      LandingDoorPanel: this.quotation.Doors.LandingDoorPanel,
      LandingDoor: this.quotation.Doors.LandingDoor,
      // added by ranjeet
      TypeOfDoorCost: this.quotation.Doors.TypeOfDoorCost,
      DoorHeightCost: this.quotation.Doors.DoorHeightCost,
      DoorWidthCost: this.quotation.Doors.DoorWidthCost,
      LandingDoorInterlockCost: this.quotation.Doors.LandingDoorInterlockCost,
      LandingDoorCost: this.quotation.Doors.LandingDoorCost,
      LandingDoorFrameCost: this.quotation.Doors.LandingDoorFrameCost,
      DoorPanelsCost: this.quotation.Doors.DoorPanelsCost,
      CarInterlockCost: this.quotation.Doors.CarInterlockCost,
      LandingDoorPanelCost: this.quotation.Doors.LandingDoorPanelCost,
      InterlockCost: this.quotation.Doors.InterlockCost,
      automaticDoorsCost: this.quotation.Doors.automaticDoorsCost,
      // sensorOnCabinDoorCost: this.quotation.Doors.sensorOnCabinDoorCost,
      carDoorPanelCost: this.quotation.Doors.carDoorPanelCost,


    };
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


    console.log('check shaft', this.quotation.LongData);
    f = this.bridgeService2.GlobaleTrimFunc(f);
    if (isdraft == 'draft') {
      this.quotation.is_draft = 1
    }
    else {
      this.quotation.is_draft = 0
    }
    //console.log("this.quotation",this.quotation)
    for (let [keys, value] of Object.entries(f.value)) {
      if (!!!f.value[keys]) {
        f.value[keys] = "";
      }
    }

    if (f.valid || this.quotation.is_draft == 1) {
      this.resetAlerts();
      this.quotationCardCode
      let params = this.quotation;
      params.CardCode = this.quotation.CardCode;
      //console.log(this.quotation);
      if (this.CountItem == 0 && this.quotation.is_draft == 0) {
        this._NotifierService.showError('please Select Atleast One Item');
        $('.item-list-area').css('border', '2px solid red');
        $('.item-list-area').css('box-shadow', '0 10px 15px 0 rgb(255 226 225), 0 15px 30px 0 rgb(251 159 161)');
      }
      else {
        $('.item-list-area').css('border', 'none');
        $('.item-list-area').css('box-shadow', 'none');
        this.isLoading = true;
        // const newArray = this.bridgeService2.replaceKeyInArray(this.quotation.DocumentLines, 'Tax', 'TaxRate');
        // this.quotation.DocumentLines = newArray;
        if (this.quotation.FreightCharge == '') {
          this.quotation.FreightCharge = 0
        }
        this.quotation.DocTotal = this.total_Amount;
        this.quotation.UpdateDate = this.HeadingServices.getDate(),
          this.quotation.UpdateTime = this.HeadingServices.getTime()






        this.bridgeService2.editQuotation(this.quotation).subscribe(
          (res: EditQuotation) => {
            if (Object(res)['status'] == "200") {
              this.isLoading = false;

              this._NotifierService.showSuccess(this.Headingss[0].leftheading + " " + this.Headingss[0].heading104 + " " + this.Headingss[0].heading106);
              this.modalService.dismissAll();
              this.router.navigate(['/quotation']);

            }
            else {
              this._NotifierService.showError(Object(res)['message']);
              this.isLoading = false;
            }


          },
          (err) => {
            this.isLoading = false;
            const delim = ":"
            const name = err.message
            const result = name.split(delim).slice(3).join(delim)
            this._NotifierService.showError(result);

          }
        );
      }
    }
    else {
      this._NotifierService.showError('Fill Required Field');
      this.isLoading = false;
    }


  }



  changeCarDesign(selectedDesign: string) {
    this.isSeriesAceCourtyard = false
    this.isSeriesAwesome = false
    this.isSeriesElite = false
    this.isSeriesGrande = false
    this.isSeriesUber = false



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

  showshipaddress() {
    let num = (<HTMLInputElement>document.getElementById("showshipaddress"));
    if (num.checked) {
      $('.showshipaddress').show();
    }
    else {
      $('.showshipaddress').hide();
    }
  }

  /* added by millan on 25-05-2022 */
  backClicked() {
    this._location.back();
  }
  /* added by millan on 25-05-2022 */


  OrderCancel() {
    this.modalService.dismissAll();
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
  //       //
  //  // console.log(key,hasEditPermission)
  //       return hasEditPermission;
  //   }
  //   return false;
  // }

  updateTotalAmount(): void {
    console.log("Updating total amount...");

    if (!this.quotation) {
      console.error("Error: Quotation data is missing.");
      return;
    }

    // Helper function to safely get a number value
    const getSafeNumber = (obj: any, key: string): number => {
      if (!obj || !(key in obj) || obj[key] === null || obj[key] === undefined) {
        console.warn(`Warning: Missing value for ${key}, defaulting to 0.`);
        return 0;
      }
      return Number(obj[key]) || 0; // Convert to number or default to 0
    };

    this.totalSubAmount =
      getSafeNumber(this.quotation, "TypeOfInstallationCost") +
      getSafeNumber(this.quotation.LongData, "doorOperationCost") +
      getSafeNumber(this.quotation, "MachineCost") +
      getSafeNumber(this.quotation.LongData, "carDesignsCost") +
      getSafeNumber(this.quotation.LongData, "seriesCost") +
      getSafeNumber(this.quotation.LongData, "sidePanelsCost") +
      getSafeNumber(this.quotation.LongData, "rearPanelsCost") +
      getSafeNumber(this.quotation.LongData, "mirrorCost") +
      getSafeNumber(this.quotation.LongData, "handrailCost") +
      getSafeNumber(this.quotation.LongData, "flooringCost") +
      getSafeNumber(this.quotation.LongData, "ceilingCost") +
      getSafeNumber(this.quotation.LongData, "lightingCost") +
      getSafeNumber(this.quotation.LongData, "fanCost") +
      getSafeNumber(this.quotation.LongData, "copPlateCost") +
      getSafeNumber(this.quotation.LongData, "lopPlateCost") +
      getSafeNumber(this.quotation.LongData, "displayCost") +
      getSafeNumber(this.quotation.LongData, "pushButtonsCost") +
      getSafeNumber(this.quotation.LongData, "doorClearOpeningsWidthCost") +
      getSafeNumber(this.quotation.LongData, "doorClearOpeningHeightCost") +
      getSafeNumber(this.quotation.LongData, "carDoorPanelCost") +
      getSafeNumber(this.quotation.LongData, "partitionCost") +
      getSafeNumber(this.quotation.LongData, "frameCost") +
      getSafeNumber(this.quotation.LongData, "pitCost") +
      getSafeNumber(this.quotation.LongData, "speedCost") +
      getSafeNumber(this.quotation.LongData, "cabinInteriorCost") +
      getSafeNumber(this.quotation.LongData, "structureCost") +
      getSafeNumber(this.quotation.LongData, "claddingCost") +
      getSafeNumber(this.quotation.LongData, "operationCost") +
      getSafeNumber(this.quotation.LongData, "customizationCost") +
      getSafeNumber(this.quotation.LongData, "carDoorCost") +
      getSafeNumber(this.quotation.LongData, "plateLOPCost") +
      getSafeNumber(this.quotation.LongData, "lopcopCost") +
      getSafeNumber(this.quotation.LongData, "landingDoorFrameCost") +
      getSafeNumber(this.quotation.LongData, "landingDoorPanelCost") +
      getSafeNumber(this.quotation.LongData, "sensorOnCabinCost") +
      getSafeNumber(this.quotation.LongData, "protectionCost") +
      getSafeNumber(this.quotation.LongData, "modelCost") +
      getSafeNumber(this.quotation.LongData, "skirtingCost") +
      getSafeNumber(this.quotation.Doors, "TypeOfDoorCost") +
      getSafeNumber(this.quotation.Doors, "LandingDoorInterlockCost") +
      getSafeNumber(this.quotation.Doors, "DoorHeightCost") +
      getSafeNumber(this.quotation.Doors, "LandingDoorCost") +
      getSafeNumber(this.quotation.Doors, "LandingDoorPanelCost") +
      getSafeNumber(this.quotation.Doors, "InterlockCost") +
      getSafeNumber(this.quotation.Doors, "carDoorPanelCost") +
      getSafeNumber(this.quotation.Doors, "automaticDoorsCost") +
      getSafeNumber(this.quotation.Doors, "sensorOnCabinDoorCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "PackingLoadingCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "TransportationCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "UnloadingCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "StoringCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "ScaffoldingCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "IBEAMCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "LiasoningCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "LicenseCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "IbeamforMachineBaseCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "IBeamShiftingtillMachineRoomCost") +
      getSafeNumber(this.quotation.ScopeOfWork, "MinorCivilWorkCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "ViewWindowCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "EmergencyTelephoneSystemCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "EmergencyTelephoneSystemPublicCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "BiometricAccessCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "CardReaderAccessCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "FullHeightCarOperatingPanelCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "IntercomCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "AttendantOperationCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "ParkingKeySwitchCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "DuplexAndTriplexCarGroupOperationCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "TimedBlindFloorCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "OverloadDeviceCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "AutomaticRescueCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "VoiceSynthesizerWithCustomizedMusicCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "HandrailCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "VVVFDriveCost") +
      getSafeNumber(this.quotation.OptionalFeatures, "SinglePhaseOperationCost") +
      getSafeNumber(this.quotation.Guarantee, "GuaranteeCost") +
      getSafeNumber(this.quotation.Guarantee, "GuaranteeDateOfDispatchCost") +
      getSafeNumber(this.quotation.Guarantee, "FreeMaintenancePeriodCost") +
      getSafeNumber(this.quotation.Guarantee, "FreeMaintenancePeriodDateCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "TypeCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "VerticalSheetMetalCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "VerticalTubularCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "HorizontalSheetMetalCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "HorizontalTubularCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "CladdingChoiceCost")+
      getSafeNumber(this.quotation.ElevatorSteelStructure, "FoundationBoltsCost");

    console.log("Subtotal Amount:", this.totalSubAmount);

    this.totalsum(); // Call totalsum() if needed
  }

  totalsum() {
    console.log("totalSubAmount", Number(this.totalSubAmount).toFixed(2))
    console.log("Totfunction", Number(this.Totfunction).toFixed(2))
    this.total_Amount = Number(Number(this.totalSubAmount) + Number(this.Totfunction)).toFixed(2);
    console.log("total_Amount", this.total_Amount)
  }

  addNewFeilds(selectedLift: string) {

    // if(selectedLift != 'Passenger elevator' )
    // {
    //   this.showStandardFields= false
    //   this.showCustomizedFields = false
    // }
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
    this.quotation.LongData.copPlate = "";
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


    // this.quotation.LongData.model =  "";
    this.isSeriesAceCourtyard = false;
    this.isSeriesAwesome = false;
    this.isSeriesElite = false;
    this.isSeriesGrande = false;
    this.isSeriesUber = false;
    this.isSeriesCastSilver = false;
    this.isSeriesMSPowderCoated = false;
    this.isSeriesSSvertical = false;
    this.isSeriesPreCoatedSSfinish = false;
    this.isSeriesCoffeeBean = false;
    this.isSeriesDarkWood = false;
    this.isSeriesSSclassic = false;
    this.isSeriesPatinaGold = false;
    this.isSeriesJavaLattice = false;
    this.isSeriesGlanberry = false;
    this.isSeriesTanWood = false;
    this.isSeriesSpiritedCongac = false;





    this.showPassengerField = selectedLift === 'Passenger elevator';

    if (selectedLift !== 'Passenger elevator') {
      console.log('inside the passnegr');

      this.showStandardFields = false
      this.showCustomizedFields = false
    }
    if (selectedLift === 'Freight elevator') {

      this.showStandardFields = false
      this.showCustomizedFields = false
      this.selectedFieldsElevators = { ...this.FreightLongData }
      console.log('check', { ...this.FreightLongData });

    }
  }


  updateAutomaticDoorValues() {
    this.carDoorPanelData = [];
    this.LandingDoorPanelData = [];
    this.LandingDoorFrameData = [];
    this.SensorOnCabinDoorData = [];

    this.selectedAutomaticDoor=this.quotation.Doors.automaticDoors;
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

    for (let i = 0; i < this.SensorOnCabinDoor.length; i++) {
      if (this.selectedAutomaticDoor == this.SensorOnCabinDoor[i].automatic) {
        this.SensorOnCabinDoorData = this.SensorOnCabinDoor[i].data;

      }
    }

  }

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
      if (this.selectedModel == this.sidePanels[i].model && this.selectedCarDesigns == this.sidePanels[i].car) {
        this.sidePanelsData = this.sidePanels[i].data;
        // this.rearPanelsData = this.rearPanels[i].data
      }
    }


    for (let i = 0; i < this.rearPanels.length; i++) {
      if (this.selectedModel == this.rearPanels[i].model && this.selectedCarDesigns == this.rearPanels[i].car) {
        // this.sidePanelsData = this.rearPanels[i].data;
        this.rearPanelsData = this.rearPanels[i].data
      }
    }

    for (let i = 0; i < this.mirror.length; i++) { // Added loop for mirror panel
      if (this.selectedModel == this.mirror[i].model && this.selectedCarDesigns == this.mirror[i].car) {
        this.mirrorData = this.mirror[i].data;
      }
    }

    for (let i = 0; i < this.flooringOptions.length; i++) {
      if (this.selectedModel == this.flooringOptions[i].model && this.selectedCarDesigns == this.flooringOptions[i].car) {
        this.flooringData = this.flooringOptions[i].data;
      }
    }
    for (let i = 0; i < this.ceilingOptions.length; i++) {
      if (this.selectedModel == this.ceilingOptions[i].model && this.selectedCarDesigns == this.ceilingOptions[i].car) {
        this.ceilingData = this.ceilingOptions[i].data;
      }
    }
    for (let i = 0; i < this.lightingsOptions.length; i++) {
      if (this.selectedModel == this.lightingsOptions[i].model && this.selectedCarDesigns == this.lightingsOptions[i].car) {
        this.lightingsData = this.lightingsOptions[i].data;
      }
    }
    for (let i = 0; i < this.fanOptions.length; i++) {
      if (this.selectedModel == this.fanOptions[i].model && this.selectedCarDesigns == this.fanOptions[i].car) {
        this.fanData = this.fanOptions[i].data;
      }
    }
    for (let i = 0; i < this.copPlateOptions.length; i++) {
      if (this.selectedModel == this.copPlateOptions[i].model && this.selectedCarDesigns == this.copPlateOptions[i].car) {
        this.copPlateData = this.copPlateOptions[i].data;
      }
    }
    for (let i = 0; i < this.displayOptions.length; i++) {
      if (this.selectedModel == this.displayOptions[i].model && this.selectedCarDesigns == this.displayOptions[i].car) {
        this.displayData = this.displayOptions[i].data;
      }
    }
    for (let i = 0; i < this.pushButtonOptions.length; i++) {
      if (this.selectedModel == this.pushButtonOptions[i].model && this.selectedCarDesigns == this.pushButtonOptions[i].car) {
        this.pushButtonData = this.pushButtonOptions[i].data;
      }
    }
  }




}
