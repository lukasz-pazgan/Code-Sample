/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";

import "/imports/ui/components/link-to-router/link-to-router";
import "./menu-link.html";
import CONST from "/imports/api/constants";

Template.Layouts_AdminPanel_MenuLink.onCreated(function() {
    this.autorun(function() {
        let data = Template.currentData(); // For run after data change

        // Set default values
        if (!data.hasOwnProperty("textI18n"))
            data.textI18n = true;
    });
});

Template.Layouts_AdminPanel_MenuLink.onRendered(function() {});

Template.Layouts_AdminPanel_MenuLink.onDestroyed(function() {});

Template.Layouts_AdminPanel_MenuLink.helpers({
    isAllowed: function() {
        let template = Template.instance();
        return !template.data.route || Router.userIsInRole(template.data.route);
    }
});

Template.Layouts_AdminPanel_MenuLink.events({});