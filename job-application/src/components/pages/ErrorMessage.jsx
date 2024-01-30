import React from "react";

export default function ErrorMessage({ msg }) {
    return (
        <div style={{
            fontSize: "0.9rem",
            color: "red",
        }}>{msg}</div>
    )
}