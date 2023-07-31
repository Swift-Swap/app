"use client";
import React from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { PermDenied } from "@/components/perm_denied";
import { useTheme } from "next-themes";
export default function Home() {
  const { toast } = useToast();
  const [showed, setShowed] = React.useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { systemTheme } = useTheme();

  React.useState(() => {
    if (typeof localStorage === "undefined") return;
    const isShowed = localStorage.getItem("showed-unfinished-website");
    if (isShowed) {
      if (JSON.parse(isShowed)) {
        console.log(isShowed);
        setShowed(true);
        return;
      }
    }
    if (showed) return;
    toast({
      title: "Unfinished website",
      description:
        "This website is still under construction. Please check back later!",
      variant: "destructive",
      action: (
        <ToastAction
          altText="Never show again"
          onClick={() => {
            if (typeof localStorage === "undefined") return;
            localStorage.setItem(
              "showed-unfinished-website",
              JSON.stringify(true),
            );
          }}
        >
          Dont show again
        </ToastAction>
      ),
    });
    setShowed(true);
  });

  if (!isLoaded) return null;
  if (
    !user?.primaryEmailAddress?.emailAddress?.endsWith("@eanesisd.net") &&
    isSignedIn
  ) {
    return <PermDenied emailAddr={user?.primaryEmailAddress?.emailAddress!} />;
  }
  return (
    <div
      className={`flex flex-col justify-center items-center w-screen flex-1 p-2 `}
    >
      <div className="flex justify-center items-center gap-4 p-2 w-screen flex-1 flex-col bg-westlake bg-no-repeat bg-center bg-contain">
        <div className="flex flex-col justify-center items-center gap-4 p-2 w-screen flex-1">
          <div className="flex flex-col justify-center items-center gap-4 p-2 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex-1">
            <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold">
              {" "}
              Pave the way for an easy day!{" "}
            </h1>
            <p className="text-center text-lg">
              A platform designed to help students trade parking spots on campus
              efficiently and conveniently.
            </p>
            <div className="flex justify-center items-between gap-4 p-2 w-full">
              <Link href={`${isSignedIn ? "/buy" : "/sign-up"}`}>
                <Button className="flex items-center gap-2">
                  {isSignedIn ? "Buy" : "Get Started"}
                  <ArrowRight className="w-1/3 h-auto" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="bg-transparent border-white border-2"
                >
                  About
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
