import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: MessageComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
