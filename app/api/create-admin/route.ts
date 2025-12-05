import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST() {
    try {
        await createUserWithEmailAndPassword(auth, "bornextremo@gmail.com", "Gameover28@@@");
        return NextResponse.json({ success: true, message: "User created successfully" });
    } catch (error: any) {
        console.error("Server-side creation error:", error);
        // If user already exists, that's also a "success" for our purpose (we just want to ensure they exist)
        if (error.code === 'auth/email-already-in-use') {
            return NextResponse.json({ success: true, message: "User already exists" });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
