import { Component, Input, OnInit, OnChanges } from '@angular/core';

import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: any;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  uid?: any;
  upVote = 0;
  downVote = 0;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.getUser().subscribe((user) => {
      this.uid = user?.uid;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((val: any) => {
        if (val.upVote == 1) {
          this.upVote += 1;
        }
        if (val.downVote == 1) {
          this.downVote += 1;
        }
      });
    }
  }

  upVotePost() {
    this.db
      .object(`/posts/${this.post.id}/vote/${this.uid}`)
      .set({ upVote: 1 });
  }

  downVotePost() {
    this.db
      .object(`/posts/${this.post.id}/vote/${this.uid}`)
      .set({ downVote: 1 });
  }

  getInstaUrl() {
    return `https://instagram.com/${this.post.instaId}`;
  }
}
