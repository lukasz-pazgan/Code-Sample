/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";

import "/imports/ui/components/link-to-router/link-to-router";
import "./tabular-cell-actions.html";

Template.Pages_AdminPanel_Newsletters_Actions.onCreated(function() {});

Template.Pages_AdminPanel_Newsletters_Actions.onRendered(function() {});

Template.Pages_AdminPanel_Newsletters_Actions.onDestroyed(function() {});

Template.Pages_AdminPanel_Newsletters_Actions.helpers({
    actionsData: function() {
        return {
            newsletterId: Template.instance().data._id
        };
    }
});

Template.Pages_AdminPanel_Newsletters_Actions.events({});