/* eslint-disable no-template-curly-in-string */
import React from "react";
import Translate from "./translate";
import TranslationsProvider from "./TranslationsProvider";
import { render } from "./test-utils";

const translations = {
  title: "Hello world!",
  greeting: "Hello ${name}!"
};

const renderTranslate = props =>
  render(
    <TranslationsProvider translations={translations}>
      <Translate {...props} />
    </TranslationsProvider>
  ).container.innerHTML;

it("renders the translation as plain text", () => {
  expect(renderTranslate({ path: "title" })).toBe("Hello world!");
});

it("uses the remaining props as template values", () => {
  expect(renderTranslate({ path: "greeting", name: "Larry" })).toBe(
    "Hello Larry!"
  );
});

it("renders the path for missing translations", () => {
  expect(renderTranslate({ path: "missing" })).toBe("missing");
});
