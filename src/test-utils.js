import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

export const render = element => {
  const container = document.createElement("div");
  act(() => {
    ReactDOM.render(element, container);
  });
  return {
    container,
    rerender: next =>
      act(() => {
        ReactDOM.render(next, container);
      }),
    unmount: () => ReactDOM.unmountComponentAtNode(container)
  };
};

export { act };
