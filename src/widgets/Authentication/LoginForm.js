"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getLastVisitedSpace } from "../../utils/spaces";
import { useAuth } from "@/context/AuthProvider";
import { useSpace } from "@/context/SpaceProvider";

const LoginForm = ({ onClose, isAuthPage }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useAuth();
  const spaceContext = useSpace();
  const space = spaceContext?.space;
  const setIsCurrentUserSpaceOwner = spaceContext?.setIsCurrentUserSpaceOwner;

  const router = useRouter();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);
    setMessage("Logging in...");
    try {
      // TODO: User server function for auth instead https://payloadcms.com/docs/local-api/server-functions#login
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();

      setLoading(false);
      setMessage(data.message || data.error);
      setTimeout(async () => {
        if (data.user) {
          setUser(data.user);
          setIsCurrentUserSpaceOwner &&
            setIsCurrentUserSpaceOwner(space?.owner?.id === data.user.id);
          // Different behaviours depending on where the user is logging in from
          if (!isAuthPage) {
            onClose();
          }
          // } else {
          // const lastVisitedSpace = await getLastVisitedSpace(data.user.id)
          // if(lastVisitedSpace){
          //   router.push(process.env.NODE_ENV === 'development' ?
          //     `http://${lastVisitedSpace}.localhost:3000?userId=${data.user.id}` //TODO: Set domain name as env var
          //     :
          //     `https://${lastVisitedSpace}.portal8.space?userId=${data.user.id}`
          //   )
          else {
            router.push("/jumping");
          }
        }
      }, 2000);
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  // TODO: Use modal styling in `rootStyles` here
  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        required
      />
      <label className="flex">
        Show Password
        <input
          type="checkbox"
          checked={showPassword}
          onChange={handleShowPassword}
        />
      </label>
      <button type="submit" className="default-button">
        Log In
      </button>
      {message && <p className={loading ? "animate-pulse" : ""}>{message}</p>}
    </form>
  );
};

export default LoginForm;
