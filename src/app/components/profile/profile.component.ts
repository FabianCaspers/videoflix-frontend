import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
