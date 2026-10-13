"use strict";
/* Mess Manager BD - pure logic (no DOM). Works in browsers and Node.
   Money is stored as INTEGER PAISA everywhere. No float money. */

var I18N = {
  en: {
    "active": "Active",
    "add": "Add",
    "addExpense": "Add bazaar expense",
    "addMember": "Add member",
    "advanceBDT": "Advance (BDT)",
    "allCleared": "All data erased.",
    "amountBDT": "Amount (BDT)",
    "appTagline": "Meal counting and bazaar accounting for Bangladeshi student messes",
    "appTitle": "Mess Manager BD",
    "badgeGets": "gets back",
    "badgeOwes": "owes",
    "badgeSettled": "settled",
    "billTableTitle": "Member bills",
    "cancel": "Cancel",
    "clearAll": "Erase all data",
    "colAdvance": "Advance",
    "colBalance": "Balance",
    "colBill": "Bill",
    "colMeals": "Meals",
    "colName": "Name",
    "confirm": "Confirm",
    "confirmClearAll": "Erase ALL data? This cannot be undone.",
    "confirmDeleteExpense": "Delete this expense?",
    "confirmDeleteMember": "Delete this member? Their logged meals will be excluded from totals.",
    "corruptNotice": "Saved data was corrupted, so the app started fresh.",
    "dataExplainer": "Export downloads a JSON backup. Import restores it. Amounts are stored as integer paisa.",
    "dayTotal": "Day total",
    "del": "Delete",
    "deleteTitle": "Delete",
    "dinner": "Dinner",
    "disclaimer": "A personal tracker for mess bookkeeping. Not accounting software.",
    "edit": "Edit",
    "editMember": "Edit member",
    "editTitle": "Edit",
    "emptyBazaar": "No bazaar expenses yet.",
    "emptyDashboard": "Add members and log meals to see the billing here.",
    "emptyMealsHint": "Pick a date above, then log lunch and dinner for each member.",
    "emptyMembers": "No members yet. Add your first member above.",
    "errAdvanceBad": "Enter a valid advance amount.",
    "errAdvanceMax": "Advance cannot exceed {max} BDT.",
    "errAdvanceNeg": "Advance cannot be negative.",
    "errAmountBad": "Enter a valid amount.",
    "errAmountMax": "Amount cannot exceed {max} BDT.",
    "errAmountPos": "Amount must be greater than zero.",
    "errDateFuture": "Date cannot be in the future.",
    "errDateInvalid": "Date must be a valid YYYY-MM-DD date.",
    "errMealRange": "Meals must be a whole number from {min} to {max}.",
    "errNameDup": "A member with this name already exists.",
    "errNameEmpty": "Name cannot be empty.",
    "errNameLong": "Name must be {max} characters or fewer.",
    "errNoteLong": "Note must be {max} characters or fewer.",
    "expenseAdded": "Expense added.",
    "expenseDate": "Date",
    "expenseDeleted": "Expense deleted.",
    "expenseListTitle": "Expenses (newest first)",
    "exportJson": "Export JSON",
    "importFail": "Import failed: the file is not a valid Mess Manager BD export.",
    "importFileLabel": "Choose a JSON file exported by this app",
    "importJson": "Import JSON",
    "importOk": "Import successful.",
    "inactive": "Inactive",
    "lunch": "Lunch",
    "mealDate": "Date",
    "mealsExcludedNote": "Deleted members' meals are excluded from totals.",
    "mealsSaved": "Meals saved.",
    "mealsUnit": "{n} meals",
    "memberAdded": "Member added.",
    "memberCount": "{n} members",
    "memberDeleted": "Member deleted.",
    "memberName": "Name",
    "memberUpdated": "Member updated.",
    "monthlyTotal": "This month",
    "netOwedToMembers": "mess owes members",
    "netOwedToMess": "members owe the mess",
    "noMealsYet": "No meals logged yet \u2014 the rate cannot be computed.",
    "noRate": "\u2014",
    "note": "Note (optional)",
    "perMeal": "/meal",
    "rateHeroTitle": "Current meal rate",
    "save": "Save",
    "saveMeals": "Save meals",
    "sortedNote": "Biggest ower at the top.",
    "statAdvances": "Advances",
    "statBazaar": "Bazaar cost",
    "statMeals": "Total meals",
    "statMembers": "Members",
    "statNet": "Net balance",
    "statRate": "Meal rate",
    "tabBazaar": "Bazaar",
    "tabDashboard": "Dashboard",
    "tabData": "Data",
    "tabMeals": "Meals",
    "tabMembers": "Members",
    "today": "Today",
    "toggleActiveTitle": "Toggle active"
  },
  bn: {
    "active": "\u09b8\u0995\u09cd\u09b0\u09bf\u09af\u09bc",
    "add": "\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "addExpense": "\u09ac\u09be\u099c\u09be\u09b0 \u0996\u09b0\u099a \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "addMember": "\u09b8\u09a6\u09b8\u09cd\u09af \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "advanceBDT": "\u0985\u0997\u09cd\u09b0\u09bf\u09ae (\u099f\u09be\u0995\u09be)",
    "allCleared": "\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "amountBDT": "\u09aa\u09b0\u09bf\u09ae\u09be\u09a3 (\u099f\u09be\u0995\u09be)",
    "appTagline": "\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09bf \u099b\u09be\u09a4\u09cd\u09b0 \u09ae\u09c7\u09b8\u09c7\u09b0 \u0996\u09be\u09ac\u09be\u09b0 \u0993 \u09ac\u09be\u099c\u09be\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac",
    "appTitle": "\u09ae\u09c7\u09b8 \u09ae\u09cd\u09af\u09be\u09a8\u09c7\u099c\u09be\u09b0",
    "badgeGets": "\u09ab\u09c7\u09b0\u09a4 \u09aa\u09be\u09ac\u09c7\u09a8",
    "badgeOwes": "\u09a6\u09bf\u09a4\u09c7 \u09b9\u09ac\u09c7",
    "badgeSettled": "\u09ae\u09bf\u09b2\u09c7\u099b\u09c7",
    "billTableTitle": "\u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09ac\u09bf\u09b2",
    "cancel": "\u09ac\u09be\u09a4\u09bf\u09b2",
    "clearAll": "\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09c1\u09a8",
    "colAdvance": "\u0985\u0997\u09cd\u09b0\u09bf\u09ae",
    "colBalance": "\u09ac\u09cd\u09af\u09be\u09b2\u09c7\u09a8\u09cd\u09b8",
    "colBill": "\u09ac\u09bf\u09b2",
    "colMeals": "\u0996\u09be\u09ac\u09be\u09b0",
    "colName": "\u09a8\u09be\u09ae",
    "confirm": "\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8",
    "confirmClearAll": "\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09ac\u09c7\u09a8? \u098f\u099f\u09bf \u09ab\u09c7\u09b0\u09be\u09a8\u09cb \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964",
    "confirmDeleteExpense": "\u098f\u0987 \u0996\u09b0\u099a\u099f\u09bf \u09ae\u09c1\u099b\u09ac\u09c7\u09a8?",
    "confirmDeleteMember": "\u098f\u0987 \u09b8\u09a6\u09b8\u09cd\u09af\u0995\u09c7 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09ac\u09c7\u09a8? \u09a4\u09be\u09b0 \u0996\u09be\u09ac\u09be\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac \u09ae\u09cb\u099f \u09a5\u09c7\u0995\u09c7 \u09ac\u09be\u09a6 \u09af\u09be\u09ac\u09c7\u0964",
    "corruptNotice": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u09a1\u09c7\u099f\u09be \u09a8\u09b7\u09cd\u099f \u099b\u09bf\u09b2, \u09a4\u09be\u0987 \u09a8\u09a4\u09c1\u09a8 \u0995\u09b0\u09c7 \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "dataExplainer": "\u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f\u09c7 JSON \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u09b9\u09af\u09bc\u0964 \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f\u09c7 \u09a4\u09be \u09ab\u09bf\u09b0\u09bf\u09af\u09bc\u09c7 \u0986\u09a8\u09be \u09af\u09be\u09af\u09bc\u0964 \u099f\u09be\u0995\u09be\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09aa\u09c2\u09b0\u09cd\u09a3\u09b8\u0982\u0996\u09cd\u09af\u09be \u09aa\u09af\u09bc\u09b8\u09be\u09af\u09bc \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u09b9\u09af\u09bc\u0964",
    "dayTotal": "\u09a6\u09bf\u09a8\u09c7\u09b0 \u09ae\u09cb\u099f",
    "del": "\u09ae\u09c1\u099b\u09c1\u09a8",
    "deleteTitle": "\u09ae\u09c1\u099b\u09c1\u09a8",
    "dinner": "\u09b0\u09be\u09a4\u09c7\u09b0 \u0996\u09be\u09ac\u09be\u09b0",
    "disclaimer": "\u09ae\u09c7\u09b8\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac \u09b0\u09be\u0996\u09be\u09b0 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995\u09be\u09b0\u0964 \u098f\u099f\u09bf \u09b9\u09bf\u09b8\u09be\u09ac\u09b0\u0995\u09cd\u09b7\u09a3 \u09b8\u09ab\u099f\u0993\u09af\u09bc\u09cd\u09af\u09be\u09b0 \u09a8\u09af\u09bc\u0964",
    "edit": "\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be",
    "editMember": "\u09b8\u09a6\u09b8\u09cd\u09af \u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be",
    "editTitle": "\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be",
    "emptyBazaar": "\u098f\u0996\u09a8\u0993 \u0995\u09cb\u09a8\u09cb \u09ac\u09be\u099c\u09be\u09b0 \u0996\u09b0\u099a \u09af\u09cb\u0997 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09a8\u09bf\u0964",
    "emptyDashboard": "\u098f\u0996\u09be\u09a8\u09c7 \u09b9\u09bf\u09b8\u09be\u09ac \u09a6\u09c7\u0996\u09a4\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8 \u0993 \u0996\u09be\u09ac\u09be\u09b0 \u09b2\u0997 \u0995\u09b0\u09c1\u09a8\u0964",
    "emptyMealsHint": "\u0989\u09aa\u09b0\u09c7 \u09a4\u09be\u09b0\u09bf\u0996 \u09ac\u09c7\u099b\u09c7 \u09aa\u09cd\u09b0\u09a4\u09bf\u099f\u09bf \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u09a6\u09c1\u09aa\u09c1\u09b0 \u0993 \u09b0\u09be\u09a4\u09c7\u09b0 \u0996\u09be\u09ac\u09be\u09b0 \u09b2\u09bf\u0996\u09c1\u09a8\u0964",
    "emptyMembers": "\u098f\u0996\u09a8\u0993 \u0995\u09cb\u09a8\u09cb \u09b8\u09a6\u09b8\u09cd\u09af \u09af\u09cb\u0997 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09a8\u09bf\u0964 \u0989\u09aa\u09b0\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae \u09b8\u09a6\u09b8\u09cd\u09af \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964",
    "errAdvanceBad": "\u09b8\u09a0\u09bf\u0995 \u0985\u0997\u09cd\u09b0\u09bf\u09ae\u09c7\u09b0 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09a6\u09bf\u09a8\u0964",
    "errAdvanceMax": "\u0985\u0997\u09cd\u09b0\u09bf\u09ae {max} \u099f\u09be\u0995\u09be\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
    "errAdvanceNeg": "\u0985\u0997\u09cd\u09b0\u09bf\u09ae \u098b\u09a3\u09be\u09a4\u09cd\u09ae\u0995 \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
    "errAmountBad": "\u09b8\u09a0\u09bf\u0995 \u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09a6\u09bf\u09a8\u0964",
    "errAmountMax": "\u09aa\u09b0\u09bf\u09ae\u09be\u09a3 {max} \u099f\u09be\u0995\u09be\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
    "errAmountPos": "\u09aa\u09b0\u09bf\u09ae\u09be\u09a3 \u09b6\u09c2\u09a8\u09cd\u09af\u09c7\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964",
    "errDateFuture": "\u09ad\u09ac\u09bf\u09b7\u09cd\u09af\u09a4\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09c7\u0993\u09af\u09bc\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964",
    "errDateInvalid": "\u09b8\u09a0\u09bf\u0995 \u09a4\u09be\u09b0\u09bf\u0996 \u09a6\u09bf\u09a8 (YYYY-MM-DD)\u0964",
    "errMealRange": "\u0996\u09be\u09ac\u09be\u09b0 {min} \u09a5\u09c7\u0995\u09c7 {max} \u098f\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09aa\u09c2\u09b0\u09cd\u09a3\u09b8\u0982\u0996\u09cd\u09af\u09be \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964",
    "errNameDup": "\u098f\u0987 \u09a8\u09be\u09ae\u09c7 \u098f\u0995\u099c\u09a8 \u09b8\u09a6\u09b8\u09cd\u09af \u0986\u099b\u09c7\u09a8\u0964",
    "errNameEmpty": "\u09a8\u09be\u09ae \u0996\u09be\u09b2\u09bf \u09b0\u09be\u0996\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964",
    "errNameLong": "\u09a8\u09be\u09ae {max} \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
    "errNoteLong": "\u09a8\u09cb\u099f {max} \u0985\u0995\u09cd\u09b7\u09b0\u09c7\u09b0 \u09ac\u09c7\u09b6\u09bf \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964",
    "expenseAdded": "\u09ac\u09be\u099c\u09be\u09b0 \u0996\u09b0\u099a \u09af\u09cb\u0997 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "expenseDate": "\u09a4\u09be\u09b0\u09bf\u0996",
    "expenseDeleted": "\u09ac\u09be\u099c\u09be\u09b0 \u0996\u09b0\u099a \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "expenseListTitle": "\u0996\u09b0\u099a\u09c7\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be (\u09a8\u09a4\u09c1\u09a8 \u0986\u0997\u09c7)",
    "exportJson": "\u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f (JSON)",
    "importFail": "\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09ac\u09cd\u09af\u09b0\u09cd\u09a5: \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09a8\u09af\u09bc\u0964",
    "importFileLabel": "\u098f\u0987 \u0985\u09cd\u09af\u09be\u09aa\u09c7\u09b0 \u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f \u0995\u09b0\u09be JSON \u09ab\u09be\u0987\u09b2 \u09ac\u09c7\u099b\u09c7 \u09a8\u09bf\u09a8",
    "importJson": "\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f (JSON)",
    "importOk": "\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09b8\u09ab\u09b2 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "inactive": "\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc",
    "lunch": "\u09a6\u09c1\u09aa\u09c1\u09b0\u09c7\u09b0 \u0996\u09be\u09ac\u09be\u09b0",
    "mealDate": "\u09a4\u09be\u09b0\u09bf\u0996",
    "mealsExcludedNote": "\u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be \u09b8\u09a6\u09b8\u09cd\u09af\u09c7\u09b0 \u0996\u09be\u09ac\u09be\u09b0\u09c7\u09b0 \u09b9\u09bf\u09b8\u09be\u09ac \u09ae\u09cb\u099f\u09c7 \u09a7\u09b0\u09be \u09b9\u09af\u09bc \u09a8\u09be\u0964",
    "mealsSaved": "\u0996\u09be\u09ac\u09be\u09b0 \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "mealsUnit": "{n}\u099f\u09bf \u0996\u09be\u09ac\u09be\u09b0",
    "memberAdded": "\u09b8\u09a6\u09b8\u09cd\u09af \u09af\u09cb\u0997 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "memberCount": "{n} \u099c\u09a8 \u09b8\u09a6\u09b8\u09cd\u09af",
    "memberDeleted": "\u09b8\u09a6\u09b8\u09cd\u09af \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "memberName": "\u09a8\u09be\u09ae",
    "memberUpdated": "\u09b8\u09a6\u09b8\u09cd\u09af \u09b9\u09be\u09b2\u09a8\u09be\u0997\u09be\u09a6 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964",
    "monthlyTotal": "\u098f\u0987 \u09ae\u09be\u09b8\u09c7",
    "netOwedToMembers": "\u09ae\u09c7\u09b8\u09c7\u09b0 \u0995\u09be\u099b\u09c7 \u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u09aa\u09be\u0993\u09a8\u09be",
    "netOwedToMess": "\u09b8\u09a6\u09b8\u09cd\u09af\u09a6\u09c7\u09b0 \u0995\u09be\u099b\u09c7 \u09ae\u09c7\u09b8\u09c7\u09b0 \u09aa\u09be\u0993\u09a8\u09be",
    "noMealsYet": "\u098f\u0996\u09a8\u0993 \u0995\u09cb\u09a8\u09cb \u0996\u09be\u09ac\u09be\u09b0 \u09b2\u0997 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09a8\u09bf \u2014 \u09b9\u09be\u09b0 \u09ac\u09c7\u09b0 \u0995\u09b0\u09be \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964",
    "noRate": "\u2014",
    "note": "\u09a8\u09cb\u099f (\u0990\u099a\u09cd\u099b\u09bf\u0995)",
    "perMeal": "/\u0996\u09be\u09ac\u09be\u09b0",
    "rateHeroTitle": "\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u0996\u09be\u09ac\u09be\u09b0\u09c7\u09b0 \u09b9\u09be\u09b0",
    "save": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3",
    "saveMeals": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09c1\u09a8",
    "sortedNote": "\u09b8\u09ac\u099a\u09c7\u09af\u09bc\u09c7 \u09ac\u09c7\u09b6\u09bf \u09ac\u0995\u09c7\u09af\u09bc\u09be \u09b8\u09a6\u09b8\u09cd\u09af \u09b8\u09ac\u09be\u09b0 \u0989\u09aa\u09b0\u09c7\u0964",
    "statAdvances": "\u09ae\u09cb\u099f \u0985\u0997\u09cd\u09b0\u09bf\u09ae",
    "statBazaar": "\u09ac\u09be\u099c\u09be\u09b0 \u0996\u09b0\u099a",
    "statMeals": "\u09ae\u09cb\u099f \u0996\u09be\u09ac\u09be\u09b0",
    "statMembers": "\u09b8\u09a6\u09b8\u09cd\u09af",
    "statNet": "\u09a8\u09bf\u099f \u09ac\u09cd\u09af\u09be\u09b2\u09c7\u09a8\u09cd\u09b8",
    "statRate": "\u0996\u09be\u09ac\u09be\u09b0\u09c7\u09b0 \u09b9\u09be\u09b0",
    "tabBazaar": "\u09ac\u09be\u099c\u09be\u09b0",
    "tabDashboard": "\u09a1\u09cd\u09af\u09be\u09b6\u09ac\u09cb\u09b0\u09cd\u09a1",
    "tabData": "\u09a1\u09c7\u099f\u09be",
    "tabMeals": "\u0996\u09be\u09ac\u09be\u09b0",
    "tabMembers": "\u09b8\u09a6\u09b8\u09cd\u09af",
    "today": "\u0986\u099c",
    "toggleActiveTitle": "\u09b8\u0995\u09cd\u09b0\u09bf\u09af\u09bc/\u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u09ac\u09a6\u09b2\u09be\u09a8"
  }
};

