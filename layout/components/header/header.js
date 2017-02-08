/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";

import "/imports/ui/components/link-to-router/link-to-router";
import "./header.html";

Template.Layouts_AdminPanel_Header.onCreated(function() {});

Template.Layouts_AdminPanel_Header.onRendered(function() {});

Template.Layouts_AdminPanel_Header.onDestroyed(function() {});

Template.Layouts_AdminPanel_Header.helpers({});

Template.Layouts_AdminPanel_Header.events({
    "click .logout-button": function(event, template) {
        event.preventDefault();

        Meteor.logout(function() {Router.go("/login")});
    }
});