export const subscribeEvents = () => {
  window.FB && window.FB.Event.subscribe("customerchat.dialogShow", true);
};

export const controlPlugin = () => {
  window.FB.CustomerChat.showDialog();
};

export const setFbAsyncInit = () => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: "2520030718061642",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v3.3",
    });
  };
};

export const loadSDKAsynchronously = () => {
  /* eslint-disable */
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  /* eslint-enable */
};

export const addEvent = () => {
  document.addEventListener(
    "DOMNodeInserted",
    (event) => {
      const element = event.target;
      if (
        element.className &&
        typeof element.className === "string" &&
        element.className.includes("fb_dialog")
      ) {
        controlPlugin();
      }
    },
    false
  );
  subscribeEvents();
};