var APP_ID = "mess-manager-bd";
var STORAGE_KEY = "mess-manager-bd-v1";
var EXPORT_VERSION = 1;
var MAX_MEAL_SLOT = 5;
var MAX_NAME_LEN = 60;
var MAX_NOTE_LEN = 120;
var MAX_ADVANCE_BDT = 1000000;
var MAX_EXPENSE_BDT = 10000000;

function uid() {
  return "id-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1e9).toString(36);
}

function blankState() {
  return { members: [], mealDays: {}, expenses: [], settings: { lang: "en" } };
}

/* ---------------- dates ---------------- */

function pad2(n) { return (n < 10 ? "0" : "") + n; }

function todayISO(d) {
  d = d || new Date();
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

function isValidISODate(s) {
  if (typeof s !== "string") return false;
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  var y = +m[1], mo = +m[2], da = +m[3];
  if (mo < 1 || mo > 12 || da < 1 || da > 31) return false;
  var dt = new Date(y, mo - 1, da);
  return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === da;
}

// String comparison is safe for ISO dates. asof lets tests freeze "today".
function isFutureDate(s, asof) {
  var ref = asof || todayISO();
  return s > ref;
}

function validateDate(s, asof) {
  if (!isValidISODate(s)) return "errDateInvalid";
  if (isFutureDate(s, asof)) return "errDateFuture";
  return null;
}

/* ---------------- money (integer paisa) ---------------- */

// Parses a BDT amount string into integer paisa.
// Returns {ok:true, paisa} or {ok:false, err: "neg"|"bad"}.
function toPaisa(bdt) {
  var s = String(bdt == null ? "" : bdt).trim().replace(/,/g, "");
  if (/^-/.test(s)) return { ok: false, err: "neg" };
  if (!/^\d+(\.\d{1,2})?$/.test(s)) return { ok: false, err: "bad" };
  var parts = s.split(".");
  var paisa = parseInt(parts[0], 10) * 100 +
    (parts[1] ? parseInt((parts[1] + "00").slice(0, 2), 10) : 0);
  if (!isFinite(paisa)) return { ok: false, err: "bad" };
  return { ok: true, paisa: paisa };
}

var TAKA_SIGN = "\u09F3"; // U+09F3 Bengali taka sign
var BN_DIGITS = ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA",
                 "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"];

