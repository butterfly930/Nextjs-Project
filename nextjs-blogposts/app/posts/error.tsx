"use client";
import { useEffect } from "react";

export default function ErrorPage({error} : {error: Error}) {
  useEffect(() => {
    console.error(`$(error)`);
  }, [error]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl font-bold text-red-600">Error fetching users data</div>
    </div>
  );
}