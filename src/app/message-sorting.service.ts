import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MessageSortingService {
  public singleSegment: string[] = [];
  public sortedMessages: string[] = [];

  constructor() { }

  sortMessages(messages:string[]):string[]
  {
    var counter = -1;

    for(let i =0 ;i<messages.length;i++)
    {
      
       this.singleSegment=messages[i].split('|');

       var order = +this.singleSegment[2];

      if(order==0)
      {
        if(i!=0)
        {
          this.sortedMessages[counter]+=" Time of message: " + this.singleSegment[6];
        }
        counter++;
    
       this.sortedMessages[counter]="Message sent from: " + this.singleSegment[0] + "  ";
        

      }

       var bytes  = CryptoJS.AES.decrypt(this.singleSegment[3], this.singleSegment[5]);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);


        this.sortedMessages[counter]+=originalText

        if(i==messages.length-1)
        {
          this.sortedMessages[counter]+=" Time of message: " + this.singleSegment[6];
        }

    }

      return this.sortedMessages;
  }
}
