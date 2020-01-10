import moment from "moment";
import React from 'react';
import './App.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Example from './views/Example';

import "moment/locale/ko";

moment.locale('ko');

// for MuiPickers only
MomentUtils.prototype.getCalendarHeaderText = date => {
  return MomentUtils.prototype.format(date, 'YYYY년 M월');
};
MomentUtils.prototype.getDateTimePickerHeaderText = date => {
  return MomentUtils.prototype.format(date, "M월 D일");
};

function App() {
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="ko">
      <div className="App">
        <Example />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
