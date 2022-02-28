exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/getting-started/*", 
    toPath: "/verify/getting-started/:splat", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/getting-started", 
    toPath: "/verify/getting-started", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/authentication/*", 
    toPath: "/verify/authentication/:splat", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/authentication", 
    toPath: "/verify/authentication", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/eid-specifics/*", 
    toPath: "/verify/eid-specifics/:splat", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/eid-specifics", 
    toPath: "/verify/eid-specifics", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/how-to/get-ready-for-production",
    toPath: "/verify/guides/production",
    isPermanent: true, 
    force: true
  })
  createRedirect({
    fromPath: "/how-to/*", 
    toPath: "/verify/how-to/:splat", 
    isPermanent: true, 
    force: true
  });
  createRedirect({
    fromPath: "/how-to", 
    toPath: "/verify/how-to", 
    isPermanent: true, 
    force: true
  });
};

