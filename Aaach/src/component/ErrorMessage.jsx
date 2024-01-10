import React from "react";

export default function ErrorMessage({ msg }) {
    return (
        <p style={{
            fontSize: "0.9rem",
            color: "red"
        }}>{msg}</p>
    )
}