import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';

import ShowIf from '../common/show-if.component';
import NotificationListComponent from '../conversation/notification.component';
import LoginComponent from '../login/login.component';
import Profile from './profile.component';
import Setting from './setting.component';
import Social from './social.component';

type Props = {
  loggedIn?: boolean;
  settings: any;
  changeSetting: (key, value) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3)
    }
  })
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -16,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  })
)(Badge);

const User = ({ loggedIn = true, settings, changeSetting }: Props) => {
  const classes = useStyles();
  const [loginOpened, openLogin] = React.useState(false);

  const handleClose = () => {
    openLogin(false);
  };

  const toggleLogin = open => {
    openLogin(open);
  };

  return (
    <Box p={1} bgcolor="primary.light" className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="flex-start">
        <Grid item>
          <Profile loggedIn={loggedIn} toggleLogin={toggleLogin} />
          <Social loggedIn={loggedIn} toggleLogin={toggleLogin} />
        </Grid>

        <Grid item>
          <ShowIf condition={loggedIn}>
            <Setting onChange={changeSetting} settings={settings} />
          </ShowIf>
        </Grid>
      </Grid>

      <ShowIf condition={loggedIn}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded color="secondary" />}>
            <StyledBadge badgeContent={4} color="secondary">
              <Typography variant="h5">Conversations</Typography>
            </StyledBadge>
          </AccordionSummary>
          <AccordionDetails>
            <NotificationListComponent />
          </AccordionDetails>
        </Accordion>
      </ShowIf>

      <Dialog open={loginOpened} onClose={handleClose} maxWidth="xs">
        <LoginComponent />
      </Dialog>
    </Box>
  );
};

export default User;
