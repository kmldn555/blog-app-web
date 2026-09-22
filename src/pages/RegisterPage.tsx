import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Register Success !!!");
    } catch (error) {
      console.log(error);
      alert("Register Failed !!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-100 mx-auto mt-20 border border-black p-8 space-y-4">
      <h1>Register Page</h1>

      <Label>Name</Label>
      <Input type="text" onChange={(e) => setName(e.target.value)} />

      <Label>Email</Label>
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />

      <Label>Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}{" "}
      </Button>
    </div>
  );
}

export default RegisterPage;
