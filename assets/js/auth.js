(async function () {
  // 🔹 verifica se o usuário está logado
  async function verificarLogin() {
    try {
      const res = await fetch(domain+"/whoami", {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) return null;

      return await res.json();
    } catch {
      return null;
    }
  }

  // 🔹 decide o que fazer com base na página
  document.addEventListener("DOMContentLoaded", async () => {
    const user = await verificarLogin();
    const path = window.location.pathname;

    // 🔐 páginas protegidas
    if (path.startsWith("/front/painel")) {
      if (!user) {
        window.location.href = "/front/login";
        return;
      }
      // user disponível globalmente se precisar
      window.USER = user;
      return;
    }

    // 🚫 página de login (não pode entrar logado)
    if (path.startsWith("/front/login")) {
      if (user) {
        window.location.href = "/front/painel/home";
        return;
      }
    }
  });
})();

