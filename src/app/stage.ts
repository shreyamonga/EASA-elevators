export interface Stages {
        SequenceNo: string;
        Name: string;
        Stageno: string;
        ClosingPercentage: string;
        Cancelled: string;
        IsSales: string;
        IsPurchasing: string;
        Comment: string;
        File: string;
        CreateDate: string;
        UpdateDate: string;
        Status: string;
        Opp_Id: string;
        Class: string;
        Color: string;
        popup1: string;
        popup2: string;
        popup3: string;
        id?: number;
}


export interface CreateStages {
        SequenceNo: string;
        Name: string;
        Stageno: string;
        ClosingPercentage: string;
        Cancelled: string;
        IsSales: string;
        IsPurchasing: string;

        CreateDate: string;
        UpdateDate: string;
        Opp_Id: string;
        id?: number;
}
export interface ChangeStages {
        StageStatus:any,
        Stageno: any,
        Opp_Id: string,
        id: any,
        Stage_Id: string,
        File: any;
        Floor: any,
        Name: string,
        ProjectName: string,
        BillingName: string,
        KeyDecisionMaker: string,


        keyDecisionMakerMobile:'',
        keyDecisionMakerEmail:'',
        PmMobile: '',
        PmEmail: '',
        personFromPurchaseMobile: '',
        personFromPurchaseEmail: '',
        architectEmail: '',
        builderEmail: '',
        contractorEmail: '',
        interiorDesignerEmail: '',

        PMName: string,
        PersonFromPurchase: any,
        BillingAddress: any,
        ShippingAddress: any,
        ArchitectName: string,
        ArchitectNumber: number,
        BuilderName: string,
        BuilderNumber: number,
        ContractorName: string,
        ContractorNumber: number,
        InteriorDesignerName: string,
        InteriorDesignerNumber: number,
        Space: any,
        InstallationPlace: string,
        StructureRequired: any,
        TimePeriodForLiftRequirement: any,
        TypeLiftRequired: any,
        TypeOfProperty: any,
        SpecificNeed: string,
        TypeOfMaterialToBeTransported: any,
        TypeOfIndustry: any,
        Capacity: any,
        MR_MRL: any,
        CabinDepth: number,
        CabinWidth: number,
        CabinHeight: number,
        DoorWidth: number,
        DoorHeight: number,
        CabinInteriorFinish: any,
        DoorFinish: any,
        DoorType: any,
        OpeningSided: any,
        PitDepth: number,
        OverHead: any,
        TotalTravel: any,
        NonStandardFeature: any,
        Remarks: any,
        NumberOfStop: number,
        NumberOfOpening: number,
        AppointmentBooking: any,
        SiteCity:any,
        SiteState:any,
        SiteZipcode:any,
        SiteAddress:any,
        OfferPrice:any
}

export interface SecondStage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        SitePicture: any,
        BDMPictures: any
        id: any,
        FinalRGFSentToClient: any
        ProcessFlowPresented: any
        CatalogHandover: any,
        PhysicalCopyOfRGF: any
        CustomizationsIfAny: any,
        Opening: any,
        BuddyUp: any,
        OfferedPrice: number
        NumberOfStop: number
        DrawingToBeSharedBy:any,
        DrawingAttachment:any
}

export interface uploadProfilePic {
        SalesEmployeeCode : any,
        Image: any
}


export interface ThirdStage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        id: any,
        TechnicalPPTShared: any,
        DrawingShared: any,
        Remarks: any,
        AnyUpdation: any,
        File: any,

}



export interface Negotiation1Stage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        id: any,

        PersonDoingNegotiation: any
        Remarks: any
        GenericPrice: number
        // OfferPrice:number
        GAP: number,
        DiscussionOverPrice: any,
        ApprovedBy: any,
        Negotiation1Price:any,
        ApprovalStatus:any

}


export interface Negotiation2Stage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        Negotiation2Price:any
        CreatedBy: any,
        Remarks: any,
        Negotiation3: any, 
        File: any,
        id: any,
}

export interface Negotiation3Stage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        Negotiation3Price: '',
        ApprovedBy: any,
        CreatedBy: any,
        Remarks: any,
        File: any,
        id: any,
}



