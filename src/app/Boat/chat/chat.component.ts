import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/modules/service/AuthService.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  @ViewChild('ExcelsheetComponent', { static: false }) ExcelsheetComponent!: ElementRef | any;
  @ViewChild('DeliveryComponent', { static: false }) DeliveryComponent!: ElementRef | any;
  getId(){
    if(this.modelName  === 'Lead' ){
      this.ExcelsheetComponent.openEmpll();
    }
    else if(this.modelName === 'BusinessPartner' ){
      this.router.navigate(['/customer/add-customer']); 
    }
    else if(this.modelName === 'Order' ){
      this.router.navigate(['/order/add-order']); 
    }
    else if(this.modelName === 'Opportunity' ){
      this.router.navigate(['/opportunity/add-opportunity']); 
    }
    else if(this.modelName === 'Campaign' ){
      this.router.navigate(['/campaign/add-campaign']); 
    }
    // else if(this.modelName === 'Delivery' ){
    //   this.DeliveryComponent.openDeliveryModal();
    // }
    
    
    
    
    
  }
  modelName : any;
  receiveData(data: string) {
    if(data == 'true'){
      this.getModuleData({
        "id": this.LastChatID,
        "model_name" : this.modelName,
        "action": 'create_record',
        "field_name": '',
        "data_type":'',
    });
    }
  }

  temp1: boolean = false;
  closeResult = '';
  zoomLevel = 1;
  isHovered = false;
  isDeveloperMode: boolean = false;
  isthreedotPopupVisible: boolean = false;
  pagination: any = {
    PageNo: 1,
    max: 10,
    PageShow: 10
  }
  isLoading2: boolean = false;
  searchValue: any = '';
  totalCount: any;
  startind = 1;
  endind = 1;
  Allopportunitys: any[] = [
    {
      id: 1,
      title: "Ask a Coding Question",
      description: "Get help with programming challenges or learn a new coding concept.",
      examplePrompt: "How do I reverse a linked list in Python?",
      tags: ["Coding", "Programming", "Help"]
    },
    {
      id: 2,
      title: "Brainstorm Ideas",
      description: "Collaborate with GPT to generate creative ideas for projects or tasks.",
      examplePrompt: "What are some unique themes for a sci-fi novel?",
      tags: ["Creativity", "Ideas", "Brainstorming"]
    },
    {
      id: 3,
      title: "Learn a New Skill",
      description: "Explore and learn about a topic or skill you're curious about.",
      examplePrompt: "Teach me the basics of photography.",
      tags: ["Learning", "Skills", "Education"]
    },
    {
      id: 4,
      title: "Write a Document",
      description: "Draft professional documents, essays, or blog posts.",
      examplePrompt: "Help me write a resignation letter.",
      tags: ["Writing", "Documents", "Drafting"]
    },
    {
      id: 5,
      title: "Plan Your Day",
      description: "Create a schedule or plan for a productive day.",
      examplePrompt: "Help me plan my day with a mix of work and relaxation.",
      tags: ["Productivity", "Planning", "Time Management"]
    }
  ];


  AllQuotations: any[] = [
    {
      id: 101,
      customerName: "John Doe",
      quotationDate: "2025-01-01",
      totalAmount: "$12,500",
      status: "Pending",
      items: [
        { productName: "Product A", quantity: 5, price: "$500" },
        { productName: "Service B", quantity: 1, price: "$10,000" }
      ],
      remarks: "Awaiting customer approval."
    },
    {
      id: 102,
      customerName: "Acme Corp",
      quotationDate: "2024-12-20",
      totalAmount: "$25,000",
      status: "Approved",
      items: [
        { productName: "Enterprise Software License", quantity: 3, price: "$8,000" },
        { productName: "Consulting Services", quantity: 10, price: "$500" }
      ],
      remarks: "Approved and forwarded to procurement."
    },
    {
      id: 103,
      customerName: "Jane Smith",
      quotationDate: "2024-12-28",
      totalAmount: "$7,800",
      status: "Rejected",
      items: [
        { productName: "Product C", quantity: 10, price: "$780" }
      ],
      remarks: "Customer found a lower price elsewhere."
    },
    {
      id: 104,
      customerName: "Global Tech",
      quotationDate: "2025-01-02",
      totalAmount: "$18,000",
      status: "Pending",
      items: [
        { productName: "Custom Hardware", quantity: 2, price: "$8,000" },
        { productName: "Installation Services", quantity: 1, price: "$2,000" }
      ],
      remarks: "Customer requested a revised quote."
    }
  ];

  AllOrders: any[] = [];


  InputMess: string = '';
  isPopupVisible = false;
  isPopupVisible1 = false;

  MessageArrya: any = [];
  isTyping: boolean = false;
  userName: any;

  firstName: any;


  typingInterval = 10;
  typingLoop: any;
  hideSaveOnDevMode : boolean = true
  commonObj: any = { isContact: true, bpAddreassMerge: null, detailTab: 'Items', activityTab: 'event' };

  contactPersoneList: any[] = [
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", email: "janesmith@example.com" },
    { id: 3, name: "Michael Brown", phone: "456-789-1230", email: "michaelbrown@example.com" }
  ];


  insights = [
    { title: 'What is a Chatbot?', description: 'A chatbot is a computer program that simulates human conversation through voice commands or text chats or both. It can be integrated with various messaging platforms like Facebook Messenger, WhatsApp, WeChat, etc. and can be used for a variety of purposes, such as customer service, entertainment, and e-commerce.' },
    { title: 'Microsoft Revenue by Product', description: 'Sorem ipsum dolor sit amet, consectetur adipiscing el...' },
    { title: 'Microsoft Revenue by Product', description: 'Sorem ipsum dolor sit amet, consectetur adipiscing el...' },
    { title: 'Microsoft Revenue by Product', description: 'Sorem ipsum dolor sit amet, consectetur adipiscing el...' },
    { title: 'Microsoft Revenue by Product', description: 'Sorem ipsum dolor sit amet, consectetur adipiscing el...' },

  ];


  constructor(private router: Router,
    private authService: AuthService,private bridgeService2: BridgeService, private modalService: NgbModal, private _NotifierService: NotiferService) { }


  ngOnInit(): void {
    this.userName = sessionStorage.getItem('UserName');
    this.firstName = '';
    this.firstName = this.userName.split(' ')[0].charAt(0).toUpperCase() + this.userName.split(' ')[0].slice(1).toLowerCase();

    this.userName = sessionStorage.getItem('UserName');
    if (sessionStorage.getItem('theme') == 'theme-dark') {
      this.isDeveloperMode = true;
    }
    else {
      this.isDeveloperMode = false;
    }

    this.bridgeService2.getthemeRefreshData().subscribe(($theme: any) => {
      this.refreshPage();
      if ($theme == 'theme-dark') {
        this.isDeveloperMode = true;
      }
      else {
        this.isDeveloperMode = false;
      }
      this.GetHistory();
    });

    this.GetHistory();
  }
  itrcount: any;


  opportuni: any[] = ['ert'];
  opportunitys: any[] = ['hi', 'new chat', 'werty'];


  LastChatID: any = '';
  ChatFromDatabase: boolean = true;

  checkhistory(data: any) {
    if(this.isDeveloperMode == false){
    this.refreshPage();
    this.bridgeService2.getOneChatBoatHistory(data.id).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.hideSaveOnDevMode =  false

          this.MessageArrya.push({ side: 'right', text: res.main_query_data.question, type: 'text' });
          this.LastChatID = res.main_query_data.id;
          let typedText: any[] = [];
          typedText[1] = res.main_query_data.answer;
          if (typedText[1] && typedText[1].length > 0) {
            const firstObject = typedText[1][0];
            typedText[2] = Object.keys(firstObject);
            typedText[0] = Object.keys(firstObject).map(key => key.replace(/_/g, ' '));
          } else {
            typedText[2] = [];
            typedText[0] = [];
          }
          this.MessageArrya.push({ side: 'left', text: typedText, text2: res.main_query_data.query_result, type: 'json' });

          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.MessageArrya.push({ side: 'right', text: res.data[i].question, type: 'text' });
              this.MessageArrya.push({ side: 'left', text: res.data[i].answer, type: 'text' });
            }
          }
          this.scrollToBottom();
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        // this.MessageArrya.pop();
        const delim = ":";
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }
  else{
    this.refreshPage();
    this.bridgeService2.getOneChatBoatHistoryDevMode(data.id).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {

          if(res.data[0].action == "create_field") {
          this.hideSaveOnDevMode =  true;
          if(res.data.length != 0){
            let typedText: any[] = [{
              model_name:"",
              field_data: [
                {
                  field_name:"",
                  field_type:'CharField',
                  verbose_name:"",
                  data_option:[],
                  data_type:"text",
                }
              ]
            }];
          this.MessageArrya.push({ side: 'right', text: res.data[0].question, type: 'text' });
          this.MessageArrya.push({ side: 'left', text: typedText, text2: res.data[0].query_result, type: 'Field' });
          }
          if(res.data.length > 1){
            this.MessageArrya.pop();
          let typedText: any[] = [{
            model_name:"",
            field_data: [
              {
                field_name:res.data[1].field_name,
                field_type:'CharField',
                verbose_name:res.data[1].field_name,
                data_option:[],
                data_type:res.data[1].data_type,
              }
            ]
          }];
          this.MessageArrya.push({ side: 'left', text: typedText, text2: res.data[0].query_result, type: 'Field' });
          this.MessageArrya.push({ side: 'left', text: res.data[1].query_result, text2: res.data[1].query_result, type: 'text' });

        }
      }
      else{
        if(res.data.length != 0){
          this.hideSaveOnDevMode =  true;
          let typedText: any[] = [];
          typedText[0] = 'Click Here...';
        this.MessageArrya.push({ side: 'right', text: res.data[0].question, type: 'text' });
        this.MessageArrya.push({ side: 'left', text: typedText, text2: res.data[0].query_result, type: 'Record' });
        }
      }
          this.scrollToBottom();
        }
        else {
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        // this.MessageArrya.pop();
        const delim = ":";
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );

    // this._NotifierService.showError('We Are Working on it');
  }
  }
  SendMessage() {

    this.InputMess = this.InputMess.trim();
    if (this.isTyping === false) {
      if (this.InputMess !== '') {
        this.MessageArrya.push({ side: 'right', text: this.InputMess, type: 'text' });
        this.isTyping = true;
        var Payload: any = {}
        if (this.isDeveloperMode) {
          Payload = {
            "query": this.InputMess,
          };
        }
        else {
          Payload = {
            "query": this.InputMess,
            "is_generate_query": String(this.ChatFromDatabase),
            "id": this.LastChatID
          };
        }
        this.adjustHeightByClass();

        this.MessageArrya.push({ side: 'left', text: 'Loading ...', type: 'loader' });
        this.scrollToBottom();
        this.bridgeService2.sendChatInputandGetResponse(Payload, this.isDeveloperMode).subscribe(
          (res: any) => {

            if (Object(res)['status'] == "200") {
              this.MessageArrya.pop();
              this.simulateTyping(res);
            }
            else {
              this._NotifierService.showError(Object(res)['message']);
              this.MessageArrya.pop();
            }
          },
          (err) => {
            this.MessageArrya.pop();
            const delim = ":";
            const name = err.message;
            const result = name.split(delim).slice(3).join(delim);
            this._NotifierService.showError(result);
          }
        );
      } else {
        this.adjustHeightByClass();
        this._NotifierService.showError('Please Enter Something!');
      }
    } else {
      this._NotifierService.showError('Please Stop the Previous Response!');
    }

  }
  simulateTyping(ApiRes: any) {
    this.GetHistory();
    let textType: any = 'text';
    if (this.isDeveloperMode) {

      if (ApiRes.data.action == undefined || ApiRes.data.action == "") {
        // Process response
        const results = ApiRes.data.results;

        // Check if it contains a table-like format (by detecting '|')
        var typedText2: any[] = [];
        if (results.includes('|')) {
          typedText2 = this.processTable(results);
        } else {
          typedText2 = this.processEntries(results);
        }
        // console.log(typedText2)
        let typedText = '';
        this.typingInterval = 10; // Adjust for typing speed
        this.typingLoop = setInterval(() => {
          if (typedText.length < ApiRes.data.results.length) {
            typedText += ApiRes.data.results[typedText.length];
            if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {
              this.MessageArrya.push({ side: 'left', text: typedText, type: textType });
            } else {
              this.MessageArrya[this.MessageArrya.length - 1].text = typedText;
            }
            this.scrollToBottom();
          } else {
            clearInterval(this.typingLoop);
            this.isTyping = false;
            this.scrollToBottom();
          }
        }, this.typingInterval);
      }
      else {

        if (ApiRes.data.action == "create_field") {
          this.hideSaveOnDevMode = false;
          this.LastChatID = ApiRes.data.id;
          this.modelName = ApiRes.data.modules[0].module_name
          textType = 'Field';

          let typedText: any[] = [];

          let typedText2 = '';
          this.typingInterval = 10; // Adjust for typing speed
          this.typingLoop = setInterval(() => {
            if (typedText2.length < ApiRes.data.results.length) {
              typedText2 += ApiRes.data.results[typedText2.length];
              if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {

                this.MessageArrya.push({ side: 'left', text: typedText, text2: ApiRes.data.results, type: textType });
              } else {
                this.MessageArrya[this.MessageArrya.length - 1].text2 = typedText2;
              }

              if (typedText2.length == ApiRes.data.results.length) {
                if(ApiRes.data.modules != undefined && ApiRes.data.modules.length != 0){
                typedText[0] = {
                  model_name:ApiRes.data.modules[0].module_name,
                  field_data: [
                    {
                      field_name:'',
                      field_type:'CharField',
                      verbose_name:'',
                      data_option:[],
                      data_type:'text',
                    }
                  ]
                }
              }
                // typedText[0] = ApiRes.data.modules;
              }

              this.scrollToBottom();
            } else {
              clearInterval(this.typingLoop);
              this.isTyping = false;
              this.scrollToBottom();
            }
          }, this.typingInterval);
          this.isTyping = false;
        }
        else{
          this.hideSaveOnDevMode = false;
          this.LastChatID = ApiRes.data.id;
          this.modelName = ApiRes.data.modules[0].module_name
          textType = 'Record';

          let typedText: any[] = []

          let typedText2 = '';
          this.typingInterval = 10; // Adjust for typing speed
          this.typingLoop = setInterval(() => {
            if (typedText2.length < ApiRes.data.results.length) {
              typedText2 += ApiRes.data.results[typedText2.length];
              if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {

                this.MessageArrya.push({ side: 'left', text: typedText, text2: ApiRes.data.results, type: textType });
              } else {
                this.MessageArrya[this.MessageArrya.length - 1].text2 = typedText2;
              }

              if (typedText2.length == ApiRes.data.results.length) {
                typedText[0] = 'Click Here...';
              }

              this.scrollToBottom();
            } else {
              clearInterval(this.typingLoop);
              this.isTyping = false;
              this.scrollToBottom();
            }
          }, this.typingInterval);
          this.isTyping = false;
        }
      }
    }
    else {
      if (ApiRes.data.is_json == true) {
        this.LastChatID = ApiRes.data.id;
        textType = 'json';

        let typedText: any[] = [];

        let typedText2 = '';
        this.typingInterval = 10; // Adjust for typing speed
        this.typingLoop = setInterval(() => {
          if (typedText2.length < ApiRes.data.query_result.length) {
            typedText2 += ApiRes.data.query_result[typedText2.length];
            if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {

              this.MessageArrya.push({ side: 'left', text: typedText, text2: ApiRes.data.query_result, type: textType });
            } else {
              this.MessageArrya[this.MessageArrya.length - 1].text2 = typedText2;
            }

            if (typedText2.length == ApiRes.data.query_result.length) {
              typedText[1] = ApiRes.data.results;
              if (typedText[1] && typedText[1].length > 0) {
                const firstObject = typedText[1][0];
                typedText[2] = Object.keys(firstObject);
                typedText[0] = Object.keys(firstObject).map(key => key.replace(/_/g, ' '));
              } else {
                typedText[2] = [];
                typedText[0] = [];
              }
            }
            this.scrollToBottom();
          } else {
            clearInterval(this.typingLoop);
            this.isTyping = false;
            this.scrollToBottom();
          }
        }, this.typingInterval);
        this.isTyping = false;
      } else {

        // Process response
        const results = ApiRes.data.results;

        // Check if it contains a table-like format (by detecting '|')
        var typedText2: any[] = [];
        if (results.includes('|')) {
          typedText2 = this.processTable(results);
        } else {
          typedText2 = this.processEntries(results);
        }
        // console.log(typedText2)
        let typedText = '';
        this.typingInterval = 10; // Adjust for typing speed
        this.typingLoop = setInterval(() => {
          if (typedText.length < ApiRes.data.results.length) {
            typedText += ApiRes.data.results[typedText.length];
            if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {
              this.MessageArrya.push({ side: 'left', text: typedText, type: textType });
            } else {
              this.MessageArrya[this.MessageArrya.length - 1].text = typedText;
            }
            this.scrollToBottom();
          } else {
            clearInterval(this.typingLoop);
            this.isTyping = false;
            this.scrollToBottom();
          }
        }, this.typingInterval);
      }
    }
  }
  transformString(input: string): string {
    return input.trim().toLowerCase().replace(/\s+/g, '_');
  }
  AppruvedPosition2()
 
  {
    // console.log('check data from the Save click' , data)
    // this.clickFrom = data
    // console.log(this.MessageArrya.length);
   var AddUser:any = this.MessageArrya[this.MessageArrya.length-1].text[0];
    this.isLoading = true;
    if(AddUser.field_data[0].verbose_name.trim() != ''){
      AddUser.field_data[0].field_name = this.transformString(AddUser.field_data[0].verbose_name);
      // if(this.AddUser.field_data[0].data_type == 'Dropdown'){
      //   this.AddUser.field_data[0].data_option = [];
      //   for(let i=0;i<this.addresses.length;i++){
      //     this.AddUser.field_data[0].data_option.push(this.addresses[i].value);
      //   }
      //   this.AddUser.field_data[0].data_option = JSON.stringify(this.AddUser.field_data[0].data_option);
      // }
    this.bridgeService2.UpdateSingleField(AddUser).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          this.getModuleData({
            "id": this.LastChatID,
            "model_name": AddUser.model_name,
            "action": 'create_field',
            "field_name": AddUser.field_data[0].verbose_name,
            "data_type": AddUser.field_data[0].data_type ,
        });
          this._NotifierService.showSuccess("Field Added Successfully");
          this.modalService.dismissAll();
          const email = localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');
          const password = localStorage.getItem('currentUserPassword') || sessionStorage.getItem('currentUserPassword');

          if (email && password) {
            const loginPayload = { email: email, password: password, FCM: '',"app_id": "2" };
            this.authService.loginWithSession(loginPayload, false).subscribe(
              (userData) => {
                // console.log('Login Success:', userData);
              },
              (error) => {
                this._NotifierService.showError(error);
              }
            );
          }

        }
        else {
          this.isLoading = false;
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }
  else{
    this.isLoading = false;
    this._NotifierService.showError('Please Enter the Title');
  }
  }


  getModuleData(AddUser:any){
    this.bridgeService2.OtherApiForSTatus(AddUser).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {
          const results = res.data.results;
          // console.log(res)
          // console.log(res.data.results)
          let textType: any = 'text';
          let typedText = results;
          this.MessageArrya.push({ side: 'left', text: typedText, type: textType });
          this.isLoading = false;
          // this.typingInterval = 10;
          // this.typingLoop = setInterval(() => {
          //   if (typedText.length < res.data.results.length) {
          //     typedText += res.data.results[typedText.length];
          //     if (this.MessageArrya.length === 0 || this.MessageArrya[this.MessageArrya.length - 1].side !== 'left') {
          //       this.MessageArrya.push({ side: 'left', text: typedText, type: textType });
          //     } else {
          //       this.MessageArrya[this.MessageArrya.length - 1].text = typedText;
          //     }
          //     this.scrollToBottom();
          //   } else {
          //     clearInterval(this.typingLoop);
          //     this.isTyping = false;
          //     this.scrollToBottom();
          //   }
          // }, this.typingInterval);
        }
        else {
          this.isLoading = false;
          this._NotifierService.showError(Object(res)['message']);
        }
      },
      (err) => {
        this.isLoading = false;
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        console.log(result);
      }
    );
  }

  tostop1() {
    this.isTyping = false;
    clearInterval(this.typingLoop);
  }

  isTextArray(text: any): boolean {
    return Array.isArray(text);
  }

  processEntries(entriesString: string) {
    // Split the entries by double newlines (or you can adjust based on how your data is structured)
    let data = entriesString.split('\n\n');
    return data
  }

  processTable(tableData: string) {
    const jsonResult = [];
    const tableRows = tableData.split("\n");
    const headers = tableRows[0].split("|").map(header => header.trim()).filter(Boolean);

    for (let i = 1; i < tableRows.length; i++) {
      const row = tableRows[i].split("|").map(cell => cell.trim()).filter(Boolean);

      if (row.length === headers.length) {
        const rowObject: any = {};
        for (let j = 0; j < headers.length; j++) {
          rowObject[headers[j]] = row[j];
        }
        jsonResult.push(rowObject);
      }
    }
    return jsonResult;
  }

  toTitleCase(str: any) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2') // Adds space between camelCase words
      .replace(/\b\w/g, (char: string) => char.toUpperCase())
  }


  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 2);
    } catch (err) {
      console.error('Error in scrollToBottom:', err);
    }
  }


  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
  }


  refreshPage() {
    this.MessageArrya = [];
    this.ChatFromDatabase = true;
    this.isTyping = false;
    this.LastChatID = '';
    this.InputMess = '';
    this.adjustHeightByClass();
  }

  adjustHeightByClass(): void {
    this.InputMess = '';
    // Select all elements with the class "auto-expand"
    const textAreas = document.getElementsByClassName('auto-expand') as HTMLCollectionOf<HTMLTextAreaElement>;

    // Loop through the NodeList to adjust each textarea's height
    for (let i = 0; i < textAreas.length; i++) {
      const textArea = textAreas[i];
      textArea.style.height = 'auto'; // Reset the height
    }
  }


  // onScroll(): void {
  //   console.log('hi');
  //   if(this.totalCount > Number(this.pagination.maxItem)){
  //     this.pagination.maxItem = String(Number(this.pagination.maxItem)+10);
  //     this.GetHistory();
  //   }

  // }

  isLoading = false; // Flag to manage loader visibility









  expandTable(): void {
    const tableView = document.querySelector('.tableview') as HTMLElement;
    tableView.classList.toggle('expanded');



  }
  open(content: any) {
    this.commonObj.bigScreenMode = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg `, backdrop: 'static' }).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
    },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.commonObj.bigScreenMode = false;
      }
    );
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
  zoomIn(): void {
    if (this.zoomLevel < 2) { // Maximum zoom level
      this.zoomLevel += 0.1;
    }
  }
  zoomOut(): void {
    if (this.zoomLevel > 0.5) { // Minimum zoom level
      this.zoomLevel -= 0.1;
    }
  }
  bigScreenOrMid() {
    this.zoomLevel = 1;
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
  //isLoading2 = false; // Flag to manage loader visibility
  onHover(): void {
    this.isHovered = true;
  }

  // Hide overlay when mouse leaves the table
  offHover(): void {
    this.isHovered = false;
  }

  //isPopupVisible = false;
  popupStyles: any = {};

  // Sample data for insights
  todayInsights = [
    { title: 'Insight 1', description: 'Morem ipsum dolor sit amet.', time: '10:00 AM' },
    { title: 'Insight 2', description: 'Morem ipsum dolor sit amet.', time: '11:00 AM' },
    // { title: 'Insight 3', description: 'Morem ipsum dolor sit amet.', time: '12:00 PM' }
  ];

  olderInsights = [
    { title: 'Insight 4', description: 'Morem ipsum dolor sit amet.', time: '10:00 AM' },
    { title: 'Insight 5', description: 'Morem ipsum dolor sit amet.', time: '11:00 AM' },
    // { title: 'Insight 6', description: 'Morem ipsum dolor sit amet.', time: '12:00 PM' }
  ];

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }


  isNotificationVisible = false;

  // Sample data for notifications
  todayNotifications = [
    { title: 'Notification 1', description: 'Morem ipsum dolor sit amet, consectetur consectetur elit.', time: '10:00 AM' },
    { title: 'Notification 2', description: 'Morem ipsum dolor sit amet, consectetur consectetur elit.', time: '11:00 AM' },
    // { title: 'Notification 3', description: 'Morem ipsum dolor sit amet, consectetur elit.', time: '12:00 PM' }
  ];

  olderNotifications = [
    { title: 'Notification 4', description: 'Morem ipsum dolor sit amet, consectetur consectetur elit.', time: '10:00 AM' },
    { title: 'Notification 5', description: 'Morem ipsum dolor sit amet, consectetur consectetur elit.', time: '11:00 AM' },
    // { title: 'Notification 6', description: 'Morem ipsum dolor sit amet, consectetur elit.', time: '12:00 PM' }
  ];
  toggleNotification(): void {
    this.isNotificationVisible = !this.isNotificationVisible;
  }


  onScroll(): void {

    this.pagination.max = String(Number(this.pagination.max) + 10);
    // console.log(this.pagination)
    this.GetHistory();
  }

  GetHistory() {
    this.isLoading2 = true;
    this.bridgeService2.getChatBoatHistory(this.pagination,this.isDeveloperMode).subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.AllOrders = data.data;
          this.totalCount = data.meta.count;
          this.itrcount = (this.totalCount) / 10;
          this.isLoading2 = false;
        }

        else {
          this._NotifierService.showError(data.message);
          // this.totalCount = 0;
          this.isLoading2 = false;
        }
      },
      (err) => {
        this.isLoading2 = false;
        // this.totalCount = 0;
        const delim = ':';
        const name = err.message;
        const result = name.split(delim).slice(3).join(delim);
        this._NotifierService.showError(result);
      }
    );
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('theme-dark');
    sessionStorage.setItem('theme', 'theme-light'); //theme-dark
    this.bridgeService2.themeRefresh.next('theme-light')
  }
  togglePopup11(event: MouseEvent): void {
    console.log("hiokm")
    // Close all other popups
    document.querySelectorAll('.popup-menu').forEach((popup) => {
      popup.classList.add('popup-inactive');
    });

    const icon = event.target as HTMLElement;
    const popup = icon.nextElementSibling as HTMLElement;

    if (popup) {
      // Toggle the popup's visibility
      popup.classList.toggle('popup-inactive');

      // Position the popup dynamically relative to the icon
      const rect = icon.getBoundingClientRect();
      popup.style.top = `${rect.bottom + window.scrollY}px`; // Position below the icon
      popup.style.left = `${rect.left + window.scrollX}px`;  // Align with the icon
    }
  }
  togglethreedotPopup() {
    this.isthreedotPopupVisible = !this.isthreedotPopupVisible;
  }

  @HostListener('document:click', ['$event'])
  closePopup(event: Event) {
    const target = event.target as HTMLElement;
    const popup = document.querySelector('.hover-show1');

    // Close popup only if the click is outside
    if (popup && !popup.contains(target) && !target.classList.contains('table-v-dots')) {
      this.isthreedotPopupVisible = false;
    }
  }
  // editdeletepop() {
  //   console.log("edjiosdoat");
  //   $('.hover-show1').hide();
  //   $('.hover-show1').show();
  // }
  fileName = "askmilo-table-data_export.xlsx";

  Exportexcel() {
    console.log("exportjkjkj")
    this.modalService.dismissAll();

    const data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    console.log("tyuiexportjkjkj", data);

    // Convert the worksheet to JSON (2D array format)
    let jsonData: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

    // Remove the first column from each row
    // jsonData = jsonData.map(row => row.slice(1));

    // Remove the last column from each row
    //jsonData = jsonData.map(row => row.slice(0, row.length - 1));

    // Convert the modified JSON data back to a worksheet
    const modifiedWs: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(jsonData);

    // Create a new workbook and append the modified worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, modifiedWs, 'Sheet1');

    // Save the file
    XLSX.writeFile(wb, this.fileName);
  }
}





