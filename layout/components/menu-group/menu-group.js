/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";

import "./menu-group.html";

Template.Layouts_AdminPanel_MenuGroup.onCreated(function() {
    this.groupId = Random.id();
    this.isOpen = new ReactiveVar(false);
    this.isShown = new ReactiveVar(false);

    this.autorun(function() {
        let data = Template.currentData(); // For run after data change

        // Set default values
        if (!data.hasOwnProperty("textI18n"))
            data.textI18n = true;
    });
});

Template.Layouts_AdminPanel_MenuGroup.onRendered(function() {
    this.isShown.set(this.$("> .menu-group > .content > ul li.menu-link").length > 0);
});

Template.Layouts_AdminPanel_MenuGroup.onDestroyed(function() {});

Template.Layouts_AdminPanel_MenuGroup.helpers({
    display: function() {
        return Template.instance().isShown.get() ? "block" : "none";
    },
    groupId: function() {
        return Template.instance().groupId;
    },
    open: function() {
        return Template.instance().isOpen.get() ? "open" : "";
    }
});

Template.Layouts_AdminPanel_MenuGroup.events({
    "click .menu-group > .link": function(event, template) {
        event.preventDefault();

        if (event.currentTarget.id == template.groupId)
            template.isOpen.set(!template.isOpen.get());
    }
});