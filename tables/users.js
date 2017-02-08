/**
 * Copyright (C) OneBi Sp. z o.o. All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Lukasz Pazgan, 2016-10-24
 */

import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tabular } from "meteor/aldeed:tabular";
import { moment } from "meteor/momentjs:moment";
import { Roles } from "meteor/alanning:roles";

import SubscriptionsFix from "/imports/api/tables/subscriptions-fix";

// Templates
if (Meteor.isClient) {
    require("/imports/ui/pages/admin-panel/users/tabular-cell-actions/tabular-cell-actions");
}

import CONST from "/imports/api/constants";
import Collections from "/imports/api/collections";

const Table = new Tabular.Table({
    sub: SubscriptionsFix,
    name: "AdminPanel_Users",
    collection: Collections.Users,
    pub: "admin_panel.tables.users",
    changeSelector(selector, userId) {
        selector["roles." + CONST.USER.ROLES_GROUPS.ADMIN] = { $exists: false };

        return selector;
    },
    columns: [
        { data: "emails.0.address" },
        { data: "profile.personal.firstName" },
        { data: "profile.personal.lastName" },
        {
            data: "createdAt",
            render: function (cellData, renderType, currentRow) {
                return cellData ? moment(cellData).format("YYYY-MM-DD HH:mm") : null;
            }
        },
        {
            data: "status.lastLogin.date",
            render: function (cellData, renderType, currentRow) {
                return cellData ? moment(cellData).format("YYYY-MM-DD HH:mm") : null;
            }
        },
        {
            orderable: false,
            searchable: false,
            width: "50px",
            tmpl: Meteor.isClient && Template.Pages_AdminPanel_Users_Actions
        }
    ]
});

Table.i18n("tables.titles.admin_panel.users");

export default Table;