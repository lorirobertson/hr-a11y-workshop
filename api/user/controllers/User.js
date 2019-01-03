'use strict';

/**
 * A set of functions called "actions" for `User`
 */

module.exports = {
  changePassword: async (ctx, next) => {
    return strapi.services.user.changePassword(ctx, ctx.params, ctx.request.body);
  }
};
