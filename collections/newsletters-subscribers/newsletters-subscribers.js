/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-19
 */

import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default new Mongo.Collection("newsletters-subscribers");