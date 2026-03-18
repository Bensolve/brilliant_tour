"use client";

import { useActionState, useState } from "react"; // Added useActionState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signInUser } from "@/lib/actions/user.actions";

export default function LoginPage() {
  // state holds the return value from your Server Action (e.g., the error message)
  // isPending is true while the server is thinking (your loading state)
  const [state, formAction, isPending] = useActionState(signInUser, null);
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background (Kept your exact style) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl p-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">Your next adventure is waiting</p>
          </CardHeader>
          
          <CardContent>
            {/* Wrap everything in a FORM using the action */}
            <form action={formAction} className="space-y-4">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    name="email" // IMPORTANT: signInUser uses this 'name'
                    type="email"
                    required
                    className="h-12 text-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="password" title="Password" className="text-gray-700 mb-1 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password" // IMPORTANT: signInUser uses this 'name'
                      type={showPassword ? "text" : "password"}
                      required
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

              {/* Display errors from the server action */}
              {state?.error && (
                <p className="text-red-500 text-sm font-medium animate-pulse">
                  {state.error}
                </p>
              )}

              <Button
                type="submit" // Changed to type="submit"
                disabled={isPending}
                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 rounded-xl shadow-md transition-all active:scale-95"
              >
                {isPending ? "Logging in..." : "Log In"}
              </Button>
            </form>

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