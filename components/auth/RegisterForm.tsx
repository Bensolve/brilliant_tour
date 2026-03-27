// @/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff, Map, Wallet, ShieldCheck } from "lucide-react";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "traveler"; 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const getRoleConfig = () => {
    switch (role) {
      case "scout":
        return {
          title: "Join as a Scout",
          sub: "Earn bounties by sharing trips",
          icon: <Wallet className="text-green-500" />,
        };
      case "operator":
        return {
          title: "Join as an Operator",
          sub: "List your tours and reach travelers",
          icon: <ShieldCheck className="text-blue-500" />,
        };
      default:
        return {
          title: "Join the Adventure",
          sub: "Discover and book premium tours",
          icon: <Map className="text-green-500" />,
        };
    }
  };

  const config = getRoleConfig();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signUpUser(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
       setTimeout(() => {
      router.push(`/dashboard/${role}`);
    }, 1500);
    }
    
    setLoading(false);
  }

  const checkPasswordMatch = () => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatchError("Passwords don't match");
    } else {
      setPasswordMatchError("");
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl p-8">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-2">{config.icon}</div>
        <CardTitle className="text-3xl font-bold text-gray-800">
          {config.title}
        </CardTitle>
        <p className="text-gray-600 mt-2">{config.sub}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="role" value={role} />
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name" className="text-gray-700">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 text-lg border-gray-300 focus:border-green-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-lg border-gray-300 focus:border-green-500"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordMatch();
                  }}
                  required
                  className="h-12 text-lg pr-12 border-gray-300 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="relative">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    checkPasswordMatch();
                  }}
                  required
                  className="h-12 text-lg border-gray-300 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordMatchError && (
                <p className="text-red-500 text-sm mt-2">{passwordMatchError}</p>
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm mt-2 font-medium">
              Welcome! Check your email to confirm.
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 rounded-xl shadow-md mt-4"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center space-y-4 mt-6">
          <p className="text-sm text-gray-600">
            Secure sign up • Trusted by families in Ghana
          </p>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}