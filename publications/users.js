/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { Roles } from "meteor/alanning:roles";
import { check } from "meteor/check";

import CONST from "/imports/api/constants";
import Collections from "/imports/api/collections";

Meteor.publish("admin_panel.users.userData", function (userId) {
    if (!this.userId
        || !Roles.userIsInRole(this.userId, [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT], CONST.USER.ROLES_GROUPS.ADMIN))
        throw new Meteor.Error(403, "Unauthorised access!");

    try {
        check(userId, String);
    } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

    let user = Collections.Users.findOne(userId);
    if (!user || Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
        throw new Meteor.Error(403, "User not exists!");

    return Collections.Users.find(userId, { fields: { "emails": 1, "profile.personal": 1, "profile.payment": 1 } });
});

Meteor.publish("admin_panel.users.adminData", function (userId) {
    if (!this.userId
        || !Roles.userIsInRole(this.userId, [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT], CONST.USER.ROLES_GROUPS.ADMIN))
        throw new Meteor.Error(403, "Unauthorised access!");

    try {
        check(userId, String);
    } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

    let user = Collections.Users.findOne(userId);
    if (!user || !Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
        throw new Meteor.Error(403, "User not exists!");

    return Collections.Users.find(userId, { fields: { "emails": 1, "profile.personal": 1, roles: 1 } });
});