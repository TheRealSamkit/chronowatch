import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ToastNotification({ message, onClose }) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
			onClose();
		}, 5000); // auto close after 5s
		return () => clearTimeout(timer);
	}, [onClose]);

	if (!show) return null;

	return createPortal(
		<div
			className="toast align-items-center text-bg-primary border-0 position-fixed top-0 end-0 m-3 show"
			role="alert"
		>
			<div className="d-flex">
				<div className="toast-body">{message}</div>
				<button
					type="button"
					className="btn-close btn-close-white me-2 m-auto"
					aria-label="Close"
					onClick={() => {
						setShow(false);
						onClose();
					}}
				></button>
			</div>
		</div>,
		document.body
	);
}

export default ToastNotification;
