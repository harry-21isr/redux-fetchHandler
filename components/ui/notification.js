import { useContext, useEffect } from "react";
import classes from "./notification.module.css";
/* import NotificationContext from '../../store/notification-context'; */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store";

function Notification(props) {
	const dispatch = useDispatch();
	const notiState = useSelector((state) => state.notiState);

	const closeHandler = () => {
		dispatch(notificationActions.hideNotification());
	};

	//3 seconds to hide the fetch notification alert
	useEffect(() => {
		if (notiState.status == ("success" || "error")) {
			const timer = setTimeout(() => {
				dispatch(notificationActions.hideNotification());
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [notiState]);


	const { title, message, status } = props;

	let statusClasses = "";

	if (status === "success") {
		statusClasses = classes.success;
	}

	if (status === "error") {
		statusClasses = classes.error;
	}

	if (status === "pending") {
		statusClasses = classes.pending;
	}

	const activeClasses = `${classes.notification} ${statusClasses}`;

	return (
		<div onClick={closeHandler} className={activeClasses}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}

export default Notification;
