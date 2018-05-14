import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  getSeconds,
  getMinutes,
  getHours,
  getDate,
  getMonth,
  getYear,
  setSeconds,
  setMinutes,
  setHours,
  setDate,
  setMonth,
  setYear
} from 'date-fns';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};

@Component({
  selector: 'mwl-demo-utils-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})

export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() placeholder: string;

  date: Date;

  dateStruct: NgbDateStruct;

  timeStruct: NgbTimeStruct;

  datePicker: any;

  private onChangeCallback: (date: Date) => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {
  }

  writeValue(date: Date): void {
    console.log("1.writeValue date: " + date);
    this.date = new Date();
    console.log("2.writeValue this.date: " + this.date);
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    console.log("LOL.writeValue this.dateStruct: " + this.dateStruct.day);
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };

    console.log("----------------------------------- ");
    console.log("---------------TIME---------------- ");
    console.log("----------------------------------- ");
    console.log("Sec:" + this.timeStruct.second);
    console.log("Min: " + this.timeStruct.minute);
    console.log("Hour: " + this.timeStruct.hour);

    this.cdr.detectChanges();
  }


  writeValueAfterChange(date: Date): void {
    console.log("3.writeValue date: " + date);
    this.date = date;
    console.log("4.writeValue this.date: " + this.date);
    this.dateStruct = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date)
    };
    this.timeStruct = {
      second: getSeconds(date),
      minute: getMinutes(date),
      hour: getHours(date)
    };
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  updateDate(): void {
    console.log("5.before updateDate this.date: " + this.date);
    const newDate: Date = setYear(

      setMonth(
        setDate(this.date, this.dateStruct.day),
        this.dateStruct.month - 1
      ),
      this.dateStruct.year
    );
    console.log("6.updateDate this.date: " + this.date);
    console.log("7.updateDate newDateate: " + newDate);
    this.writeValueAfterChange(newDate);
    this.onChangeCallback(newDate);
  }

  updateTime(): void {
    console.log("8.before updateTime this.date: " + this.date);
    const newDate: Date = setHours(
      setMinutes(
        setSeconds(this.date, this.timeStruct.second),
        this.timeStruct.minute
      ),
      this.timeStruct.hour
    );
    console.log("9.updateTime this.date: " + this.date);
    console.log("10.updateTime newDateate: " + newDate);
    console.log("----------------------------------- ");
    console.log("---------------UPDATETIME---------------- ");
    console.log("----------------------------------- ");
    console.log("Sec:" + this.timeStruct.second);
    console.log("Min: " + this.timeStruct.minute);
    console.log("Hour: " + this.timeStruct.hour);
    this.writeValueAfterChange(newDate);
    this.onChangeCallback(newDate);
  }
}
