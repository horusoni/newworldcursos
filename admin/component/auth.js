(async function () {
  async function verificarLogin() {
    try {
      const res = await fetch(domain + "/whoami-admin", {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) return null;

      console.log(res)
    
      return await res.json();
    } catch {
      return null;
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const user = await verificarLogin();
    console.log(user)
 
    // 🔥 NORMALIZA O PATH
    const path = window.location.pathname.replace(/\/$/, "");

    console.log("PATH:", path);
    console.log("USER:", user);

    // 🔐 páginas protegidas (QUALQUER coisa depois de /admin, exceto o login)
    if (path.startsWith("/admin") && path !== "/admin") {
      if (!user) {
        window.location.replace("/admin");
        return;
      }

      window.USER = user;
      return;
    }

    // 🚫 página de login
    else if (path === "/admin") {
      if (user) {
        window.location.replace("/admin/curso");
        return;
      }
    }
  });
})();
