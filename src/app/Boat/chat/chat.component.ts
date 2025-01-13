import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { NotiferService } from 'src/app/modules/service/helpers/notifer.service';
declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  temp1: boolean = false;

  pagination: any = {
    PageNo: 1,
    maxItem: '10',
    PageShow: 10
  }
  isLoading2: boolean = false;
  searchValue: any = '';
  totalCount:any;
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

  MessageArrya: any = [];
  isTyping: boolean = false;
  userName: any;

  firstName: any;


  typingInterval = 10; // Adjust for typing speed
  typingLoop: any;
  // Typing simulation function

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


  constructor(private bridgeService2: BridgeService, private _NotifierService: NotiferService) { }

  ngOnInit(): void {

    this.GetHistory();
    this.userName = sessionStorage.getItem('UserName');
    // console.log('userName',this.userName);
    this.firstName = '';
    // this.firstName = this.userName.split(' ')[0];
    this.firstName = this.userName.split(' ')[0].charAt(0).toUpperCase() + this.userName.split(' ')[0].slice(1).toLowerCase();


    // console.log('firstName:', this.firstName);

    this.userName = sessionStorage.getItem('UserName');
    // console.log('userName',this.userName);

  }

  GetHistory() {
    this.bridgeService2.getChatBoatHistory(this.pagination, this.searchValue).subscribe(
      (data: any) => {
        if (data.status == "200") {
          this.AllOrders = data.data;
          // console.log('history',this.AllOrders);
          this.totalCount = data.meta.count;
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
      }

      else {
        this._NotifierService.showError(data.message);
        this.totalCount = 0;
        this.isLoading2 = false;
      }
    },
        (err) => {
          this.isLoading2 = false;
          this.totalCount = 0;
          const delim = ':';
          const name = err.message;
          const result = name.split(delim).slice(3).join(delim);
          this._NotifierService.showError(result);
        }
    );
  }
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }



  opportuni: any[] = ['ert'];
  opportunitys: any[] = ['hi', 'new chat', 'werty'];


  LastChatID: any = '';
  ChatFromDatabase: boolean = true;

  checkhistory(data:any){
    this.refreshPage();
    this.bridgeService2.getOneChatBoatHistory(data.id).subscribe(
      (res: any) => {
        if (Object(res)['status'] == "200") {

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
        this.MessageArrya.push({ side: 'left', text: typedText,text2:res.main_query_data.query_result, type: 'json' });

        if(res.data.length != 0){
          for(let i=0;i<res.data.length;i++){
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
  SendMessage() {

    this.InputMess = this.InputMess.trim();
    if (this.isTyping === false) {
      if (this.InputMess !== '') {
        this.MessageArrya.push({ side: 'right', text: this.InputMess, type: 'text' });
        this.isTyping = true;
        let Payload = {
          "query": this.InputMess,
          "is_generate_query": String(this.ChatFromDatabase),
          "id": this.LastChatID
        };
        this.adjustHeightByClass();

        this.MessageArrya.push({ side: 'left', text: 'Loading ...', type: 'loader' });
        this.scrollToBottom();
        this.bridgeService2.sendChatInputandGetResponse(Payload).subscribe(
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

      this.MessageArrya.push({ side: 'left', text: typedText,text2: ApiRes.data.query_result, type: textType });
    } else {
      this.MessageArrya[this.MessageArrya.length - 1].text2 = typedText2;
    }

   if(typedText2.length == ApiRes.data.query_result.length) {
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
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

adjustHeight(event: Event): void {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto'; // Reset height to recalculate
  textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
}


refreshPage() {
  this.MessageArrya=[];
  this.ChatFromDatabase= true;
  this.LastChatID = '';
  this.InputMess='';
  this.adjustHeightByClass();
 }

adjustHeightByClass(): void {
  this.InputMess='';
  // Select all elements with the class "auto-expand"
  const textAreas = document.getElementsByClassName('auto-expand') as HTMLCollectionOf<HTMLTextAreaElement>;

  // Loop through the NodeList to adjust each textarea's height
  for (let i = 0; i < textAreas.length; i++) {
    const textArea = textAreas[i];
    textArea.style.height = 'auto'; // Reset the height
  }
}

}


