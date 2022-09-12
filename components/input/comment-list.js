import React from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {
        props.showList.map((list, index) => {
          return <li key={list._id}>
        <p>{list.text}</p>
        <div>
          By <address>{list.name}</address>
        </div>
      </li>
        })
      }
      
    </ul>
  );
}

export default CommentList;
