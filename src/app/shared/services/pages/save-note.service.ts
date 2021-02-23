import { Injectable } from '@angular/core';
import { CalculateValue } from '../../models/calculate-value.model';
import { AppLocalStorageService } from '../core/app-local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { AppToastService } from '../core/app-toast.service';
const notesKey = 'notes';
@Injectable({
  providedIn: 'root',
})
export class SaveNoteService {
  notesSub: Subject<Array<CalculateValue>> = new Subject<
    Array<CalculateValue>
  >();
  constructor(
    private appLocalStorageService: AppLocalStorageService,
    private appToastService: AppToastService
  ) {}

  async add(calculateValue: CalculateValue) {
    let calculateValues: Array<CalculateValue> = [];
    const notes = await this.appLocalStorageService.get(notesKey);
    if (notes && notes.length > 0) {
      calculateValues = notes;
    }
    calculateValue.id = uuidv4();
    calculateValues = [calculateValue, ...calculateValues];
    this.appLocalStorageService.set(notesKey, calculateValues);
    this.notesSub.next(calculateValues);
    this.appToastService.show('Notes Added');
  }

  async update(calculateValue: CalculateValue) {
    let calculateValues: Array<CalculateValue> = [];
    const notes = await this.appLocalStorageService.get(notesKey);
    if (notes && notes.length > 0) {
      calculateValues = notes;
      const index = calculateValues.findIndex(
        (x) => x.id === calculateValue.id
      );
      if (index > -1) {
        calculateValues[index] = calculateValue;
        this.appLocalStorageService.set(notesKey, calculateValues);
        this.notesSub.next(calculateValues);
        this.appToastService.show('Notes Updated');
      }
    }
    // calculateValue.id = uuidv4();
    // calculateValues = [calculateValue, ...calculateValues];
    // this.appLocalStorageService.set(notesKey, calculateValues);
    // this.notesSub.next(calculateValues);
    // this.appToastService.show('Notes Added');
  }

  async getAll() {
    let calculateValues: Array<CalculateValue> = [];
    const notes = await this.appLocalStorageService.get(notesKey);
    if (notes && notes.length > 0) {
      calculateValues = notes;
    }
    this.notesSub.next(calculateValues);
  }

  async delete(id: string) {
    // debugger;
    let calculateValues: Array<CalculateValue> = [];
    const notes = await this.appLocalStorageService.get(notesKey);
    if (notes && notes.length > 0) {
      calculateValues = notes;
      const index = calculateValues.findIndex((x) => x.id === id);
      console.log(index);
      if (index > -1) {
        calculateValues.splice(index, 1);
        await this.appLocalStorageService.set(notesKey, calculateValues);
        // this.notesSub.next(calculateValues);
        await this.getAll();
        this.appToastService.show('Notes Removed');
      }
      // await this.getAll();
    }
  }
}
