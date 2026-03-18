"use client";

import { useState } from "react";
import { signUpUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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
    }
     setTimeout(() => {
        router.push("/dashboard/traveler");
      }, 1500);
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
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519046904884-53103b34b206')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl p-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Join the Adventure
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Create memories with safe, fun trips
            </p>
          </CardHeader>

          <CardContent>
            {/* 1. WRAPPED IN FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                {/* 2. ADDED FULL NAME (Needed for your Action) */}
                <div>
                  <Label htmlFor="full_name" className="text-gray-700">
                    Full Name
                  </Label>
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
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
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
                    <p className="text-red-500 text-sm mt-2">
                      {passwordMatchError}
                    </p>
                  )}
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Welcome! Check your email to confirm.
                </p>
              )}

              {/* 3. CHANGED TO type="submit" AND REMOVED onClick */}
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
      </div>
    </div>
  );
}
