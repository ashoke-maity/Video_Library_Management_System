"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { registerUser } from "@/utils/authApi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser({ FullName: name, Email: email, Password: password });
      router.push("/users/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleRegister}
        className="bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">User Registration</h2>
        {error && <Badge variant="destructive" className="w-full text-center mb-2">{error}</Badge>}
        <div>
          <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Enter your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <div className="text-gray-400 text-sm text-center mt-2">
          Already have an account?{' '}
          <a href="/users/login" className="text-blue-400 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
