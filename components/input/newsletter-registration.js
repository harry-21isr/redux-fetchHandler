import React, { useEffect, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { notificationActions } from "../../store/index";
/* import {useDispatch} from '@reduxjs/toolkit' */
import { useSelector, useDispatch } from "react-redux";

function NewsletterRegistration() {
	const inputRef = useRef();

	const dispatch = useDispatch();
	const notiState = useSelector((state) => state.notiState);
	/*   const otherState = useSelector(state => state.otherState) */


	function registrationHandler(event) {
		event.preventDefault();

		const email = inputRef.current.value;

		dispatch(notificationActions.showNotification({ title: "Signing up..", message: "Registering for newsletter.", status: "pending" }));

		fetch("../../api/newsletter", {
			method: "POST",
			body: JSON.stringify({ email: email }),
			headers: { "Content-type": "application/json" },
		})
			.then((res) => {
				if (!res.ok) {
					//if fetch response is not okay or status 500
					return res.json().then((data) => {
						throw new Error(data.message || "something went wrong");
					});
				}

				return res.json();
			})
			.then((data) => {
				dispatch(notificationActions.showNotification({ title: "Success", message: "Successfully registered for newsletter", status: "success" }));
			})
			.catch((error) => {
				dispatch(notificationActions.showNotification({ title: "Error", message: error.message || "Something went worng", status: "error" }));
			});
	}

	return (
		<>
			<section className={classes.newsletter}>
				<h2>Sign up to stay updated!</h2>
				<form onSubmit={registrationHandler}>
					<div className={classes.control}>
						<input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={inputRef} />
						<button>Register</button>
					</div>
				</form>
			</section>

			<p>
				{/* {notiState ? notiState : 'undef'} <br/> */}
				{/* {otherState} */}
			</p>
		</>
	);
}

export default NewsletterRegistration;
