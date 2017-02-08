/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { SimpleSchema } from "meteor/aldeed:simple-schema";

import Collection from "./users";
import Profile from "./users-profile-schema";

const Schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        custom: function() {
            if (Meteor.isServer
                && this.isSet
                && !!this.operator) // Change of _id is not allowed
                return "notAllowed";
        }
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        custom: function() {
            if (Meteor.isServer && this.isSet) {
                // Check if new email address is free
                let selector = {
                    $or: [
                        { "emails.address": this.value },
                        { "services.email.verificationTokens.address": this.value }
                    ]
                };

                let userId = this.field("_id");
                if (userId.isSet)
                    selector._id = { $ne: userId.value };

                if (Meteor.users.findOne(selector))
                    return "alreadyTaken";
            }
        }
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Profile,
        defaultValue: {}
    },
    status: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        defaultValue: {},
        blackbox: true
    }
});

Collection.attachSchema(Schema);

export default Schema;