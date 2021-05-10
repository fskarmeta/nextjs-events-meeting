import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
    if (!showComments) {
      fetchComments();
    }
  }

  async function fetchComments() {
    const response = await fetch('/api/comments/' + eventId);
    const data = await response.json();
    setComments(data);
  }

  function addCommentHandler(commentData) {
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify({ ...commentData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchComments();
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
