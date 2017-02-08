/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-11-17
 */

import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import changeCase from "change-case";

import CONST from "/imports/api/constants";
import FormSchemas from "/imports/api/form-schemas";
import Collections from "/imports/api/collections";

Meteor.methods({
    "adminPanel.newsletters.create": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (doc._id) // If id exists then it's update
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.Newsletter.validate(doc); // Validate data (throw error)

        delete doc._id;

        return Collections.Newsletters.insert(doc);
    },
    "adminPanel.newsletters.edit": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (!doc._id) // If id not exists then it's create
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.Newsletter.validate(doc); // Validate data (throw error)

        let newsletter = Collections.Newsletters.findOne(doc._id);
        if (!newsletter)
            throw new Meteor.Error(403, "User not exists!");

        // Update data
        Collections.Newsletters.update(newsletter._id, { $set: {
            subject: doc.subject,
            content: doc.content,
            sendAt: doc.sendAt
        } });
    },
    "adminPanel.newsletters.delete": function(newsletterId) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(newsletterId, String);
        } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

        let newsletter = Collections.Newsletters.findOne(newsletterId);
        if (!newsletter)
            throw new Meteor.Error(403, "Newsletter not exists!");

        Collections.Newsletters.remove(newsletterId);
    }
});