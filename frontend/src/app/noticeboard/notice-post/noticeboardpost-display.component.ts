import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

type Posts = {
  message: string;
  posts: Record<string, string>[];
};

@Component({
  selector: 'app-noticeboardpost-display',
  templateUrl: './noticeboardpost-display.component.html',
  styleUrls: ['./noticeboardpost-display.component.sass'],
})
export class NoticeboardpostDisplayComponent implements OnInit {
  constructor(public posts: PostsService, private router: Router) {}

  public postList!: Posts;
  public postSub!: Subscription;

  public complaintForm = new FormGroup({
    department: new FormControl(''),
    location: new FormControl(''),
    complaint: new FormControl(''),
  });

  private getPosts() {
    const sub = this.posts.getPosts().subscribe(
      (res) => {
        this.postList = res;
        sub.unsubscribe();
      },
      (error) => {
        if (error.status === 401) this.router.navigateByUrl('auth');
      }
    );
  }

  ngOnInit() {
    this.getPosts();
  }

  onSubmit() {
    const { complaint, department, location } = this.complaintForm.value;

    if (!complaint || !department || !location) return;

    const sub = this.posts
      .createPost(department, location, complaint)
      .subscribe(() => {
        this.getPosts();
        this.complaintForm.reset();
        sub.unsubscribe();
      });
  }

  public deletePost(postId: string) {
    const sub = this.posts.deletePost(postId).subscribe(() => {
      this.getPosts();
      sub.unsubscribe();
    });
  }
}
