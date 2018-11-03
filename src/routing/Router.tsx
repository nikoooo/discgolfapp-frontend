import * as React from "react";
import { BrowserRouter, Router as ReactRouter, Route } from "react-router-dom"
import { Home } from "../pages/Home/Home";
import { InjectedProps } from "../app";
import { inject } from "mobx-react";


@inject("rootStore")
export class Router extends React.Component<{}, {}> {
    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render() {
        const { history } = this.injected.rootStore.appStore;
        return (
            <BrowserRouter>
                <ReactRouter history={history}>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/discs/:discIds' component={Home} />
                    </div>
                </ReactRouter>
            </BrowserRouter>
        );
    }
}