import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const url = "https://firmfish-us.backendless.app/api/users/login";
      // response ini yang mengembalikan data dalam bentuk objek (response.data)
      const {data} = await axios.post(url, {
        login: login,
        password: password,
      });

      data.name
      data.email
      data.objectId
      data["user-token"]

      alert("Login Success");
    } catch (error) {
      alert("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-100 mx-auto mt-20 border border-black p-8 space-y-4">
      <h1>Login Page</h1>

      <Label>Email</Label>
      <Input type="login" onChange={(e) => setLogin(e.target.value)} />

      <Label>Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-1">
        <Button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </Button>
        <Link to="/register" className=" flex text-sm items-center">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;
