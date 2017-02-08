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

Meteor.publish("admin_panel.newsletter.data", function (newsletterId) {
    if (!this.userId
        || !Roles.userIsInRole(this.userId, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
        throw new Meteor.Error(403, "Unauthorised access!");

    try {
        check(newsletterId, String);
    } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

    let newsletter = Collections.Newsletters.findOne(newsletterId);
    if (!newsletter)
        throw new Meteor.Error(403, "Newsletter not exists!");

    return Collections.Newsletters.find(newsletterId);
});