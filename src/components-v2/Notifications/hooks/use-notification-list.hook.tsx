import {
  CheckIcon,
  ChatAlt2Icon,
  PlusIcon,
  ExclamationCircleIcon,
  AtSymbolIcon,
  ArrowCircleUpIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/solid';

import React from 'react';

import {SvgIcon, Typography} from '@material-ui/core';

import {useStyles} from '../Notifications.styles';

import {Notification, NotificationType} from 'src/interfaces/notification';

type NotificationList = {
  id: string;
  user: string;
  avatar?: string;
  description: React.ReactNode;
  badge: React.ReactNode;
  createdAt: Date;
  read: boolean;
};

export const useNotificationList = (notifications: Notification[]): NotificationList[] => {
  const style = useStyles();

  return notifications
    .filter(notification => Boolean(notification.fromUserId) && Boolean(notification.toUserId))
    .map(notification => {
      switch (notification.type) {
        case NotificationType.FRIEND_ACCEPT:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Accepted your friend request',
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={CheckIcon}
                  style={{color: '#FFF', fill: 'currentColor'}}
                  viewBox="-4 -4 34 34"
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;
        case NotificationType.FRIEND_REQUEST:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Wants to be your friend',
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={PlusIcon}
                  viewBox="-4 -4 34 34"
                  style={{color: '#FFF', fill: 'currentColor'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;
        case NotificationType.POST_COMMENT:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: <Typography component="span">Commented on your Post</Typography>,
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={ChatAlt2Icon}
                  viewBox="-4 -4 34 34"
                  style={{fill: 'currentColor', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.COMMENT_COMMENT:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Commented on your reply',
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={ChatAlt2Icon}
                  viewBox="-4 -4 34 34"
                  style={{fill: 'currentColor', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.POST_VOTE:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: <Typography component="span">Upvoted your Post</Typography>,
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={ArrowCircleUpIcon}
                  viewBox="-4 -4 34 34"
                  style={{fill: 'currentColor', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.COMMENT_VOTE:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Upvoted your reply',
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={ArrowCircleUpIcon}
                  viewBox="-4 -4 34 34"
                  style={{fill: 'currentColor', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.POST_MENTION:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Mention you in a comment',
            badge: (
              <div className={style.circle}>
                <SvgIcon
                  component={AtSymbolIcon}
                  viewBox="-4 -4 34 34"
                  style={{fill: 'currentColor', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.USER_TIPS:
          return {
            id: notification.id,
            read: notification.read,
            user: 'Tips received',
            avatar: notification.fromUserId.profilePictureURL,
            description: (
              <Typography component="span">
                You recieved tip from&nbsp;
                {notification.fromUserId.name}
                &nbsp;{`(${notification.message})`}
              </Typography>
            ),
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.POST_TIPS:
          return {
            id: notification.id,
            read: notification.read,
            user: 'Tips received',
            avatar: notification.fromUserId.profilePictureURL,
            description: (
              <Typography component="span">
                Your post recieved tip from {notification.fromUserId.name}&nbsp;
                {`(${notification.message})`}
              </Typography>
            ),
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.COMMENT_TIPS:
          return {
            id: notification.id,
            read: notification.read,
            user: 'Tips received',
            avatar: notification.fromUserId.profilePictureURL,
            description: (
              <Typography component="span">
                Your reply recieved tip from&nbsp;
                {notification.fromUserId.name}
                &nbsp;{`(${notification.message})`}
              </Typography>
            ),
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.USER_CLAIM_TIPS:
          return {
            id: notification.id,
            read: notification.read,
            user: 'Tips claimed',
            avatar: notification.fromUserId.profilePictureURL,
            description: `${notification.message}`,
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.USER_REWARD:
          return {
            id: notification.id,
            read: notification.read,
            user: 'Tips reward',
            avatar: notification.fromUserId.profilePictureURL,
            description: `${notification.message}`,
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;

        case NotificationType.REPORT_POST:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: (
              <Typography component="span">Somebody reported your Post as a violance</Typography>
            ),
            badge: (
              <div className={style.circleError}>
                <SvgIcon
                  component={ExclamationCircleIcon}
                  style={{color: '#FFF', fill: 'currentColor'}}
                  viewBox="-4 -4 34 34"
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;
        case NotificationType.REPORT_USER:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: 'Somebody reported your account as a violance',
            badge: (
              <div className={style.circleError}>
                <SvgIcon
                  component={ExclamationCircleIcon}
                  style={{color: '#FFF', fill: 'currentColor'}}
                  viewBox="-4 -4 34 34"
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;
        default:
          return {
            id: notification.id,
            read: notification.read,
            user: notification.fromUserId.name,
            avatar: notification.fromUserId.profilePictureURL,
            description: notification.message,
            badge: (
              <div className={style.circleSuccess}>
                <SvgIcon
                  component={ArrowCircleLeftIcon}
                  viewBox="2 2 20 20"
                  style={{fill: '#47B881', color: '#FFF'}}
                />
              </div>
            ),
            createdAt: notification.createdAt,
          };
          break;
      }
    });
};
