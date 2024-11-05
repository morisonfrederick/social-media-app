export function IntialUserState() {
  console.log("initial_user_state function is called");

  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");

  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString); // Parse the JSON string to an object
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  }

  return {
    user: user || null, // return the parsed object or null
    token: token || null, // return the token or null
  };
}
