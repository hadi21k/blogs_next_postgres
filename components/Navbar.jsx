"use client";
import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import dynamic from "next/dynamic";

const AccountMenu = dynamic(() => import("./AccountMenu"), {
  loading: () => <Skeleton className="w-10 h-10 rounded-full" />,
  ssr: false,
});

const Navbar = ({ session }) => {
  return (
    <nav className="flex h-20 bg-neutral-900">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link href="/">
          <h1 className="text-white font-semibold">Database 2 Project</h1>
        </Link>
        {session ? (
          <Suspense fallback={<Skeleton className="w-10 h-10 founded-full" />}>
            <AccountMenu session={session} />
          </Suspense>
        ) : (
          <>
            <Button
              className="text-white"
              variant="outline"
              onClick={() => signIn("google")}
            >
              Sign in
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
