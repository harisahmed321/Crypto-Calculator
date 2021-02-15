import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaveNotesPage } from './save-notes.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SaveNotesPageRoutingModule } from './save-notes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SaveNotesPageRoutingModule,
  ],
  declarations: [SaveNotesPage],
})
export class SaveNotesPageModule {}
