import { Component, OnInit } from '@angular/core';
import { CalculateValue } from '../shared/models/calculate-value.model';
import { SaveNoteService } from '../shared/services/pages/save-note.service';

@Component({
  selector: 'app-save-notes',
  templateUrl: 'save-notes.page.html',
  styleUrls: ['save-notes.page.scss'],
})
export class SaveNotesPage implements OnInit {
  calculateValues: Array<CalculateValue> = [];
  searchNote: string;
  temp: Array<CalculateValue> = [];
  totalProfit: number;
  totalNetProfit: number;
  totalPercentage: number;
  constructor(private saveNoteService: SaveNoteService) {}
  ngOnInit(): void {
    this.saveNoteService.getAll();
    this.saveNoteService.notesSub.subscribe((res) => {
      this.calculateValues = res;
      this.temp = JSON.parse(JSON.stringify(res));
      // if (this.calculateValues.length > 0) {
      this.totalProfit =
        this.calculateValues.length > 0
          ? this.calculateValues
              .map((x) => x.totalProfitCost)
              .reduce((x, y) => x + y)
          : 0;
      this.totalNetProfit =
        this.calculateValues.length > 0
          ? this.calculateValues.map((x) => x.netProfit).reduce((x, y) => x + y)
          : 0;
      this.totalPercentage =
        this.calculateValues.length > 0
          ? this.calculateValues
              .map((x) => x.percentage)
              .reduce((x, y) => x + y)
          : 0;
      // }
    });
  }

  async removeNotes(id: string) {
    await this.saveNoteService.delete(id);
  }

  onFilter() {
    const temp = this.temp.filter((d) => {
      return (
        d.buyAt.toString().indexOf(this.searchNote) !== -1 ||
        d.sellAt.toString().indexOf(this.searchNote) !== -1 ||
        d.buyAmount.toString().indexOf(this.searchNote) !== -1 ||
        d.pairs.toLowerCase().indexOf(this.searchNote) !== -1 ||
        !this.searchNote
      );
    });
    this.calculateValues = temp.length > 0 ? temp : this.temp;
  }
}
