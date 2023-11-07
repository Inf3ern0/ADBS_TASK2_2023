import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { NoticeboardpostDisplayComponent } from './noticeboard/notice-post/noticeboardpost-display.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'complaints', component: NoticeboardpostDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
