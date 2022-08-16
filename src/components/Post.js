import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifyerror,notifysuccess } from '../utils';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './index';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const posts = usePosts();
  

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
     

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        notifysuccess('comment added')
      } else {
        notifyerror('cant add comment')
      }

    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        notifysuccess('Like removed successfully!')
      } else {
        notifysuccess('Like added successfully!');
      }
    } else {
      return notifyerror(response.message);
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1660397936~hmac=989eca4d129d0d5114316effb5dd7526"
            alt="user-pic"
          />
          <div>
            { <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link> }
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
