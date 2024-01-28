function authenticate(jwt, cb) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  }
}

function isAuthenticated() {
  if (typeof window == "undefined") return false;
  if (sessionStorage.getItem("jwt"))
    return JSON.parse(sessionStorage.getItem("jwt"));
  else return false;
}

function signout(cb) {
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
  //cb();
  // signout().then((data) => {
  //    document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  //})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { authenticate, isAuthenticated, signout };