function bnDigits(s) {
  return String(s).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
}

function groupThousands(intStr) {
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// paisa: integer (may be negative). lang: "en" | "bn".
function fmtMoney(paisa, lang) {
  var neg = paisa < 0;
  var a = Math.abs(Math.round(paisa));
  var out = TAKA_SIGN + groupThousands(String(Math.floor(a / 100))) + "." + pad2(a % 100);
  if (neg) out = "-" + out;
  return lang === "bn" ? bnDigits(out) : out;
}

// Form-level BDT parsing with limit checks.
// errKinds: { neg, bad, max } -> caller maps to i18n keys.
function parseBDT(str, maxBDT) {
  var r = toPaisa(str);
  if (!r.ok) return { ok: false, err: r.err };
  if (r.paisa > maxBDT * 100) return { ok: false, err: "max" };
  return { ok: true, paisa: r.paisa };
}

/* ---------------- i18n ---------------- */

function t(lang, key, params) {
  var dict = (typeof I18N !== "undefined" && I18N[lang]) || {};
  var s = dict[key] !== undefined ? dict[key]
    : (typeof I18N !== "undefined" && I18N.en[key] !== undefined ? I18N.en[key] : key);
  if (params) {
    Object.keys(params).forEach(function (k) {
      s = s.split("{" + k + "}").join(String(params[k]));
    });
  }
  return s;
}

function i18nKeys() { return Object.keys(I18N.en).sort(); }

/* ---------------- members ---------------- */

function findMember(state, id) {
  for (var i = 0; i < state.members.length; i++) {
    if (state.members[i].id === id) return state.members[i];
  }
  return null;
}

function validateMemberName(name, members, excludeId) {
  var n = String(name == null ? "" : name).trim();
  if (!n) return "errNameEmpty";
  if (n.length > MAX_NAME_LEN) return "errNameLong";
  var low = n.toLowerCase();
  for (var i = 0; i < members.length; i++) {
    if (members[i].id !== excludeId && members[i].name.trim().toLowerCase() === low) {
      return "errNameDup";
    }
  }
  return null;
}

function addMember(state, name, advancePaisa) {
  var err = validateMemberName(name, state.members, null);
  if (err) return { ok: false, err: err };
  if (!Number.isInteger(advancePaisa) || advancePaisa < 0) return { ok: false, err: "errAdvanceNeg" };
  if (advancePaisa > MAX_ADVANCE_BDT * 100) return { ok: false, err: "errAdvanceMax" };
  var m = { id: uid(), name: String(name).trim(), advancePaisa: advancePaisa, active: true };
  state.members.push(m);
  return { ok: true, member: m };
}

function editMember(state, id, name, advancePaisa) {
  var m = findMember(state, id);
  if (!m) return { ok: false, err: "noMember" };
  var err = validateMemberName(name, state.members, id);
  if (err) return { ok: false, err: err };
  if (!Number.isInteger(advancePaisa) || advancePaisa < 0) return { ok: false, err: "errAdvanceNeg" };
  if (advancePaisa > MAX_ADVANCE_BDT * 100) return { ok: false, err: "errAdvanceMax" };
  m.name = String(name).trim();
  m.advancePaisa = advancePaisa;
  return { ok: true, member: m };
}

function deleteMember(state, id) {
  for (var i = 0; i < state.members.length; i++) {
    if (state.members[i].id === id) {
      state.members.splice(i, 1);
      return { ok: true };
    }
  }
  return { ok: false, err: "noMember" };
}

function setMemberActive(state, id, active) {
  var m = findMember(state, id);
  if (!m) return { ok: false, err: "noMember" };
  m.active = !!active;
  return { ok: true, member: m };
}

/* ---------------- meals ---------------- */

function validateMealSlot(n) {
  return Number.isInteger(n) && n >= 0 && n <= MAX_MEAL_SLOT;
}

// Sets one member's lunch/dinner for a date. 0/0 removes the entry.
function setMeals(state, dateISO, memberId, lunch, dinner, asof) {
  var derr = validateDate(dateISO, asof);
  if (derr) return { ok: false, err: derr };
  if (!findMember(state, memberId)) return { ok: false, err: "noMember" };
  if (!validateMealSlot(lunch) || !validateMealSlot(dinner)) return { ok: false, err: "errMealRange" };
  var day = state.mealDays[dateISO];
  if (lunch === 0 && dinner === 0) {
    if (day) {
      delete day[memberId];
      if (Object.keys(day).length === 0) delete state.mealDays[dateISO];
    }
  } else {
    if (!day) { day = {}; state.mealDays[dateISO] = day; }
    day[memberId] = { lunch: lunch, dinner: dinner };
  }
  return { ok: true };
}

function getDayMeals(state, dateISO) {
  return state.mealDays[dateISO] || {};
}

function dayTotalMeals(state, dateISO) {
  var t = 0, ids = memberIdSet(state), day = getDayMeals(state, dateISO);
  Object.keys(day).forEach(function (id) {
    if (ids[id]) t += (day[id].lunch | 0) + (day[id].dinner | 0);
  });
  return t;
}

function memberIdSet(state) {
  var s = {};
  state.members.forEach(function (m) { s[m.id] = 1; });
  return s;
}

// Meals of deleted members are excluded from totals (documented behavior).
function memberMeals(state, id) {
  var total = 0;
  Object.keys(state.mealDays).forEach(function (d) {
    var e = state.mealDays[d][id];
    if (e) total += (e.lunch | 0) + (e.dinner | 0);
  });
  return total;
}

function totalMeals(state) {
  var t = 0, ids = memberIdSet(state);
  Object.keys(state.mealDays).forEach(function (d) {
    Object.keys(state.mealDays[d]).forEach(function (id) {
      if (ids[id]) {
        var e = state.mealDays[d][id];
        t += (e.lunch | 0) + (e.dinner | 0);
      }
    });
  });
  return t;
}

/* ---------------- bazaar expenses ---------------- */

function addExpense(state, dateISO, note, amountPaisa, asof) {
  var derr = validateDate(dateISO, asof);
  if (derr) return { ok: false, err: derr };
  var n = String(note == null ? "" : note).trim();
  if (n.length > MAX_NOTE_LEN) return { ok: false, err: "errNoteLong" };
  if (!Number.isInteger(amountPaisa) || amountPaisa <= 0) return { ok: false, err: "errAmountPos" };
  if (amountPaisa > MAX_EXPENSE_BDT * 100) return { ok: false, err: "errAmountMax" };
  var e = { id: uid(), date: dateISO, note: n, amountPaisa: amountPaisa };
  state.expenses.push(e);
  return { ok: true, expense: e };
}

function deleteExpense(state, id) {
  for (var i = 0; i < state.expenses.length; i++) {
    if (state.expenses[i].id === id) {
      state.expenses.splice(i, 1);
      return { ok: true };
    }
  }
  return { ok: false, err: "noExpense" };
}

function expensesSorted(state) {
  return state.expenses.slice().sort(function (a, b) {
    return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0);
  });
}

