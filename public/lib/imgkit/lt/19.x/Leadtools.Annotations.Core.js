/**************************************************
 LEADTOOLS (C) 1991-2017 LEAD Technologies, Inc. ALL RIGHTS RESERVED.
 This software is protected by United States and International copyright laws.
 Any copying, duplication, deployment, redistribution, modification or other
 disposition hereof is STRICTLY PROHIBITED without an express written license
 granted by LEAD Technologies, Inc.. This notice may not be removed or otherwise
 altered under any circumstances.
 Portions of this product are licensed under US patent 5,327,254 and foreign
 counterparts.
 For more information, contact LEAD Technologies, Inc. at 704-332-5532 or visit
 https://www.leadtools.com
 **************************************************/
// Leadtools.Annotations.Core.js
// Version:19.0.0.51
(function () {
    Type.registerNamespace("lt.Annotations.Core");
    window.lt.Annotations.Core._lT_VersionNumber = function () {
    };
    lt.Annotations.Core._leadRectDExtensions = function () {
    };
    lt.Annotations.Core._leadRectDExtensions.inflate = function (a, b, c) {
        a.inflate(b, c);
        return a
    };
    lt.Annotations.Core._leadRectDExtensions.intersectRects = function (a, b) {
        return lt.LeadRectD.intersectRects(a, b)
    };
    lt.Annotations.Core._leadRectDExtensions.intersectsWith = function (a, b) {
        var c = !1;
        return c = a.intersectsWith(b)
    };
    lt.Annotations.Core._leadRectDExtensions.create =
        function (a, b, c, d) {
            return lt.LeadRectD.create(a, b, c, d)
        };
    lt.Annotations.Core._leadRectDExtensions.unionRects = function (a, b) {
        return lt.LeadRectD.unionRects(a, b)
    };
    lt.Annotations.Core._leadRectDExtensions.unionPoint = function (a, b) {
        return lt.Annotations.Core._leadRectDExtensions.unionRects(a, lt.LeadRectD.create(b.get_x(), b.get_y(), 0, 0))
    };
    lt.Annotations.Core._leadRectDExtensions.clone = function (a) {
        return a.clone()
    };
    lt.Annotations.Core._leadRectDExtensions.isEmpty = function (a) {
        return a.get_isEmpty()
    };
    lt.Annotations.Core._leadRectDExtensions.fromLTRB =
        function (a, b, c, d) {
            return lt.LeadRectD.fromLTRB(a, b, c, d)
        };
    lt.Annotations.Core._leadRectDExtensions.get_empty = function () {
        return lt.LeadRectD.get_empty()
    };
    lt.Annotations.Core._leadRectDExtensions.containsRect = function (a, b) {
        return a.containsRect(b)
    };
    lt.Annotations.Core._leadRectDExtensions.containsPoint = function (a, b) {
        return a.containsPoint(b)
    };
    lt.Annotations.Core._leadRectDExtensions.topLeft = function (a) {
        return a.get_topLeft()
    };
    lt.Annotations.Core._leadRectDExtensions.topRight = function (a) {
        return a.get_topRight()
    };
    lt.Annotations.Core._leadRectDExtensions.bottomLeft = function (a) {
        return a.get_bottomLeft()
    };
    lt.Annotations.Core._leadRectDExtensions.bottomRight = function (a) {
        return a.get_bottomRight()
    };
    lt.Annotations.Core._leadRectDExtensions.top = function (a) {
        return a.get_top()
    };
    lt.Annotations.Core._leadRectDExtensions.left = function (a) {
        return a.get_left()
    };
    lt.Annotations.Core._leadRectDExtensions.bottom = function (a) {
        return a.get_bottom()
    };
    lt.Annotations.Core._leadRectDExtensions.right = function (a) {
        return a.get_right()
    };
    lt.Annotations.Core._leadRectDExtensions.equals = function (a, b) {
        return a === b
    };
    lt.Annotations.Core._leadPointDExtensions = function () {
    };
    lt.Annotations.Core._leadPointDExtensions.create = function (a, b) {
        return lt.LeadPointD.create(a, b)
    };
    lt.Annotations.Core._leadPointDExtensions.isEqual = function (a, b) {
        return a === b
    };
    lt.Annotations.Core._leadPointDExtensions.clone = function (a) {
        return a.clone()
    };
    lt.Annotations.Core._leadPointDExtensions.get_empty = function () {
        return lt.LeadPointD.get_empty()
    };
    lt.Annotations.Core._leadPointDExtensions.isEmpty =
        function (a) {
            return a.get_isEmpty()
        };
    lt.Annotations.Core._leadLengthDExtensions = function () {
    };
    lt.Annotations.Core._leadLengthDExtensions.isEqual = function (a, b) {
        return a === b
    };
    lt.Annotations.Core._leadLengthDExtensions.create = function (a) {
        return lt.LeadLengthD.create(a)
    };
    lt.Annotations.Core._leadLengthDExtensions.clone = function (a) {
        return a.clone()
    };
    lt.Annotations.Core._leadSizeDExtensions = function () {
    };
    lt.Annotations.Core._leadSizeDExtensions.create = function (a, b) {
        return lt.LeadSizeD.create(a, b)
    };
    lt.Annotations.Core._leadSizeDExtensions.clone =
        function (a) {
            return a.clone()
        };
    lt.Annotations.Core._leadSizeDExtensions.get_empty = function () {
        return lt.LeadSizeD.get_empty()
    };
    lt.Annotations.Core._leadSizeDExtensions.isEmpty = function (a) {
        return a.get_isEmpty()
    };
    lt.Annotations.Core.PointType = function () {
    };
    lt.Annotations.Core.PointType.prototype = {none: 0, closeFigure: 1, lineTo: 2, bezierTo: 4, moveTo: 6};
    lt.Annotations.Core.PointType.registerEnum("lt.Annotations.Core.PointType", !0);
    lt.Annotations.Core.ScrambleImageFlags = function () {
    };
    lt.Annotations.Core.ScrambleImageFlags.prototype =
    {
        none: 0,
        encrypt: 1,
        decrypt: 2,
        intersect: 4,
        reserved3: 8,
        reserved4: 16,
        reserved5: 32,
        reserved6: 64,
        reserved7: 128,
        reserved8: 256,
        reserved9: 512,
        allflags: 767
    };
    lt.Annotations.Core.ScrambleImageFlags.registerEnum("lt.Annotations.Core.ScrambleImageFlags", !1);
    lt.Annotations.Core.AnnFormat = function () {
    };
    lt.Annotations.Core.AnnFormat.prototype = {unknown: 0, annotations: 1};
    lt.Annotations.Core.AnnFormat.registerEnum("lt.Annotations.Core.AnnFormat", !1);
    lt.Annotations.Core.AnnHitTestBehavior = function () {
    };
    lt.Annotations.Core.AnnHitTestBehavior.prototype =
    {intersects: 0, contains: 1};
    lt.Annotations.Core.AnnHitTestBehavior.registerEnum("lt.Annotations.Core.AnnHitTestBehavior", !1);
    lt.Annotations.Core.AnnKeys = function () {
    };
    lt.Annotations.Core.AnnKeys.prototype = {
        none: 0,
        back: 8,
        tab: 9,
        enter: 13,
        shiftKey: 16,
        controlKey: 17,
        menu: 18,
        escape: 27,
        space: 32,
        insert: 45,
        deleteKey: 46,
        alt: 262144,
        shift: 65536,
        control: 131072,
        keyCode: 65535,
        modifiers: -65536
    };
    lt.Annotations.Core.AnnKeys.registerEnum("lt.Annotations.Core.AnnKeys", !1);
    lt.Annotations.Core.AnnPointerPosition = function () {
    };
    lt.Annotations.Core.AnnPointerPosition.prototype = {start: 0, end: 1};
    lt.Annotations.Core.AnnPointerPosition.registerEnum("lt.Annotations.Core.AnnPointerPosition", !1);
    lt.Annotations.Core.AnnTextDecorations = function () {
    };
    lt.Annotations.Core.AnnTextDecorations.prototype = {
        none: 0,
        baseline: 1,
        overLine: 2,
        strikethrough: 4,
        underline: 8
    };
    lt.Annotations.Core.AnnTextDecorations.registerEnum("lt.Annotations.Core.AnnTextDecorations", !0);
    lt.Annotations.Core.AnnUserMode = function () {
    };
    lt.Annotations.Core.AnnUserMode.prototype =
    {design: 0, run: 1, render: 2};
    lt.Annotations.Core.AnnUserMode.registerEnum("lt.Annotations.Core.AnnUserMode", !1);
    lt.Annotations.Core.AnnFixedStateOperations = function () {
    };
    lt.Annotations.Core.AnnFixedStateOperations.prototype = {
        none: 0,
        scrolling: 1,
        zooming: 2,
        fontSize: 4,
        strokeWidth: 8,
        lengthValue: 16
    };
    lt.Annotations.Core.AnnFixedStateOperations.registerEnum("lt.Annotations.Core.AnnFixedStateOperations", !0);
    lt.Annotations.Core.AnnNotifyCollectionChangedAction = function () {
    };
    lt.Annotations.Core.AnnNotifyCollectionChangedAction.prototype =
    {add: 0, remove: 1, replace: 2, move: 3, reset: 4};
    lt.Annotations.Core.AnnNotifyCollectionChangedAction.registerEnum("lt.Annotations.Core.AnnNotifyCollectionChangedAction", !1);
    lt.Annotations.Core.AnnFontWeight = function () {
    };
    lt.Annotations.Core.AnnFontWeight.prototype = {
        normal: 0,
        thin: 1,
        extraLight: 2,
        light: 3,
        medium: 4,
        semiBold: 5,
        bold: 6,
        extraBold: 7,
        black: 8,
        extraBlack: 9
    };
    lt.Annotations.Core.AnnFontWeight.registerEnum("lt.Annotations.Core.AnnFontWeight", !1);
    lt.Annotations.Core.AnnFontStyle = function () {
    };
    lt.Annotations.Core.AnnFontStyle.prototype =
    {normal: 0, italic: 1, oblique: 2};
    lt.Annotations.Core.AnnFontStyle.registerEnum("lt.Annotations.Core.AnnFontStyle", !1);
    lt.Annotations.Core.AnnFontStretch = function () {
    };
    lt.Annotations.Core.AnnFontStretch.prototype = {
        normal: 0,
        ultraCondensed: 1,
        extraCondensed: 2,
        condensed: 3,
        semiCondensed: 4,
        semiExpanded: 5,
        expanded: 6,
        extraExpanded: 7,
        ultraExpanded: 8
    };
    lt.Annotations.Core.AnnFontStretch.registerEnum("lt.Annotations.Core.AnnFontStretch", !1);
    lt.Annotations.Core.AnnMouseButton = function () {
    };
    lt.Annotations.Core.AnnMouseButton.prototype =
    {none: 0, left: 1, right: 2, middle: 3};
    lt.Annotations.Core.AnnMouseButton.registerEnum("lt.Annotations.Core.AnnMouseButton", !1);
    lt.Annotations.Core.AnnUnit = function () {
    };
    lt.Annotations.Core.AnnUnit.prototype = {
        unit: 0,
        display: 1,
        document: 2,
        smartEnglish: 3,
        smartMetric: 4,
        inch: 5,
        millimeter: 6,
        point: 7,
        feet: 8,
        yard: 9,
        micrometer: 10,
        centimeter: 11,
        meter: 12,
        twip: 13,
        pixel: 14
    };
    lt.Annotations.Core.AnnUnit.registerEnum("lt.Annotations.Core.AnnUnit", !1);
    lt.Annotations.Core.AnnDesignerOperationStatus = function () {
    };
    lt.Annotations.Core.AnnDesignerOperationStatus.prototype =
    {idle: 0, start: 1, working: 2, end: 3, canceled: 4};
    lt.Annotations.Core.AnnDesignerOperationStatus.registerEnum("lt.Annotations.Core.AnnDesignerOperationStatus", !1);
    lt.Annotations.Core.AnnEditDesignerOperation = function () {
    };
    lt.Annotations.Core.AnnEditDesignerOperation.prototype = {
        none: 0,
        moveThumb: 1,
        move: 2,
        moveName: 3,
        rotate: 4,
        moveRotateCenterThumb: 5,
        moveRotateGripperThumb: 6
    };
    lt.Annotations.Core.AnnEditDesignerOperation.registerEnum("lt.Annotations.Core.AnnEditDesignerOperation", !1);
    lt.Annotations.Core.AnnAngularUnit =
        function () {
        };
    lt.Annotations.Core.AnnAngularUnit.prototype = {radian: 0, degree: 1};
    lt.Annotations.Core.AnnAngularUnit.registerEnum("lt.Annotations.Core.AnnAngularUnit", !1);
    lt.Annotations.Core.AnnFillRule = function () {
    };
    lt.Annotations.Core.AnnFillRule.prototype = {evenOdd: 0, nonzero: 1};
    lt.Annotations.Core.AnnFillRule.registerEnum("lt.Annotations.Core.AnnFillRule", !1);
    lt.Annotations.Core.AnnTextRotate = function () {
    };
    lt.Annotations.Core.AnnTextRotate.prototype = {rotate0: 0, rotate90: 1, rotate180: 2, rotate270: 3};
    lt.Annotations.Core.AnnTextRotate.registerEnum("lt.Annotations.Core.AnnTextRotate",
        !1);
    lt.Annotations.Core.AnnHorizontalAlignment = function () {
    };
    lt.Annotations.Core.AnnHorizontalAlignment.prototype = {left: 0, center: 1, right: 2};
    lt.Annotations.Core.AnnHorizontalAlignment.registerEnum("lt.Annotations.Core.AnnHorizontalAlignment", !1);
    lt.Annotations.Core.AnnVerticalAlignment = function () {
    };
    lt.Annotations.Core.AnnVerticalAlignment.prototype = {top: 0, center: 1, bottom: 2};
    lt.Annotations.Core.AnnVerticalAlignment.registerEnum("lt.Annotations.Core.AnnVerticalAlignment", !1);
    lt.Annotations.Core.AnnStrokeLineCap =
        function () {
        };
    lt.Annotations.Core.AnnStrokeLineCap.prototype = {flat: 0, square: 1, round: 2, triangle: 3};
    lt.Annotations.Core.AnnStrokeLineCap.registerEnum("lt.Annotations.Core.AnnStrokeLineCap", !1);
    lt.Annotations.Core.AnnStrokeLineJoin = function () {
    };
    lt.Annotations.Core.AnnStrokeLineJoin.prototype = {miter: 0, bevel: 1, round: 2, miterClipped: 3};
    lt.Annotations.Core.AnnStrokeLineJoin.registerEnum("lt.Annotations.Core.AnnStrokeLineJoin", !1);
    lt.Annotations.Core.AnnTransparentMode = function () {
    };
    lt.Annotations.Core.AnnTransparentMode.prototype =
    {none: 0, useColor: 1, topLeftPixel: 2};
    lt.Annotations.Core.AnnTransparentMode.registerEnum("lt.Annotations.Core.AnnTransparentMode", !1);
    lt.Annotations.Core.AnnRubberStampType = function () {
    };
    lt.Annotations.Core.AnnRubberStampType.prototype = {
        stampApproved: 0,
        stampAssigned: 1,
        stampChecked: 2,
        stampClient: 3,
        stampCopy: 4,
        stampDraft: 5,
        stampExtended: 6,
        stampFax: 7,
        stampFaxed: 8,
        stampImportant: 9,
        stampInvoice: 10,
        stampNotice: 11,
        stampOfficial: 12,
        stampOnFile: 13,
        stampPaid: 14,
        stampPassed: 15,
        stampPending: 16,
        stampProcessed: 17,
        stampReceived: 18,
        stampRejected: 19,
        stampRelease: 20,
        stampSent: 21,
        stampShipped: 22,
        stampTopSecret: 23,
        stampUrgent: 24,
        stampVoid: 25
    };
    lt.Annotations.Core.AnnRubberStampType.registerEnum("lt.Annotations.Core.AnnRubberStampType", !1);
    lt.Annotations.Core.AnnResizeMode = function () {
    };
    lt.Annotations.Core.AnnResizeMode.prototype = {fit: 0, fitAlways: 1, fitWidth: 2, fitHeight: 3, stretch: 4};
    lt.Annotations.Core.AnnResizeMode.registerEnum("lt.Annotations.Core.AnnResizeMode", !1);
    lt.Annotations.Core.AnnResizeContainerFlags = function () {
    };
    lt.Annotations.Core.AnnResizeContainerFlags.prototype = {none: 0, resizeObjects: 1, autoCalibrate: 2};
    lt.Annotations.Core.AnnResizeContainerFlags.registerEnum("lt.Annotations.Core.AnnResizeContainerFlags", !0);
    lt.Annotations.Core.AnnLabelRestriction = function () {
    };
    lt.Annotations.Core.AnnLabelRestriction.prototype = {
        none: 0,
        restrictToContainer: 1,
        restrictToObjectBounds: 2,
        restrictToUserRect: 4
    };
    lt.Annotations.Core.AnnLabelRestriction.registerEnum("lt.Annotations.Core.AnnLabelRestriction", !0);
    lt.Annotations.Core.AnnLabelPositionMode =
        function () {
        };
    lt.Annotations.Core.AnnLabelPositionMode.prototype = {normal: 0, relativeToObject: 1};
    lt.Annotations.Core.AnnLabelPositionMode.registerEnum("lt.Annotations.Core.AnnLabelPositionMode", !1);
    lt.Annotations.Core.AnnRenderState = function () {
    };
    lt.Annotations.Core.AnnRenderState.prototype = {none: 0, lock: 1, content: 2, label: 4, all: 7};
    lt.Annotations.Core.AnnRenderState.registerEnum("lt.Annotations.Core.AnnRenderState", !0);
    lt.Annotations.Core.AnnHatchStyle = function () {
    };
    lt.Annotations.Core.AnnHatchStyle.prototype =
    {horizontal: 0, vertical: 1, forwardDiagonal: 2, backwardDiagonal: 3, cross: 4, diagonalCross: 5};
    lt.Annotations.Core.AnnHatchStyle.registerEnum("lt.Annotations.Core.AnnHatchStyle", !1);
    lt.Annotations.Core.AnnLinearGradientMode = function () {
    };
    lt.Annotations.Core.AnnLinearGradientMode.prototype = {horizontal: 0, vertical: 1, diagonal: 2};
    lt.Annotations.Core.AnnLinearGradientMode.registerEnum("lt.Annotations.Core.AnnLinearGradientMode", !1);
    lt.Annotations.Core.AnnSizeMode = function () {
    };
    lt.Annotations.Core.AnnSizeMode.prototype =
    {actualSize: 0, stretch: 1};
    lt.Annotations.Core.AnnSizeMode.registerEnum("lt.Annotations.Core.AnnSizeMode", !1);
    lt.Annotations.Core.AnnStrokeAlignment = function () {
    };
    lt.Annotations.Core.AnnStrokeAlignment.prototype = {center: 0, inset: 1};
    lt.Annotations.Core.AnnStrokeAlignment.registerEnum("lt.Annotations.Core.AnnStrokeAlignment", !1);
    lt.Annotations.Core.PropertyChangedStatus = function () {
    };
    lt.Annotations.Core.PropertyChangedStatus.prototype = {after: 0, before: 1};
    lt.Annotations.Core.PropertyChangedStatus.registerEnum("lt.Annotations.Core.PropertyChangedStatus",
        !1);
    lt.Annotations.Core.AnnOperationType = function () {
    };
    lt.Annotations.Core.AnnOperationType.prototype = {
        createObjects: 0,
        deleteObjects: 1,
        editObjects: 2,
        lockObjects: 3,
        unlockObjects: 4,
        realizeRedact: 5,
        restoreRedact: 6,
        save: 7,
        load: 8,
        burnObjects: 9,
        copyObjects: 10,
        pasteObjects: 11,
        encryptObjects: 12,
        decryptObjects: 13,
        renderingObjects: 14,
        hitTestObjects: 15
    };
    lt.Annotations.Core.AnnOperationType.registerEnum("lt.Annotations.Core.AnnOperationType", !1);
    lt.Annotations.Core.IAnnAutomationControl = function () {
    };
    lt.Annotations.Core.IAnnAutomationControl.prototype =
    {
        get_automationDpiX: null,
        get_automationDpiY: null,
        get_automationXResolution: null,
        get_automationYResolution: null,
        get_automationTransform: null,
        get_automationUseDpi: null,
        get_automationEnabled: null,
        add_automationEnabledChanged: null,
        remove_automationEnabledChanged: null,
        add_automationSizeChanged: null,
        remove_automationSizeChanged: null,
        add_automationTransformChanged: null,
        remove_automationTransformChanged: null,
        add_automationUseDpiChanged: null,
        remove_automationUseDpiChanged: null,
        add_automationPointerDown: null,
        remove_automationPointerDown: null,
        add_automationPointerMove: null,
        remove_automationPointerMove: null,
        add_automationPointerUp: null,
        remove_automationPointerUp: null,
        add_automationDoubleClick: null,
        remove_automationDoubleClick: null,
        add_automationLostFocus: null,
        remove_automationLostFocus: null,
        add_automationGotFocus: null,
        remove_automationGotFocus: null,
        automationAttach: null,
        automationDetach: null,
        automationInvalidate: null,
        get_renderingEngine: null,
        set_renderingEngine: null,
        get_automationDataProvider: null,
        set_automationDataProvider: null,
        get_automationAntiAlias: null,
        set_automationAntiAlias: null,
        onAutomationPointerDown: null,
        onAutomationPointerMove: null,
        onAutomationPointerUp: null,
        onAutomationDoubleClick: null,
        get_automationGetContainersCallback: null,
        set_automationGetContainersCallback: null,
        get_automationContainerIndex: null,
        set_automationContainerIndex: null,
        get_automationObject: null,
        set_automationObject: null,
        get_automationScrollOffset: null
    };
    lt.Annotations.Core.IAnnAutomationControl.registerInterface("lt.Annotations.Core.IAnnAutomationControl");
    lt.Annotations.Core.IAnnObjectCloneable = function () {
    };
    lt.Annotations.Core.IAnnObjectCloneable.prototype = {clone: null};
    lt.Annotations.Core.IAnnObjectCloneable.registerInterface("lt.Annotations.Core.IAnnObjectCloneable");
    lt.Annotations.Core.IAnnLabelRenderer = function () {
    };
    lt.Annotations.Core.IAnnLabelRenderer.prototype = {
        get_renderingEngine: null,
        get_offsetHeight: null,
        set_offsetHeight: null,
        initialize: null,
        renderLabel: null,
        getBounds: null
    };
    lt.Annotations.Core.IAnnLabelRenderer.registerInterface("lt.Annotations.Core.IAnnLabelRenderer");
    lt.Annotations.Core.IAnnObjectRenderer = function () {
    };
    lt.Annotations.Core.IAnnObjectRenderer.prototype = {
        get_locationsThumbStyle: null,
        set_locationsThumbStyle: null,
        get_rotateCenterThumbStyle: null,
        set_rotateCenterThumbStyle: null,
        get_rotateGripperThumbStyle: null,
        set_rotateGripperThumbStyle: null,
        get_renderingEngine: null,
        get_labelRenderer: null,
        set_labelRenderer: null,
        initialize: null,
        getRenderPoints: null,
        render: null,
        renderThumbs: null,
        renderRotatePointThumbs: null,
        renderLocked: null,
        renderContent: null,
        renderSelection: null,
        renderAlignmentTarget: null,
        addObject: null,
        removeObject: null
    };
    lt.Annotations.Core.IAnnObjectRenderer.registerInterface("lt.Annotations.Core.IAnnObjectRenderer");
    lt.Annotations.Core.IAnnThumbStyle = function () {
    };
    lt.Annotations.Core.IAnnThumbStyle.prototype = {
        get_fill: null,
        set_fill: null,
        get_stroke: null,
        set_stroke: null,
        get_size: null,
        set_size: null,
        get_isVisible: null,
        set_isVisible: null,
        get_renderer: null,
        set_renderer: null,
        hitTest: null,
        renderHitTest: null,
        render: null
    };
    lt.Annotations.Core.IAnnThumbStyle.registerInterface("lt.Annotations.Core.IAnnThumbStyle");
    lt.Annotations.Core.AnnUnitConverter = function () {
    };
    lt.Annotations.Core.AnnUnitConverter.get_smartEnglishMaximumUnit = function () {
        return lt.Annotations.Core.AnnUnitConverter._smartEnglishMaximumUnit
    };
    lt.Annotations.Core.AnnUnitConverter.set_smartEnglishMaximumUnit = function (a) {
        1 === (1 === (1 === (9 === a | 8 === a) | 5 === a) | 3 === a) ? lt.Annotations.Core.AnnUnitConverter._smartEnglishMaximumUnit = a : lt.Annotations.Core.ExceptionHelper.invalidOperationException("The allowed values are (Yard,Feet,Inch,Smart English)");
        return a
    };
    lt.Annotations.Core.AnnUnitConverter.get_smartMetricMaximumUnit = function () {
        return lt.Annotations.Core.AnnUnitConverter._smartMetricMaximumUnit
    };
    lt.Annotations.Core.AnnUnitConverter.set_smartMetricMaximumUnit = function (a) {
        1 === (1 === (1 === (1 === (12 === a | 11 === a) | 6 === a) | 10 === a) | 4 === a) ? lt.Annotations.Core.AnnUnitConverter._smartMetricMaximumUnit = a : lt.Annotations.Core.ExceptionHelper.invalidOperationException("The allowed values are (Meter,Centimeter,Millimeter,Micrometer,Smart Metric)");
        return a
    };
    lt.Annotations.Core.AnnUnitConverter.getUnits =
        function () {
            var a = {};
            a[11] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(11);
            a[1] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(1);
            a[2] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(2);
            a[8] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(8);
            a[5] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(5);
            a[12] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(12);
            a[10] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(10);
            a[6] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(6);
            a[7] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(7);
            a[3] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(3);
            a[4] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(4);
            a[13] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(13);
            a[0] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(0);
            a[9] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(9);
            a[14] = lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation(14);
            return a
        };
    lt.Annotations.Core.AnnUnitConverter.setUnitAbbreviation =
        function (a, b) {
            return lt.Annotations.Core.AnnUnitConverter._unitsAbbreveations[a] = b
        };
    lt.Annotations.Core.AnnUnitConverter.getUnitAbbreviation = function (a) {
        return lt.Annotations.Core.AnnUnitConverter._unitsAbbreveations[a]
    };
    lt.Annotations.Core.AnnUnitConverter.getAngularUnitAbbreviation = function (a) {
        return lt.Annotations.Core.AnnUnitConverter._angularUnitsabbreveation[a]
    };
    lt.Annotations.Core.AnnUnitConverter.convert = function (a, b, c) {
        return lt.Annotations.Core.AnnUnitConverter._unitRatio[c] / lt.Annotations.Core.AnnUnitConverter._unitRatio[b] *
            a
    };
    lt.Annotations.Core.AnnUnitConverter.convertToPixels = function (a, b, c) {
        0 >= c && (c = 96);
        var d = a;
        5 !== b && (d = lt.Annotations.Core.AnnUnitConverter.convert(a, b, 5));
        return d * c
    };
    lt.Annotations.Core.AnnUnitConverter.convertFromPixels = function (a, b, c) {
        0 >= c && (c = 96);
        a /= c;
        5 !== b && (a = lt.Annotations.Core.AnnUnitConverter.convert(a, 5, b));
        return a
    };
    lt.Annotations.Core.AnnUnitConverter.convertAngularUnit = function (a, b, c) {
        return b !== c ? c ? a * (180 / Math.PI) : a * (Math.PI / 180) : a
    };
    Object.defineProperty(lt.Annotations.Core.AnnUnitConverter,
        "smartEnglishMaximumUnit", {
            get: lt.Annotations.Core.AnnUnitConverter.get_smartEnglishMaximumUnit,
            set: lt.Annotations.Core.AnnUnitConverter.set_smartEnglishMaximumUnit,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnUnitConverter, "smartMetricMaximumUnit", {
        get: lt.Annotations.Core.AnnUnitConverter.get_smartMetricMaximumUnit,
        set: lt.Annotations.Core.AnnUnitConverter.set_smartMetricMaximumUnit,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnXmlHelper = function () {
    };
    lt.Annotations.Core.AnnXmlHelper._hasChild =
        function (a) {
            return a.hasChildNodes()
        };
    lt.Annotations.Core.AnnXmlHelper.readDataElement = function (a, b, c) {
        var d = null, a = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, b, c, "");
        String.isNullOrEmpty(a) || (d = lt.Annotations.Core.Utils.fromBase64String(a));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readNumericElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, b, c, d.toString());
        return String.isNullOrEmpty(a) ? 0 : lt.Annotations.Core.AnnDouble.parseInvariantCulture(a)
    };
    lt.Annotations.Core.AnnXmlHelper.readBooleanElement =
        function (a, b, c, d) {
            a = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, b, c, d.toString());
            return Boolean.parse(a)
        };
    lt.Annotations.Core.AnnXmlHelper.readColorElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, b, c, d);
        return a = lt.Annotations.Core.AnnXmlHelper.toHtmlColor(a)
    };
    lt.Annotations.Core.AnnXmlHelper.readStringElement = function (a, b, c, d) {
        var e = d, a = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        null != a && (e = lt.Annotations.Core.AnnXmlHelper.getStringValue(a,
            d));
        return e
    };
    lt.Annotations.Core.AnnXmlHelper.readDateElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, b, c, lt.Annotations.Core.AnnObject.dateToString(d));
        return lt.Annotations.Core.AnnObject.dateFromString(a)
    };
    lt.Annotations.Core.AnnXmlHelper.readLengthElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, b, c, d.get_value());
        return lt.Annotations.Core._leadLengthDExtensions.create(a)
    };
    lt.Annotations.Core.AnnXmlHelper.readPointsElement = function (a,
                                                                   b, c) {
        var d = new lt.Annotations.Core.LeadPointCollection, e = lt.Annotations.Core._leadPointDExtensions.create(0, 0), b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != b) {
            b = lt.Annotations.Core.AnnXmlHelper.getChildren(b);
            for (b = ss.IEnumerator.getEnumerator(b); b.moveNext();)c = b.current, lt.Annotations.Core.AnnXmlHelper.isElementNode(c) && d.add(lt.Annotations.Core.AnnXmlHelper.readPointElement(a, "", c, e))
        }
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readDashArrayElement = function (a, b, c) {
        var d =
            null, e = [], a = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != a) {
            d = lt.Annotations.Core.AnnXmlHelper.getChildren(a);
            for (d = ss.IEnumerator.getEnumerator(d); d.moveNext();)a = d.current, lt.Annotations.Core.AnnXmlHelper.isElementNode(a) && e.add(parseFloat(lt.Annotations.Core.AnnXmlHelper.getValue(a)));
            d = Array(e.length);
            a = 0;
            for (e = ss.IEnumerator.getEnumerator(e); e.moveNext();)d[a] = e.current, a++
        }
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readPointElement = function (a, b, c, d) {
        var e = c;
        String.isNullOrEmpty(b) ||
        (e = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c));
        var b = lt.Annotations.Core.AnnDouble.naN.toString(), f = c = lt.Annotations.Core.AnnDouble.naN;
        if (null != e) {
            var g = d.get_x().toString(), h = d.get_y().toString(), g = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "X", e, g);
            lt.Annotations.Core.Utils.compare(g, b, !0) || (c = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "X", e, d.get_x()));
            g = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Y", e, h);
            lt.Annotations.Core.Utils.compare(g, b,
                !0) || (f = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Y", e, d.get_y()))
        }
        return lt.Annotations.Core._leadPointDExtensions.create(c, f)
    };
    lt.Annotations.Core.AnnXmlHelper.readSizeElement = function (a, b, c, d) {
        var e = d, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        null != b && (e = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Width", b, d.get_width()), a = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Height", b, d.get_height()), e = lt.Annotations.Core._leadSizeDExtensions.create(e,
            a));
        return e
    };
    lt.Annotations.Core.AnnXmlHelper.readThicknessElement = function (a, b, c, d) {
        var e = d, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != b)var e = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Top", b, d.get_top()), c = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Left", b, d.get_left()), f = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Bottom", b, d.get_bottom()), a = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Right", b, d.get_right()), e = new lt.Annotations.Core.AnnThickness(c,
            e, a, f);
        return e
    };
    lt.Annotations.Core.AnnXmlHelper.readBrushElement = function (a, b, c, d) {
        var e = d, c = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != c) {
            b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "AnnHatchBrush", c);
            if (null != b)return d = new lt.Annotations.Core.AnnHatchBrush, d.set_backgroundColor(lt.Annotations.Core.AnnXmlHelper.readColorElement(a, "BackgroundColor", b, "transparent")), d.set_foregroundColor(lt.Annotations.Core.AnnXmlHelper.readColorElement(a, "ForegroundColor",
                b, "red")), d.set_hatchStyle(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnHatchStyle, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "AnnHatchStyle", b, "Horizontal"))), d;
            b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "SolidColorBrush", c);
            null != b && (e = "transparent", d = Type.safeCast(d, lt.Annotations.Core.AnnSolidColorBrush), null != d && (e = d.get_color()), a = lt.Annotations.Core.AnnXmlHelper.readColorElement(a, "Color", b, e), d = new lt.Annotations.Core.AnnSolidColorBrush, d.set_color(a),
                e = d)
        }
        return e
    };
    lt.Annotations.Core.AnnXmlHelper.readFontElement = function (a, b, c, d) {
        var e = d, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != b) {
            e = new lt.Annotations.Core.AnnFont("Arial", 12);
            null != d && (e = d);
            var f = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "FamilyName", b, e.get_fontFamilyName()), g = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Size", b, e.get_fontSize()), d = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnFontStyle, lt.Annotations.Core.AnnXmlHelper.readStringElement(a,
                "Style", b, e.get_fontStyle().toString())), c = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnFontStretch, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Stretch", b, e.get_fontStretch().toString())), h = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnFontWeight, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Weight", b, e.get_fontWeight().toString())), a = lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "TextDecoration", b, e.get_textDecoration()), e = new lt.Annotations.Core.AnnFont(f,
                g);
            e.set_textDecoration(a);
            e.set_fontStretch(c);
            e.set_fontWeight(h);
            e.set_fontStyle(d)
        }
        return e
    };
    lt.Annotations.Core.AnnXmlHelper.readLabelsElement = function (a, b, c) {
        for (var d = {}, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c), b = lt.Annotations.Core.AnnXmlHelper.getChildren(b), b = ss.IEnumerator.getEnumerator(b); b.moveNext();)if (c = b.current, lt.Annotations.Core.AnnXmlHelper.isElementNode(c)) {
            var e = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Key", c, "");
            String.isNullOrEmpty(e) ||
            (d[e] = lt.Annotations.Core.AnnXmlHelper.readLabelElement(a, "Label", c))
        }
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readLabelElement = function (a, b, c) {
        var b = new lt.Annotations.Core.AnnLabel, d = new lt.Annotations.Core.AnnLabel;
        d.set_isVisible(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(a, "IsVisible", c, b.get_isVisible()));
        d.set_restrictionMode(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "LabelRestriction", c, 0));
        d.set_text(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Text", c, b.get_text()));
        d.set_originalPosition(lt.Annotations.Core.AnnXmlHelper.readPointElement(a, "OriginalPosition", c, b.get_originalPosition()));
        d.set_offset(lt.Annotations.Core.AnnXmlHelper.readPointElement(a, "Offset", c, b.get_offset()));
        d.set_background(lt.Annotations.Core.AnnXmlHelper.readBrushElement(a, "Background", c, b.get_background()));
        d.set_foreground(lt.Annotations.Core.AnnXmlHelper.readBrushElement(a, "Foreground", c, b.get_foreground()));
        d.set_font(lt.Annotations.Core.AnnXmlHelper.readFontElement(a, "Font", c, b.get_font()));
        d.set_offsetHeight(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(a, "OffsetHeight", c, b.get_offsetHeight()));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readStrokeElement = function (a, b, c, d) {
        var e = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("transparent"), lt.Annotations.Core._leadLengthDExtensions.create(1));
        null != d && (e = d);
        d = null;
        b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        null != b && (d = new lt.Annotations.Core.AnnStroke, d.set_stroke(lt.Annotations.Core.AnnXmlHelper.readBrushElement(a,
            "Fill", b, e.get_stroke())), d.set_strokeThickness(lt.Annotations.Core.AnnXmlHelper.readLengthElement(a, "Thickness", b, e.get_strokeThickness())), c = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap, e.get_strokeDashCap()), d.set_strokeDashCap(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnStrokeLineCap, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "DashCap", b, c))), c = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap, e.get_strokeStartLineCap()),
            d.set_strokeStartLineCap(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnStrokeLineCap, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "StartLineCap", b, c))), c = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap, e.get_strokeEndLineCap()), d.set_strokeEndLineCap(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnStrokeLineCap, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "EndLineCap", b, c))), c = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineJoin,
            e.get_strokeLineJoin()), d.set_strokeLineJoin(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnStrokeLineJoin, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "LineJoin", b, c))), d.set_strokeMiterLimit(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "MiterLimit", b, e.get_strokeMiterLimit())), d.set_strokeDashOffset(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "DashOffset", b, e.get_strokeDashOffset())), d.set_strokeDashArray(lt.Annotations.Core.AnnXmlHelper.readDashArrayElement(a,
            "Dashes", b)), e = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeAlignment, e.get_strokeAlignment()), d.set_strokeAlignment(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnStrokeAlignment, lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "StrokeAlignment", b, e))));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readPictureElement = function (a, b, c) {
        var d = null, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        null != b && (d = new lt.Annotations.Core.AnnPicture(""), c = lt.Annotations.Core.AnnXmlHelper.readStringElement(a,
            "PictureData", b, ""), String.isNullOrEmpty(c) ? d.set_pictureData(null) : d.set_pictureData(lt.Annotations.Core.Utils.compare(c, "null", !0) ? null : c), d.set_source(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "PictureSource", b, "")), d.set_width(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "PictureWidth", b, 0)), d.set_height(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "PictureHeight", b, 0)));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readMediaElement = function (a, b, c) {
        var d = null, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a,
            b, c);
        null != b && (d = new lt.Annotations.Core.AnnMedia, d.set_source1(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Source1", b, "")), d.set_type1(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "MediaType1", b, "")), d.set_source2(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Source2", b, "")), d.set_type2(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "MediaType2", b, "")), d.set_source3(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Source3", b, "")), d.set_type3(lt.Annotations.Core.AnnXmlHelper.readStringElement(a,
            "MediaType3", b, "")));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper._readOnLoadElement = function (a, b, c) {
        var d = new lt.Annotations.Core._annOnLoadData, b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        null != b && (d.set_rotateAngle(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "RotateAngle", b, d.get_rotateAngle())), d.set_scaleX(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "ScaleX", b, d.get_scaleX())), d.set_scaleY(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "ScaleY", b,
            d.get_scaleY())), d.set_offset(lt.Annotations.Core.AnnXmlHelper.readPointElement(a, "Offset", b, d.get_offset())));
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readMetadataElement = function (a, b, c) {
        var d = {}, a = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null != a) {
            a = lt.Annotations.Core.AnnXmlHelper.getChildren(a);
            for (a = ss.IEnumerator.getEnumerator(a); a.moveNext();)if (b = a.current, lt.Annotations.Core.AnnXmlHelper.isElementNode(b))if (c = lt.Annotations.Core.AnnXmlHelper.getChildren(b), 1 < c.length)if (3 <
                c.length) {
                var e = lt.Annotations.Core.AnnXmlHelper.getInnerText(c[1]);
                d[e] = lt.Annotations.Core.AnnXmlHelper.getInnerText(c[3])
            } else e = lt.Annotations.Core.AnnXmlHelper.getInnerText(c[0]), d[e] = lt.Annotations.Core.AnnXmlHelper.getInnerText(c[1]); else e = lt.Annotations.Core.AnnXmlHelper.getNodeName(b), d[e] = lt.Annotations.Core.AnnXmlHelper.getInnerText(b)
        }
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.readReviewsElement = function (a, b, c) {
        var d = [], b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, b, c);
        if (null == b)return d;
        b = lt.Annotations.Core.AnnXmlHelper.getChildren(b);
        for (b = ss.IEnumerator.getEnumerator(b); b.moveNext();) {
            var e = b.current;
            if (lt.Annotations.Core.AnnXmlHelper.isElementNode(e) || lt.Annotations.Core.AnnXmlHelper.isNodeName(e, "Review")) {
                c = new lt.Annotations.Core.AnnReview;
                c.set_author(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Author", e, ""));
                c.set_date(lt.Annotations.Core.AnnXmlHelper.readDateElement(a, "Date", e, Date.get_now()));
                c.set_status(lt.Annotations.Core.AnnXmlHelper.readStringElement(a,
                    "Status", e, ""));
                c.set_isChecked(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(a, "IsChecked", e, !1));
                c.set_comment(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "Comment", e, ""));
                e = lt.Annotations.Core.AnnXmlHelper.readReviewsElement(a, "Replies", e);
                if (null != e)for (e = ss.IEnumerator.getEnumerator(e); e.moveNext();) {
                    var f = e.current;
                    c.get_replies().add(f)
                }
                d.add(c)
            }
        }
        return d
    };
    lt.Annotations.Core.AnnXmlHelper.createTextNode = function (a, b, c) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        a =
            a.createTextNode(null == c ? "" : c);
        b.appendChild(a);
        return b
    };
    lt.Annotations.Core.AnnXmlHelper.createDateNode = function (a, b, c) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        c = lt.Annotations.Core.AnnObject.dateToString(c);
        a = a.createTextNode(c);
        b.appendChild(a);
        return b
    };
    lt.Annotations.Core.AnnXmlHelper.writeMetadataElement = function (a, b, c, d) {
        for (var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = ss.IEnumerator.getEnumerator(Object.keys(d)); e.moveNext();) {
            var f = e.current, g = lt.Annotations.Core.AnnXmlHelper.createTextNode(a,
                "Item", ""), h = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Key", f), f = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Value", d[f]);
            lt.Annotations.Core.AnnXmlHelper.appendChild(g, h);
            lt.Annotations.Core.AnnXmlHelper.appendChild(g, f);
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, g)
        }
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeReviewsElement = function (a, b, c, d) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        if (null != d) {
            for (d = ss.IEnumerator.getEnumerator(d); d.moveNext();) {
                var e =
                    d.current;
                if (null != e) {
                    var f = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Review", "");
                    lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Author", f, e.get_author());
                    lt.Annotations.Core.AnnXmlHelper.writeDateElement(a, "Date", f, e.get_date());
                    lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Status", f, e.get_status());
                    lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(a, "IsChecked", f, e.get_isChecked());
                    lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Comment", f, e.get_comment());
                    null !=
                    e.get_replies() && 0 < e.get_replies().length && lt.Annotations.Core.AnnXmlHelper.writeReviewsElement(a, "Replies", f, e.get_replies());
                    lt.Annotations.Core.AnnXmlHelper.appendChild(b, f)
                }
            }
            lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
        }
    };
    lt.Annotations.Core.AnnXmlHelper.writeLabelsElement = function (a, b, c, d) {
        for (var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = ss.IEnumerator.getEnumerator(Object.keys(d)); e.moveNext();) {
            var f = e.current;
            lt.Annotations.Core.AnnXmlHelper.writeLabelElement(a, "Label",
                b, d[f], f)
        }
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeColorElement = function (a, b, c, d) {
        d = lt.Annotations.Core.AnnXmlHelper.fromHtmlColor(d);
        lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, b, c, d)
    };
    lt.Annotations.Core.AnnXmlHelper.writeStringElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, b, d);
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, a)
    };
    lt.Annotations.Core.AnnXmlHelper.writeDateElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.createDateNode(a,
            b, d);
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, a)
    };
    lt.Annotations.Core.AnnXmlHelper.writeDataElement = function (a, b, c, d) {
        d = lt.Annotations.Core.Utils.toBase64String(d);
        a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, b, d);
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, a)
    };
    lt.Annotations.Core.AnnXmlHelper.writeBooleanElement = function (a, b, c, d) {
        lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, b, c, lt.Annotations.Core.Utils.toLowerCase(d.toString()))
    };
    lt.Annotations.Core.AnnXmlHelper.writePointsElement =
        function (a, b, c, d) {
            b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
            for (d = ss.IEnumerator.getEnumerator(d); d.moveNext();)lt.Annotations.Core.AnnXmlHelper.writePointElement(a, "Point", b, d.current);
            lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
        };
    lt.Annotations.Core.AnnXmlHelper.writeLengthElement = function (a, b, c, d) {
        a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, b, d.get_value().toString());
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, a)
    };
    lt.Annotations.Core.AnnXmlHelper.writePointElement =
        function (a, b, c, d) {
            var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "X", lt.Annotations.Core.Utils.toStringInvariantCulture(d.get_x())), a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Y", lt.Annotations.Core.Utils.toStringInvariantCulture(d.get_y()));
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, e);
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, a);
            lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
        };
    lt.Annotations.Core.AnnXmlHelper.writeThicknessElement =
        function (a, b, c, d) {
            var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Top", d.get_top().toString()), f = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Left", d.get_left().toString()), g = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Bottom", d.get_bottom().toString()), a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Right", d.get_right().toString());
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, e);
            lt.Annotations.Core.AnnXmlHelper.appendChild(b,
                f);
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, g);
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, a);
            lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
        };
    lt.Annotations.Core.AnnXmlHelper.writeSizeElement = function (a, b, c, d) {
        var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Width", d.get_width().toString()), a = lt.Annotations.Core.AnnXmlHelper.createTextNode(a, "Height", d.get_height().toString());
        lt.Annotations.Core.AnnXmlHelper.appendChild(b,
            e);
        lt.Annotations.Core.AnnXmlHelper.appendChild(b, a);
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeBrushElement = function (a, b, c, d) {
        var b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b), e = Type.safeCast(d, lt.Annotations.Core.AnnSolidColorBrush);
        if (null != e) {
            var f = lt.Annotations.Core.AnnXmlHelper.createElement(a, "SolidColorBrush");
            lt.Annotations.Core.AnnXmlHelper.writeColorElement(a, "Color", f, e.get_color());
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, f)
        }
        d =
            Type.safeCast(d, lt.Annotations.Core.AnnHatchBrush);
        null != d && (e = lt.Annotations.Core.AnnXmlHelper.createElement(a, "AnnHatchBrush"), lt.Annotations.Core.AnnXmlHelper.writeColorElement(a, "ForegroundColor", e, d.get_foregroundColor()), lt.Annotations.Core.AnnXmlHelper.writeColorElement(a, "BackgroundColor", e, d.get_backgroundColor()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "AnnHatchStyle", e, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnHatchStyle, d.get_hatchStyle())), lt.Annotations.Core.AnnXmlHelper.appendChild(b,
            e));
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeNumericElement = function (a, b, c, d) {
        lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, b, c, lt.Annotations.Core.Utils.toStringInvariantCulture(d))
    };
    lt.Annotations.Core.AnnXmlHelper.writeFontElement = function (a, b, c, d) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        null != d && (lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "FamilyName", b, d.get_fontFamilyName()), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a,
            "Size", b, d.get_fontSize()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Stretch", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnFontStretch, d.get_fontStretch())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Weight", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnFontWeight, d.get_fontWeight())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Style", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnFontStyle, d.get_fontStyle())),
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "TextDecoration", b, d.get_textDecoration()));
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeLabelElement = function (a, b, c, d, e) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Key", b, e);
        lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(a, "IsVisible", b, d.get_isVisible());
        lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "LabelRestriction",
            b, d.get_restrictionMode());
        lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Text", b, d.get_text());
        lt.Annotations.Core.AnnXmlHelper.writePointElement(a, "OriginalPosition", b, d.get_originalPosition());
        lt.Annotations.Core.AnnXmlHelper.writePointElement(a, "Offset", b, d.get_offset());
        lt.Annotations.Core.AnnXmlHelper.writeBrushElement(a, "Background", b, d.get_background());
        lt.Annotations.Core.AnnXmlHelper.writeBrushElement(a, "Foreground", b, d.get_foreground());
        lt.Annotations.Core.AnnXmlHelper.writeFontElement(a,
            "Font", b, d.get_font());
        lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(a, "OffsetHeight", b, d.get_offsetHeight());
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeStrokeElement = function (a, b, c, d) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        null != d && (lt.Annotations.Core.AnnXmlHelper.writeBrushElement(a, "Fill", b, d.get_stroke()), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "Thickness", b, d.get_strokeThickness().get_value()), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a,
            "MiterLimit", b, parseInt(d.get_strokeMiterLimit())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "DashCap", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap, d.get_strokeDashCap())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "StartLineCap", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap, d.get_strokeStartLineCap())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "EndLineCap", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineCap,
            d.get_strokeEndLineCap())), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "LineJoin", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeLineJoin, d.get_strokeLineJoin())), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "DashOffset", b, d.get_strokeDashOffset()), lt.Annotations.Core.AnnXmlHelper.writeDashArrayElement(a, "Dashes", b, d.get_strokeDashArray()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "StrokeAlignment", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnStrokeAlignment,
            d.get_strokeAlignment())));
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writeDashArrayElement = function (a, b, c, d) {
        b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        if (null != d)for (d = ss.IEnumerator.getEnumerator(d); d.moveNext();)lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "DashSize", b, d.current);
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.writePictureElement = function (a, b, c, d) {
        null != d && (b = lt.Annotations.Core.AnnXmlHelper.createElement(a,
            b), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "PictureData", b, d.get_pictureData()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "PictureSource", b, d.get_source()), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "PictureWidth", b, d.get_width()), lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "PictureHeight", b, d.get_height()), lt.Annotations.Core.AnnXmlHelper.appendChild(c, b))
    };
    lt.Annotations.Core.AnnXmlHelper.writeMediaElement = function (a, b, c, d) {
        null != d && (b = lt.Annotations.Core.AnnXmlHelper.createElement(a,
            b), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Source1", b, d.get_source1()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "MediaType1", b, d.get_type1()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Source2", b, d.get_source2()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "MediaType2", b, d.get_type2()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "Source3", b, d.get_source3()), lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "MediaType3", b, d.get_type3()),
            lt.Annotations.Core.AnnXmlHelper.appendChild(c, b))
    };
    lt.Annotations.Core.AnnXmlHelper._writeOnLoadElement = function (a, b, c) {
        var d = new lt.Annotations.Core._annOnLoadData, b = lt.Annotations.Core.AnnXmlHelper.createElement(a, b);
        lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "RotateAngle", b, d.get_rotateAngle());
        lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "ScaleX", b, d.get_scaleX());
        lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "ScaleY", b, d.get_scaleY());
        lt.Annotations.Core.AnnXmlHelper.writePointElement(a,
            "Offset", b, d.get_offset());
        lt.Annotations.Core.AnnXmlHelper.appendChild(c, b)
    };
    lt.Annotations.Core.AnnXmlHelper.toHex = function (a) {
        a = a.toString(16).toUpperCase();
        2 > a.length && (a = "0" + a);
        return a
    };
    lt.Annotations.Core.AnnXmlHelper.fromHtmlColor = function (a) {
        var b = a.trim().toLowerCase();
        if (!b.startsWith("rgb"))return a;
        var b = b.replaceAll(" ", ""), c, d, e;
        if (b.startsWith("rgb(")) {
            c = 255;
            b = b.replaceAll("rgb(", "");
            b = b.replaceAll(")", "");
            b = b.split(",");
            if (null == b || 3 !== b.length)return a;
            a = parseInt(b[0]);
            d = parseInt(b[1]);
            e = parseInt(b[2])
        } else if (b.startsWith("rgba(")) {
            b = b.replaceAll("rgba(", "");
            b = b.replaceAll(")", "");
            b = b.split(",");
            if (null == b || 4 !== b.length)return a;
            a = parseInt(b[0]);
            d = parseInt(b[1]);
            e = parseInt(b[2]);
            c = parseFloat(b[3]);
            c = 1 === c ? 255 : c ? parseInt(255 * c) : 0
        } else return b;
        b = "#";
        255 !== c && (b += lt.Annotations.Core.AnnXmlHelper.toHex(c));
        return b += lt.Annotations.Core.AnnXmlHelper.toHex(a) + lt.Annotations.Core.AnnXmlHelper.toHex(d) + lt.Annotations.Core.AnnXmlHelper.toHex(e)
    };
    lt.Annotations.Core.AnnXmlHelper.toHtmlColor =
        function (a) {
            var b = a.trim();
            if (null == b || 9 !== b.length || "#" !== b.charAt(0))return b;
            var a = parseInt(b.substring(1, 3), 16), c = parseInt(b.substring(3, 5), 16), d = parseInt(b.substring(5, 7), 16), b = parseInt(b.substring(7, 9), 16);
            return b = "rgba(" + c.toString() + ", " + d.toString() + ", " + b.toString() + ", " + (a / 255).toString() + ")"
        };
    lt.Annotations.Core.AnnXmlHelper.appendChild = function (a, b) {
        a.appendChild(b)
    };
    lt.Annotations.Core.AnnXmlHelper.createElement = function (a, b) {
        return a.createElement(b)
    };
    lt.Annotations.Core.AnnXmlHelper.createActiveXDocument =
        function (a) {
            var b = "undefined" != typeof Leadtools && "function" == typeof Leadtools.RasterSupport;
            return lt.LTHelper.browser === lt.LTBrowser.internetExplorer && 11 === lt.LTHelper.version && !(a instanceof ActiveXObject) && !b ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.load(a), b) : a
        };
    lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild = function (a, b, c) {
        var d = "undefined" != typeof Leadtools && "function" == typeof Leadtools.RasterSupport;
        if (lt.LTHelper.browser === lt.LTBrowser.internetExplorer && 11 === lt.LTHelper.version && !d && a instanceof ActiveXObject)return c.selectSingleNode(b);
        if (!d && (lt.LTHelper.browser === lt.LTBrowser.edge || lt.LTHelper.browser === lt.LTBrowser.internetExplorer)) {
            a = c.childNodes;
            for (d = 0; d < a.length; d++)if (lt.Annotations.Core.AnnXmlHelper.isNodeName(a[d], b))return a[d]
        } else {
            a = c.getElementsByTagName(b);
            for (d = 0; d < a.length; d++)if (lt.Annotations.Core.AnnXmlHelper.isParent(c, a[d]))return a[d]
        }
        return null
    };
    lt.Annotations.Core.AnnXmlHelper.getMatchingChildren = function (a, b, c) {
        var d = "undefined" != typeof Leadtools &&
            "function" == typeof Leadtools.RasterSupport;
        if (lt.LTHelper.browser === lt.LTBrowser.internetExplorer && 11 === lt.LTHelper.version && !d && a instanceof ActiveXObject)return c.selectNodes(b);
        a = [];
        if (!d && (lt.LTHelper.browser === lt.LTBrowser.edge || lt.LTHelper.browser === lt.LTBrowser.internetExplorer))for (var d = c.childNodes, e = 0; e < d.length; e++)lt.Annotations.Core.AnnXmlHelper.isNodeName(d[e], b) && a.add(d[e]); else {
            d = c.getElementsByTagName(b);
            for (e = 0; e < d.length; e++)lt.Annotations.Core.AnnXmlHelper.isParent(c, d[e]) &&
            a.add(d[e])
        }
        return a
    };
    lt.Annotations.Core.AnnXmlHelper.getChildren = function (a) {
        return a.childNodes
    };
    lt.Annotations.Core.AnnXmlHelper.getStringValue = function (a, b) {
        var c = b;
        lt.Annotations.Core.AnnXmlHelper._hasChild(a) && ("undefined" != typeof a.textContent ? (c = a.textContent, c = c.trim()) : c = a.firstChild.nodeValue.trim());
        return c
    };
    lt.Annotations.Core.AnnXmlHelper.getValue = function (a) {
        return a.firstChild.nodeValue.trim()
    };
    lt.Annotations.Core.AnnXmlHelper.getNodeName = function (a) {
        return a.nodeName
    };
    lt.Annotations.Core.AnnXmlHelper.isNodeName =
        function (a, b) {
            return a.nodeName === b
        };
    lt.Annotations.Core.AnnXmlHelper.isElementNode = function (a) {
        var b = !1;
        1 === a.nodeType && (b = !0);
        return b
    };
    lt.Annotations.Core.AnnXmlHelper.toXml = function () {
        return ""
    };
    lt.Annotations.Core.AnnXmlHelper.isParent = function (a, b) {
        return b.parentNode === a
    };
    lt.Annotations.Core.AnnXmlHelper.getAttributeValue = function (a, b) {
        var c = "";
        return c = b.attributes.getNamedItem(a).nodeValue
    };
    lt.Annotations.Core.AnnXmlHelper.getInnerText = function (a) {
        var b = "", b = a.textContent;
        null != b && (b = b.trim());
        return b
    };
    lt.Annotations.Core.AnnXmlHelper.setAttributeValue = function (a, b, c) {
        var d = String.format("{0}<{1}></{2}>", '<?xml version="1.0" encoding="utf-8"?>', "Annotations", "Annotations"), b = (new DOMParser).parseFromString(d, "application/xml").createAttribute(b);
        b.value = c;
        a.attributes.setNamedItem(b)
    };
    lt.Annotations.Core.ExceptionHelper = function () {
    };
    lt.Annotations.Core.ExceptionHelper.invalidOperationException = function (a) {
        throw Error(a);
    };
    lt.Annotations.Core.ExceptionHelper.argumentNullException = function (a) {
        throw Error("Value cannot be null.\nParameter name: " +
            a);
    };
    lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException = function (a, b, c) {
        throw Error(String.format("{0}\nParameter name: {1}\nActual value was {2}.", c, a, b));
    };
    lt.Annotations.Core.ExceptionHelper.argumentException = function (a, b) {
        if (String.isNullOrEmpty(b))throw Error(a);
        throw Error(String.format("{0}\nParameter name: {1}", a, b));
    };
    lt.Annotations.Core.PolyPoint = function () {
    };
    lt.Annotations.Core.PolyPoint.fromEllipse = function (a, b, c) {
        var d = a.get_width() / 2, e = a.get_height() / 2, f = a.get_x() + d, g = a.get_y() +
            e, h = 0.5522847498308 * d, i = 0.5522847498308 * e, a = new lt.Annotations.Core.PolyPoint;
        a._allocatePoints(13);
        a._points[0].set_x(a._points[1].set_x(a._points[11].set_x(a._points[12].set_x(f - d))));
        a._points[5].set_x(a._points[6].set_x(a._points[7].set_x(f + d)));
        a._points[2].set_x(a._points[10].set_x(f - h));
        a._points[4].set_x(a._points[8].set_x(f + h));
        a._points[3].set_x(a._points[9].set_x(f));
        a._points[2].set_y(a._points[3].set_y(a._points[4].set_y(g - e)));
        a._points[8].set_y(a._points[9].set_y(a._points[10].set_y(g +
            e)));
        a._points[7].set_y(a._points[11].set_y(g + i));
        a._points[1].set_y(a._points[5].set_y(g - i));
        a._points[0].set_y(a._points[12].set_y(a._points[6].set_y(g)));
        a._bezierToPolyPoint(!0);
        b && !lt.Annotations.Core.AnnDouble.isNaN(b) && (d = lt.LeadMatrix.get_identity(), d.rotateAt(b, c.get_x(), c.get_y()), d.transformPoints(a.get_points()));
        return a
    };
    lt.Annotations.Core.PolyPoint.prototype = {
        _points: null, get_points: function () {
            return this._points
        }, set_points: function (a) {
            return this._points = a
        }, _pointTypes: null, get_pointTypes: function () {
            return this._pointTypes
        },
        set_pointTypes: function (a) {
            return this._pointTypes = a
        }, _allocatePoints: function (a) {
            this._points = Array(a);
            for (var b = 0; b < a; b++)this._points[b] = lt.LeadPointD.create(0, 0);
            this._pointTypes = Array(a)
        }, _bezierToPolyPoint: function (a) {
            for (var b = 0; b < this._points.length; b++)this._pointTypes[b] = b ? 4 : 6, a && b === this._pointTypes.length - 1 && (this._pointTypes[b] |= 1)
        }, hitTest: function (a, b, c) {
            var d = !1;
            c && (d = lt.Annotations.Core.Utils.hitTestPolygonArray(this._points, a));
            if (!d)for (var c = 0, e = -1, f = -1, g = this._points.length; c <
            g && !d;)switch (this._pointTypes[c]) {
                case 7:
                case 6:
                    e = c;
                    c++;
                    break;
                case 3:
                case 2:
                    f = c;
                    lt.Annotations.Core.Utils.hitTestLine(this._points[e], this._points[f], a, b, !0) && (d = !0);
                    e = f;
                    c++;
                    break;
                case 5:
                case 4:
                    lt.Annotations.Core.Utils.hitTestBezier(this._points, e, a, b) && (d = !0), e = c + 2, c += 3
            }
            return d
        }
    };
    Object.defineProperty(lt.Annotations.Core.PolyPoint.prototype, "points", {
        get: lt.Annotations.Core.PolyPoint.prototype.get_points,
        set: lt.Annotations.Core.PolyPoint.prototype.set_points,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.PolyPoint.prototype,
        "pointTypes", {
            get: lt.Annotations.Core.PolyPoint.prototype.get_pointTypes,
            set: lt.Annotations.Core.PolyPoint.prototype.set_pointTypes,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.RulerMetadata = function () {
    };
    lt.Annotations.Core.RulerMetadata.prototype = {multiply: 0, tickUnit: 0, outFactor: 0, outDivisor: 0};
    lt.Annotations.Core.RulerHelper = function () {
    };
    lt.Annotations.Core.RulerHelper.getRulerLength = function (a) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
        for (var b = 0, c = 0; c <
        a.length - 1; ++c)b += lt.Annotations.Core.RulerHelper.getRulerLengthFromTwoPoints(a[c], a[c + 1]);
        return b
    };
    lt.Annotations.Core.RulerHelper.getRulerLengthFromTwoPoints = function (a, b) {
        return lt.Annotations.Core.Utils.distance(a, b)
    };
    lt.Annotations.Core.RulerHelper.getLengthString = function (a, b, c, d) {
        return lt.Annotations.Core.RulerHelper._lengthString(a.get_value(), b, c, d)
    };
    lt.Annotations.Core.RulerHelper.getLengthStringFromPoint = function (a, b, c, d, e) {
        return lt.Annotations.Core.RulerHelper._lengthString(lt.Annotations.Core.RulerHelper.getRulerLengthFromTwoPoints(a,
            b), c, d, e)
    };
    lt.Annotations.Core.RulerHelper.getLengthStringFromPoints = function (a, b, c, d) {
        return lt.Annotations.Core.RulerHelper._lengthString(lt.Annotations.Core.RulerHelper.getRulerLength(a), b, c, d)
    };
    lt.Annotations.Core.RulerHelper._lengthString = function (a, b, c, d) {
        var e = 0, f = 0, g = 0, e = "", g = a;
        switch (c) {
            case 3:
                g = lt.Annotations.Core.AnnUnitConverter.convert(a, 0, 5);
                a = lt.Annotations.Core.AnnUnitConverter.get_smartEnglishMaximumUnit();
                36 <= g && 1 === (9 === a | 3 === a) ? (e = parseInt(parseInt(g) / 36), g -= 36 * e, f = parseInt(parseInt(g) /
                    12), b = String.format("{0} {1} {2} {3} {4} {5}", e, d[9], f, d[8], lt.Annotations.Core.Utils.precisionFormat(b, g - 12 * f), d[5])) : 12 <= g && 1 === (8 === a | 3 === a) ? (f = parseInt(parseInt(g) / 12), b = String.format("{0} {1} {2} {3}", f, d[8], lt.Annotations.Core.Utils.precisionFormat(b, g - 12 * f), d[5])) : b = String.format("{0} {1}", lt.Annotations.Core.Utils.precisionFormat(b, g), d[5]);
                break;
            case 4:
                g = lt.Annotations.Core.AnnUnitConverter.convert(a, 0, 10);
                a = lt.Annotations.Core.AnnUnitConverter.get_smartMetricMaximumUnit();
                g >= lt.Annotations.Core.RulerHelper._micrometersPerMeter &&
                1 === (12 === a | 4 === a) ? (g /= lt.Annotations.Core.RulerHelper._micrometersPerMeter, e = d[12]) : g >= lt.Annotations.Core.RulerHelper._micrometersPerCm && 1 === (11 === a | 4 === a) ? (g /= lt.Annotations.Core.RulerHelper._micrometersPerCm, e = d[11]) : 1E3 <= g && 1 === (6 === a | 4 === a) ? (g /= 1E3, e = d[6]) : e = d[10];
                b = String.format("{0} {1}", lt.Annotations.Core.Utils.precisionFormat(b, g), e);
                break;
            default:
                g = lt.Annotations.Core.AnnUnitConverter.convert(a, 0, c), b = String.format("{0} {1}", lt.Annotations.Core.Utils.precisionFormat(b, g), d[c])
        }
        return b
    };
    lt.Annotations.Core.RulerHelper.getGaugePoints = function (a, b, c, d, e) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
        if (lt.Annotations.Core._leadPointDExtensions.isEqual(b, c))return null;
        var f = Array(4), b = a.pointFromContainerCoordinates(b, e), c = a.pointFromContainerCoordinates(c, e), g = lt.Annotations.Core.Utils.getUnitVectorPerpendicular(b, c), d = lt.Annotations.Core._leadLengthDExtensions.create(d.get_value() / 2), d = lt.Annotations.Core._leadLengthDExtensions.create(a.lengthFromContainerCoordinates(d,
            e | 2));
        f[0] = lt.Annotations.Core.Utils.transformPoint(g, d, b);
        f[2] = lt.Annotations.Core.Utils.transformPoint(g, d, c);
        lt.Annotations.Core._leadPointDExtensions.isEmpty(g) || (g.set_x(-g.get_x()), g.set_y(-g.get_y()));
        f[1] = lt.Annotations.Core.Utils.transformPoint(g, d, b);
        f[3] = lt.Annotations.Core.Utils.transformPoint(g, d, c);
        return f
    };
    lt.Annotations.Core.RulerHelper._unitToTicUnit = function (a) {
        var b = 1;
        switch (a) {
            case 5:
                b = 4;
                break;
            case 8:
                b = 3;
                break;
            case 9:
                b = 2;
                break;
            default:
                b = 1
        }
        return b
    };
    lt.Annotations.Core.RulerHelper._decreaseTickUnit =
        function (a) {
            switch (a.tickUnit) {
                case 1:
                    a.multiply = 10;
                    break;
                case 2:
                    a.multiply = 3;
                    a.tickUnit = 3;
                    break;
                case 3:
                    a.multiply = 12;
                    a.tickUnit = 4;
                    break;
                case 4:
                    a.tickUnit = 6;
                    a.multiply = 4;
                    break;
                case 6:
                    a.tickUnit = 7, a.multiply = 2
            }
        };
    lt.Annotations.Core.RulerHelper._increaseTickUnit = function (a) {
        switch (a.tickUnit) {
            case 1:
                a.multiply = 10;
                break;
            case 3:
                a.multiply = 3;
                a.tickUnit = 2;
                break;
            case 4:
                a.tickUnit = 3;
                a.multiply = 12;
                break;
            case 6:
                a.tickUnit = 4;
                a.multiply = 4;
                break;
            case 7:
                a.tickUnit = 6, a.multiply = 2
        }
    };
    lt.Annotations.Core.RulerHelper.getTickMarkSize =
        function (a, b) {
            var c = 1;
            switch (b) {
                case 1:
                case 2:
                    c = a % 10 ? a % 5 ? 4 : 2 : 1;
                    break;
                case 3:
                    c = a % 3 ? 2 : 1;
                    break;
                case 4:
                    c = a % 12 ? 2 : 1;
                    break;
                case 6:
                    switch (a % 4) {
                        case 0:
                            c = 1;
                            break;
                        case 1:
                        case 3:
                            c = 4;
                            break;
                        case 2:
                            c = 2
                    }
                    break;
                case 7:
                    switch (a % 8) {
                        case 0:
                            c = 1;
                            break;
                        case 4:
                            c = 2;
                            break;
                        case 2:
                        case 6:
                            c = 4;
                            break;
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                            c = 8
                    }
            }
            return c
        };
    lt.Annotations.Core.RulerHelper.getTickMarkFactor = function (a, b, c, d, e) {
        if (0 >= a)return e.outFactor = 0, e.outDivisor = 1;
        var f = 1, g = 1, h = new lt.Annotations.Core.RulerMetadata;
        h.multiply = 1;
        for (h.tickUnit =
                 lt.Annotations.Core.RulerHelper._unitToTicUnit(b); parseInt(a) > d && 7 !== h.tickUnit;)lt.Annotations.Core.RulerHelper._decreaseTickUnit(h), a /= h.multiply, f *= h.multiply;
        for (; parseInt(a) < c && 2 !== h.tickUnit;)lt.Annotations.Core.RulerHelper._increaseTickUnit(h), a *= h.multiply, g *= h.multiply;
        e.outFactor = f;
        e.outDivisor = g;
        return h.tickUnit
    };
    lt.Annotations.Core.RulerHelper.getTickMarks = function (a, b, c, d, e, f) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("mapper");
        var g = a.get_calibrationScale();
        14 === e && (g = 1, e = 0);
        3 === e ? e = 5 : 4 === e && (e = 10);
        var h = lt.Annotations.Core.AnnUnitConverter.convert(lt.Annotations.Core.Utils.distance(b, c), 0, e), b = a.pointFromContainerCoordinates(b, f), c = a.pointFromContainerCoordinates(c, f), a = a.lengthFromContainerCoordinates(d, f | 2), i = lt.Annotations.Core.RulerHelper.getRulerLength([b, c]);
        if (!i || lt.Annotations.Core.AnnDouble.isNaN(i))return null;
        var f = i / h, d = lt.Annotations.Core.Utils.getUnitVector(b, c), c = lt.Annotations.Core.Utils.getUnitVectorPerpendicular(b, c), j = new lt.Annotations.Core.RulerMetadata,
            e = lt.Annotations.Core.RulerHelper.getTickMarkFactor(f, e, 8 * g, 12 * g, j), f = j.outFactor;
        if (!f)return null;
        g *= h * f / j.outDivisor;
        f = i / g;
        g = Math.ceil(g);
        h = Array(2 * g);
        for (i = 0; i < g; i++) {
            var j = lt.Annotations.Core._leadLengthDExtensions.create(a / (2 * lt.Annotations.Core.RulerHelper.getTickMarkSize(i, e))), k = lt.Annotations.Core.Utils.transformPoint(d, lt.Annotations.Core._leadLengthDExtensions.create(i * f), b);
            h[2 * i] = lt.Annotations.Core.Utils.transformPoint(c, j, k);
            c.set_x(-c.get_x());
            c.set_y(-c.get_y());
            h[2 * i + 1] = lt.Annotations.Core.Utils.transformPoint(c,
                j, k)
        }
        return h
    };
    lt.Annotations.Core._encryptTable = function () {
    };
    lt.Annotations.Core._encryptTable.prototype = {
        uSeed: null,
        uRowStart: 0,
        uColStart: 0,
        uWidth: 0,
        uHeight: 0,
        uSize: 0,
        pTable: null
    };
    lt.Annotations.Core._arC4 = function (a, b) {
        var c = a.length, d, e, f = 0, g = 0;
        this.s = [];
        this._c = [];
        this._width = b;
        c || (a.add(0), c++);
        for (; f < this._width;)this.s.add(f), f++;
        for (f = 0; f < b; f++)d = this.s[f], g = this._lowbits(g + d + a[f % c]), e = this.s[g], this.s[f] = e, this.s[g] = d;
        this.getNext(this._width)
    };
    lt.Annotations.Core._arC4.prototype = {
        s: null,
        _c: null, _width: 0, _i: 0, _j: 0, getNext: function (a) {
            var b = this.s, c = this._lowbits(this._i + 1), d = b[c], e = this._lowbits(this._j + d), f = b[e];
            b[c] = f;
            b[e] = d;
            for (var g = b[this._lowbits(d + f)]; --a;)c = this._lowbits(c + 1), d = b[c], e = this._lowbits(e + d), f = b[e], b[c] = f, b[e] = d, g = g * this._width + b[this._lowbits(d + f)];
            this._i = c;
            this._j = e;
            return g
        }, _lowbits: function (a) {
            return a & this._width - 1
        }
    };
    lt.Annotations.Core._randomGenerator = function (a) {
        this._pool = [];
        this._key = [];
        this._startdenom = Math.pow(this._width, this._chunks);
        this._significance =
            Math.pow(2, this._significance);
        this._overflow = 2 * this._significance;
        this._mixkey(Math.random().toString(), this._pool);
        this.seed(a)
    };
    lt.Annotations.Core._randomGenerator.prototype = {
        _width: 256,
        _chunks: 1,
        _significance: 4,
        _overflow: 0,
        _startdenom: 0,
        _arc4: null,
        _min: 0,
        _max: 32767,
        _delta: 32767,
        _lowbits: function (a) {
            return a & this._width - 1
        },
        _mixkey: function (a, b) {
            var c = a, d = 0, e;
            for (e = 0; e < c.length; e++)b[this._lowbits(e)] = this._lowbits((d ^= 19 * b[this._lowbits(e)]) + c.charCodeAt(e));
            c = "";
            for (d = 0; d < b.length; d++)c += String.fromCharCode(b[d]);
            return c
        },
        fGetNextRandom: function () {
            for (var a = this._arc4.getNext(this._chunks), b = this._startdenom, c = 0; a < this._significance;)a = (a + c) * this._width, b *= this._width, c = this._arc4.getNext(1);
            for (; a >= this._overflow;)a /= 2, b /= 2, c >>= 1;
            return (a + c) / b
        },
        getNextRandom: function () {
            return this.fGetNextRandom() * this._delta >> 0
        },
        setBounds: function (a, b) {
            this._min = a;
            this._max = b;
            this._delta = this._max - this._min
        },
        seed: function (a) {
            this._key.clear();
            this._mixkey(a, this._key);
            this._arc4 = new lt.Annotations.Core._arC4(this._key,
                this._width);
            this._mixkey(this._arc4.s.toString(), this._pool)
        }
    };
    lt.Annotations.Core.ScrambleImage = function () {
    };
    lt.Annotations.Core.ScrambleImage.prototype = {
        _imageData: null,
        _imageWidth: 0,
        _imageHeight: 0,
        _rect: null,
        _key: null,
        _flags: 0,
        get_imageData: function () {
            return this._imageData
        },
        set_imageData: function (a) {
            return this._imageData = a
        },
        get_imageWidth: function () {
            return this._imageWidth
        },
        set_imageWidth: function (a) {
            return this._imageWidth = a
        },
        get_imageHeight: function () {
            return this._imageHeight
        },
        set_imageHeight: function (a) {
            return this._imageHeight =
                a
        },
        get_rectangle: function () {
            return this._rect
        },
        set_rectangle: function (a) {
            return this._rect = a
        },
        get_key: function () {
            return this._key
        },
        set_key: function (a) {
            return this._key = a
        },
        get_flags: function () {
            return this._flags
        },
        set_flags: function (a) {
            return this._flags = a
        },
        scramble: function () {
            this.scrambleData(this._imageData, this._imageWidth, this._imageHeight, parseInt(this._rect.get_left()), parseInt(this._rect.get_top()), parseInt(this._rect.get_width()), parseInt(this._rect.get_height()), this._key, this._flags)
        },
        _validateParameters: function (a,
                                       b, c, d, e, f, g, h, i) {
            if (null == i)throw Error("a key must be specified");
            if (!i.trim())throw Error("a key must be specified");
            if (null == a)throw Error("originalData must not be null");
            if (0 >= b)throw Error("invalid originalWidth value");
            if (0 >= c)throw Error("invalid originalHeight value");
            if (4 * b * c !== a.length)throw Error("originalWidth and originalHeight doesn't match the size of the data");
            if (0 > d || d >= b)throw Error("invalid colStart value");
            if (0 > e || e >= c)throw Error("invalid rowStart value");
            if (0 >= f)throw Error("invalid width value");
            if (0 >= g)throw Error("invalid height value");
            if (d + f > b)throw Error("colStart + width is larger than the data width");
            if (e + g > c)throw Error("rowStart + height is larger than the data height");
            if (h & -768)throw Error("no flag were set in flag");
            if (3 === (h & 3))throw Error("cannot specify both encrypt and decrypt");
            if (!(h & 3))throw Error("you must specify either encrypt or decrypt");
        },
        scrambleData: function (a, b, c, d, e, f, g, h, i) {
            this._validateParameters(a, b, c, d, e, f, g, i, h);
            d >>= 0;
            e >>= 0;
            f >>= 0;
            g >>= 0;
            if (i & 4)var j = lt.LeadRectD.create(0,
                0, b, c), g = lt.LeadRectD.create(d, e, f, g), d = Math.max(j.get_left(), g.get_left()), e = Math.max(j.get_top(), g.get_top()), f = Math.min(j.get_right(), g.get_right()) - d, g = Math.min(j.get_bottom(), g.get_bottom()) - e;
            this._internalScrambleImage(a, b, c, d, e, f, g, h, i)
        },
        _memset: function (a, b, c) {
            for (var d = 0; d < c; d++)a[d] = b
        },
        _allocateEncryptTable: function (a, b, c, d, e, f, g) {
            var h = null, h = new lt.Annotations.Core._encryptTable;
            if (null == h)return null;
            h.uSeed = f;
            h.uColStart = b;
            h.uRowStart = c;
            h.uWidth = d;
            h.uHeight = e;
            h.uSize = h.uWidth * h.uHeight;
            b = h.uSize;
            h.pTable = lt.LTHelper.supportsTypedArray ? new Int32Array(b) : Array(b);
            if (null == h.pTable)return null;
            b = h.uSize;
            c = h.pTable;
            if (g)for (var d = 0, e = a[d++], i = a.length, g = 0; g < b; g++) {
                f = a[d++];
                d >= i && (d = 0);
                var j = ((f << 15) + e) % (g + 1), e = f;
                c[g] = c[j];
                c[j] = g
            }
            return h
        },
        _l_CopyBitmapRect: function (a, b, c, d, e, f, g, h) {
            for (var i = c = 0, j = 4 * e, e = 4 * (e + g), h = f + h; f < h; f++) {
                c = 4 * f * b;
                for (g = j; g < e; g += 4)a[i] = d[c + g], a[i + 1] = d[c + g + 1], a[i + 2] = d[c + g + 2], i += 4
            }
        },
        _invertEncryptTable: function (a, b) {
            var c = null, d = null, e = null, f, g = 0, h = 0;
            if (null == a)throw Error("internal error, call LEAD");
            e = this._allocateEncryptTable(b, a.uColStart, a.uRowStart, a.uWidth, a.uHeight, a.uSeed, !1);
            if (null == e)throw Error("internal error, call LEAD");
            var c = a.pTable, d = e.pTable, i = a.uSize;
            for (f = 0; f < i; f++)for (g = f; -1 !== c[g];)h = g, g = c[g], d[g] = h, c[h] = -1;
            c = a.pTable;
            a.pTable = e.pTable;
            e.pTable = c
        },
        _createRandomArray: function (a) {
            var b = null, a = new lt.Annotations.Core._randomGenerator(a), b = lt.LTHelper.supportsTypedArray ? new Int32Array(4095) : Array(4095);
            if (null == b)return null;
            for (var c = 0; 4095 > c; c++)b[c] = a.getNextRandom();
            return b
        },
        _internalScrambleImage: function (a, b, c, d, e, f, g, h, i) {
            var j;
            j = null;
            var i = !!(i & 1), k, l = this._createRandomArray(h);
            j = this._allocateEncryptTable(l, d, e, f, g, h, !0);
            if (null == j)throw Error("internal error, contact LEAD");
            i || this._invertEncryptTable(j, l);
            i = e + g;
            h = lt.LTHelper.supportsTypedArray ? new Uint32Array(4 * f * g) : Array(4 * f * g);
            this._l_CopyBitmapRect(h, b, c, a, d, e, f, g);
            var n, c = j.uWidth, g = j.pTable, o;
            for (j = e; j < i; j++) {
                l = 4 * (d + j * b);
                k = (j - e) * c;
                for (o = k + f; k < o; k++)n = g[k] << 2, a[l] = h[n], a[l + 1] = h[n + 1], a[l + 2] = h[n + 2], l += 4
            }
        }
    };
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype,
        "imageData", {
            get: lt.Annotations.Core.ScrambleImage.prototype.get_imageData,
            set: lt.Annotations.Core.ScrambleImage.prototype.set_imageData,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype, "imageWidth", {
        get: lt.Annotations.Core.ScrambleImage.prototype.get_imageWidth,
        set: lt.Annotations.Core.ScrambleImage.prototype.set_imageWidth,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype, "imageHeight", {
        get: lt.Annotations.Core.ScrambleImage.prototype.get_imageHeight,
        set: lt.Annotations.Core.ScrambleImage.prototype.set_imageHeight, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype, "rectangle", {
        get: lt.Annotations.Core.ScrambleImage.prototype.get_rectangle,
        set: lt.Annotations.Core.ScrambleImage.prototype.set_rectangle,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype, "key", {
        get: lt.Annotations.Core.ScrambleImage.prototype.get_key,
        set: lt.Annotations.Core.ScrambleImage.prototype.set_key,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.ScrambleImage.prototype, "flags", {
        get: lt.Annotations.Core.ScrambleImage.prototype.get_flags,
        set: lt.Annotations.Core.ScrambleImage.prototype.set_flags,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.Utils = function () {
    };
    lt.Annotations.Core.Utils.isFlipedReveresd = function (a) {
        var b = a.get_transform(), a = b.get_m11(), b = b.get_m22();
        return a && b ? parseInt(a / Math.abs(a) * (b / Math.abs(b))) : 1
    };
    lt.Annotations.Core.Utils.compare = function (a,
                                                  b, c) {
        var d = !1;
        c && (a = lt.Annotations.Core.Utils.toLowerCase(a), b = lt.Annotations.Core.Utils.toLowerCase(b));
        return d = !String.compare(a, b)
    };
    lt.Annotations.Core.Utils.get__PI = function () {
        return 3.14159265358979
    };
    lt.Annotations.Core.Utils.getExtendedPoint = function (a, b, c, d, e) {
        var f = b.get_x() - a.get_x(), g = b.get_y() - a.get_y(), h = Math.abs(f), i = Math.abs(g);
        c ? h < i ? b.get_x() > a.get_x() ? b.set_x(b.get_x() - h - i) : b.set_x(b.get_x() + h - i) : h > i && (b.get_y() > a.get_y() ? b.set_y(b.get_y() - i - h) : b.set_y(b.get_y() + i - h)) : d ? (c = Math.atan2(h,
            i), c < Math.PI / 8 ? b.set_x(a.get_x()) : c < 3 * Math.PI / 8 ? (h = Math.sqrt((h * h + i * i) / 2), 0 < f * g ? (0 > f && (h = -h), b.set_x(a.get_x() + h), b.set_y(a.get_y() + h)) : 0 > f ? (b.set_x(a.get_x() - h), b.set_y(a.get_y() + h)) : (b.set_x(a.get_x() + h), b.set_y(a.get_y() - h))) : b.set_y(a.get_y())) : e && b.set_x(a.get_x());
        return b
    };
    lt.Annotations.Core.Utils.divide = function (a, b) {
        return lt.Annotations.Core.Utils.isZero(a) || lt.Annotations.Core.Utils.isZero(b) ? 0 : a / b
    };
    lt.Annotations.Core.Utils.setCheckModifierCallback = function (a) {
        lt.Annotations.Core.Utils._checkModifierCallback =
            a
    };
    lt.Annotations.Core.Utils.checkModifierKey = function (a) {
        return a && null != lt.Annotations.Core.Utils._checkModifierCallback ? lt.Annotations.Core.Utils._checkModifierCallback(a) : !1
    };
    lt.Annotations.Core.Utils.isZero = function (a) {
        return 1.0E-6 > Math.abs(a)
    };
    lt.Annotations.Core.Utils.isEqual = function (a, b) {
        return 1.0E-6 > Math.abs(a - b)
    };
    lt.Annotations.Core.Utils.degreesToRadian = function (a) {
        return a * lt.Annotations.Core.Utils.get__PI() / 180
    };
    lt.Annotations.Core.Utils.findAngle = function (a, b) {
        if (lt.Annotations.Core._leadPointDExtensions.isEmpty(a) ||
            lt.Annotations.Core._leadPointDExtensions.isEmpty(b))return 0;
        var c = lt.Annotations.Core.Utils.subtractPoint(b, a), d = c.get_x(), c = c.get_y();
        if (0 === c)return b.get_x() >= a.get_x() ? 0 : 180;
        if (0 === d)return b.get_y() >= a.get_y() ? 90 : 270;
        d = 180 * Math.atan(Math.abs(c / d)) / Math.acos(-1);
        b.get_x() < a.get_x() && b.get_y() > a.get_y() && (d = 180 - d);
        b.get_x() < a.get_x() && b.get_y() < a.get_y() && (d += 180);
        b.get_x() > a.get_x() && b.get_y() < a.get_y() && (d = 360 - d);
        return d
    };
    lt.Annotations.Core.Utils.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.get_x() -
                b.get_x(), 2) + Math.pow(a.get_y() - b.get_y(), 2))
    };
    lt.Annotations.Core.Utils.subtractPoint = function (a, b) {
        if (lt.Annotations.Core._leadPointDExtensions.isEmpty(b) || lt.Annotations.Core._leadPointDExtensions.isEmpty(a))return lt.Annotations.Core._leadPointDExtensions.create(0, 0);
        var c = new lt.LeadPointD;
        c.set_x(a.get_x() - b.get_x());
        c.set_y(a.get_y() - b.get_y());
        return c
    };
    lt.Annotations.Core.Utils.getUnitVectorPerpendicular = function (a, b) {
        var c = lt.Annotations.Core.Utils.getUnitVector(a, b);
        return lt.Annotations.Core._leadPointDExtensions.isEmpty(c) ?
            c : lt.Annotations.Core._leadPointDExtensions.create(c.get_y(), -c.get_x())
    };
    lt.Annotations.Core.Utils.getUnitVector = function (a, b) {
        var c = lt.Annotations.Core.Utils.subtractPoint(b, a), d = c.get_x(), c = c.get_y();
        if (!d && !c)return lt.Annotations.Core._leadPointDExtensions.get_empty();
        if (!d && 1 < c)return lt.Annotations.Core._leadPointDExtensions.create(0, 1);
        if (!d && 1 > c)return lt.Annotations.Core._leadPointDExtensions.create(0, -1);
        if (!c && 1 < d)return lt.Annotations.Core._leadPointDExtensions.create(1, 0);
        if (!c && 1 > d)return lt.Annotations.Core._leadPointDExtensions.create(-1,
            0);
        var e = Math.sqrt(d * d + c * c);
        return c = lt.Annotations.Core._leadPointDExtensions.create(d / e, c / e)
    };
    lt.Annotations.Core.Utils.transformPoint = function (a, b, c) {
        return lt.Annotations.Core._leadPointDExtensions.create(c.get_x() + a.get_x() * b.get_value(), c.get_y() + a.get_y() * b.get_value())
    };
    lt.Annotations.Core.Utils.intersect = function (a, b, c, d) {
        var e = lt.Annotations.Core.Utils.getUnitVector(a, b), f = lt.Annotations.Core.Utils.getUnitVector(c, d), b = d = lt.Annotations.Core.AnnDouble.naN, e = e.get_y() / e.get_x(), f = f.get_y() /
            f.get_x();
        if (lt.Annotations.Core.AnnDouble.isInfinity(f) && lt.Annotations.Core.AnnDouble.isInfinity(e))return lt.Annotations.Core._leadPointDExtensions.get_empty();
        lt.Annotations.Core.AnnDouble.isInfinity(f) ? (d = a.get_x(), b = e + a.get_y()) : lt.Annotations.Core.AnnDouble.isInfinity(e) ? (d = a.get_x(), b = f * (d - c.get_x()) + c.get_y()) : e !== f && (d = (a.get_y() - c.get_y() + f * c.get_x() - e * a.get_x()) / (f - e), b = e * (d - a.get_x()) + a.get_y());
        return lt.Annotations.Core._leadPointDExtensions.create(d, b)
    };
    lt.Annotations.Core.Utils.hitTestLine =
        function (a, b, c, d, e) {
            if (e) {
                var e = Math.min(a.get_x(), b.get_x()) - d, f = Math.min(a.get_y(), b.get_y()) - d, g = Math.max(a.get_x(), b.get_x()) + d, h = Math.max(a.get_y(), b.get_y()) + d;
                if (!(c.get_x() >= e && c.get_x() <= g && c.get_y() >= f && c.get_y() <= h))return !1
            }
            e = !1;
            !lt.Annotations.Core._leadPointDExtensions.isEmpty(a) && !lt.Annotations.Core._leadPointDExtensions.isEmpty(b) && (b = lt.Annotations.Core.Utils.getUnitVector(a, b), a = (c.get_y() - a.get_y()) * b.get_x() - (c.get_x() - a.get_x()) * b.get_y(), a >= -d && a <= d && (e = !0));
            return e
        };
    lt.Annotations.Core.Utils.hitTestPolygon =
        function (a, b) {
            if (null == a || !a.get_count())return !1;
            for (var c = a.get_count(), d = !1, e = b.get_x(), f = b.get_y(), g = 0, h = c - 1; g < c; h = g++)a.get_item(g).get_y() > f !== a.get_item(h).get_y() > f && e < (a.get_item(h).get_x() - a.get_item(g).get_x()) * (f - a.get_item(g).get_y()) / (a.get_item(h).get_y() - a.get_item(g).get_y()) + a.get_item(g).get_x() && (d = !d);
            return d
        };
    lt.Annotations.Core.Utils.hitTestPolygonArray = function (a, b) {
        if (null == a || !a.length)return !1;
        for (var c = a.length, d = !1, e = b.get_x(), f = b.get_y(), g = 0, h = c - 1; g < c; h = g++)a[g].get_y() >
        f !== a[h].get_y() > f && e < (a[h].get_x() - a[g].get_x()) * (f - a[g].get_y()) / (a[h].get_y() - a[g].get_y()) + a[g].get_x() && (d = !d);
        return d
    };
    lt.Annotations.Core.Utils.hitTestBezier = function (a, b, c, d) {
        for (var e = a[b + 0].get_x(), f = a[b + 0].get_y(), g = a[b + 1].get_x(), h = a[b + 1].get_y(), i = a[b + 2].get_x(), j = a[b + 2].get_y(), k = a[b + 3].get_x(), l = a[b + 3].get_y(), n = 3 * (k - i - g + e) / 8, o = (k + e) / 2 - n, g = (k + 3 * (g - i) - e) / 8, e = (k - e) / 2 - g, k = 3 * (l - j - h + f) / 8, i = (l + f) / 2 - k, h = (l + 3 * (h - j) - f) / 8, f = (l - f) / 2 - h, a = lt.Annotations.Core._leadPointDExtensions.clone(a[b]), b =
            lt.Annotations.Core._leadPointDExtensions.create(0, 0), l = !1, j = 0; 1 > j && !l;) {
            var m = 2 * j - 1;
            b.set_x(g * m * m * m + n * m * m + e * m + o);
            b.set_y(h * m * m * m + k * m * m + f * m + i);
            lt.Annotations.Core.Utils.hitTestLine(a, b, c, d, !0) ? l = !0 : (j += 0.1, a = lt.Annotations.Core._leadPointDExtensions.clone(b))
        }
        return l
    };
    lt.Annotations.Core.Utils.fixRectangle = function (a, b, c) {
        for (var a = [lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y()), lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height())],
                 d = 0; d < a.length; ++d)a[d] = lt.Annotations.Core.Utils.fixPoint(a[d], b, c);
        return lt.Annotations.Core._leadRectDExtensions.fromLTRB(a[0].get_x(), a[0].get_y(), a[1].get_x(), a[1].get_y())
    };
    lt.Annotations.Core.Utils.fixPoint = function (a, b, c) {
        var d = a;
        if (1 === (c & 1)) {
            b.pointFromContainerCoordinates(a, 0);
            var e = b.get_transform().clone(), d = b.pointToContainerCoordinates(lt.Annotations.Core._leadPointDExtensions.create(0, 0)), e = b.pointToContainerCoordinates(lt.Annotations.Core._leadPointDExtensions.create(b.get_scrollOffset().get_x(),
                b.get_scrollOffset().get_y())), d = lt.Annotations.Core.Utils.subtractPoint(e, d), d = lt.Annotations.Core.Utils.subtractPoint(a, d)
        }
        if (2 === (c & 2)) {
            var c = b.pointFromContainerCoordinates(d, 0), f = b.pointFromContainerCoordinates(d, 2);
            if (lt.Annotations.Core._leadPointDExtensions.isEqual(c, f))return a;
            f = lt.Annotations.Core.AnnTransformer.translatePoint(f, -b.get_transform().get_offsetX() / b.get_transform().get_m11(), -b.get_transform().get_offsetY() / b.get_transform().get_m22());
            e = b.get_transform().clone();
            e.get_hasInverse() &&
            e.invert();
            e.translate(-b.get_transform().get_offsetX() / b.get_transform().get_m11(), -b.get_transform().get_offsetY() / b.get_transform().get_m22());
            d = lt.Annotations.Core.AnnTransformer.translatePoint(c, e.get_offsetX(), e.get_offsetY());
            e.translate(-e.get_offsetX(), -e.get_offsetY());
            d = b.internalPointToContainerCoordinates(d, e);
            d = lt.Annotations.Core.AnnTransformer.scalePoint(d, c.get_x() / f.get_x(), c.get_y() / f.get_y())
        }
        return d
    };
    lt.Annotations.Core.Utils.getBoundingRectangle = function (a, b) {
        var c = Math.min(a.get_x(),
            b.get_x()), d = Math.min(a.get_y(), b.get_y()), e = Math.max(a.get_x(), b.get_x()), f = Math.max(a.get_y(), b.get_y());
        return lt.Annotations.Core._leadRectDExtensions.create(c, d, Math.abs(e - c), Math.abs(f - d))
    };
    lt.Annotations.Core.Utils.splineCurve = function (a, b) {
        var c = [], d = null;
        if (2 === a.length) {
            if (d = lt.Annotations.Core.Utils.calculateSplineCurve(a[0], a[0], a[1], a[1], b), null != d)for (var e = 0; e < d.length; e++)c.add(d[e])
        } else for (var f = 0; f < a.length - 1; f++) {
            d = f ? f === a.length - 2 ? lt.Annotations.Core.Utils.calculateSplineCurve(a[f -
            1], a[f], a[f + 1], a[f + 1], b) : lt.Annotations.Core.Utils.calculateSplineCurve(a[f - 1], a[f], a[f + 1], a[f + 2], b) : lt.Annotations.Core.Utils.calculateSplineCurve(a[0], a[0], a[1], a[2], b);
            for (e = 0; e < d.length; e++)c.add(d[e])
        }
        d = null;
        if (0 < c.length) {
            d = Array(c.length);
            for (f = 0; f < c.length; ++f)d[f] = c[f]
        }
        return d
    };
    lt.Annotations.Core.Utils.calculateSplineCurve = function (a, b, c, d, e) {
        for (var f = Array(20), g = 0; 20 > g; ++g)f[g] = lt.Annotations.Core._leadPointDExtensions.get_empty();
        for (var h = e * (c.get_x() - a.get_x()), a = e * (c.get_y() - a.get_y()),
                 g = e * (d.get_x() - b.get_x()), i = e * (d.get_y() - b.get_y()), d = h + g + 2 * b.get_x() - 2 * c.get_x(), e = a + i + 2 * b.get_y() - 2 * c.get_y(), j = -2 * h - g - 3 * b.get_x() + 3 * c.get_x(), c = -2 * a - i - 3 * b.get_y() + 3 * c.get_y(), i = b.get_x(), b = b.get_y(), g = 0; g < f.length; g++) {
            var k = g / (f.length - 1);
            f[g] = lt.Annotations.Core._leadPointDExtensions.create(parseInt(d * k * k * k + j * k * k + h * k + i), parseInt(e * k * k * k + c * k * k + a * k + b))
        }
        return f
    };
    lt.Annotations.Core.Utils.splineClosedCurve = function (a, b) {
        for (var c = [], d = null, e = 0; e < a.length; e++)for (var d = e ? e === a.length - 1 ? lt.Annotations.Core.Utils.calculateSplineCurve(a[e -
        1], a[e], a[0], a[1], b) : e === a.length - 2 ? lt.Annotations.Core.Utils.calculateSplineCurve(a[e - 1], a[e], a[e + 1], a[0], b) : lt.Annotations.Core.Utils.calculateSplineCurve(a[e - 1], a[e], a[e + 1], a[e + 2], b) : lt.Annotations.Core.Utils.calculateSplineCurve(a[a.length - 1], a[0], a[1], a[2], b), f = 0; f < d.length; f++)c.add(d[f]);
        d = null;
        d = Array(c.length);
        for (e = 0; e < c.length; ++e)d[e] = c[e];
        return d
    };
    lt.Annotations.Core.Utils.precisionFormat = function (a, b) {
        var c = String.format("XXX:F{0}", a), c = c.replaceAll("XXX", "{0"), c = String.format("{0}{1}",
            c, "}");
        return String.format(c, b)
    };
    lt.Annotations.Core.Utils.enumToString = function (a, b) {
        for (var c in a) {
            var d = c;
            if (a[d] === b)return d = d.substr(0, 1).toUpperCase() + d.substr(1)
        }
        lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("value", b, "Enum member not found");
        return null
    };
    lt.Annotations.Core.Utils.enumParse = function (a, b) {
        var c = b.substr(0, 1).toLowerCase() + b.substr(1);
        return a[c]
    };
    lt.Annotations.Core.Utils.fromBase64String = function (a) {
        return lt.LTHelper.base64Decode(a)
    };
    lt.Annotations.Core.Utils.toBase64String =
        function (a) {
            return lt.LTHelper.base64Encode(a, !1)
        };
    lt.Annotations.Core.Utils.isRightAngle = function (a) {
        for (; 360 <= a;)a -= 360;
        for (; 0 > a;)a += 360;
        return lt.LeadDoubleTools.areClose(a, 0) || lt.LeadDoubleTools.areClose(a, 90) || lt.LeadDoubleTools.areClose(a, 180) || lt.LeadDoubleTools.areClose(a, 270)
    };
    lt.Annotations.Core.Utils.getAutomationOffset = function (a, b) {
        return b.get_offset()
    };
    lt.Annotations.Core.Utils.getAutomationSize = function (a, b) {
        return null != b ? b.get_mapper().sizeFromContainerCoordinates(b.get_size()) :
            lt.Annotations.Core._leadSizeDExtensions.get_empty()
    };
    lt.Annotations.Core.Utils.setRenderingEngine = function (a, b) {
        a.set_renderingEngine(b)
    };
    lt.Annotations.Core.Utils.realizeRedactWinforms = function (a, b, c) {
        lt.Annotations.Core._leadRectDExtensions.get_empty();
        null != c && c.realize(a.get_automationDataProvider(), b);
        return c.get_rect()
    };
    lt.Annotations.Core.Utils.restoreRedactWinforms = function (a, b, c) {
        var d = lt.Annotations.Core._leadRectDExtensions.get_empty();
        null != c && c.restore(a.get_automationDataProvider(),
            b);
        return d
    };
    lt.Annotations.Core.Utils.applyEncrypt = function (a, b, c) {
        var d = lt.Annotations.Core._leadRectDExtensions.get_empty();
        null != c && c.apply(a.get_automationDataProvider(), b);
        return d
    };
    lt.Annotations.Core.Utils.dataProviderCanReadWrite = function (a) {
        var b = !1;
        null != a && null != a.get_automationDataProvider() && (b = a.get_automationDataProvider().get_canRead() && a.get_automationDataProvider().get_canWrite());
        return b
    };
    lt.Annotations.Core.Utils.toLowerCase = function (a) {
        return String.isNullOrEmpty(a) ? a : a.toLowerCase()
    };
    lt.Annotations.Core.Utils.toStringInvariantCulture = function (a) {
        return a.toString()
    };
    lt.Annotations.Core._annOnLoadData = function () {
        this._offset = lt.Annotations.Core._leadPointDExtensions.create(0, 0)
    };
    lt.Annotations.Core._annOnLoadData.prototype = {
        _rotateAngle: 0, get_rotateAngle: function () {
            return this._rotateAngle
        }, set_rotateAngle: function (a) {
            return this._rotateAngle = a
        }, _scalX: 1, get_scaleX: function () {
            return this._scalX
        }, set_scaleX: function (a) {
            return this._scalX = a
        }, _scalY: 1, get_scaleY: function () {
            return this._scalY
        },
        set_scaleY: function (a) {
            return this._scalY = a
        }, get_offset: function () {
            return this._offset
        }, set_offset: function (a) {
            return this._offset = a
        }
    };
    lt.Annotations.Core.AnnCodecsInfo = function () {
    };
    lt.Annotations.Core.AnnCodecsInfo.prototype = {
        _format: 0, get_format: function () {
            return this._format
        }, set_format: function (a) {
            return this._format = a
        }, _version: 0, get_version: function () {
            return this._version
        }, set_version: function (a) {
            return this._version = a
        }, _pages: null, get_pages: function () {
            return this._pages
        }, set_pages: function (a) {
            return this._pages =
                a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnCodecsInfo.prototype, "format", {
        get: lt.Annotations.Core.AnnCodecsInfo.prototype.get_format,
        set: lt.Annotations.Core.AnnCodecsInfo.prototype.set_format,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecsInfo.prototype, "version", {
        get: lt.Annotations.Core.AnnCodecsInfo.prototype.get_version,
        set: lt.Annotations.Core.AnnCodecsInfo.prototype.set_version,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecsInfo.prototype,
        "pages", {
            get: lt.Annotations.Core.AnnCodecsInfo.prototype.get_pages,
            set: lt.Annotations.Core.AnnCodecsInfo.prototype.set_pages,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnSerializeObjectEventArgs = function () {
        lt.Annotations.Core.AnnSerializeObjectEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnSerializeObjectEventArgs.create = function (a, b, c) {
        var d = new lt.Annotations.Core.AnnSerializeObjectEventArgs;
        d._typeName$1 = a;
        d._error$1 = c;
        d._annObject$1 = b;
        return d
    };
    lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype =
    {
        _typeName$1: null, get_typeName: function () {
        return this._typeName$1
    }, _error$1: null, get_error: function () {
        return this._error$1
    }, _annObject$1: null, get_annObject: function () {
        return this._annObject$1
    }, set_annObject: function (a) {
        return this._annObject$1 = a
    }, _skipObject$1: !1, get_skipObject: function () {
        return this._skipObject$1
    }, set_skipObject: function (a) {
        return this._skipObject$1 = a
    }
    };
    Object.defineProperty(lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype, "typeName", {
        get: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.get_typeName,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype, "error", {
        get: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.get_error,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype, "annObject", {
        get: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.get_annObject,
        set: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.set_annObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype, "skipObject", {
        get: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.get_skipObject,
        set: lt.Annotations.Core.AnnSerializeObjectEventArgs.prototype.set_skipObject,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnSerializeOptions = function () {
    };
    lt.Annotations.Core.AnnSerializeOptions.prototype = {
        add_serializeObject: function (a) {
            this.__serializeObject = ss.Delegate.combine(this.__serializeObject, a)
        }, remove_serializeObject: function (a) {
            this.__serializeObject =
                ss.Delegate.remove(this.__serializeObject, a)
        }, __serializeObject_handler_get: function () {
            null == this.__serializeObject_handler && (this.__serializeObject_handler = ss.EventHandler.create(this, this.add_serializeObject, this.remove_serializeObject));
            return this.__serializeObject_handler
        }, __serializeObject: null, __serializeObject_handler: null, _onSerializeObject: function (a) {
            null != this.__serializeObject && this.__serializeObject(this, a)
        }, _saveLockPassword: !0, get_saveLockPassword: function () {
            return this._saveLockPassword
        },
        set_saveLockPassword: function (a) {
            return this._saveLockPassword = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnSerializeOptions.prototype, "serializeObject", {
        get: lt.Annotations.Core.AnnSerializeOptions.prototype.__serializeObject_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSerializeOptions.prototype, "saveLockPassword", {
        get: lt.Annotations.Core.AnnSerializeOptions.prototype.get_saveLockPassword,
        set: lt.Annotations.Core.AnnSerializeOptions.prototype.set_saveLockPassword,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnDeserializeOptions = function () {
    };
    lt.Annotations.Core.AnnDeserializeOptions.prototype = {
        add_deserializeObject: function (a) {
            this.__deserializeObject = ss.Delegate.combine(this.__deserializeObject, a)
        },
        remove_deserializeObject: function (a) {
            this.__deserializeObject = ss.Delegate.remove(this.__deserializeObject, a)
        },
        __deserializeObject_handler_get: function () {
            null == this.__deserializeObject_handler && (this.__deserializeObject_handler = ss.EventHandler.create(this,
                this.add_deserializeObject, this.remove_deserializeObject));
            return this.__deserializeObject_handler
        },
        __deserializeObject: null,
        __deserializeObject_handler: null,
        _onDeserializeObject: function (a) {
            null != this.__deserializeObject && this.__deserializeObject(this, a)
        },
        add_deserializeObjectError: function (a) {
            this.__deserializeObjectError = ss.Delegate.combine(this.__deserializeObjectError, a)
        },
        remove_deserializeObjectError: function (a) {
            this.__deserializeObjectError = ss.Delegate.remove(this.__deserializeObjectError,
                a)
        },
        __deserializeObjectError_handler_get: function () {
            null == this.__deserializeObjectError_handler && (this.__deserializeObjectError_handler = ss.EventHandler.create(this, this.add_deserializeObjectError, this.remove_deserializeObjectError));
            return this.__deserializeObjectError_handler
        },
        __deserializeObjectError: null,
        __deserializeObjectError_handler: null,
        _onDeserializeObjectError: function (a) {
            null != this.__deserializeObjectError && this.__deserializeObjectError(this, a)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnDeserializeOptions.prototype,
        "deserializeObject", {
            get: lt.Annotations.Core.AnnDeserializeOptions.prototype.__deserializeObject_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnDeserializeOptions.prototype, "deserializeObjectError", {
        get: lt.Annotations.Core.AnnDeserializeOptions.prototype.__deserializeObjectError_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnCodecs = function () {
        this._loadLookup = {};
        this._saveLookup = {};
        this._loadSourceResolution = lt.Annotations.Core._leadSizeDExtensions.create(0,
            0);
        this._loadTargetResolution = lt.Annotations.Core._leadSizeDExtensions.create(0, 0)
    };
    lt.Annotations.Core.AnnCodecs._xmlDocumentToString = function (a) {
        var b = "";
        window.ActiveXObject ? (b = a.xml, ss.isUndefined(b) && (b = new XMLSerializer, b = b.serializeToString(a))) : (b = new XMLSerializer, b = b.serializeToString(a));
        return b
    };
    lt.Annotations.Core.AnnCodecs._checkInfo = function (a) {
        return 1 === a.get_format() && 1 === a.get_version() ? !0 : !1
    };
    lt.Annotations.Core.AnnCodecs.prototype = {
        _saveLayerCount: 1, _serializeOptions: null, get_serializeOptions: function () {
            return this._serializeOptions
        },
        set_serializeOptions: function (a) {
            return this._serializeOptions = a
        }, _deserializeOptions: null, get_deserializeOptions: function () {
            return this._deserializeOptions
        }, set_deserializeOptions: function (a) {
            return this._deserializeOptions = a
        }, get_loadSourceResolution: function () {
            return this._loadSourceResolution
        }, set_loadSourceResolution: function (a) {
            return this._loadSourceResolution = a
        }, get_loadTargetResolution: function () {
            return this._loadTargetResolution
        }, set_loadTargetResolution: function (a) {
            return this._loadTargetResolution =
                a
        }, _loadUseDpi: !1, get_loadUseDpi: function () {
            return this._loadUseDpi
        }, set_loadUseDpi: function (a) {
            return this._loadUseDpi = a
        }, loadFromXmlDocument: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("document");
            a = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(a);
            return this._doLoad(a, b)
        }, getInfo: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("xmlData");
            var b = new lt.Annotations.Core.AnnCodecsInfo;
            b.set_format(0);
            a = (new DOMParser).parseFromString(a,
                "application/xml");
            a = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(a);
            this._doGetInfo(a, b);
            return b
        }, getInfoFromXmlDocument: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("document");
            var a = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(a), b = new lt.Annotations.Core.AnnCodecsInfo;
            b.set_format(0);
            this._doGetInfo(a, b);
            return b
        }, load: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("xmlData");
            var c = (new DOMParser).parseFromString(a,
                "application/xml"), c = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(c);
            return this._doLoad(c, b)
        }, save: function (a, b, c, d) {
            var e = "";
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
            1 !== b && lt.Annotations.Core.ExceptionHelper.argumentException("Must be 'AnnFormat.Annotations'", "format");
            0 > d && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("savePageNumber", d, "Must be a value greater than or 0");
            (b = 0 < d ? d : a.get_pageNumber()) || (b = 1);
            d = !0;
            String.isNullOrEmpty(c) ||
            (d = !1);
            if (!d)try {
                var f = this.getInfo(c);
                lt.Annotations.Core.AnnCodecs._checkInfo(f) || (d = !0)
            } catch (g) {
                d = !0
            }
            if (d)c = this._createEmptyDocument(), a = this._createContainerNode(c, a, b), b = this._getRootNode(c), null != b && b.appendChild(a); else {
                c = (new DOMParser).parseFromString(c, "application/xml");
                a = this._createContainerNode(c, a, b);
                f = this._getRootNode(c);
                for (d = ss.IEnumerator.getEnumerator(f.childNodes); d.moveNext();)if (e = d.current, "Container" === e.nodeName) {
                    var h = parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(c,
                        "PageNumber", e, 0));
                    if (b === h) {
                        f.removeChild(e);
                        break
                    }
                }
                f.appendChild(a)
            }
            return e = lt.Annotations.Core.AnnCodecs._xmlDocumentToString(c)
        }, loadAll: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("xmlData");
            a = (new DOMParser).parseFromString(a, "application/xml");
            a = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(a);
            return this._doLoadAll(a)
        }, loadAllFromXML: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("document");
            a = lt.Annotations.Core.AnnXmlHelper.createActiveXDocument(a);
            return this._doLoadAll(a)
        }, saveAll: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("containers");
            1 !== b && lt.Annotations.Core.ExceptionHelper.argumentException("Must be 'AnnFormat.Annotations'", "format");
            var c = this._createEmptyDocument(), d = this._getRootNode(c);
            if (null != d)for (var e = ss.IEnumerator.getEnumerator(a); e.moveNext();) {
                var f = e.current;
                null != f && (f = this._createContainerNode(c, f, f.get_pageNumber()), d.appendChild(f))
            }
            return lt.Annotations.Core.AnnCodecs._xmlDocumentToString(c)
        },
        saveLayer: function (a, b, c) {
            var d = new lt.Annotations.Core.AnnContainer;
            d.set_pageNumber(1);
            d.get_layers().add(a);
            this._readObjects(a, d.get_children());
            return this.save(d, b, c, 1)
        }, _doGetInfo: function (a, b) {
            var c = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Annotations", a), d = [];
            if (null != c)if (b.set_version(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Version", c, 1)), b.set_format(1), lt.Annotations.Core.AnnCodecs._checkInfo(b)) {
                c = lt.Annotations.Core.AnnXmlHelper.getMatchingChildren(a,
                    "Container", c);
                for (c = ss.IEnumerator.getEnumerator(c); c.moveNext();) {
                    var e = this._readContainer(a, c.current, !1);
                    d.add(e.get_pageNumber())
                }
                b.set_pages(Array(d.length));
                for (c = 0; c < d.length; c++)b.get_pages()[c] = d[c]
            } else b.set_version(0), b.set_format(0)
        }, _readObjects: function (a, b) {
            for (var c = ss.IEnumerator.getEnumerator(a.get_children()); c.moveNext();)b.add(c.current);
            if (null != a.get_layers() && 0 < a.get_layers().get_count())for (c = ss.IEnumerator.getEnumerator(a.get_layers()); c.moveNext();)this._readObjects(c.current,
                b)
        }, _doLoad: function (a, b) {
            var c = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Annotations", a);
            if (null != c) {
                var d = new lt.Annotations.Core.AnnCodecsInfo;
                d.set_version(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Version", c, 1));
                d.set_format(1);
                if (!lt.Annotations.Core.AnnCodecs._checkInfo(d))return null;
                c = lt.Annotations.Core.AnnXmlHelper.getMatchingChildren(a, "Container", c);
                for (c = ss.IEnumerator.getEnumerator(c); c.moveNext();) {
                    var d = c.current, e = this._readContainer(a, d, !1);
                    if (!b || b ===
                        e.get_pageNumber())return e = this._readContainer(a, d, !0)
                }
            }
            return null
        }, _doLoadAll: function (a) {
            var b = [], c = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Annotations", a);
            if (null != c) {
                var d = new lt.Annotations.Core.AnnCodecsInfo;
                d.set_version(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "Version", c, 1));
                d.set_format(1);
                if (!lt.Annotations.Core.AnnCodecs._checkInfo(d))return null;
                c = lt.Annotations.Core.AnnXmlHelper.getMatchingChildren(a, "Container", c);
                for (c = ss.IEnumerator.getEnumerator(c); c.moveNext();)d =
                    this._readContainer(a, c.current, !0), b.add(d)
            }
            a = Array(b.length);
            for (c = 0; c < b.length; c++)a[c] = b[c];
            return a
        }, _readContainer: function (a, b, c) {
            var d = new lt.Annotations.Core.AnnContainer;
            d.set_pageNumber(parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "PageNumber", b, 0)));
            d.set_size(lt.Annotations.Core.AnnXmlHelper.readSizeElement(a, "Size", b, lt.Annotations.Core._leadSizeDExtensions.create(0, 0)));
            d.set_offset(lt.Annotations.Core.AnnXmlHelper.readPointElement(a, "Offset", b, lt.Annotations.Core._leadPointDExtensions.create(0,
                0)));
            d.get_mapper().set_calibrationScale(lt.Annotations.Core.AnnXmlHelper.readNumericElement(a, "CalibrationScale", b, 1));
            d.set_userData(lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "UserData", b, ""));
            d.set_isEnabled(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(a, "IsEnabled", b, d.get_isEnabled()));
            d.set_isVisible(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(a, "IsVisible", b, d.get_isVisible()));
            var e = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit, 5);
            d.get_mapper().set_calibrationUnit(lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnUnit,
                lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "CalibrationUnit", b, e)));
            Object.clearKeys(this._loadLookup);
            this._readLayers(a, b, d.get_layers());
            var e = null, f = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Objects", b);
            null != f && (e = lt.Annotations.Core.AnnXmlHelper._readOnLoadElement(a, "OnLoad", f));
            var f = this._loadSourceResolution.get_width(), g = this._loadSourceResolution.get_height(), h = this._loadTargetResolution.get_width(), i = this._loadTargetResolution.get_height();
            f && g && h && i && (this._loadUseDpi ?
                d.get_mapper().mapResolutions(f, g, h, i) : d.get_mapper().mapResolutions(f, g, f, f));
            if (c) {
                b = this._getObjects(a, b);
                for (b = ss.IEnumerator.getEnumerator(b); b.moveNext();)c = b.current, lt.Annotations.Core.AnnXmlHelper.isNodeName(c, "Object") && this._enumerateObjects(a, c, d)
            }
            if (null != e && !lt.Annotations.Core.AnnDouble.isInfinity(d.get_size().get_width()) && !lt.Annotations.Core.AnnDouble.isInfinity(d.get_size().get_height())) {
                a = lt.Annotations.Core._leadRectDExtensions.create(0, 0, d.get_size().get_width(), d.get_size().get_height());
                a = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width() / 2, a.get_y() + a.get_height() / 2);
                for (b = ss.IEnumerator.getEnumerator(d.get_children()); b.moveNext();)c = b.current, lt.Annotations.Core._leadPointDExtensions.isEmpty(a) || ((1 !== e.get_scaleX() || 1 !== e.get_scaleY()) && c.scale(e.get_scaleX(), e.get_scaleY(), a), 0 !== e.get_rotateAngle() && c.rotate(e.get_rotateAngle(), a)), f = d.get_mapper().pointToContainerCoordinates(e.get_offset()), lt.Annotations.Core._leadPointDExtensions.isEmpty(f) || c.translate(f.get_x(),
                    f.get_y())
            }
            return d
        }, _getObjects: function (a, b) {
            var c = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Objects", b);
            return null == c ? null : lt.Annotations.Core.AnnXmlHelper.getChildren(c)
        }, _enumerateObjects: function (a, b, c) {
            var d = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, "ObjectType", b, ""), d = d.replaceAll("Leadtools.Annotations", "lt.Annotations");
            if (!String.isNullOrEmpty(d)) {
                a = null;
                if (null != this.get_deserializeOptions()) {
                    var e = lt.Annotations.Core.AnnSerializeObjectEventArgs.create(d, null,
                        null);
                    this.get_deserializeOptions()._onDeserializeObject(e);
                    if (null != e.get_error())throw e.get_error();
                    if (e.get_skipObject())return;
                    null != e.get_annObject() && (a = e.get_annObject())
                }
                if (null == a)try {
                    a = new (Type.getType(d))(null)
                } catch (f) {
                    if (null != this.get_deserializeOptions()) {
                        e = lt.Annotations.Core.AnnSerializeObjectEventArgs.create(d, null, f);
                        this.get_deserializeOptions()._onDeserializeObjectError(e);
                        if (e.get_skipObject())return;
                        null != e.get_annObject() && (a = e.get_annObject())
                    }
                }
                null != a && (a.set_parent(c),
                    a.deserialize(this.get_deserializeOptions(), b, null), b = a.get__layerId(), String.isNullOrEmpty(b) || (b = this._loadLookup[b], b.get_children().add(a), a.set_layer(b)), c.get_children().add(a))
            }
        }, _getRootNode: function (a) {
            return lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a, "Annotations", a)
        }, _createEmptyDocument: function () {
            var a = String.format("{0}<{1}></{2}>", '<?xml version="1.0" encoding="utf-8"?>', "Annotations", "Annotations"), a = (new DOMParser).parseFromString(a, "application/xml"), b = this._getRootNode(a);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "Version", b, 1);
            return a
        }, _createContainerNode: function (a, b, c) {
            var d = lt.Annotations.Core.AnnXmlHelper.createElement(a, "Container");
            this._writeContainer(a, d, b, c);
            return d
        }, _writeContainer: function (a, b, c, d) {
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a, "PageNumber", b, d);
            lt.Annotations.Core.AnnXmlHelper.writeSizeElement(a, "Size", b, c.get_size());
            lt.Annotations.Core.AnnXmlHelper.writePointElement(a, "Offset", b, c.get_offset());
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(a,
                "CalibrationScale", b, c.get_mapper().get_calibrationScale());
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(a, "IsVisible", b, c.get_isVisible());
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(a, "IsEnabled", b, c.get_isEnabled());
            null != c.get_userData() ? lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "UserData", b, c.get_userData().toString()) : lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "UserData", b, "");
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(a, "CalibrationUnit", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit,
                c.get_mapper().get_calibrationUnit()));
            this._saveLayerCount = 1;
            this._writeLayers(a, b, c.get_layers());
            d = lt.Annotations.Core.AnnXmlHelper.createElement(a, "Objects");
            lt.Annotations.Core.AnnXmlHelper._writeOnLoadElement(a, "OnLoad", d);
            for (c = ss.IEnumerator.getEnumerator(c.get_children()); c.moveNext();) {
                var e = c.current, f = e.get__layerId(), g = e.get_layer();
                null != g && (Object.keyExists(this._saveLookup, g) ? e.set__layerId(this._saveLookup[g]) : e.set__layerId(""));
                g = !1;
                null != this.get_serializeOptions() && (g = lt.Annotations.Core.AnnSerializeObjectEventArgs.create(Type.getInstanceType(e).get_fullName(),
                    e, null), this.get_serializeOptions()._onSerializeObject(g), g = g.get_skipObject());
                g || (g = lt.Annotations.Core.AnnXmlHelper.createElement(a, "Object"), e.serialize(this.get_serializeOptions(), g, a), lt.Annotations.Core.AnnXmlHelper.appendChild(d, g));
                e.set__layerId(f)
            }
            lt.Annotations.Core.AnnXmlHelper.appendChild(b, d)
        }, _writeLayer: function (a, b, c) {
            if (!Object.keyExists(this._saveLookup, c)) {
                var d = "Layer" + this._saveLayerCount++, e = lt.Annotations.Core.AnnXmlHelper.createElement(a, "Layer");
                this._saveLookup[c] = d;
                lt.Annotations.Core.AnnXmlHelper.setAttributeValue(e,
                    "Name", c.get_name());
                lt.Annotations.Core.AnnXmlHelper.setAttributeValue(e, "Id", d);
                lt.Annotations.Core.AnnXmlHelper.setAttributeValue(e, "IsVisible", c.get_isVisible().toString());
                this._writeLayers(a, e, c.get_layers());
                lt.Annotations.Core.AnnXmlHelper.appendChild(b, e)
            }
        }, _writeLayers: function (a, b, c) {
            if (null != c && 0 < c.get_count()) {
                for (var d = lt.Annotations.Core.AnnXmlHelper.createElement(a, "Layers"), c = ss.IEnumerator.getEnumerator(c); c.moveNext();)this._writeLayer(a, d, c.current);
                lt.Annotations.Core.AnnXmlHelper.appendChild(b,
                    d)
            }
        }, _readLayer: function (a, b) {
            var c = "", d = "", e = !0, f = null, d = lt.Annotations.Core.AnnXmlHelper.getAttributeValue("Id", b);
            String.isNullOrEmpty(d) || (c = lt.Annotations.Core.AnnXmlHelper.getAttributeValue("Name", b), e = Boolean.parse(lt.Annotations.Core.AnnXmlHelper.getAttributeValue("IsVisible", b)), f = new lt.Annotations.Core.AnnLayer, f.set_name(c), this._readLayers(a, b, f.get_layers()), f.set_layerId(d), f.set_isVisible(e));
            return f
        }, _readLayers: function (a, b, c) {
            b = lt.Annotations.Core.AnnXmlHelper.getFirstMatchingChild(a,
                "Layers", b);
            if (null != b) {
                b = lt.Annotations.Core.AnnXmlHelper.getChildren(b);
                for (b = ss.IEnumerator.getEnumerator(b); b.moveNext();) {
                    var d = b.current;
                    lt.Annotations.Core.AnnXmlHelper.isNodeName(d, "Layer") && (d = this._readLayer(a, d), null != d && (this._loadLookup[d.get_layerId()] = d, c.add(d)))
                }
            }
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnCodecs.prototype, "serializeOptions", {
        get: lt.Annotations.Core.AnnCodecs.prototype.get_serializeOptions,
        set: lt.Annotations.Core.AnnCodecs.prototype.set_serializeOptions,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecs.prototype, "deserializeOptions", {
        get: lt.Annotations.Core.AnnCodecs.prototype.get_deserializeOptions,
        set: lt.Annotations.Core.AnnCodecs.prototype.set_deserializeOptions,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecs.prototype, "loadSourceResolution", {
        get: lt.Annotations.Core.AnnCodecs.prototype.get_loadSourceResolution,
        set: lt.Annotations.Core.AnnCodecs.prototype.set_loadSourceResolution,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecs.prototype, "loadTargetResolution", {
        get: lt.Annotations.Core.AnnCodecs.prototype.get_loadTargetResolution,
        set: lt.Annotations.Core.AnnCodecs.prototype.set_loadTargetResolution,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCodecs.prototype, "loadUseDpi", {
        get: lt.Annotations.Core.AnnCodecs.prototype.get_loadUseDpi,
        set: lt.Annotations.Core.AnnCodecs.prototype.set_loadUseDpi,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnContainer =
        function () {
            this._mapper = lt.Annotations.Core.AnnContainerMapper.createDefault();
            this._size = lt.Annotations.Core._leadSizeDExtensions.create(0, 0);
            this._offset = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
            this._userMode = 0;
            this._labels = [];
            this._children = new lt.Annotations.Core.AnnObjectCollection;
            this._hitTestBuffer = 720 * (5 / 96);
            this._hitTestBehavior = 1;
            this._layers = new lt.Annotations.Core.AnnLayerCollection(null);
            this._stateId = "";
            this._totalObjectsInvalidRect = lt.Annotations.Core._leadRectDExtensions.get_empty();
            if ("function" == typeof Leadtools && "function" == typeof Leadtools.RasterSupport && Leadtools.RasterSupport.kernelExpired)throw new Leadtools.RasterException(Leadtools.RasterExceptionCode.kernelExpired);
            this._children = new lt.Annotations.Core.AnnObjectCollection;
            this._children.add_collectionChanged(ss.Delegate.create(this, this._children_CollectionChanged));
            this._annSelectObject = new lt.Annotations.Core.AnnSelectionObject;
            this._annSelectObject.set_parent(this)
        };
    lt.Annotations.Core.AnnContainer.create = function (a,
                                                        b, c) {
        var d = new lt.Annotations.Core.AnnContainer;
        d._offset = lt.Annotations.Core._leadPointDExtensions.clone(a);
        d._size = lt.Annotations.Core._leadSizeDExtensions.clone(b);
        d._mapper = null == c ? lt.Annotations.Core.AnnContainerMapper.createDefault() : c;
        d._mapper.set_offset(a);
        return d
    };
    lt.Annotations.Core.AnnContainer.prototype = {
        add_objectsPropertyChanged: function (a) {
            this.__objectsPropertyChanged = ss.Delegate.combine(this.__objectsPropertyChanged, a)
        },
        remove_objectsPropertyChanged: function (a) {
            this.__objectsPropertyChanged =
                ss.Delegate.remove(this.__objectsPropertyChanged, a)
        },
        __objectsPropertyChanged_handler_get: function () {
            null == this.__objectsPropertyChanged_handler && (this.__objectsPropertyChanged_handler = ss.EventHandler.create(this, this.add_objectsPropertyChanged, this.remove_objectsPropertyChanged));
            return this.__objectsPropertyChanged_handler
        },
        __objectsPropertyChanged: null,
        __objectsPropertyChanged_handler: null,
        _annSelectObject: null,
        get_selectionObject: function () {
            return this._annSelectObject
        },
        set_selectionObject: function (a) {
            null ==
            a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Selection object cannot be null");
            this._annSelectObject = a;
            this._annSelectObject.set_parent(this);
            return a
        },
        _pageNumber: 1,
        get_pageNumber: function () {
            return this._pageNumber
        },
        set_pageNumber: function (a) {
            1 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Page number must be a value greater than or equal to 1");
            return this._pageNumber = a
        },
        get_mapper: function () {
            return this._mapper
        },
        set_mapper: function (a) {
            this._mapper = null ==
            a ? lt.Annotations.Core.AnnContainerMapper.createDefault() : a;
            return a
        },
        get_size: function () {
            return lt.Annotations.Core._leadSizeDExtensions.clone(this._size)
        },
        set_size: function (a) {
            this._size = lt.Annotations.Core._leadSizeDExtensions.clone(a);
            return a
        },
        get_offset: function () {
            return lt.Annotations.Core._leadPointDExtensions.clone(this._offset)
        },
        set_offset: function (a) {
            this._offset = lt.Annotations.Core._leadPointDExtensions.clone(a);
            this._mapper.set_offset(this._offset);
            return a
        },
        _fill: null,
        get_fill: function () {
            return this._fill
        },
        set_fill: function (a) {
            return this._fill = a
        },
        _stroke: null,
        get_stroke: function () {
            return this._stroke
        },
        set_stroke: function (a) {
            return this._stroke = a
        },
        get_userMode: function () {
            return this._userMode
        },
        set_userMode: function (a) {
            return this._userMode = a
        },
        _userData: null,
        get_userData: function () {
            return this._userData
        },
        set_userData: function (a) {
            return this._userData = a
        },
        _isEnabled: !0,
        get_isEnabled: function () {
            return this._isEnabled
        },
        set_isEnabled: function (a) {
            return this._isEnabled = a
        },
        get_labels: function () {
            return this._labels
        },
        _children_CollectionChanged: function (a, b) {
            if (!b.get_action()) {
                var c = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject);
                c.add_propertyChanged(ss.Delegate.create(this, this._annObject_PropertyChanged));
                c.set_parent(this);
                null != this._groupsRoles && String.isNullOrEmpty(c.get_userId()) && c.set_userId(this._groupsRoles.get_currentUser());
                var d = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                null != d && (this._annSelectObject = d);
                d = Type.safeCast(c, lt.Annotations.Core.AnnPolyRulerObject);
                null !=
                d && 1 !== this._mapper.get_calibrationScale() && 14 !== d.get_measurementUnit() && d.set_measurementUnit(this._mapper.get_calibrationUnit());
                null != this.__objectAdded && !c.get_internalAdd() && this.__objectAdded(this, lt.Annotations.Core.AnnObjectCollectionEventArgs.create(c))
            }
            1 === b.get_action() && (c = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject), c.set_parent(null), c.remove_propertyChanged(ss.Delegate.create(this, this._annObject_PropertyChanged)), Type.canCast(c, lt.Annotations.Core.AnnSelectionObject) &&
            (this._annSelectObject = null), null != this.__objectRemoved && !c.get_internalAdd() && this.__objectRemoved(this, lt.Annotations.Core.AnnObjectCollectionEventArgs.create(c)))
        },
        _annObject_PropertyChanged: function (a, b) {
            null != this.__objectsPropertyChanged && this.__objectsPropertyChanged(a, b)
        },
        get_children: function () {
            return this._children
        },
        _visible: !0,
        get_isVisible: function () {
            return this._visible
        },
        set_isVisible: function (a) {
            return this._visible = a
        },
        _isModified: !1,
        get_isModified: function () {
            return this._isModified
        },
        set_isModified: function (a) {
            return this._isModified = a
        },
        get_hitTestBuffer: function () {
            return this._hitTestBuffer
        },
        set_hitTestBuffer: function (a) {
            0 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Hit test buffer must be a value greater than or equal to 0");
            return this._hitTestBuffer = a
        },
        get_hitTestBehavior: function () {
            return this._hitTestBehavior
        },
        set_hitTestBehavior: function (a) {
            return this._hitTestBehavior = a
        },
        get_layers: function () {
            return this._layers
        },
        get_stateId: function () {
            return this._stateId
        },
        set_stateId: function (a) {
            return this._stateId = a
        },
        add_objectAdded: function (a) {
            this.__objectAdded = ss.Delegate.combine(this.__objectAdded, a)
        },
        remove_objectAdded: function (a) {
            this.__objectAdded = ss.Delegate.remove(this.__objectAdded, a)
        },
        __objectAdded_handler_get: function () {
            null == this.__objectAdded_handler && (this.__objectAdded_handler = ss.EventHandler.create(this, this.add_objectAdded, this.remove_objectAdded));
            return this.__objectAdded_handler
        },
        __objectAdded: null,
        __objectAdded_handler: null,
        add_objectRemoved: function (a) {
            this.__objectRemoved =
                ss.Delegate.combine(this.__objectRemoved, a)
        },
        remove_objectRemoved: function (a) {
            this.__objectRemoved = ss.Delegate.remove(this.__objectRemoved, a)
        },
        __objectRemoved_handler_get: function () {
            null == this.__objectRemoved_handler && (this.__objectRemoved_handler = ss.EventHandler.create(this, this.add_objectRemoved, this.remove_objectRemoved));
            return this.__objectRemoved_handler
        },
        __objectRemoved: null,
        __objectRemoved_handler: null,
        hitTestPoint: function (a) {
            if (!this.get_isVisible())return null;
            var b = new lt.Annotations.Core.AnnObjectCollection,
                c = this._mapper.getHitTestBuffer(this.get_hitTestBuffer()), d = this.get_selectionObject();
            if (1 < d.get_selectedObjects().get_count()) {
                if (d.hitTest(a, c))return null != this._groupsRoles ? this._groupsRoles.isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(15, d)) && b.add(d) : b.add(d), b.toArray()
            } else if (1 === d.get_selectedObjects().get_count()) {
                var e = d.get_selectedObjects().get_item(0);
                if (null != e) {
                    var f = lt.Annotations.Core.Utils.fixPoint(a, this.get_mapper(), e.get_fixedStateOperations());
                    if (e.hitTest(f,
                            c)) {
                        var g = d.get_selectedObjects().get_item(0);
                        null != this._groupsRoles ? this._groupsRoles.isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(15, g)) && b.add(g) : b.add(g)
                    }
                }
            }
            for (g = 0; g < this.get_children().get_count(); g++) {
                f = lt.Annotations.Core._leadPointDExtensions.clone(a);
                e = this.get_children().get_item(g);
                if (1 === (e.get_fixedStateOperations() & 1))var f = this.get_mapper().pointToContainerCoordinates(lt.Annotations.Core._leadPointDExtensions.create(0, 0)), h = this.get_mapper().pointToContainerCoordinates(lt.Annotations.Core._leadPointDExtensions.create(this.get_mapper().get_scrollOffset().get_x(),
                    this.get_mapper().get_scrollOffset().get_y())), f = lt.Annotations.Core.Utils.subtractPoint(h, f), f = lt.Annotations.Core.Utils.subtractPoint(a, f);
                2 === (e.get_fixedStateOperations() & 2) && (f = lt.Annotations.Core.Utils.fixPoint(a, this.get_mapper(), e.get_fixedStateOperations()));
                e.hitTest(f, c) && (e.get_parent() !== d ? null != this._groupsRoles ? this._groupsRoles.isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(15, e)) && (b.contains(e) && b.remove(e), b.add(e)) : (b.contains(e) && b.remove(e), b.add(e)) : b.contains(e) &&
                (b.remove(e), b.add(e)))
            }
            if (0 < this.get_layers().get_count() && (a = {}, e = b.get_count(), g = 0, 0 < e)) {
                c = [];
                for (d = ss.IEnumerator.getEnumerator(b); d.moveNext();)e = d.current, f = this._getZOrder(e), Object.keyExists(a, f) || (a[f] = e, c.insert(g++, f));
                c.sort();
                e = c.length;
                for (g = 0; g < e; ++g)b.set_item(g, a[c[g]])
            }
            return b.toArray()
        },
        _getZOrder: function (a) {
            var b = this.get_children().indexOf(a);
            if (null != a.get_layer()) {
                var c = a.get_layer();
                if (!c.get_isVisible())return 0;
                for (a = c.get_children().indexOf(a); null != c;)b = null != c.get_parent() ?
                b + 1E4 * (c.get_parent().get_layers().indexOf(c) + 1) : b + 1E4 * (this.get_layers().indexOf(c) + 1), c = c.get_parent();
                b += a
            }
            return b
        },
        hitTestRect: function (a) {
            if (!this.get_isVisible())return null;
            for (var b = new lt.Annotations.Core.AnnObjectCollection, c = {}, d = ss.IEnumerator.getEnumerator(this.get_children()); d.moveNext();) {
                var e = d.current;
                if (e.get_groupName())Object.keyExists(c, e.get_groupName()) || (c[e.get_groupName()] = lt.Annotations.Core._leadRectDExtensions.get_empty()); else {
                    var f = !1;
                    (f = this.get_hitTestBehavior() ?
                        lt.Annotations.Core._leadRectDExtensions.containsRect(a, e.get_bounds()) : !lt.Annotations.Core._leadRectDExtensions.isEmpty(lt.Annotations.Core._leadRectDExtensions.intersectRects(a, e.get_bounds()))) && String.isNullOrEmpty(e.get_groupName()) && (null != this._groupsRoles ? this._groupsRoles.isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(15, e)) && b.add(e) : b.add(e))
                }
            }
            for (var d = {}, g = ss.IEnumerator.getEnumerator(Object.keys(c)); g.moveNext();) {
                for (var f = g.current, h = lt.Annotations.Core._leadRectDExtensions.clone(c[f]),
                         i = ss.IEnumerator.getEnumerator(this.get_children()); i.moveNext();)e = i.current, e.get_groupName() === f && (h = lt.Annotations.Core._leadRectDExtensions.isEmpty(h) ? e.get_bounds() : lt.Annotations.Core._leadRectDExtensions.unionRects(e.get_bounds(), c[f]));
                d[f] = h
            }
            Object.clearKeys(c);
            for (c = ss.IEnumerator.getEnumerator(Object.keys(d)); c.moveNext();)if (f = c.current, lt.Annotations.Core._leadRectDExtensions.containsRect(a, d[f]))for (g = ss.IEnumerator.getEnumerator(this.get_children()); g.moveNext();)e = g.current, e.get_groupName() ===
            f && b.add(e);
            return b.toArray()
        },
        unselect: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("annObject");
            var b = Type.safeCast(a, lt.Annotations.Core.AnnSelectionObject);
            null != b ? (b.set_isSelected(!1), b.get_selectedObjects().clear(), b.adjustBounds()) : this.get_selectionObject().get_selectedObjects().remove(a);
            a.set_isSelected(!1);
            return !a.get_isSelected()
        },
        select: function (a) {
            if (null == a || a.get_isSelected())return !1;
            a.set_isSelected(!0);
            return a.get_isSelected()
        },
        rotate: function (a) {
            if (lt.Annotations.Core.Utils.isRightAngle(a)) {
                var b =
                    lt.Annotations.Core._leadRectDExtensions.create(0, 0, this.get_size().get_width(), this.get_size().get_height()), c = lt.Annotations.Core._leadPointDExtensions.create(b.get_width() / 2, b.get_height() / 2), b = lt.Annotations.Core.AnnTransformer.rotateRectAt(b, a, c.get_x(), c.get_y());
                lt.Annotations.Core._leadPointDExtensions.create(b.get_width() / 2, b.get_height() / 2);
                for (var d = ss.IEnumerator.getEnumerator(this.get_children()); d.moveNext();) {
                    var e = d.current;
                    e.translate(-c.get_x(), -c.get_y());
                    e.rotate(a, lt.Annotations.Core._leadPointDExtensions.create(0,
                        0));
                    e.translate(b.get_width() / 2, b.get_height() / 2)
                }
                this.set_size(lt.Annotations.Core._leadSizeDExtensions.create(b.get_width(), b.get_height()))
            }
        },
        clone: function () {
            var a = new lt.Annotations.Core.AnnContainer;
            a.get_mapper().mapResolutions(this.get_mapper().get_sourceDpiX(), this.get_mapper().get_sourceDpiX(), this.get_mapper().get_targetDpiX(), this.get_mapper().get_targetDpiY());
            a.get_mapper().updateTransform(this.get_mapper().get_transform());
            a.set_isVisible(this.get_isVisible());
            a.set_hitTestBuffer(this.get_hitTestBuffer());
            a.set_pageNumber(this.get_pageNumber());
            a.set_size(lt.Annotations.Core._leadSizeDExtensions.clone(this.get_size()));
            a.set_offset(lt.Annotations.Core._leadPointDExtensions.clone(this.get_offset()));
            a.set_fill(null != this.get_fill() ? this.get_fill().clone() : null);
            a.set_stroke(null != this.get_stroke() ? this.get_stroke().clone() : null);
            a.set_userMode(this.get_userMode());
            a.set_isEnabled(this.get_isEnabled());
            a.set_userData(null);
            for (var b = ss.IEnumerator.getEnumerator(this.get_labels()); b.moveNext();) {
                var c =
                    b.current;
                a.get_labels().add(c.clone())
            }
            for (b = ss.IEnumerator.getEnumerator(this.get_children()); b.moveNext();) {
                var c = b.current, d = c.get_isSelected();
                a.get_children().add(c.clone());
                c.set_isSelected(d)
            }
            for (b = ss.IEnumerator.getEnumerator(this.get_layers()); b.moveNext();)c = b.current, a.get_layers().add(c);
            return a
        },
        _activeLayer: null,
        get_activeLayer: function () {
            return this._activeLayer
        },
        set_activeLayer: function (a) {
            return this._activeLayer = a
        },
        resize: function (a, b, c) {
            var d = this.get_size(), e = a.get_width() / d.get_width(),
                f = 1, g = !1;
            d.get_width() < a.get_width() && d.get_height() < a.get_height() && (g = !0);
            switch (c) {
                case 0:
                case 1:
                    g && 1 === c && (1 > Math.abs(e * d.get_height() - a.get_height()) ? f = e : e = f = a.get_height() / d.get_height());
                    break;
                case 3:
                    e = f = a.get_height() / d.get_height();
                    break;
                case 2:
                    f = e;
                    break;
                case 4:
                    f = a.get_height() / d.get_height()
            }
            if (!lt.LeadDoubleTools.areClose(e, 1) || !lt.LeadDoubleTools.areClose(f, 1)) {
                a = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
                c = this.get_children();
                2 === (b & 2) && (e === f ? this.get_mapper().set_calibrationScale(1 /
                    e) : this.get_mapper().set_calibrationScale(Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2))));
                if (1 === (b & 1))for (b = ss.IEnumerator.getEnumerator(c); b.moveNext();)b.current.scale(e, f, a);
                this.set_size(lt.Annotations.Core._leadSizeDExtensions.create(this._size.get_width() * e, this._size.get_height() * f))
            }
        },
        _groupsRoles: null,
        get_groupsRoles: function () {
            return this._groupsRoles
        },
        set_groupsRoles: function (a) {
            return this._groupsRoles = a
        },
        get_totalObjectsInvalidRect: function () {
            return lt.Annotations.Core._leadRectDExtensions.clone(this._totalObjectsInvalidRect)
        },
        set_totalObjectsInvalidRect: function (a) {
            this._totalObjectsInvalidRect = lt.Annotations.Core._leadRectDExtensions.clone(a);
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "objectsPropertyChanged", {
        get: lt.Annotations.Core.AnnContainer.prototype.__objectsPropertyChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "selectionObject", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_selectionObject,
        set: lt.Annotations.Core.AnnContainer.prototype.set_selectionObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "pageNumber", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_pageNumber,
        set: lt.Annotations.Core.AnnContainer.prototype.set_pageNumber,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "mapper", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_mapper,
        set: lt.Annotations.Core.AnnContainer.prototype.set_mapper,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype,
        "size", {
            get: lt.Annotations.Core.AnnContainer.prototype.get_size,
            set: lt.Annotations.Core.AnnContainer.prototype.set_size,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "offset", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_offset,
        set: lt.Annotations.Core.AnnContainer.prototype.set_offset,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "fill", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_fill,
        set: lt.Annotations.Core.AnnContainer.prototype.set_fill, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "stroke", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_stroke,
        set: lt.Annotations.Core.AnnContainer.prototype.set_stroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "userMode", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_userMode,
        set: lt.Annotations.Core.AnnContainer.prototype.set_userMode,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "userData", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_userData,
        set: lt.Annotations.Core.AnnContainer.prototype.set_userData,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "isEnabled", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_isEnabled,
        set: lt.Annotations.Core.AnnContainer.prototype.set_isEnabled,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype,
        "labels", {get: lt.Annotations.Core.AnnContainer.prototype.get_labels, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "children", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_children,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "isVisible", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_isVisible,
        set: lt.Annotations.Core.AnnContainer.prototype.set_isVisible,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "isModified", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_isModified,
        set: lt.Annotations.Core.AnnContainer.prototype.set_isModified,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "hitTestBuffer", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_hitTestBuffer,
        set: lt.Annotations.Core.AnnContainer.prototype.set_hitTestBuffer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype,
        "hitTestBehavior", {
            get: lt.Annotations.Core.AnnContainer.prototype.get_hitTestBehavior,
            set: lt.Annotations.Core.AnnContainer.prototype.set_hitTestBehavior,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "layers", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_layers,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "stateId", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_stateId,
        set: lt.Annotations.Core.AnnContainer.prototype.set_stateId,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "objectAdded", {
        get: lt.Annotations.Core.AnnContainer.prototype.__objectAdded_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "objectRemoved", {
        get: lt.Annotations.Core.AnnContainer.prototype.__objectRemoved_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "activeLayer", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_activeLayer,
        set: lt.Annotations.Core.AnnContainer.prototype.set_activeLayer, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "groupsRoles", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_groupsRoles,
        set: lt.Annotations.Core.AnnContainer.prototype.set_groupsRoles,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainer.prototype, "totalObjectsInvalidRect", {
        get: lt.Annotations.Core.AnnContainer.prototype.get_totalObjectsInvalidRect,
        set: lt.Annotations.Core.AnnContainer.prototype.set_totalObjectsInvalidRect,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnContainerMapper = function (a, b, c, d) {
        this._scrollOffset = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
        this._offset = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
        this._calibrationUnit = 5;
        this._transform = lt.LeadMatrix.get_identity();
        this._transformWithoutRotate = lt.LeadMatrix.get_identity();
        this._rotateTransform = lt.LeadMatrix.get_identity();
        this._sourceDpiX = a;
        this._sourceDpiY = b;
        this._targetDpiX = c;
        this._targetDpiY = d
    };
    lt.Annotations.Core.AnnContainerMapper.createDefault =
        function () {
            return new lt.Annotations.Core.AnnContainerMapper(96, 96, 96, 96)
        };
    lt.Annotations.Core.AnnContainerMapper.prototype = {
        get_scrollOffset: function () {
            return this._scrollOffset
        }, set_scrollOffset: function (a) {
            return this._scrollOffset = a
        }, _ignoreDpiScale: !1, get_ignoreDpiScale: function () {
            return this._ignoreDpiScale
        }, set_ignoreDpiScale: function (a) {
            return this._ignoreDpiScale = a
        }, _burnScaleFactor: 1, get_burnScaleFactor: function () {
            return this._burnScaleFactor
        }, set_burnScaleFactor: function (a) {
            return this._burnScaleFactor =
                a
        }, get_offset: function () {
            return this._offset
        }, set_offset: function (a) {
            return this._offset = a
        }, get_calibrationUnit: function () {
            return this._calibrationUnit
        }, set_calibrationUnit: function (a) {
            return this._calibrationUnit = a
        }, normalizeRectangle: function (a, b) {
            var c = Array(4);
            c[0] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y());
            c[1] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y());
            c[2] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(),
                a.get_y() + a.get_height());
            c[3] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y() + a.get_height());
            var c = this.pointsFromContainerCoordinates(c, b), d = lt.Annotations.Core.Utils.findAngle(c[0], c[1]);
            180 === parseInt(d + 0.5) && (d = 0);
            var e = Array(2);
            e[0] = lt.Annotations.Core._leadPointDExtensions.create(c[0].get_x(), c[0].get_y());
            e[1] = lt.Annotations.Core._leadPointDExtensions.create(c[2].get_x(), c[2].get_y());
            var c = lt.Annotations.Core._leadPointDExtensions.create((e[0].get_x() + e[1].get_x()) /
                2, (e[0].get_y() + e[1].get_y()) / 2), e = lt.Annotations.Core.AnnTransformer.rotateAtPoints(e, -d, c.get_x(), c.get_y()), c = Math.min(e[0].get_x(), e[1].get_x()), f = Math.min(e[0].get_y(), e[1].get_y()), g = Math.max(e[0].get_x(), e[1].get_x()), e = Math.max(e[0].get_y(), e[1].get_y());
            a.set_x(c);
            a.set_y(f);
            a.set_width(g - c);
            a.set_height(e - f);
            return d
        }, clone: function () {
            var a = new lt.Annotations.Core.AnnContainerMapper(this.get_sourceDpiX(), this.get_sourceDpiY(), this.get_targetDpiX(), this.get_targetDpiY());
            a.set_calibrationScale(this.get_calibrationScale());
            a._transform = this._transform.clone();
            a._fontRelativeToImageDpi = this.get_fontRelativeToImageDpi();
            return a
        }, _burnFontDpi: !1, get_burnFontDpi: function () {
            return this._burnFontDpi
        }, set_burnFontDpi: function (a) {
            return this._burnFontDpi = a
        }, _calibrationScale: 1, get_calibrationScale: function () {
            return this._calibrationScale
        }, set_calibrationScale: function (a) {
            return this._calibrationScale = a
        }, calibrate: function (a, b, c, d) {
            14 === b && (b = 0);
            14 === d && (d = 0);
            a = lt.Annotations.Core.AnnUnitConverter.convert(a.get_value(), b, 0);
            this._calibrationScale = lt.Annotations.Core.AnnUnitConverter.convert(c.get_value(), d, 0) / a;
            this._calibrationUnit = d
        }, get_transform: function () {
            return this._transform.clone()
        }, set_transform: function (a) {
            this._transform = a.clone();
            return a
        }, get_transformWithoutRotate: function () {
            return this._transformWithoutRotate.clone()
        }, set_transformWithoutRotate: function (a) {
            this._transformWithoutRotate = a.clone();
            return a
        }, get_rotateTransform: function () {
            return this._rotateTransform.clone()
        }, set_rotateTransform: function (a) {
            this._rotateTransform =
                a.clone();
            return a
        }, _sourceDpiX: 0, get_sourceDpiX: function () {
            return 0 < this._sourceDpiX ? this._sourceDpiX : 96
        }, _sourceDpiY: 0, get_sourceDpiY: function () {
            return 0 < this._sourceDpiY ? this._sourceDpiY : 96
        }, _targetDpiX: 0, get_targetDpiX: function () {
            return 0 < this._targetDpiX ? this._targetDpiX : 96
        }, _targetDpiY: 0, get_targetDpiY: function () {
            return 0 < this._targetDpiY ? this._targetDpiY : 96
        }, _deviceDpiX: 0, get_deviceDpiX: function () {
            return 0 < this._deviceDpiX ? this._deviceDpiX : 96
        }, set_deviceDpiX: function (a) {
            return this._deviceDpiX =
                a
        }, _deviceDpiY: 0, get_deviceDpiY: function () {
            return 0 < this._deviceDpiY ? this._deviceDpiY : 96
        }, set_deviceDpiY: function (a) {
            return this._deviceDpiY = a
        }, updateTransform: function (a) {
            this._transform = a.clone()
        }, updateDestinationRectangle: function (a, b) {
            this._transform = lt.LeadMatrix.get_identity();
            !lt.Annotations.Core._leadRectDExtensions.isEmpty(a) && a.get_width() && a.get_height() && b.get_width() && b.get_height() && (this._transform.scale(a.get_width() / b.get_width(), a.get_height() / b.get_height()), this._transform.translate(a.get_x(),
                a.get_y()))
        }, mapResolutions: function (a, b, c, d) {
            0 < c && (this._targetDpiX = c);
            0 < d && (this._targetDpiY = d);
            0 < a && (this._sourceDpiX = a);
            0 < b && (this._sourceDpiY = b)
        }, pointsToContainerCoordinates: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
            var b = Array(a.length), c = this._transform.clone();
            c.get_hasInverse() && c.invert();
            for (var d = 0, a = ss.IEnumerator.getEnumerator(a); a.moveNext();)b[d] = this.internalPointToContainerCoordinates(a.current, c), d++;
            return b
        }, internalPointToContainerCoordinates: function (a,
                                                          b) {
            var c = [lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y())];
            b.transformPoints(c);
            var d = this.get_targetDpiX(), e = this.get_targetDpiY();
            this._ignoreDpiScale && (d = this.get_sourceDpiX(), e = this.get_sourceDpiY());
            d = c[0].get_x() / d / lt.Annotations.Core.AnnContainerMapper._unit;
            c = c[0].get_y() / e / lt.Annotations.Core.AnnContainerMapper._unit;
            return lt.Annotations.Core._leadPointDExtensions.create(d - this._offset.get_x(), c - this._offset.get_y())
        }, pointToContainerCoordinates: function (a) {
            lt.Annotations.Core._leadPointDExtensions.create(a.get_x(),
                a.get_y());
            var b = this._transform.clone();
            b.get_hasInverse() && b.invert();
            return this.internalPointToContainerCoordinates(a, b)
        }, getHitTestBuffer: function (a) {
            if (lt.LTHelper.device === lt.LTDevice.mobile || lt.LTHelper.device === lt.LTDevice.tablet)a *= 3;
            var b = lt.Annotations.Core._leadPointDExtensions.create(0, 0), a = lt.Annotations.Core._leadPointDExtensions.create(a, 0), b = this.pointToContainerCoordinates(b), a = this.pointToContainerCoordinates(a), b = lt.Annotations.Core.Utils.distance(b, a);
            return b *= 96 * lt.Annotations.Core.AnnContainerMapper._unit
        },
        fontToContainerCoordinates: function (a) {
            var b = a.clone();
            b.set_fontSize(a.get_fontSize() * this.get_targetDpiX() / this.get_sourceDpiX());
            return b
        }, _fontRelativeToDevice: !1, get_fontRelativeToDevice: function () {
            return this._fontRelativeToDevice
        }, set_fontRelativeToDevice: function (a) {
            return this._fontRelativeToDevice = a
        }, _fontRelativeToImageDpi: !0, get_fontRelativeToImageDpi: function () {
            return this._fontRelativeToImageDpi
        }, set_fontRelativeToImageDpi: function (a) {
            return this._fontRelativeToImageDpi = a
        }, strokeFromContainerCoordinates: function (a,
                                                     b) {
            if (null == a)return null;
            var c = a.clone(), d = c.get_strokeThickness().get_value(), e = 1;
            if (8 === (b & 8))e = this.get_burnScaleFactor(), c.set_strokeThickness(lt.Annotations.Core._leadLengthDExtensions.create(d * e)); else {
                var e = this._transform.clone(), f = lt.Annotations.Core._leadRectDExtensions.create(0, 0, 10, 10), f = e.transformRect(f), e = f.get_width() / 10;
                c.set_strokeThickness(lt.Annotations.Core._leadLengthDExtensions.create(d * e * this.get_targetDpiX() / this.get_sourceDpiX()))
            }
            return c
        }, fontFromContainerCoordinates: function (a,
                                                   b) {
            var c = a.clone();
            if (4 === (b & 4))return c.set_fontSize(c.get_fontSize() * this.get_burnScaleFactor()), c.set_fontHeight(parseInt(a.get_fontHeight() * c.get_fontSize() / a.get_fontSize())), c;
            var d;
            if (2 === (b & 2)) {
                d = this._fontRelativeToDevice ? c.get_fontSize() * this.get_sourceDpiX() / this.get_targetDpiX() : c.get_fontSize() * this.get_sourceDpiX() / this.get_deviceDpiX();
                var e = this._transform.clone();
                c.set_fontSize(d * this.get_targetDpiX() / this.get_sourceDpiX());
                c.set_fontSize(c.get_fontSize() * this.get_burnScaleFactor())
            } else {
                d =
                    this._fontRelativeToDevice ? c.get_fontSize() : 4 !== (b & 4) && this._fontRelativeToImageDpi ? c.get_fontSize() * this.get_sourceDpiX() / this.get_deviceDpiX() : c.get_fontSize();
                var e = this._transform.clone(), f = lt.Annotations.Core._leadRectDExtensions.create(0, 0, 10, 10), f = e.transformRect(f), e = f.get_width() / 10;
                4 !== (b & 4) ? c.set_fontSize(d * e * this.get_targetDpiX() / this.get_sourceDpiX()) : c.set_fontSize(d * e)
            }
            a.get_isDirty() ? (c.set_fontHeight(parseInt(a.get_fontHeight() * c.get_fontSize() / a.get_fontSize())), c.set_isDirty(!0)) :
                c.set_isDirty(!1);
            return c
        }, sizeToContainerCoordinates: function (a) {
            if (lt.Annotations.Core._leadSizeDExtensions.isEmpty(a))return a;
            var b = lt.Annotations.Core._leadRectDExtensions.create(0, 0, a.get_width(), a.get_height()), b = this.rectToContainerCoordinates(b);
            a.set_width(b.get_width());
            a.set_height(b.get_height());
            return a
        }, sizeFromContainerCoordinates: function (a) {
            if (lt.Annotations.Core._leadSizeDExtensions.isEmpty(a))return a;
            var b = lt.Annotations.Core._leadRectDExtensions.create(0, 0, a.get_width(), a.get_height()),
                b = this.rectFromContainerCoordinates(b, 0);
            a.set_width(b.get_width());
            a.set_height(b.get_height());
            return a
        }, lengthFromContainerCoordinates: function (a, b) {
            var c = 16 === (b & 16), d = 2 !== (b & 2), e = a.get_value();
            c ? (e = d ? e * lt.Annotations.Core.AnnContainerMapper._unit * this.get_deviceDpiX() * (lt.LeadDoubleTools.areClose(this.get_transform().get_m11(), 0) ? 1 : this.get_transform().get_m11()) : e * lt.Annotations.Core.AnnContainerMapper._unit * this.get_deviceDpiX(), e *= this.get_burnScaleFactor()) : (c = lt.Annotations.Core._leadPointDExtensions.create(0,
                0), c = this.pointFromContainerCoordinates(c, b), d = lt.Annotations.Core._leadPointDExtensions.create(a.get_value(), 0), d = this.pointFromContainerCoordinates(d, b), e = Math.sqrt(Math.pow(d.get_x() - c.get_x(), 2) + Math.pow(d.get_y() - c.get_y(), 2)));
            return e
        }, lengthToContainerCoordinates: function (a) {
            var b = lt.Annotations.Core._leadPointDExtensions.create(0, 0), b = this.pointToContainerCoordinates(b), a = lt.Annotations.Core._leadPointDExtensions.create(a, 0), a = this.pointToContainerCoordinates(a);
            return lt.Annotations.Core._leadLengthDExtensions.create(Math.sqrt(Math.pow(a.get_x() -
                    b.get_x(), 2) + Math.pow(a.get_y() - b.get_y(), 2)))
        }, pointFromContainerCoordinates: function (a, b) {
            var c = this.get_sourceDpiX(), d = this.get_sourceDpiY(), e = this.get_targetDpiX(), f = this.get_targetDpiY();
            this._ignoreDpiScale && (e = c, f = d);
            var g = lt.Annotations.Core._leadPointDExtensions.clone(a);
            lt.Annotations.Core._leadPointDExtensions.isEmpty(g) || (g.set_x(g.get_x() + this._offset.get_x()), g.set_y(g.get_y() + this._offset.get_y()));
            var h = g.get_x() * c * lt.Annotations.Core.AnnContainerMapper._unit, g = g.get_y() * d * lt.Annotations.Core.AnnContainerMapper._unit,
                h = [lt.Annotations.Core._leadPointDExtensions.create(h, g)], g = new lt.LeadMatrix;
            g.scale(c / e, d / f);
            g.get_hasInverse() && g.invert();
            g.transformPoints(h);
            c = this._transform.clone();
            1 === (b & 1) && (lt.Annotations.Core._leadPointDExtensions.isEmpty(this._scrollOffset) || c.translate(this._scrollOffset.get_x(), this._scrollOffset.get_y()));
            2 === (b & 2) && (d = c.get_offsetX(), e = c.get_offsetY(), g = f = 1, !lt.LeadDoubleTools.areClose(c.get_m11(), 0) && !lt.LeadDoubleTools.areClose(c.get_m22(), 0) && (f = 1 / Math.abs(c.get_m11()), g = 1 / Math.abs(c.get_m22())),
                c.scale(f, g), (1 !== f || 1 !== g) && c.translate(d * f, e * g));
            c.transformPoints(h);
            return lt.Annotations.Core._leadPointDExtensions.create(h[0].get_x(), h[0].get_y())
        }, pointsFromContainerCoordinates: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
            for (var c = Array(a.length), d = 0, e = ss.IEnumerator.getEnumerator(a); e.moveNext();)c[d] = this.pointFromContainerCoordinates(e.current, b), d++;
            return c
        }, rectFromContainerCoordinates: function (a, b) {
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(a))return a;
            var c = Array(2);
            c[0] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y());
            c[1] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height());
            c = this.pointsFromContainerCoordinates(c, b);
            return lt.Annotations.Core._leadRectDExtensions.fromLTRB(c[0].get_x(), c[0].get_y(), c[1].get_x(), c[1].get_y())
        }, rectToContainerCoordinates: function (a) {
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(a))return a;
            var b = Array(2);
            b[0] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(),
                a.get_y());
            b[1] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height());
            b = this.pointsToContainerCoordinates(b);
            return lt.Annotations.Core._leadRectDExtensions.fromLTRB(b[0].get_x(), b[0].get_y(), b[1].get_x(), b[1].get_y())
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "scrollOffset", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_scrollOffset,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_scrollOffset,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "ignoreDpiScale", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_ignoreDpiScale,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_ignoreDpiScale,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "burnScaleFactor", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_burnScaleFactor,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_burnScaleFactor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "offset", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_offset,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_offset,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "calibrationUnit", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_calibrationUnit,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_calibrationUnit,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "burnFontDpi", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_burnFontDpi,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_burnFontDpi,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "calibrationScale", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_calibrationScale,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_calibrationScale,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "transform", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_transform,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_transform,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "transformWithoutRotate", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_transformWithoutRotate,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_transformWithoutRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "rotateTransform", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_rotateTransform,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_rotateTransform,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "sourceDpiX", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_sourceDpiX,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype,
        "sourceDpiY", {
            get: lt.Annotations.Core.AnnContainerMapper.prototype.get_sourceDpiY,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "targetDpiX", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_targetDpiX,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "targetDpiY", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_targetDpiY,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype,
        "deviceDpiX", {
            get: lt.Annotations.Core.AnnContainerMapper.prototype.get_deviceDpiX,
            set: lt.Annotations.Core.AnnContainerMapper.prototype.set_deviceDpiX,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "deviceDpiY", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_deviceDpiY,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_deviceDpiY,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype,
        "fontRelativeToDevice", {
            get: lt.Annotations.Core.AnnContainerMapper.prototype.get_fontRelativeToDevice,
            set: lt.Annotations.Core.AnnContainerMapper.prototype.set_fontRelativeToDevice,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnContainerMapper.prototype, "fontRelativeToImageDpi", {
        get: lt.Annotations.Core.AnnContainerMapper.prototype.get_fontRelativeToImageDpi,
        set: lt.Annotations.Core.AnnContainerMapper.prototype.set_fontRelativeToImageDpi,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnAudioObject = function () {
        lt.Annotations.Core.AnnAudioObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.audioObjectId);
        this.set_defaultPicture(3)
    };
    lt.Annotations.Core.AnnAudioObject.prototype = {
        get_friendlyName: function () {
            return "Audio"
        }, create: function () {
            return new lt.Annotations.Core.AnnAudioObject
        }, clone: function () {
            return Type.safeCast(lt.Annotations.Core.AnnAudioObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnAudioObject)
        }, serialize: function (a, b,
                                c) {
            lt.Annotations.Core.AnnAudioObject.callBaseMethod(this, "serialize", [a, b, c])
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnAudioObject.callBaseMethod(this, "deserialize", [a, b, c])
        }, get_hitTestInterior: function () {
            return 1 === (1 === (lt.Annotations.Core.AnnAudioObject.callBaseMethod(this, "get_hitTestInterior") | null != this.get_picture()) | -1 < this.get_defaultPicture())
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnAudioObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnAudioObject.prototype.get_friendlyName,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnAudioObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnAudioObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core._parameters = function () {
    };
    lt.Annotations.Core._parameters.prototype = {
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        angle1: 0,
        angle2: 0,
        angle3: 0,
        angle4: 0,
        firstStart: null,
        firstEnd: null,
        secondStart: null,
        secondEnd: null
    };
    lt.Annotations.Core.AnnCrossProductObject = function () {
        this._hitTestedRuler$3 =
            "";
        lt.Annotations.Core.AnnCrossProductObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.crossProductObjectId);
        this.get_points().clear();
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_labels().SecondaryRulerLength = new lt.Annotations.Core.AnnLabel;
        this.get_labels().SecondaryRulerLength.set_offsetHeight(!0)
    };
    lt.Annotations.Core.AnnCrossProductObject.prototype = {
        get_friendlyName: function () {
            return "Cross Product"
        }, get_supportsFill: function () {
            return !1
        }, get_firstEndPoint: function () {
            return this.get_points().get_item(1)
        }, set_firstEndPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(1), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FirstEndPoint",
                    1, this.get_points().get_item(1), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(1, a), this.onPropertyChanged(b))
            }
            return a
        }, get_firstStartPoint: function () {
            return this.get_points().get_item(0)
        }, set_firstStartPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(0), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FirstStartPoint", 1, this.get_points().get_item(0), a);
                this.onPropertyChanged(b);
                b.get_cancel() ||
                (b.set_status(0), this.get_points().set_item(0, a), this.onPropertyChanged(b))
            }
            return a
        }, get_intersectionPoint: function () {
            return this.get_points().get_item(4)
        }, set_intersectionPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(4), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("IntersectionPoint", 1, this.get_points().get_item(4), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(4, a), this.onPropertyChanged(b))
            }
            return a
        },
        get_secondEndPoint: function () {
            return this.get_points().get_item(3)
        }, set_secondEndPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(3), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("SecondEndPoint", 1, this.get_points().get_item(3), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(3, a), this.onPropertyChanged(b))
            }
            return a
        }, get_secondStartPoint: function () {
            return this.get_points().get_item(2)
        }, set_secondStartPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(2),
                    a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("SecondStartPoint", 1, this.get_points().get_item(2), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(2, a), this.onPropertyChanged(b))
            }
            return a
        }, _getFixedPoint$3: function (a, b) {
            var c, d, e = this._getParameters$3();
            d = lt.Annotations.Core._leadPointDExtensions.get_empty();
            !a || 1 === a ? a ? lt.Annotations.Core.Utils.isZero(e.angle2) ? d = this._getFixedPointAngle0$3(a, b) : (d = e.c2, c = b.get_y() + lt.Annotations.Core.Utils.divide(b.get_x(),
                    e.angle2), c = lt.Annotations.Core.Utils.divide(c - d, lt.Annotations.Core.Utils.divide(1, e.angle2) + e.angle2), e = e.angle2 * c + d, d = lt.Annotations.Core._leadPointDExtensions.create(c, e)) : lt.Annotations.Core.Utils.isZero(e.angle1) ? d = this._getFixedPointAngle0$3(a, b) : (c = b.get_y() + lt.Annotations.Core.Utils.divide(b.get_x(), e.angle1), d = e.c1, c = lt.Annotations.Core.Utils.divide(c - d, lt.Annotations.Core.Utils.divide(1, e.angle1) + e.angle1), e = e.angle1 * c + d, d = lt.Annotations.Core._leadPointDExtensions.create(c, e)) : 3 === a ? lt.Annotations.Core.Utils.isZero(e.angle3) ?
                d = this._getFixedPointAngle0$3(a, b) : (c = b.get_y() + lt.Annotations.Core.Utils.divide(b.get_x(), e.angle3), d = e.c3, c = lt.Annotations.Core.Utils.divide(c - d, lt.Annotations.Core.Utils.divide(1, e.angle3) + e.angle3), e = e.angle3 * c + d, d = lt.Annotations.Core._leadPointDExtensions.create(c, e)) : lt.Annotations.Core.Utils.isZero(e.angle4) ? d = this._getFixedPointAngle0$3(a, b) : (c = b.get_y() + lt.Annotations.Core.Utils.divide(b.get_x(), e.angle4), d = e.c4, c = lt.Annotations.Core.Utils.divide(c - d, lt.Annotations.Core.Utils.divide(1, e.angle4) +
                e.angle4), e = e.angle4 * c + d, d = lt.Annotations.Core._leadPointDExtensions.create(c, e));
            return d
        }, _getFixedPointAngle0$3: function (a, b) {
            var c = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
            switch (a) {
                case 0:
                case 1:
                    if (!lt.Annotations.Core.Utils.isZero(this.get_firstStartPoint().get_x() - this.get_firstEndPoint().get_x())) {
                        c.set_x(b.get_x());
                        c.set_y(this.get_firstStartPoint().get_y());
                        break
                    }
                    c.set_x(this.get_firstStartPoint().get_x());
                    c.set_y(b.get_y());
                    break;
                case 2:
                case 3:
                    if (!lt.Annotations.Core.Utils.isZero(this.get_secondStartPoint().get_x() -
                            this.get_secondEndPoint().get_x())) {
                        c.set_x(b.get_x());
                        c.set_y(this.get_secondStartPoint().get_y());
                        break
                    }
                    c.set_x(this.get_secondStartPoint().get_x());
                    c.set_y(b.get_y())
            }
            return c
        }, _getParameters$3: function () {
            var a = new lt.Annotations.Core._parameters;
            a.firstStart = this.get_firstStartPoint();
            a.firstEnd = this.get_firstEndPoint();
            a.secondStart = this.get_secondStartPoint();
            a.secondEnd = this.get_secondEndPoint();
            var b = a.firstStart.get_x() - a.firstEnd.get_x(), c = a.firstStart.get_y() - a.firstEnd.get_y();
            a.angle1 =
                lt.Annotations.Core.Utils.divide(c, b);
            a.c1 = a.firstStart.get_y() - a.angle1 * a.firstStart.get_x();
            b = a.firstEnd.get_x() - a.firstStart.get_x();
            c = a.firstEnd.get_y() - a.firstStart.get_y();
            a.angle2 = lt.Annotations.Core.Utils.divide(c, b);
            a.c2 = a.firstEnd.get_y() - a.angle2 * a.firstEnd.get_x();
            b = a.secondStart.get_x() - a.secondEnd.get_x();
            c = a.secondStart.get_y() - a.secondEnd.get_y();
            a.angle3 = lt.Annotations.Core.Utils.divide(c, b);
            a.c3 = a.secondStart.get_y() - a.angle3 * a.secondStart.get_x();
            b = a.secondEnd.get_x() - a.secondStart.get_x();
            c = a.secondEnd.get_y() - a.secondStart.get_y();
            a.angle4 = lt.Annotations.Core.Utils.divide(c, b);
            a.c4 = a.secondEnd.get_y() - a.angle4 * a.secondEnd.get_x();
            return a
        }, updatePoint: function (a, b) {
            if (!this.get_isLocked()) {
                (0 > a || 3 < a) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("pointIndex", a, "Must be a value between 0 and 3");
                var c = this._getFixedPoint$3(a, b);
                switch (a) {
                    case 0:
                        this.set_firstStartPoint(c);
                        break;
                    case 1:
                        this.set_firstEndPoint(c);
                        break;
                    case 2:
                        this.set_secondStartPoint(c);
                        break;
                    case 3:
                        this.set_secondEndPoint(c)
                }
            }
        },
        updateSecondPoints: function () {
            if (!this.get_isLocked()) {
                var a = lt.Annotations.Core.Utils.getUnitVectorPerpendicular(this.get_firstStartPoint(), this.get_firstEndPoint()), b = lt.Annotations.Core._leadLengthDExtensions.create(lt.Annotations.Core.Utils.distance(this.get_firstStartPoint(), this.get_firstEndPoint()) / 2), c = lt.Annotations.Core._leadPointDExtensions.create((this.get_firstStartPoint().get_x() + this.get_firstEndPoint().get_x()) / 2, (this.get_firstStartPoint().get_y() + this.get_firstEndPoint().get_y()) /
                    2);
                this.set_secondEndPoint(lt.Annotations.Core.Utils.transformPoint(a, b, c));
                lt.Annotations.Core._leadPointDExtensions.isEmpty(a) || (a.set_x(-a.get_x()), a.set_y(-a.get_y()));
                this.set_secondStartPoint(lt.Annotations.Core.Utils.transformPoint(a, b, c));
                this.set_intersectionPoint(c)
            }
        }, moveLine: function (a, b, c) {
            if (!this.get_isLocked()) {
                (0 > a || 1 < a) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("lineIndex", a, "Must be a value between 0 and 1");
                var d = [!a ? this.get_firstStartPoint() : this.get_secondStartPoint(),
                    !a ? this.get_firstEndPoint() : this.get_secondEndPoint()], d = lt.Annotations.Core.AnnTransformer.translatePoints(d, b, c);
                a ? (this.set_secondStartPoint(d[0]), this.set_secondEndPoint(d[1])) : (this.set_firstStartPoint(d[0]), this.set_firstEndPoint(d[1]));
                !lt.Annotations.Core._leadPointDExtensions.isEmpty(this.get_rotateCenter()) && !a && (a = lt.Annotations.Core._leadPointDExtensions.clone(this.get_rotateCenter()), a.set_x(a.get_x() + b), a.set_y(a.get_y() + c), this.set_rotateCenter(a));
                this.updateIntersectionPoint()
            }
        },
        updateIntersectionPoint: function () {
            var a = this.get_firstStartPoint(), b = this.get_firstEndPoint(), c = this.get_secondStartPoint(), d = this.get_secondEndPoint(), e = a.get_y() - b.get_y(), f = b.get_x() - a.get_x(), a = a.get_y() * b.get_x() - a.get_x() * b.get_y(), b = c.get_y() - d.get_y(), g = d.get_x() - c.get_x(), c = c.get_y() * d.get_x() - c.get_x() * d.get_y();
            lt.Annotations.Core.Utils.isZero(e * g - f * b) ? this.set_intersectionPoint(lt.Annotations.Core._leadPointDExtensions.create(0, 0)) : (d = (a * g - f * c) / (e * g - f * b), this.set_intersectionPoint(lt.Annotations.Core._leadPointDExtensions.create(d,
                !f ? (c - b * d) / g : (a - e * d) / f)))
        }, get_hitTestedRuler: function () {
            return this._hitTestedRuler$3
        }, hitTest: function (a, b) {
            var c = lt.Annotations.Core.AnnCrossProductObject.callBaseMethod(this, "hitTest", [a, b]);
            c && (lt.Annotations.Core.Utils.hitTestLine(this.get_firstStartPoint(), this.get_firstEndPoint(), a, b, !1) ? this._hitTestedRuler$3 = "FirstRuler" : lt.Annotations.Core.Utils.hitTestLine(this.get_secondStartPoint(), this.get_secondEndPoint(), a, b, !1) && (this._hitTestedRuler$3 = "SecondRuler"));
            return c
        }, clone: function () {
            return Type.safeCast(lt.Annotations.Core.AnnCrossProductObject.callBaseMethod(this,
                "clone"), lt.Annotations.Core.AnnCrossProductObject)
        }, create: function () {
            return new lt.Annotations.Core.AnnCrossProductObject
        }, getRulerLength: function (a) {
            0 >= a && (a = 1);
            var b = Array(2);
            b[0] = this.get_firstStartPoint();
            b[1] = this.get_firstEndPoint();
            var c = lt.Annotations.Core.RulerHelper.getRulerLength(b) * a;
            b[0] = this.get_secondStartPoint();
            b[1] = this.get_secondEndPoint();
            a *= lt.Annotations.Core.RulerHelper.getRulerLength(b);
            return lt.Annotations.Core._leadLengthDExtensions.create(c + a)
        }, getInvalidateRect: function (a,
                                        b) {
            var c = lt.Annotations.Core.AnnCrossProductObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(c))return c;
            var d = b.get_labelRenderer();
            if (Object.keyExists(this.get_labels(), "SecondaryRulerLength") && null != d && null != this.get_labels().SecondaryRulerLength) {
                d = new lt.Annotations.Core.LeadPointCollection;
                d.add(this.get_secondStartPoint());
                d.add(this.get_secondEndPoint());
                d = new lt.Annotations.Core.AnnPolyRulerObject;
                d.set_showGauge(this.get_showGauge());
                d.set_showTickMarks(this.get_showTickMarks());
                d.set_tickMarksStroke(this.get_tickMarksStroke());
                d.set_stroke(this.get_stroke());
                d.set_measurementUnit(this.get_measurementUnit());
                for (var e = ss.IEnumerator.getEnumerator(Object.keys(this.get_unitsAbbreviation())); e.moveNext();) {
                    var f = e.current;
                    d.get_unitsAbbreviation()[f] = this.get_unitsAbbreviation()[f]
                }
                d.set_precision(this.get_precision());
                d.get_labels().RulerLength = this.get_labels().RulerLength;
                d.set_fixedStateOperations(this.get_fixedStateOperations());
                d.set_gaugeLength(this.get_gaugeLength());
                d.set_tickMarksLength(this.get_tickMarksLength());
                d.set_opacity(this.get_opacity());
                d.get_points().clear();
                d.get_points().add(this.get_firstStartPoint());
                d.get_points().add(this.get_firstEndPoint());
                e = new lt.Annotations.Core.AnnPolyRulerObject;
                e.set_showGauge(this.get_showGauge());
                e.set_showTickMarks(this.get_showTickMarks());
                e.set_tickMarksStroke(this.get_tickMarksStroke());
                e.set_stroke(this.get_stroke());
                e.set_measurementUnit(this.get_measurementUnit());
                for (var g = ss.IEnumerator.getEnumerator(Object.keys(this.get_unitsAbbreviation())); g.moveNext();)f = g.current, e.get_unitsAbbreviation()[f] = this.get_unitsAbbreviation()[f];
                e.set_precision(this.get_precision());
                e.set_fixedStateOperations(this.get_fixedStateOperations());
                e.set_gaugeLength(this.get_gaugeLength());
                e.set_tickMarksLength(this.get_tickMarksLength());
                e.set_opacity(this.get_opacity());
                e.get_labels().RulerLength = this.get_labels().SecondaryRulerLength;
                e.get_points().clear();
                e.get_points().add(this.get_secondStartPoint());
                e.get_points().add(this.get_secondEndPoint());
                c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, d.getInvalidateRect(a, b));
                c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, e.getInvalidateRect(a, b))
            }
            c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height())));
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype,
        "friendlyName", {
            get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_friendlyName,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "firstEndPoint", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_firstEndPoint,
        set: lt.Annotations.Core.AnnCrossProductObject.prototype.set_firstEndPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "firstStartPoint", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_firstStartPoint,
        set: lt.Annotations.Core.AnnCrossProductObject.prototype.set_firstStartPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "intersectionPoint", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_intersectionPoint,
        set: lt.Annotations.Core.AnnCrossProductObject.prototype.set_intersectionPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "secondEndPoint", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_secondEndPoint,
        set: lt.Annotations.Core.AnnCrossProductObject.prototype.set_secondEndPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "secondStartPoint", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_secondStartPoint,
        set: lt.Annotations.Core.AnnCrossProductObject.prototype.set_secondStartPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCrossProductObject.prototype, "hitTestedRuler", {
        get: lt.Annotations.Core.AnnCrossProductObject.prototype.get_hitTestedRuler,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnCurveObject = function () {
        lt.Annotations.Core.AnnCurveObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.curveObjectId);
        this._tension$2 = 1
    };
    lt.Annotations.Core.AnnCurveObject.prototype = {
        get_friendlyName: function () {
            return "Curve"
        }, _tension$2: 0,
        get_tension: function () {
            return this._tension$2
        }, set_tension: function (a) {
            if (lt.LeadDoubleTools.lessThan(a, 0) || lt.LeadDoubleTools.greaterThan(a, 1))throw new lt.ArgumentOutOfRangeException("Tension", a, "Must be a value greater than or equals to 0 and less than or equals to 1");
            if (this._tension$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Tension", 1, this._tension$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._tension$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, clone: function () {
            var a =
                Type.safeCast(lt.Annotations.Core.AnnCurveObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnCurveObject);
            a.set_tension(this._tension$2);
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnCurveObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "Tension", b, this._tension$2)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnCurveObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._tension$2 = lt.Annotations.Core.AnnXmlHelper.readNumericElement(c,
                "Tension", b, this._tension$2)
        }, create: function () {
            return new lt.Annotations.Core.AnnCurveObject
        }, hitTest: function (a, b) {
            if (!this.get_isVisible() || 2 > this.get_points().get_count())return !1;
            var c = this.get_points().toArray();
            if (2 === c.length)return lt.Annotations.Core.Utils.hitTestLine(c[0], c[1], a, b, !0);
            for (var d = new lt.Annotations.Core.LeadPointCollection, c = this.get_isClosed() ? lt.Annotations.Core.Utils.splineClosedCurve(c, this.get_tension()) : lt.Annotations.Core.Utils.splineCurve(c, this.get_tension()), c =
                ss.IEnumerator.getEnumerator(c); c.moveNext();)d.add(c.current);
            if (this.get_hitTestInterior() && lt.Annotations.Core.Utils.hitTestPolygon(d, a))return !0;
            for (var c = d.get_item(0), e = lt.Annotations.Core._leadPointDExtensions.get_empty(), f = !1, g = 1; g < d.get_count() && !f; ++g)e = d.get_item(g), lt.Annotations.Core.Utils.hitTestLine(c, e, a, b, !0) ? f = !0 : c = e;
            return f
        }, getBoundingRectangle: function () {
            if (2 < this.get_points().get_count()) {
                for (var a = null, a = this.get_isClosed() ? lt.Annotations.Core.Utils.splineClosedCurve(this.get_points().toArray(),
                    this.get_tension()) : lt.Annotations.Core.Utils.splineCurve(this.get_points().toArray(), this.get_tension()), b = a[0].get_x(), c = a[0].get_y(), d = a[a.length - 1].get_x(), e = a[a.length - 1].get_y(), a = ss.IEnumerator.getEnumerator(a); a.moveNext();) {
                    var f = a.current;
                    f.get_x() < b && (b = f.get_x());
                    f.get_y() < c && (c = f.get_y());
                    f.get_x() > d && (d = f.get_x());
                    f.get_y() > e && (e = f.get_y())
                }
                b = lt.Annotations.Core._leadRectDExtensions.create(b, c, Math.abs(d - b), Math.abs(e - c));
                return b = lt.Annotations.Core._leadRectDExtensions.inflate(b, 5,
                    5)
            }
            return lt.Annotations.Core.AnnCurveObject.callBaseMethod(this, "getBoundingRectangle")
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnCurveObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnCurveObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnCurveObject.prototype, "tension", {
        get: lt.Annotations.Core.AnnCurveObject.prototype.get_tension,
        set: lt.Annotations.Core.AnnCurveObject.prototype.set_tension,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnEllipseObject = function () {
        lt.Annotations.Core.AnnEllipseObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.ellipseObjectId)
    };
    lt.Annotations.Core.AnnEllipseObject.prototype = {
        get_friendlyName: function () {
            return "Ellipse"
        }, create: function () {
            return new lt.Annotations.Core.AnnEllipseObject
        }, hitTest: function (a, b) {
            if (!this.get_isVisible())return !1;
            var c = lt.Annotations.Core._leadRectDExtensions.clone(this.get_bounds());
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(c))return !1;
            c = lt.Annotations.Core._leadRectDExtensions.inflate(c, b, b);
            if (c = lt.Annotations.Core._leadRectDExtensions.containsPoint(c, a))c = lt.Annotations.Core._leadPointDExtensions.create(this.get_bounds().get_x() + this.get_bounds().get_width() / 2, this.get_bounds().get_y() + this.get_bounds().get_height() / 2), c = lt.Annotations.Core.PolyPoint.fromEllipse(this.get_rect(), this.get_angle(), c).hitTest(a, b, this.get_hitTestInterior());
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnEllipseObject.prototype, "friendlyName",
        {get: lt.Annotations.Core.AnnEllipseObject.prototype.get_friendlyName, enumerable: !0, configurable: !0});
    lt.Annotations.Core.AnnEncryptObject = function () {
        this._rect$2 = lt.Annotations.Core._leadRectDExtensions.create(0, 0, 0, 0);
        lt.Annotations.Core.AnnEncryptObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.encryptObjectId);
        this._key$2 = 0;
        this._serializeKeyIfEncrypted$2 = !0;
        this._resetKeyIfApplied$2 = !1;
        this._encryptor$2 = !0;
        this._isEncrypted$2 = !1
    };
    lt.Annotations.Core.AnnEncryptObject.prototype =
    {
        get_friendlyName: function () {
            return "Encrypt"
        },
        _key$2: 0,
        _serializeKeyIfEncrypted$2: !1,
        _resetKeyIfApplied$2: !1,
        _encryptor$2: !1,
        _isEncrypted$2: !1,
        _primaryPicture$2: null,
        get_primaryPicture: function () {
            return this._primaryPicture$2
        },
        set_primaryPicture: function (a) {
            if (this._primaryPicture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("PrimaryPicture", 1, this._primaryPicture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._primaryPicture$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _secondaryPicture$2: null,
        get_secondaryPicture: function () {
            return this._secondaryPicture$2
        },
        set_secondaryPicture: function (a) {
            if (this._secondaryPicture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("SecondaryPicture", 1, this._secondaryPicture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._secondaryPicture$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _defaultPrimaryPicture$2: 5,
        get_defaultPrimaryPicture: function () {
            return this._defaultPrimaryPicture$2
        },
        set_defaultPrimaryPicture: function (a) {
            if (this._defaultPrimaryPicture$2 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultPrimaryPicture", 1, this._defaultPrimaryPicture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._defaultPrimaryPicture$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _defaultSecondaryPicture$2: 6,
        get_defaultSecondaryPicture: function () {
            return this._defaultSecondaryPicture$2
        },
        set_defaultSecondaryPicture: function (a) {
            if (this._defaultSecondaryPicture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultSecondaryPicture",
                    1, this._defaultSecondaryPicture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._defaultSecondaryPicture$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_key: function () {
            return this._key$2
        },
        set_key: function (a) {
            return this._key$2 = a
        },
        get_resetKeyIfApplied: function () {
            return this._resetKeyIfApplied$2
        },
        set_resetKeyIfApplied: function (a) {
            return this._resetKeyIfApplied$2 = a
        },
        get_serializeKeyIfEncrypted: function () {
            return this._serializeKeyIfEncrypted$2
        },
        set_serializeKeyIfEncrypted: function (a) {
            return this._serializeKeyIfEncrypted$2 =
                a
        },
        get_encryptor: function () {
            return this._encryptor$2
        },
        set_encryptor: function (a) {
            if (this._encryptor$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Encryptor", 1, this._encryptor$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._encryptor$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_isEncrypted: function () {
            return this._isEncrypted$2
        },
        _setIsEncrypted: function (a) {
            this._isEncrypted$2 = a
        },
        get_canEncrypt: function () {
            return !this.get_isEncrypted() && this.get_encryptor() && !this.get_isLocked()
        },
        get_canDecrypt: function () {
            return !this.get_encryptor() && !this.get_isLocked()
        },
        get_supportsStroke: function () {
            return !1
        },
        get_supportsFill: function () {
            return !1
        },
        get_canRotate: function () {
            return !1
        },
        get_hitTestInterior: function () {
            return 1 === (1 === (1 === (1 === (lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "get_hitTestInterior") | null != this.get_primaryPicture()) | -1 < this.get_defaultPrimaryPicture()) | null != this.get_secondaryPicture()) | -1 < this.get_defaultSecondaryPicture())
        },
        rotate: function (a, b) {
            this.get_isEncrypted() ||
            lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "rotate", [a, b])
        },
        translate: function (a, b) {
            this.get_isEncrypted() || lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "translate", [a, b])
        },
        create: function () {
            return new lt.Annotations.Core.AnnEncryptObject
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnEncryptObject);
            a._encryptor$2 = this._encryptor$2;
            a._key$2 = this._key$2;
            a._primaryPicture$2 = null != this._primaryPicture$2 ?
                this._primaryPicture$2.clone() : null;
            a._secondaryPicture$2 = null != this._secondaryPicture$2 ? this._secondaryPicture$2.clone() : null;
            a._isEncrypted$2 = this._isEncrypted$2;
            return a
        },
        apply: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("provider");
            null == b && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
            this._rect$2 = this.get_rect();
            var c = b.get_mapper(), c = (new lt.Annotations.Core.AnnContainerMapper(c.get_sourceDpiX(), c.get_sourceDpiY(), c.get_sourceDpiX(),
                c.get_sourceDpiY())).rectFromContainerCoordinates(this.get_rect(), this.get_fixedStateOperations()), c = lt.Annotations.Core._leadRectDExtensions.create(Math.round(c.get_x()), Math.round(c.get_y()), Math.round(c.get_width()), Math.round(c.get_height()));
            this.get_encryptor() ? a.encrypt(b, c, this.get_key()) : a.decrypt(b, c, this.get_key());
            this._isEncrypted$2 = this.get_encryptor();
            this._encryptor$2 = !this._encryptor$2;
            this.get_resetKeyIfApplied() && this.set_key(0)
        },
        serialize: function (a, b, c) {
            lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this,
                "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "Encryptor", b, this._encryptor$2);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "Key", b, this._key$2);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "PrimaryPicture", b, this._primaryPicture$2);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "SecondaryPicture", b, this._secondaryPicture$2);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "IsEncrypted", b, this._isEncrypted$2)
        },
        deserialize: function (a,
                               b, c) {
            lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._encryptor$2 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "Encryptor", b, this._encryptor$2);
            this._key$2 = parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "Key", b, this._key$2));
            this._primaryPicture$2 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "PrimaryPicture", b);
            this._secondaryPicture$2 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "SecondaryPicture", b);
            this._isEncrypted$2 =
                lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "IsEncrypted", b, this._isEncrypted$2)
        },
        scaleVector: function (a, b, c, d, e) {
            this._isEncrypted$2 || lt.Annotations.Core.AnnEncryptObject.callBaseMethod(this, "scaleVector", [a, b, c, d, e])
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "primaryPicture",
        {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_primaryPicture,
            set: lt.Annotations.Core.AnnEncryptObject.prototype.set_primaryPicture,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "secondaryPicture", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_secondaryPicture,
        set: lt.Annotations.Core.AnnEncryptObject.prototype.set_secondaryPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype,
        "defaultPrimaryPicture", {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_defaultPrimaryPicture,
            set: lt.Annotations.Core.AnnEncryptObject.prototype.set_defaultPrimaryPicture,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "defaultSecondaryPicture", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_defaultSecondaryPicture,
        set: lt.Annotations.Core.AnnEncryptObject.prototype.set_defaultSecondaryPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype,
        "key", {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_key,
            set: lt.Annotations.Core.AnnEncryptObject.prototype.set_key,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "resetKeyIfApplied", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_resetKeyIfApplied,
        set: lt.Annotations.Core.AnnEncryptObject.prototype.set_resetKeyIfApplied,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "serializeKeyIfEncrypted",
        {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_serializeKeyIfEncrypted,
            set: lt.Annotations.Core.AnnEncryptObject.prototype.set_serializeKeyIfEncrypted,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "encryptor", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_encryptor,
        set: lt.Annotations.Core.AnnEncryptObject.prototype.set_encryptor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype,
        "isEncrypted", {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_isEncrypted,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "canEncrypt", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_canEncrypt,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "canDecrypt", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_canDecrypt,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype,
        "supportsStroke", {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_supportsStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnEncryptObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEncryptObject.prototype,
        "hitTestInterior", {
            get: lt.Annotations.Core.AnnEncryptObject.prototype.get_hitTestInterior,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnFreehandHotspotObject = function () {
        lt.Annotations.Core.AnnFreehandHotspotObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.freehandHotspotObjectId);
        this.set_isClosed(!0)
    };
    lt.Annotations.Core.AnnFreehandHotspotObject.prototype = {
        get_friendlyName: function () {
            return "Freehand Hotspot"
        }, get_supportsFill: function () {
            return !1
        }, get_supportsStroke: function () {
            return !1
        },
        _picture$2: null, get_picture: function () {
            return this._picture$2
        }, set_picture: function (a) {
            if (this._picture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Picture", 1, this._picture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._picture$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, _defaultPicture$2: 2, get_defaultPicture: function () {
            return this._defaultPicture$2
        }, set_defaultPicture: function (a) {
            if (this._defaultPicture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultPicture",
                    1, this._defaultPicture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._defaultPicture$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnFreehandHotspotObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnFreehandHotspotObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnFreehandHotspotObject);
            null != a && null != this._picture$2 && (a._picture$2 = this._picture$2.clone());
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnFreehandHotspotObject.callBaseMethod(this,
                "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "Picture", b, this._picture$2)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnFreehandHotspotObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._picture$2 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "Picture", b)
        }, get_hitTestInterior: function () {
            return 1 === (1 === (lt.Annotations.Core.AnnFreehandHotspotObject.callBaseMethod(this, "get_hitTestInterior") | null != this.get_picture()) | -1 < this.get_defaultPicture())
        }, getInvalidateRect: function (a,
                                        b) {
            var c = lt.Annotations.Core.AnnFreehandHotspotObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            return c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 2, 2)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_supportsFill,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype, "picture", {
        get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_picture,
        set: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.set_picture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype,
        "defaultPicture", {
            get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_defaultPicture,
            set: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.set_defaultPicture,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnFreehandHotspotObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnFreehandHotspotObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnGroupObject = function () {
        lt.Annotations.Core.AnnGroupObject.initializeBase(this);
        this.setId(0);
        this._children$2 = new lt.Annotations.Core.AnnObjectCollection;
        this._children$2.add_collectionChanged(ss.Delegate.create(this, this._children_CollectionChanged$2))
    };
    lt.Annotations.Core.AnnGroupObject.prototype = {
        get_friendlyName: function () {
            return "Group"
        }, _children$2: null, get_children: function () {
            return this._children$2
        }, add_objectAdded: function (a) {
            this.__objectAdded$2 = ss.Delegate.combine(this.__objectAdded$2, a)
        }, remove_objectAdded: function (a) {
            this.__objectAdded$2 = ss.Delegate.remove(this.__objectAdded$2,
                a)
        }, __objectAdded$2_handler_get: function () {
            null == this.__objectAdded$2_handler && (this.__objectAdded$2_handler = ss.EventHandler.create(this, this.add_objectAdded, this.remove_objectAdded));
            return this.__objectAdded$2_handler
        }, __objectAdded$2: null, __objectAdded$2_handler: null, add_objectRemoved: function (a) {
            this.__objectRemoved$2 = ss.Delegate.combine(this.__objectRemoved$2, a)
        }, remove_objectRemoved: function (a) {
            this.__objectRemoved$2 = ss.Delegate.remove(this.__objectRemoved$2, a)
        }, __objectRemoved$2_handler_get: function () {
            null ==
            this.__objectRemoved$2_handler && (this.__objectRemoved$2_handler = ss.EventHandler.create(this, this.add_objectRemoved, this.remove_objectRemoved));
            return this.__objectRemoved$2_handler
        }, __objectRemoved$2: null, __objectRemoved$2_handler: null, _children_CollectionChanged$2: function (a, b) {
            if (!b.get_action()) {
                var c = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject);
                c.set_isSelected(!1);
                if (null != c.get_parent()) {
                    var d = Type.safeCast(c.get_parent(), lt.Annotations.Core.AnnContainer);
                    null != d && d.get_children().remove(c);
                    c.set_parent(this);
                    this.set_rect(lt.Annotations.Core._leadRectDExtensions.unionRects(this.get_rect(), c.get_bounds()))
                }
                null != this.__objectAdded$2 && this.__objectAdded$2(this, lt.Annotations.Core.AnnObjectCollectionEventArgs.create(c))
            }
            1 === b.get_action() && (c = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject), c.set_parent(null), null != this.__objectRemoved$2 && this.__objectRemoved$2(this, lt.Annotations.Core.AnnObjectCollectionEventArgs.create(c)))
        }, rotate: function (a, b) {
            lt.Annotations.Core.AnnGroupObject.callBaseMethod(this,
                "rotate", [a, b]);
            for (var c = ss.IEnumerator.getEnumerator(this.get_children()); c.moveNext();)c.current.rotate(a, b)
        }, scale: function (a, b, c) {
            lt.Annotations.Core.AnnGroupObject.callBaseMethod(this, "scale", [a, b, c]);
            for (var d = ss.IEnumerator.getEnumerator(this.get_children()); d.moveNext();)d.current.scale(a, b, c)
        }, translate: function (a, b) {
            lt.Annotations.Core.AnnGroupObject.callBaseMethod(this, "translate", [a, b]);
            for (var c = ss.IEnumerator.getEnumerator(this.get_children()); c.moveNext();)c.current.translate(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnGroupObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnGroupObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGroupObject.prototype, "children", {
        get: lt.Annotations.Core.AnnGroupObject.prototype.get_children,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGroupObject.prototype, "objectAdded", {
        get: lt.Annotations.Core.AnnGroupObject.prototype.__objectAdded$2_handler_get,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGroupObject.prototype, "objectRemoved", {
        get: lt.Annotations.Core.AnnGroupObject.prototype.__objectRemoved$2_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnHiliteObject = function () {
        lt.Annotations.Core.AnnHiliteObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.hiliteObjectId);
        this._hiliteColor$2 = "yellow"
    };
    lt.Annotations.Core.AnnHiliteObject.prototype = {
        get_friendlyName: function () {
            return "Hilite"
        },
        _hiliteColor$2: null, get_hiliteColor: function () {
            return this._hiliteColor$2
        }, set_hiliteColor: function (a) {
            if (this._hiliteColor$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("HiliteColor", 1, this._hiliteColor$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._hiliteColor$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnHiliteObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnHiliteObject.callBaseMethod(this,
                "clone"), lt.Annotations.Core.AnnHiliteObject);
            a.set_hiliteColor(this._hiliteColor$2);
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnHiliteObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeColorElement(c, "Color", b, this._hiliteColor$2)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnHiliteObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._hiliteColor$2 = lt.Annotations.Core.AnnXmlHelper.readColorElement(c, "Color", b, this._hiliteColor$2)
        }, get_hitTestInterior: function () {
            return !0
        },
        get_supportsStroke: function () {
            return !1
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnHiliteObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnHiliteObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHiliteObject.prototype, "hiliteColor", {
        get: lt.Annotations.Core.AnnHiliteObject.prototype.get_hiliteColor,
        set: lt.Annotations.Core.AnnHiliteObject.prototype.set_hiliteColor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHiliteObject.prototype,
        "hitTestInterior", {
            get: lt.Annotations.Core.AnnHiliteObject.prototype.get_hitTestInterior,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnHiliteObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnHiliteObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnHotspotObject = function () {
        lt.Annotations.Core.AnnHotspotObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.hotspotObjectId)
    };
    lt.Annotations.Core.AnnHotspotObject.prototype =
    {
        get_friendlyName: function () {
            return "Hotspot"
        }, _defaultPicture$3: 2, get_supportsFill: function () {
        return !1
    }, get_supportsStroke: function () {
        return !1
    }, get_defaultPicture: function () {
        return this._defaultPicture$3
    }, set_defaultPicture: function (a) {
        if (this._defaultPicture$3 !== a) {
            var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultPicture", 1, this._defaultPicture$3, a);
            this.onPropertyChanged(b);
            b.get_cancel() || (b.set_status(0), this._defaultPicture$3 = a, this.onPropertyChanged(b))
        }
        return a
    }, create: function () {
        return new lt.Annotations.Core.AnnHotspotObject
    },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnHotspotObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnHotspotObject);
            a._defaultPicture$3 = this._defaultPicture$3;
            return a
        }, serialize: function (a, b, c) {
        lt.Annotations.Core.AnnHotspotObject.callBaseMethod(this, "serialize", [a, b, c])
    }, deserialize: function (a, b, c) {
        lt.Annotations.Core.AnnHotspotObject.callBaseMethod(this, "deserialize", [a, b, c])
    }, get_hitTestInterior: function () {
        return 1 === (1 === (lt.Annotations.Core.AnnHotspotObject.callBaseMethod(this,
                "get_hitTestInterior") | null != this.get_picture()) | -1 < this.get_defaultPicture())
    }
    };
    Object.defineProperty(lt.Annotations.Core.AnnHotspotObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnHotspotObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHotspotObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnHotspotObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHotspotObject.prototype,
        "supportsStroke", {
            get: lt.Annotations.Core.AnnHotspotObject.prototype.get_supportsStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnHotspotObject.prototype, "defaultPicture", {
        get: lt.Annotations.Core.AnnHotspotObject.prototype.get_defaultPicture,
        set: lt.Annotations.Core.AnnHotspotObject.prototype.set_defaultPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHotspotObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnHotspotObject.prototype.get_hitTestInterior,
        enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnImageObject = function () {
        lt.Annotations.Core.AnnImageObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.imageObjectId);
        this._picture$2 = null
    };
    lt.Annotations.Core.AnnImageObject.prototype = {
        get_friendlyName: function () {
            return "Image"
        }, _picture$2: null, get_picture: function () {
            return this._picture$2
        }, set_picture: function (a) {
            if (this._picture$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Picture", 1, this._picture$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._picture$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnImageObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnImageObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnImageObject);
            null != this._picture$2 && a.set_picture(this._picture$2.clone());
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnImageObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c,
                "Picture", b, this.get_picture())
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnImageObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this.set_picture(lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "Picture", b))
        }, get_hitTestInterior: function () {
            return !0
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnImageObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnImageObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnImageObject.prototype,
        "picture", {
            get: lt.Annotations.Core.AnnImageObject.prototype.get_picture,
            set: lt.Annotations.Core.AnnImageObject.prototype.set_picture,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnImageObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnImageObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnNoteObject = function () {
        this._shadowBorderWidth$3 = lt.Annotations.Core._leadLengthDExtensions.create(30);
        lt.Annotations.Core.AnnNoteObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.noteObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("yellow"))
    };
    lt.Annotations.Core.AnnNoteObject.prototype = {
        get_friendlyName: function () {
            return "Note"
        }, get_shadowBorderWidth: function () {
            return this._shadowBorderWidth$3
        }, set_shadowBorderWidth: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._shadowBorderWidth$3, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShadowBorderWidth", 1, this._shadowBorderWidth$3,
                    a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._shadowBorderWidth$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnNoteObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnNoteObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnNoteObject);
            a._shadowBorderWidth$3 = this._shadowBorderWidth$3;
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnNoteObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c,
                "ShadowBorderWidth", b, this._shadowBorderWidth$3)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnNoteObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._shadowBorderWidth$3 = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "ShadowBorderWidth", b, this._shadowBorderWidth$3)
        }, getInvalidateRect: function (a, b) {
            var c = lt.Annotations.Core.AnnNoteObject.callBaseMethod(this, "getInvalidateRect", [a, b]), d = a.lengthFromContainerCoordinates(this._shadowBorderWidth$3, 2);
            lt.Annotations.Core._leadRectDExtensions.isEmpty(c) ||
            (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d, d));
            c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height())));
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnNoteObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnNoteObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnNoteObject.prototype,
        "shadowBorderWidth", {
            get: lt.Annotations.Core.AnnNoteObject.prototype.get_shadowBorderWidth,
            set: lt.Annotations.Core.AnnNoteObject.prototype.set_shadowBorderWidth,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnObject = function () {
        this._stateId = "";
        this._renderedObjectBounds = lt.Annotations.Core._leadRectDExtensions.get_empty();
        this._metadata = {};
        this._reviews = [];
        this._selectionStroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("Blue"), lt.Annotations.Core._leadLengthDExtensions.create(4));
        this._fixedStateOperations = 8;
        this._groupName = "";
        this._points = new lt.Annotations.Core.LeadPointCollection;
        this._password = "";
        this._rotateCenter = lt.Annotations.Core._leadPointDExtensions.get_empty();
        this._rotateGripper = lt.Annotations.Core._leadLengthDExtensions.create(lt.Annotations.Core.AnnObject._rotateGripperOriginal);
        this._labels = {};
        this._internalRotateCenterLocation = lt.Annotations.Core._leadPointDExtensions.get_empty();
        this._internalRotateGripperLocation = lt.Annotations.Core._leadPointDExtensions.get_empty();
        var a = new lt.Annotations.Core.AnnLabel;
        a.set_isVisible(!1);
        a.set_offsetHeight(!0);
        this._labels.AnnObjectName = a;
        this._stroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("red"), lt.Annotations.Core._leadLengthDExtensions.create(1));
        this._fill = null;
        this._font = new lt.Annotations.Core.AnnFont("Arial", 12);
        this._metadata.Subject = "";
        this._metadata.Author = "";
        this._metadata.Modified = "";
        this._metadata.Title = "";
        this.get_supportsContent() && (this._metadata.Content = "");
        this._metadata.Created =
            ""
    };
    lt.Annotations.Core.AnnObject.dateToString = function (a) {
        if (null == a)throw new lt.ArgumentNullException("value");
        return a.toString()
    };
    lt.Annotations.Core.AnnObject.dateFromString = function (a) {
        if (String.isNullOrEmpty(a))return Date.get_now();
        var b;
        try {
            b = new Date(a)
        } catch (c) {
            b = Date.get_now()
        }
        return b
    };
    lt.Annotations.Core.AnnObject._pointScale = function (a, b, c, d, e, f) {
        var g = lt.Annotations.Core.Utils.subtractPoint(a, f), a = g.get_x() * e.get_x() + g.get_y() * e.get_y(), g = g.get_x() * d.get_x() + g.get_y() * d.get_y(), b =
            lt.Annotations.Core._leadPointDExtensions.create(g * d.get_x() * b, g * d.get_y() * b), c = lt.Annotations.Core._leadPointDExtensions.create(a * e.get_x() * c, a * e.get_y() * c);
        return lt.Annotations.Core._leadPointDExtensions.create(f.get_x() + b.get_x() + c.get_x(), f.get_y() + b.get_y() + c.get_y())
    };
    lt.Annotations.Core.AnnObject.prototype = {
        _userId: null, get_userId: function () {
            return this._userId
        }, set_userId: function (a) {
            return this._userId = a
        }, _isAlignmentTarget: !1, get_isAlignmentTarget: function () {
            return this._isAlignmentTarget
        },
        set_isAlignmentTarget: function (a) {
            return this._isAlignmentTarget = a
        }, _layer: null, get_layer: function () {
            return this._layer
        }, set_layer: function (a) {
            return this._layer = a
        }, _layerId: null, get__layerId: function () {
            return this._layerId
        }, set__layerId: function (a) {
            return this._layerId = a
        }, _id: 0, get_id: function () {
            return this._id
        }, setId: function (a) {
            this._id = a
        }, get_stateId: function () {
            return this._stateId
        }, set_stateId: function (a) {
            return this._stateId = a
        }, _opacity: 1, get_opacity: function () {
            return this._opacity
        }, set_opacity: function (a) {
            (lt.LeadDoubleTools.lessThan(a,
                0) || lt.LeadDoubleTools.greaterThan(a, 1)) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("Opacity", a, "Must be a value greater than or equals to 0 and less than or equals to 1");
            if (this.get_supportsOpacity()) {
                if (this._opacity !== a) {
                    var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Opacity", 1, this._opacity, a);
                    this.onPropertyChanged(b);
                    b.get_cancel() || (b.set_status(0), this._opacity = a, this.onPropertyChanged(b))
                }
            } else this._opacity = 1;
            return a
        }, get_renderedObjectBounds: function () {
            return this._renderedObjectBounds
        },
        set_renderedObjectBounds: function (a) {
            return this._renderedObjectBounds = a
        }, add_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.combine(this.__propertyChanged, a)
        }, remove_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.remove(this.__propertyChanged, a)
        }, __propertyChanged_handler_get: function () {
            null == this.__propertyChanged_handler && (this.__propertyChanged_handler = ss.EventHandler.create(this, this.add_propertyChanged, this.remove_propertyChanged));
            return this.__propertyChanged_handler
        },
        __propertyChanged: null, __propertyChanged_handler: null, get_reviews: function () {
            return this._reviews
        }, get_metadata: function () {
            return this._metadata
        }, onPropertyChanged: function (a) {
            null != this.__propertyChanged && this.__propertyChanged(this, a)
        }, saveProperties: function () {
        }, loadProperties: function (a) {
            null != a && this.set_isVisible(Boolean.parse(a.Visible))
        }, get_supportsFill: function () {
            return !1
        }, get_supportsStroke: function () {
            return !1
        }, get_supportsSelectionStroke: function () {
            return !1
        }, get_supportsFont: function () {
            return !1
        },
        get_supportsOpacity: function () {
            return !0
        }, get_supportsContent: function () {
            return !0
        }, _fill: null, get_fill: function () {
            return this._fill
        }, set_fill: function (a) {
            if (this._fill !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Fill", 1, this._fill, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fill = a, this.onPropertyChanged(b))
            }
            return a
        }, _stroke: null, get_stroke: function () {
            return this._stroke
        }, set_stroke: function (a) {
            if (this._stroke !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Stroke",
                    1, this._stroke, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._stroke = a, this.onPropertyChanged(b))
            }
            return a
        }, get_selectionStroke: function () {
            return this._selectionStroke
        }, set_selectionStroke: function (a) {
            if (this._selectionStroke !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("SelectionStroke", 1, this._selectionStroke, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._selectionStroke = a, this.onPropertyChanged(b))
            }
            return a
        }, _font: null, get_font: function () {
            return this._font
        },
        set_font: function (a) {
            if (this._font !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Font", 1, this._font, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._font = a, this.onPropertyChanged(b))
            }
            return a
        }, _hyperlink: "https://www.leadtools.com", get_hyperlink: function () {
            return this._hyperlink
        }, set_hyperlink: function (a) {
            if (this._hyperlink !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Hyperlink", 1, this._hyperlink, a);
                this.onPropertyChanged(b);
                b.get_cancel() ||
                (b.set_status(0), this._hyperlink = a, this.onPropertyChanged(b))
            }
            return a
        }, _lockPicture: 1, get_lockPicture: function () {
            return this._lockPicture
        }, set_lockPicture: function (a) {
            if (this._lockPicture !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("LockPicture", 1, this._lockPicture, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._lockPicture = a, this.onPropertyChanged(b))
            }
            return a
        }, _contentPicture: 7, get_contentPicture: function () {
            return this._contentPicture
        }, set_contentPicture: function (a) {
            if (this._contentPicture !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ContentPicture", 1, this._contentPicture, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._contentPicture = a, this.onPropertyChanged(b))
            }
            return a
        }, _internalAdd: !1, get_internalAdd: function () {
            return this._internalAdd
        }, set_internalAdd: function (a) {
            return this._internalAdd = a
        }, get_fixedStateOperations: function () {
            return this._fixedStateOperations
        }, set_fixedStateOperations: function (a) {
            if (this._fixedStateOperations !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FixedStateOperations",
                    1, this._fixedStateOperations, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fixedStateOperations = a, this.onPropertyChanged(b))
            }
            return a
        }, get_groupName: function () {
            return this._groupName
        }, set_groupName: function (a) {
            if (this._groupName !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("GroupName", 1, this._groupName, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._groupName = a, this.onPropertyChanged(b))
            }
            return a
        }, _parent: null, get_parent: function () {
            return this._parent
        },
        set_parent: function (a) {
            return this._parent = a
        }, get_points: function () {
            return this._points
        }, onPointsChanged: function () {
        }, get_password: function () {
            return this._password
        }, set_password: function (a) {
            if (this._password !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Password", 1, this._password, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._password = a, this.onPropertyChanged(b))
            }
            return a
        }, get_bounds: function () {
            return this.getBoundingRectangle()
        }, _isLocked: !1, get_isLocked: function () {
            return this._isLocked
        },
        _tag: null, get_tag: function () {
            return this._tag
        }, set_tag: function (a) {
            if (this._tag !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Tag", 1, this._tag, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._tag = a, this.onPropertyChanged(b))
            }
            return a
        }, _isVisible: !0, get_isVisible: function () {
            return this._isVisible
        }, set_isVisible: function (a) {
            if (this._isVisible !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("IsVisible", 1, this._isVisible, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._isVisible = a, this.onPropertyChanged(b))
            }
            return a
        }, _isSelected: !1, get_isSelected: function () {
            return this._isSelected
        }, set_isSelected: function (a) {
            if (this._isSelected !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("IsSelected", 1, this._isSelected, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._isSelected = a, this.onPropertyChanged(b))
            }
            return a
        }, get_rotateCenter: function () {
            return this._rotateCenter
        }, set_rotateCenter: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this._rotateCenter,
                    a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("RotateCenter", 1, this._rotateCenter, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._rotateCenter = a, this.onPropertyChanged(b))
            }
            return a
        }, get_rotateGripper: function () {
            return this._rotateGripper
        }, set_rotateGripper: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._rotateGripper, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("RotateGripper", 1, this._rotateGripper, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._rotateGripper = a, this.onPropertyChanged(b))
            }
            return a
        }, get_canRotate: function () {
            return !0
        }, get_labels: function () {
            return this._labels
        }, _getBoundingPoints: function () {
            for (var a = this._points.get_item(0).get_x(), b = this._points.get_item(0).get_y(), c = this._points.get_item(this._points.get_count() - 1).get_x(), d = this._points.get_item(this._points.get_count() - 1).get_y(), e = Array(4), f = ss.IEnumerator.getEnumerator(this.get_points()); f.moveNext();) {
                var g = f.current;
                g.get_x() < a &&
                (e[0] = g);
                g.get_y() < b && (e[1] = g);
                g.get_x() > c && (e[2] = g);
                g.get_y() > d && (e[3] = g)
            }
            return e
        }, getBoundingRectangle: function () {
            if (1 > this._points.get_count())return lt.Annotations.Core._leadRectDExtensions.get_empty();
            for (var a = this._points.get_item(0).get_x(), b = this._points.get_item(0).get_y(), c = this._points.get_item(this._points.get_count() - 1).get_x(), d = this._points.get_item(this._points.get_count() - 1).get_y(), e = ss.IEnumerator.getEnumerator(this.get_points()); e.moveNext();) {
                var f = e.current;
                f.get_x() < a && (a =
                    f.get_x());
                f.get_y() < b && (b = f.get_y());
                f.get_x() > c && (c = f.get_x());
                f.get_y() > d && (d = f.get_y())
            }
            return lt.Annotations.Core._leadRectDExtensions.create(a, b, Math.abs(c - a), Math.abs(d - b))
        }, lock: function (a) {
            this.get_isLocked() || (this._password = a, this._isLocked = !0)
        }, unlock: function (a) {
            this.get_isLocked() && !String.compare(a, this._password, !1) && (this._isLocked = !1, this._password = "")
        }, scaleVector: function (a, b, c, d, e) {
            for (var f = 0; f < this.get_points().get_count(); ++f)this.get_points().set_item(f, lt.Annotations.Core.AnnObject._pointScale(this.get_points().get_item(f),
                a, b, c, d, e))
        }, scale: function (a, b, c) {
            for (var d = 0; d < this.get_points().get_count(); ++d)this.get_points().set_item(d, lt.Annotations.Core.AnnTransformer.scalePointAt(this.get_points().get_item(d), a, b, c.get_x(), c.get_y()));
            this.set_rotateCenter(lt.Annotations.Core.AnnTransformer.scalePointAt(this.get_rotateCenter(), a, b, c.get_x(), c.get_y()))
        }, translate: function (a, b) {
            for (var c = 0; c < this.get_points().get_count(); ++c) {
                var d = this.get_points().get_item(c);
                lt.Annotations.Core._leadPointDExtensions.isEmpty(d) || (d.set_x(d.get_x() +
                    a), d.set_y(d.get_y() + b), this.get_points().set_item(c, d))
            }
            lt.Annotations.Core._leadPointDExtensions.isEmpty(this._rotateCenter) || (this._rotateCenter.set_x(this._rotateCenter.get_x() + a), this._rotateCenter.set_y(this._rotateCenter.get_y() + b))
        }, rotate: function (a, b) {
            if (this.get_canRotate())for (var c = 0; c < this.get_points().get_count(); ++c)this.get_points().set_item(c, lt.Annotations.Core.AnnTransformer.rotatePointAt(this.get_points().get_item(c), a, b.get_x(), b.get_y()));
            lt.Annotations.Core._leadPointDExtensions.isEmpty(this._rotateCenter) ||
            (this._rotateCenter = lt.Annotations.Core.AnnTransformer.rotatePointAt(this._rotateCenter, a, b.get_x(), b.get_y()))
        }, normalize: function () {
            for (var a = 0; a < this.get_points().get_count(); ++a) {
                for (var b = this.get_points().get_item(a), c = 0; c < this.get_points().get_count(); ++c)if (this.get_points().get_item(c).get_x() < b.get_x()) {
                    var d = this.get_points().get_item(c);
                    this.get_points().set_item(c, b);
                    b = d
                }
                this.get_points().set_item(a, b)
            }
        }, serialize: function (a, b, c) {
            var d = Type.getInstanceType(this);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c,
                "ObjectType", b, d.get_fullName().replaceAll("lt.Annotations.", "Leadtools.Annotations."));
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "AssemblyName", b, "");
            lt.Annotations.Core.AnnXmlHelper._writeOnLoadElement(c, "OnLoad", b);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "IsVisible", b, this.get_isVisible());
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "IsSelected", b, this.get_isSelected());
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "IsLocked", b, this.get_isLocked());
            (null == a || a.get_saveLockPassword()) && lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "Password", b, this.get_password());
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "GroupName", b, this.get_groupName());
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "Hyperlink", b, this.get_hyperlink());
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "FixedStateOperations", b, this.get_fixedStateOperations());
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "RotateGripper", b, this.get_rotateGripper());
            lt.Annotations.Core.AnnXmlHelper.writePointElement(c, "RotateCenter", b, this.get_rotateCenter());
            lt.Annotations.Core.AnnXmlHelper.writePointsElement(c, "Points", b, this.get_points());
            lt.Annotations.Core.AnnXmlHelper.writeBrushElement(c, "Fill", b, this.get_fill());
            lt.Annotations.Core.AnnXmlHelper.writeLabelsElement(c, "Labels", b, this.get_labels());
            lt.Annotations.Core.AnnXmlHelper.writeStrokeElement(c, "Stroke", b, this.get_stroke());
            lt.Annotations.Core.AnnXmlHelper.writeStrokeElement(c, "SelectionStroke", b, this.get_selectionStroke());
            lt.Annotations.Core.AnnXmlHelper.writeFontElement(c, "Font", b, this.get_font());
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "ObjectId", b, this._id);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "ObjectTag", b, null != this.get_tag() ? this.get_tag().toString() : "");
            lt.Annotations.Core.AnnXmlHelper.writeMetadataElement(c, "Metadata", b, this._metadata);
            lt.Annotations.Core.AnnXmlHelper.writeReviewsElement(c, "Reviews", b, this._reviews);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "UserId",
                b, this._userId);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "LayerId", b, this._layerId);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "Opacity", b, this._opacity)
        }, deserialize: function (a, b, c) {
            this._isVisible = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "IsVisible", b, this._isVisible);
            this._isSelected = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "IsSelected", b, this._isSelected);
            this._isLocked = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "IsLocked", b, this._isLocked);
            a = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "ObjectTag", b, "##NEW_TAG##");
            "##NEW_TAG##" !== a && (this._tag = a);
            this._password = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "Password", b, this._password);
            this._groupName = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "GroupName", b, this._groupName);
            this._hyperlink = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "Hyperlink", b, "");
            this._fixedStateOperations = lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "FixedStateOperations",
                b, 0);
            this._rotateGripper = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "RotateGripper", b, this._rotateGripper);
            this._rotateCenter = lt.Annotations.Core.AnnXmlHelper.readPointElement(c, "RotateCenter", b, this._rotateCenter);
            this._points = lt.Annotations.Core.AnnXmlHelper.readPointsElement(c, "Points", b);
            (a = parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "ObjectId", b, 0))) && this.setId(a);
            this._fill = lt.Annotations.Core.AnnXmlHelper.readBrushElement(c, "Fill", b, this._fill);
            this._labels = lt.Annotations.Core.AnnXmlHelper.readLabelsElement(c,
                "Labels", b);
            this._stroke = lt.Annotations.Core.AnnXmlHelper.readStrokeElement(c, "Stroke", b, this._stroke);
            this._selectionStroke = lt.Annotations.Core.AnnXmlHelper.readStrokeElement(c, "SelectionStroke", b, this._selectionStroke);
            this._font = lt.Annotations.Core.AnnXmlHelper.readFontElement(c, "Font", b, this._font);
            this._metadata = lt.Annotations.Core.AnnXmlHelper.readMetadataElement(c, "Metadata", b);
            this._reviews = lt.Annotations.Core.AnnXmlHelper.readReviewsElement(c, "Reviews", b);
            this._userId = lt.Annotations.Core.AnnXmlHelper.readStringElement(c,
                "UserId", b, this._userId);
            this._layerId = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "LayerId", b, this._layerId);
            this._opacity = lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "Opacity", b, 1);
            a = null;
            a = lt.Annotations.Core.AnnXmlHelper._readOnLoadElement(c, "OnLoad", b);
            b = this.get_bounds();
            b = lt.Annotations.Core._leadPointDExtensions.create(b.get_x() + b.get_width() / 2, b.get_y() + b.get_height() / 2);
            lt.Annotations.Core._leadPointDExtensions.isEmpty(b) || (this.scale(a.get_scaleX(), a.get_scaleY(), b),
                this.rotate(a.get_rotateAngle(), b));
            b = Type.safeCast(this.get_parent(), lt.Annotations.Core.AnnContainer);
            null != b && (b = b.get_mapper().pointToContainerCoordinates(a.get_offset()), lt.Annotations.Core._leadPointDExtensions.isEmpty(b) || this.translate(b.get_x(), b.get_y()))
        }, clone: function () {
            var a = this.create();
            a.get_points().clear();
            null != this.get_fill() && a.set_fill(this.get_fill().clone());
            null != this.get_stroke() && a.set_stroke(this.get_stroke().clone());
            null != this._selectionStroke && a.set_selectionStroke(this._selectionStroke.clone());
            a.set_rotateGripper(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_rotateGripper()));
            a.set_rotateCenter(lt.Annotations.Core._leadPointDExtensions.clone(this.get_rotateCenter()));
            a.set_isSelected(this.get_isSelected());
            a.set_hyperlink(this.get_hyperlink());
            a.set_fixedStateOperations(this.get_fixedStateOperations());
            a.set_font(this._font.clone());
            a._groupName = this._groupName;
            a.set_tag(this.get_tag());
            a.set_isVisible(this.get_isVisible());
            a.set_renderedObjectBounds(this._renderedObjectBounds);
            a.get_supportsOpacity() && a.set_opacity(this._opacity);
            if (null != this.get_points() && 0 < this.get_points().get_count())for (var b = ss.IEnumerator.getEnumerator(this.get_points()); b.moveNext();) {
                var c = b.current;
                a.get_points().add(lt.Annotations.Core._leadPointDExtensions.clone(c))
            }
            this.get_isLocked() && a.lock(this.get_password());
            Object.clearKeys(a.get_labels());
            for (b = ss.IEnumerator.getEnumerator(Object.keys(this.get_labels())); b.moveNext();)c = b.current, a.get_labels()[c] = this.get_labels()[c].clone();
            Object.clearKeys(a.get_metadata());
            var b = this._metadata, d;
            for (d in b) {
                var c = d, e = b[d];
                a.get_metadata()[c] = e
            }
            for (d = ss.IEnumerator.getEnumerator(this._reviews); d.moveNext();)b = d.current, null != b ? a.get_reviews().add(b.clone()) : a.get_reviews().add(null);
            return a
        }, hitTest: function (a, b) {
            if (!this._isVisible)return !1;
            var c = lt.Annotations.Core._leadRectDExtensions.clone(this.get_bounds());
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(c))return !1;
            c = lt.Annotations.Core._leadRectDExtensions.inflate(c, b, b);
            return lt.Annotations.Core._leadRectDExtensions.containsPoint(c,
                a)
        }, get_hitTestInterior: function () {
            return this.get_supportsFill() && null != this.get_fill()
        }, _mySizeFromContainerCoordinates: function (a, b) {
            var c = 1 / 720;
            return lt.Annotations.Core._leadSizeDExtensions.create(a.get_width() * c * b.get_deviceDpiX(), a.get_height() * c * b.get_deviceDpiY())
        }, getInvalidateRect: function (a, b) {
            var c = a.rectFromContainerCoordinates(this.get_bounds(), this.get_fixedStateOperations());
            if (!a.get_rotateTransform().get_isIdentity())for (var d = a.pointsFromContainerCoordinates(this.get_points().toArray(),
                this.get_fixedStateOperations()), d = ss.IEnumerator.getEnumerator(d); d.moveNext();) {
                var e = d.current;
                lt.Annotations.Core._leadRectDExtensions.containsPoint(c, e) || (c = lt.Annotations.Core._leadRectDExtensions.unionPoint(c, e))
            }
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(c))return c;
            this.get_supportsStroke() && null != this.get_stroke() && (d = a.strokeFromContainerCoordinates(this.get_stroke(), this.get_fixedStateOperations()), d = Math.max(d.get_strokeThickness().get_value(), 1), c = lt.Annotations.Core._leadRectDExtensions.inflate(c,
                d + 1, d + 1));
            this.get_supportsSelectionStroke() && null != this._selectionStroke && (d = a.strokeFromContainerCoordinates(this._selectionStroke, this.get_fixedStateOperations()), d = d.get_strokeThickness().get_value(), c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d + 1, d + 1));
            if (null != b) {
                if (this.get_isSelected()) {
                    if (null != b.get_rotateGripperThumbStyle()) {
                        var e = a.pointFromContainerCoordinates(this.get_internalRotateGripperLocation(), this.get_fixedStateOperations()), f = b.get_rotateGripperThumbStyle().get_size(),
                            f = this._mySizeFromContainerCoordinates(f, a), d = f.get_height(), f = f.get_width(), g = e.get_x() - f / 2, h = e.get_y() - d / 2;
                        !lt.Annotations.Core._leadPointDExtensions.isEmpty(e) && this.get_isSelected() && (d = lt.Annotations.Core._leadRectDExtensions.create(g, h, f, d), c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, d))
                    }
                    null != b.get_rotateCenterThumbStyle() && (e = a.pointFromContainerCoordinates(this.get_internalRotateCenterLocation(), this.get_fixedStateOperations()), f = b.get_rotateCenterThumbStyle().get_size(), f = this._mySizeFromContainerCoordinates(f,
                        a), d = f.get_height(), f = f.get_width(), g = e.get_x() - f / 2, h = e.get_y() - d / 2, !lt.Annotations.Core._leadPointDExtensions.isEmpty(e) && this.get_isSelected() && (d = lt.Annotations.Core._leadRectDExtensions.create(g, h, f, d), c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, d)));
                    null != b.get_locationsThumbStyle() && (d = this._mySizeFromContainerCoordinates(b.get_locationsThumbStyle().get_size(), a), c = lt.Annotations.Core._leadRectDExtensions.inflate(c, (d.get_width() + 2) / 2, (d.get_height() + 2) / 2), d = b.get_locationsThumbStyle().get_stroke(),
                    null != d && (d = d.get_strokeThickness().get_value(), c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d, d)))
                }
                for (d = ss.IEnumerator.getEnumerator(Object.keys(this.get_labels())); d.moveNext();)e = d.current, e = this.get_labels()[e], e.get_isVisible() && (f = b.get_labelRenderer(), null != f && (e = f.getBounds(a, e, 0), lt.Annotations.Core._leadRectDExtensions.isEmpty(e) || (c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, e))));
                Object.keyExists(this._metadata, "Content") && (String.isNullOrEmpty(this._metadata.Content) ||
                (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 60, 60)))
            }
            c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1);
            return c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height()))
        }, getArea: function () {
            var a = this.get_points().toArray().getEnumerator();
            if (!a.moveNext())return 0;
            for (var b = lt.Annotations.Core._leadPointDExtensions.clone(a.current), c = lt.Annotations.Core._leadPointDExtensions.clone(b), d = 0; a.moveNext();)var e =
                lt.Annotations.Core._leadPointDExtensions.clone(a.current), d = d + (e.get_x() * c.get_y() - c.get_x() * e.get_y()), c = lt.Annotations.Core._leadPointDExtensions.clone(e);
            d += b.get_x() * c.get_y() - c.get_x() * b.get_y();
            return Math.abs(d / 2)
        }, get_internalRotateCenterLocation: function () {
            return this._internalRotateCenterLocation
        }, set_internalRotateCenterLocation: function (a) {
            return this._internalRotateCenterLocation = a
        }, get_internalRotateGripperLocation: function () {
            return this._internalRotateGripperLocation
        }, set_internalRotateGripperLocation: function (a) {
            return this._internalRotateGripperLocation =
                a
        }, _internalThumbLocations: null, get_internalThumbLocations: function () {
            return this._internalThumbLocations
        }, set_internalThumbLocations: function (a) {
            return this._internalThumbLocations = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "userId", {
        get: lt.Annotations.Core.AnnObject.prototype.get_userId,
        set: lt.Annotations.Core.AnnObject.prototype.set_userId,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "isAlignmentTarget", {
        get: lt.Annotations.Core.AnnObject.prototype.get_isAlignmentTarget,
        set: lt.Annotations.Core.AnnObject.prototype.set_isAlignmentTarget, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "layer", {
        get: lt.Annotations.Core.AnnObject.prototype.get_layer,
        set: lt.Annotations.Core.AnnObject.prototype.set_layer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "id", {
        get: lt.Annotations.Core.AnnObject.prototype.get_id,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "stateId", {
            get: lt.Annotations.Core.AnnObject.prototype.get_stateId,
            set: lt.Annotations.Core.AnnObject.prototype.set_stateId,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "opacity", {
        get: lt.Annotations.Core.AnnObject.prototype.get_opacity,
        set: lt.Annotations.Core.AnnObject.prototype.set_opacity,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "renderedObjectBounds", {
        get: lt.Annotations.Core.AnnObject.prototype.get_renderedObjectBounds,
        set: lt.Annotations.Core.AnnObject.prototype.set_renderedObjectBounds, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "propertyChanged", {
        get: lt.Annotations.Core.AnnObject.prototype.__propertyChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "reviews", {
        get: lt.Annotations.Core.AnnObject.prototype.get_reviews,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "metadata", {get: lt.Annotations.Core.AnnObject.prototype.get_metadata, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "supportsSelectionStroke", {
            get: lt.Annotations.Core.AnnObject.prototype.get_supportsSelectionStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "supportsFont", {
        get: lt.Annotations.Core.AnnObject.prototype.get_supportsFont,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "supportsOpacity", {
        get: lt.Annotations.Core.AnnObject.prototype.get_supportsOpacity,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "supportsContent", {
            get: lt.Annotations.Core.AnnObject.prototype.get_supportsContent,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "fill", {
        get: lt.Annotations.Core.AnnObject.prototype.get_fill,
        set: lt.Annotations.Core.AnnObject.prototype.set_fill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "stroke", {
        get: lt.Annotations.Core.AnnObject.prototype.get_stroke,
        set: lt.Annotations.Core.AnnObject.prototype.set_stroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "selectionStroke", {
        get: lt.Annotations.Core.AnnObject.prototype.get_selectionStroke,
        set: lt.Annotations.Core.AnnObject.prototype.set_selectionStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "font", {
        get: lt.Annotations.Core.AnnObject.prototype.get_font,
        set: lt.Annotations.Core.AnnObject.prototype.set_font,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "hyperlink", {
            get: lt.Annotations.Core.AnnObject.prototype.get_hyperlink,
            set: lt.Annotations.Core.AnnObject.prototype.set_hyperlink,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "lockPicture", {
        get: lt.Annotations.Core.AnnObject.prototype.get_lockPicture,
        set: lt.Annotations.Core.AnnObject.prototype.set_lockPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "contentPicture", {
        get: lt.Annotations.Core.AnnObject.prototype.get_contentPicture,
        set: lt.Annotations.Core.AnnObject.prototype.set_contentPicture, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "internalAdd", {
        get: lt.Annotations.Core.AnnObject.prototype.get_internalAdd,
        set: lt.Annotations.Core.AnnObject.prototype.set_internalAdd,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "fixedStateOperations", {
        get: lt.Annotations.Core.AnnObject.prototype.get_fixedStateOperations,
        set: lt.Annotations.Core.AnnObject.prototype.set_fixedStateOperations,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "groupName", {
        get: lt.Annotations.Core.AnnObject.prototype.get_groupName,
        set: lt.Annotations.Core.AnnObject.prototype.set_groupName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "parent", {
        get: lt.Annotations.Core.AnnObject.prototype.get_parent,
        set: lt.Annotations.Core.AnnObject.prototype.set_parent,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "points", {get: lt.Annotations.Core.AnnObject.prototype.get_points, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "password", {
        get: lt.Annotations.Core.AnnObject.prototype.get_password,
        set: lt.Annotations.Core.AnnObject.prototype.set_password,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "bounds", {
        get: lt.Annotations.Core.AnnObject.prototype.get_bounds,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "isLocked", {get: lt.Annotations.Core.AnnObject.prototype.get_isLocked, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "tag", {
        get: lt.Annotations.Core.AnnObject.prototype.get_tag,
        set: lt.Annotations.Core.AnnObject.prototype.set_tag,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "isVisible", {
        get: lt.Annotations.Core.AnnObject.prototype.get_isVisible,
        set: lt.Annotations.Core.AnnObject.prototype.set_isVisible,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "isSelected", {
        get: lt.Annotations.Core.AnnObject.prototype.get_isSelected,
        set: lt.Annotations.Core.AnnObject.prototype.set_isSelected,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "rotateCenter", {
        get: lt.Annotations.Core.AnnObject.prototype.get_rotateCenter,
        set: lt.Annotations.Core.AnnObject.prototype.set_rotateCenter,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "rotateGripper", {
            get: lt.Annotations.Core.AnnObject.prototype.get_rotateGripper,
            set: lt.Annotations.Core.AnnObject.prototype.set_rotateGripper,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "labels", {
        get: lt.Annotations.Core.AnnObject.prototype.get_labels,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype,
        "hitTestInterior", {
            get: lt.Annotations.Core.AnnObject.prototype.get_hitTestInterior,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "internalRotateCenterLocation", {
        get: lt.Annotations.Core.AnnObject.prototype.get_internalRotateCenterLocation,
        set: lt.Annotations.Core.AnnObject.prototype.set_internalRotateCenterLocation,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "internalRotateGripperLocation", {
        get: lt.Annotations.Core.AnnObject.prototype.get_internalRotateGripperLocation,
        set: lt.Annotations.Core.AnnObject.prototype.set_internalRotateGripperLocation, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObject.prototype, "internalThumbLocations", {
        get: lt.Annotations.Core.AnnObject.prototype.get_internalThumbLocations,
        set: lt.Annotations.Core.AnnObject.prototype.set_internalThumbLocations,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnPointerObject = function () {
        this._pointerPosition$2 = 0;
        this._arrowLength$2 = lt.Annotations.Core._leadLengthDExtensions.create(150);
        lt.Annotations.Core.AnnPointerObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.pointerObjectId);
        this.get_points().clear()
    };
    lt.Annotations.Core.AnnPointerObject.prototype = {
        get_friendlyName: function () {
            return "Pointer"
        }, get_supportsFill: function () {
            return !0
        }, get_pointerPosition: function () {
            return this._pointerPosition$2
        }, set_pointerPosition: function (a) {
            return this._pointerPosition$2 = a
        }, get_arrowLength: function () {
            return this._arrowLength$2
        }, set_arrowLength: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._arrowLength$2,
                    a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ArrowLength", 1, this._arrowLength$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._arrowLength$2 = a, this.onPropertyChanged(b))
            }
            return a
        }, getArrowPoints: function () {
            if (1 > this.get_points().get_count())return null;
            var a = null, b = !this._pointerPosition$2 ? this.get_points().get_item(0) : this.get_points().get_item(1);
            if (!lt.Annotations.Core._leadPointDExtensions.isEmpty(b) && !lt.Annotations.Core._leadPointDExtensions.isEmpty(b))var a =
                this._arrowLength$2.get_value(), a = [lt.Annotations.Core._leadPointDExtensions.create(a, a / 2), lt.Annotations.Core._leadPointDExtensions.create(0, 0), lt.Annotations.Core._leadPointDExtensions.create(a, -(a / 2))], c = 0, c = 1 === this._pointerPosition$2 ? lt.Annotations.Core.Utils.findAngle(this.get_points().get_item(1), this.get_points().get_item(0)) : lt.Annotations.Core.Utils.findAngle(this.get_points().get_item(0), this.get_points().get_item(1)), a = lt.Annotations.Core.AnnTransformer.rotateAtPoints(a, c, 0, 0), a = lt.Annotations.Core.AnnTransformer.translatePoints(a,
                b.get_x(), b.get_y());
            return a
        }, hitTest: function (a, b) {
            if (!this.get_isVisible())return !1;
            var c = lt.Annotations.Core.AnnPointerObject.callBaseMethod(this, "hitTest", [a, b]);
            if (!c) {
                var d = this.getArrowPoints();
                if (null != d && 1 < d.length)for (var e = 0; e < d.length - 1 && !(c = lt.Annotations.Core.Utils.hitTestLine(d[e], d[e + 1], a, b, !0)); ++e);
            }
            return c
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnPointerObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnPointerObject);
            null != a && (a.set_arrowLength(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_arrowLength())),
                a.set_pointerPosition(this.get_pointerPosition()));
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnPointerObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "ArrowLength", b, this._arrowLength$2);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "ArrowPosition", b, this._pointerPosition$2)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnPointerObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._arrowLength$2 = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c,
                "ArrowLength", b, this._arrowLength$2);
            this._pointerPosition$2 = lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "ArrowPosition", b, this._pointerPosition$2)
        }, create: function () {
            return new lt.Annotations.Core.AnnPointerObject
        }, getBoundingRectangle: function () {
            if (1 > this.get_points().get_count())return lt.Annotations.Core._leadRectDExtensions.get_empty();
            var a = lt.Annotations.Core._leadRectDExtensions.get_empty(), a = this.get_points().get_item(0), a = lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(0),
                this.get_points().get_item(1)) ? lt.Annotations.Core._leadRectDExtensions.create(a.get_x(), a.get_y(), 1, 1) : lt.Annotations.Core.AnnPointerObject.callBaseMethod(this, "getBoundingRectangle"), b = this.getArrowPoints();
            if (null != b && 0 < b.length)for (var c = 0; c < b.length; ++c)a = lt.Annotations.Core._leadRectDExtensions.unionPoint(a, b[c]);
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPointerObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnPointerObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointerObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnPointerObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointerObject.prototype, "pointerPosition", {
        get: lt.Annotations.Core.AnnPointerObject.prototype.get_pointerPosition,
        set: lt.Annotations.Core.AnnPointerObject.prototype.set_pointerPosition,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointerObject.prototype,
        "arrowLength", {
            get: lt.Annotations.Core.AnnPointerObject.prototype.get_arrowLength,
            set: lt.Annotations.Core.AnnPointerObject.prototype.set_arrowLength,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnPointObject = function () {
        lt.Annotations.Core.AnnPointObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.pointObjectId);
        this.get_points().clear();
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this._picture$1 = null;
        this._radius$1 = lt.Annotations.Core._leadLengthDExtensions.create(144);
        this._showPicture$1 = !0
    };
    lt.Annotations.Core.AnnPointObject.prototype = {
        get_friendlyName: function () {
            return "Point"
        }, get_supportsFill: function () {
            return !0
        }, get_supportsStroke: function () {
            return !0
        }, _defaultPicture$1: 0, get_defaultPicture: function () {
            return this._defaultPicture$1
        }, set_defaultPicture: function (a) {
            if (this._defaultPicture$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultPicture", 1, this._defaultPicture$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._defaultPicture$1 =
                    a, this.onPropertyChanged(b))
            }
            return a
        }, _picture$1: null, get_picture: function () {
            return this._picture$1
        }, set_picture: function (a) {
            if (this._picture$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Picture", 1, this._picture$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._picture$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, get_centerPoint: function () {
            return this.get_points().get_item(0)
        }, set_centerPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(0),
                    a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("CenterPoint", 1, this.get_points().get_item(0), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(0, a), this.onPropertyChanged(b))
            }
            return a
        }, _radius$1: null, get_radius: function () {
            return this._radius$1
        }, set_radius: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._radius$1, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Radius", 1, this._radius$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._radius$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, _showPicture$1: !1, get_showPicture: function () {
            return this._showPicture$1
        }, set_showPicture: function (a) {
            if (this._showPicture$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowPicture", 1, this._showPicture$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showPicture$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnPointObject
        }, clone: function () {
            var a =
                Type.safeCast(lt.Annotations.Core.AnnPointObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnPointObject);
            null != a && (null != this._picture$1 && (a._picture$1 = this._picture$1.clone()), a._radius$1 = this._radius$1, a._showPicture$1 = this._showPicture$1);
            return a
        }, getBoundingRectangle: function () {
            var a = lt.Annotations.Core._leadRectDExtensions.get_empty();
            if (this._showPicture$1)a = null != this._picture$1 ? lt.Annotations.Core._leadRectDExtensions.create(this.get_centerPoint().get_x() - this.get_picture().get_width() /
                2, this.get_centerPoint().get_y() - this.get_picture().get_height() / 2, this.get_picture().get_width(), this.get_picture().get_height()) : lt.Annotations.Core._leadRectDExtensions.create(0, 0, 0, 0); else var a = this._radius$1.get_value(), b = 2 * a, a = lt.Annotations.Core._leadRectDExtensions.create(this.get_centerPoint().get_x() - a, this.get_centerPoint().get_y() - a, b, b);
            return a
        }, getInvalidateRect: function (a, b) {
            var c = lt.Annotations.Core.AnnPointObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            if (this._showPicture$1) {
                var d =
                    this.get_bounds();
                if (lt.Annotations.Core._leadRectDExtensions.isEmpty(d))return lt.Annotations.Core._leadRectDExtensions.get_empty();
                var d = lt.Annotations.Core._leadSizeDExtensions.create(d.get_width(), d.get_height()), e = lt.Annotations.Core.AnnContainerMapper.createDefault();
                e.updateTransform(a.get_transform());
                d = e.sizeFromContainerCoordinates(d);
                e = this.get_centerPoint();
                e = a.pointFromContainerCoordinates(e, this.get_fixedStateOperations());
                c = lt.Annotations.Core._leadRectDExtensions.unionRects(lt.Annotations.Core._leadRectDExtensions.create(e.get_x() -
                    d.get_width() / 2, e.get_y() - d.get_height() / 2, d.get_width(), d.get_height()), c)
            } else c = lt.Annotations.Core._leadRectDExtensions.unionRects(a.rectFromContainerCoordinates(this.get_bounds(), this.get_fixedStateOperations()), c);
            this.get_supportsStroke() && null != this.get_stroke() && (d = a.strokeFromContainerCoordinates(this.get_stroke(), this.get_fixedStateOperations()), d = Math.max(d.get_strokeThickness().get_value(), 1), c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d + 1, d + 1));
            c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c,
                1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height())));
            return c
        }, _insideGroup$1: !1, get__isGrouped: function () {
            return this._insideGroup$1
        }, set__isGrouped: function (a) {
            return this._insideGroup$1 = a
        }, get_canRotate: function () {
            return this._insideGroup$1
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnPointObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "ShowPicture",
                b, this._showPicture$1);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "Picture", b, this._picture$1);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "Radius", b, this._radius$1)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnPointObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._showPicture$1 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "ShowPicture", b, this._showPicture$1);
            this._picture$1 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "Picture", b);
            this._radius$1 =
                lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "Radius", b, this._radius$1)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype,
        "supportsStroke", {
            get: lt.Annotations.Core.AnnPointObject.prototype.get_supportsStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "defaultPicture", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_defaultPicture,
        set: lt.Annotations.Core.AnnPointObject.prototype.set_defaultPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "picture", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_picture,
        set: lt.Annotations.Core.AnnPointObject.prototype.set_picture, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "centerPoint", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_centerPoint,
        set: lt.Annotations.Core.AnnPointObject.prototype.set_centerPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "radius", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_radius,
        set: lt.Annotations.Core.AnnPointObject.prototype.set_radius,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "showPicture", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_showPicture,
        set: lt.Annotations.Core.AnnPointObject.prototype.set_showPicture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnPointObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnPolylineObject = function () {
        this._fillRule$1 =
            0;
        lt.Annotations.Core.AnnPolylineObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.polylineObjectId);
        this.get_points().clear()
    };
    lt.Annotations.Core.AnnPolylineObject.prototype = {
        get_friendlyName: function () {
            return "Polyline"
        }, get_supportsStroke: function () {
            return !0
        }, get_supportsFill: function () {
            return 2 < this.get_points().get_count()
        }, get__angle: function () {
            return 2 <= this.get_points().get_count() ? lt.Annotations.Core.Utils.findAngle(this.get_points().get_item(0), this.get_points().get_item(1)) :
                0
        }, _isClosed$1: !1, get_isClosed: function () {
            return this._isClosed$1
        }, set_isClosed: function (a) {
            if (this._isClosed$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("IsClosed", 1, this._isClosed$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._isClosed$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, get_fillRule: function () {
            return this._fillRule$1
        }, set_fillRule: function (a) {
            if (this._fillRule$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FillRule", 1, this._fillRule$1,
                    a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fillRule$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnPolylineObject
        }, hitTest: function (a, b) {
            var c = lt.Annotations.Core.AnnPolylineObject.callBaseMethod(this, "hitTest", [a, b]);
            if (c && this.get_hitTestInterior() && lt.Annotations.Core.Utils.hitTestPolygon(this.get_points(), a))return !0;
            if (c)for (var c = !1, d = this.get_points().get_item(0), e = lt.Annotations.Core._leadPointDExtensions.get_empty(), f =
                1; f < this.get_points().get_count() && !c; ++f)e = this.get_points().get_item(f), lt.Annotations.Core.Utils.hitTestLine(d, e, a, b, !1) ? c = !0 : (d = e, this._isClosed$1 && lt.Annotations.Core.Utils.hitTestLine(e, this.get_points().get_item(0), a, b, !1) && (c = !0));
            return c
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnPolylineObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "IsClosed", b, this._isClosed$1);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "FillRule",
                b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnFillRule, this._fillRule$1))
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnPolylineObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._isClosed$1 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "IsClosed", b, this._isClosed$1);
            this._fillRule$1 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnFillRule, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "FillRule", b, this._fillRule$1.toString()))
        }, clone: function () {
            var a =
                Type.safeCast(lt.Annotations.Core.AnnPolylineObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnPolylineObject);
            null != a && (a.set_fillRule(this.get_fillRule()), a.set_isClosed(this.get_isClosed()));
            a.setId(this.get_id());
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPolylineObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnPolylineObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolylineObject.prototype, "supportsStroke",
        {get: lt.Annotations.Core.AnnPolylineObject.prototype.get_supportsStroke, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnPolylineObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnPolylineObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolylineObject.prototype, "isClosed", {
        get: lt.Annotations.Core.AnnPolylineObject.prototype.get_isClosed,
        set: lt.Annotations.Core.AnnPolylineObject.prototype.set_isClosed,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolylineObject.prototype, "fillRule", {
        get: lt.Annotations.Core.AnnPolylineObject.prototype.get_fillRule,
        set: lt.Annotations.Core.AnnPolylineObject.prototype.set_fillRule,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnPolyRulerObject = function () {
        lt.Annotations.Core.AnnPolyRulerObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.polyRulerObjectId);
        this._unitsAbbreviation$2 = {};
        this._measurementUnit$2 = 3;
        this._precision$2 = 2;
        this._showGauge$2 = !1;
        this._showTickMarks$2 = !0;
        this._gaugeLength$2 = lt.Annotations.Core._leadLengthDExtensions.create(360);
        this._tickMarksLength$2 = lt.Annotations.Core._leadLengthDExtensions.create(240);
        this._tickMarksStroke$2 = this.get_stroke();
        this._unitsAbbreviation$2 = lt.Annotations.Core.AnnUnitConverter.getUnits();
        this.get_labels().RulerLength = new lt.Annotations.Core.AnnLabel;
        this.get_labels().RulerLength.set_offsetHeight(!0);
        this.set_fixedStateOperations(20)
    };
    lt.Annotations.Core.AnnPolyRulerObject.prototype =
    {
        get_friendlyName: function () {
            return "Poly Ruler"
        },
        _unitsAbbreviation$2: null,
        _measurementUnit$2: 0,
        _tickMarksLength$2: null,
        _showTickMarks$2: !1,
        _showTickValue$2: !1,
        _gaugeLength$2: null,
        _showGauge$2: !1,
        _calibrationScale$2: 1,
        get_calibrationScale: function () {
            return this._calibrationScale$2
        },
        set_calibrationScale: function (a) {
            return this._calibrationScale$2 = a
        },
        _precision$2: 0,
        _tickMarksStroke$2: null,
        get_tickMarksStroke: function () {
            return this._tickMarksStroke$2
        },
        set_tickMarksStroke: function (a) {
            if (this._tickMarksStroke$2 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TickMarksStroke", 1, this._tickMarksStroke$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._tickMarksStroke$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_measurementUnit: function () {
            return this._measurementUnit$2
        },
        set_measurementUnit: function (a) {
            if (this._measurementUnit$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("MeasurementUnit", 1, this._measurementUnit$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() ||
                (b.set_status(0), this._measurementUnit$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_unitsAbbreviation: function () {
            return this._unitsAbbreviation$2
        },
        get_tickMarksLength: function () {
            return this._tickMarksLength$2
        },
        set_tickMarksLength: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._tickMarksLength$2, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TickMarksLength", 1, this._tickMarksLength$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._tickMarksLength$2 =
                    a, this.onPropertyChanged(b))
            }
            return a
        },
        get_showTickMarks: function () {
            return this._showTickMarks$2
        },
        set_showTickMarks: function (a) {
            if (this._showTickMarks$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowTickMarks", 1, this._showTickMarks$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showTickMarks$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_showTickValue: function () {
            return this._showTickValue$2
        },
        set_showTickValue: function (a) {
            if (this._showTickValue$2 !== a) {
                var b =
                    new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowTickValue", 1, this._showTickValue$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showTickValue$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_gaugeLength: function () {
            return this._gaugeLength$2
        },
        set_gaugeLength: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._gaugeLength$2, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("GaugeLength", 1, this._gaugeLength$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() ||
                (b.set_status(0), this._gaugeLength$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _internalShowTickMarks: function (a) {
            this._showGauge$2 = a
        },
        get_showGauge: function () {
            return this._showGauge$2
        },
        set_showGauge: function (a) {
            if (this._showGauge$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowGauge", 1, this._showGauge$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showGauge$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_precision: function () {
            return this._precision$2
        },
        set_precision: function (a) {
            if (this._precision$2 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Precision", 1, this._precision$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._precision$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        calibrate: function (a, b, c, d) {
            14 === b && (b = 0);
            14 === d && (d = 0);
            a = lt.Annotations.Core.AnnUnitConverter.convert(a.get_value(), b, 0);
            this._calibrationScale$2 = lt.Annotations.Core.AnnUnitConverter.convert(c.get_value(), d, 0) / a
        },
        getRulerLength: function (a) {
            0 >= a && (a = 1);
            0 >= this._calibrationScale$2 && (this._calibrationScale$2 =
                1);
            return lt.Annotations.Core._leadLengthDExtensions.create(lt.Annotations.Core.RulerHelper.getRulerLength(this.get_points().toArray()) * a * this._calibrationScale$2)
        },
        getRulerLengthAsString: function (a) {
            return lt.Annotations.Core.RulerHelper.getLengthString(this.getRulerLength(a), this.get_precision(), this.get_measurementUnit(), this.get_unitsAbbreviation())
        },
        hitTest: function (a, b) {
            var c = lt.Annotations.Core.AnnPolyRulerObject.callBaseMethod(this, "hitTest", [a, b]);
            if (!c)for (var d = 0; d < this.get_points().get_count(); ++d);
            return c
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnPolyRulerObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnPolyRulerObject);
            null != a && (a.set_tickMarksStroke(this.get_tickMarksStroke().clone()), a.set_measurementUnit(this.get_measurementUnit()), a.set_tickMarksLength(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_tickMarksLength())), a.set_showTickMarks(this.get_showTickMarks()), a.set_showTickValue(this.get_showTickValue()), a.set_gaugeLength(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_gaugeLength())),
                a.set_showGauge(this.get_showGauge()), a.set_precision(this.get_precision()), a.set_calibrationScale(this.get_calibrationScale()));
            return a
        },
        serialize: function (a, b, c) {
            lt.Annotations.Core.AnnPolyRulerObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeStrokeElement(c, "TickMarksStroke", b, this._tickMarksStroke$2);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "MeasurementUnit", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit, this._measurementUnit$2));
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "UnitAbbreviation", b, this._unitsAbbreviation$2[this._measurementUnit$2]);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "TickMarksLength", b, this._tickMarksLength$2);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "ShowTickMarks", b, this._showTickMarks$2);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "ShowTickValue", b, this._showTickValue$2);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "GaugeLength", b, this._gaugeLength$2);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "ShowGauge", b, this._showGauge$2);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "Precision", b, this._precision$2);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "CalibrationScale", b, this._calibrationScale$2)
        },
        deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnPolyRulerObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._tickMarksStroke$2 = lt.Annotations.Core.AnnXmlHelper.readStrokeElement(c, "TickMarksStroke", b, this._tickMarksStroke$2);
            a = lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnUnit, this._measurementUnit$2);
            this._measurementUnit$2 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnUnit, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "MeasurementUnit", b, a));
            this._tickMarksLength$2 = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "TickMarksLength", b, this._tickMarksLength$2);
            this._showTickMarks$2 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "ShowTickMarks", b, this._showTickMarks$2);
            this._showTickValue$2 =
                lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "ShowTickValue", b, this._showTickValue$2);
            this._gaugeLength$2 = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "GaugeLength", b, this._gaugeLength$2);
            this._showGauge$2 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "ShowGauge", b, this._showGauge$2);
            this._precision$2 = parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "Precision", b, this._precision$2));
            this._unitsAbbreviation$2[this._measurementUnit$2] = lt.Annotations.Core.AnnXmlHelper.readStringElement(c,
                "UnitAbbreviation", b, this._unitsAbbreviation$2[this._measurementUnit$2]);
            this._calibrationScale$2 = lt.Annotations.Core.AnnXmlHelper.readNumericElement(c, "CalibrationScale", b, this._calibrationScale$2)
        },
        create: function () {
            return new lt.Annotations.Core.AnnPolyRulerObject
        },
        getInvalidateRect: function (a, b) {
            var c = lt.Annotations.Core.AnnPolyRulerObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(c))return c;
            c = lt.Annotations.Core._leadRectDExtensions.unionRects(c,
                a.rectFromContainerCoordinates(this.get_renderedObjectBounds(), 0));
            a.lengthFromContainerCoordinates(this.get_gaugeLength(), this.get_fixedStateOperations());
            for (var d = lt.Annotations.Core._leadRectDExtensions.get_empty(), e = 0; e < this.get_points().get_count() - 1; ++e) {
                var f = this.get_points().get_item(e), g = this.get_points().get_item(e + 1);
                if (this.get_supportsStroke() && null != this.get_stroke()) {
                    f = lt.Annotations.Core.RulerHelper.getGaugePoints(a, f, g, this.get_gaugeLength(), this.get_fixedStateOperations());
                    if (null !=
                        f)for (g = 0; g < f.length; ++g)d = lt.Annotations.Core._leadRectDExtensions.unionPoint(d, f[g]);
                    lt.Annotations.Core._leadRectDExtensions.isEmpty(d) || (f = a.strokeFromContainerCoordinates(this.get_stroke(), this.get_fixedStateOperations()).get_strokeThickness().get_value(), d = lt.Annotations.Core._leadRectDExtensions.inflate(d, f + 1, f + 1))
                }
            }
            var h = b.get_labelRenderer();
            if (Object.keyExists(this.get_labels(), "RulerLength") && null != h && (e = this.get_labels().RulerLength, null != e))(f = lt.Annotations.Core.Utils.getUnitVector(this.get_points().get_item(0),
                this.get_points().get_item(1)), g = this.get_points().get_item(this.get_points().get_count() - 1), 0 > f.get_x() && (f = lt.Annotations.Core.Utils.getUnitVector(this.get_points().get_item(1), this.get_points().get_item(0)), g = this.get_points().get_item(0)), 14 === this.get_measurementUnit()) ? (h = this.getRulerLength(a.get_calibrationScale()), h = a.lengthFromContainerCoordinates(h, 3), e.set_text(String.format("{0} {1}", lt.Annotations.Core.Utils.precisionFormat(this.get_precision(), h), this.get_unitsAbbreviation()[14])),
                e.set_originalPosition(lt.Annotations.Core.Utils.transformPoint(f, a.lengthToContainerCoordinates(e.get_font().get_fontHeight()), g))) : (e.set_text(this.getRulerLengthAsString(a.get_calibrationScale())), e.set_originalPosition(lt.Annotations.Core.Utils.transformPoint(f, a.lengthToContainerCoordinates(e.get_font().get_fontHeight()), g)), null != h.get_renderingEngine() && (e = h.getBounds(a, e, this.get_fixedStateOperations()), c = lt.Annotations.Core._leadRectDExtensions.unionRects(e, c)));
            c = lt.Annotations.Core._leadRectDExtensions.unionRects(d,
                c);
            c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height())));
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "calibrationScale",
        {
            get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_calibrationScale,
            set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_calibrationScale,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "tickMarksStroke", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_tickMarksStroke,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_tickMarksStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype,
        "measurementUnit", {
            get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_measurementUnit,
            set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_measurementUnit,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "unitsAbbreviation", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_unitsAbbreviation,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "tickMarksLength", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_tickMarksLength,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_tickMarksLength, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "showTickMarks", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_showTickMarks,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_showTickMarks,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "showTickValue", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_showTickValue,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_showTickValue, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "gaugeLength", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_gaugeLength,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_gaugeLength,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "showGauge", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_showGauge,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_showGauge, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPolyRulerObject.prototype, "precision", {
        get: lt.Annotations.Core.AnnPolyRulerObject.prototype.get_precision,
        set: lt.Annotations.Core.AnnPolyRulerObject.prototype.set_precision,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnProtractorObject = function () {
        lt.Annotations.Core.AnnProtractorObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.protractorObjectId);
        this._arcRadius$3 = lt.Annotations.Core._leadLengthDExtensions.create(180);
        this._acute$3 = !0;
        this._angularUnitsAbbreviation$3 = {};
        this._internalShowTickMarks(!1);
        this._angularUnit$3 = 1;
        this.get_points().clear();
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this.get_points().add(lt.Annotations.Core._leadPointDExtensions.get_empty());
        this._angularUnitsAbbreviation$3[1] = lt.Annotations.Core.AnnUnitConverter.getAngularUnitAbbreviation(1);
        this._angularUnitsAbbreviation$3[0] = lt.Annotations.Core.AnnUnitConverter.getAngularUnitAbbreviation(0);
        delete this.get_labels().RulerLength;
        this.get_labels().AngleText = new lt.Annotations.Core.AnnLabel;
        this.get_labels().AngleText.set_offsetHeight(!0);
        this.get_labels().FirstRulerLength = new lt.Annotations.Core.AnnLabel;
        this.get_labels().FirstRulerLength.set_offsetHeight(!0);
        this.get_labels().SecondRulerLength = new lt.Annotations.Core.AnnLabel;
        this.get_labels().SecondRulerLength.set_offsetHeight(!0)
    };
    lt.Annotations.Core.AnnProtractorObject.prototype = {
        get_friendlyName: function () {
            return "Protractor"
        },
        _angularUnitsAbbreviation$3: null,
        _acute$3: !1,
        _angularUnit$3: 0,
        _anglePrecision$3: 0,
        _arcRadius$3: null,
        get_supportsFill: function () {
            return !1
        },
        get_centerPoint: function () {
            return this.get_points().get_item(1)
        },
        set_centerPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(1), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("CenterPoint", 1, this.get_points().get_item(1),
                    a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(1, a), this.onPropertyChanged(b))
            }
            return a
        },
        get_firstPoint: function () {
            return this.get_points().get_item(0)
        },
        set_firstPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(0), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FirstPoint", 1, this.get_points().get_item(0), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(0,
                    a), this.onPropertyChanged(b))
            }
            return a
        },
        get_secondPoint: function () {
            return this.get_points().get_item(2)
        },
        set_secondPoint: function (a) {
            if (!lt.Annotations.Core._leadPointDExtensions.isEqual(this.get_points().get_item(2), a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("SecondPoint", 1, this.get_points().get_item(2), a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this.get_points().set_item(2, a), this.onPropertyChanged(b))
            }
            return a
        },
        get_acute: function () {
            return this._acute$3
        },
        set_acute: function (a) {
            if (this._acute$3 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Acute", 1, this._acute$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._acute$3 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_angularUnit: function () {
            return this._angularUnit$3
        },
        set_angularUnit: function (a) {
            if (this._angularUnit$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("AngularUnit", 1, this._angularUnit$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._angularUnit$3 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_angularUnitsAbbreviation: function () {
            return this._angularUnitsAbbreviation$3
        },
        get_anglePrecision: function () {
            return this._anglePrecision$3
        },
        set_anglePrecision: function (a) {
            if (this._anglePrecision$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("AnglePrecision", 1, this._anglePrecision$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._anglePrecision$3 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_arcRadius: function () {
            return this._arcRadius$3
        },
        set_arcRadius: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._arcRadius$3,
                    a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ArcRadius", 1, this._arcRadius$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._arcRadius$3 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _showArc$3: !0,
        get_showArc: function () {
            return this._showArc$3
        },
        set_showArc: function (a) {
            if (this._showArc$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowArc", 1, this._showArc$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showArc$3 = a, this.onPropertyChanged(b))
            }
            return a
        },
        getRulerLengthFromPoints: function (a, b, c) {
            return lt.Annotations.Core._leadLengthDExtensions.create(lt.Annotations.Core.RulerHelper.getRulerLengthFromTwoPoints(a, b) * c)
        },
        getRulerLengthAsStringFromPoints: function (a, b, c) {
            return lt.Annotations.Core.RulerHelper.getLengthString(this.getRulerLengthFromPoints(a, b, c), this.get_precision(), this.get_measurementUnit(), this.get_unitsAbbreviation())
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnProtractorObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnProtractorObject);
            null != a && (a.set_acute(this.get_acute()), a.set_angularUnit(this.get_angularUnit()), a.set_anglePrecision(this.get_anglePrecision()), a.set_arcRadius(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_arcRadius())), a.set_showArc(this.get_showArc()));
            return a
        },
        serialize: function (a, b, c) {
            lt.Annotations.Core.AnnProtractorObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "Acute", b, this._acute$3);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c,
                "AngularUnit", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnAngularUnit, this._angularUnit$3));
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "AngularUnitAbbreviation", b, this._angularUnitsAbbreviation$3[this._angularUnit$3]);
            lt.Annotations.Core.AnnXmlHelper.writeNumericElement(c, "AnglePrecision", b, this._anglePrecision$3);
            lt.Annotations.Core.AnnXmlHelper.writeLengthElement(c, "ArcRadius", b, this._arcRadius$3);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "ShowArc", b,
                this._showArc$3)
        },
        deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnProtractorObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._acute$3 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "Acute", b, this._acute$3);
            this._angularUnit$3 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnAngularUnit, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "AngularUnit", b, this._angularUnit$3.toString()));
            this._anglePrecision$3 = parseInt(lt.Annotations.Core.AnnXmlHelper.readNumericElement(c,
                "AnglePrecision", b, this._anglePrecision$3));
            this._arcRadius$3 = lt.Annotations.Core.AnnXmlHelper.readLengthElement(c, "ArcRadius", b, this._arcRadius$3);
            this._angularUnitsAbbreviation$3[this._angularUnit$3] = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "AngularUnitAbbreviation", b, this._angularUnitsAbbreviation$3[this._angularUnit$3]);
            this._showArc$3 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "ShowArc", b, this._showArc$3)
        },
        create: function () {
            return new lt.Annotations.Core.AnnProtractorObject
        },
        getInvalidateRect: function () {
            return lt.Annotations.Core._leadRectDExtensions.get_empty()
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype,
        "centerPoint", {
            get: lt.Annotations.Core.AnnProtractorObject.prototype.get_centerPoint,
            set: lt.Annotations.Core.AnnProtractorObject.prototype.set_centerPoint,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "firstPoint", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_firstPoint,
        set: lt.Annotations.Core.AnnProtractorObject.prototype.set_firstPoint,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype,
        "secondPoint", {
            get: lt.Annotations.Core.AnnProtractorObject.prototype.get_secondPoint,
            set: lt.Annotations.Core.AnnProtractorObject.prototype.set_secondPoint,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "acute", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_acute,
        set: lt.Annotations.Core.AnnProtractorObject.prototype.set_acute,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "angularUnit",
        {
            get: lt.Annotations.Core.AnnProtractorObject.prototype.get_angularUnit,
            set: lt.Annotations.Core.AnnProtractorObject.prototype.set_angularUnit,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "angularUnitsAbbreviation", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_angularUnitsAbbreviation,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "anglePrecision", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_anglePrecision,
        set: lt.Annotations.Core.AnnProtractorObject.prototype.set_anglePrecision, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "arcRadius", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_arcRadius,
        set: lt.Annotations.Core.AnnProtractorObject.prototype.set_arcRadius,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnProtractorObject.prototype, "showArc", {
        get: lt.Annotations.Core.AnnProtractorObject.prototype.get_showArc,
        set: lt.Annotations.Core.AnnProtractorObject.prototype.set_showArc, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnRectangleObject = function () {
        lt.Annotations.Core.AnnRectangleObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.rectangleObjectId)
    };
    lt.Annotations.Core.AnnRectangleObject.prototype = {
        get_friendlyName: function () {
            return "Rectangle"
        }, get_isFlipped: function () {
            return this.get_points().get_item(0).get_y() > this.get_points().get_item(3).get_y() ? !0 : !1
        }, get_isReversed: function () {
            return this.get_points().get_item(0).get_x() >
            this.get_points().get_item(1).get_x() ? !0 : !1
        }, get_angle: function () {
            return this._getAngle$1()
        }, get_rect: function () {
            return this._calculateRect$1()
        }, set_rect: function (a) {
            this._init$1(a);
            return a
        }, get_supportsFill: function () {
            return !0
        }, get_supportsStroke: function () {
            return !0
        }, _getAngle$1: function () {
            var a = 0;
            3 <= this.get_points().get_count() && (a = this.get_isReversed() ? lt.Annotations.Core.Utils.findAngle(this.get_points().get_item(1), this.get_points().get_item(0)) : lt.Annotations.Core.Utils.findAngle(this.get_points().get_item(0),
                this.get_points().get_item(1)));
            return a
        }, _init$1: function (a) {
            var b = this.get_points();
            b.clear();
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(a))for (a = 0; 4 > a; a++)b.add(lt.Annotations.Core._leadPointDExtensions.get_empty()); else b.add(lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y())), b.add(lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y())), b.add(lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height())),
                b.add(lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y() + a.get_height()))
        }, _calculateRect$1: function () {
            var a = lt.Annotations.Core._leadRectDExtensions.get_empty();
            if (3 <= this.get_points().get_count()) {
                var b = this.get_points().toArray(), c = this._getAngle$1(), a = Array(2);
                a[0] = lt.Annotations.Core._leadPointDExtensions.create(b[0].get_x(), b[0].get_y());
                a[1] = lt.Annotations.Core._leadPointDExtensions.create(b[2].get_x(), b[2].get_y());
                var b = lt.Annotations.Core._leadPointDExtensions.create((a[0].get_x() +
                    a[1].get_x()) / 2, (a[0].get_y() + a[1].get_y()) / 2), a = lt.Annotations.Core.AnnTransformer.rotateAtPoints(a, -c, b.get_x(), b.get_y()), c = Math.min(a[0].get_x(), a[1].get_x()), b = Math.min(a[0].get_y(), a[1].get_y()), d = Math.max(a[0].get_x(), a[1].get_x()), a = Math.max(a[0].get_y(), a[1].get_y()), a = lt.Annotations.Core.AnnDouble.isNaN(c) || lt.Annotations.Core.AnnDouble.isNaN(b) || lt.Annotations.Core.AnnDouble.isNaN(d) || lt.Annotations.Core.AnnDouble.isNaN(a) ? lt.Annotations.Core._leadRectDExtensions.get_empty() : lt.Annotations.Core._leadRectDExtensions.create(c,
                    b, d - c, a - b)
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnRectangleObject
        }, hitTest: function (a, b) {
            var c = lt.Annotations.Core.AnnRectangleObject.callBaseMethod(this, "hitTest", [a, b]);
            if (c && this.get_hitTestInterior() && lt.Annotations.Core.Utils.hitTestPolygon(this.get_points(), a))return !0;
            if (c)for (var c = !1, d = 0; 4 > d && !c; ++d)lt.Annotations.Core.Utils.hitTestLine(this.get_points().get_item(d), this.get_points().get_item((d + 1) % 4), a, b, !1) && (c = !0);
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype,
        "friendlyName", {
            get: lt.Annotations.Core.AnnRectangleObject.prototype.get_friendlyName,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype, "isFlipped", {
        get: lt.Annotations.Core.AnnRectangleObject.prototype.get_isFlipped,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype, "isReversed", {
        get: lt.Annotations.Core.AnnRectangleObject.prototype.get_isReversed,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype,
        "angle", {get: lt.Annotations.Core.AnnRectangleObject.prototype.get_angle, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype, "rect", {
        get: lt.Annotations.Core.AnnRectangleObject.prototype.get_rect,
        set: lt.Annotations.Core.AnnRectangleObject.prototype.set_rect,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnRectangleObject.prototype.get_supportsFill, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRectangleObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnRectangleObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnRedactionObject = function () {
        this._realizedRect$2 = lt.Annotations.Core._leadRectDExtensions.create(0, 0, 0, 0);
        lt.Annotations.Core.AnnRedactionObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.redactionObjectId)
    };
    lt.Annotations.Core.AnnRedactionObject.prototype =
    {
        get_friendlyName: function () {
            return "Redaction"
        }, get_supportsStroke: function () {
        return !1
    }, get_supportsOpacity: function () {
        return !1
    }, get_canRotate: function () {
        return !1
    }, create: function () {
        return new lt.Annotations.Core.AnnRedactionObject
    }, clone: function () {
        var a = Type.safeCast(lt.Annotations.Core.AnnRedactionObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnRedactionObject);
        a.set_imageData(this._imageData$2);
        return a
    }, _imageData$2: null, get_imageData: function () {
        return this._imageData$2
    }, set_imageData: function (a) {
        return this._imageData$2 =
            a
    }, _isRealized$2: !1, get_isRealized: function () {
        return this._isRealized$2
    }, get_canRestore: function () {
        return this._isRealized$2 ? lt.Annotations.Core.Utils.isEqual(this._realizedRect$2.get_width(), this.get_rect().get_width()) && lt.Annotations.Core.Utils.isEqual(this._realizedRect$2.get_height(), this.get_rect().get_height()) && null != this._imageData$2 && !this.get_isLocked() : null != this._imageData$2 && !this.get_isLocked()
    }, realize: function (a, b) {
        null == b && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("provider");
        if (!this.get_isLocked()) {
            this._realizedRect$2 = this.get_rect();
            var c = b.get_mapper(), c = new lt.Annotations.Core.AnnContainerMapper(c.get_sourceDpiX(), c.get_sourceDpiY(), c.get_sourceDpiX(), c.get_sourceDpiY()), d = lt.Annotations.Core._leadRectDExtensions.clone(this._realizedRect$2), d = c.rectFromContainerCoordinates(this.get_rect(), this.get_fixedStateOperations());
            this._imageData$2 = a.getImageData(b, d);
            a.fill(b, d, "black");
            this._isRealized$2 = !0
        }
    }, restore: function (a, b) {
        null == b && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("provider");
        if (!this.get_isLocked()) {
            var c = b.get_mapper(), c = new lt.Annotations.Core.AnnContainerMapper(c.get_sourceDpiX(), c.get_sourceDpiY(), c.get_sourceDpiX(), c.get_sourceDpiY());
            this.get_canRestore() && (c = c.rectFromContainerCoordinates(this.get_rect(), this.get_fixedStateOperations()), a.setImageData(b, c, this._imageData$2), this._imageData$2 =
                null, this._isRealized$2 = !1)
        }
    }, serialize: function (a, b, c) {
        lt.Annotations.Core.AnnRedactionObject.callBaseMethod(this, "serialize", [a, b, c]);
        null != this._imageData$2 && lt.Annotations.Core.AnnXmlHelper.writeDataElement(c, "RedactImageData", b, this._imageData$2)
    }, deserialize: function (a, b, c) {
        lt.Annotations.Core.AnnRedactionObject.callBaseMethod(this, "deserialize", [a, b, c]);
        this._imageData$2 = lt.Annotations.Core.AnnXmlHelper.readDataElement(c, "RedactImageData", b);
        this._realizedRect$2 = this.get_rect()
    }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype,
        "friendlyName", {
            get: lt.Annotations.Core.AnnRedactionObject.prototype.get_friendlyName,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnRedactionObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype, "supportsOpacity", {
        get: lt.Annotations.Core.AnnRedactionObject.prototype.get_supportsOpacity,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnRedactionObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype, "imageData", {
        get: lt.Annotations.Core.AnnRedactionObject.prototype.get_imageData,
        set: lt.Annotations.Core.AnnRedactionObject.prototype.set_imageData,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype,
        "isRealized", {
            get: lt.Annotations.Core.AnnRedactionObject.prototype.get_isRealized,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRedactionObject.prototype, "canRestore", {
        get: lt.Annotations.Core.AnnRedactionObject.prototype.get_canRestore,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnRubberStampObject = function () {
        lt.Annotations.Core.AnnRubberStampObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.rubberStampObjectId);
        this._rubberStampType$2 = 1
    };
    lt.Annotations.Core.AnnRubberStampObject.prototype = {
        get_friendlyName: function () {
            return "Rubber Stamp"
        }, get_supportsFill: function () {
            return !1
        }, get_supportsStroke: function () {
            return !1
        }, _rubberStampType$2: 0, get_rubberStampType: function () {
            return this._rubberStampType$2
        }, set_rubberStampType: function (a) {
            if (this._rubberStampType$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("RubberStampType", 1, this._rubberStampType$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._rubberStampType$2 =
                    a, this.onPropertyChanged(b))
            }
            return a
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnRubberStampObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnRubberStampObject);
            null != a && a.set_rubberStampType(this.get_rubberStampType());
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnRubberStampObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "RubberStampType", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnRubberStampType,
                this._rubberStampType$2))
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnRubberStampObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._rubberStampType$2 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnRubberStampType, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "RubberStampType", b, this._rubberStampType$2.toString()))
        }, create: function () {
            return new lt.Annotations.Core.AnnRubberStampObject
        }, get_hitTestInterior: function () {
            return !0
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRubberStampObject.prototype,
        "friendlyName", {
            get: lt.Annotations.Core.AnnRubberStampObject.prototype.get_friendlyName,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRubberStampObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnRubberStampObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRubberStampObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnRubberStampObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRubberStampObject.prototype, "rubberStampType", {
        get: lt.Annotations.Core.AnnRubberStampObject.prototype.get_rubberStampType,
        set: lt.Annotations.Core.AnnRubberStampObject.prototype.set_rubberStampType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRubberStampObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnRubberStampObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnSelectionObject =
        function () {
            this._selectedObjects$2 = new lt.Annotations.Core.AnnObjectCollection;
            this._oldInvalidateRect$2 = lt.Annotations.Core._leadRectDExtensions.get_empty();
            lt.Annotations.Core.AnnSelectionObject.initializeBase(this);
            this.setId(lt.Annotations.Core.AnnObject.selectObjectId);
            this._container$2 = Type.safeCast(this.get_parent(), lt.Annotations.Core.AnnContainer);
            this._selectedObjects$2 = new lt.Annotations.Core.AnnObjectCollection;
            this._rect$2 = lt.Annotations.Core._leadRectDExtensions.get_empty();
            var a = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("darkgreen"),
                lt.Annotations.Core._leadLengthDExtensions.create(1));
            a.set_strokeDashArray([4, 2, 2, 2, 2, 2]);
            this.set_selectionStroke(a);
            this._selectedObjects$2.add_collectionChanged(ss.Delegate.create(this, this._selectedObjects_CollectionChanged$2))
        };
    lt.Annotations.Core.AnnSelectionObject.prototype = {
        _alignmentTarget$2: null, get_alignmentTarget: function () {
            return this._alignmentTarget$2
        }, set_alignmentTarget: function (a) {
            return this._alignmentTarget$2 = a
        }, _selectionOpacity$2: 1, get_selectionOpacity: function () {
            return this._selectionOpacity$2
        },
        set_selectionOpacity: function (a) {
            (lt.LeadDoubleTools.lessThan(a, 0) || lt.LeadDoubleTools.greaterThan(a, 1)) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("SelectionOpacity", a, "Must be a value greater than or equals to 0 and less than or equals to 1");
            this._selectionOpacity$2 = this.get_supportsOpacity() ? a : 1;
            return a
        }, get_supportsContent: function () {
            return !1
        }, get_friendlyName: function () {
            return "Select"
        }, _rect$2: null, _container$2: null, get_selectedObjects: function () {
            return this._selectedObjects$2
        },
        adjustBounds: function () {
            this._rect$2 = lt.Annotations.Core._leadRectDExtensions.clone(this.get_rect());
            var a = this._alignmentTarget$2, b = null == this._alignmentTarget$2 ? !1 : this._alignmentTarget$2.get_isAlignmentTarget();
            this._calculateRect$2();
            0 < this._selectedObjects$2.get_count() && this._selectedObjects$2.clear();
            this._hitTestRect$2(this._rect$2);
            var c = lt.Annotations.Core._leadRectDExtensions.get_empty();
            if (0 < this.get_selectedObjects().get_count()) {
                for (var c = this.get_selectedObjects().get_item(0).get_bounds(),
                         d = 1; d < this.get_selectedObjects().get_count(); d++)c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, this.get_selectedObjects().get_item(d).get_bounds());
                null != a && (this._alignmentTarget$2 = a, this._alignmentTarget$2.set_isAlignmentTarget(b))
            }
            this.set_rect(lt.Annotations.Core._leadRectDExtensions.clone(c));
            this.set_rotateCenter(lt.Annotations.Core._leadPointDExtensions.get_empty())
        }, group: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); b.moveNext();) {
                var c = b.current;
                c.set_groupName(a);
                c = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                null != c && c.group(a)
            }
        }, ungroup: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); b.moveNext();) {
                var c = b.current;
                String.compare(c.get_groupName(), a) || c.set_groupName("")
            }
        }, lock: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); b.moveNext();) {
                var c = b.current;
                c.get_isLocked() || c.lock(a)
            }
        }, unlock: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); b.moveNext();) {
                var c =
                    b.current;
                c.get_isLocked() && c.unlock(a)
            }
        }, get_supportsFill: function () {
            return !1
        }, _selectedObjects_CollectionChanged$2: function (a, b) {
            if (b.get_action())if (1 === b.get_action())d = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject), d.set_isSelected(!1), d.set_parent(this.get_parent()), d.get_isAlignmentTarget() && (d.set_isAlignmentTarget(!1), 1 < this._selectedObjects$2.get_count() && (this._alignmentTarget$2 = this._selectedObjects$2.get_item(this._selectedObjects$2.get_count() - 1), this._alignmentTarget$2.set_isAlignmentTarget(!0))),
                d = Type.safeCast(d, lt.Annotations.Core.AnnPointObject), null != d && d.set__isGrouped(!1), this._calculateRect$2(); else {
                if (4 === b.get_action()) {
                    for (var c = ss.IEnumerator.getEnumerator(b.get_newItems()); c.moveNext();)d = c.current, d.set_parent(this.get_parent()), d.set_isSelected(!1), d.set_isAlignmentTarget(!1), this._alignmentTarget$2 = null, d = Type.safeCast(d, lt.Annotations.Core.AnnPointObject), null != d && d.set__isGrouped(!1);
                    this.set_rect(lt.LeadRectD.create(0, 0, 0, 0))
                }
            } else {
                var d = Type.safeCast(b.get_newItems()[0],
                    lt.Annotations.Core.AnnObject);
                d.set_isSelected(!1);
                d.set_parent(this);
                if (null != this._selectedObjects$2 && 1 < this._selectedObjects$2.get_count())for (c = ss.IEnumerator.getEnumerator(this._selectedObjects$2); c.moveNext();)if (d = c.current, d.get_id() === lt.Annotations.Core.AnnObject.pointObjectId || d.get_id() === lt.Annotations.Core.AnnObject.stickyNoteObjectId)d = Type.safeCast(d, lt.Annotations.Core.AnnPointObject), null != d && d.set__isGrouped(!0);
                this._calculateRect$2()
            }
        }, _hitTestRect$2: function (a) {
            this._container$2 =
                Type.safeCast(this.get_parent(), lt.Annotations.Core.AnnContainer);
            if (null != this._container$2) {
                var b = null, b = !a.get_width() || !a.get_height() ? this._container$2.hitTestPoint(lt.Annotations.Core._leadPointDExtensions.create(this.get_rect().get_x(), this.get_rect().get_y())) : this._container$2.hitTestRect(a);
                if (null != b && 0 < b.length)for (a = ss.IEnumerator.getEnumerator(b); a.moveNext();)b = a.current, b !== this && b.get_isVisible() && (!b.get_isLocked() || !String.isNullOrEmpty(b.get_groupName())) && this._selectedObjects$2.add(b)
            }
        },
        get_canRotate: function () {
            for (var a = !1, b = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); b.moveNext();)if (b.current.get_canRotate()) {
                a = !0;
                break
            }
            return a
        }, rotate: function (a, b) {
            lt.Annotations.Core.AnnSelectionObject.callBaseMethod(this, "rotate", [a, b]);
            for (var c = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); c.moveNext();) {
                var d = c.current;
                d.get_isLocked() || d.rotate(a, b)
            }
        }, scale: function (a, b, c) {
            lt.Annotations.Core.AnnSelectionObject.callBaseMethod(this, "scale", [a, b, c]);
            for (var d = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); d.moveNext();) {
                var e =
                    d.current, f = !e.get_isLocked();
                if (f) {
                    var g = Type.safeCast(e, lt.Annotations.Core.AnnTextReviewObject);
                    null != g && (f = g.get_canScale())
                }
                f && e.scale(a, b, c)
            }
        }, translate: function (a, b) {
            for (var c = !0, d = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); d.moveNext();) {
                var e = d.current, f = !e.get_isLocked();
                if (f) {
                    var g = Type.safeCast(e, lt.Annotations.Core.AnnTextReviewObject);
                    null != g && (f = g.get_canTranslate())
                }
                f && (c = !1, e.translate(a, b), e.set_renderedObjectBounds(lt.Annotations.Core._leadRectDExtensions.unionRects(e.get_renderedObjectBounds(),
                    e.get_bounds())))
            }
            c || lt.Annotations.Core.AnnSelectionObject.callBaseMethod(this, "translate", [a, b])
        }, create: function () {
            return new lt.Annotations.Core.AnnSelectionObject
        }, clone: function () {
            return Type.safeCast(lt.Annotations.Core.AnnSelectionObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnSelectionObject)
        }, get_hitTestInterior: function () {
            return !0
        }, applyProperties: function () {
            for (var a = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); a.moveNext();) {
                var b = a.current;
                b.set_hyperlink(this.get_hyperlink());
                b.set_fixedStateOperations(b.get_fixedStateOperations() | this.get_fixedStateOperations());
                b.get_labels().AnnObjectName = this.get_labels().AnnObjectName.clone();
                b.set_opacity(this.get_opacity());
                null != this.get_stroke() && b.set_stroke(this.get_stroke().clone());
                null != this.get_fill() && b.set_fill(this.get_fill().clone())
            }
        }, getInvalidateRect: function (a, b) {
            for (var c = lt.Annotations.Core._leadRectDExtensions.get_empty(), d = ss.IEnumerator.getEnumerator(this.get_selectedObjects()); d.moveNext();) {
                var e = d.current.getInvalidateRect(a,
                    b);
                if (lt.Annotations.Core._leadRectDExtensions.isEmpty(e))return e;
                c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, e)
            }
            d = lt.Annotations.Core.AnnSelectionObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            d = lt.Annotations.Core._leadRectDExtensions.unionRects(d, c);
            this._isNaN$2(this._oldInvalidateRect$2) || (d = lt.Annotations.Core._leadRectDExtensions.unionRects(d, this._oldInvalidateRect$2));
            this._oldInvalidateRect$2 = lt.Annotations.Core._leadRectDExtensions.clone(d);
            return d
        }, _isNaN$2: function () {
            return !1
        },
        _calculateRect$2: function () {
            if (0 < this._selectedObjects$2.get_count()) {
                if (1 < this._selectedObjects$2.get_count()) {
                    this._rect$2 = lt.Annotations.Core._leadRectDExtensions.clone(this._selectedObjects$2.get_item(0).get_bounds());
                    for (var a = 1; a < this._selectedObjects$2.get_count(); a++)this._rect$2 = lt.Annotations.Core._leadRectDExtensions.unionRects(this._rect$2, this._selectedObjects$2.get_item(a).get_bounds())
                }
                this.set_rect(lt.Annotations.Core._leadRectDExtensions.clone(this._rect$2))
            } else this.set_rect(lt.Annotations.Core._leadRectDExtensions.get_empty())
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "alignmentTarget", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_alignmentTarget,
        set: lt.Annotations.Core.AnnSelectionObject.prototype.set_alignmentTarget,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "selectionOpacity", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_selectionOpacity,
        set: lt.Annotations.Core.AnnSelectionObject.prototype.set_selectionOpacity,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "supportsContent", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_supportsContent,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "selectedObjects",
        {get: lt.Annotations.Core.AnnSelectionObject.prototype.get_selectedObjects, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnSelectionObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSelectionObject.prototype,
        "hitTestInterior", {
            get: lt.Annotations.Core.AnnSelectionObject.prototype.get_hitTestInterior,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnStampObject = function () {
        this._pictureSizeMode$3 = 1;
        lt.Annotations.Core.AnnStampObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.stampObjectId);
        this.set_horizontalAlignment(1);
        this.set_verticalAlignment(1);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("yellow"))
    };
    lt.Annotations.Core.AnnStampObject.prototype = {
        get_friendlyName: function () {
            return "Stamp"
        },
        _drawShadow$3: !1, get_drawShadow: function () {
            return this._drawShadow$3
        }, set_drawShadow: function (a) {
            if (this._drawShadow$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DrawShadow", 1, this._drawShadow$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._drawShadow$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, get_pictureSizeMode: function () {
            return this._pictureSizeMode$3
        }, set_pictureSizeMode: function (a) {
            if (this._pictureSizeMode$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("PictureSizeMode",
                    1, this._pictureSizeMode$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._pictureSizeMode$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, _picture$3: null, get_picture: function () {
            return this._picture$3
        }, set_picture: function (a) {
            if (this._picture$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Picture", 1, this._picture$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._picture$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnStampObject
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnStampObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnStampObject);
            null != a && (null != this._picture$3 && (a.set_picture(this._picture$3.clone()), a.set_pictureSizeMode(this._pictureSizeMode$3)), a.set_drawShadow(this._drawShadow$3));
            return a
        }, get_hitTestInterior: function () {
            return lt.Annotations.Core.AnnStampObject.callBaseMethod(this, "get_hitTestInterior") && (null != this.get_picture() || null != this.get_fill())
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnStampObject.callBaseMethod(this,
                "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "Picture", b, this._picture$3);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "DrawShadow", b, this._drawShadow$3)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnStampObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._picture$3 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "Picture", b);
            this._drawShadow$3 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "DrawShadow", b, !1)
        }, getInvalidateRect: function (a,
                                        b) {
            var c = lt.Annotations.Core.AnnStampObject.callBaseMethod(this, "getInvalidateRect", [a, b]);
            if (this._drawShadow$3) {
                var d = a.lengthFromContainerCoordinates(lt.Annotations.Core._leadLengthDExtensions.create(30), 2);
                lt.Annotations.Core._leadRectDExtensions.isEmpty(c) || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d, d));
                c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()),
                    parseInt(c.get_height())))
            }
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnStampObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnStampObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStampObject.prototype, "drawShadow", {
        get: lt.Annotations.Core.AnnStampObject.prototype.get_drawShadow,
        set: lt.Annotations.Core.AnnStampObject.prototype.set_drawShadow,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStampObject.prototype,
        "pictureSizeMode", {
            get: lt.Annotations.Core.AnnStampObject.prototype.get_pictureSizeMode,
            set: lt.Annotations.Core.AnnStampObject.prototype.set_pictureSizeMode,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnStampObject.prototype, "picture", {
        get: lt.Annotations.Core.AnnStampObject.prototype.get_picture,
        set: lt.Annotations.Core.AnnStampObject.prototype.set_picture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStampObject.prototype, "hitTestInterior",
        {get: lt.Annotations.Core.AnnStampObject.prototype.get_hitTestInterior, enumerable: !0, configurable: !0});
    lt.Annotations.Core.AnnStickyNoteObject = function () {
        lt.Annotations.Core.AnnStickyNoteObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.stickyNoteObjectId)
    };
    lt.Annotations.Core.AnnStickyNoteObject.prototype = {
        get_supportsStroke: function () {
            return !1
        }, get_supportsSelectionStroke: function () {
            return !0
        }, get_supportsFill: function () {
            return !1
        }, get_supportsFont: function () {
            return !1
        }, get_canRotate: function () {
            return !1
        },
        get_friendlyName: function () {
            return "Sticky Note"
        }, get_hitTestInterior: function () {
            return !0
        }, _picture$1: null, get_picture: function () {
            return this._picture$1
        }, set_picture: function (a) {
            if (this._picture$1 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Picture", 1, this._picture$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._picture$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, _defaultPicture$1: 8, get_defaultPicture: function () {
            return this._defaultPicture$1
        }, set_defaultPicture: function (a) {
            if (this._defaultPicture$1 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("DefaultPicture", 1, this._defaultPicture$1, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._defaultPicture$1 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnStickyNoteObject
        }, scale: function () {
        }, scaleVector: function () {
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnStickyNoteObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnStickyNoteObject);
            null != a && (null !=
            this._picture$1 && (a._picture$1 = this._picture$1.clone()), a.set_defaultPicture(this._defaultPicture$1));
            return a
        }, getBoundingRectangle: function () {
            var a = lt.Annotations.Core._leadRectDExtensions.get_empty(), b = lt.Annotations.Core._leadPointDExtensions.get_empty();
            0 < this.get_points().get_count() && (b = this.get_points().get_item(0), a = this.get_picture(), a = null != a ? lt.Annotations.Core._leadRectDExtensions.create(b.get_x() - a.get_width() / 2, b.get_y() - a.get_height() / 2, a.get_width(), a.get_height()) : lt.Annotations.Core._leadRectDExtensions.create(b.get_x(),
                b.get_y(), 1, 1));
            return a
        }, getInvalidateRect: function (a, b) {
            var c = lt.Annotations.Core.AnnStickyNoteObject.callBaseMethod(this, "getInvalidateRect", [a, b]), d = this.get_bounds();
            if (lt.Annotations.Core._leadRectDExtensions.isEmpty(d))return lt.Annotations.Core._leadRectDExtensions.get_empty();
            var d = lt.Annotations.Core._leadSizeDExtensions.create(d.get_width(), d.get_height()), e = lt.Annotations.Core.AnnContainerMapper.createDefault();
            e.updateTransform(a.get_transform());
            d = e.sizeFromContainerCoordinates(d);
            e =
                this.get_points().get_item(0);
            e = a.pointFromContainerCoordinates(e, this.get_fixedStateOperations());
            c = lt.Annotations.Core._leadRectDExtensions.unionRects(lt.Annotations.Core._leadRectDExtensions.create(e.get_x() - d.get_width() / 2, e.get_y() - d.get_height() / 2, d.get_width(), d.get_height()), c);
            this.get_supportsStroke() && null != this.get_stroke() && (d = a.strokeFromContainerCoordinates(this.get_stroke(), this.get_fixedStateOperations()), d = Math.max(d.get_strokeThickness().get_value(), 1), c = lt.Annotations.Core._leadRectDExtensions.inflate(c,
                d + 1, d + 1));
            this.get_supportsSelectionStroke() && null != this.get_selectionStroke() && (d = a.strokeFromContainerCoordinates(this.get_selectionStroke(), this.get_fixedStateOperations()), d = d.get_strokeThickness().get_value(), c = lt.Annotations.Core._leadRectDExtensions.inflate(c, d + 1, d + 1));
            c.get_isEmpty() || (c = lt.Annotations.Core._leadRectDExtensions.inflate(c, 1, 1), c = lt.Annotations.Core._leadRectDExtensions.create(parseInt(c.get_x()), parseInt(c.get_y()), parseInt(c.get_width()), parseInt(c.get_height())));
            return c
        },
        serialize: function (a, b, c) {
            lt.Annotations.Core.AnnStickyNoteObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writePictureElement(c, "Picture", b, this._picture$1)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnStickyNoteObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._picture$1 = lt.Annotations.Core.AnnXmlHelper.readPictureElement(c, "Picture", b);
            this.set_isSelected(!1)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "supportsStroke",
        {get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_supportsStroke, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "supportsSelectionStroke", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_supportsSelectionStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "supportsFont", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_supportsFont,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_friendlyName,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype, "picture", {
        get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_picture,
        set: lt.Annotations.Core.AnnStickyNoteObject.prototype.set_picture,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStickyNoteObject.prototype,
        "defaultPicture", {
            get: lt.Annotations.Core.AnnStickyNoteObject.prototype.get_defaultPicture,
            set: lt.Annotations.Core.AnnStickyNoteObject.prototype.set_defaultPicture,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnTextHiliteObject = function () {
        lt.Annotations.Core.AnnTextHiliteObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textHiliteObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Yellow"));
        this.set_opacity(0.5)
    };
    lt.Annotations.Core.AnnTextHiliteObject.prototype =
    {
        create: function () {
            return new lt.Annotations.Core.AnnTextHiliteObject
        }, clone: function () {
        var a = Type.safeCast(lt.Annotations.Core.AnnTextHiliteObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextHiliteObject);
        a.set_fill(null != this.get_fill() ? this.get_fill().clone() : null);
        return a
    }, get_friendlyName: function () {
        return "Text Hilite"
    }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextHiliteObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextHiliteObject.prototype.get_friendlyName, enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTextObject = function () {
        this._textSize$2 = lt.Annotations.Core._leadSizeDExtensions.get_empty();
        lt.Annotations.Core.AnnTextObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Transparent"));
        this._text$2 = "LEADTOOLS";
        this._verticalAlignment$2 = this._textRotate$2 = this._horizontalAlignment$2 = 0;
        this._textBackground$2 = lt.Annotations.Core.AnnSolidColorBrush.create("Transparent");
        this._textForeground$2 = lt.Annotations.Core.AnnSolidColorBrush.create("red");
        this._padding$2 = new lt.Annotations.Core.AnnThickness(0, 0, 0, 0)
    };
    lt.Annotations.Core.AnnTextObject.prototype = {
        get_friendlyName: function () {
            return "Text"
        },
        _text$2: null,
        _horizontalAlignment$2: 0,
        _textRotate$2: 0,
        _verticalAlignment$2: 0,
        _textBackground$2: null,
        _textForeground$2: null,
        _padding$2: null,
        get_supportsFont: function () {
            return !0
        },
        get_supportsFill: function () {
            return !0
        },
        get_supportsContent: function () {
            return !1
        },
        get_text: function () {
            return this._text$2
        },
        set_text: function (a) {
            if (this._text$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Text", 1, this._text$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._text$2 = a, this._isTextDirty$2 = !0, this.onPropertyChanged(b))
            }
            return a
        },
        get_textRotate: function () {
            return this._textRotate$2
        },
        set_textRotate: function (a) {
            if (this._textRotate$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TextRotate", 1, this._textRotate$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() ||
                (b.set_status(0), this._textRotate$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_horizontalAlignment: function () {
            return this._horizontalAlignment$2
        },
        set_horizontalAlignment: function (a) {
            if (this._horizontalAlignment$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("HorizontalAlignment", 1, this._horizontalAlignment$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._horizontalAlignment$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_verticalAlignment: function () {
            return this._verticalAlignment$2
        },
        set_verticalAlignment: function (a) {
            if (this._verticalAlignment$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("VerticalAlignment", 1, this._verticalAlignment$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._verticalAlignment$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_textBackground: function () {
            return this._textBackground$2
        },
        set_textBackground: function (a) {
            if (this._textBackground$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TextBackground", 1,
                    this._textBackground$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._textBackground$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_textForeground: function () {
            return this._textForeground$2
        },
        set_textForeground: function (a) {
            if (this._textForeground$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TextForeground", 1, this._textForeground$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._textForeground$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_padding: function () {
            return this._padding$2
        },
        set_padding: function (a) {
            if (this._padding$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Padding", 1, this._padding$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._padding$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextObject);
            null != a && (a.set_text(this.get_text()), a.set_textRotate(this.get_textRotate()), a.set_horizontalAlignment(this.get_horizontalAlignment()),
                a.set_verticalAlignment(this.get_verticalAlignment()), a.set_wordWrap(this.get_wordWrap()), null != this.get_textBackground() && a.set_textBackground(this.get_textBackground().clone()), null != this.get_textForeground() && a.set_textForeground(this.get_textForeground().clone()), a.set_padding(this.get_padding().clone()));
            return a
        },
        serialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "Text", b, this._text$2);
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c,
                "TextRotate", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnTextRotate, this._textRotate$2));
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "HorizontalAlignment", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnHorizontalAlignment, this._horizontalAlignment$2));
            lt.Annotations.Core.AnnXmlHelper.writeStringElement(c, "VerticalAlignment", b, lt.Annotations.Core.Utils.enumToString(lt.Annotations.Core.AnnVerticalAlignment, this._verticalAlignment$2));
            lt.Annotations.Core.AnnXmlHelper.writeBrushElement(c,
                "Background", b, this._textBackground$2);
            lt.Annotations.Core.AnnXmlHelper.writeBrushElement(c, "Foreground", b, this._textForeground$2);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "WordWrap", b, this._wordWrap$2);
            lt.Annotations.Core.AnnXmlHelper.writeThicknessElement(c, "Padding", b, this._padding$2)
        },
        deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._text$2 = lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "Text", b, "");
            this._textRotate$2 =
                lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnTextRotate, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "TextRotate", b, this._textRotate$2.toString()));
            this._horizontalAlignment$2 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnHorizontalAlignment, lt.Annotations.Core.AnnXmlHelper.readStringElement(c, "HorizontalAlignment", b, this._horizontalAlignment$2.toString()));
            this._verticalAlignment$2 = lt.Annotations.Core.Utils.enumParse(lt.Annotations.Core.AnnVerticalAlignment, lt.Annotations.Core.AnnXmlHelper.readStringElement(c,
                "VerticalAlignment", b, this._verticalAlignment$2.toString()));
            this._textBackground$2 = lt.Annotations.Core.AnnXmlHelper.readBrushElement(c, "Background", b, this._textBackground$2);
            this._textForeground$2 = lt.Annotations.Core.AnnXmlHelper.readBrushElement(c, "Foreground", b, this._textForeground$2);
            this._wordWrap$2 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "WordWrap", b, this._wordWrap$2);
            this._padding$2 = lt.Annotations.Core.AnnXmlHelper.readThicknessElement(c, "Padding", b, this._padding$2)
        },
        create: function () {
            return new lt.Annotations.Core.AnnTextObject
        },
        _wordWrap$2: !0,
        get_wordWrap: function () {
            return this._wordWrap$2
        },
        set_wordWrap: function (a) {
            if (this._wordWrap$2 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("WordWrap", 1, this._wordWrap$2, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._wordWrap$2 = a, this.onPropertyChanged(b))
            }
            return a
        },
        _isTextDirty$2: !1,
        get__isTextDirty: function () {
            return this._isTextDirty$2
        },
        set__isTextDirty: function (a) {
            return this._isTextDirty$2 = a
        },
        _internalData$2: null,
        get__internalData: function () {
            return this._internalData$2
        },
        set__internalData: function (a) {
            return this._internalData$2 = a
        },
        get_textSize: function () {
            return this._textSize$2
        },
        set_textSize: function (a) {
            return this._textSize$2 = a
        },
        autoSize: function () {
            if (!this.get_isLocked() && !lt.Annotations.Core._leadSizeDExtensions.isEmpty(this._textSize$2)) {
                var a = this.get_rect(), b = this.get_angle(), c = this.get_isFlipped(), d = this.get_isReversed();
                3 === this.get_textRotate() || 1 === this.get_textRotate() ? this.set_rect(lt.Annotations.Core._leadRectDExtensions.create(a.get_x(), a.get_y(), this._textSize$2.get_height(),
                    this._textSize$2.get_width())) : this.set_rect(lt.Annotations.Core._leadRectDExtensions.create(a.get_x(), a.get_y(), this._textSize$2.get_width(), this._textSize$2.get_height()));
                this.rotate(b, this.get_rotateCenter());
                a = this.get_bounds();
                a = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width() / 2, a.get_y() + a.get_height() / 2);
                c && this.scale(1, -1, a);
                d && this.scale(-1, 1, a)
            }
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_friendlyName,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "supportsFont", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_supportsFont,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "supportsContent", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_supportsContent,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "text", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_text,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_text,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "textRotate", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_textRotate,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_textRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype,
        "horizontalAlignment", {
            get: lt.Annotations.Core.AnnTextObject.prototype.get_horizontalAlignment,
            set: lt.Annotations.Core.AnnTextObject.prototype.set_horizontalAlignment,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "verticalAlignment", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_verticalAlignment,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_verticalAlignment,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype,
        "textBackground", {
            get: lt.Annotations.Core.AnnTextObject.prototype.get_textBackground,
            set: lt.Annotations.Core.AnnTextObject.prototype.set_textBackground,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "textForeground", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_textForeground,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_textForeground,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "padding",
        {
            get: lt.Annotations.Core.AnnTextObject.prototype.get_padding,
            set: lt.Annotations.Core.AnnTextObject.prototype.set_padding,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "wordWrap", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_wordWrap,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_wordWrap,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextObject.prototype, "textSize", {
        get: lt.Annotations.Core.AnnTextObject.prototype.get_textSize,
        set: lt.Annotations.Core.AnnTextObject.prototype.set_textSize, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnTextPointerObject = function () {
        lt.Annotations.Core.AnnTextPointerObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textPointerObjectId);
        this._pointerPosition$3 = lt.Annotations.Core._leadPointDExtensions.get_empty();
        this._fixedPointer$3 = !1
    };
    lt.Annotations.Core.AnnTextPointerObject.prototype = {
        get_friendlyName: function () {
            return "Text Pointer"
        }, _pointerPosition$3: null, get_pointerPosition: function () {
            return this._pointerPosition$3
        },
        set_pointerPosition: function (a) {
            return this._pointerPosition$3 = a
        }, _fixedPointer$3: !1, get_fixedPointer: function () {
            return this._fixedPointer$3
        }, set_fixedPointer: function (a) {
            if (this._fixedPointer$3 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FixedPointer", 1, this._fixedPointer$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fixedPointer$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, _showArrow$3: !1, get_showArrow: function () {
            return this._showArrow$3
        }, set_showArrow: function (a) {
            if (this._showArrow$3 !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowArrow", 1, this._showArrow$3, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showArrow$3 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnTextPointerObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextPointerObject);
            null != a && (a._pointerPosition$3 = lt.Annotations.Core._leadPointDExtensions.clone(this._pointerPosition$3),
                a._fixedPointer$3 = this._fixedPointer$3, a._showArrow$3 = this._showArrow$3);
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writePointElement(c, "PointerPosition", b, this._pointerPosition$3);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "FixedPointer", b, this._fixedPointer$3)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._pointerPosition$3 =
                lt.Annotations.Core.AnnXmlHelper.readPointElement(c, "PointerPosition", b, this._pointerPosition$3);
            this._fixedPointer$3 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "FixedPointer", b, this._fixedPointer$3)
        }, scale: function (a, b, c) {
            lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "scale", [a, b, c]);
            this.get_fixedPointer() || this.set_pointerPosition(lt.Annotations.Core.AnnTransformer.scalePointAt(this.get_pointerPosition(), a, b, c.get_x(), c.get_y()))
        }, translate: function (a, b) {
            lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this,
                "translate", [a, b]);
            this.get_fixedPointer() || (lt.Annotations.Core._leadPointDExtensions.isEmpty(this._pointerPosition$3) ? this._pointerPosition$3 = lt.Annotations.Core._leadPointDExtensions.create(a, b) : (this._pointerPosition$3.set_x(this._pointerPosition$3.get_x() + a), this._pointerPosition$3.set_y(this._pointerPosition$3.get_y() + b)))
        }, rotate: function (a, b) {
            lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "rotate", [a, b]);
            !this.get_fixedPointer() && !lt.Annotations.Core._leadPointDExtensions.isEmpty(this._pointerPosition$3) &&
            (this._pointerPosition$3 = lt.Annotations.Core.AnnTransformer.rotatePointAt(this._pointerPosition$3, a, b.get_x(), b.get_y()))
        }, hitTest: function (a, b) {
            if (!this.get_isVisible())return !1;
            var c = lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "hitTest", [a, b]);
            if (c)return !0;
            c = this.getPointerPoints();
            return c = lt.Annotations.Core.Utils.hitTestLine(c[0], c[1], a, b, !0)
        }, getPointerPoints: function () {
            var a = null;
            if (0 < this.get_points().get_count())for (var a = [this.get_pointerPosition(), this.get_points().get_item(0)],
                                                           b = lt.Annotations.Core.Utils.distance(this.get_points().get_item(0), a[0]), c = 1; c < this.get_points().get_count(); ++c) {
                var d = lt.Annotations.Core.Utils.distance(this.get_points().get_item(c), a[0]);
                d < b && (b = d, a[1] = this.get_points().get_item(c))
            }
            return a
        }, getBoundingRectangle: function () {
            var a = lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this, "getBoundingRectangle");
            return lt.Annotations.Core._leadRectDExtensions.unionPoint(a, this.get_pointerPosition())
        }, getInvalidateRect: function (a, b) {
            var c = lt.Annotations.Core.AnnTextPointerObject.callBaseMethod(this,
                "getInvalidateRect", [a, b]);
            if (this.get_showArrow()) {
                var d = new lt.Annotations.Core.AnnPointerObject, e = this.getPointerPoints();
                if (null != e) {
                    for (e = ss.IEnumerator.getEnumerator(e); e.moveNext();) {
                        var f = e.current;
                        d.get_points().add(f)
                    }
                    c = lt.Annotations.Core._leadRectDExtensions.unionRects(c, d.getInvalidateRect(a, b))
                }
            }
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextPointerObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextPointerObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextPointerObject.prototype, "pointerPosition", {
        get: lt.Annotations.Core.AnnTextPointerObject.prototype.get_pointerPosition,
        set: lt.Annotations.Core.AnnTextPointerObject.prototype.set_pointerPosition,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextPointerObject.prototype, "fixedPointer", {
        get: lt.Annotations.Core.AnnTextPointerObject.prototype.get_fixedPointer,
        set: lt.Annotations.Core.AnnTextPointerObject.prototype.set_fixedPointer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextPointerObject.prototype, "showArrow", {
        get: lt.Annotations.Core.AnnTextPointerObject.prototype.get_showArrow,
        set: lt.Annotations.Core.AnnTextPointerObject.prototype.set_showArrow,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTextRedactionObject = function () {
        lt.Annotations.Core.AnnTextRedactionObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textRedactionObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Black"))
    };
    lt.Annotations.Core.AnnTextRedactionObject.prototype = {
        get_supportsOpacity: function () {
            return !1
        }, create: function () {
            return new lt.Annotations.Core.AnnTextRedactionObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextRedactionObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextRedactionObject);
            a.set_fill(null != this.get_fill() ? this.get_fill().clone() : null);
            return a
        }, get_friendlyName: function () {
            return "Text Redaction "
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextRedactionObject.prototype,
        "supportsOpacity", {
            get: lt.Annotations.Core.AnnTextRedactionObject.prototype.get_supportsOpacity,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextRedactionObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextRedactionObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTextReviewObject = function () {
        lt.Annotations.Core.AnnTextReviewObject.initializeBase(this)
    };
    lt.Annotations.Core.AnnTextReviewObject._getPointsFromRect$1 = function (a) {
        return lt.Annotations.Core._leadRectDExtensions.isEmpty(a) ?
            null : [lt.Annotations.Core._leadRectDExtensions.topLeft(a), lt.Annotations.Core._leadRectDExtensions.bottomRight(a)]
    };
    lt.Annotations.Core.AnnTextReviewObject.prototype = {
        get_canRotate: function () {
            return !1
        }, get_hitTestInterior: function () {
            return !1
        }, _canTranslate$1: !1, get_canTranslate: function () {
            return this._canTranslate$1
        }, set_canTranslate: function (a) {
            return this._canTranslate$1 = a
        }, _canScale$1: !1, get_canScale: function () {
            return this._canScale$1
        }, set_canScale: function (a) {
            return this._canScale$1 = a
        }, hitTest: function (a,
                              b) {
            if (!this.get_isVisible())return !1;
            var c = !1, d = this.getRectangles();
            if (null != d && 0 < d.length)for (var e = 0; e < d.length && !c; e++) {
                var f = d[e];
                lt.Annotations.Core._leadRectDExtensions.isEmpty(f) || (f = lt.Annotations.Core._leadRectDExtensions.inflate(f, b, b), c = lt.Annotations.Core._leadRectDExtensions.containsPoint(f, a))
            }
            return c
        }, get_supportsSelectionStroke: function () {
            return !0
        }, get_supportsFill: function () {
            return !0
        }, get_supportsStroke: function () {
            return !1
        }, scale: function (a, b, c) {
            this.get_canScale() && lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this,
                "scale", [a, b, c])
        }, scaleVector: function (a, b, c, d, e) {
            this.get_canScale() && lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this, "scaleVector", [a, b, c, d, e])
        }, translate: function (a, b) {
            this.get_canTranslate() && lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this, "translate", [a, b])
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextReviewObject);
            a.set_canScale(this.get_canScale());
            a.set_canTranslate(this.get_canTranslate());
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "CanScale", b, this.get_canScale());
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "CanTranslate", b, this.get_canTranslate())
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextReviewObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this.set_canScale(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "CanScale", b, this.get_canScale()));
            this.set_canTranslate(lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "CanTranslate", b, this.get_canTranslate()));
            this.set_isSelected(!1)
        }, addRectangle: function (a) {
            if (!lt.Annotations.Core._leadRectDExtensions.isEmpty(a))for (a = ss.IEnumerator.getEnumerator(lt.Annotations.Core.AnnTextReviewObject._getPointsFromRect$1(a)); a.moveNext();) {
                var b = a.current;
                this.get_points().add(b)
            }
        }, setRectangles: function (a) {
            (null == a || !a.length) && this.get_points().clear();
            for (a = ss.IEnumerator.getEnumerator(a); a.moveNext();)for (var b =
                ss.IEnumerator.getEnumerator(lt.Annotations.Core.AnnTextReviewObject._getPointsFromRect$1(a.current)); b.moveNext();) {
                var c = b.current;
                this.get_points().add(c)
            }
        }, getRectangles: function () {
            for (var a = this.get_points().get_count(), b = Array(a / 2), c = 0, d = 0; d < a; d += 2) {
                var e = this.get_points().get_item(d), f = lt.Annotations.Core._leadPointDExtensions.create(e.get_x(), e.get_y()), e = this.get_points().get_item(d + 1), e = lt.Annotations.Core._leadPointDExtensions.create(e.get_x(), e.get_y());
                b[c] = lt.Annotations.Core._leadRectDExtensions.fromLTRB(f.get_x(),
                    f.get_y(), e.get_x(), e.get_y());
                c++
            }
            return b
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "canRotate", {
        get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_canRotate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "canTranslate",
        {
            get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_canTranslate,
            set: lt.Annotations.Core.AnnTextReviewObject.prototype.set_canTranslate,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "canScale", {
        get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_canScale,
        set: lt.Annotations.Core.AnnTextReviewObject.prototype.set_canScale,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "supportsSelectionStroke",
        {
            get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_supportsSelectionStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "supportsFill", {
        get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_supportsFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextReviewObject.prototype, "supportsStroke", {
        get: lt.Annotations.Core.AnnTextReviewObject.prototype.get_supportsStroke,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTextRollupObject = function () {
        lt.Annotations.Core.AnnTextRollupObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textRollupObjectId);
        this.set_horizontalAlignment(1);
        this.set_verticalAlignment(1)
    };
    lt.Annotations.Core.AnnTextRollupObject.prototype = {
        get_friendlyName: function () {
            return "Text Rollup"
        }, _expanded$4: !0, get_expanded: function () {
            return this._expanded$4
        }, set_expanded: function (a) {
            if (this._expanded$4 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Expanded",
                    1, this._expanded$4, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._expanded$4 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnTextRollupObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextRollupObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextRollupObject);
            null != a && (a._expanded$4 = this._expanded$4);
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextRollupObject.callBaseMethod(this, "serialize",
                [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeBooleanElement(c, "Expanded", b, this._expanded$4)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnTextRollupObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._expanded$4 = lt.Annotations.Core.AnnXmlHelper.readBooleanElement(c, "Expanded", b, this._expanded$4)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextRollupObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextRollupObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnTextRollupObject.prototype, "expanded", {
        get: lt.Annotations.Core.AnnTextRollupObject.prototype.get_expanded,
        set: lt.Annotations.Core.AnnTextRollupObject.prototype.set_expanded,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTextStrikeoutObject = function () {
        lt.Annotations.Core.AnnTextStrikeoutObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textStrikeoutObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Red"))
    };
    lt.Annotations.Core.AnnTextStrikeoutObject.prototype = {
        create: function () {
            return new lt.Annotations.Core.AnnTextStrikeoutObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextStrikeoutObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnTextStrikeoutObject);
            a.set_fill(null != this.get_fill() ? this.get_fill().clone() : null);
            return a
        }, get_friendlyName: function () {
            return "Text Strikeout"
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextStrikeoutObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextStrikeoutObject.prototype.get_friendlyName,
        enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnTextUnderlineObject = function () {
        lt.Annotations.Core.AnnTextUnderlineObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.textUnderlineObjectId);
        this.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("Green"))
    };
    lt.Annotations.Core.AnnTextUnderlineObject.prototype = {
        create: function () {
            return new lt.Annotations.Core.AnnTextUnderlineObject
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnTextUnderlineObject.callBaseMethod(this,
                "clone"), lt.Annotations.Core.AnnTextUnderlineObject);
            a.set_fill(null != this.get_fill() ? this.get_fill().clone() : null);
            return a
        }, get_friendlyName: function () {
            return "Text Underline"
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnTextUnderlineObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnTextUnderlineObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnMediaObject = function () {
        lt.Annotations.Core.AnnMediaObject.initializeBase(this);
        this.setId(lt.Annotations.Core.AnnObject.mediaObjectId);
        this.set_defaultPicture(4);
        this._media$4 = new lt.Annotations.Core.AnnMedia
    };
    lt.Annotations.Core.AnnMediaObject.prototype = {
        get_friendlyName: function () {
            return "Media"
        }, _media$4: null, get_media: function () {
            return this._media$4
        }, set_media: function (a) {
            if (this._media$4 !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Media", 1, this._media$4, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._media$4 = a, this.onPropertyChanged(b))
            }
            return a
        }, create: function () {
            return new lt.Annotations.Core.AnnMediaObject
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnMediaObject.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnMediaObject);
            a._media$4 = null != this._media$4 ? this._media$4.clone() : null;
            return a
        }, serialize: function (a, b, c) {
            lt.Annotations.Core.AnnMediaObject.callBaseMethod(this, "serialize", [a, b, c]);
            lt.Annotations.Core.AnnXmlHelper.writeMediaElement(c, "Media", b, this._media$4)
        }, deserialize: function (a, b, c) {
            lt.Annotations.Core.AnnMediaObject.callBaseMethod(this, "deserialize", [a, b, c]);
            this._media$4 =
                lt.Annotations.Core.AnnXmlHelper.readMediaElement(c, "Media", b)
        }, get_hitTestInterior: function () {
            return 1 === (1 === (lt.Annotations.Core.AnnMediaObject.callBaseMethod(this, "get_hitTestInterior") | null != this.get_picture()) | -1 < this.get_defaultPicture())
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnMediaObject.prototype, "friendlyName", {
        get: lt.Annotations.Core.AnnMediaObject.prototype.get_friendlyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnMediaObject.prototype, "media",
        {
            get: lt.Annotations.Core.AnnMediaObject.prototype.get_media,
            set: lt.Annotations.Core.AnnMediaObject.prototype.set_media,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnMediaObject.prototype, "hitTestInterior", {
        get: lt.Annotations.Core.AnnMediaObject.prototype.get_hitTestInterior,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnLoadPictureEventArgs = function () {
        lt.Annotations.Core.AnnLoadPictureEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnLoadPictureEventArgs.create =
        function (a, b, c, d) {
            var e = new lt.Annotations.Core.AnnLoadPictureEventArgs;
            e._picture$1 = a;
            e._annObject$1 = b;
            e._container$1 = c;
            e._error$1 = d;
            return e
        };
    lt.Annotations.Core.AnnLoadPictureEventArgs.prototype = {
        _picture$1: null, get_picture: function () {
            return this._picture$1
        }, _annObject$1: null, get_annObject: function () {
            return this._annObject$1
        }, _container$1: null, get_container: function () {
            return this._container$1
        }, _error$1: null, get_error: function () {
            return this._error$1
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLoadPictureEventArgs.prototype,
        "picture", {
            get: lt.Annotations.Core.AnnLoadPictureEventArgs.prototype.get_picture,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnLoadPictureEventArgs.prototype, "annObject", {
        get: lt.Annotations.Core.AnnLoadPictureEventArgs.prototype.get_annObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLoadPictureEventArgs.prototype, "container", {
        get: lt.Annotations.Core.AnnLoadPictureEventArgs.prototype.get_container,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLoadPictureEventArgs.prototype,
        "error", {
            get: lt.Annotations.Core.AnnLoadPictureEventArgs.prototype.get_error,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Core.AnnRenderingEngine = function () {
        this._snapToGridOptions = new lt.Annotations.Core.AnnSnapToGridOptions;
        this._renderers = {};
        this._renderState = 7;
        this._loadingPictureStroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("white"), lt.Annotations.Core._leadLengthDExtensions.create(1));
        this._loadingPictureFill = lt.Annotations.Core.AnnSolidColorBrush.create("black")
    };
    lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer = function () {
        return lt.Annotations.Core.AnnRenderingEngine._containerLabelRenderer
    };
    lt.Annotations.Core.AnnRenderingEngine.set_containerLabelRenderer = function (a) {
        return lt.Annotations.Core.AnnRenderingEngine._containerLabelRenderer = a
    };
    lt.Annotations.Core.AnnRenderingEngine.prototype = {
        get_stateless: function () {
            return !0
        }, get_snapToGridOptions: function () {
            return this._snapToGridOptions
        }, set_snapToGridOptions: function (a) {
            return this._snapToGridOptions =
                a
        }, burnToRect: function (a) {
            var b = this._container.get_mapper(), c = b.get_transform(), d = lt.Annotations.Core._leadSizeDExtensions.clone(this._container.get_size());
            !lt.Annotations.Core._leadRectDExtensions.isEmpty(a) && a.get_width() && a.get_height() && b.set_burnScaleFactor(Math.max(a.get_width(), a.get_height()) / Math.max(d.get_width(), d.get_height()));
            b.updateDestinationRectangle(a, d);
            this.burn();
            b.updateTransform(c);
            b.set_burnScaleFactor(1)
        }, _originalMapper: null, burnToRectWithDpi: function (a, b, c, d, e) {
            this._originalMapper =
                this._container.get_mapper();
            b = new lt.Annotations.Core.AnnContainerMapper(b, c, d, e);
            b.set_deviceDpiX(this._originalMapper.get_deviceDpiX());
            b.set_deviceDpiY(this._originalMapper.get_deviceDpiY());
            b.set_calibrationScale(this._originalMapper.get_calibrationScale());
            c = lt.Annotations.Core._leadSizeDExtensions.clone(this._container.get_size());
            !lt.Annotations.Core._leadRectDExtensions.isEmpty(a) && a.get_width() && a.get_height() ? b.set_burnScaleFactor(Math.max(a.get_width(), a.get_height()) / Math.max(c.get_width(),
                    c.get_height())) : (d = this._originalMapper.clone(), d.updateTransform(lt.LeadMatrix.get_identity()), d = d.rectFromContainerCoordinates(lt.Annotations.Core._leadRectDExtensions.create(0, 0, this._container.get_size().get_width(), this._container.get_size().get_height()), 0), d = this._originalMapper.rectFromContainerCoordinates(lt.Annotations.Core._leadRectDExtensions.create(0, 0, this._container.get_size().get_width(), this._container.get_size().get_height()), 0).get_width() / d.get_width(), b.set_burnScaleFactor(b.get_burnScaleFactor() /
                d));
            b.updateDestinationRectangle(a, c);
            b.set_fontRelativeToDevice(this._container.get_mapper().get_fontRelativeToDevice());
            b.updateDestinationRectangle(a, c);
            this._container.set_mapper(b);
            this.burn();
            b.set_burnScaleFactor(1);
            this._container.set_mapper(this._originalMapper)
        }, _container: null, get_renderers: function () {
            return this._renderers
        }, set_renderers: function (a) {
            return this._renderers = a
        }, attachContainer: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
            this._container =
                a
        }, attach: function (a) {
            this.attachContainer(a)
        }, detach: function () {
            this._container = null
        }, get_container: function () {
            return this._container
        }, get_clipRectangle: function () {
            return null != this._container ? lt.Annotations.Core._leadRectDExtensions.create(this._container.get_mapper().get_offset().get_x(), this._container.get_mapper().get_offset().get_y(), this._container.get_size().get_width(), this._container.get_size().get_height()) : lt.Annotations.Core._leadRectDExtensions.get_empty()
        }, _loadingPictureStroke: null,
        get_loadingPictureStroke: function () {
            return this._loadingPictureStroke
        }, set_loadingPictureStroke: function (a) {
            return this._loadingPictureStroke = a
        }, _loadingPictureFill: null, get_loadingPictureFill: function () {
            return this._loadingPictureFill
        }, set_loadingPictureFill: function (a) {
            return this._loadingPictureFill = a
        }, get_renderState: function () {
            return this._renderState
        }, set_renderState: function (a) {
            return this._renderState = a
        }, _resources: null, get_resources: function () {
            return this._resources
        }, set_resources: function (a) {
            return this._resources =
                a
        }, burn: function () {
            var a = this._container.get_mapper();
            null != this._originalMapper && a.set_burnScaleFactor(a.get_burnScaleFactor() * this._originalMapper.get_sourceDpiX() / this._originalMapper.get_targetDpiX());
            this._doRender(lt.Annotations.Core._leadRectDExtensions.get_empty(), !0);
            a.set_burnScaleFactor(1)
        }, render: function (a, b) {
            null != this._container && this.get_stateless() && this._doRender(a, b)
        }, _renderObject: function (a, b, c, d) {
            var e = c.get_mapper(), f = !0;
            null != c.get_groupsRoles() && (f = this._container.get_groupsRoles().isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(14,
                b)));
            if (b.get_isVisible() && f && Object.keyExists(this.get_renderers(), b.get_id()) && (f = this.get_renderers()[b.get_id()], null != f && (f.initialize(this), null != f && 0 < b.get_points().get_count()))) {
                var g = b.getInvalidateRect(e, f);
                if (lt.Annotations.Core._leadRectDExtensions.isEmpty(g) || lt.Annotations.Core._leadRectDExtensions.isEmpty(a) || lt.Annotations.Core._leadRectDExtensions.intersectsWith(a, g)) {
                    b.set_renderedObjectBounds(b.get_bounds());
                    f.render(e, b);
                    if (null != b.get_labels() && 0 < Object.getKeyCount(b.get_labels()) &&
                        null != f.get_labelRenderer())for (a = ss.IEnumerator.getEnumerator(Object.keys(b.get_labels())); a.moveNext();) {
                        var g = a.current, h = b.get_labels()[g];
                        2 === (h.get_restrictionMode() & 2) && h.set_restrictionRectangle(b.get_bounds());
                        h.set_parent(b);
                        f.get_labelRenderer().set_offsetHeight(h.get_offsetHeight());
                        "AnnObjectName" === g && (h.get_positionMode() ? lt.Annotations.Core._leadPointDExtensions.isEmpty(h.get_originalPosition()) && h.set_originalPosition(c.get_mapper().pointToContainerCoordinates(lt.Annotations.Core._leadPointDExtensions.create(0,
                            0))) : h.set_originalPosition(lt.Annotations.Core._leadPointDExtensions.create(b.get_bounds().get_x(), b.get_bounds().get_y())));
                        f.get_labelRenderer().renderLabel(e, h, b.get_fixedStateOperations());
                        b.set_renderedObjectBounds(lt.Annotations.Core._leadRectDExtensions.unionRects(b.get_renderedObjectBounds(), h.get_renderedLabelBounds()))
                    }
                    !d && b.get_isSelected() && (b.get_canRotate() && f.renderRotatePointThumbs(e, b.get_internalRotateCenterLocation(), b.get_internalRotateGripperLocation(), b.get_fixedStateOperations()),
                        f.renderThumbs(e, b.get_internalThumbLocations(), b.get_fixedStateOperations()), b.get_supportsSelectionStroke() && f.renderSelection(e, b));
                    a = Type.safeCast(b, lt.Annotations.Core.AnnSelectionObject);
                    if (null != a)for (a = ss.IEnumerator.getEnumerator(a.get_selectedObjects()); a.moveNext();)g = a.current, h = this.get_renderers()[g.get_id()], null != h && 0 < g.get_points().get_count() && h.render(e, g);
                    !c.get_userMode() && this._renderState && (b.get_isLocked() && 1 === (this._renderState & 1) && f.renderLocked(e, b, b.get_fixedStateOperations()),
                    b.get_supportsContent() && (c = Object.keyExists(b.get_metadata(), "Content") ? b.get_metadata().Content : null, !String.isNullOrEmpty(c) && 2 === (this._renderState & 2) && f.renderContent(e, b, b.get_fixedStateOperations())));
                    !d && b.get_isAlignmentTarget() && f.renderAlignmentTarget(e, b)
                }
            }
        }, renderLayer: function (a, b, c, d) {
            if (b.get_isVisible()) {
                for (var e = ss.IEnumerator.getEnumerator(b.get_children()); e.moveNext();)this._renderObject(a, e.current, c, d);
                this.renderLayers(a, b.get_layers(), c, d)
            }
        }, renderLayers: function (a, b, c, d) {
            if (null !=
                b)for (b = ss.IEnumerator.getEnumerator(b); b.moveNext();)this.renderLayer(a, b.current, c, d)
        }, renderContainer: function (a, b, c) {
            if (b.get_isVisible()) {
                var d = b.get_mapper();
                null != lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer() && lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer().initialize(this);
                if (null != b.get_fill() || null != b.get_stroke()) {
                    var e = new lt.Annotations.Core.AnnRectangleObject;
                    e.set_rect(lt.Annotations.Core._leadRectDExtensions.create(0, 0, b.get_size().get_width(),
                        b.get_size().get_height()));
                    e.set_fill(b.get_fill());
                    e.set_stroke(b.get_stroke());
                    var f = this.get_renderers()[e.get_id()];
                    null != f && (f.initialize(this), f.render(d, e))
                }
                null != this._snapToGridOptions && this._snapToGridOptions.get_showGrid() && this.renderGrid(c, b);
                e = [lt.Annotations.Core._leadRectDExtensions.topLeft(a), lt.Annotations.Core._leadRectDExtensions.topRight(a), lt.Annotations.Core._leadRectDExtensions.bottomRight(a), lt.Annotations.Core._leadRectDExtensions.bottomLeft(a)];
                a = d.rectFromContainerCoordinates(a,
                    0);
                if (!b.get_mapper().get_rotateTransform().get_isIdentity()) {
                    e = b.get_mapper().pointsFromContainerCoordinates(e, 0);
                    for (e = ss.IEnumerator.getEnumerator(e); e.moveNext();)f = e.current, lt.Annotations.Core._leadRectDExtensions.containsPoint(a, f) || (a = lt.Annotations.Core._leadRectDExtensions.unionPoint(a, f))
                }
                e = Type.safeCast(b.get_selectionObject(), lt.Annotations.Core.AnnSelectionObject);
                e.set_renderedObjectBounds(e.get_bounds());
                for (f = ss.IEnumerator.getEnumerator(b.get_children()); f.moveNext();) {
                    var g = f.current;
                    null == g.get_layer() && (this._renderObject(a, g, b, c), e.get_selectedObjects().contains(g) && e.set_renderedObjectBounds(lt.Annotations.Core._leadRectDExtensions.unionRects(e.get_renderedObjectBounds(), g.get_renderedObjectBounds())))
                }
                this.renderLayers(a, b.get_layers(), b, c);
                if (4 === (this._renderState & 4) && 0 < b.get_labels().length)for (a = ss.IEnumerator.getEnumerator(b.get_labels()); a.moveNext();)b = a.current, null != lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer() && lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer().renderLabel(d,
                    b, 4);
                !c && Object.keyExists(this.get_renderers(), e.get_id()) && (c = this.get_renderers()[e.get_id()], c.initialize(this), lt.Annotations.Core._leadRectDExtensions.isEmpty(e.get_bounds()) || (c.render(d, e), e.get_isSelected() && !e.get_isLocked() && (e.get_canRotate() && c.renderRotatePointThumbs(d, e.get_internalRotateCenterLocation(), e.get_internalRotateGripperLocation(), e.get_fixedStateOperations()), c.renderThumbs(d, e.get_internalThumbLocations(), e.get_fixedStateOperations()))))
            }
        }, _doRender: function (a, b) {
            this._container.get_isVisible() &&
            (null != lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer() && lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer().initialize(this), this.renderContainer(a, this._container, b))
        }, add_loadPicture: function (a) {
            this.__loadPicture = ss.Delegate.combine(this.__loadPicture, a)
        }, remove_loadPicture: function (a) {
            this.__loadPicture = ss.Delegate.remove(this.__loadPicture, a)
        }, __loadPicture_handler_get: function () {
            null == this.__loadPicture_handler && (this.__loadPicture_handler = ss.EventHandler.create(this,
                this.add_loadPicture, this.remove_loadPicture));
            return this.__loadPicture_handler
        }, __loadPicture: null, __loadPicture_handler: null, onLoadPicture: function (a) {
            null != this.__loadPicture && this.__loadPicture(this, a)
        }, renderGrid: function () {
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "stateless", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_stateless,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "snapToGridOptions",
        {
            get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_snapToGridOptions,
            set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_snapToGridOptions,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "renderers", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_renderers,
        set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_renderers,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine, "containerLabelRenderer",
        {
            get: lt.Annotations.Core.AnnRenderingEngine.get_containerLabelRenderer,
            set: lt.Annotations.Core.AnnRenderingEngine.set_containerLabelRenderer,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "container", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_container,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "clipRectangle", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_clipRectangle,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "loadingPictureStroke", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_loadingPictureStroke,
        set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_loadingPictureStroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "loadingPictureFill", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_loadingPictureFill,
        set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_loadingPictureFill,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "renderState", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_renderState,
        set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_renderState,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "resources", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.get_resources,
        set: lt.Annotations.Core.AnnRenderingEngine.prototype.set_resources,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRenderingEngine.prototype, "loadPicture", {
        get: lt.Annotations.Core.AnnRenderingEngine.prototype.__loadPicture_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnDrawDesignerEventArgs = function () {
        lt.Annotations.Core.AnnDrawDesignerEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnDrawDesignerEventArgs.create = function (a, b) {
        var c = new lt.Annotations.Core.AnnDrawDesignerEventArgs;
        c._object$1 = a;
        c._operationStatus$1 =
            b;
        c._cancel$1 = !1;
        return c
    };
    lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype = {
        _object$1: null, get_object: function () {
            return this._object$1
        }, _operationStatus$1: 0, get_operationStatus: function () {
            return this._operationStatus$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype, "object", {
        get: lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype.get_object, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype, "operationStatus", {
        get: lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype.get_operationStatus,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnDrawDesignerEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnEditDesignerEventArgs =
        function () {
            lt.Annotations.Core.AnnEditDesignerEventArgs.initializeBase(this)
        };
    lt.Annotations.Core.AnnEditDesignerEventArgs.create = function (a, b, c, d) {
        var e = new lt.Annotations.Core.AnnEditDesignerEventArgs;
        e._object$1 = a;
        e._operation$1 = b;
        e._moveThumbIndex$1 = c;
        e._operationStatus$1 = d;
        e._cancel$1 = !1;
        return e
    };
    lt.Annotations.Core.AnnEditDesignerEventArgs.prototype = {
        _object$1: null, get_object: function () {
            return this._object$1
        }, _operation$1: 0, get_operation: function () {
            return this._operation$1
        }, _operationStatus$1: 0,
        get_operationStatus: function () {
            return this._operationStatus$1
        }, _moveThumbIndex$1: 0, get_moveThumbIndex: function () {
            return this._moveThumbIndex$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnEditDesignerEventArgs.prototype, "object", {
        get: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.get_object,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditDesignerEventArgs.prototype,
        "operation", {
            get: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.get_operation,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnEditDesignerEventArgs.prototype, "operationStatus", {
        get: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.get_operationStatus,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditDesignerEventArgs.prototype, "moveThumbIndex", {
        get: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.get_moveThumbIndex, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditDesignerEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnEditDesignerEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnEditContentEventArgs = function () {
        lt.Annotations.Core.AnnEditContentEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnEditContentEventArgs.create = function (a, b) {
        var c = new lt.Annotations.Core.AnnEditContentEventArgs;
        c._cancel$1 = !1;
        c._bounds$1 = b;
        c._object$1 = a;
        return c
    };
    lt.Annotations.Core.AnnEditContentEventArgs.prototype = {
        _object$1: null, get_targetObject: function () {
            return this._object$1
        }, _bounds$1: null, get_bounds: function () {
            return this._bounds$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnEditContentEventArgs.prototype, "targetObject", {
        get: lt.Annotations.Core.AnnEditContentEventArgs.prototype.get_targetObject,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditContentEventArgs.prototype, "bounds", {
        get: lt.Annotations.Core.AnnEditContentEventArgs.prototype.get_bounds,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditContentEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnEditContentEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnEditContentEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnEditTextEventArgs =
        function () {
            lt.Annotations.Core.AnnEditTextEventArgs.initializeBase(this)
        };
    lt.Annotations.Core.AnnEditTextEventArgs.create = function (a, b) {
        var c = new lt.Annotations.Core.AnnEditTextEventArgs;
        c._cancel$1 = !1;
        c._bounds$1 = b;
        c._textObject$1 = a;
        return c
    };
    lt.Annotations.Core.AnnEditTextEventArgs.prototype = {
        _textObject$1: null, get_textObject: function () {
            return this._textObject$1
        }, _bounds$1: null, get_bounds: function () {
            return this._bounds$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 =
                a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnEditTextEventArgs.prototype, "textObject", {
        get: lt.Annotations.Core.AnnEditTextEventArgs.prototype.get_textObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditTextEventArgs.prototype, "bounds", {
        get: lt.Annotations.Core.AnnEditTextEventArgs.prototype.get_bounds,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnEditTextEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnEditTextEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnEditTextEventArgs.prototype.set_cancel, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnLockObjectEventArgs = function () {
        this._password$1 = "";
        lt.Annotations.Core.AnnLockObjectEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnLockObjectEventArgs.create = function (a) {
        var b = new lt.Annotations.Core.AnnLockObjectEventArgs;
        b._object$1 = a;
        return b
    };
    lt.Annotations.Core.AnnLockObjectEventArgs.prototype = {
        _object$1: null, get_object: function () {
            return this._object$1
        }, get_password: function () {
            return this._password$1
        },
        set_password: function (a) {
            return this._password$1 = a
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLockObjectEventArgs.prototype, "object", {
        get: lt.Annotations.Core.AnnLockObjectEventArgs.prototype.get_object,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLockObjectEventArgs.prototype, "password", {
        get: lt.Annotations.Core.AnnLockObjectEventArgs.prototype.get_password,
        set: lt.Annotations.Core.AnnLockObjectEventArgs.prototype.set_password, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLockObjectEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnLockObjectEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnLockObjectEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnPointerEventArgs = function () {
        lt.Annotations.Core.AnnPointerEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnPointerEventArgs.create =
        function (a, b) {
            var c = new lt.Annotations.Core.AnnPointerEventArgs;
            c._location$1 = lt.Annotations.Core._leadPointDExtensions.clone(b);
            c._button$1 = a;
            c._isHandled$1 = !1;
            return c
        };
    lt.Annotations.Core.AnnPointerEventArgs.prototype = {
        clone: function () {
            var a = new lt.Annotations.Core.AnnPointerEventArgs;
            a._location$1 = lt.Annotations.Core._leadPointDExtensions.clone(this._location$1);
            a._button$1 = this._button$1;
            a._isHandled$1 = this._isHandled$1;
            return a
        }, _button$1: 0, get_button: function () {
            return this._button$1
        }, _location$1: null,
        get_location: function () {
            return lt.Annotations.Core._leadPointDExtensions.clone(this._location$1)
        }, set_location: function (a) {
            this._location$1 = lt.Annotations.Core._leadPointDExtensions.clone(a);
            return a
        }, _isHandled$1: !1, get_isHandled: function () {
            return this._isHandled$1
        }, set_isHandled: function (a) {
            return this._isHandled$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPointerEventArgs.prototype, "button", {
        get: lt.Annotations.Core.AnnPointerEventArgs.prototype.get_button,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointerEventArgs.prototype, "location", {
        get: lt.Annotations.Core.AnnPointerEventArgs.prototype.get_location,
        set: lt.Annotations.Core.AnnPointerEventArgs.prototype.set_location,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPointerEventArgs.prototype, "isHandled", {
        get: lt.Annotations.Core.AnnPointerEventArgs.prototype.get_isHandled,
        set: lt.Annotations.Core.AnnPointerEventArgs.prototype.set_isHandled,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs = function () {
        this._newItems$1 = [];
        this._oldItems$1 = [];
        lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create = function (a) {
        var b = new lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs;
        b._action$1 = a;
        return b
    };
    lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype = {
        _action$1: 0, get_action: function () {
            return this._action$1
        }, get_newItems: function () {
            return this._newItems$1
        },
        _newStartingIndex$1: 0, get_newStartingIndex: function () {
            return this._newStartingIndex$1
        }, get_oldItems: function () {
            return this._oldItems$1
        }, _oldStartingIndex$1: 0, get_oldStartingIndex: function () {
            return this._oldStartingIndex$1
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype, "action", {
        get: lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype.get_action,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype,
        "newItems", {
            get: lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype.get_newItems,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype, "newStartingIndex", {
        get: lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype.get_newStartingIndex,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype, "oldItems", {
        get: lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype.get_oldItems,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype, "oldStartingIndex", {
        get: lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.prototype.get_oldStartingIndex,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnObjectCollectionEventArgs = function () {
        lt.Annotations.Core.AnnObjectCollectionEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnObjectCollectionEventArgs.create = function (a) {
        var b = new lt.Annotations.Core.AnnObjectCollectionEventArgs;
        b._obj$1 = a;
        return b
    };
    lt.Annotations.Core.AnnObjectCollectionEventArgs.prototype = {
        _obj$1: null, get_object: function () {
            return this._obj$1
        }, _setObject: function (a) {
            this._obj$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnObjectCollectionEventArgs.prototype, "object", {
        get: lt.Annotations.Core.AnnObjectCollectionEventArgs.prototype.get_object,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnPropertyChangedEventArgs = function (a, b, c, d) {
        lt.Annotations.Core.AnnPropertyChangedEventArgs.initializeBase(this);
        this._propertyName$1 = a;
        this._oldValue$1 = c;
        this._newValue$1 = d;
        this._status$1 = b
    };
    lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype = {
        _propertyName$1: null, get_propertyName: function () {
            return this._propertyName$1
        }, _oldValue$1: null, get_oldValue: function () {
            return this._oldValue$1
        }, _newValue$1: null, get_newValue: function () {
            return this._newValue$1
        }, _status$1: 0, get_status: function () {
            return this._status$1
        }, set_status: function (a) {
            return this._status$1 = a
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        },
        set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype, "propertyName", {
        get: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.get_propertyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype, "oldValue", {
        get: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.get_oldValue,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype,
        "newValue", {
            get: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.get_newValue,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype, "status", {
        get: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.get_status,
        set: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.set_status,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnPropertyChangedEventArgs.prototype.set_cancel, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnRunDesignerEventArgs = function () {
        lt.Annotations.Core.AnnRunDesignerEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnRunDesignerEventArgs.create = function (a, b) {
        var c = new lt.Annotations.Core.AnnRunDesignerEventArgs;
        c._object$1 = a;
        c._operationStatus$1 = b;
        c._cancel$1 = !1;
        return c
    };
    lt.Annotations.Core.AnnRunDesignerEventArgs.prototype = {
        _object$1: null, get_object: function () {
            return this._object$1
        },
        _operationStatus$1: 0, get_operationStatus: function () {
            return this._operationStatus$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRunDesignerEventArgs.prototype, "object", {
        get: lt.Annotations.Core.AnnRunDesignerEventArgs.prototype.get_object,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRunDesignerEventArgs.prototype, "operationStatus", {
        get: lt.Annotations.Core.AnnRunDesignerEventArgs.prototype.get_operationStatus,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnRunDesignerEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnRunDesignerEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnRunDesignerEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnToolTipEventArgs = function () {
        lt.Annotations.Core.AnnToolTipEventArgs.initializeBase(this)
    };
    lt.Annotations.Core.AnnToolTipEventArgs.create = function (a, b) {
        var c = new lt.Annotations.Core.AnnToolTipEventArgs;
        c._cancel$1 = !1;
        c._bounds$1 = b;
        c._annObject$1 = a;
        return c
    };
    lt.Annotations.Core.AnnToolTipEventArgs.prototype = {
        _annObject$1: null, get_annotationObject: function () {
            return this._annObject$1
        }, _bounds$1: null, get_bounds: function () {
            return this._bounds$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnToolTipEventArgs.prototype, "annotationObject", {
        get: lt.Annotations.Core.AnnToolTipEventArgs.prototype.get_annotationObject,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnToolTipEventArgs.prototype, "bounds", {
        get: lt.Annotations.Core.AnnToolTipEventArgs.prototype.get_bounds,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnToolTipEventArgs.prototype, "cancel", {
        get: lt.Annotations.Core.AnnToolTipEventArgs.prototype.get_cancel,
        set: lt.Annotations.Core.AnnToolTipEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnBrush = function () {
    };
    lt.Annotations.Core.AnnBrush.prototype =
    {
        clone: function () {
            return this.createBrush()
        }
    };
    lt.Annotations.Core.AnnSolidColorBrush = function () {
        lt.Annotations.Core.AnnSolidColorBrush.initializeBase(this);
        this._color$1 = "#000000"
    };
    lt.Annotations.Core.AnnSolidColorBrush.create = function (a) {
        var b = new lt.Annotations.Core.AnnSolidColorBrush;
        b.set_color(a);
        return b
    };
    lt.Annotations.Core.AnnSolidColorBrush.prototype = {
        _color$1: null, get_color: function () {
            return this._color$1
        }, set_color: function (a) {
            return this._color$1 = a
        }, createBrush: function () {
            return new lt.Annotations.Core.AnnSolidColorBrush
        },
        clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnSolidColorBrush.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnSolidColorBrush);
            null != a && (a._color$1 = this._color$1);
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnSolidColorBrush.prototype, "color", {
        get: lt.Annotations.Core.AnnSolidColorBrush.prototype.get_color,
        set: lt.Annotations.Core.AnnSolidColorBrush.prototype.set_color,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnHatchBrush = function () {
        lt.Annotations.Core.AnnHatchBrush.initializeBase(this)
    };
    lt.Annotations.Core.AnnHatchBrush.create = function (a) {
        var b = new lt.Annotations.Core.AnnHatchBrush;
        b.set_hatchStyle(a);
        return b
    };
    lt.Annotations.Core.AnnHatchBrush.prototype = {
        _foregroundColor$1: "#000000", _backgroundColor$1: "#FFFFFF", _hatchSytle$1: 0, get_hatchStyle: function () {
            return this._hatchSytle$1
        }, set_hatchStyle: function (a) {
            return this._hatchSytle$1 = a
        }, get_foregroundColor: function () {
            return this._foregroundColor$1
        }, set_foregroundColor: function (a) {
            return this._foregroundColor$1 = a
        }, get_backgroundColor: function () {
            return this._backgroundColor$1
        },
        set_backgroundColor: function (a) {
            return this._backgroundColor$1 = a
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnHatchBrush.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnHatchBrush);
            a.set_foregroundColor(this.get_foregroundColor());
            a.set_backgroundColor(this.get_backgroundColor());
            a.set_hatchStyle(this.get_hatchStyle());
            return a
        }, createBrush: function () {
            return new lt.Annotations.Core.AnnHatchBrush
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnHatchBrush.prototype, "hatchStyle", {
        get: lt.Annotations.Core.AnnHatchBrush.prototype.get_hatchStyle,
        set: lt.Annotations.Core.AnnHatchBrush.prototype.set_hatchStyle, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHatchBrush.prototype, "foregroundColor", {
        get: lt.Annotations.Core.AnnHatchBrush.prototype.get_foregroundColor,
        set: lt.Annotations.Core.AnnHatchBrush.prototype.set_foregroundColor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnHatchBrush.prototype, "backgroundColor", {
        get: lt.Annotations.Core.AnnHatchBrush.prototype.get_backgroundColor,
        set: lt.Annotations.Core.AnnHatchBrush.prototype.set_backgroundColor, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnGradientStop = function (a, b) {
        this._color = "";
        this._offset = b;
        this._color = a
    };
    lt.Annotations.Core.AnnGradientStop.prototype = {
        get_color: function () {
            return this._color
        }, set_color: function (a) {
            return this._color = a
        }, _offset: 0, get_offset: function () {
            return this._offset
        }, set_offset: function (a) {
            (lt.LeadDoubleTools.lessThan(a, 0) || lt.LeadDoubleTools.greaterThan(a, 1)) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("Offset",
                a, "Must be a value greater than or equals to 0 and less than or equals to 1");
            return this._offset = a
        }, clone: function () {
            return new lt.Annotations.Core.AnnGradientStop(this._color, this._offset)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnGradientStop.prototype, "color", {
        get: lt.Annotations.Core.AnnGradientStop.prototype.get_color,
        set: lt.Annotations.Core.AnnGradientStop.prototype.set_color,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGradientStop.prototype, "offset", {
        get: lt.Annotations.Core.AnnGradientStop.prototype.get_offset,
        set: lt.Annotations.Core.AnnGradientStop.prototype.set_offset, enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnGradientBrush = function () {
        this._gradientStops$1 = new lt.Annotations.Core.AnnGradientStopCollection;
        lt.Annotations.Core.AnnGradientBrush.initializeBase(this)
    };
    lt.Annotations.Core.AnnGradientBrush.prototype = {
        get_gradientStops: function () {
            return this._gradientStops$1
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnGradientBrush.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnGradientBrush);
            if (null != a)for (var b = ss.IEnumerator.getEnumerator(this.get_gradientStops()); b.moveNext();) {
                var c = b.current;
                a.get_gradientStops().add(c)
            }
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnGradientBrush.prototype, "gradientStops", {
        get: lt.Annotations.Core.AnnGradientBrush.prototype.get_gradientStops,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnLinearGradientBrush = function () {
        this._linearGradientMode$2 = 2;
        lt.Annotations.Core.AnnLinearGradientBrush.initializeBase(this)
    };
    lt.Annotations.Core.AnnLinearGradientBrush.create =
        function (a) {
            var b = new lt.Annotations.Core.AnnLinearGradientBrush;
            b.set_linearGradientMode(a);
            return b
        };
    lt.Annotations.Core.AnnLinearGradientBrush.prototype = {
        get_linearGradientMode: function () {
            return this._linearGradientMode$2
        }, set_linearGradientMode: function (a) {
            return this._linearGradientMode$2 = a
        }, createBrush: function () {
            return new lt.Annotations.Core.AnnLinearGradientBrush
        }, clone: function () {
            var a = Type.safeCast(lt.Annotations.Core.AnnLinearGradientBrush.callBaseMethod(this, "clone"), lt.Annotations.Core.AnnLinearGradientBrush);
            null != a && a.set_linearGradientMode(this._linearGradientMode$2);
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLinearGradientBrush.prototype, "linearGradientMode", {
        get: lt.Annotations.Core.AnnLinearGradientBrush.prototype.get_linearGradientMode,
        set: lt.Annotations.Core.AnnLinearGradientBrush.prototype.set_linearGradientMode,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnContainerCollection = function () {
        this._elements = []
    };
    lt.Annotations.Core.AnnContainerCollection.prototype = {
        get_count: function () {
            return this._elements.length
        },
        clear: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, remove: function (a) {
            this.removeItem(a)
        }, add: function (a) {
            this._elements.add(a);
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            b.get_newItems().add(a);
            this.onCollectionChanged(b)
        }, insert: function (a, b) {
            this._elements.insert(a, b);
            var c =
                lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, contains: function (a) {
            return this._elements.contains(a)
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            var c = this._elements[a];
            this._elements[a] =
                b;
            this._elements[a + 1] = c;
            c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(3))
        }, onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeAt: function (a) {
            this.removeItem(this.get_item(a))
        },
        removeItem: function (a) {
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(1);
            b.get_newItems().add(a);
            this._elements.remove(a);
            this.onCollectionChanged(b)
        }, setItem: function (a, b) {
            this._elements[a] = b;
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(2))
        }, clearItems: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, indexOf: function (a) {
            return this._elements.indexOf(a)
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged, a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, sendToBack: function () {
        }, bringToFront: function () {
        }, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnContainerCollection.prototype, "count", {
        get: lt.Annotations.Core.AnnContainerCollection.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnContainerCollection.prototype, "collectionChanged", {
        get: lt.Annotations.Core.AnnContainerCollection.prototype.__collectionChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnGradientStopCollection = function () {
        this._elements = []
    };
    lt.Annotations.Core.AnnGradientStopCollection.prototype = {
        get_count: function () {
            return this._elements.length
        }, clear: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c =
                    b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, remove: function (a) {
            this.removeItem(a)
        }, add: function (a) {
            this._elements.add(a);
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            b.get_newItems().add(a);
            this.onCollectionChanged(b)
        }, contains: function (a) {
            return this._elements.contains(a)
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] =
                b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements[a] = b;
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(3))
        },
        onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeAt: function (a) {
            this.removeItem(this.get_item(a))
        }, removeItem: function (a) {
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(1);
            b.get_newItems().add(a);
            this._elements.remove(a);
            this.onCollectionChanged(b)
        }, setItem: function (a, b) {
            this._elements[a] = b;
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(2))
        }, clearItems: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4),
                     b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, indexOf: function (a) {
            return this._elements.indexOf(a)
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged, a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler &&
            (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, sendToBack: function () {
        }, bringToFront: function () {
        }, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnGradientStopCollection.prototype,
        "count", {
            get: lt.Annotations.Core.AnnGradientStopCollection.prototype.get_count,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnGradientStopCollection.prototype, "collectionChanged", {
        get: lt.Annotations.Core.AnnGradientStopCollection.prototype.__collectionChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnDataProvider = function () {
    };
    lt.Annotations.Core.AnnDataProvider.prototype = {
        get_canRead: function () {
            return !0
        }, get_canWrite: function () {
            return !0
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnDataProvider.prototype,
        "canRead", {get: lt.Annotations.Core.AnnDataProvider.prototype.get_canRead, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.AnnDataProvider.prototype, "canWrite", {
        get: lt.Annotations.Core.AnnDataProvider.prototype.get_canWrite,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnDouble = function () {
    };
    lt.Annotations.Core.AnnDouble.isNaN = function (a) {
        return a !== a
    };
    lt.Annotations.Core.AnnDouble.isInfinity = function (a) {
        return a === lt.Annotations.Core.AnnDouble.positiveInfinity || a ===
            lt.Annotations.Core.AnnDouble.negativeInfinity
    };
    lt.Annotations.Core.AnnDouble.parseInvariantCulture = function (a) {
        return String.isNullOrEmpty(a) ? 0 : parseFloat(a)
    };
    lt.Annotations.Core.AnnFont = function (a, b) {
        this._textDecoration = 0;
        this._fontFamilyName = a;
        this._fontSize = b
    };
    lt.Annotations.Core.AnnFont.prototype = {
        add_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.combine(this.__propertyChanged, a)
        }, remove_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.remove(this.__propertyChanged,
                a)
        }, __propertyChanged_handler_get: function () {
            null == this.__propertyChanged_handler && (this.__propertyChanged_handler = ss.EventHandler.create(this, this.add_propertyChanged, this.remove_propertyChanged));
            return this.__propertyChanged_handler
        }, __propertyChanged: null, __propertyChanged_handler: null, onPropertyChanged: function (a) {
            null != this.__propertyChanged && this.__propertyChanged(this, a)
        }, _fontFamilyName: null, get_fontFamilyName: function () {
            return this._fontFamilyName
        }, set_fontFamilyName: function (a) {
            if (this._fontFamilyName !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontFamilyName", 1, this._fontFamilyName, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fontFamilyName = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }, _fontSize: 0, get_fontSize: function () {
            return this._fontSize
        }, set_fontSize: function (a) {
            var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontSize", 1, this._fontSize, a);
            this.onPropertyChanged(b);
            b.get_cancel() || (b.set_status(0), this._fontSize = a, this.onPropertyChanged(b),
                this._isDirty = !0);
            return a
        }, _fontStretch: 0, get_fontStretch: function () {
            return this._fontStretch
        }, set_fontStretch: function (a) {
            if (this._fontStretch !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontStretch", 1, this._fontStretch, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fontStretch = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }, _fontStyle: 0, get_fontStyle: function () {
            return this._fontStyle
        }, set_fontStyle: function (a) {
            if (this._fontStyle !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontStyle",
                    1, this._fontStyle, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fontStyle = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }, _fontWeight: 0, get_fontWeight: function () {
            return this._fontWeight
        }, set_fontWeight: function (a) {
            if (this._fontWeight !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontWeight", 1, this._fontWeight, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fontWeight = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }, clone: function () {
            var a =
                new lt.Annotations.Core.AnnFont(this._fontFamilyName, this._fontSize);
            a._fontHeight = this._fontHeight;
            a._fontStretch = this._fontStretch;
            a._fontStyle = this._fontStyle;
            a._fontWeight = this._fontWeight;
            a._textDecoration = this._textDecoration;
            a._isDirty = this._isDirty;
            return a
        }, _isDirty: !0, get_isDirty: function () {
            return this._isDirty
        }, set_isDirty: function (a) {
            return this._isDirty = a
        }, _fontHeight: 0, get_fontHeight: function () {
            return this._fontHeight
        }, set_fontHeight: function (a) {
            if (this._fontHeight !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("FontHeight",
                    1, this._fontHeight, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._fontHeight = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }, get_textDecoration: function () {
            return this._textDecoration
        }, set_textDecoration: function (a) {
            if (this._textDecoration !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("TextDecoration", 1, this._textDecoration, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._textDecoration = a, this.onPropertyChanged(b), this._isDirty = !0)
            }
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "propertyChanged", {
        get: lt.Annotations.Core.AnnFont.prototype.__propertyChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "fontFamilyName", {
        get: lt.Annotations.Core.AnnFont.prototype.get_fontFamilyName,
        set: lt.Annotations.Core.AnnFont.prototype.set_fontFamilyName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "fontSize", {
        get: lt.Annotations.Core.AnnFont.prototype.get_fontSize,
        set: lt.Annotations.Core.AnnFont.prototype.set_fontSize, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "fontStretch", {
        get: lt.Annotations.Core.AnnFont.prototype.get_fontStretch,
        set: lt.Annotations.Core.AnnFont.prototype.set_fontStretch,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "fontStyle", {
        get: lt.Annotations.Core.AnnFont.prototype.get_fontStyle,
        set: lt.Annotations.Core.AnnFont.prototype.set_fontStyle,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "fontWeight", {
        get: lt.Annotations.Core.AnnFont.prototype.get_fontWeight,
        set: lt.Annotations.Core.AnnFont.prototype.set_fontWeight,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "isDirty", {
        get: lt.Annotations.Core.AnnFont.prototype.get_isDirty,
        set: lt.Annotations.Core.AnnFont.prototype.set_isDirty,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype,
        "fontHeight", {
            get: lt.Annotations.Core.AnnFont.prototype.get_fontHeight,
            set: lt.Annotations.Core.AnnFont.prototype.set_fontHeight,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnFont.prototype, "textDecoration", {
        get: lt.Annotations.Core.AnnFont.prototype.get_textDecoration,
        set: lt.Annotations.Core.AnnFont.prototype.set_textDecoration,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnOperationInfoEventArgs = function (a, b) {
        this._role$1 = "";
        lt.Annotations.Core.AnnOperationInfoEventArgs.initializeBase(this);
        this._type$1 = a;
        this._annObject$1 = b
    };
    lt.Annotations.Core.AnnOperationInfoEventArgs.prototype = {
        _type$1: 0, get_type: function () {
            return this._type$1
        }, _annObject$1: null, get_annObject: function () {
            return this._annObject$1
        }, get_role: function () {
            return this._role$1
        }, set_role: function (a) {
            return this._role$1 = a
        }, _ignoreUserCheck$1: !1, get_ignoreUserCheck: function () {
            return this._ignoreUserCheck$1
        }, set_ignoreUserCheck: function (a) {
            return this._ignoreUserCheck$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnOperationInfoEventArgs.prototype,
        "type", {
            get: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.get_type,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnOperationInfoEventArgs.prototype, "annObject", {
        get: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.get_annObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnOperationInfoEventArgs.prototype, "role", {
        get: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.get_role,
        set: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.set_role,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnOperationInfoEventArgs.prototype, "ignoreUserCheck", {
        get: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.get_ignoreUserCheck,
        set: lt.Annotations.Core.AnnOperationInfoEventArgs.prototype.set_ignoreUserCheck,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnRoles = function () {
        this._elements = []
    };
    lt.Annotations.Core.AnnRoles.prototype = {
        get_count: function () {
            return this._elements.length
        }, clear: function () {
            this._elements.clear()
        },
        remove: function (a) {
            this.removeItem(a)
        }, add: function (a) {
            this._elements.add(a)
        }, contains: function (a) {
            return this._elements.contains(a)
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements[a] = b
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a,
                               b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c)
        }, removeAt: function (a) {
            this.removeItem(this.get_item(a))
        }, removeItem: function (a) {
            this._elements.remove(a)
        }, setItem: function (a, b) {
            this._elements[a] = b
        }, clearItems: function () {
            this._elements.clear()
        }, indexOf: function (a) {
            return this._elements.indexOf(a)
        }, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnRoles.prototype, "count", {
        get: lt.Annotations.Core.AnnRoles.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnGroupsRoles = function () {
        this._currentUser = "";
        this._groupUsers = {};
        this._groupRoles = {}
    };
    lt.Annotations.Core.AnnGroupsRoles.prototype = {
        add_generateRole: function (a) {
            this.__generateRole = ss.Delegate.combine(this.__generateRole, a)
        }, remove_generateRole: function (a) {
            this.__generateRole = ss.Delegate.remove(this.__generateRole, a)
        }, __generateRole_handler_get: function () {
            null ==
            this.__generateRole_handler && (this.__generateRole_handler = ss.EventHandler.create(this, this.add_generateRole, this.remove_generateRole));
            return this.__generateRole_handler
        }, __generateRole: null, __generateRole_handler: null, get_currentUser: function () {
            return this._currentUser
        }, set_currentUser: function (a) {
            return this._currentUser = a
        }, get_groupUsers: function () {
            return this._groupUsers
        }, get_groupRoles: function () {
            return this._groupRoles
        }, getUserGroup: function (a) {
            for (var b = [], c = ss.IEnumerator.getEnumerator(Object.keys(this._groupUsers)); c.moveNext();) {
                var d =
                    c.current;
                this._groupUsers[d].contains(a) && b.add(d)
            }
            return b
        }, getUserRoles: function (a) {
            var b = null, a = this.getUserGroup(a);
            if (1 === a.length)b = this._groupRoles[a[0]]; else {
                b = new lt.Annotations.Core.AnnRoles;
                for (a = ss.IEnumerator.getEnumerator(a); a.moveNext();) {
                    var c = a.current;
                    if (Object.keyExists(this._groupRoles, c))for (c = ss.IEnumerator.getEnumerator(this._groupRoles[c]); c.moveNext();) {
                        var d = c.current;
                        b.contains(d) || b.add(d)
                    }
                }
            }
            return b
        }, onGenerateRole: function (a) {
            var b = "";
            null != this.__generateRole && (this.__generateRole(this,
                a), b = a.get_role());
            if (String.isNullOrEmpty(b))switch (a.get_type()) {
                case 14:
                    b = "View";
                    break;
                default:
                    b = "Edit"
            }
            return b
        }, isCurrentUserInRole: function (a) {
            return this.isUserInRole(this.get_currentUser(), a)
        }, isUserInRole: function (a, b) {
            var c = !1;
            if (String.isNullOrEmpty(a) && 0 < Object.getKeyCount(this._groupUsers))return !1;
            var d = this.getUserRoles(a);
            if (d.contains("Full Control"))return !0;
            if (14 === b.get_type()) {
                if (d.contains("View All") || d.contains("Edit All") || d.contains("View") && a === b.get_annObject().get_userId())return !0
            } else if (!b.get_type() ||
                2 === b.get_type())if (d.contains("Edit All") || d.contains("Edit") && a === b.get_annObject().get_userId())return !0;
            if (null != d) {
                c = "";
                null != b && null != b.get_annObject() && (c = b.get_annObject().get_userId());
                var e = this.onGenerateRole(b);
                b.get_ignoreUserCheck();
                if ("View" === e && d.contains("View All") || "Edit" === e && d.contains("Edit All"))return !0;
                c = d.contains(e) && (b.get_ignoreUserCheck() ? !0 : String.isNullOrEmpty(c) || c === this.get_currentUser())
            }
            return c
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnGroupsRoles.prototype,
        "generateRole", {
            get: lt.Annotations.Core.AnnGroupsRoles.prototype.__generateRole_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnGroupsRoles.prototype, "currentUser", {
        get: lt.Annotations.Core.AnnGroupsRoles.prototype.get_currentUser,
        set: lt.Annotations.Core.AnnGroupsRoles.prototype.set_currentUser,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGroupsRoles.prototype, "groupUsers", {
        get: lt.Annotations.Core.AnnGroupsRoles.prototype.get_groupUsers,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnGroupsRoles.prototype, "groupRoles", {
        get: lt.Annotations.Core.AnnGroupsRoles.prototype.get_groupRoles,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnLabel = function () {
        this._stateId = "";
        this._font = new lt.Annotations.Core.AnnFont("Arial", 11);
        this._originalPosition = lt.Annotations.Core._leadPointDExtensions.get_empty();
        this._positionMode = 0;
        this._offset = lt.Annotations.Core._leadPointDExtensions.create(0, 0);
        this._foreground =
            lt.Annotations.Core.AnnSolidColorBrush.create("red");
        this._renderedLabelBounds = lt.Annotations.Core._leadRectDExtensions.get_empty();
        this._restrictionMode = 0;
        this._restrictionRectangle = lt.Annotations.Core._leadRectDExtensions.get_empty()
    };
    lt.Annotations.Core.AnnLabel.prototype = {
        clone: function () {
            var a = new lt.Annotations.Core.AnnLabel;
            a.set_font(null != this.get_font() ? this.get_font().clone() : null);
            a.set_text(this.get_text());
            a.set_originalPosition(lt.Annotations.Core._leadPointDExtensions.clone(this.get_originalPosition()));
            a.set_offset(lt.Annotations.Core._leadPointDExtensions.clone(this.get_offset()));
            a.set_background(null != this.get_background() ? this.get_background().clone() : null);
            a.set_foreground(null != this.get_foreground() ? this.get_foreground().clone() : null);
            a.set_isVisible(this.get_isVisible());
            a.set_restrictionRectangle(lt.Annotations.Core._leadRectDExtensions.clone(this._restrictionRectangle));
            a.set_restrictionMode(this._restrictionMode);
            a.set_positionMode(this._positionMode);
            a.set_parent(this._parent);
            a.set_offsetHeight(this._offsetHeight);
            this._font.add_propertyChanged(ss.Delegate.create(this, this._font_PropertyChanged));
            return a
        }, _font_PropertyChanged: function () {
            this._isDirty = !0
        }, _isDirty: !0, get__isDirty: function () {
            return this._isDirty
        }, set__isDirty: function (a) {
            return this._isDirty = a
        }, get_stateId: function () {
            return this._stateId
        }, set_stateId: function (a) {
            return this._stateId = a
        }, get_font: function () {
            return this._font
        }, set_font: function (a) {
            this._font !== a && (null != this._font && this._font.remove_propertyChanged(ss.Delegate.create(this, this._font_PropertyChanged)),
                this._font = a, null != this._font && this._font.add_propertyChanged(ss.Delegate.create(this, this._font_PropertyChanged)));
            return a
        }, _text: null, get_text: function () {
            return this._text
        }, set_text: function (a) {
            this._text !== a && (this._text = a, this._isDirty = this._isTextDirty = !0);
            return a
        }, get_originalPosition: function () {
            return lt.Annotations.Core._leadPointDExtensions.clone(this._originalPosition)
        }, set_originalPosition: function (a) {
            lt.Annotations.Core._leadPointDExtensions.isEqual(this._originalPosition, a) || (this._originalPosition =
                lt.Annotations.Core._leadPointDExtensions.clone(a), this._isDirty = !0);
            return a
        }, get_positionMode: function () {
            return this._positionMode
        }, set_positionMode: function (a) {
            return this._positionMode = a
        }, _parent: null, get_parent: function () {
            return this._parent
        }, set_parent: function (a) {
            return this._parent = a
        }, _offsetHeight: !1, get_offsetHeight: function () {
            return this._offsetHeight
        }, set_offsetHeight: function (a) {
            return this._offsetHeight = a
        }, get_offset: function () {
            return lt.Annotations.Core._leadPointDExtensions.clone(this._offset)
        },
        set_offset: function (a) {
            lt.Annotations.Core._leadPointDExtensions.isEqual(this._offset, a) || (this._offset = lt.Annotations.Core._leadPointDExtensions.clone(a), this._isDirty = !0);
            return a
        }, _background: null, get_background: function () {
            return this._background
        }, set_background: function (a) {
            this._background !== a && (this._background = a, this._isDirty = !0);
            return a
        }, get_foreground: function () {
            return this._foreground
        }, set_foreground: function (a) {
            return this._foreground = a
        }, _isVisible: !0, get_isVisible: function () {
            return this._isVisible
        },
        set_isVisible: function (a) {
            this._isVisible !== a && (this._isVisible = a, this._isDirty = !0);
            return a
        }, get_renderedLabelBounds: function () {
            return this._renderedLabelBounds
        }, set_renderedLabelBounds: function (a) {
            return this._renderedLabelBounds = a
        }, get_restrictionMode: function () {
            return this._restrictionMode
        }, set_restrictionMode: function (a) {
            this._restrictionMode !== a && (this._restrictionMode = a, this._isDirty = !0);
            return a
        }, get_restrictionRectangle: function () {
            return this._restrictionRectangle
        }, set_restrictionRectangle: function (a) {
            this._restrictionRectangle =
                a;
            this._isDirty = !0;
            return a
        }, _isTextDirty: !1, get__isTextDirty: function () {
            return this._isTextDirty
        }, set__isTextDirty: function (a) {
            return this._isTextDirty = a
        }, _internalData: null, get__internalData: function () {
            return this._internalData
        }, set__internalData: function (a) {
            return this._internalData = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "stateId", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_stateId,
        set: lt.Annotations.Core.AnnLabel.prototype.set_stateId,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "font", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_font,
        set: lt.Annotations.Core.AnnLabel.prototype.set_font,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "text", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_text,
        set: lt.Annotations.Core.AnnLabel.prototype.set_text,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "originalPosition", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_originalPosition,
        set: lt.Annotations.Core.AnnLabel.prototype.set_originalPosition, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "positionMode", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_positionMode,
        set: lt.Annotations.Core.AnnLabel.prototype.set_positionMode,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "parent", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_parent, set: lt.Annotations.Core.AnnLabel.prototype.set_parent,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "offsetHeight", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_offsetHeight,
        set: lt.Annotations.Core.AnnLabel.prototype.set_offsetHeight,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "offset", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_offset,
        set: lt.Annotations.Core.AnnLabel.prototype.set_offset,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype,
        "background", {
            get: lt.Annotations.Core.AnnLabel.prototype.get_background,
            set: lt.Annotations.Core.AnnLabel.prototype.set_background,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "foreground", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_foreground,
        set: lt.Annotations.Core.AnnLabel.prototype.set_foreground,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "isVisible", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_isVisible,
        set: lt.Annotations.Core.AnnLabel.prototype.set_isVisible, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "renderedLabelBounds", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_renderedLabelBounds,
        set: lt.Annotations.Core.AnnLabel.prototype.set_renderedLabelBounds,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "restrictionMode", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_restrictionMode,
        set: lt.Annotations.Core.AnnLabel.prototype.set_restrictionMode,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLabel.prototype, "restrictionRectangle", {
        get: lt.Annotations.Core.AnnLabel.prototype.get_restrictionRectangle,
        set: lt.Annotations.Core.AnnLabel.prototype.set_restrictionRectangle,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnLayerCollection = function (a) {
        this._elements = [];
        this._owner = a
    };
    lt.Annotations.Core.AnnLayerCollection.prototype = {
        _owner: null, get_owner: function () {
            return this._owner
        }, get_count: function () {
            return this._elements.length
        },
        clear: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, remove: function (a) {
            this.removeItem(a)
        }, add: function (a) {
            a.set_parent(this._owner);
            this._elements.add(a);
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            b.get_newItems().add(a);
            this.onCollectionChanged(b)
        }, contains: function (a) {
            return this._elements.contains(a)
        },
        getEnumerator: function () {
            return this._elements.getEnumerator()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements[a] = b;
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a,
                               b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(3))
        }, onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeAt: function (a) {
            this.removeItem(this.get_item(a))
        }, removeItem: function (a) {
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(1);
            b.get_newItems().add(a);
            a.set_parent(null);
            this._elements.remove(a);
            this.onCollectionChanged(b)
        },
        setItem: function (a, b) {
            this._elements[a] = b;
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(2))
        }, clearItems: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, indexOf: function (a) {
            return this._elements.indexOf(a)
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged,
                a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, sendToBack: function (a, b) {
            if (null != a) {
                var c = this.indexOf(a);
                0 <= c && (this.remove(a), c = b ?
                    this.get_count() : c + 1, c < this.get_count() ? this.insertItem(c, a) : this.add(a))
            }
        }, bringToFront: function (a, b) {
            var c = this.indexOf(a);
            if (-1 !== c && c <= this.get_count() - 1) {
                this.remove(a);
                if (!b && (c -= 1, 0 < c)) {
                    this.insertItem(c, a);
                    return
                }
                this.insertItem(0, a)
            }
        }, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLayerCollection.prototype, "owner", {
        get: lt.Annotations.Core.AnnLayerCollection.prototype.get_owner,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayerCollection.prototype, "count", {
        get: lt.Annotations.Core.AnnLayerCollection.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayerCollection.prototype, "collectionChanged", {
        get: lt.Annotations.Core.AnnLayerCollection.prototype.__collectionChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core._myLayerObjectCollection = function () {
        lt.Annotations.Core._myLayerObjectCollection.initializeBase(this)
    };
    lt.Annotations.Core._myLayerObjectCollection._create = function (a) {
        var b = new lt.Annotations.Core._myLayerObjectCollection;
        b._owner$1 = a;
        return b
    };
    lt.Annotations.Core._myLayerObjectCollection.prototype = {
        _owner$1: null, get_owner: function () {
            return this._owner$1
        }, insertItem: function (a, b) {
            null != b && b.set_layer(this._owner$1);
            lt.Annotations.Core._myLayerObjectCollection.callBaseMethod(this, "insertItem", [a, b])
        }, removeItem: function (a) {
            a.set_layer(null);
            lt.Annotations.Core._myLayerObjectCollection.callBaseMethod(this,
                "removeItem", [a])
        }
    };
    lt.Annotations.Core.AnnLayer = function () {
        this._layers = new lt.Annotations.Core.AnnLayerCollection(this);
        this._children = lt.Annotations.Core._myLayerObjectCollection._create(this)
    };
    lt.Annotations.Core.AnnLayer.create = function (a) {
        var b = new lt.Annotations.Core.AnnLayer;
        b.set_name(a);
        return b
    };
    lt.Annotations.Core.AnnLayer.prototype = {
        _parent: null, get_parent: function () {
            return this._parent
        }, set_parent: function (a) {
            return this._parent = a
        }, _name: null, get_name: function () {
            return this._name
        }, set_name: function (a) {
            return this._name =
                a
        }, _layerId: null, get_layerId: function () {
            return this._layerId
        }, set_layerId: function (a) {
            return this._layerId = a
        }, _visible: !0, get_isVisible: function () {
            return this._visible
        }, set_isVisible: function (a) {
            return this._visible = a
        }, _children: null, get_children: function () {
            return this._children
        }, _layers: null, get_layers: function () {
            return this._layers
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype, "parent", {
        get: lt.Annotations.Core.AnnLayer.prototype.get_parent, set: lt.Annotations.Core.AnnLayer.prototype.set_parent,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype, "name", {
        get: lt.Annotations.Core.AnnLayer.prototype.get_name,
        set: lt.Annotations.Core.AnnLayer.prototype.set_name,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype, "layerId", {
        get: lt.Annotations.Core.AnnLayer.prototype.get_layerId,
        set: lt.Annotations.Core.AnnLayer.prototype.set_layerId,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype,
        "isVisible", {
            get: lt.Annotations.Core.AnnLayer.prototype.get_isVisible,
            set: lt.Annotations.Core.AnnLayer.prototype.set_isVisible,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype, "children", {
        get: lt.Annotations.Core.AnnLayer.prototype.get_children,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnLayer.prototype, "layers", {
        get: lt.Annotations.Core.AnnLayer.prototype.get_layers,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnMedia =
        function () {
        };
    lt.Annotations.Core.AnnMedia.prototype = {
        clone: function () {
            var a = new lt.Annotations.Core.AnnMedia;
            a._source1 = this._source1;
            a._type1 = this._type1;
            a._source2 = this._source2;
            a._type2 = this._type2;
            a._source3 = this._source3;
            a._type3 = this._type3;
            return a
        }, _source1: null, get_source1: function () {
            return this._source1
        }, set_source1: function (a) {
            return this._source1 = a
        }, _type1: null, get_type1: function () {
            return this._type1
        }, set_type1: function (a) {
            return this._type1 = a
        }, _source2: null, get_source2: function () {
            return this._source2
        },
        set_source2: function (a) {
            return this._source2 = a
        }, _type2: null, get_type2: function () {
            return this._type2
        }, set_type2: function (a) {
            return this._type2 = a
        }, _source3: null, get_source3: function () {
            return this._source3
        }, set_source3: function (a) {
            return this._source3 = a
        }, _type3: null, get_type3: function () {
            return this._type3
        }, set_type3: function (a) {
            return this._type3 = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype, "source1", {
        get: lt.Annotations.Core.AnnMedia.prototype.get_source1,
        set: lt.Annotations.Core.AnnMedia.prototype.set_source1,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype, "type1", {
        get: lt.Annotations.Core.AnnMedia.prototype.get_type1,
        set: lt.Annotations.Core.AnnMedia.prototype.set_type1,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype, "source2", {
        get: lt.Annotations.Core.AnnMedia.prototype.get_source2,
        set: lt.Annotations.Core.AnnMedia.prototype.set_source2,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype,
        "type2", {
            get: lt.Annotations.Core.AnnMedia.prototype.get_type2,
            set: lt.Annotations.Core.AnnMedia.prototype.set_type2,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype, "source3", {
        get: lt.Annotations.Core.AnnMedia.prototype.get_source3,
        set: lt.Annotations.Core.AnnMedia.prototype.set_source3,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnMedia.prototype, "type3", {
        get: lt.Annotations.Core.AnnMedia.prototype.get_type3, set: lt.Annotations.Core.AnnMedia.prototype.set_type3,
        enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnObjectCollection = function () {
        this._elements = []
    };
    lt.Annotations.Core.AnnObjectCollection.prototype = {
        get_count: function () {
            return this._elements.length
        }, clear: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, remove: function (a) {
            this.removeItem(a)
        }, add: function (a) {
            this._elements.add(a);
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            b.get_newItems().add(a);
            this.onCollectionChanged(b)
        }, contains: function (a) {
            return this._elements.contains(a)
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements.insert(a,
                b);
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(3))
        }, onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeAt: function (a) {
            this.removeItem(this.get_item(a))
        },
        removeItem: function (a) {
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(1);
            b.get_newItems().add(a);
            this._elements.remove(a);
            this.onCollectionChanged(b)
        }, setItem: function (a, b) {
            this._elements[a] = b;
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(2))
        }, clearItems: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, indexOf: function (a) {
            return this._elements.indexOf(a)
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged, a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, sendToBack: function (a, b) {
            if (null != a) {
                var c = this.indexOf(a);
                0 <= c && (a.set_internalAdd(!0), this.remove(a), c = b ? this.get_count() : c + 1, c < this.get_count() ? this.insertItem(c, a) : (a.set_internalAdd(!0), this.add(a)))
            }
        }, bringToFront: function (a, b) {
            a.set_internalAdd(!0);
            var c = this.indexOf(a);
            if (-1 !== c && c <= this.get_count() - 1) {
                this.remove(a);
                if (!b && (c -= 1, 0 < c)) {
                    this.insertItem(c, a);
                    return
                }
                this.insertItem(0, a)
            }
            a.set_internalAdd(!1)
        },
        get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnObjectCollection.prototype, "count", {
        get: lt.Annotations.Core.AnnObjectCollection.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnObjectCollection.prototype, "collectionChanged", {
        get: lt.Annotations.Core.AnnObjectCollection.prototype.__collectionChanged_handler_get,
        enumerable: !0, configurable: !0
    });
    lt.Annotations.Core.AnnPicture = function (a) {
        this._source = a
    };
    lt.Annotations.Core.AnnPicture.get_empty = function () {
        return new lt.Annotations.Core.AnnPicture("")
    };
    lt.Annotations.Core.AnnPicture.prototype = {
        _isDirty: !1, get_isDirty: function () {
            return this._isDirty
        }, set_isDirty: function (a) {
            return this._isDirty = a
        }, _isLoaded: !1, get_isLoaded: function () {
            return this._isLoaded
        }, set_isLoaded: function (a) {
            return this._isLoaded = a
        }, _internalData: null, get_internalData: function () {
            return this._internalData
        },
        set_internalData: function (a) {
            return this._internalData = a
        }, _source: null, get_source: function () {
            return this._source
        }, set_source: function (a) {
            return this._source = a
        }, _pictureData: null, get_pictureData: function () {
            return this._pictureData
        }, set_pictureData: function (a) {
            return this._pictureData = a
        }, clone: function () {
            var a = new lt.Annotations.Core.AnnPicture(this._source);
            a._pictureData = this._pictureData;
            return a
        }, _width: 0, get_width: function () {
            return this._width
        }, set_width: function (a) {
            return this._width = a
        }, _height: 0,
        get_height: function () {
            return this._height
        }, set_height: function (a) {
            return this._height = a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "isDirty", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_isDirty,
        set: lt.Annotations.Core.AnnPicture.prototype.set_isDirty,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "isLoaded", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_isLoaded,
        set: lt.Annotations.Core.AnnPicture.prototype.set_isLoaded,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "internalData", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_internalData,
        set: lt.Annotations.Core.AnnPicture.prototype.set_internalData,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "source", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_source,
        set: lt.Annotations.Core.AnnPicture.prototype.set_source,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype,
        "pictureData", {
            get: lt.Annotations.Core.AnnPicture.prototype.get_pictureData,
            set: lt.Annotations.Core.AnnPicture.prototype.set_pictureData,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "width", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_width,
        set: lt.Annotations.Core.AnnPicture.prototype.set_width,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture.prototype, "height", {
        get: lt.Annotations.Core.AnnPicture.prototype.get_height,
        set: lt.Annotations.Core.AnnPicture.prototype.set_height, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnPicture, "empty", {
        get: lt.Annotations.Core.AnnPicture.get_empty,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.LeadPointCollection = function () {
        this._elements = []
    };
    lt.Annotations.Core.LeadPointCollection.prototype = {
        get_count: function () {
            return this._elements.length
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, contains: function (a) {
            return this._elements.contains(a)
        },
        removeAt: function (a) {
            this._elements.removeAt(a)
        }, add: function (a) {
            this._elements.add(a)
        }, clear: function () {
            this._elements.clear()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements[a] = b;
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(0);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        },
        move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(3))
        }, onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeItem: function (a) {
            this._elements.remove(a);
            var b = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(1);
            b.get_oldItems().add(a);
            this.onCollectionChanged(b)
        },
        setItem: function () {
        }, clearItems: function () {
            for (var a = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(4), b = ss.IEnumerator.getEnumerator(this._elements); b.moveNext();) {
                var c = b.current;
                a.get_newItems().add(c)
            }
            this._elements.clear();
            this.onCollectionChanged(a)
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged, a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null ==
            this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Core.LeadPointCollection.prototype, "count",
        {get: lt.Annotations.Core.LeadPointCollection.prototype.get_count, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Core.LeadPointCollection.prototype, "collectionChanged", {
        get: lt.Annotations.Core.LeadPointCollection.prototype.__collectionChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnResources = function () {
        this._images = [];
        this._rubberStamps = {}
    };
    lt.Annotations.Core.AnnResources.prototype = {
        get_images: function () {
            return this._images
        }, get_rubberStamps: function () {
            return this._rubberStamps
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnResources.prototype, "images", {
        get: lt.Annotations.Core.AnnResources.prototype.get_images,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnResources.prototype, "rubberStamps", {
        get: lt.Annotations.Core.AnnResources.prototype.get_rubberStamps,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnReview = function () {
        this._replies = []
    };
    lt.Annotations.Core.AnnReview.prototype = {
        clone: function () {
            var a = new lt.Annotations.Core.AnnReview;
            a._author =
                this._author;
            a._date = this._date;
            a._status = this._status;
            a._isChecked = this._isChecked;
            a._comment = this._comment;
            for (var b = ss.IEnumerator.getEnumerator(this._replies); b.moveNext();) {
                var c = b.current;
                null != c ? a._replies.add(c.clone()) : a._replies.add(null)
            }
            return a
        }, _author: null, get_author: function () {
            return this._author
        }, set_author: function (a) {
            return this._author = a
        }, _date: null, get_date: function () {
            return this._date
        }, set_date: function (a) {
            return this._date = a
        }, _status: null, get_status: function () {
            return this._status
        },
        set_status: function (a) {
            return this._status = a
        }, _isChecked: !1, get_isChecked: function () {
            return this._isChecked
        }, set_isChecked: function (a) {
            return this._isChecked = a
        }, _comment: null, get_comment: function () {
            return this._comment
        }, set_comment: function (a) {
            return this._comment = a
        }, get_replies: function () {
            return this._replies
        }, toString: function () {
            return String.format("{0} at {1}", this._status, this._date.toDateString())
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype, "author", {
        get: lt.Annotations.Core.AnnReview.prototype.get_author,
        set: lt.Annotations.Core.AnnReview.prototype.set_author, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype, "date", {
        get: lt.Annotations.Core.AnnReview.prototype.get_date,
        set: lt.Annotations.Core.AnnReview.prototype.set_date,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype, "status", {
        get: lt.Annotations.Core.AnnReview.prototype.get_status,
        set: lt.Annotations.Core.AnnReview.prototype.set_status,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype, "isChecked", {
        get: lt.Annotations.Core.AnnReview.prototype.get_isChecked,
        set: lt.Annotations.Core.AnnReview.prototype.set_isChecked,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype, "comment", {
        get: lt.Annotations.Core.AnnReview.prototype.get_comment,
        set: lt.Annotations.Core.AnnReview.prototype.set_comment,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnReview.prototype,
        "replies", {get: lt.Annotations.Core.AnnReview.prototype.get_replies, enumerable: !0, configurable: !0});
    lt.Annotations.Core.AnnSnapToGridOptions = function () {
        this._gridStroke = lt.Annotations.Core.AnnStroke.create(lt.Annotations.Core.AnnSolidColorBrush.create("blue"), lt.Annotations.Core._leadLengthDExtensions.create(1))
    };
    lt.Annotations.Core.AnnSnapToGridOptions.prototype = {
        add_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.combine(this.__propertyChanged, a)
        }, remove_propertyChanged: function (a) {
            this.__propertyChanged =
                ss.Delegate.remove(this.__propertyChanged, a)
        }, __propertyChanged_handler_get: function () {
            null == this.__propertyChanged_handler && (this.__propertyChanged_handler = ss.EventHandler.create(this, this.add_propertyChanged, this.remove_propertyChanged));
            return this.__propertyChanged_handler
        }, __propertyChanged: null, __propertyChanged_handler: null, clone: function () {
            var a = new lt.Annotations.Core.AnnSnapToGridOptions;
            a.set_gridStroke(this._gridStroke);
            a.set_gridLength(this._gridLength);
            a.set_lineSpacing(this._lineSpacing);
            a.set_enableSnap(this._enableSnap);
            a.set_showGrid(this._showGrid);
            a.set_opacity(this._opacity);
            return a
        }, get_gridStroke: function () {
            return this._gridStroke
        }, set_gridStroke: function (a) {
            if (this._gridStroke !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("GridStroke", 1, this._gridStroke, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._gridStroke = a, this.onPropertyChanged(b))
            }
            return a
        }, _gridLength: 20, get_gridLength: function () {
            return this._gridLength
        }, set_gridLength: function (a) {
            if (this._gridLength !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("GridLength", 1, this._gridLength, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._gridLength = a, this.onPropertyChanged(b))
            }
            return a
        }, _lineSpacing: 5, get_lineSpacing: function () {
            return this._lineSpacing
        }, set_lineSpacing: function (a) {
            if (this._lineSpacing !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("LineSpacing", 1, this._lineSpacing, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._lineSpacing =
                    a, this.onPropertyChanged(b))
            }
            return a
        }, _enableSnap: !1, get_enableSnap: function () {
            return this._enableSnap
        }, set_enableSnap: function (a) {
            if (this._enableSnap !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("EnableSnap", 1, this._enableSnap, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._enableSnap = a, this.onPropertyChanged(b))
            }
            return a
        }, _showGrid: !1, get_showGrid: function () {
            return this._showGrid
        }, set_showGrid: function (a) {
            if (this._showGrid !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("ShowGrid",
                    1, this._showGrid, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._showGrid = a, this.onPropertyChanged(b))
            }
            return a
        }, _opacity: 1, get_opacity: function () {
            return this._opacity
        }, set_opacity: function (a) {
            (lt.LeadDoubleTools.lessThan(a, 0) || lt.LeadDoubleTools.greaterThan(a, 1)) && lt.Annotations.Core.ExceptionHelper.argumentOutOfRangeException("Opacity", a, "Must be a value greater than or equals to 0 and less than or equals to 1");
            if (this._opacity !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Opacity",
                    1, this._opacity, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._opacity = a, this.onPropertyChanged(b))
            }
            return a
        }, onPropertyChanged: function (a) {
            null != this.__propertyChanged && this.__propertyChanged(this, a)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype, "propertyChanged", {
        get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.__propertyChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype,
        "gridStroke", {
            get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_gridStroke,
            set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_gridStroke,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype, "gridLength", {
        get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_gridLength,
        set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_gridLength,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype,
        "lineSpacing", {
            get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_lineSpacing,
            set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_lineSpacing,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype, "enableSnap", {
        get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_enableSnap,
        set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_enableSnap,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype,
        "showGrid", {
            get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_showGrid,
            set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_showGrid,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnSnapToGridOptions.prototype, "opacity", {
        get: lt.Annotations.Core.AnnSnapToGridOptions.prototype.get_opacity,
        set: lt.Annotations.Core.AnnSnapToGridOptions.prototype.set_opacity,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnStroke = function () {
        this._strokeAlignment = 0
    };
    lt.Annotations.Core.AnnStroke.create =
        function (a, b) {
            var c = new lt.Annotations.Core.AnnStroke;
            c.set_stroke(a);
            c.set_strokeThickness(b);
            c.set_strokeLineJoin(2);
            c.set_strokeEndLineCap(2);
            c.set_strokeStartLineCap(2);
            return c
        };
    lt.Annotations.Core.AnnStroke.prototype = {
        add_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.combine(this.__propertyChanged, a)
        }, remove_propertyChanged: function (a) {
            this.__propertyChanged = ss.Delegate.remove(this.__propertyChanged, a)
        }, __propertyChanged_handler_get: function () {
            null == this.__propertyChanged_handler &&
            (this.__propertyChanged_handler = ss.EventHandler.create(this, this.add_propertyChanged, this.remove_propertyChanged));
            return this.__propertyChanged_handler
        }, __propertyChanged: null, __propertyChanged_handler: null, onPropertyChanged: function (a) {
            null != this.__propertyChanged && this.__propertyChanged(this, a)
        }, _stroke: null, get_stroke: function () {
            return this._stroke
        }, set_stroke: function (a) {
            if (this._stroke !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("Stroke", 1, this._stroke, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._stroke = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeDashArray: null, get_strokeDashArray: function () {
            return this._strokeDashArray
        }, set_strokeDashArray: function (a) {
            if (this._strokeDashArray !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeDashArray", 1, this._strokeDashArray, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeDashArray = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeDashCap: 0, get_strokeDashCap: function () {
            return this._strokeDashCap
        },
        set_strokeDashCap: function (a) {
            if (this._strokeDashCap !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeDashCap", 1, this._strokeDashCap, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeDashCap = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeDashOffset: 0, get_strokeDashOffset: function () {
            return this._strokeDashOffset
        }, set_strokeDashOffset: function (a) {
            if (this._strokeDashOffset !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeDashOffset", 1,
                    this._strokeDashOffset, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeDashOffset = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeEndLineCap: 0, get_strokeEndLineCap: function () {
            return this._strokeEndLineCap
        }, set_strokeEndLineCap: function (a) {
            if (this._strokeEndLineCap !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeEndLineCap", 1, this._strokeEndLineCap, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeEndLineCap = a, this.onPropertyChanged(b))
            }
            return a
        },
        _strokeLineJoin: 0, get_strokeLineJoin: function () {
            return this._strokeLineJoin
        }, set_strokeLineJoin: function (a) {
            if (this._strokeLineJoin !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeLineJoin", 1, this._strokeLineJoin, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeLineJoin = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeMiterLimit: 0, get_strokeMiterLimit: function () {
            return this._strokeMiterLimit
        }, set_strokeMiterLimit: function (a) {
            if (this._strokeMiterLimit !==
                a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeMiterLimit", 1, this._strokeMiterLimit, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeMiterLimit = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeStartLineCap: 0, get_strokeStartLineCap: function () {
            return this._strokeStartLineCap
        }, set_strokeStartLineCap: function (a) {
            if (this._strokeStartLineCap !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeStartLineCap", 1, this._strokeStartLineCap, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeStartLineCap = a, this.onPropertyChanged(b))
            }
            return a
        }, _strokeThickness: null, get_strokeThickness: function () {
            return this._strokeThickness
        }, set_strokeThickness: function (a) {
            if (!lt.Annotations.Core._leadLengthDExtensions.isEqual(this._strokeThickness, a)) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeThickness", 1, this._strokeThickness, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeThickness = a, this.onPropertyChanged(b))
            }
            return a
        },
        get_strokeAlignment: function () {
            return this._strokeAlignment
        }, set_strokeAlignment: function (a) {
            if (this._strokeAlignment !== a) {
                var b = new lt.Annotations.Core.AnnPropertyChangedEventArgs("StrokeAlignment", 1, this._strokeAlignment, a);
                this.onPropertyChanged(b);
                b.get_cancel() || (b.set_status(0), this._strokeAlignment = a, this.onPropertyChanged(b))
            }
            return a
        }, clone: function () {
            var a = new lt.Annotations.Core.AnnStroke;
            null != this.get_stroke() && a.set_stroke(this.get_stroke().clone());
            null != this.get_strokeThickness() &&
            a.set_strokeThickness(lt.Annotations.Core._leadLengthDExtensions.clone(this.get_strokeThickness()));
            a.set_strokeDashCap(this.get_strokeDashCap());
            a.set_strokeDashOffset(this.get_strokeDashOffset());
            a.set_strokeEndLineCap(this.get_strokeEndLineCap());
            a.set_strokeLineJoin(this.get_strokeLineJoin());
            a.set_strokeMiterLimit(this.get_strokeMiterLimit());
            a.set_strokeStartLineCap(this.get_strokeStartLineCap());
            a.set_strokeAlignment(this.get_strokeAlignment());
            if (null != this.get_strokeDashArray()) {
                a.set_strokeDashArray(Array(this.get_strokeDashArray().length));
                for (var b = 0; b < this.get_strokeDashArray().length; ++b)a.get_strokeDashArray()[b] = this.get_strokeDashArray()[b]
            }
            return a
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "propertyChanged", {
        get: lt.Annotations.Core.AnnStroke.prototype.__propertyChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "stroke", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_stroke,
        set: lt.Annotations.Core.AnnStroke.prototype.set_stroke,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeDashArray", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeDashArray,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeDashArray,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeDashCap", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeDashCap,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeDashCap,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype,
        "strokeDashOffset", {
            get: lt.Annotations.Core.AnnStroke.prototype.get_strokeDashOffset,
            set: lt.Annotations.Core.AnnStroke.prototype.set_strokeDashOffset,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeEndLineCap", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeEndLineCap,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeEndLineCap,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeLineJoin",
        {
            get: lt.Annotations.Core.AnnStroke.prototype.get_strokeLineJoin,
            set: lt.Annotations.Core.AnnStroke.prototype.set_strokeLineJoin,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeMiterLimit", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeMiterLimit,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeMiterLimit,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeStartLineCap", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeStartLineCap,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeStartLineCap, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeThickness", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeThickness,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeThickness,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnStroke.prototype, "strokeAlignment", {
        get: lt.Annotations.Core.AnnStroke.prototype.get_strokeAlignment,
        set: lt.Annotations.Core.AnnStroke.prototype.set_strokeAlignment,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnThickness = function (a, b, c, d) {
        this._bottom = d;
        this._left = a;
        this._top = b;
        this._right = c
    };
    lt.Annotations.Core.AnnThickness.prototype = {
        _bottom: 0, get_bottom: function () {
            return this._bottom
        }, set_bottom: function (a) {
            return this._bottom = a
        }, _left: 0, get_left: function () {
            return this._left
        }, set_left: function (a) {
            return this._left = a
        }, _top: 0, get_top: function () {
            return this._top
        }, set_top: function (a) {
            return this._top = a
        }, _right: 0, get_right: function () {
            return this._right
        },
        set_right: function (a) {
            return this._right = a
        }, clone: function () {
            return new lt.Annotations.Core.AnnThickness(this._left, this._top, this._right, this._bottom)
        }
    };
    Object.defineProperty(lt.Annotations.Core.AnnThickness.prototype, "bottom", {
        get: lt.Annotations.Core.AnnThickness.prototype.get_bottom,
        set: lt.Annotations.Core.AnnThickness.prototype.set_bottom,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnThickness.prototype, "left", {
        get: lt.Annotations.Core.AnnThickness.prototype.get_left,
        set: lt.Annotations.Core.AnnThickness.prototype.set_left, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnThickness.prototype, "top", {
        get: lt.Annotations.Core.AnnThickness.prototype.get_top,
        set: lt.Annotations.Core.AnnThickness.prototype.set_top,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Core.AnnThickness.prototype, "right", {
        get: lt.Annotations.Core.AnnThickness.prototype.get_right,
        set: lt.Annotations.Core.AnnThickness.prototype.set_right,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Core.AnnTransformer = function () {
    };
    lt.Annotations.Core.AnnTransformer.rotatePointAt = function (a, b, c, d) {
        var a = lt.Annotations.Core.AnnTransformer.translatePoint(a, -c, -d), e = lt.Annotations.Core.Utils.degreesToRadian(b), b = Math.sin(e), e = Math.cos(e), a = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() * e - a.get_y() * b, a.get_x() * b + a.get_y() * e);
        return a = lt.Annotations.Core.AnnTransformer.translatePoint(a, c, d)
    };
    lt.Annotations.Core.AnnTransformer.rotateRect = function (a, b) {
        if (lt.Annotations.Core.AnnDouble.isNaN(b) || !b)return lt.Annotations.Core._leadRectDExtensions.clone(a);
        var c = Array(2);
        c[0] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y());
        c[1] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height());
        for (var d = 0; d < c.length; ++d)c[d] = lt.Annotations.Core.AnnTransformer.rotatePointAt(c[d], b, a.get_x() + a.get_width() / 2, a.get_y() + a.get_height() / 2);
        var d = Math.min(c[0].get_x(), c[1].get_x()), e = Math.min(c[0].get_y(), c[1].get_y()), f = Math.max(c[0].get_x(), c[1].get_x()),
            c = Math.max(c[0].get_y(), c[1].get_y());
        return lt.Annotations.Core._leadRectDExtensions.create(d, e, f - d, c - e)
    };
    lt.Annotations.Core.AnnTransformer.rotateRectAt = function (a, b, c, d) {
        var e = Array(4);
        e[0] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(), a.get_y());
        e[1] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y());
        e[2] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + a.get_width(), a.get_y() + a.get_height());
        e[3] = lt.Annotations.Core._leadPointDExtensions.create(a.get_x(),
            a.get_y() + a.get_height());
        for (a = 0; a < e.length; ++a)e[a] = lt.Annotations.Core.AnnTransformer.rotatePointAt(e[a], b, c, d);
        b = e[0].get_x();
        c = e[0].get_y();
        d = e[2].get_x() - e[0].get_x();
        a = e[2].get_y() - e[0].get_y();
        0 > d && (b = e[0].get_x() + d, d = Math.abs(d));
        0 > a && (c = e[0].get_y() + a, a = Math.abs(a));
        return lt.Annotations.Core._leadRectDExtensions.create(b, c, d, a)
    };
    lt.Annotations.Core.AnnTransformer.rotatePoint = function (a, b) {
        return lt.Annotations.Core.AnnTransformer.rotatePointAt(a, b, a.get_x(), a.get_y())
    };
    lt.Annotations.Core.AnnTransformer.scalePoint =
        function (a, b, c) {
            return lt.Annotations.Core.AnnTransformer.scalePointAt(a, b, c, 0, 0)
        };
    lt.Annotations.Core.AnnTransformer.scalePointAt = function (a, b, c, d, e) {
        return lt.Annotations.Core._leadPointDExtensions.create(d - (d - a.get_x()) * b, e - (e - a.get_y()) * c)
    };
    lt.Annotations.Core.AnnTransformer.translatePoint = function (a, b, c) {
        return lt.Annotations.Core._leadPointDExtensions.create(a.get_x() + b, a.get_y() + c)
    };
    lt.Annotations.Core.AnnTransformer.scalePointsAt = function (a, b, c, d, e) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
        for (var f = Array(a.length), g = 0; g < a.length; ++g)f[g] = lt.Annotations.Core.AnnTransformer.scalePointAt(a[g], b, c, d, e);
        return f
    };
    lt.Annotations.Core.AnnTransformer.rotatePoints = function (a, b) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
        for (var c = Array(a.length), d = 0; d < a.length; ++d)c[d] = lt.Annotations.Core.AnnTransformer.rotatePointAt(a[d], b, a[d].get_x(), a[d].get_y());
        return c
    };
    lt.Annotations.Core.AnnTransformer.rotateAtPoints = function (a, b, c, d) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
        for (var e = Array(a.length), f = 0; f < a.length; ++f)e[f] = lt.Annotations.Core.AnnTransformer.rotatePointAt(a[f], b, c, d);
        return e
    };
    lt.Annotations.Core.AnnTransformer.translatePoints = function (a, b, c) {
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("points");
        for (var d = Array(a.length), e = 0; e < a.length; ++e)d[e] = lt.Annotations.Core.AnnTransformer.translatePoint(a[e], b, c);
        return d
    };
    lt.Annotations.Core._lT_VersionNumber.registerClass("lt.Annotations.Core._lT_VersionNumber");
    lt.Annotations.Core._leadRectDExtensions.registerClass("lt.Annotations.Core._leadRectDExtensions");
    lt.Annotations.Core._leadPointDExtensions.registerClass("lt.Annotations.Core._leadPointDExtensions");
    lt.Annotations.Core._leadLengthDExtensions.registerClass("lt.Annotations.Core._leadLengthDExtensions");
    lt.Annotations.Core._leadSizeDExtensions.registerClass("lt.Annotations.Core._leadSizeDExtensions");
    lt.Annotations.Core.AnnUnitConverter.registerClass("lt.Annotations.Core.AnnUnitConverter");
    lt.Annotations.Core.AnnXmlHelper.registerClass("lt.Annotations.Core.AnnXmlHelper");
    lt.Annotations.Core.ExceptionHelper.registerClass("lt.Annotations.Core.ExceptionHelper");
    lt.Annotations.Core.PolyPoint.registerClass("lt.Annotations.Core.PolyPoint");
    lt.Annotations.Core.RulerMetadata.registerClass("lt.Annotations.Core.RulerMetadata");
    lt.Annotations.Core.RulerHelper.registerClass("lt.Annotations.Core.RulerHelper");
    lt.Annotations.Core._encryptTable.registerClass("lt.Annotations.Core._encryptTable");
    lt.Annotations.Core._arC4.registerClass("lt.Annotations.Core._arC4");
    lt.Annotations.Core._randomGenerator.registerClass("lt.Annotations.Core._randomGenerator");
    lt.Annotations.Core.ScrambleImage.registerClass("lt.Annotations.Core.ScrambleImage");
    lt.Annotations.Core.Utils.registerClass("lt.Annotations.Core.Utils");
    lt.Annotations.Core._annOnLoadData.registerClass("lt.Annotations.Core._annOnLoadData");
    lt.Annotations.Core.AnnCodecsInfo.registerClass("lt.Annotations.Core.AnnCodecsInfo");
    lt.Annotations.Core.AnnSerializeObjectEventArgs.registerClass("lt.Annotations.Core.AnnSerializeObjectEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnSerializeOptions.registerClass("lt.Annotations.Core.AnnSerializeOptions");
    lt.Annotations.Core.AnnDeserializeOptions.registerClass("lt.Annotations.Core.AnnDeserializeOptions");
    lt.Annotations.Core.AnnCodecs.registerClass("lt.Annotations.Core.AnnCodecs");
    lt.Annotations.Core.AnnContainer.registerClass("lt.Annotations.Core.AnnContainer");
    lt.Annotations.Core.AnnContainerMapper.registerClass("lt.Annotations.Core.AnnContainerMapper");
    lt.Annotations.Core.AnnObject.registerClass("lt.Annotations.Core.AnnObject", null, lt.Annotations.Core.IAnnObjectCloneable);
    lt.Annotations.Core.AnnRectangleObject.registerClass("lt.Annotations.Core.AnnRectangleObject", lt.Annotations.Core.AnnObject);
    lt.Annotations.Core.AnnImageObject.registerClass("lt.Annotations.Core.AnnImageObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnHotspotObject.registerClass("lt.Annotations.Core.AnnHotspotObject", lt.Annotations.Core.AnnImageObject);
    lt.Annotations.Core.AnnMediaObject.registerClass("lt.Annotations.Core.AnnMediaObject", lt.Annotations.Core.AnnHotspotObject);
    lt.Annotations.Core.AnnAudioObject.registerClass("lt.Annotations.Core.AnnAudioObject", lt.Annotations.Core.AnnMediaObject);
    lt.Annotations.Core._parameters.registerClass("lt.Annotations.Core._parameters");
    lt.Annotations.Core.AnnPolylineObject.registerClass("lt.Annotations.Core.AnnPolylineObject", lt.Annotations.Core.AnnObject);
    lt.Annotations.Core.AnnPolyRulerObject.registerClass("lt.Annotations.Core.AnnPolyRulerObject", lt.Annotations.Core.AnnPolylineObject);
    lt.Annotations.Core.AnnCrossProductObject.registerClass("lt.Annotations.Core.AnnCrossProductObject", lt.Annotations.Core.AnnPolyRulerObject);
    lt.Annotations.Core.AnnCurveObject.registerClass("lt.Annotations.Core.AnnCurveObject", lt.Annotations.Core.AnnPolylineObject);
    lt.Annotations.Core.AnnEllipseObject.registerClass("lt.Annotations.Core.AnnEllipseObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnEncryptObject.registerClass("lt.Annotations.Core.AnnEncryptObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnFreehandHotspotObject.registerClass("lt.Annotations.Core.AnnFreehandHotspotObject", lt.Annotations.Core.AnnPolylineObject);
    lt.Annotations.Core.AnnGroupObject.registerClass("lt.Annotations.Core.AnnGroupObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnHiliteObject.registerClass("lt.Annotations.Core.AnnHiliteObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnTextObject.registerClass("lt.Annotations.Core.AnnTextObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnNoteObject.registerClass("lt.Annotations.Core.AnnNoteObject", lt.Annotations.Core.AnnTextObject);
    lt.Annotations.Core.AnnPointerObject.registerClass("lt.Annotations.Core.AnnPointerObject", lt.Annotations.Core.AnnPolylineObject);
    lt.Annotations.Core.AnnPointObject.registerClass("lt.Annotations.Core.AnnPointObject",
        lt.Annotations.Core.AnnObject);
    lt.Annotations.Core.AnnProtractorObject.registerClass("lt.Annotations.Core.AnnProtractorObject", lt.Annotations.Core.AnnPolyRulerObject);
    lt.Annotations.Core.AnnRedactionObject.registerClass("lt.Annotations.Core.AnnRedactionObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnRubberStampObject.registerClass("lt.Annotations.Core.AnnRubberStampObject", lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnSelectionObject.registerClass("lt.Annotations.Core.AnnSelectionObject",
        lt.Annotations.Core.AnnRectangleObject);
    lt.Annotations.Core.AnnStampObject.registerClass("lt.Annotations.Core.AnnStampObject", lt.Annotations.Core.AnnTextObject);
    lt.Annotations.Core.AnnStickyNoteObject.registerClass("lt.Annotations.Core.AnnStickyNoteObject", lt.Annotations.Core.AnnObject);
    lt.Annotations.Core.AnnTextReviewObject.registerClass("lt.Annotations.Core.AnnTextReviewObject", lt.Annotations.Core.AnnObject);
    lt.Annotations.Core.AnnTextHiliteObject.registerClass("lt.Annotations.Core.AnnTextHiliteObject",
        lt.Annotations.Core.AnnTextReviewObject);
    lt.Annotations.Core.AnnTextPointerObject.registerClass("lt.Annotations.Core.AnnTextPointerObject", lt.Annotations.Core.AnnTextObject);
    lt.Annotations.Core.AnnTextRedactionObject.registerClass("lt.Annotations.Core.AnnTextRedactionObject", lt.Annotations.Core.AnnTextReviewObject);
    lt.Annotations.Core.AnnTextRollupObject.registerClass("lt.Annotations.Core.AnnTextRollupObject", lt.Annotations.Core.AnnNoteObject);
    lt.Annotations.Core.AnnTextStrikeoutObject.registerClass("lt.Annotations.Core.AnnTextStrikeoutObject",
        lt.Annotations.Core.AnnTextReviewObject);
    lt.Annotations.Core.AnnTextUnderlineObject.registerClass("lt.Annotations.Core.AnnTextUnderlineObject", lt.Annotations.Core.AnnTextReviewObject);
    lt.Annotations.Core.AnnLoadPictureEventArgs.registerClass("lt.Annotations.Core.AnnLoadPictureEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnRenderingEngine.registerClass("lt.Annotations.Core.AnnRenderingEngine");
    lt.Annotations.Core.AnnDrawDesignerEventArgs.registerClass("lt.Annotations.Core.AnnDrawDesignerEventArgs",
        lt.LeadEventArgs);
    lt.Annotations.Core.AnnEditDesignerEventArgs.registerClass("lt.Annotations.Core.AnnEditDesignerEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnEditContentEventArgs.registerClass("lt.Annotations.Core.AnnEditContentEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnEditTextEventArgs.registerClass("lt.Annotations.Core.AnnEditTextEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnLockObjectEventArgs.registerClass("lt.Annotations.Core.AnnLockObjectEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnPointerEventArgs.registerClass("lt.Annotations.Core.AnnPointerEventArgs",
        lt.LeadEventArgs);
    lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.registerClass("lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnObjectCollectionEventArgs.registerClass("lt.Annotations.Core.AnnObjectCollectionEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnPropertyChangedEventArgs.registerClass("lt.Annotations.Core.AnnPropertyChangedEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnRunDesignerEventArgs.registerClass("lt.Annotations.Core.AnnRunDesignerEventArgs",
        lt.LeadEventArgs);
    lt.Annotations.Core.AnnToolTipEventArgs.registerClass("lt.Annotations.Core.AnnToolTipEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnBrush.registerClass("lt.Annotations.Core.AnnBrush");
    lt.Annotations.Core.AnnSolidColorBrush.registerClass("lt.Annotations.Core.AnnSolidColorBrush", lt.Annotations.Core.AnnBrush);
    lt.Annotations.Core.AnnHatchBrush.registerClass("lt.Annotations.Core.AnnHatchBrush", lt.Annotations.Core.AnnBrush);
    lt.Annotations.Core.AnnGradientStop.registerClass("lt.Annotations.Core.AnnGradientStop");
    lt.Annotations.Core.AnnGradientBrush.registerClass("lt.Annotations.Core.AnnGradientBrush", lt.Annotations.Core.AnnBrush);
    lt.Annotations.Core.AnnLinearGradientBrush.registerClass("lt.Annotations.Core.AnnLinearGradientBrush", lt.Annotations.Core.AnnGradientBrush);
    lt.Annotations.Core.AnnContainerCollection.registerClass("lt.Annotations.Core.AnnContainerCollection");
    lt.Annotations.Core.AnnGradientStopCollection.registerClass("lt.Annotations.Core.AnnGradientStopCollection");
    lt.Annotations.Core.AnnDataProvider.registerClass("lt.Annotations.Core.AnnDataProvider");
    lt.Annotations.Core.AnnDouble.registerClass("lt.Annotations.Core.AnnDouble");
    lt.Annotations.Core.AnnFont.registerClass("lt.Annotations.Core.AnnFont");
    lt.Annotations.Core.AnnOperationInfoEventArgs.registerClass("lt.Annotations.Core.AnnOperationInfoEventArgs", lt.LeadEventArgs);
    lt.Annotations.Core.AnnRoles.registerClass("lt.Annotations.Core.AnnRoles");
    lt.Annotations.Core.AnnGroupsRoles.registerClass("lt.Annotations.Core.AnnGroupsRoles");
    lt.Annotations.Core.AnnLabel.registerClass("lt.Annotations.Core.AnnLabel");
    lt.Annotations.Core.AnnLayerCollection.registerClass("lt.Annotations.Core.AnnLayerCollection");
    lt.Annotations.Core.AnnObjectCollection.registerClass("lt.Annotations.Core.AnnObjectCollection");
    lt.Annotations.Core._myLayerObjectCollection.registerClass("lt.Annotations.Core._myLayerObjectCollection", lt.Annotations.Core.AnnObjectCollection);
    lt.Annotations.Core.AnnLayer.registerClass("lt.Annotations.Core.AnnLayer");
    lt.Annotations.Core.AnnMedia.registerClass("lt.Annotations.Core.AnnMedia");
    lt.Annotations.Core.AnnPicture.registerClass("lt.Annotations.Core.AnnPicture");
    lt.Annotations.Core.LeadPointCollection.registerClass("lt.Annotations.Core.LeadPointCollection");
    lt.Annotations.Core.AnnResources.registerClass("lt.Annotations.Core.AnnResources");
    lt.Annotations.Core.AnnReview.registerClass("lt.Annotations.Core.AnnReview");
    lt.Annotations.Core.AnnSnapToGridOptions.registerClass("lt.Annotations.Core.AnnSnapToGridOptions");
    lt.Annotations.Core.AnnStroke.registerClass("lt.Annotations.Core.AnnStroke");
    lt.Annotations.Core.AnnThickness.registerClass("lt.Annotations.Core.AnnThickness");
    lt.Annotations.Core.AnnTransformer.registerClass("lt.Annotations.Core.AnnTransformer");
    lt.Annotations.Core._lT_VersionNumber.l_VER_PRODUCT = "LEADTOOLS\u00ae for JavaScript";
    lt.Annotations.Core._lT_VersionNumber.l_VER_COMPANYNAME_STR = "LEAD Technologies, Inc.";
    lt.Annotations.Core._lT_VersionNumber.l_VER_LEGALTRADEMARKS_STR = "LEADTOOLS\u00ae is a trademark of LEAD Technologies, Inc.";
    lt.Annotations.Core._lT_VersionNumber.l_VER_LEGALCOPYRIGHT_STR = "\u00a9 1991-2017 LEAD Technologies, Inc.";
    lt.Annotations.Core._lT_VersionNumber.l_VER_DLLEXT =
        ".dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_EXEEXT = ".exe";
    lt.Annotations.Core._lT_VersionNumber.l_VER_PLATFORM = "";
    lt.Annotations.Core._lT_VersionNumber.l_VER_PLATFORM_FOR = "";
    lt.Annotations.Core._lT_VersionNumber.l_VER_PRODUCTNAME_STR = "LEADTOOLS\u00ae for JavaScript";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_XXX = "Leadtools.Xxx.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_XXX = "LEADTOOLS Xxx";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_KERNEL =
        "lt.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_KERNEL = "Leadtools";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CONTROLS = "lt.Controls.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CONTROLS = "Controls";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_DOCUMENTS_UI = "lt.Documents.UI.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_DOCUMENTS_UI = "Documents User Interface";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CONTROLS_MEDICAL =
        "lt.Controls.Medical.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CONTROLS_MEDICAL = "Medical Controls";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_DOCUMENTS = "lt.Documents.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_DOCUMENTS = "Documents";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_CORE = "lt.Annotations.Core.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_CORE = "Annotations Core";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_AUTOMATION = "lt.Annotations.Automation.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_AUTOMATION = "Annotations Automation";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_DESIGNERS = "lt.Annotations.Designers.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_DESIGNERS = "Annotations Designers";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_RENDERING =
        "lt.Annotations.Rendering.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_RENDERING = "Annotations Rendering";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CCOW = "Leadtools.Ccow.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CCOW = "Leadtools CCOW Library";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_DOCUMENTS = "Leadtools.Annotations.Documents.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_DOCUMENTS =
        "Annotations Documents";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_LEGACY = "Leadtools.Annotations.Legacy.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_LEGACY = "Annotations Legacy";
    lt.Annotations.Core._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_JAVASCRIPT = "Leadtools.Annotations.JavaScript.dll";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_JAVASCRIPT = "JavaScripot Annotations";
    lt.Annotations.Core._lT_VersionNumber.l_VER_PRODUCTVERSION_DOT_STR =
        "19.0.0.0";
    lt.Annotations.Core._lT_VersionNumber.l_VER_FILEVERSION_DOT_STR = "19.0.0.51";
    lt.Annotations.Core.AnnUnitConverter._unitRatio = [720, 100, 300, 1, 25.400000025908, 1, 25.400000025908, 72, 0.0833333333333333, 0.0277777777777778, 25400, 2.5400000025908, 0.025400000025908, 1440];
    lt.Annotations.Core.AnnUnitConverter._unitsAbbreveations = "Units,display,document,,,In,mm,pt,ft,yd,\u00b5,cm,m,twips,pixels".split(",");
    lt.Annotations.Core.AnnUnitConverter._angularUnitsabbreveation = ["Rad", "\u00b0"];
    lt.Annotations.Core.AnnUnitConverter._smartEnglishMaximumUnit =
        3;
    lt.Annotations.Core.AnnUnitConverter._smartMetricMaximumUnit = 4;
    lt.Annotations.Core.AnnXmlHelper.annObjectType = "Object";
    lt.Annotations.Core.AnnXmlHelper.annAnnotationsType = "Annotations";
    lt.Annotations.Core.AnnXmlHelper.annVersionType = "Version";
    lt.Annotations.Core.AnnXmlHelper.annContainerType = "Container";
    lt.Annotations.Core.AnnXmlHelper.annContainerSize = "Size";
    lt.Annotations.Core.AnnXmlHelper.annContainerOffset = "Offset";
    lt.Annotations.Core.AnnXmlHelper.annContainerPageNumberType = "PageNumber";
    lt.Annotations.Core.AnnXmlHelper.annChildrenType =
        "Objects";
    lt.Annotations.Core.AnnXmlHelper.annLabelType = "Label";
    lt.Annotations.Core.AnnXmlHelper.annLabelsType = "Labels";
    lt.Annotations.Core.AnnXmlHelper.leadPointType = "Point";
    lt.Annotations.Core.AnnXmlHelper.annThicknessType = "Thickness";
    lt.Annotations.Core.AnnXmlHelper.annSolidColorBrushType = "SolidColorBrush";
    lt.Annotations.Core.AnnXmlHelper.annHatchBrushType = "AnnHatchBrush";
    lt.Annotations.Core.AnnXmlHelper.leadPointsType = "Points";
    lt.Annotations.Core.AnnXmlHelper.annStrokeType = "Stroke";
    lt.Annotations.Core.AnnXmlHelper.annSelectionStrokeType =
        "SelectionStroke";
    lt.Annotations.Core.AnnXmlHelper.metadata = "Metadata";
    lt.Annotations.Core.AnnXmlHelper.reviews = "Reviews";
    lt.Annotations.Core.AnnXmlHelper.userId = "UserId";
    lt.Annotations.Core.AnnXmlHelper.isLocked = "IsLocked";
    lt.Annotations.Core.AnnXmlHelper.objectTag = "ObjectTag";
    lt.Annotations.Core.AnnXmlHelper.password = "Password";
    lt.Annotations.Core.AnnXmlHelper.groupName = "GroupName";
    lt.Annotations.Core.AnnXmlHelper.hyperlink = "Hyperlink";
    lt.Annotations.Core.AnnXmlHelper.fixedStateOperations = "FixedStateOperations";
    lt.Annotations.Core.AnnXmlHelper.rotateGripper = "RotateGripper";
    lt.Annotations.Core.AnnXmlHelper.rotateCenter = "RotateCenter";
    lt.Annotations.Core.AnnXmlHelper.isSelected = "IsSelected";
    lt.Annotations.Core.AnnXmlHelper.type = "ObjectType";
    lt.Annotations.Core.AnnXmlHelper.arrowLength = "ArrowLength";
    lt.Annotations.Core.AnnXmlHelper.arrowPosition = "ArrowPosition";
    lt.Annotations.Core.AnnXmlHelper.shadowBorderWidth = "ShadowBorderWidth";
    lt.Annotations.Core.AnnXmlHelper.tension = "Tension";
    lt.Annotations.Core.AnnXmlHelper.familyName =
        "FamilyName";
    lt.Annotations.Core.AnnXmlHelper.size = "Size";
    lt.Annotations.Core.AnnXmlHelper.stretch = "Stretch";
    lt.Annotations.Core.AnnXmlHelper.weight = "Weight";
    lt.Annotations.Core.AnnXmlHelper.style = "Style";
    lt.Annotations.Core.AnnXmlHelper.textDecoration = "TextDecoration";
    lt.Annotations.Core.AnnXmlHelper.fill = "Fill";
    lt.Annotations.Core.AnnXmlHelper.color = "Color";
    lt.Annotations.Core.AnnXmlHelper.foregroundColor = "ForegroundColor";
    lt.Annotations.Core.AnnXmlHelper.backgroundColor = "BackgroundColor";
    lt.Annotations.Core.AnnXmlHelper.annHatchStyle =
        "AnnHatchStyle";
    lt.Annotations.Core.AnnXmlHelper.x = "X";
    lt.Annotations.Core.AnnXmlHelper.y = "Y";
    lt.Annotations.Core.AnnXmlHelper.width = "Width";
    lt.Annotations.Core.AnnXmlHelper.height = "Height";
    lt.Annotations.Core.AnnXmlHelper.isVisible = "IsVisible";
    lt.Annotations.Core.AnnXmlHelper.isEnabled = "IsEnabled";
    lt.Annotations.Core.AnnXmlHelper.isRestricted = "IsRestricted";
    lt.Annotations.Core.AnnXmlHelper.originalPosition = "OriginalPosition";
    lt.Annotations.Core.AnnXmlHelper.offset = "Offset";
    lt.Annotations.Core.AnnXmlHelper.font =
        "Font";
    lt.Annotations.Core.AnnXmlHelper.isClosed = "IsClosed";
    lt.Annotations.Core.AnnXmlHelper.fillRule = "FillRule";
    lt.Annotations.Core.AnnXmlHelper.tickMarksStroke = "TickMarksStroke";
    lt.Annotations.Core.AnnXmlHelper.measurementUnit = "MeasurementUnit";
    lt.Annotations.Core.AnnXmlHelper.tickMarksLength = "TickMarksLength";
    lt.Annotations.Core.AnnXmlHelper.showTickMarks = "ShowTickMarks";
    lt.Annotations.Core.AnnXmlHelper.showTickValue = "ShowTickValue";
    lt.Annotations.Core.AnnXmlHelper.gaugeLength = "GaugeLength";
    lt.Annotations.Core.AnnXmlHelper.showGauge =
        "ShowGauge";
    lt.Annotations.Core.AnnXmlHelper.precision = "Precision";
    lt.Annotations.Core.AnnXmlHelper.acute = "Acute";
    lt.Annotations.Core.AnnXmlHelper.showArc = "ShowArc";
    lt.Annotations.Core.AnnXmlHelper.angularUnit = "AngularUnit";
    lt.Annotations.Core.AnnXmlHelper.anglePrecision = "AnglePrecision";
    lt.Annotations.Core.AnnXmlHelper.arcRadius = "ArcRadius";
    lt.Annotations.Core.AnnXmlHelper.rubberStampType = "RubberStampType";
    lt.Annotations.Core.AnnXmlHelper.text = "Text";
    lt.Annotations.Core.AnnXmlHelper.textRotate = "TextRotate";
    lt.Annotations.Core.AnnXmlHelper.horizontalAlignment = "HorizontalAlignment";
    lt.Annotations.Core.AnnXmlHelper.verticalAlignment = "VerticalAlignment";
    lt.Annotations.Core.AnnXmlHelper.textBackground = "Background";
    lt.Annotations.Core.AnnXmlHelper.textForeground = "Foreground";
    lt.Annotations.Core.AnnXmlHelper.pointerPosition = "PointerPosition";
    lt.Annotations.Core.AnnXmlHelper.fixedPointer = "FixedPointer";
    lt.Annotations.Core.AnnXmlHelper.expanded = "Expanded";
    lt.Annotations.Core.AnnXmlHelper.redactImageData = "RedactImageData";
    lt.Annotations.Core.AnnXmlHelper.dashCap = "DashCap";
    lt.Annotations.Core.AnnXmlHelper.miterLimit = "MiterLimit";
    lt.Annotations.Core.AnnXmlHelper.startLineCap = "StartLineCap";
    lt.Annotations.Core.AnnXmlHelper.endLineCap = "EndLineCap";
    lt.Annotations.Core.AnnXmlHelper.lineJoin = "LineJoin";
    lt.Annotations.Core.AnnXmlHelper.dashArray = "Dashes";
    lt.Annotations.Core.AnnXmlHelper.dashOffset = "DashOffset";
    lt.Annotations.Core.AnnXmlHelper.dashSize = "DashSize";
    lt.Annotations.Core.AnnXmlHelper.showPicture = "ShowPicture";
    lt.Annotations.Core.AnnXmlHelper.picture =
        "Picture";
    lt.Annotations.Core.AnnXmlHelper.pictureData = "PictureData";
    lt.Annotations.Core.AnnXmlHelper.pictureSource = "PictureSource";
    lt.Annotations.Core.AnnXmlHelper.pictureWidth = "PictureWidth";
    lt.Annotations.Core.AnnXmlHelper.pictureHeight = "PictureHeight";
    lt.Annotations.Core.AnnXmlHelper.labelKey = "Key";
    lt.Annotations.Core.AnnXmlHelper.unitAbbreviation = "UnitAbbreviation";
    lt.Annotations.Core.AnnXmlHelper.angularUnitAbbreviation = "AngularUnitAbbreviation";
    lt.Annotations.Core.AnnXmlHelper.annCalibrationScale =
        "CalibrationScale";
    lt.Annotations.Core.AnnXmlHelper.radius = "Radius";
    lt.Annotations.Core.AnnXmlHelper.annContainerUserData = "UserData";
    lt.Annotations.Core.AnnXmlHelper.media = "Media";
    lt.Annotations.Core.AnnXmlHelper.mediaSource1 = "Source1";
    lt.Annotations.Core.AnnXmlHelper.mediaType1 = "MediaType1";
    lt.Annotations.Core.AnnXmlHelper.mediaSource2 = "Source2";
    lt.Annotations.Core.AnnXmlHelper.mediaType2 = "MediaType2";
    lt.Annotations.Core.AnnXmlHelper.mediaSource3 = "Source3";
    lt.Annotations.Core.AnnXmlHelper.mediaType3 =
        "MediaType3";
    lt.Annotations.Core.AnnXmlHelper.key = "Key";
    lt.Annotations.Core.AnnXmlHelper.primaryPicture = "PrimaryPicture";
    lt.Annotations.Core.AnnXmlHelper.secondaryPicture = "SecondaryPicture";
    lt.Annotations.Core.AnnXmlHelper.encryptor = "Encryptor";
    lt.Annotations.Core.AnnXmlHelper.isEncrypted = "IsEncrypted";
    lt.Annotations.Core.AnnXmlHelper.objectId = "ObjectId";
    lt.Annotations.Core.AnnXmlHelper.annLayers = "Layers";
    lt.Annotations.Core.AnnXmlHelper.annLayer = "Layer";
    lt.Annotations.Core.AnnXmlHelper.annLayerName =
        "Name";
    lt.Annotations.Core.AnnXmlHelper.annLayerId = "Id";
    lt.Annotations.Core.AnnXmlHelper.annObjectLayerId = "LayerId";
    lt.Annotations.Core.AnnXmlHelper.assemblyName = "AssemblyName";
    lt.Annotations.Core.AnnXmlHelper.wordWrap = "WordWrap";
    lt.Annotations.Core.AnnXmlHelper.opacity = "Opacity";
    lt.Annotations.Core.AnnXmlHelper.dictionaryItem = "Item";
    lt.Annotations.Core.AnnXmlHelper.dictionaryKey = "Key";
    lt.Annotations.Core.AnnXmlHelper.dictionaryValue = "Value";
    lt.Annotations.Core.AnnXmlHelper.reviewItem = "Review";
    lt.Annotations.Core.AnnXmlHelper.reviewAuthorItem =
        "Author";
    lt.Annotations.Core.AnnXmlHelper.reviewDateItem = "Date";
    lt.Annotations.Core.AnnXmlHelper.reviewStatusItem = "Status";
    lt.Annotations.Core.AnnXmlHelper.reviewIsCheckedItem = "IsChecked";
    lt.Annotations.Core.AnnXmlHelper.reviewCommentItem = "Comment";
    lt.Annotations.Core.AnnXmlHelper.reviewRepliesItem = "Replies";
    lt.Annotations.Core.AnnXmlHelper.canScale = "CanScale";
    lt.Annotations.Core.AnnXmlHelper.canTranslate = "CanTranslate";
    lt.Annotations.Core.AnnXmlHelper.onLoad = "OnLoad";
    lt.Annotations.Core.AnnXmlHelper.rotateAngle =
        "RotateAngle";
    lt.Annotations.Core.AnnXmlHelper.scaleX = "ScaleX";
    lt.Annotations.Core.AnnXmlHelper.scaleY = "ScaleY";
    lt.Annotations.Core.AnnXmlHelper.left = "Left";
    lt.Annotations.Core.AnnXmlHelper.right = "Right";
    lt.Annotations.Core.AnnXmlHelper.top = "Top";
    lt.Annotations.Core.AnnXmlHelper.bottom = "Bottom";
    lt.Annotations.Core.AnnXmlHelper.padding = "Padding";
    lt.Annotations.Core.AnnXmlHelper.offsetHeight = "OffsetHeight";
    lt.Annotations.Core.AnnXmlHelper.strokeAlignment = "StrokeAlignment";
    lt.Annotations.Core.AnnXmlHelper.labelRestriction =
        "LabelRestriction";
    lt.Annotations.Core.AnnXmlHelper.drawShadow = "DrawShadow";
    lt.Annotations.Core.AnnXmlHelper.calibrationUnit = "CalibrationUnit";
    lt.Annotations.Core.RulerHelper._micrometersPerMeter = 1E6;
    lt.Annotations.Core.RulerHelper._micrometersPerCm = 1E4;
    lt.Annotations.Core.Utils.doubleDelta = 1.0E-6;
    lt.Annotations.Core.Utils._checkModifierCallback = null;
    lt.Annotations.Core.AnnContainerMapper._unit = 1 / 720;
    lt.Annotations.Core.AnnCrossProductObject.firstRulerHitTestObject = "FirstRuler";
    lt.Annotations.Core.AnnCrossProductObject.secondRulerHitTestObject =
        "SecondRuler";
    lt.Annotations.Core.AnnObject.none = -1E3;
    lt.Annotations.Core.AnnObject.groupObjectId = 0;
    lt.Annotations.Core.AnnObject.selectObjectId = -1;
    lt.Annotations.Core.AnnObject.lineObjectId = -2;
    lt.Annotations.Core.AnnObject.rectangleObjectId = -3;
    lt.Annotations.Core.AnnObject.ellipseObjectId = -4;
    lt.Annotations.Core.AnnObject.polylineObjectId = -5;
    lt.Annotations.Core.AnnObject.polygonObjectId = -6;
    lt.Annotations.Core.AnnObject.curveObjectId = -7;
    lt.Annotations.Core.AnnObject.closedCurveObjectId = -8;
    lt.Annotations.Core.AnnObject.pointerObjectId = -9;
    lt.Annotations.Core.AnnObject.freehandObjectId = -10;
    lt.Annotations.Core.AnnObject.hiliteObjectId = -11;
    lt.Annotations.Core.AnnObject.textObjectId = -12;
    lt.Annotations.Core.AnnObject.textRollupObjectId = -13;
    lt.Annotations.Core.AnnObject.textPointerObjectId = -14;
    lt.Annotations.Core.AnnObject.noteObjectId = -15;
    lt.Annotations.Core.AnnObject.stampObjectId = -16;
    lt.Annotations.Core.AnnObject.rubberStampObjectId = -17;
    lt.Annotations.Core.AnnObject.hotspotObjectId = -18;
    lt.Annotations.Core.AnnObject.freehandHotspotObjectId = -19;
    lt.Annotations.Core.AnnObject.buttonObjectId = -20;
    lt.Annotations.Core.AnnObject.pointObjectId = -21;
    lt.Annotations.Core.AnnObject.redactionObjectId = -22;
    lt.Annotations.Core.AnnObject.rulerObjectId = -23;
    lt.Annotations.Core.AnnObject.polyRulerObjectId = -24;
    lt.Annotations.Core.AnnObject.protractorObjectId = -25;
    lt.Annotations.Core.AnnObject.crossProductObjectId = -26;
    lt.Annotations.Core.AnnObject.encryptObjectId = -27;
    lt.Annotations.Core.AnnObject.audioObjectId = -28;
    lt.Annotations.Core.AnnObject.richTextObjectId = -29;
    lt.Annotations.Core.AnnObject.mediaObjectId = -30;
    lt.Annotations.Core.AnnObject.imageObjectId = -31;
    lt.Annotations.Core.AnnObject.stickyNoteObjectId = -32;
    lt.Annotations.Core.AnnObject.textHiliteObjectId = -33;
    lt.Annotations.Core.AnnObject.textStrikeoutObjectId = -34;
    lt.Annotations.Core.AnnObject.textUnderlineObjectId = -35;
    lt.Annotations.Core.AnnObject.textRedactionObjectId = -36;
    lt.Annotations.Core.AnnObject.userObjectId = 1;
    lt.Annotations.Core.AnnObject.subjectMetadataKey = "Subject";
    lt.Annotations.Core.AnnObject.authorMetadataKey =
        "Author";
    lt.Annotations.Core.AnnObject.modifiedMetadataKey = "Modified";
    lt.Annotations.Core.AnnObject.titleMetadataKey = "Title";
    lt.Annotations.Core.AnnObject.contentMetadataKey = "Content";
    lt.Annotations.Core.AnnObject.createdMetadataKey = "Created";
    lt.Annotations.Core.AnnObject._rotateGripperOriginal = 240;
    lt.Annotations.Core.AnnRenderingEngine._containerLabelRenderer = null;
    lt.Annotations.Core.AnnDouble.naN = 0 / 0;
    lt.Annotations.Core.AnnDouble.positiveInfinity = 1 / 0;
    lt.Annotations.Core.AnnDouble.negativeInfinity =
        -1 / 0;
    lt.Annotations.Core.AnnRoles.view = "View";
    lt.Annotations.Core.AnnRoles.edit = "Edit";
    lt.Annotations.Core.AnnRoles.viewAll = "View All";
    lt.Annotations.Core.AnnRoles.editAll = "Edit All";
    lt.Annotations.Core.AnnRoles.fullControl = "Full Control";
    lt.Annotations.Core.AnnReview.none = "None";
    lt.Annotations.Core.AnnReview.created = "Created";
    lt.Annotations.Core.AnnReview.modified = "Modified";
    lt.Annotations.Core.AnnReview.cancelled = "Cancelled";
    lt.Annotations.Core.AnnReview.rejected = "Rejected";
    lt.Annotations.Core.AnnReview.accepted =
        "Accepted";
    lt.Annotations.Core.AnnReview.completed = "Completed";
    lt.Annotations.Core.AnnReview.reply = "Reply"
})();
