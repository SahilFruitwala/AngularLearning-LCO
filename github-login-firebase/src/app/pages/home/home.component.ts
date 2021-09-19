import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

interface userType {
  name: string;
  bio: string;
  blog: string;
  updated_at: string;
  avatar_url: string;
  repos_url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  username: null | string = null;
  error: null | string = null;

  constructor(
    private gitHubService: GithubService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  handleFindUser() {
    if (this.username) {
      this.gitHubService.getUserDetails(this.username).subscribe(
        (user) => {
          console.clear();
          console.log(user);
          this.user = user;
          this.error = null;
          this.ref.detectChanges();
        },
        (err) => {
          this.user = null;
          this.error = 'User not found!';
          this.ref.detectChanges();
        }
      );
    }
  }
}
