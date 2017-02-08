/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Meteor } from "meteor/meteor";
import { Router } from "meteor/iron:router";

import GLOBALS from "./globals";
import CONST from "/imports/api/constants";
import Collections from "/imports/api/collections";

Router.route("/admin/users", {
    name: "AdminPanel_Users",
    controller: GLOBALS.Controller,
    roles: [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT],
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN
});

Router.route("/admin/user/new", {
    name: "AdminPanel_User_New",
    controller: GLOBALS.Controller,
    roles: [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT],
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN,
    data: function() {
        if (this.ready()) {
            let isAdmin = this.params.query.hasOwnProperty("admin");
            if (isAdmin && !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN))
                isAdmin = false;

            return { isAdmin: isAdmin };
        }
    }
});

Router.route("/admin/user/:userId", {
    name: "AdminPanel_User",
    controller: GLOBALS.Controller,
    roles: [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT],
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN,
    waitOn: function() {
        return Meteor.subscribe("admin_panel.users.userData", this.params.userId, GLOBALS.SubscribeCallbacks(this));
    },
    data: function() {
        if (this.ready())
            return { user: Collections.Users.findOne(this.params.userId) };
    }
});

Router.route("/admin/newsletters", {
    name: "AdminPanel_Newsletters",
    controller: GLOBALS.Controller,
    roles: CONST.USER.ROLES.ADMIN.DEFAULT,
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN
});

Router.route("/admin/newsletter/new", {
    name: "AdminPanel_Newsletter_New",
    template: "AdminPanel_Newsletter",
    controller: GLOBALS.Controller,
    roles: CONST.USER.ROLES.ADMIN.DEFAULT,
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN,
    data: function () {
        if (this.ready()) {
            return {
                type: "new"
            };
        }
    }
});

Router.route("/admin/newsletter/:newsletterId", {
    name: "AdminPanel_Newsletter",
    controller: GLOBALS.Controller,
    roles: CONST.USER.ROLES.ADMIN.DEFAULT,
    rolesGroup: CONST.USER.ROLES_GROUPS.ADMIN,
    waitOn: function () {
        return Meteor.subscribe("admin_panel.newsletter.data", this.params.newsletterId, GLOBALS.SubscribeCallbacks(this));
    },
    data: function () {
        if (this.ready()) {
            return {
                type: "edit",
                newsletter: Collections.Newsletters.findOne(this.params.newsletterId)
            };
        }
    }
});
