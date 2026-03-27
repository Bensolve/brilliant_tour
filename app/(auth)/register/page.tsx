// app/(auth)/register/page.tsx
import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import { Skeleton } from "@/components/ui/skeleton"; // Import Shadcn Skeleton

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background stays static and loads instantly */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519046904884-53103b34b206')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Suspense fallback={<RegisterSkeleton />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}

// A small local component to mimic your Form's shape
function RegisterSkeleton() {
  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-8 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-12 w-12 rounded-full" /> {/* Icon placeholder */}
        <Skeleton className="h-8 w-[200px]" />         {/* Title placeholder */}
        <Skeleton className="h-4 w-[250px]" />         {/* Subtitle placeholder */}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-full mt-6" />      {/* Button placeholder */}
      </div>
    </div>
  );
}