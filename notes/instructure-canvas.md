---
title: Instructure Canvas
---

## [WIP] Basic Dark Mode Stylesheet

```css

:root {
    --tm-bg: #333333;
    --tm-col: #EEEEEE;
    --tm-href: #42d3ff;
}
a {
    color: var(--tm-href);
}
body,
#breadcrumbs,
.yyQPt_cSXm,
.Grouping-styles__title,
.ic-Dashboard-header__layout,
.with-left-side #left-side,
.PlannerHeader-styles__root,
.PlannerItem-styles__root,
.EmptyDays-styles__root,
.fLzZc_bGBk,
.jpyTq_bGBk,
.eoNrR_blJt,
.dLyYq_bXiG,
.Day-styles__root {
    color: var(--tm-col);
    background-color: var(--tm-bg);
}
.dLyYq_bGBk {
    background-color: transparent;
}
.Grouping-styles__title::after {
    display: none
}

.eHiXd_dnnz,
a.eHiXd_dnnz,
button.eHiXd_dnnz,
button.eHiXd_dnnz[type="button"],
button.eHiXd_dnnz[type="reset"],
button.eHiXd_dnnz[type="submit"] {
    color: var(--tm-col);
}

.eHiXd_eYmo,
a.eHiXd_eYmo,
button.eHiXd_eYmo,
button.eHiXd_eYmo[type="button"],
button.eHiXd_eYmo[type="reset"],
button.eHiXd_eYmo[type="submit"] {
    background: var(--tm-bg);
    border-color: var(--tm-col);
    color: var(--tm-col);
}

.PlannerItem-styles__due,
.PlannerItem-styles__score {
    color: var(--tm-col);
}
.eHiXd_brAJ,
a.eHiXd_brAJ,
button.eHiXd_brAJ,
button.eHiXd_brAJ[type="button"],
button.eHiXd_brAJ[type="reset"],
button.eHiXd_brAJ[type="submit"] {
    color: var(--tm-href);
}

.yyQPt_cSXm {
    color: var(--tm-bg);
}

```