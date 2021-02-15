import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveNotesPage } from './save-notes.page';

const routes: Routes = [
  {
    path: '',
    component: SaveNotesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveNotesPageRoutingModule {}
