import "./i18n";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Body } from "@/components/body/body";
import { Header } from "@/components/header/header";
import { Providers } from "@/redux/provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <Header />
      <Body />
    </Providers>
  </React.StrictMode>,
);
