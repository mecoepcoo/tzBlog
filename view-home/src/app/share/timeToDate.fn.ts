export let parseTime = (time: number, format: number = 0): any => {
  let dateStr = '';
  let dateObj = {};

  let trans = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  let date = new Date(time);
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1 + '';
  let day = date.getDate() + '';
  let h = date.getHours() + '';
  let m = date.getMinutes() + '';
  let s = date.getSeconds() + '';

  // 2017-08-01
  if (format == 0) {
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    dateStr = `${year}-${month}-${day}`;
  }
  // 2017-08-01 8:08:08
  if (format == 1) {
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
  // Sep 3, 2017
  if (format == 2) {
    trans.forEach((m, index) => {
      if ((index + 1).toString() == month) {
        month = m;
      }
    });
    dateStr = `${month} ${day}, ${year}`;
  }
  /**
   * {
   *   year: '2017',
   *   month: '8',
   *   day: '1'
   * }
   */
  if (format == 3) {
    trans.forEach((m, index) => {
      if ((index + 1).toString() == month) {
        month = m;
      }
    });
    dateObj = {
      year: `${year}`,
      month: month,
      day: `${day}`
    };
    return dateObj;
  }

  return dateStr;
};
