'use strict';

var _ = require('lodash'),
    moment = require('moment');

/**
 * Timesheet.js controller
 *
 * @description: A set of functions called "actions" for managing `Timesheet`.
 */

module.exports = {

  /**
   * Retrieve timesheet records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    ctx.query.user = ctx.state.user._id;
    if (ctx.query._q) {
      return strapi.services.timesheet.search(ctx.query);
    } else {
      return strapi.services.timesheet.fetchAll(ctx.query);
    }
  },

  grouped: async (ctx) => {
    return new Promise((resolve, reject)=>{
      ctx.query.user = ctx.state.user._id;
      strapi.services.timesheet.fetchAll(ctx.query)
        .then((results)=>{
          var sumHours = (e)=>{
            return (e.sunday + e.monday + e.tuesday + e.wednesday + e.thursday + e.friday + e.saturday);
          }
          
          var startOfWeek = (occurrence)=>{
            return moment(occurrence.date).startOf('week').format();
          };
          
          var weeklyHours = (e)=>{
            return e.sumHours = sumHours(e);
          }
          
          var groupToWeek = (group, week)=>{
            let data = _.each(group, weeklyHours);
            return {
              week: week,
              data: data,
              hours: _.sumBy(data, 'sumHours')
            }
          };
          
          return _.chain(results)
                  .groupBy(startOfWeek)
                  .map(groupToWeek)
                  .value();
        })
        .then((results)=>{
          resolve(results);
        })
        .catch((err)=>{
          reject(err);
        });
    });
  },  

  /**
   * Retrieve a timesheet record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.timesheet.fetch(ctx.params);
  },

  /**
   * Count timesheet records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.timesheet.count(ctx.query);
  },

  /**
   * Create a/an timesheet record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.timesheet.add(ctx.request.body);
  },

  /**
   * Update a/an timesheet record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.timesheet.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an timesheet record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.timesheet.remove(ctx.params);
  }
};
