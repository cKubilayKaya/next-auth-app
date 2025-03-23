"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div>
      <Link href="/login">Login</Link>
      <br />
      <br />
      <Link href="/register">Register</Link>
      <br />
      <br />
      {isAuthenticated && <Link href="/profile">Profile</Link>}
    </div>
  );
}
