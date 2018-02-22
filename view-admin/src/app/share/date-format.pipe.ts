/* 日期转换管道，时间戳转日期 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class ToDatePipe implements PipeTransform {
  transform(time: number, format: number = 0): string {
    let dateStr = '';

    const date = new Date(time);
    const year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';
    let day = date.getDate() + '';
    const h = date.getHours() + '';
    let m = date.getMinutes() + '';
    let s = date.getSeconds() + '';

    if (format === 0) {
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      dateStr = `${year}-${month}-${day}`;
    }

    if (format === 1) {
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      if (m.length < 2) {
        m = '0' + m;
      }
      if (s.length < 2) {
        s = '0' + s;
      }
      dateStr = `${year}-${month}-${day} ${h}:${m}:${s}`;
    }

    if (format === 2) {
      const trans = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      trans.forEach(function (mon, index) {
        if ((index + 1).toString() === month) {
          month = mon;
        }
      });
      dateStr = `${month} ${day}, ${year}`;
    }

    return dateStr;
  }
}