function monthlyTotal(state, yyyyMM) {
  return state.expenses
    .filter(function (e) { return e.date.slice(0, 7) === yyyyMM; })
    .reduce(function (a, e) { return a + e.amountPaisa; }, 0);
}

/* ---------------- billing math ---------------- */

function totalCost(state) {
  return state.expenses.reduce(function (a, e) { return a + e.amountPaisa; }, 0);
}

// Paisa per meal (float). null when no meals logged (divide-by-zero guard).
function mealRatePaisa(state) {
  var tm = totalMeals(state);
  if (tm <= 0) return null;
  return totalCost(state) / tm;
}

function memberBillPaisa(state, id) {
  var r = mealRatePaisa(state);
  if (r == null) return 0;
  return Math.round(memberMeals(state, id) * r);
}

// Positive balance: mess owes the member (refund). Negative: member owes the mess.
function memberBalancePaisa(state, id) {
  var m = findMember(state, id);
  if (!m) return 0;
  return m.advancePaisa - memberBillPaisa(state, id);
}

// Sorted by balance ascending: biggest ower first. Ties by name.
function billSummary(state) {
  return state.members.map(function (m) {
    var meals = memberMeals(state, m.id);
    var bill = memberBillPaisa(state, m.id);
    return {
      id: m.id, name: m.name, active: m.active, meals: meals,
      bill: bill, advance: m.advancePaisa, balance: m.advancePaisa - bill
    };
  }).sort(function (a, b) {
    if (a.balance !== b.balance) return a.balance - b.balance;
    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
  });
}

