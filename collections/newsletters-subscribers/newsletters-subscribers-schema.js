/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { SimpleSchema } from "meteor/aldeed:simple-schema";

import Collection from "./newsletters-subscribers";

const Schema = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        custom: function() {
            if (Meteor.isServer
                && this.isSet
                && !!this.operator) // Change of _id is not allowed
                return "notAllowed";
        },
        autoform: {
            type: "hidden"
        }
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        custom: function() {
            if (Meteor.isServer && this.isSet) {
                // Check if new email address is free
                if (Collection.findOne({ email: this.value }))
                    return "alreadyInUse";
            }
        },
        autoform: {
            label: false
        }
    },
    token: {
        type: String,
        autoValue: function() {
            if (Meteor.isServer && this.isInsert)
                return Random.secret();
        }
    },
    verified: {
        type: Boolean,
        defaultValue: false
    }
});

Collection.attachSchema(Schema);

export default Schema;