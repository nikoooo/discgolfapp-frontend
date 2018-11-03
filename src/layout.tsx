import * as React from "react";
import { Header } from "./components/Header/Header";
import { Router } from "./routing/Router";

export const Layout = (): JSX.Element => (
    <div className="dg-layout">
        <Header />
        <Router />
    </div>
)