function totalAdvances(state) {
  return state.members.reduce(function (a, m) { return a + m.advancePaisa; }, 0);
}

function totalBills(state) {
  return state.members.reduce(function (a, m) { return a + memberBillPaisa(state, m.id); }, 0);
}

function netBalance(state) {
  return totalAdvances(state) - totalBills(state);
}

/* ---------------- export / import ---------------- */

function exportJSON(state) {
  return JSON.stringify({
    app: APP_ID,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      members: state.members,
      mealDays: state.mealDays,
      expenses: state.expenses,
      settings: state.settings
    }
  });
}

function isInt(n) { return Number.isInteger(n); }

function validateImport(obj) {
  var errors = [];
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return { ok: false, errors: ["root"] };
  if (obj.app !== APP_ID) errors.push("app");
  if (obj.version !== EXPORT_VERSION) errors.push("version");
  var d = obj.data;
  if (!d || typeof d !== "object" || Array.isArray(d)) {
    errors.push("data");
  } else {
    // members
    if (!Array.isArray(d.members)) {
      errors.push("members");
    } else {
      var seenIds = {}, seenNames = {};
      d.members.forEach(function (m, i) {
        var p = "members[" + i + "]";
        if (!m || typeof m !== "object") { errors.push(p); return; }
        if (typeof m.id !== "string" || !m.id) errors.push(p + ".id");
        else if (seenIds[m.id]) errors.push(p + ".id.dup"); else seenIds[m.id] = 1;
        var nm = typeof m.name === "string" ? m.name.trim() : "";
        if (!nm || nm.length > MAX_NAME_LEN) errors.push(p + ".name");
        else { var low = nm.toLowerCase(); if (seenNames[low]) errors.push(p + ".name.dup"); else seenNames[low] = 1; }
        if (!isInt(m.advancePaisa) || m.advancePaisa < 0 || m.advancePaisa > MAX_ADVANCE_BDT * 100) errors.push(p + ".advancePaisa");
        if (typeof m.active !== "boolean") errors.push(p + ".active");
      });
    }
    // mealDays
    if (!d.mealDays || typeof d.mealDays !== "object" || Array.isArray(d.mealDays)) {
      errors.push("mealDays");
    } else {
      Object.keys(d.mealDays).forEach(function (date) {
        if (!isValidISODate(date)) { errors.push("mealDays." + date + ".date"); return; }
        var per = d.mealDays[date];
        if (!per || typeof per !== "object" || Array.isArray(per)) { errors.push("mealDays." + date); return; }
        Object.keys(per).forEach(function (mid) {
          var e = per[mid];
          if (!e || typeof e !== "object" || !validateMealSlot(e.lunch) || !validateMealSlot(e.dinner)) {
            errors.push("mealDays." + date + "." + mid);
          }
        });
      });
    }
    // expenses
    if (!Array.isArray(d.expenses)) {
      errors.push("expenses");
    } else {
      var seenE = {};
      d.expenses.forEach(function (e, i) {
        var p = "expenses[" + i + "]";
        if (!e || typeof e !== "object") { errors.push(p); return; }
        if (typeof e.id !== "string" || !e.id) errors.push(p + ".id");
        else if (seenE[e.id]) errors.push(p + ".id.dup"); else seenE[e.id] = 1;
        if (!isValidISODate(e.date)) errors.push(p + ".date");
        var nt = e.note == null ? "" : e.note;
        if (typeof nt !== "string" || nt.trim().length > MAX_NOTE_LEN) errors.push(p + ".note");
        if (!isInt(e.amountPaisa) || e.amountPaisa <= 0 || e.amountPaisa > MAX_EXPENSE_BDT * 100) errors.push(p + ".amountPaisa");
      });
    }
    // settings
    if (!d.settings || (d.settings.lang !== "en" && d.settings.lang !== "bn")) errors.push("settings.lang");
  }
  if (errors.length) return { ok: false, errors: errors };
  var st = blankState();
  st.members = d.members.map(function (m) {
    return { id: m.id, name: m.name.trim(), advancePaisa: m.advancePaisa, active: m.active };
  });
  st.mealDays = d.mealDays;
  st.expenses = d.expenses.map(function (e) {
    return { id: e.id, date: e.date, note: String(e.note == null ? "" : e.note).trim(), amountPaisa: e.amountPaisa };
  });
  st.settings = { lang: d.settings.lang };
  return { ok: true, state: st };
}

