

export const getUserData = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
  
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  };
  
  export const getUserRole = () => {
    const user = getUserData();
    return user?.userRole || "VISITOR";
  };
  
  export const getToken = () => {
    const user = getUserData();
    return user?.token || null;
  };
  
  export const getUserName = () => {
    const user = getUserData();
    return user?.userName || "visiteur";
  }