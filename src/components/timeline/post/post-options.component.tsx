import React from 'react';

import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import ShowIf from 'src/components/common/show-if.component';

type PostOptionsProps = {
  ownPost: boolean;
  postId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
      position: 'relative'
    },
    menu: {},
    danger: {
      color: '#F83D3D',
      marginBottom: 0,
      '&:hover': {
        background: 'none'
      }
    }
  })
);

export const PostOptionsComponent: React.FC<PostOptionsProps> = ({ postId, ownPost }) => {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditPost = () => {
    handleClose();
    console.log('post edited!');
  };

  const handleCopyLink = () => {
    handleClose();
    console.log('link copied!');
  };

  const handleVisitMyriadAccount = () => {
    handleClose();
    console.log('go to myriad profile');
  };

  const handleVisitSocialPost = () => {
    handleClose();
    console.log('got to social post');
  };

  const handleDeletePost = () => {
    handleClose();
    console.log('post deleted!');
  };

  const handleReportPost = () => {
    handleClose();
    console.log('post reported!');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      <IconButton aria-label="post-setting" onClick={handleClick} disableRipple={true} disableFocusRipple={true} disableTouchRipple>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="post-options"
        aria-label="post-options"
        className={styles.menu}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        TransitionComponent={Fade}
        onClose={handleClose}>
        <ShowIf condition={ownPost}>
          <MenuItem aria-label="edit-post" onClick={handleEditPost}>
            Edit post
          </MenuItem>
          <MenuItem aria-label="copy-link" onClick={handleCopyLink}>
            Copy link...
          </MenuItem>
        </ShowIf>

        <ShowIf condition={!ownPost}>
          <MenuItem onClick={handleVisitMyriadAccount}>Visit Myriad account</MenuItem>
          <MenuItem onClick={handleVisitSocialPost}>Visit social post</MenuItem>
          <MenuItem onClick={handleCopyLink}>Copy link...</MenuItem>
        </ShowIf>

        {
          //<MenuItem onClick={handleClick}>Save post to archive</MenuItem>
          //<MenuItem onClick={handleClick}>Share...</MenuItem>
        }

        <Divider />

        <ShowIf condition={ownPost}>
          <MenuItem onClick={handleDeletePost}>
            <Button
              className={styles.danger}
              disableRipple={true}
              disableFocusRipple={true}
              variant="text"
              color="default"
              size="medium"
              startIcon={<DeleteIcon />}>
              Delete this Post
            </Button>
          </MenuItem>
        </ShowIf>

        <ShowIf condition={!ownPost}>
          <MenuItem onClick={handleReportPost}>
            <Button
              className={styles.danger}
              disableRipple={true}
              disableFocusRipple={true}
              variant="text"
              color="default"
              size="medium"
              startIcon={<ReportProblemIcon />}>
              Report this post
            </Button>
          </MenuItem>
        </ShowIf>
      </Menu>
    </div>
  );
};