import React from 'react';

import {useTheme} from '@material-ui/core/styles';

import {Menu as MenuComponent} from '../../Menu/';
import {SidebarMenu} from '../../Menu/Menu.stories';
import {RichTextComponent} from '../../Richtext/';
import {DefaultRichText} from '../../Richtext/RichText.stories';
import {RightMenuBar} from '../../RightMenuBar/RightMenuBar';
import {SocialMediaList} from '../../SocialMediaList/SocialMedia.stories';
import {Timeline as TimelineComponent} from '../../Timeline/';
import {Timeline} from '../../Timeline/Timeline.stories';
import {WalletBalances} from '../../WalletBalance/WalletBalance.stories';
import {DefaultSearchBox} from '../../atoms/search/SearchBox.stories';
import {ProfileHeader as ProfileHeaderComponent} from '../../profile-header/';
import {ProfileHeader} from '../../profile-header/ProfileHeader.stories';

{
  /*import useStyles from './home-page.style';*/
}

const HomePage = (): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.firstCol}>
        <div
          style={{
            maxWidth: 360,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 12,
          }}>
          <div>
            <MenuComponent selected={'home'} onChange={SidebarMenu.args?.onChange ?? console.log} />
          </div>
          <div>
            <SocialMediaList
              connected={SocialMediaList.args?.connected ?? []}
              toggleVerify={social => console.log(social)}
            />
          </div>
          <div>
            <WalletBalances balances={WalletBalances.args?.balances ?? []} />
          </div>
        </div>
      </div>

      <div className={classes.secondCol}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'center',
            rowGap: 12,
          }}>
          <div style={{width: '100%'}}>
            <DefaultSearchBox
              onSubmit={value => console.log(value)}
              placeholder={DefaultSearchBox.args?.placeholder ?? ''}
            />
          </div>
          <div style={{width: '100%'}}>
            <RichTextComponent userProfilePict={DefaultRichText.args?.userProfilePict ?? ''} />
          </div>
          <div style={{width: '100%'}}>
            <TimelineComponent
              posts={Timeline.args?.posts ?? []}
              anonymous={Timeline.args?.anonymous ?? false}
            />
          </div>
        </div>
      </div>

      <div className={classes.thirdCol}>
        <div
          style={{
            maxWidth: 360,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 12,
          }}>
          <div>
            <ProfileHeaderComponent
              name={ProfileHeader.args?.name ?? 'Name'}
              username={ProfileHeader.args?.username ?? 'Username'}
              avatar={
                ProfileHeader.args?.avatar ??
                'https://res.cloudinary.com/dsget80gs/icon/Ellipse_445aaron.svg'
              }
            />
          </div>
          <div style={{marginTop: theme.spacing(2.5)}}>
            <RightMenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export {HomePage};