import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@material-ui/core';

import {Timeline as TimelineComponent} from '.';
import {ReportContainer} from '../Report';
import {SendTipContainer} from '../SendTip';
import {TimelineFilterContainer} from '../TimelineFilter';
import {TipHistoryContainer} from '../TipHistory';
import {Modal} from '../atoms/Modal';
import {PromptComponent} from '../atoms/Prompt/prompt.component';
import {useTimelineFilter} from './hooks/use-timeline-filter.hook';
import {useTimelineHook} from './hooks/use-timeline.hook';

import ShowIf from 'src/components/common/show-if.component';
import {useTipHistory} from 'src/hooks/tip-history.hook';
import {useQueryParams} from 'src/hooks/use-query-params.hooks';
import {useToasterHook} from 'src/hooks/use-toaster.hook';
import {Comment} from 'src/interfaces/comment';
import {Post} from 'src/interfaces/post';
import {TimelineFilter} from 'src/interfaces/timeline';
import {Status} from 'src/interfaces/toaster';
import {User} from 'src/interfaces/user';
import {RootState} from 'src/reducers';
import {upvote, setDownvoting, deletePost, removeVote} from 'src/reducers/timeline/actions';
import {WalletState} from 'src/reducers/wallet/reducer';

type TimelineContainerProps = {
  filters?: TimelineFilter;
  enableFilter?: boolean;
  sortType?: 'metric' | 'filter';
  anonymous?: boolean;
};

export const TimelineContainer: React.FC<TimelineContainerProps> = props => {
  const {anonymous = false, filters, enableFilter = true} = props;

  const dispatch = useDispatch();
  const {posts, hasMore, nextPage, getTippedUserId} = useTimelineHook();
  const {filterTimeline} = useTimelineFilter(filters);
  const {query} = useQueryParams();
  const {isTipSent} = useSelector<RootState, WalletState>(state => state.walletState);
  const {openTipHistory} = useTipHistory();
  const {openToaster} = useToasterHook();

  const user = useSelector<RootState, User | undefined>(state => state.userState.user);
  const [tippedPost, setTippedPost] = useState<Post | null>(null);
  const [reported, setReported] = useState<Post | null>(null);
  const [removing, setRemoving] = useState(false);
  const [postToRemove, setPostToRemove] = useState<Post | null>(null);
  const sendTipOpened = Boolean(tippedPost);

  useEffect(() => {
    filterTimeline(query);
  }, [query]);

  useEffect(() => {
    if (isTipSent) {
      closeSendTip();
    }
  }, [isTipSent]);

  const handleUpvote = (reference: Post | Comment) => {
    dispatch(upvote(reference));
  };

  const handleToggleDownvoting = (reference: Post | Comment | null) => {
    dispatch(setDownvoting(reference));
  };

  const handleSendTip = (reference?: Post | Comment) => {
    // type guard to check if reference is a Post object
    if (reference && 'platform' in reference) {
      setTippedPost(reference);
      getTippedUserId(reference.id);
    }
  };

  const closeSendTip = () => {
    if (isTipSent && tippedPost) {
      openTipHistory(tippedPost);
    } else {
      console.log('no post tipped');
    }

    setTippedPost(null);
  };

  const handleReportPost = (post: Post) => {
    setReported(post);
  };

  const closeReportPost = () => {
    setReported(null);
  };

  const handleDeletePost = (post: Post) => {
    setRemoving(true);
    setPostToRemove(post);
  };

  const handleSharePost = (post: Post, type: 'link' | 'post') => {
    if (type === 'post') {
      openToaster({
        message: 'This post successfully share to your timeline',
        toasterStatus: Status.SUCCESS,
      });
    }
  };

  const handleClosePrompt = (): void => {
    setRemoving(false);
    setPostToRemove(null);
  };

  const confirmDeletePost = (): void => {
    if (postToRemove) {
      dispatch(deletePost(postToRemove.id));
    }

    handleClosePrompt();
  };

  const handleRemoveVote = (reference: Post | Comment) => {
    dispatch(removeVote(reference));
  };

  return (
    <>
      <ShowIf condition={enableFilter}>
        <TimelineFilterContainer {...props} />
      </ShowIf>

      <TimelineComponent
        user={user}
        posts={posts}
        anonymous={anonymous}
        loadNextPage={nextPage}
        hasMore={hasMore}
        upvote={handleUpvote}
        onSendTip={handleSendTip}
        onOpenTipHistory={openTipHistory}
        onDelete={handleDeletePost}
        onReport={handleReportPost}
        toggleDownvoting={handleToggleDownvoting}
        onShared={handleSharePost}
        onRemoveVote={handleRemoveVote}
      />

      <Modal
        gutter="none"
        open={sendTipOpened}
        onClose={closeSendTip}
        title="Send Tip"
        subtitle="Finding this post is insightful? Send a tip!">
        <SendTipContainer />
      </Modal>

      <TipHistoryContainer onSendTip={handleSendTip} />

      <ReportContainer reference={reported} onClose={closeReportPost} />

      <PromptComponent
        title={'Remove Post'}
        subtitle={`Are you sure to remove this post?`}
        open={removing}
        icon="danger"
        onCancel={handleClosePrompt}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button
            style={{marginRight: '24px'}}
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClosePrompt}>
            No, let me rethink
          </Button>
          <Button size="small" variant="contained" color="primary" onClick={confirmDeletePost}>
            Yes, proceed to delete
          </Button>
        </div>
      </PromptComponent>
    </>
  );
};
