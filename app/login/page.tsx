"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/"; // redirect to home

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* darker overlay */}
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl p-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">Your next adventure is waiting</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="h-12 text-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="relative">
                <Label htmlFor="password" className="text-gray-700 mb-1 block">
                  Password
                </Label>
                <div className="relative">
                  {" "}
                  {/* new relative wrapper just for input + eye */}
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  
                    className="h-12 text-lg pr-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 rounded-xl shadow-md"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>

            <div className="text-center space-y-4 mt-6">
              <p className="text-sm text-gray-600">
                Secure login • Trusted by families in Ghana
              </p>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:underline font-medium"
                >
                  Register now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
