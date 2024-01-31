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

function signout() {
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { authenticate, isAuthenticated, signout };
