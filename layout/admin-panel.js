/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";
import changeCase from "change-case";

import "/imports/ui/pages/common/loading-page/loading-page";
import "./admin-panel.html";
import "./components/header/header";
import "./components/menu/menu";
import "./components/footer/footer";

import { Config, Update } from "/imports/api/config";
import Collections from "/imports/api/collections";

Template.Layouts_AdminPanel.onCreated(function() {
    this.subscribe("adminPanel.config.data");

    this.autorun(function() {
        Update(Collections.ConfigAdminPanel.findOne());
    });
});

Template.Layouts_AdminPanel.onRendered(function() {});

Template.Layouts_AdminPanel.onDestroyed(function() {});

Template.Layouts_AdminPanel.helpers({
    config: function() {
        return Config();
    },
    currentRouteName: function() {
        return changeCase.paramCase(Router.current().route.getName()).replace("admin-panel-", "");
    }
});

Template.Layouts_AdminPanel.events({});