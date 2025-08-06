"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { loginUser, registerUser } from "@/utils/authApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ Email: email, Password: password });
      // Optionally store token: localStorage.setItem('token', res.token);
      if (res.user) {
        localStorage.setItem('user', JSON.stringify({
          name: res.user.user_metadata?.name || res.user.email,
          email: res.user.email
        }))
      }
      router.push("/users/dashboard");
    } catch (err: any) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">User Login</h2>
        {error && <Badge variant="destructive" className="w-full text-center mb-2">{error}</Badge>}
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
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="text-gray-400 text-sm text-center mt-2">
          Don't have an account?{' '}
          <a href="/users/register" className="text-blue-400 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
}