function importJSON(text) {
  var obj;
  try { obj = JSON.parse(text); }
  catch (e) { return { ok: false, errors: ["parse"] }; }
  return validateImport(obj);
}

/* ---------------- storage ---------------- */

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) { return false; }
}

// Returns {state, corrupt}. Corrupt/unreadable storage -> fresh state + corrupt:true.
function loadState() {
  var raw = null;
  try { raw = localStorage.getItem(STORAGE_KEY); }
  catch (e) { return { state: blankState(), corrupt: false }; }
  if (!raw) return { state: blankState(), corrupt: false };
  var obj;
  try { obj = JSON.parse(raw); }
  catch (e) { return { state: blankState(), corrupt: true }; }
  var v = validateImport({ app: APP_ID, version: EXPORT_VERSION, data: obj });
  if (!v.ok) return { state: blankState(), corrupt: true };
  return { state: v.state, corrupt: false };
}

/* ---------------- exports ---------------- */

var API = {
  APP_ID: APP_ID, STORAGE_KEY: STORAGE_KEY, EXPORT_VERSION: EXPORT_VERSION,
  MAX_MEAL_SLOT: MAX_MEAL_SLOT, MAX_NAME_LEN: MAX_NAME_LEN, MAX_NOTE_LEN: MAX_NOTE_LEN,
  MAX_ADVANCE_BDT: MAX_ADVANCE_BDT, MAX_EXPENSE_BDT: MAX_EXPENSE_BDT,
  TAKA_SIGN: TAKA_SIGN, BN_DIGITS: BN_DIGITS,
  uid: uid, blankState: blankState,
  pad2: pad2, todayISO: todayISO, isValidISODate: isValidISODate,
  isFutureDate: isFutureDate, validateDate: validateDate,
  toPaisa: toPaisa, parseBDT: parseBDT, bnDigits: bnDigits, fmtMoney: fmtMoney,
  groupThousands: groupThousands,
  t: t, i18nKeys: i18nKeys,
  findMember: findMember, validateMemberName: validateMemberName,
  addMember: addMember, editMember: editMember, deleteMember: deleteMember,
  setMemberActive: setMemberActive,
  validateMealSlot: validateMealSlot, setMeals: setMeals,
  getDayMeals: getDayMeals, dayTotalMeals: dayTotalMeals,
  memberMeals: memberMeals, totalMeals: totalMeals,
  addExpense: addExpense, deleteExpense: deleteExpense,
  expensesSorted: expensesSorted, monthlyTotal: monthlyTotal,
  totalCost: totalCost, mealRatePaisa: mealRatePaisa,
  memberBillPaisa: memberBillPaisa, memberBalancePaisa: memberBalancePaisa,
  billSummary: billSummary, totalAdvances: totalAdvances,
  totalBills: totalBills, netBalance: netBalance,
  exportJSON: exportJSON, validateImport: validateImport, importJSON: importJSON,
  saveState: saveState, loadState: loadState
};

if (typeof module !== "undefined" && module.exports) module.exports = API;
if (typeof window !== "undefined") window.MessManager = API;
