"use client";

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { debate } from "./src/sanity/schemas/debate";

export default defineConfig({
  name: "fadhi-ku-dirir",
  title: "Fadhi Ku Dirir",
  projectId: "qttaqul4",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: [debate],
  },
});
