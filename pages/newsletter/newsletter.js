/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-10
 */

import { Template } from "meteor/templating";
import { Roles } from "meteor/alanning:roles";
import { TAPi18n } from "meteor/tap:i18n";

import "./newsletter.html";

import CONST from "/imports/api/constants";
import MODALS from "/imports/ui/common/modals";

Template.Pages_AdminPanel_Newsletter.onCreated(function() {
    let self = this;

    this.TYPES = {
        NEW: "new",
        EDIT: "edit"
    };

    AutoForm.addHooks("autoform-adminpanel-newsletter", {
        onSuccess: function(formType, result) {
            let doc = this.insertDoc;

            switch (self.data.type) {
                case self.TYPES.NEW:
                    if (!result)
                        return;

                    sAlert.success(TAPi18n.__("pages.admin_panel.newsletter.create_success", { subject: doc.subject }));
                    Router.go("AdminPanel_Newsletter", { newsletterId: result });
                    break;
                case self.TYPES.EDIT:
                    sAlert.success(TAPi18n.__("pages.admin_panel.newsletter.edit_success", { subject: doc.subject }));
                    break;
            }
        }
    }, true);
});

Template.Pages_AdminPanel_Newsletter.onRendered(function() {});

Template.Pages_AdminPanel_Newsletter.onDestroyed(function() {});

Template.Pages_AdminPanel_Newsletter.helpers({
    formDoc: function() {
        let template = Template.instance();

        if (template.data && template.data.newsletter)
            return template.data.newsletter;
        else
            return { sendAt: new Date() };
    },
    submitButton: function() {
        let template = Template.instance();
        return TAPi18n.__(template.data.newsletter && template.data.newsletter._id ? "save" : "create");
    },
    submitMethod: function() {
        let template = Template.instance();
        return template.data.type == template.TYPES.NEW ? "adminPanel.newsletters.create" : "adminPanel.newsletters.edit";
    },
    isNew: function() {
        let template = Template.instance();
        return template.data.type == template.TYPES.NEW;
    }
});

Template.Pages_AdminPanel_Newsletter.events({
    "click h3 > button.actions-delete": function(event, template) {
        MODALS.ADMIN_PANEL.NEWSLETTER.DELETE(template.data.newsletter._id);
    }
});