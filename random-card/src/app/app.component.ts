import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'random-card';

  sub?: Subscription;

  user: any;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.sub =  this.userService.getUser().subscribe(
      (user: any) => {
        console.log(user);
        this.user = user.results[0];
      },
      (err) => {
        this.toastrService.error(err.status, 'OOPs');
      }
    );
  }
  reFetch() {
    this.sub?.unsubscribe();
    this.sub = this.userService.getUser().subscribe(
      (user: any) => {
        console.log(user);
        this.user = user.results[0];
      },
      (err) => {
        this.toastrService.error(err.status, 'OOPs');
      }
    );

  }
}
