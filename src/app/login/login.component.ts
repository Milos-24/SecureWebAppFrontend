import { Component, Inject, Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username: string = '';
  password: string = '';
  
  

  onSubmit() {
    
    this.authService.login(this.username, this.password).subscribe(
      
      (response) => {
        console.log('Response from the server:', response);

      //  const navigationExtras: NavigationExtras = {
        //  state: { 'loggedUser':this.username }, 
       // };
        //this.router.navigate(['/users'],navigationExtras);
        this.router.navigate(['/users',{loggedUser:this.username}]);
      },
      (error) => {
        console.error('Error:', error);
        // Handle errors here.
      }
    );
  }
}