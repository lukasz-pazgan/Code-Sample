/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { SimpleSchema } from "meteor/aldeed:simple-schema";

import Collection from "./newsletters";

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
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert)
                return new Date();
        }
    },
    subject: {
        type: String,
        min: 3,
        max: 100
    },
    content: {
        type: String,
        min: 3,
        max: 9999
    },
    sendAt: {
        type: Date,
        autoValue: function() {
            if (!this.isSet)
                return new Date();
        }
    },
    isSending: {
        type: Boolean,
        defaultValue: false
    },
    isSent: {
        type: Boolean,
        defaultValue: false
    }
});

Collection.attachSchema(Schema);

export default Schema;