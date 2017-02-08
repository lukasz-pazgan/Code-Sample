/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";

import "/imports/ui/components/link-to-router/link-to-router";
import "/imports/ui/layouts/admin-panel/components/menu-group/menu-group";
import "/imports/ui/layouts/admin-panel/components/menu-link/menu-link";
import "./menu.html";

Template.Layouts_AdminPanel_Menu.onCreated(function() {
    this.newOrdersNumber = new ReactiveVar();
});

Template.Layouts_AdminPanel_Menu.onRendered(function() {
    var self = this;

    this.autorun(function() {

        var tariffOrderNumberSub = self.subscribe("admin_panel.menu.total_orders");
        if(tariffOrderNumberSub.ready()) {
            self.newOrdersNumber.set(Counts.get('newOrdersNumber'));
        }
    });

});

Template.Layouts_AdminPanel_Menu.onDestroyed(function() {});

Template.Layouts_AdminPanel_Menu.helpers({
    newOrdersNumber: ()=> {
        return Template.instance().newOrdersNumber.get();
    },
    totalNotifcations: ()=> {
        return (Template.instance().newOrdersNumber.get());
    }
});

