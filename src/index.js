__observer__ = null;

export const $_ = (selector) => {
  let dom = document.querySelector(selector);
  if (!dom) return undefined;

  dom.hide = () => (dom.style.display = "none");
  dom.show = (displayMode = "block") => {
    if (
      displayMode !== "block" &&
      displayMode !== "inline" &&
      displayMoe !== "inline-block"
    )
      console.warn(
        "Invalid display value. Please confirm DOM.show(displayMode)."
      );

    dom.style.display = displayMode;
  };

  dom.getAbsTop = () => window.pageYOffset + dom.getClientRect().top;
};

export const _hide = (dom) => {
  dom.style.display = "none";
};

export const _show = (dom, displayMode = "block") => {
  dom.style.display = displayMode;
  if (
    displayMode !== "block" &&
    displayMode !== "inline" &&
    displayMoe !== "inline-block"
  )
    console.warn(
      "Invalid display value. Please confirm _show(DOM, displayMode)."
    );

  dom.style.display = displayMode;
};

export const _getAbsTop = (dom) => window.pageYOffset + dom.getClientRect().top;

export const _observe = (
  doms,
  fnAppear = null,
  fnDisappear = null,
  options = {}
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? fnAppear && fnAppear(entry.target)
        : fnDisappear && fnDisappear(entry.target);
    });
  }, options);

  doms.__proto__.hasOwnProperty("unshift")
    ? doms.forEach((dom) => observer.observe(dom))
    : observer.observe(doms);

  __observer__ = observer;
};

export const _unobserve = (doms) => {
  doms.__proto__.hasOwnProperty("unshift")
    ? doms.forEach((dom) => __observer__.unobserve(dom))
    : __observer__.unobserve(doms);

  console.log("#unobserve: ", __observer__);
};

export const _scroll = (mode, fn) => {
  const isFirefox =
    navigator.userAgent.indexOf("Firefox") === -1 ? false : true;
  window.addEventListener(isFirefox ? "wheel" : "DOMMouseScroll", (e) => {
    const delta = isFirefox ? -e.detail : e.wheelDelta;
    if (mode === "up") delta > 0 && fn();
    else if (mode === "down") delta < 0 && fn();
    else console.warn("Invalid scroll direction. direction is 'up' or 'down'.");
  });
};
