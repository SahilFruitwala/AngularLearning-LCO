import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

interface repoType {
  html_url: string;
  name: string;
}

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit, OnChanges {
  @Input() repoUrl?: string;
  repos?: any;

  constructor(
    private gitHubService: GithubService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.repoUrl) {
      this.gitHubService.getRepos(this.repoUrl).subscribe(
        (repos) => {
          this.repos = repos;
          this.ref.detectChanges();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
