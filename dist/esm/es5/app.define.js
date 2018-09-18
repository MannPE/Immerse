// App: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './app.core.js';
import {
  AppBurger,
  AppHeader,
  AppIcon,
  AppMarked,
  AppRoot,
  ContextConsumer,
  Input,
  LanguageCard,
  LanguageList,
  LazyIframe,
  MainPage,
  NotFoundPage,
  ResourcesPage,
  Route,
  RouteLink,
  RouteSwitch,
  Router,
  ViewWordList,
  WordItem,
  pwasPage
} from './app.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    AppBurger,
    AppHeader,
    AppIcon,
    AppMarked,
    AppRoot,
    ContextConsumer,
    Input,
    LanguageCard,
    LanguageList,
    LazyIframe,
    MainPage,
    NotFoundPage,
    ResourcesPage,
    Route,
    RouteLink,
    RouteSwitch,
    Router,
    ViewWordList,
    WordItem,
    pwasPage
  ], opts);
}