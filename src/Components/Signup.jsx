import React from "react";
import { useState, useRef } from "react";

function Signup({ setUser }) {
  const [hasUser, setHasUser] = useState(false);
  const [error, setError] = useState(null);
  const name = useRef(null);
  const password = useRef(null);

  async function createUser() {
    const user = {
      name: name.current.value,
      password: password.current.value,
    };

    try {
      let res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(res);
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setHasUser(true);
        setError(null);
      } else {
        setError("User already exists");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  async function login() {
    let user = {
      name: name.current.value,
      password: password.current.value,
    };
    let res = await fetch(
      `http://localhost:3000/users?name=${user.name}&password=${user.password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);

    let data = await res.json();
    if (data.length === 0) {
      setError("User does not exist");
    } else {
      // save user to localstorage
      localStorage.setItem("user", JSON.stringify(data[0]));
      setUser(data[0]);
      setHasUser(true);
    }
  }

  return (
    <>
      {!hasUser ? (
        <div>
          <input type="text" ref={name} placeholder="name" />
          <input type="password" ref={password} placeholder="password" />
          <button onClick={createUser}>Sign up</button>
          <button onClick={() => setHasUser(true)}>Already have a user?</button>
        </div>
      ) : (
        <div>
          <input type="text" ref={name} placeholder="name" />
          <input type="password" ref={password} placeholder="password" />
          <button onClick={login}>login</button>
          <button onClick={() => setHasUser(false)}>Create new user</button>
        </div>
      )}
      {error && <div>{error}</div>}
    </>
  );
}

export default Signup;
