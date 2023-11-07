import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(public posts: PostsService) {}

  public postList!: Posts;
  public postSub!: Subscription;

  public complaintForm = new FormGroup({
    department: new FormControl(''),
    location: new FormControl(''),
    complaint: new FormControl(''),
  });

  private getPosts() {
    const sub = this.posts.getPosts().subscribe((res) => {
      this.postList = res;
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  onSubmit() {
    console.warn(this.complaintForm.value);
    const { complaint, department, location } = this.complaintForm.value;

    if (!complaint || !department || !location) return;

    this.posts.createPost(department, location, complaint).subscribe(() => {
      this.getPosts();
    });
  }

  public deletePost(postId: string) {
    const sub = this.posts.deletePost(postId).subscribe(() => {
      this.getPosts();
      sub.unsubscribe();
    });
  }
}
