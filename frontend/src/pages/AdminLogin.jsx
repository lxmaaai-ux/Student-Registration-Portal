import { useState } from "react";
import axios from "axios";

function AdminLogin() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/admin/login",

        {

          email,

          password

        }

      );

      alert(res.data.message);

      localStorage.setItem(

        "admin",

        JSON.stringify(res.data.admin)

      );

      localStorage.setItem(

        "adminToken",

        res.data.token

      );

      window.location.href =
        "/admin-dashboard";

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="container">

      <h1>
        👨‍💼 Admin Login
      </h1>

      <form
  onSubmit={handleLogin}
  autoComplete="off"
>

      <input
  type="email"
  name="email"
  placeholder="Admin Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="off"
  required
/>

       <input
  type="password"
  name="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="new-password"
  required
/>

        <button>

          Login

        </button>

      </form>

    </div>

  );

}

export default AdminLogin;