import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

function SortLabel({ sortable, ...props }) {
  return sortable ? (
    <TableSortLabel
      {...props}
    />
  ) : props.children;
}

export default function TableHeader(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <SortLabel
              sortable={!!headCell.sortType}
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </SortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

