import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculateValue } from '../shared/models/calculate-value.model';
import { SaveNoteService } from '../shared/services/pages/save-note.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormGroup;
  calculateValue: CalculateValue = new CalculateValue();
  // byUnit: boolean;
  constructor(
    private fb: FormBuilder,
    private saveNoteService: SaveNoteService,
    private datePicker: DatePicker,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      buyAt: [null, [Validators.required, Validators.min(0)]],
      sellAt: [null, [Validators.required, Validators.min(0)]],
      buyAmount: [null, [Validators.min(1)]],
      byUnit: [false],
      totalUnit: [null],
      pairs: [null],
      percentage: [0],
      netProfit: [0],
      totalProfitCost: [0],
      createdAt: [new Date().toISOString()],
    });
    this.activatedRoute.params.subscribe((params: CalculateValue) => {
      console.log(params);
      if (params.id) {
        // this.form.setValue(params);
        this.form.controls.id.setValue(params.id);
        this.form.controls.buyAt.setValue(params.buyAt);
        this.form.controls.sellAt.setValue(params.sellAt);
        this.form.controls.buyAmount.setValue(params.buyAmount);
        this.form.controls.byUnit.setValue(params.byUnit);
        this.form.controls.totalUnit.setValue(params.totalUnit);
        this.form.controls.pairs.setValue(params.pairs);
        this.form.controls.percentage.setValue(params.percentage);
        this.form.controls.netProfit.setValue(params.netProfit);
        this.form.controls.totalProfitCost.setValue(params.totalProfitCost);
        this.form.controls.createdAt.setValue(params.createdAt);
        this.onChange();
      }
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
    if (!this.form.controls.byUnit.value) {
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
      if (form.value.id) {
        console.log('updated');
        this.saveNoteService.update(form.value);
      } else {
        console.log('added');
        this.saveNoteService.add(form.value);
      }
      form.reset();
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
