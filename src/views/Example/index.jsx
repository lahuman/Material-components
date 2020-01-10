import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import moment from 'moment';

import DataTable from '../../components/DataTable';
import SampleData from '../../media/sampleData.json';
import CustomDatePicker from '../../components/CustomDatePicker';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://lahuman.github.io/">
        lahuman
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  tableGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  table: {
    tableLayout: 'fixed'
  },
  titleCol: {
    width: 250,
  },
  oneDataCol: {
    width: 90,
  },
  dateCol: {
    width: 150,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  dateRangePicker: {
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: 16,
    }
  },
}));

const dateFormat = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
}

export default function Example() {
  const classes = useStyles();

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const headCells = [
    { id: 'title', label: '제목', sortType: 'string' },
    { id: 'important', label: '중요', sortType: 'boolean' },
    { id: 'attached_files', label: '첨부', sortType: 'array' },
    { id: 'show_start_date', label: '게시일', sortType: 'date' },
    { id: 'targets_occupation', label: '대상' },
    { id: 'createdAt', label: '등록일', sortType: 'date' },
    { id: 'writer', label: '등록자', sortType: 'string' },
    { id: 'updatedAt', label: '수정일', sortType: 'date' },
    { id: 'modifier', label: '수정자', sortType: 'string' },
  ];

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getListCall = async () => {
    setList(SampleData);
  }

  // componentDidMount
  React.useEffect(() => {
    getListCall();
  }, []); //eslint-disable-line
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AcUnitIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Material Components
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Material Components
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Material UI를 사용하면서 몇몇 component를 사용하기 쉽게 customize 하여 사용합니다.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="https://lahuman.github.io">
                    블로그 바로가기
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href="https://github.com/lahuman/Material-components">
                    GitHub 바로 가기
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.tableGrid} maxWidth="xl">
          <Paper>
          <div className={classes.dateRangePicker}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <CustomDatePicker
                label="시작일"
                value={startDate}
                onChange={setStartDate}
                onClear={e => setStartDate(null)}
              />
              <CustomDatePicker
                label="종료일"
                value={endDate}
                onChange={setEndDate}
                onClear={e => setEndDate(null)}
              />
            </div>
          </Paper>
          <Paper>
            <DataTable
              className={classes.table}
              aria-label="Datatable"
              list={list}
              currentSortColumn={headCells.find(cell => cell.id === orderBy)}
              order={order}
              orderBy={orderBy}
              handleChangePage={handleChangePage}
              headCells={headCells}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleRequestSort={handleRequestSort}
              colgroupRender={_ => (
                <colgroup>
                  <col className={classes.titleCol} />
                  <col className={classes.oneDataCol} />
                  <col className={classes.oneDataCol} />
                  <col className={classes.dateCol} />
                  <col />
                  <col className={classes.dateCol} />
                  <col />
                  <col className={classes.dateCol} />
                  <col />
                </colgroup>
              )}
              rowRender={row => (
                <TableRow key={row._id} onClick={_ => {
                  alert(`/notice/${row._id}`);
                }} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.important ? 'Y' : 'N'}</TableCell>
                  <TableCell align="center">{row.attached_files && row.attached_files.length > 0 ? 'Y' : 'N'}</TableCell>
                  <TableCell align="center">
                    {row.show_start_date && row.show_end_date && (
                      <span>
                        {dateFormat(row.show_start_date)}<br />{dateFormat(row.show_end_date)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="center">{row.target_occupation.includes('ALL') ? 'ALL' : row.target_occupation.join('/')}</TableCell>
                  <TableCell align="center">{dateFormat(row.createdAt)}</TableCell>
                  <TableCell align="center">{row.writer}</TableCell>
                  <TableCell align="center">{dateFormat(row.updatedAt)}</TableCell>
                  <TableCell align="center">{row.modifier}</TableCell>
                </TableRow>
              )}
            />
          </Paper>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}