export interface ClosureStage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,

        id: any,
        Remarks: any,
        File: any,
        PCHApproval: any,
}

export interface OrderBookingStage {
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        id: any,
        CreatedBy : any,
        Remarks: any,
        PaymentProof: any
        SignedQuote: any
        LOI: any


}
export interface OrderConfirmationStage
{
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        id: any,
        CreatedBy: any,
        Remarks: any,
        EquipmentNumber: any,
        Order_Id: any,
        OrderName: any,
        FinanceApproval: any,


}
export interface PreNIStage
{
        StageStatus:any,
        Stageno: any;
        Opp_Id: string,
        Stage_Id: string,
        PreNIChecklist: any
        HandoverForm: any,
        PreNIChecklist_File: any
        Handover: any,
        MOM: any,
        id: any,
        CreatedBy: any,
}



export interface CompleteStages {
        Opp_Id: string;
        Remarks: string;
        Status: string;
        UpdateDate: string;
        UpdateTime: string;
}


export interface PreNIChecklist {
        CUSTOMER_SCOPE_LIFTNO : any;
        CUSTOMER_SCOPE_TOWER  : any;
        SUPERVISOR_NAME : any;
        ORDER_NUMBER: any,
        PROJECT_NAME: any,
        SITE_ADDRESS: any,
        TYPE_OF_LIFT: any,
        TYPE_OF_DOORS: any,
        DATE_OF_VISIT: any,
        SITE_READY_UP_TO_WHICH_FLOOR: any,
        EXPECTED_SITE_READY_DATE: any,
        SIGNATURE: any,
        CUSTOMER_REP_NAME: any,
        MOBILE_NO: any,
        CheckList1 : any,
        CheckList2 : any,
        CheckList3 : any,
        Scope_Job_Name: any,
        Scope_Lift_No: any,
        Scope_Order_Date: any,
        Scope_EASA_Job_No: any,
        Scope_Site_address: any,
        Scope_Tower: any,
        Scope_Type_of_Drive: any,
        Scope_Type_of_Lift: any,
        Scope_Type_of_Door: any,
        Scope_Date_of_Visit: any,
        Scope_Site_Ready_up_to_Which_Floor: any,
        Scope_Expected_Site_Ready_Date: any,
        Scope_Supervisor: any,
        Scope_Signature: any,
        Scope_Customer_Rep_Name: any,
        Scope_Mobile_No: any,
        Specs: any,
        Stops_Counting : any,
        CreatedBy : any,
        Opp_Id : any,
        Stage_Id : any
}

export interface EditChecklist {
        CUSTOMER_SCOPE_LIFTNO : any;
        CUSTOMER_SCOPE_TOWER  : any;
        SUPERVISOR_NAME : any;
        ORDER_NUMBER: any,
        PROJECT_NAME: any,
        SITE_ADDRESS: any,
        TYPE_OF_LIFT: any,
        TYPE_OF_DOORS: any,
        DATE_OF_VISIT: any,
        SITE_READY_UP_TO_WHICH_FLOOR: any,
        EXPECTED_SITE_READY_DATE: any,
        SIGNATURE: any,
        CUSTOMER_REP_NAME: any,
        MOBILE_NO: any,
        CheckList1 : any,
        CheckList2 : any,
        CheckList3 : any,
        Scope_Job_Name: any,
        Scope_Lift_No: any,
        Scope_Order_Date: any,
        Scope_EASA_Job_No: any,
        Scope_Site_address: any,
        Scope_Tower: any,
        Scope_Type_of_Drive: any,
        Scope_Type_of_Lift: any,
        Scope_Type_of_Door: any,
        Scope_Date_of_Visit: any,
        Scope_Site_Ready_up_to_Which_Floor: any,
        Scope_Expected_Site_Ready_Date: any,
        Scope_Supervisor: any,
        Scope_Signature: any,
        Scope_Customer_Rep_Name: any,
        Scope_Mobile_No: any,
        Specs: any,
        Stops_Counting : any,
        CreatedBy : any,
        Opp_Id : any,
        Stage_Id : any
}
 
