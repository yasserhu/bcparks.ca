"use strict";

const createApiUser = async () => {
  const authRole = await findRole("authenticated");
  const password = await strapi.admin.services.auth.hashPassword(
    process.env.API_USER_PASSWORD
  );
  const params = {
    username: process.env.API_USER_NAME,
    email: process.env.API_USER_EMAIL,
    password: password,
    provider: "local",
    confirmed: true,
    blocked: false,
    role: authRole,
  };
  const apiUser = await Promise.resolve(
    strapi.query("user", "users-permissions").create({
      ...params,
    })
  );
  strapi.log.info("API user was successfully created.");
  strapi.log.info(`Email: ${params.email}`);
  return apiUser;
};

const createApiToken = async () => {
  try {
    const apiUser = await createApiUser();
    return await strapi.services["token"]
      .create({
        token: process.env.API_TOKEN,
        user: apiUser,
      })
      .then(() => {
        strapi.log.info("API token successfully created.");
        return true;
      });
  } catch (error) {
    strapi.log.error(error);
    return false;
  }
};

const findRole = async (role) => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: role });
  return result;
};

const setAuthPermissions = async () => {
  const authRole = await findRole("authenticated");
  const authPermissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: authRole.id, _limit: -1 });
  await Promise.all(
    authPermissions.map((p) =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true })
    )
  );
};

const setPublicPermissions = async () => {
  const publicRole = await findRole("public");
  const publicPermissions = await strapi
    .query("permission", "users-permissions")
    .find({
      type: "application",
      controller_nin: ["token", "statutory-holidays", "x-data-load-setting"],
      role: publicRole.id,
      action_in: ["find", "findone", "names"],
      _limit: -1,
    });
  await Promise.all(
    publicPermissions.map((p) =>
      strapi
        .query("permission", "users-permissions")
        .update({ id: p.id }, { enabled: true })
    )
  );
};

const setDefaultPermissions = async () => {
  return Promise.all([setAuthPermissions(), setPublicPermissions()])
    .then(() => {
      strapi.log.info("Default permissions successfully set.");
      return true;
    })
    .catch((error) => {
      strapi.log.error(error);
      return false;
    });
};

const createAdmin = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      const params = {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
        firstname: process.env.ADMIN_FIRST_NAME,
        lastname: process.env.ADMIN_LAST_NAME,
        email: process.env.ADMIN_EMAIL,
        blocked: false,
        isActive: true,
      };
      //Check if any account exists.
      const admins = await strapi.query("user", "admin").find();

      if (admins.length === 0) {
        let verifyRole = await strapi
          .query("role", "admin")
          .findOne({ code: "strapi-super-admin" });
        if (!verifyRole) {
          verifyRole = await strapi.query("role", "admin").create({
            name: "Super Admin",
            code: "strapi-super-admin",
            description:
              "Super Admins can access and manage all features and settings.",
          });
        }
        params.roles = [verifyRole.id];
        params.password = await strapi.admin.services.auth.hashPassword(
          params.password
        );
        await strapi.query("user", "admin").create({
          ...params,
        });
        strapi.log.info("Admin account was successfully created.");
        strapi.log.info(`Email: ${params.email}`);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
    return false;
  }
};

module.exports = {
  createAdmin,
  createApiUser,
  createApiToken,
  setDefaultPermissions,
};
