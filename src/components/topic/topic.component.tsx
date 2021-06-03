import React, { useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';

import { TopicListComponent } from './topic-list.component';
import { useTopic } from './use-topic.hooks';

import ExpandablePanel from 'src/components/common/panel-expandable.component';

interface TopicProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      marginTop: theme.spacing(1)
    },
    content: {
      padding: theme.spacing(0, 2),
      background: theme.palette.background.paper
    }
  })
);

const TopicComponent: React.FC<TopicProps> = props => {
  const styles = useStyles();

  const { popularTopics, loadPopularTopic } = useTopic();

  useEffect(() => {
    loadPopularTopic();
  }, []);

  return (
    <div className={styles.root}>
      <ExpandablePanel expanded={true} title="World Wide" startIcon={<LanguageIcon />}>
        <div className={styles.content}>
          <div style={{ paddingTop: 24, paddingBottom: 8 }}>
            <Typography variant="h4" style={{ marginBottom: 8 }}>
              {'Trending Now'}
            </Typography>
          </div>

          <TopicListComponent topics={popularTopics} />
        </div>
      </ExpandablePanel>
    </div>
  );
};

export default TopicComponent;