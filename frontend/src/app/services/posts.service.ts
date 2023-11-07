import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { UserService } from './user.service';

type Posts = {
  message: string;
  posts: Record<string, string>[];
};

const url = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private user: UserService) {}

  public getPosts() {
    return this.http.get<Posts>(`${url}/posts`, {
      headers: {
        Authorization: this.user.getToken ?? '',
      },
    });
  }

  public deletePost(id: string) {
    return this.http.delete(`${url}/posts/${id}`, {
      headers: {
        Authorization: this.user.getToken ?? '',
      },
    });
  }

  public createPost(department: string, location: string, complaint: string) {
    return this.http.post(
      `${url}/posts`,
      {
        department,
        location,
        complaint,
      },
      {
        headers: {
          Authorization: this.user.getToken ?? '',
        },
      }
    );
  }
}
