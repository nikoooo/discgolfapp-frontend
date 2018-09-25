import * as React from "react";
import * as ReactDOM from "react-dom";
import { RootStore } from "./stores/rootStore";
import { Provider } from "../node_modules/mobx-react";
import { Layout } from "./layout";

export interface InjectedProps {
    rootStore: RootStore;
}

const rootStore = new RootStore();

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
