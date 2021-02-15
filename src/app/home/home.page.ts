import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculateValue } from '../shared/models/calculate-value.model';
import { SaveNoteService } from '../shared/services/pages/save-note.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormGroup;
  calculateValue: CalculateValue = new CalculateValue();
  byUnit: boolean;
  constructor(
    private fb: FormBuilder,
    private saveNoteService: SaveNoteService,
    private datePicker: DatePicker
  ) {
    this.form = this.fb.group({
      buyAt: [null, [Validators.required, Validators.min(0)]],
      sellAt: [null, [Validators.required, Validators.min(0)]],
      buyAmount: [null, [Validators.min(1)]],
      totalUnit: [null],
      pairs: [null],
      percentage: [0],
      netProfit: [0],
      totalProfitCost: [0],
      createdAt: [new Date().toISOString()],
    });
  }
  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
    }
  }

  onChange() {
    const buyAt: number = parseFloat(this.form.controls.buyAt.value);
    const sellAt: number = parseFloat(this.form.controls.sellAt.value);
    const buyAmount: number = parseFloat(this.form.controls.buyAmount.value);
    let totalUnit: number = parseFloat(this.form.controls.totalUnit.value);
    if (!this.byUnit) {
      totalUnit = buyAmount / buyAt;
    }
    const totalProfitCost = totalUnit * sellAt;
    const netProfit = totalProfitCost - buyAmount;
    const percentage: number = ((sellAt - buyAt) / buyAt) * 100;
    this.form.controls.totalUnit.setValue(totalUnit);
    this.form.controls.totalProfitCost.setValue(totalProfitCost);
    this.form.controls.netProfit.setValue(netProfit);
    this.form.controls.percentage.setValue(percentage);
  }

  saveAsNote(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      this.calculateValue.buyAt = this.form.controls.buyAt.value;
      this.calculateValue.sellAt = this.form.controls.sellAt.value;
      this.calculateValue.buyAmount = this.form.controls.buyAmount.value;
      this.calculateValue.totalUnit = this.form.controls.totalUnit.value;
      this.calculateValue.pairs = this.form.controls.pairs.value;
      this.calculateValue.percentage = this.form.controls.percentage.value;
      this.calculateValue.netProfit = this.form.controls.netProfit.value;
      this.calculateValue.totalProfitCost = this.form.controls.totalProfitCost.value;
      this.calculateValue.createdAt = this.form.controls.createdAt.value;
      this.saveNoteService.add(this.calculateValue);
    }
  }

  clear() {
    this.form.reset();
  }

  showDatePicker() {
    this.datePicker
      .show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      })
      .then(
        (date) => {
          console.log('Got date: ', date);
          this.form.controls.createdAt.setValue(date);
        },
        (err) => console.log('Error occurred while getting date: ', err)
      );
  }

  onDateChange(event: any) {
    console.log(event.detail.value, new Date(event.detail.value));
    this.form.controls.createdAt.setValue(event.detail.value);
  }

  onByUnitChange() {
    this.form.controls.buyAmount.setValue(null);
    this.form.controls.totalUnit.setValue(null);
  }
}
