"use client";

import { useState } from "react";

export default function CreateAdminPage() {
    const [status, setStatus] = useState("Waiting...");

    const createAdmin = async () => {
        try {
            setStatus("Requesting server to create user...");
            const response = await fetch('/api/create-admin', { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                setStatus("SUCCESS: " + data.message);
            } else {
                setStatus("ERROR: " + data.error);
            }
        } catch (error: any) {
            console.error(error);
            setStatus("ERROR: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Admin Creation Tool (Server-Side)</h1>
            <p>Status: <span id="status">{status}</span></p>
            <button
                id="create-btn"
                onClick={createAdmin}
                className="bg-brand-yellow text-black px-4 py-2 font-bold rounded"
            >
                Create Admin User
            </button>
        </div>
    );
}
