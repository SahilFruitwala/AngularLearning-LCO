import { Component, Input, OnInit } from '@angular/core';

interface userType {
  name: string;
  bio: string;
  company: string;
  blog: string;
  created_at: string;
  avatar_url: string;
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user?: userType;

  constructor() { }

  ngOnInit(): void {
  }

}
