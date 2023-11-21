import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MessageService } from '../message.service';
import { v4 as uuidv4} from 'uuid';
import * as CryptoJS from 'crypto-js';
import { AesKeyGeneratorService } from '../aeskeygenerator.service';
import { MessageSortingService } from '../message-sorting.service';

@Component({
  selector: 'app-users',
  providers: [AesKeyGeneratorService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  public publicKey: string = '';
  public privateKey: string ='';
  segments: string[] = [];
  unsortedMessages: string[] =[];
  users: string[] = [];
  messages: string[] = [];
  log:string='';
  messageText:string='';
  state$!: Observable<object>;
  constructor(private messageSortingService: MessageSortingService,private aesKeyGeneratorService: AesKeyGeneratorService, private userService: UserService, private route : ActivatedRoute, private messageService:MessageService){}

  ngOnInit(): void {
   this.generateKeyPair();
   
   const log = this.route.snapshot.paramMap.get('loggedUser');
    this.userService.getUsers(log).subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );

    this.userService.getMessages(log).subscribe(
      (data: string[]) => {
        if(data[0]!=null){
           this.unsortedMessages= data[0].split('@');
          this.messages=this.messageSortingService.sortMessages(this.unsortedMessages);
        }
      },
      (error: any) => {
        console.error('Error fetching messages', error);
      }
    );
    }

  sendMessage(user: string) { 
    const log = this.route.snapshot.paramMap.get('loggedUser');
    this.segments=this.splitString(this.messageText);
    const uuid = uuidv4();


    for (let i = 0; i < this.segments.length; i++) {  
      var ciphertext = CryptoJS.AES.encrypt(this.segments[i], this.publicKey).toString();

      this.messageService.sendMessage(log+'|'+user+'|'+i+'|'+ciphertext+'|'+uuid+'|'+this.privateKey+'|'+new Date()).subscribe(
        (response) => {
          console.log('Response from the server:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      )
    }
  }

  splitString(inputString: string): string[] {
    const minSegments = 3;
    const maxSegments = 10;
    const numSegments = Math.floor(Math.random() * (maxSegments - minSegments + 1)) + minSegments;
  
    // Split the string into segments
    const segmentLength = Math.ceil(inputString.length / numSegments);
    const segments = [];
    for (let i = 0; i < numSegments; i++) {
      const start = i * segmentLength;
      const end = (i + 1) * segmentLength;
      segments.push(inputString.substring(start, end));
    }
  
    return segments;
  }

  generateKeyPair() {
    this.aesKeyGeneratorService.generateAesKey()
      .then(keyPair => {
        this.publicKey = keyPair.publicKey;
        this.privateKey = keyPair.privateKey;
        console.log('Generated AES Key Pair:', keyPair);
      })
      .catch(error => {
        console.error('Error generating AES Key Pair:', error);
      });
  }

}
