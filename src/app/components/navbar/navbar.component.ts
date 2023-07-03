import { Component, HostListener} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public userService: UserService,
    public router: Router,
  ) {}


  title = 'showtime';
  navbg:any;
  @HostListener('document:scroll') scrollover(){
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
    {
      this.navbg = {
        'background-color':'#000000',
        'transition': 'background-color 0.2s ease-in-out'
      }
    }else {
        this.navbg = {}
    }
  }

  logout() {
      this.userService.logout().subscribe(() => {
        this.router.navigate(['login']);
      });
    }
  }

