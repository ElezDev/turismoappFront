import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';

// User interface
export class User {
  name: any;
  email: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {
  UserProfile: User = new User(); // Inicializar UserProfile

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.profileUser().subscribe((data: any) => {
      if (data && data.user) {
        this.UserProfile.name = data.user.name;
        this.UserProfile.email = data.user.email;
      }
    });
  }
}
