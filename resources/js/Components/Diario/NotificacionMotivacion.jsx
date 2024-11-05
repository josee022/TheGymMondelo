import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificacionMotivacion({ mensaje }) {
    useEffect(() => {
        if (mensaje) {
            toast.info(mensaje, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon: "💪",
            });
        }
    }, [mensaje]);

    return <ToastContainer />;
}
