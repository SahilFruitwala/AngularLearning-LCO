import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];

  isLoading = true;

  constructor(private toastr: ToastrService, private db: AngularFireDatabase) {
    this.isLoading = true;
    this.db
      .object('/users')
      .valueChanges()
      .subscribe((obj: any) => {
        if (obj) {
          this.users = Object.values(obj);
          this.isLoading = false;
        } else {
          toastr.error('No user found!', '', { closeButton: true });
          this.users = [];
          this.isLoading = false;
        }
      });
    this.db
      .object('/posts')
      .valueChanges()
      .subscribe((obj: any) => {
        if (obj) {
          this.posts =
            Object.values(obj).sort((a: any, b: any) => b.date - a.date) || [];
          this.isLoading = false;
        } else {
          toastr.error('No Post Found!', '', { closeButton: true });
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {}
}
