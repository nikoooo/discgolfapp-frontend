import * as React from "react";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";

export const Layout = (): JSX.Element => (
    <div className="dg-layout">
        <Header />
        <Home />
    </div>
)
