export default (selector) => {
  let dom = document.querySelector(selector);
  if (!dom) return undefined;

  dom.hide = () => (dom.style.display = "none");
  //   dom.show = (displayMode) => {
  //       displayMode?
  //   }
};

export const hide = (dom) => {
  dom.style.display = "none";
};

export const show = (dom) => {};
