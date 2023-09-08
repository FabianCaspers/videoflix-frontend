import { Component, HostListener} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoginOrRegister: boolean;

  constructor(
    public userService: UserService,
    public router: Router,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginOrRegister = event.url === '/login' || event.url === '/register' || event.url === '/';
      }
    });
  }


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
    this.userService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  
  }

