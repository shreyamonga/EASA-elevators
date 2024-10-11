import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadingServicesService {
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  curtime=("0"+this.dateObj.getHours()).slice(-2) + ':' + ("0"+this.dateObj.getMinutes()).slice(-2);
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  newdate = this.day + '-' + this.month + '-' + this.year;
  newrevdate = this.year + '-' + this.month + '-' + this.day;
  MainWord:any = {heading101:'Add',heading102:'Update',heading103:'Added',heading104:'Updated',heading105:'Save',heading106:'Successfully',heading107:'Detail',heading108:'Attachment',heading109:'Filter',heading110:'Search',
  heading111:'Action',heading112:'Cancel',heading113:'Apply',heading114:'Reset',heading115:'View',heading116:'Details',heading117:'Filters',heading118:'Item',heading119:'',heading120:''}
  newdatetime = this.newdate + ' ' + this.time;

  getPlusDayDate(dayss:number){
    const dateObj = new Date(); // June 1, 2022 UTC time

    dateObj.setDate(dateObj.getDate() + dayss);
    var month2 = dateObj.getMonth() + 1;
    var month = (month2 < 10 ? '0' : '') + month2;
    var day = (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate();
    var year = dateObj.getUTCFullYear();
  var newdate = year + '-' + month + '-' + day;
  return newdate
  }
  getDate(){
    // return this.newdate
    return this.newrevdate
  }
  getrevDate(){
    return this.newrevdate
  }

  getDateTime(){
    return this.newdatetime
  }

  getTime(){
    return this.curtime
  }

  Module0: any[] = [ // Dashboard
    {
      leftheading: 'Dashboard', heading0: 'Welcome to Bridge: Sales CRM', heading1: 'Total Revenue', heading2: 'Total Sale', heading3: 'Total Customers',
       heading4: 'Total Lead', heading5: 'Total Order', heading6: 'Collection vs Projection Amount',heading60: 'Top 10 Customers',heading7: 'Delivery Status',heading8: 'Best Selling Item by Sales Amount',heading9: 'Inventory Status',heading10: 'Hot and Warm Deals',heading11: 'Lead Source',
       heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
       heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
       heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    }
  ];
  Module1: any[] = [ // User
    {
      leftheading: 'User', heading0: 'ID', heading1: 'First Name', heading2: 'Last Name', heading3: 'Employee ID', heading4: 'Role', heading5: 'Zone', heading6: 'Email',
      heading7: 'Phone', heading8: 'Reporting To', heading9: 'Designation', heading10: 'Password', heading11: 'Status', heading12: 'Name', heading13: '', heading14: '',heading100: 'Last Updated',
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    }
  ];

  Module2: any[] = [ // Lead
    {
      leftheading: 'Lead', SubHeading1: 'General', SubHeading2: 'Junk', SubHeading3: 'Split', SubHeading4: 'Kanban', heading0: 'ID', heading1: 'Company Name', heading2: 'Person Name', heading3: this.Module1[0].heading7, heading4: 'Person Designation', heading5: this.Module1[0].heading6, heading6: 'Location',
      heading7: 'Source', heading8: 'Product Interest', heading9: 'Num Of Employee', heading10: 'Turnover', heading11: this.Module1[0].heading11, heading12: 'Lead Priority', heading13: 'Assigned To', heading14: 'Remarks',heading15:'Created By',heading16:'Created Date',heading17:'BP', heading100: this.Module1[0].heading100,
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120

    },
    {
      heading:'Follow Up', heading0: 'Date', heading1: 'Time', heading2: 'Mode of Communication', heading3: 'Comment', heading4: 'Reminder',
    }
  ];
  Module3: any[] = [ // Business Partner
    {
      leftheading: 'Business Partner', SubHeading: 'BP', SubHeading2: 'General Details', SubHeading3: 'Contact Details', heading0: 'BP Code', heading1: this.Module2[0].leftheading, heading2: this.Module2[0].heading1
      , heading3: 'Website', heading4: this.Module1[0].heading7, heading5: this.Module2[0].heading5, heading6: this.Module2[0].heading10
      , heading7: 'Industry', heading8: 'Sales Employee', heading9: 'Business Type', heading10: 'Payment Term'
      , heading11: this.Module1[0].heading5, heading12: 'Parent Account', heading13: 'GST', heading14: this.Module2[0].heading14
      , heading100: this.Module1[0].heading100,
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    {
      SubHeading:'Contact Person',heading:'Contact Person', heading0: 'Contact Name',heading02: 'Last Name', heading1: this.Module1[0].heading7, heading2: this.Module2[0].heading5, heading3: 'Address', heading4: 'Position',
    },
    {
      SubHeading:'Branch',heading:'Address Details',SubHeading1:'Billing',SubHeading2:'Shipping', heading0: 'Name', heading1: 'Address', heading2: 'City', heading3: 'State', heading4: 'Country', heading5: 'Zip code', heading6: 'Shipping Type',
    },
    {
      quicklink1:'Opportunity',quicklink2:'Quotation',quicklink3:'Order',quicklink4:'Invoice'
    }
  ];

  Module4: any[] = [ // Opportunity
    {
      leftheading: 'Opportunity', heading0: 'ID', heading01: 'Created Date', heading1: this.Module2[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Close Date', heading6: this.Module3[0].heading8,
      heading7: 'Type', heading8: 'Probability', heading9: 'Lead Source', heading10: 'Remarks', heading11: 'Total Amount',heading12: this.Module3[3].quicklink2,heading13:'Stage', heading100: this.Module1[0].heading100,
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    {
      heading:'Item Code',heading01:'ID',heading0:'Item Name',heading1:'Category',heading2:'Unit Price',heading3:'Enter Discount (%) on Item',heading4:'Enter Tax(GST)',heading5:'Enter Quantity',heading6:'Quantity',heading7:'Tax(GST) %',heading8:'Discount %',heading9:'Open Qty'
    },
    {
      heading:'Items',heading0:'Click to view all items',heading1:'Select Items from list',heading2:'Selected Items from list',heading3:'Add Items'
    },
    {
      quicklink1:'Opportunity',quicklink2:'Contact',quicklink3:'Quotation',quicklink4:'Order'
    }
  ];

  Module5: any[] = [ // Quotation
    {
      leftheading: 'Quotation', SubHeading: 'Details', heading0: 'ID', heading01: 'Created Date', heading1: this.Module4[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Posting Date', heading50: 'Valid Date', heading51: 'Document Date', heading6: this.Module3[0].heading8,
      heading7: 'Branch', heading8: this.Module3[0].heading10, heading9: 'Freight Charge', heading91: 'Attchments', heading10: this.Module4[0].heading10, heading11: 'Total Amount',heading12: this.Module4[1].heading8,heading13:this.Module4[3].quicklink4,heading14:'Status',heading15:'PDF', heading100: this.Module1[0].heading100,
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    this.Module3[2],
    this.Module4[1],
    this.Module4[2],
    {
      heading:'Total Before Discount',heading0:'Total After Discount',heading1:'Grand Total',
    }
  ];

  Module6:any[] = [
    {
      leftheading: 'Order',SubHeading: 'Details',Extra1:'PO NO.',Extra2:'PO Date',Extra3:'Delivery',Extra4:'Invoice',
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    this.Module5[0],
    this.Module5[1],
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]

  Module7:any[] = [
    {
      leftheading: 'Delivery',SubHeading: 'Delivery Details',Extra1:'PO NO.',Extra2:'PO Date',Extra3:'Order Placed on',Extra4:'Invoice',
      Extra5:'Tracking Details',Extra6:'Tracking ID',Extra7:'Shipped With',Extra8:'Dispatched Date',Extra9:'Expected Delivery',
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    this.Module5[0],
    this.Module5[1],
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]


  Module8:any[] = [
    {
      leftheading: 'Invoice',SubHeading: 'Invoice Information',Extra1:'PO NO.',Extra2:'PO Date',Extra3:'Delivery',Extra4:'Invoice',
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
    this.Module5[0],
    this.Module5[1],
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]

  Module9:any[] = [
    {
      leftheading: 'Payment Collection',SubHeading: 'Invoice Information',Extra1:'PO NO.',Extra2:'PO Date',Extra3:'Delivery',Extra4:'Invoice',
      heading101:this.MainWord.heading101,heading102:this.MainWord.heading102,heading103:this.MainWord.heading103,heading104:this.MainWord.heading104,heading105:this.MainWord.heading105,
      heading106:this.MainWord.heading106,heading107:this.MainWord.heading107,heading108:this.MainWord.heading108,heading109:this.MainWord.heading109,heading110:this.MainWord.heading110,
      heading111:this.MainWord.heading111,heading112:this.MainWord.heading112,heading113:this.MainWord.heading113,heading114:this.MainWord.heading114,heading115:this.MainWord.heading115,
       heading116:this.MainWord.heading116,heading117:this.MainWord.heading117,heading118:this.MainWord.heading118,heading119:this.MainWord.heading119,heading120:this.MainWord.heading120
    },
  ]
  constructor() { }
  getZeroModule(): any[] {
    return this.Module0;
  }
  getFirstModule(): any[] {
    return this.Module1;
  }


  getModule2(): any[] {
    return this.Module2;
  }

  getModule3(): any[] {
    return this.Module3;
  }
  getModule4(): any[] {
    return this.Module4;
  }
  getModule5(): any[] {
    return this.Module5;
  }

  getModule6(): any[] {
    return this.Module6;
  }

  getModule7(): any[] {
    return this.Module7;
  }

  getModule8(): any[] {
    return this.Module8;
  }

  getModule9(): any[] {
    return this.Module9;
  }

  getReturnLeftMenu() {
    var allmodule: any[] = [];
    allmodule.push(this.Module0[0]);
    allmodule.push(this.Module1[0]);
    allmodule.push(this.Module2[0]);
    allmodule.push(this.Module3[0]);
    allmodule.push(this.Module4[0]);
    allmodule.push(this.Module5[0]);
    allmodule.push(this.Module6[0]);
    allmodule.push(this.Module7[0]);
    allmodule.push(this.Module8[0]);
    allmodule.push(this.Module9[0]);
    return allmodule
  }



}
