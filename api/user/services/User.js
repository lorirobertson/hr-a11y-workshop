'use strict';

/**
 * User.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {
  profile: async (ctx, params, body) => {
    return await User.findOne({ _id: ctx.state.user._id });
  },

  changePassword: async (ctx, params, body) => {
    if ( body.password && body.passwordValidate && body.password === body.passwordValidate ) {
      const password = await strapi.plugins['users-permissions'].services.user.hashPassword(body);
      await User.update({ _id: ctx.state.user._id }, {password: password});
      return true;
    } else if (body.password && body.passwordValidate && body.password !== body.passwordValidate) {
      return ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: 'Auth.form.error.password.matching' }] }] : 'Passwords do not match.');
    } else {
      return ctx.badRequest(null, ctx.request.admin ? [{ messages: [{ id: 'Auth.form.error.params.provide' }] }] : 'Incorrect params provided.');
    }
  }
};
