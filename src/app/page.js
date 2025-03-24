"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {!isAuthenticated && (
        <div className="homepage-button-wrapper">
          <Link href="/login">
            <button>Login</button>
          </Link>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </div>
      )}
      {isAuthenticated && <Link href={`/profile/${user?.username}`}>Profile</Link>}
    </div>
  );
}
