const cookieManager = {
  setCookie: function (name, value, days) {
    if (!name || !value)
      throw new Error("setCookie: cookieName and cookieValue are required");

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookieStr += `; expires=${date.toUTCString()}`;
    }
    document.cookie = cookieStr + "; path=/";
  },

  getCookie: function (name) {
    if (!name) throw new Error("getCookie: cookieName is required");

    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, val] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return decodeURIComponent(val);
      }
    }
    return null;
  },

  deleteCookie: function (name) {
    if (!name) throw new Error("deleteCookie: cookieName is required");

    document.cookie = `${encodeURIComponent(
      name
    )}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },

  allCookieList: function () {
    if (!document.cookie) return [];
    return document.cookie.split("; ").map((cookie) => {
      const [key, val] = cookie.split("=");
      return {
        name: decodeURIComponent(key),
        value: decodeURIComponent(val),
      };
    });
  },

  hasCookie: function (name) {
    if (!name) throw new Error("hasCookie: cookieName is required");

    return this.getCookie(name) !== null;
  },
};
