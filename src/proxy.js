import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
const session = await auth.api.getSession({
headers: await headers(),
});

// Redirect unauthenticated users to the login page
if (!session) {
return NextResponse.redirect(
new URL("/login", request.url)
);
}

// Allow authenticated users to access the requested route
return NextResponse.next();
}

export const config = {
matcher: [
"/add-room",
"/my-listings",
"/my-bookings",
"/profile",
"/update-room/:path*",
],
};
