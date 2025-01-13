import { Component, Input, OnInit,Renderer2  } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {
  @Input() GetPopupData: any[]=[];
  isEdit:boolean=false;
  TypeOfPop:any;
  childData:any;

  PDFLgog:any = '../../assets/img/newBridgelogo.png';
  PDFComName:any = '...';

  ProjectSetting: any;
  replaceNone(val:any) {
    var valData = ''
    if (val == 'None') {
      valData = '';
    }
    else {
      valData = val + " ";
    }
    return valData
  }

  replaceNoneWithComma(val:any) {
    var valData = ''
    if (val == 'None') {
      valData = '';
    }
    else {
      valData = val + " ";
    }
    return valData

  }

  checkBillingCity(val:any, val2?:any) {
    var valData = ''
    if (val != 'None') {
      valData = val + " ";
    }
    else if (val2 != 'None') {
      valData = val2 + " ";
    }
    else {
      valData = '';
    }

    return valData
  }
  constructor(private bridgeService: BridgeService,private renderer: Renderer2) { }

  ngOnInit(): void {
    // console.log(this.GetPopupData)
    if(this.GetPopupData.length>0){
      console.log('this.GetPopupData.length',this.GetPopupData.length);
    this.childData = this.GetPopupData[0];
    this.isEdit = this.GetPopupData[1];
    this.TypeOfPop = this.GetPopupData[2];
    }
    // console.log(this.childData)
    this.populateData(this.childData);
    this.ProjectSetting = sessionStorage.getItem('ProjectSetting');
    this.ProjectSetting = JSON.parse(this.ProjectSetting);
    if(this.ProjectSetting[0].custom_field1 != null && this.ProjectSetting[0].custom_field1 != ''){
      this.PDFLgog = this.bridgeService.baseUrl2 + this.ProjectSetting[0].custom_field1
    }
    if(this.ProjectSetting[0].custom_field2 != null && this.ProjectSetting[0].custom_field2 != ''){
      this.PDFComName = this.ProjectSetting[0].custom_field2
    }

    console.log(this.ProjectSetting )
  }

  convertNumberToWords(num: any): string {
    num = num.toFixed(2);
    const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['Thousand', 'Million', 'Billion'];

    if (num === 0) return 'Zero';

    function convertToWords(n: number): string {
        if (n < 10) return units[n];
        if (n < 20) return teens[n - 11];
        if (n < 100) return tens[Math.floor(n / 10) - 1] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
        if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertToWords(n % 100) : '');

        for (let i = 0, value = 1000; value <= 1e9; value *= 1000, i++) {
            if (n < value * 1000) {
                return convertToWords(Math.floor(n / value)) + ' ' + thousands[i] + (n % value !== 0 ? ' ' + convertToWords(n % value) : '');
            }
        }
        return '';
    }

    function convertFractionalPart(fraction: string): string {
        return fraction
            .split('')
            .map((digit) => units[parseInt(digit, 10)])
            .join(' ');
    }

    const [integerPart, fractionalPart] = num.toString().split('.');
    let words = convertToWords(parseInt(integerPart, 10));

    if (fractionalPart) {
        words += ' Point ' + convertFractionalPart(fractionalPart);
    }

    return words;
}



 // Output: "One Thousand Two Hundred Thirty Eight Only"

  ourBranchContent:any = '...';
  BPLName:any = "...";
  FederalTaxID:any = "...";
  MobilePhone:any = "...";
  SalesEmployeeName:any = "...";
  BillToStreet:any = "...";
  ShipToStreet:any = "...";
  PaymentTermsGroupName:any = "...";
  fianllindtotal: number = 0;
  total_after: number = 0;
  total_after_tax: number = 0;
  tax_Value: number = 0;
  total_Amount: number = 0;
  totalamount: any[] = [];
  populateData(data: any) {
    if(data.AddressExtension.length != 0){
      this.BillToStreet =
        this.replaceNoneWithComma(data.AddressExtension.BillToStreet) +
        this.replaceNone(data.AddressExtension.BillToCity) +
        this.checkBillingCity(data.AddressExtension.U_BSTATE) +
        this.replaceNone(data.AddressExtension.U_BCOUNTRY) +
        this.replaceNone(data.AddressExtension.BillToZipCode);

        this.ShipToStreet =
        this.replaceNoneWithComma(data.AddressExtension.ShipToStreet) +
        this.replaceNone(data.AddressExtension.ShipToCity) +
        this.checkBillingCity(data.AddressExtension.U_SSTATE) +
        this.replaceNone(data.AddressExtension.U_BCOUNTRY) +
        this.replaceNone(data.AddressExtension.ShipToZipCode);
    }

    if(data.DocumentLines.length != 0){
      data.DocumentLines.forEach((val: any, key: any) => {
        this.fianllindtotal += Number(val.UnitPrice*val.Quantity);

        var basic = Number(val.Quantity) * Number(val.UnitPrice);
      var afterfdis = basic - (basic * (Number(val.DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(data.DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(val.TaxRate) / 100));
      // totalamount += Number(total);
      this.total_after += afterfdis;
      this.total_after_tax += aftersdis;
      this.tax_Value +=  (aftersdis * (Number(val.TaxRate) / 100));
      });
      this.total_Amount = Number(this.total_after_tax)+Number(this.tax_Value);
      if(data.FreightCharge != ''){
        this.total_Amount = Number(this.total_Amount) + Number(data.FreightCharge)
      }
    }
    if (data.PaymentGroupCode != '') {
      this.bridgeService.getPaymentTermsOnedata(data.PaymentGroupCode).subscribe(
        (PaymentGroupCodeDetails: any) => {
          if(PaymentGroupCodeDetails.length > 0){
            console.log('py',PaymentGroupCodeDetails.length);
          this.PaymentTermsGroupName = PaymentGroupCodeDetails[0].PaymentTermsGroupName;
          }
        });
      }

    if (data.ContactPersonCode != '') {
    this.bridgeService.getContactPersoneone(data.ContactPersonCode).subscribe(
      (contactPersoneUpdate: any) => {
        if(contactPersoneUpdate.length>0){
          console.log('cp',contactPersoneUpdate.length);
        this.MobilePhone = contactPersoneUpdate[0].MobilePhone;
        }
      });
    }
    if (data.SalesPersonCode != '') {
      this.bridgeService.getoneemployee(data.SalesPersonCode).subscribe(
        (SalesPersonCodeDetails: any) => {
          if(SalesPersonCodeDetails.length>0){
            console.log('sp',SalesPersonCodeDetails.length);
          this.SalesEmployeeName = SalesPersonCodeDetails[0].SalesEmployeeName;
          }
        });
      }

    if (data.BPLID != '') {
    this.bridgeService.OneBranchMaster(data.BPLID).subscribe(
      (Client: any) => {
        if(Client.data.length > 0){
          console.log('cd',Client.data.length);
        this.BPLName = Client.data[0].BPLName;
        this.FederalTaxID = Client.data[0].FederalTaxID;
        this.ourBranchContent =
        this.replaceNoneWithComma(Client.data[0].Building) +
        this.replaceNone(Client.data[0].City) +
        this.checkBillingCity(Client.data[0].State) +
        this.replaceNone(Client.data[0].Country) +
        this.replaceNone(Client.data[0].ZipCode);
        }

  },
  (err) => {
    console.log(err);
  }
);
  }


  }

}
