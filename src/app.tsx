import * as React from "react";
import * as ReactDOM from "react-dom";
import { RootStore } from "./stores/rootStore";
import { Provider } from "../node_modules/mobx-react";
import { Layout } from "./Layout";
import { createBrowserHistory, History } from "history";

export interface InjectedProps {
    rootStore: RootStore;
}

let history: History = createBrowserHistory({
    basename: "/",
});

const rootStore = new RootStore(history);

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <Layout />
    </Provider>,
    document.getElementById("app-root"),
);

if (module.hot) {
    module.hot.accept("./app.tsx", () => {
        ReactDOM.render(
            <Provider rootStore={rootStore}>
                <Layout />
            </Provider>,
            document.getElementById("app-root"),
        );
    });
}
