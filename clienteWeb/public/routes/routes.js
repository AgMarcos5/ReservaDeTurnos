const router = {
    "/": () => showContent("content-home"),
    "/reservas": () =>
      requireAuth(() => showContent("content-user"), "/reservas"),
};
