"use client";

import * as React from "react";
import { Button } from "./ui/button";

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Button className="fixed right-5 top-5 z-50">Click me</Button>
      {children};
    </div>
  );
}
