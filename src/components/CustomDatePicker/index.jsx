import React from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  dpRoot: {
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    right: 40,
    top: 20,
  },
  closeSvg: {
    fontSize: 18,
  },
}));

export default function CustomDatePicker({ onClear, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.dpRoot}>
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        format="YYYY-MM-DD HH:mm"
        fullWidth
        {...props}
      />
      {onClear && (
        <IconButton size="small" className={classes.closeBtn} onClick={onClear}>
          <CloseIcon className={classes.closeSvg} />
        </IconButton>
      )}
    </div>
  );
}