/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { Roles } from "meteor/alanning:roles";

import CONST from "/imports/api/constants";
import Collection from "./users";

Meteor.users.before.update(function (userId, doc, fieldNames, modifier, options) {
    // Logout all other sessions while other user login
    if (modifier.hasOwnProperty("$addToSet") && modifier.$addToSet.hasOwnProperty("services.resume.loginTokens"))
        Meteor.logout(doc._id);
});

Meteor.users.after.update(function (userId, doc, fieldNames, modifier, options) {
    // On user email verification success
    if (!!modifier.$set
        && modifier.$set["emails.$.verified"] === true
        && doc.emails.length > 1) {
        // Remove all emails that are not equal to currently verified,
        // current system of email change, add next email into user and wait for verify itm till that he use old one
        Meteor.users.update({ _id: doc._id }, { $pull: { emails: { address: { $ne: modifier.$pull["services.email.verificationTokens"].address } } } });
    }
});