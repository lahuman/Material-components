import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import moment from 'moment';
import stableSort from 'stable';

export default ({ list, currentSortColumn, order, beginIndex, endIndex, rowRender }) => {
  return (
    <React.Fragment>
      <TableBody>
        {
          stableSort(list, (a, b) => {
            // const currentSortColumn = headCells.find(cell => cell.id === orderBy);
            if (!currentSortColumn) return 0;
            if (order === 'desc') {
              ([b, a] = [a, b]);
            }
            if (!a[currentSortColumn.id]) return 0;
            if (!b[currentSortColumn.id]) return 1;
            if (currentSortColumn.sortType === 'string') {
              return a[currentSortColumn.id].localeCompare(b[currentSortColumn.id]);
            }
            if (currentSortColumn.sortType === 'integer') {
              return a[currentSortColumn.id] > b[currentSortColumn.id];
            }
            if (currentSortColumn.sortType === 'date') {
              return moment(a[currentSortColumn.id]) > moment(b[currentSortColumn.id]);
            }
            if (currentSortColumn.sortType === 'boolean') {
              return (a[currentSortColumn.id]) - (b[currentSortColumn.id]);
            }
            if (currentSortColumn.sortType === 'array') {
              return (a[currentSortColumn.id].length) - (b[currentSortColumn.id].length);
            }
            return 0;
          }).slice(beginIndex, endIndex).map(rowRender)}
      </TableBody>
    </React.Fragment>
  );
}