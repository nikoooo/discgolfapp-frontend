import * as React from "react";
import * as ReactDOM from "react-dom";
import { DiscList } from "./components/DiscList/DiscList";
import { RootStore } from "./stores/rootStore";

const rootStore = new RootStore();

ReactDOM.render(
    <DiscList rootStore={rootStore} />,
    document.getElementById("app-root"),
);
