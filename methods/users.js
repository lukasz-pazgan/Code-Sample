/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Marzena Smolen, 2016-10-21
 */

import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import changeCase from "change-case";

import CONST from "/imports/api/constants";
import FormSchemas from "/imports/api/form-schemas";
import Collections from "/imports/api/collections";

Meteor.methods({
    "adminPanel.users.newUser": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT], CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (doc._id) // If id exists then it's update
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.User.validate(doc); // Validate data (throw error)

        let userId = Accounts.createUser({
            email: doc.email,
            password: doc.password,
            profile: {
                personal: {
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    country: doc.country,
                    state: doc.state,
                    city: doc.city,
                    zipCode: doc.zipCode,
                    street: doc.street,
                    homeNumber: doc.homeNumber,
                    phone: doc.phone || null
                },
                payment: {
                    bank: doc.bank || null,
                    iban: doc.iban || null,
                    bic: doc.bic || null,
                    method: doc.paymentMethod || null
                }
            }
        });

        // Send email asynchronous
        if (userId && (!doc.hasOwnProperty("emailSendVerification") || doc.emailSendVerification))
            Accounts.sendVerificationEmailAsync(userId, doc.email);

        return userId;
    },
    "adminPanel.users.editUser": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT], CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (!doc._id) // If id not exists then it's create new user
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.User.validate(doc); // Validate data (throw error)

        let user = Collections.Users.findOne(doc._id);
        if (!user || Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "User not exists!");

        // Set email
        if (user.emails[0].address != doc.email)
            Accounts.changeEmailInstant(user._id, doc.email, !doc.hasOwnProperty("emailSendVerification") || doc.emailSendVerification);

        // Set password
        if (doc.password)
            Accounts.setPassword(user._id, doc.password, { logout: true });

        // Update account data
        Collections.Users.update(user._id, { $set: {
            "profile.personal.firstName": doc.firstName,
            "profile.personal.lastName": doc.lastName,
            "profile.personal.country": doc.country,
            "profile.personal.state": doc.state,
            "profile.personal.city": doc.city,
            "profile.personal.zipCode": doc.zipCode,
            "profile.personal.street": doc.street,
            "profile.personal.homeNumber": doc.homeNumber,
            "profile.personal.phone": doc.phone || null,
            "profile.payment.bank": doc.bank || null,
            "profile.payment.iban": doc.iban || null,
            "profile.payment.bic": doc.bic || null,
            "profile.payment.method": doc.paymentMethod || null
        } });
    },
    "adminPanel.users.deleteUser": function(userId) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), [CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES.ADMIN.USERS_MANAGEMENT], CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(userId, String);
        } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

        let user = Collections.Users.findOne(userId);
        if (!user || Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "User not exists!");

        Collections.Users.remove(userId);
    },
    "adminPanel.users.newAdmin": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (doc._id) // If id exists then it's update
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.Admin.validate(doc); // Validate data (throw error)

        let userId = Accounts.createUser({
            email: doc.email,
            password: doc.password,
            profile: {
                personal: {
                    firstName: doc.firstName,
                    lastName: doc.lastName
                }
            }
        });

        if (userId) {
            // Add to admin role
            Roles.addUsersToRoles(userId, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN);

            // Send email asynchronous
            if (!doc.hasOwnProperty("emailSendVerification") || doc.emailSendVerification)
                Accounts.sendVerificationEmailAsync(userId, doc.email);
        }

        return userId;
    },
    "adminPanel.users.editAdmin": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);

            if (!doc._id) // If id not exists then it's create new user
                throw Meteor.Error();
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        FormSchemas.AdminPanel.Admin.validate(doc); // Validate data (throw error)

        let user = Collections.Users.findOne(doc._id);
        if (!user || !Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "User not exists!");

        // Set email
        if (user.emails[0].address != doc.email)
            Accounts.changeEmailInstant(user._id, doc.email, !doc.hasOwnProperty("emailSendVerification") || doc.emailSendVerification);

        // Set password
        if (doc.password)
            Accounts.setPassword(user._id, doc.password, { logout: true });

        // Update account data
        Collections.Users.update(user._id, { $set: {
            "profile.personal.firstName": doc.firstName,
            "profile.personal.lastName": doc.lastName
        } });
    },
    "adminPanel.users.deleteAdmin": function(userId) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(userId, String);
        } catch(e) { throw new Meteor.Error(403, "Params are incorrect!"); }

        let user = Collections.Users.findOne(userId);
        if (!user || !Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "User not exists!");

        Collections.Users.remove(userId);
    },
    "adminPanel.users.editAdmin.roles": function(doc) {
        if (!Meteor.userId()
            || !Roles.userIsInRole(Meteor.userId(), CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "Unauthorised access!");

        try {
            check(doc, Object);
        } catch(e) { throw new Meteor.Error(403, "Document is incorrect!"); }

        let user = Collections.Users.findOne(doc._id);
        if (!user || !Roles.userIsInRole(user._id, CONST.USER.ROLES.ADMIN.DEFAULT, CONST.USER.ROLES_GROUPS.ADMIN))
            throw new Meteor.Error(403, "User not exists!");

        let userRoles = Roles.getRolesForUser(user._id, CONST.USER.ROLES_GROUPS.ADMIN);

        // Block removing of last super admin role from application
        if (_.indexOf(userRoles, CONST.USER.ROLES.ADMIN.SUPER_ADMIN) >= 0
            && !doc.roles[changeCase.snakeCase(CONST.USER.ROLES.ADMIN.SUPER_ADMIN)]
            && Roles.getUsersInRole(CONST.USER.ROLES.ADMIN.SUPER_ADMIN, CONST.USER.ROLES_GROUPS.ADMIN).count() == 1)
            throw new Meteor.Error(403, "Last super admin");

        for (let prop in CONST.USER.ROLES.ADMIN) {
            let role = CONST.USER.ROLES.ADMIN[prop];
            if (role == CONST.USER.ROLES.ADMIN.DEFAULT) // Default role means that its admin so we can't allow to change it
                continue;

            if (doc.roles[changeCase.snakeCase(role)]) {
                if (_.indexOf(userRoles, role) < 0)
                    Roles.addUsersToRoles(user._id, role, CONST.USER.ROLES_GROUPS.ADMIN);
            }
            else {
                if (_.indexOf(userRoles, role) >= 0)
                    Roles.removeUsersFromRoles(user._id, role, CONST.USER.ROLES_GROUPS.ADMIN);
            }
        }
    }
});