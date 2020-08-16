import React, { ReactNode, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import NewComment from './NewComment';
import { TextButton } from '../buttons';
import { useStyles } from './styles';

export interface Props {
  username: string,
  value: string,
  ts: Date|null,
  childComments?: ReactNode,
  onSubmitReply?: (value: string, ts: Date) => void,
}

export default function Comment({
  username,
  value,
  ts,
  childComments,
  onSubmitReply,
}: Props) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const classNames = useStyles();

  const handleSubmitReply = (replyValue: string, ts: Date) => {
    if (onSubmitReply) {
      onSubmitReply(replyValue, ts);
    }

    setIsReplyOpen(false);
  };

  const handleCancelReply = () => setIsReplyOpen(false);

  return (
    <div className={classNames.comment}>
      <div className={classNames.commentHeader}>
        <Typography variant="subtitle2">{username} at {JSON.stringify(ts, null, 2)}</Typography>
        <Typography>{value}</Typography>
      </div>

      <TextButton onClick={() => setIsReplyOpen(true)} color="primary">Reply</TextButton>

      {isReplyOpen &&
      <div className={classNames.childrenContainer}>
        <NewComment onSubmit={handleSubmitReply} onCancel={handleCancelReply}/>
      </div>
      }

      <div className={classNames.childrenContainer}>
        {childComments}
      </div>
    </div>
  );
}
