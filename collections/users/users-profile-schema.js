/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { SimpleSchema } from "meteor/aldeed:simple-schema";

const Personal = new SimpleSchema({
    firstName: {
        type: String,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        min: 3,
        max: 30
    },
    country: {
        type: String,
        min: 3,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    state: {
        type: String,
        min: 3,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    city: {
        type: String,
        min: 3,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    zipCode: {
        type: String,
        min: 3,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    street: {
        type: String,
        min: 3,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    homeNumber: {
        type: String,
        min: 1,
        max: 50,
        optional: true // Optional only because admin account don't have it, normal user require it
    },
    phone: {
        type: String,
        min: 3,
        max: 50,
        optional: true
    }
});

const Payment = new SimpleSchema({
    bank: {
        type: String,
        min: 3,
        max: 50,
        optional: true
    },
    iban: {
        type: String,
        min: 3,
        max: 50,
        optional: true
    },
    bic: {
        type: String,
        min: 3,
        max: 50,
        optional: true
    },
    method: {
        type: String,
        min: 3,
        max: 50,
        optional: true
    }
});

const Schema = new SimpleSchema({
    personal: {
        type: Personal,
        defaultValue: {}
    },
    payment: {
        type: Payment,
        optional: true // Optional only because admin account don't have it, normal user require it
    }
});

export default Schema;