import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { User } from 'src/interfaces/user';

type PostSubHeaderProps = {
  platform: string;
  date: string;
  importer?: User;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 14,
      lineHeight: '18px',
      color: theme.palette.text.secondary
    },
    circle: {
      margin: theme.spacing(0, 0.5),
      fontSize: 10
    }
  })
);

export const PostSubHeader = ({ date, platform, importer }: PostSubHeaderProps) => {
  const style = useStyles();

  return (
    <Typography component="div" className={style.root}>
      {date}

      {importer && (
        <>
          <FiberManualRecordIcon className={style.circle} />
          {`Imported from ${platform} by `}
          <b>{importer.name}</b>
        </>
      )}
    </Typography>
  );
};