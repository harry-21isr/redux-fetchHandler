import { useEffect, useState } from 'react';
import { useRouter} from 'next/router'

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../store';

function Comments(props) {
  const { eventId } = props;
  const route = useRouter()
  const path = route.query.eventId;

  const [showComments, setShowComments] = useState(false);
  const [listComments, setListComments] = useState([]);
  const dispatch = useDispatch()
  const notiState = useSelector(state => state.notiState)

  useEffect(() => {

    if(showComments) {
      fetch(`/api/${path}`)
			.then((res) => res.json())
			.then((data) => {

        console.log(data.response);
      setListComments(data.response)
    })  
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);


  }

  function addCommentHandler(commentData) {


    dispatch(notificationActions.showNotification({title: "Signing up..", message: "Registering for event.", status: "pending" }))
		// send data to API
		fetch(`../../api/${path}`, {
			method: "POST",
			body: JSON.stringify(commentData),
			headers: { "COntent-Type": "application/json" },
		})
			.then((res) => {
        if(!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || 'something went wrong')
          })
        }
        return res.json();
      })
			.then((data) => {
        dispatch(notificationActions.showNotification({title: "Success", message: "Successfully registered for the event!", status: "success"  }))
      })
      .catch(error => {
        console.log(error.message)
        dispatch(notificationActions.showNotification({title: "Error", message: error.message || 'something went wrong', status: "error"  }))
      })
      
	}

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList showList={listComments} />}
    </section>
  );
}

export default Comments;
 