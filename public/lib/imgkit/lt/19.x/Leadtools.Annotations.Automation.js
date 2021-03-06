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
// Leadtools.Annotations.Automation.js
// Version:19.0.0.15
(function () {
    Type.registerNamespace("lt.Annotations.Automation");
    window.lt.Annotations.Automation._lT_VersionNumber = function () {
    };
    lt.Annotations.Automation._leadRectDExtensions = function () {
    };
    lt.Annotations.Automation._leadRectDExtensions.inflate = function (a, b, c) {
        a.inflate(b, c);
        return a
    };
    lt.Annotations.Automation._leadRectDExtensions.intersectRects = function (a, b) {
        return lt.LeadRectD.intersectRects(a, b)
    };
    lt.Annotations.Automation._leadRectDExtensions.intersectsWith = function (a, b) {
        var c = !1;
        return c = a.intersectsWith(b)
    };
    lt.Annotations.Automation._leadRectDExtensions.create = function (a, b, c, d) {
        return lt.LeadRectD.create(a, b, c, d)
    };
    lt.Annotations.Automation._leadRectDExtensions.unionRects = function (a, b) {
        return lt.LeadRectD.unionRects(a, b)
    };
    lt.Annotations.Automation._leadRectDExtensions.unionPoint = function (a, b) {
        return lt.Annotations.Automation._leadRectDExtensions.unionRects(a, lt.LeadRectD.create(b.get_x(), b.get_y(), 0, 0))
    };
    lt.Annotations.Automation._leadRectDExtensions.clone = function (a) {
        return a.clone()
    };
    lt.Annotations.Automation._leadRectDExtensions.isEmpty =
        function (a) {
            return a.get_isEmpty()
        };
    lt.Annotations.Automation._leadRectDExtensions.fromLTRB = function (a, b, c, d) {
        return lt.LeadRectD.fromLTRB(a, b, c, d)
    };
    lt.Annotations.Automation._leadRectDExtensions.get_empty = function () {
        return lt.LeadRectD.get_empty()
    };
    lt.Annotations.Automation._leadRectDExtensions.containsRect = function (a, b) {
        return a.containsRect(b)
    };
    lt.Annotations.Automation._leadRectDExtensions.containsPoint = function (a, b) {
        return a.containsPoint(b)
    };
    lt.Annotations.Automation._leadRectDExtensions.topLeft =
        function (a) {
            return a.get_topLeft()
        };
    lt.Annotations.Automation._leadRectDExtensions.topRight = function (a) {
        return a.get_topRight()
    };
    lt.Annotations.Automation._leadRectDExtensions.bottomLeft = function (a) {
        return a.get_bottomLeft()
    };
    lt.Annotations.Automation._leadRectDExtensions.bottomRight = function (a) {
        return a.get_bottomRight()
    };
    lt.Annotations.Automation._leadRectDExtensions.top = function (a) {
        return a.get_top()
    };
    lt.Annotations.Automation._leadRectDExtensions.left = function (a) {
        return a.get_left()
    };
    lt.Annotations.Automation._leadRectDExtensions.bottom =
        function (a) {
            return a.get_bottom()
        };
    lt.Annotations.Automation._leadRectDExtensions.right = function (a) {
        return a.get_right()
    };
    lt.Annotations.Automation._leadRectDExtensions.equals = function (a, b) {
        return a === b
    };
    lt.Annotations.Automation._leadPointDExtensions = function () {
    };
    lt.Annotations.Automation._leadPointDExtensions.create = function (a, b) {
        return lt.LeadPointD.create(a, b)
    };
    lt.Annotations.Automation._leadPointDExtensions.isEqual = function (a, b) {
        return a === b
    };
    lt.Annotations.Automation._leadPointDExtensions.clone =
        function (a) {
            return a.clone()
        };
    lt.Annotations.Automation._leadPointDExtensions.get_empty = function () {
        return lt.LeadPointD.get_empty()
    };
    lt.Annotations.Automation._leadPointDExtensions.isEmpty = function (a) {
        return a.get_isEmpty()
    };
    lt.Annotations.Automation._leadLengthDExtensions = function () {
    };
    lt.Annotations.Automation._leadLengthDExtensions.isEqual = function (a, b) {
        return a === b
    };
    lt.Annotations.Automation._leadLengthDExtensions.create = function (a) {
        return lt.LeadLengthD.create(a)
    };
    lt.Annotations.Automation._leadLengthDExtensions.clone =
        function (a) {
            return a.clone()
        };
    lt.Annotations.Automation._leadSizeDExtensions = function () {
    };
    lt.Annotations.Automation._leadSizeDExtensions.create = function (a, b) {
        return lt.LeadSizeD.create(a, b)
    };
    lt.Annotations.Automation._leadSizeDExtensions.clone = function (a) {
        return a.clone()
    };
    lt.Annotations.Automation._leadSizeDExtensions.get_empty = function () {
        return lt.LeadSizeD.get_empty()
    };
    lt.Annotations.Automation._leadSizeDExtensions.isEmpty = function (a) {
        return a.get_isEmpty()
    };
    lt.Annotations.Automation.AnnDesignerType =
        function () {
        };
    lt.Annotations.Automation.AnnDesignerType.prototype = {none: 0, draw: 1, run: 2, edit: 3};
    lt.Annotations.Automation.AnnDesignerType.registerEnum("lt.Annotations.Automation.AnnDesignerType", !1);
    lt.Annotations.Automation.AnnDragDropOperation = function () {
    };
    lt.Annotations.Automation.AnnDragDropOperation.prototype = {enter: 0, leave: 1, over: 2, drop: 3};
    lt.Annotations.Automation.AnnDragDropOperation.registerEnum("lt.Annotations.Automation.AnnDragDropOperation", !1);
    lt.Annotations.Automation.AnnObjectChangedType =
        function () {
        };
    lt.Annotations.Automation.AnnObjectChangedType.prototype = {
        none: 0,
        bringToFront: 1,
        sendToBack: 2,
        deleted: 3,
        lock: 4,
        unlock: 5,
        paste: 6,
        flip: 7,
        realizeRedaction: 8,
        restoreRedaction: 9,
        applyEncryptor: 10,
        applyDecryptor: 11,
        name: 12,
        hyperlink: 13,
        text: 14,
        picture: 15,
        pictures: 16,
        ruler: 17,
        stroke: 18,
        fill: 19,
        font: 20,
        encrypt: 21,
        polygon: 22,
        curve: 23,
        protractor: 24,
        rubberStamp: 25,
        point: 26,
        audio: 27,
        thumbs: 28,
        hilite: 29,
        designerDraw: 30,
        designerEdit: 31,
        resetRotatePoints: 32,
        fixed: 33,
        added: 34,
        modified: 35,
        metadata: 36
    };
    lt.Annotations.Automation.AnnObjectChangedType.registerEnum("lt.Annotations.Automation.AnnObjectChangedType", !1);
    lt.Annotations.Automation.IAnnPackage = function () {
    };
    lt.Annotations.Automation.IAnnPackage.prototype = {
        get_author: null,
        get_description: null,
        get_friendlyName: null,
        getAutomationObjects: null
    };
    lt.Annotations.Automation.IAnnPackage.registerInterface("lt.Annotations.Automation.IAnnPackage");
    lt.Annotations.Automation.AnnAutomationUndoRedoObject = function () {
    };
    lt.Annotations.Automation.AnnAutomationUndoRedoObject.prototype =
    {
        _undoRedo: null, get__undoRedo: function () {
        return this._undoRedo
    }, set__undoRedo: function (a) {
        return this._undoRedo = a
    }
    };
    lt.Annotations.Automation.AnnAutomation = function (a, b) {
        this._containers = new lt.Annotations.Core.AnnContainerCollection;
        this._defaultCurrentObjectId = lt.Annotations.Core.AnnObject.selectObjectId;
        this._editObjectOriginalBounds = lt.Annotations.Automation._leadRectDExtensions.get_empty();
        null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("automationManager");
        null == b && lt.Annotations.Core.ExceptionHelper.argumentNullException("automationControl");
        this._init(a, b)
    };
    lt.Annotations.Automation.AnnAutomation._reverseObjects = function (a) {
        for (var b = 0, c = a.get_count() - 1; b < c; b++, c--) {
            var d = a.get_item(b);
            a.set_item(b, a.get_item(c));
            a.set_item(c, d)
        }
    };
    lt.Annotations.Automation.AnnAutomation._isUserInRole = function (a, b, c) {
        var d = !1;
        null != c && (c = c.get_groupsRoles(), null != c ? null != c.get_groupUsers() && 0 < Object.getKeyCount(c.get_groupUsers()) ? (a === lt.Annotations.Core.AnnOperationType.createObjects && String.isNullOrEmpty(b.get_userId()) && b.set_userId(c.get_currentUser()),
            d = c.isCurrentUserInRole(new lt.Annotations.Core.AnnOperationInfoEventArgs(a, b))) : d = !1 : d = !0);
        return d
    };
    lt.Annotations.Automation.AnnAutomation.prototype = {
        _automationManager: null,
        _activeContainer: null,
        _drawDesigner: null,
        _editDesigner: null,
        _runDesigner: null,
        _designer: null,
        _undoRedo: null,
        _selecting: !1,
        _active: !1,
        _annObjectToolTip: null,
        _canUpdateObjectLabel: !1,
        _enableDragDrop: !1,
        get_enableDragDrop: function () {
            return this._enableDragDrop
        },
        set_enableDragDrop: function (a) {
            return this._enableDragDrop = a
        },
        _automationGetContainersCallback: function () {
            return this._containers
        },
        get_containers: function () {
            return this._containers
        },
        _undoRedos: null,
        _automationControl: null,
        add_objectModified: function (a) {
            this.__objectModified = ss.Delegate.combine(this.__objectModified, a)
        },
        remove_objectModified: function (a) {
            this.__objectModified = ss.Delegate.remove(this.__objectModified, a)
        },
        __objectModified_handler_get: function () {
            null == this.__objectModified_handler && (this.__objectModified_handler = ss.EventHandler.create(this, this.add_objectModified, this.remove_objectModified));
            return this.__objectModified_handler
        },
        __objectModified: null,
        __objectModified_handler: null,
        add_dragDrop: function (a) {
            this.__dragDrop = ss.Delegate.combine(this.__dragDrop, a)
        },
        remove_dragDrop: function (a) {
            this.__dragDrop = ss.Delegate.remove(this.__dragDrop, a)
        },
        __dragDrop_handler_get: function () {
            null == this.__dragDrop_handler && (this.__dragDrop_handler = ss.EventHandler.create(this, this.add_dragDrop, this.remove_dragDrop));
            return this.__dragDrop_handler
        },
        __dragDrop: null,
        __dragDrop_handler: null,
        onDragDrop: function (a) {
            null != this.__dragDrop && this.__dragDrop(this,
                a)
        },
        _callDragDrop: function (a) {
            var b = lt.Annotations.Automation.AnnDragDropEventArgs.create(a.get_annObject(), a.get_sourceContainer(), a.get_targetContainer(), a.get_operation(), a.get_operationContainer());
            this.onDragDrop(b);
            a.set_allowed(b.get_allowed())
        },
        add_lockObject: function (a) {
            this.__lockObject = ss.Delegate.combine(this.__lockObject, a)
        },
        remove_lockObject: function (a) {
            this.__lockObject = ss.Delegate.remove(this.__lockObject, a)
        },
        __lockObject_handler_get: function () {
            null == this.__lockObject_handler && (this.__lockObject_handler =
                ss.EventHandler.create(this, this.add_lockObject, this.remove_lockObject));
            return this.__lockObject_handler
        },
        __lockObject: null,
        __lockObject_handler: null,
        add_unlockObject: function (a) {
            this.__unlockObject = ss.Delegate.combine(this.__unlockObject, a)
        },
        remove_unlockObject: function (a) {
            this.__unlockObject = ss.Delegate.remove(this.__unlockObject, a)
        },
        __unlockObject_handler_get: function () {
            null == this.__unlockObject_handler && (this.__unlockObject_handler = ss.EventHandler.create(this, this.add_unlockObject, this.remove_unlockObject));
            return this.__unlockObject_handler
        },
        __unlockObject: null,
        __unlockObject_handler: null,
        add_editText: function (a) {
            this.__editText = ss.Delegate.combine(this.__editText, a)
        },
        remove_editText: function (a) {
            this.__editText = ss.Delegate.remove(this.__editText, a)
        },
        __editText_handler_get: function () {
            null == this.__editText_handler && (this.__editText_handler = ss.EventHandler.create(this, this.add_editText, this.remove_editText));
            return this.__editText_handler
        },
        __editText: null,
        __editText_handler: null,
        add_editContent: function (a) {
            this.__editContent =
                ss.Delegate.combine(this.__editContent, a)
        },
        remove_editContent: function (a) {
            this.__editContent = ss.Delegate.remove(this.__editContent, a)
        },
        __editContent_handler_get: function () {
            null == this.__editContent_handler && (this.__editContent_handler = ss.EventHandler.create(this, this.add_editContent, this.remove_editContent));
            return this.__editContent_handler
        },
        __editContent: null,
        __editContent_handler: null,
        add_undoRedoChanged: function (a) {
            this.__undoRedoChanged = ss.Delegate.combine(this.__undoRedoChanged, a)
        },
        remove_undoRedoChanged: function (a) {
            this.__undoRedoChanged =
                ss.Delegate.remove(this.__undoRedoChanged, a)
        },
        __undoRedoChanged_handler_get: function () {
            null == this.__undoRedoChanged_handler && (this.__undoRedoChanged_handler = ss.EventHandler.create(this, this.add_undoRedoChanged, this.remove_undoRedoChanged));
            return this.__undoRedoChanged_handler
        },
        __undoRedoChanged: null,
        __undoRedoChanged_handler: null,
        add_draw: function (a) {
            this.__draw = ss.Delegate.combine(this.__draw, a)
        },
        remove_draw: function (a) {
            this.__draw = ss.Delegate.remove(this.__draw, a)
        },
        __draw_handler_get: function () {
            null ==
            this.__draw_handler && (this.__draw_handler = ss.EventHandler.create(this, this.add_draw, this.remove_draw));
            return this.__draw_handler
        },
        __draw: null,
        __draw_handler: null,
        add_edit: function (a) {
            this.__edit = ss.Delegate.combine(this.__edit, a)
        },
        remove_edit: function (a) {
            this.__edit = ss.Delegate.remove(this.__edit, a)
        },
        __edit_handler_get: function () {
            null == this.__edit_handler && (this.__edit_handler = ss.EventHandler.create(this, this.add_edit, this.remove_edit));
            return this.__edit_handler
        },
        __edit: null,
        __edit_handler: null,
        add_run: function (a) {
            this.__run = ss.Delegate.combine(this.__run, a)
        },
        remove_run: function (a) {
            this.__run = ss.Delegate.remove(this.__run, a)
        },
        __run_handler_get: function () {
            null == this.__run_handler && (this.__run_handler = ss.EventHandler.create(this, this.add_run, this.remove_run));
            return this.__run_handler
        },
        __run: null,
        __run_handler: null,
        add_selectedObjectsChanged: function (a) {
            this.__selectedObjectsChanged = ss.Delegate.combine(this.__selectedObjectsChanged, a)
        },
        remove_selectedObjectsChanged: function (a) {
            this.__selectedObjectsChanged =
                ss.Delegate.remove(this.__selectedObjectsChanged, a)
        },
        __selectedObjectsChanged_handler_get: function () {
            null == this.__selectedObjectsChanged_handler && (this.__selectedObjectsChanged_handler = ss.EventHandler.create(this, this.add_selectedObjectsChanged, this.remove_selectedObjectsChanged));
            return this.__selectedObjectsChanged_handler
        },
        __selectedObjectsChanged: null,
        __selectedObjectsChanged_handler: null,
        add_onShowContextMenu: function (a) {
            this.__onShowContextMenu = ss.Delegate.combine(this.__onShowContextMenu, a)
        },
        remove_onShowContextMenu: function (a) {
            this.__onShowContextMenu = ss.Delegate.remove(this.__onShowContextMenu, a)
        },
        __onShowContextMenu_handler_get: function () {
            null == this.__onShowContextMenu_handler && (this.__onShowContextMenu_handler = ss.EventHandler.create(this, this.add_onShowContextMenu, this.remove_onShowContextMenu));
            return this.__onShowContextMenu_handler
        },
        __onShowContextMenu: null,
        __onShowContextMenu_handler: null,
        add_onShowObjectProperties: function (a) {
            this.__onShowObjectProperties = ss.Delegate.combine(this.__onShowObjectProperties,
                a)
        },
        remove_onShowObjectProperties: function (a) {
            this.__onShowObjectProperties = ss.Delegate.remove(this.__onShowObjectProperties, a)
        },
        __onShowObjectProperties_handler_get: function () {
            null == this.__onShowObjectProperties_handler && (this.__onShowObjectProperties_handler = ss.EventHandler.create(this, this.add_onShowObjectProperties, this.remove_onShowObjectProperties));
            return this.__onShowObjectProperties_handler
        },
        __onShowObjectProperties: null,
        __onShowObjectProperties_handler: null,
        add_setCursor: function (a) {
            this.__setCursor =
                ss.Delegate.combine(this.__setCursor, a)
        },
        remove_setCursor: function (a) {
            this.__setCursor = ss.Delegate.remove(this.__setCursor, a)
        },
        __setCursor_handler_get: function () {
            null == this.__setCursor_handler && (this.__setCursor_handler = ss.EventHandler.create(this, this.add_setCursor, this.remove_setCursor));
            return this.__setCursor_handler
        },
        __setCursor: null,
        __setCursor_handler: null,
        add_restoreCursor: function (a) {
            this.__restoreCursor = ss.Delegate.combine(this.__restoreCursor, a)
        },
        remove_restoreCursor: function (a) {
            this.__restoreCursor =
                ss.Delegate.remove(this.__restoreCursor, a)
        },
        __restoreCursor_handler_get: function () {
            null == this.__restoreCursor_handler && (this.__restoreCursor_handler = ss.EventHandler.create(this, this.add_restoreCursor, this.remove_restoreCursor));
            return this.__restoreCursor_handler
        },
        __restoreCursor: null,
        __restoreCursor_handler: null,
        add_toolTip: function (a) {
            this.__toolTip = ss.Delegate.combine(this.__toolTip, a)
        },
        remove_toolTip: function (a) {
            this.__toolTip = ss.Delegate.remove(this.__toolTip, a)
        },
        __toolTip_handler_get: function () {
            null ==
            this.__toolTip_handler && (this.__toolTip_handler = ss.EventHandler.create(this, this.add_toolTip, this.remove_toolTip));
            return this.__toolTip_handler
        },
        __toolTip: null,
        __toolTip_handler: null,
        _setAutomationObject: function (a, b) {
            null != a && a.get_automationObject() !== b && a.set_automationObject(b)
        },
        _setAutomationContainerIndex: function (a, b) {
            null != a && a.set_automationContainerIndex(b)
        },
        _init: function (a, b) {
            this._automationManager = a;
            lt.Annotations.Core.Utils.setCheckModifierCallback(lt.Annotations.Automation.AnnAutomationManager.get_platformCallbacks().get_checkModifier());
            this._resetObjectIncrementLabel();
            if (null != b) {
                this._automationControl = b;
                this._setAutomationObject(b, this);
                var c = new lt.Annotations.Core.AnnContainer;
                c.set_groupsRoles(this.get_manager().get_groupsRoles());
                this._automationControl = null;
                this._automationManager.get_automations().add(this);
                this._setContainerResources(c, this.get_manager().get_resources());
                this._undoRedos = [];
                this._undoRedos.add(new lt.Annotations.Automation._undoRedo(10));
                this._undoRedo = this._undoRedos[0];
                this._updateContainerMapperAndSize(!0);
                this._activeContainer = c;
                this._doAttach(b);
                this._containers.add_collectionChanged(ss.Delegate.create(this, this._containers_CollectionChanged));
                this._containers.add(c);
                this._activeContainer.set_offset(lt.Annotations.Core.Utils.getAutomationOffset(b, this._activeContainer));
                this._activeContainer.set_userMode(a.get_userMode());
                this._automationControl_AutomationTransformChanged(this, lt.LeadEventArgs.Empty)
            }
        },
        _resetObjectIncrementLabel: function () {
            if (null != this._automationManager)for (var a = ss.IEnumerator.getEnumerator(this._automationManager.get_objects()); a.moveNext();)a.current.set_nextNumber(1)
        },
        _setContainerResources: function () {
        },
        _updateContainersCounter: 0,
        beginUpdateContainers: function () {
            this._updateContainersCounter++
        },
        endUpdateContainers: function () {
            if (!this._updateContainersCounter)throw new lt.InvalidOperationException("'EndUpdateContainers' called without a matching 'BeginUpdateContainers'");
            this._updateContainersCounter--;
            this._updateContainersCounter || this._automationControl_AutomationTransformChanged(this, lt.LeadEventArgs.Empty)
        },
        _containers_CollectionChanged: function (a, b) {
            if (b.get_action() ===
                lt.Annotations.Core.AnnNotifyCollectionChangedAction.add) {
                var c = Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnContainer);
                null != c && c.get_userMode() !== this.get_manager().get_userMode() && c.set_userMode(this.get_manager().get_userMode());
                this._undoRedos.insert(this._containers.indexOf(c), new lt.Annotations.Automation._undoRedo(10));
                this._setContainerResources(c, this.get_manager().get_resources());
                c.set_groupsRoles(this.get_manager().get_groupsRoles());
                c.get_mapper().set_fontRelativeToImageDpi(this.get_manager().get_fontRelativeToImageDpi());
                c.add_objectRemoved(ss.Delegate.create(this, this._activeContainer_ObjectRemoved));
                c.add_objectAdded(ss.Delegate.create(this, this._activeContainer_ObjectAdded));
                null == this._activeContainer && this._setActiveContainer(c);
                this._updateContainersCounter || (this._updateContainerMapperAndSize(!1), this._updateContainerInvalidRect(c), this._automationControl_AutomationTransformChanged(this, lt.LeadEventArgs.Empty))
            }
            b.get_action() === lt.Annotations.Core.AnnNotifyCollectionChangedAction.remove && (c = Type.safeCast(b.get_newItems()[0],
                lt.Annotations.Core.AnnContainer), c.remove_objectRemoved(ss.Delegate.create(this, this._activeContainer_ObjectRemoved)), c.remove_objectAdded(ss.Delegate.create(this, this._activeContainer_ObjectAdded)), this._setContainerResources(c, null), this._undoRedos.removeAt(b.get_oldStartingIndex()), c === this._activeContainer && (0 < this._containers.get_count() ? this._setActiveContainer(this._containers.get_item(0)) : this._setActiveContainer(null)), this._updateContainersCounter || this._automationControl_AutomationTransformChanged(this,
                lt.LeadEventArgs.Empty));
            b.get_action() === lt.Annotations.Core.AnnNotifyCollectionChangedAction.reset && (this._undoRedos.clear(), this._setActiveContainer(null), this._updateContainersCounter || this._automationControl_AutomationTransformChanged(this, lt.LeadEventArgs.Empty))
        },
        hitTestContainer: function (a, b) {
            if (null != this._activeContainer) {
                var c = this.getContainerInvalidRect(this._activeContainer, b);
                if (!lt.Annotations.Automation._leadRectDExtensions.isEmpty(c) && lt.Annotations.Automation._leadRectDExtensions.containsPoint(c,
                        a))return this._activeContainer
            }
            for (var d = ss.IEnumerator.getEnumerator(this._containers); d.moveNext();) {
                var e = d.current;
                if (e !== this._activeContainer && e.get_isVisible() && e.get_isEnabled() && (c = this.getContainerInvalidRect(e, b), !lt.Annotations.Automation._leadRectDExtensions.isEmpty(c) && lt.Annotations.Automation._leadRectDExtensions.containsPoint(c, a)))return e
            }
            return null
        },
        _updateContainerMapperAndSize: function (a) {
            if (!(null == this._automationControl || null == this._activeContainer)) {
                for (var b = this._containers.get_count(),
                         c = this._automationControl.get_automationUseDpi(), d = 0; d < b; d++) {
                    this._setAutomationContainerIndex(this._automationControl, d);
                    var e = this._containers.get_item(d), f = lt.Annotations.Core.Utils.getAutomationSize(this._automationControl, e), g = this._automationControl.get_automationXResolution(), h = this._automationControl.get_automationYResolution(), i, j;
                    c ? (i = this._automationControl.get_automationDpiX(), j = this._automationControl.get_automationDpiY()) : (i = g, j = h);
                    e.get_mapper().mapResolutions(g, h, i, j);
                    a && (lt.Annotations.Automation._leadSizeDExtensions.isEmpty(f) || !f.get_width() || f.get_height())
                }
                this._setAutomationContainerIndex(this._automationControl, -1)
            }
        },
        attachContainer: function (a, b) {
            null != this._automationControl && this.detach();
            this._containers.clear();
            null == a && (a = new lt.Annotations.Core.AnnContainer);
            this._containers.add(a);
            this._setActiveContainer(a);
            this._activeContainer.set_userMode(this._automationManager.get_userMode());
            this._activeContainer.set_offset(lt.Annotations.Core.Utils.getAutomationOffset(this._automationControl, this._activeContainer));
            this._updateContainerMapperAndSize(!0);
            this._undoRedo = null != b ? b.get__undoRedo() : new lt.Annotations.Automation._undoRedo(10);
            this._doAttach(this._automationControl)
        },
        getUndoRedoObject: function () {
            var a = new lt.Annotations.Automation.AnnAutomationUndoRedoObject;
            a.set__undoRedo(this._undoRedo);
            return a
        },
        get_automationControl: function () {
            return this._automationControl
        },
        invalidate: function (a) {
            if (null != this._automationControl) {
                this._automationControl.automationInvalidate(a);
                var b = Type.safeCast(this.get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner);
                null != b && b.invalidate(a)
            }
        },
        getObjectInvalidateRect: function (a) {
            return this._getObjectWithContainerInvalidateRect(this.get_container(), a)
        },
        _getObjectWithContainerInvalidateRect: function (a, b) {
            var c = lt.Annotations.Automation._leadRectDExtensions.get_empty();
            if (null == a)return c;
            if (null != this._automationControl && null != b) {
                var d = null, e = this._getRenderingEngine();
                null != e && (e = e.get_renderers(), null != e && Object.keyExists(e, b.get_id()) && (d = e[b.get_id()]));
                null != d && (c = b.getInvalidateRect(a.get_mapper(), d))
            }
            return c
        },
        _getRenderingEngine: function () {
            var a = this.get_manager().get_renderingEngine();
            return null != a ? a : this._automationControl.get_renderingEngine()
        },
        invalidateObject: function (a) {
            var b = this._getRenderingEngine();
            if (b.get_stateless())b = Type.safeCast(this.get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner), null != b ? b.get_targetObject() === a && b.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()) : (a = this.getObjectInvalidateRect(a), lt.Annotations.Automation._leadRectDExtensions.isEmpty(a) ||
            this._automationControl.automationInvalidate(a)); else {
                var b = b.get_renderers()[a.get_id()], c = this.get_container();
                null != c && b.render(c.get_mapper(), a)
            }
        },
        invalidateContainer: function (a) {
            null == a && (a = this.get_container());
            null != a && a.get_isVisible() && (a = this.getContainerInvalidRect(a, !0), lt.Annotations.Automation._leadRectDExtensions.isEmpty(a) || this.invalidate(a))
        },
        attach: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("automationControl");
            this._doAttach(a)
        },
        detach: function () {
            this._internalDetach(!0)
        },
        _doAttach: function (a) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("automationControl");
            null != this._automationControl && this._internalDetach(!1);
            this._automationControl = a;
            null != this._automationControl && (this._setAutomationObject(this._automationControl, this), lt.Annotations.Core.Utils.setRenderingEngine(this._automationControl, this._getRenderingEngine()));
            this._updateContainerMapperAndSize(!0);
            this._activeContainer.add_objectAdded(ss.Delegate.create(this, this._activeContainer_ObjectAdded));
            this._activeContainer.add_objectRemoved(ss.Delegate.create(this, this._activeContainer_ObjectRemoved));
            this._automationControl.set_automationGetContainersCallback(ss.Delegate.create(this, this._automationGetContainersCallback));
            this._automationControl.automationAttach(this._activeContainer);
            this._automationControl.add_automationSizeChanged(ss.Delegate.create(this, this._automationControl_AutomationSizeChanged));
            this._automationControl.add_automationTransformChanged(ss.Delegate.create(this, this._automationControl_AutomationTransformChanged));
            this._automationControl.add_automationUseDpiChanged(ss.Delegate.create(this, this._automationControl_AutomationUseDpiChanged));
            this._automationControl.add_automationPointerDown(ss.Delegate.create(this, this._automationControl_AutomationPointerDown));
            this._automationControl.add_automationPointerMove(ss.Delegate.create(this, this._automationControl_AutomationOnPointerMove));
            this._automationControl.add_automationPointerUp(ss.Delegate.create(this, this._automationControl_AutomationOnPointerUp));
            this._automationControl.add_automationDoubleClick(ss.Delegate.create(this,
                this._automationControl_AutomationDoubleClick));
            this._automationControl.add_automationLostFocus(ss.Delegate.create(this, this._automationControl_AutomationLostFocus));
            this._addObject(this._activeContainer.get_selectionObject());
            null != this._activeContainer && this._activeContainer.get_mapper().updateTransform(this._automationControl.get_automationTransform())
        },
        get_activeContainer: function () {
            return this._activeContainer
        },
        set_activeContainer: function (a) {
            null == a && (0 < this._containers.get_count() && lt.Annotations.Core.ExceptionHelper.argumentNullException("ActiveContainer"),
                this._activeContainer = null);
            this._setActiveContainer(a);
            return a
        },
        add_activeContainerChanged: function (a) {
            this.__activeContainerChanged = ss.Delegate.combine(this.__activeContainerChanged, a)
        },
        remove_activeContainerChanged: function (a) {
            this.__activeContainerChanged = ss.Delegate.remove(this.__activeContainerChanged, a)
        },
        __activeContainerChanged_handler_get: function () {
            null == this.__activeContainerChanged_handler && (this.__activeContainerChanged_handler = ss.EventHandler.create(this, this.add_activeContainerChanged,
                this.remove_activeContainerChanged));
            return this.__activeContainerChanged_handler
        },
        __activeContainerChanged: null,
        __activeContainerChanged_handler: null,
        _setActiveContainer: function (a) {
            null != a && !this._containers.contains(a) && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Container is not added to this automation");
            this._activeContainer !== a && (this._activeContainer = a, null != this._activeContainer && null != this._automationControl && (a = null, null != this._drawDesigner && (a = this._drawDesigner), this.cancel(),
            null != a && this._startDrawing(a.get_targetObject().get_id()), this._automationControl.automationAttach(this._activeContainer), this._automationControl.automationInvalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())), this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()), null != this.__activeContainerChanged && this.__activeContainerChanged(this, lt.LeadEventArgs.Empty))
        },
        _addObject: function (a) {
            this._internalOnObjectModified2(a, 34);
            null != this._activeContainer.get_activeLayer() &&
            (a.set_layer(this._activeContainer.get_activeLayer()), null != this._activeContainer.get_activeLayer() && (this._activeContainer.get_activeLayer().get_children().contains(a) || this._activeContainer.get_activeLayer().get_children().add(a)));
            var b = this._getRenderingEngine();
            null != b && !b.get_stateless() && (b = b.get_renderers()[a.get_id()], null != b && b.addObject(a))
        },
        _deleteObject: function (a) {
            this._internalOnObjectModified2(a, 3);
            null != a.get_layer() && (a.get_layer().get_children().remove(a), a.set_layer(null));
            var b =
                this._getRenderingEngine();
            null != b && !b.get_stateless() && (b = this._getRenderingEngine().get_renderers()[a.get_id()], null != b && b.removeObject(a))
        },
        _activeContainer_ObjectAdded: function (a, b) {
            this._addObject(b.get_object());
            this.get_manager().get_restrictDesigners() && this._restrictObjectToContainer(b.get_object(), a, null)
        },
        _activeContainer_ObjectRemoved: function (a, b) {
            this._deleteObject(b.get_object())
        },
        _detachViewer: function () {
            this._internalDetach(!0)
        },
        _internalDetach: function (a) {
            null != this._automationControl &&
            (a && this.cancel(), null != this._activeContainer && (this._activeContainer.remove_objectAdded(ss.Delegate.create(this, this._activeContainer_ObjectAdded)), this._activeContainer.remove_objectRemoved(ss.Delegate.create(this, this._activeContainer_ObjectRemoved))), this._automationControl.remove_automationSizeChanged(ss.Delegate.create(this, this._automationControl_AutomationSizeChanged)), this._automationControl.remove_automationTransformChanged(ss.Delegate.create(this, this._automationControl_AutomationTransformChanged)),
                this._automationControl.remove_automationUseDpiChanged(ss.Delegate.create(this, this._automationControl_AutomationUseDpiChanged)), this._automationControl.remove_automationPointerDown(ss.Delegate.create(this, this._automationControl_AutomationPointerDown)), this._automationControl.remove_automationPointerMove(ss.Delegate.create(this, this._automationControl_AutomationOnPointerMove)), this._automationControl.remove_automationPointerUp(ss.Delegate.create(this, this._automationControl_AutomationOnPointerUp)),
                this._automationControl.remove_automationDoubleClick(ss.Delegate.create(this, this._automationControl_AutomationDoubleClick)), this._automationControl.remove_automationLostFocus(ss.Delegate.create(this, this._automationControl_AutomationLostFocus)))
        },
        _automationControl_AutomationSizeChanged: function () {
            null != this._activeContainer && this._updateContainerMapperAndSize(!0)
        },
        _automationControl_AutomationTransformChanged: function () {
            for (var a = this._containers.get_count(), b = 0; b < a; b++) {
                this._setAutomationContainerIndex(this._automationControl,
                    b);
                var c = this._containers.get_item(b);
                c.get_mapper().set_scrollOffset(this._automationControl.get_automationScrollOffset());
                c.get_mapper().updateTransform(this._automationControl.get_automationTransform());
                this._updateContainerInvalidRect(c);
                var d = this._getRotationAngle(c.get_mapper().get_transform()), e = new lt.LeadMatrix;
                if (d && !lt.Annotations.Core.AnnDouble.isNaN(d)) {
                    e.rotate(-d);
                    d = e.clone();
                    d.invert();
                    var f = c.get_mapper().get_transform().clone(), f = lt.LeadMatrix.multiply(f, d);
                    c.get_mapper().set_rotateTransform(e);
                    c.get_mapper().set_transformWithoutRotate(f)
                } else c.get_mapper().set_rotateTransform(lt.LeadMatrix.get_identity()), c.get_mapper().set_transformWithoutRotate(c.get_mapper().get_transform().clone())
            }
            this._setAutomationContainerIndex(this._automationControl, -1);
            if (null != this._designer && null != this._lastPointerEventArgs)this.onAutomationPointerMove(this._lastPointerEventArgs)
        },
        _getRotationAngle: function (a) {
            return 180 * Math.atan2(a.get_m21(), a.get_m11()) / Math.PI
        },
        _automationControl_AutomationUseDpiChanged: function () {
            this._updateContainerMapperAndSize(!1)
        },
        get_defaultCurrentObjectId: function () {
            return this._defaultCurrentObjectId
        },
        set_defaultCurrentObjectId: function (a) {
            return this._defaultCurrentObjectId = a
        },
        getDefaultCurrentObjectId: function () {
            return this.get_defaultCurrentObjectId()
        },
        get__checkSelectionKey: function () {
            return this.get_manager().get_forceSelectionModifierKey() && !lt.Annotations.Core.Utils.checkModifierKey(this.get_manager().get_selectionModifierKey())
        },
        get__checkMultiSelectModifierKey: function () {
            return lt.Annotations.Core.Utils.checkModifierKey(this.get_manager().get_multiSelectModifierKey())
        },
        get__deselectOnDown: function () {
            return this.get_manager().get_deselectOnDown()
        },
        _lastPointerEventArgs: null,
        _drawEditMode: !1,
        onAutomationPointerDown: function (a) {
            this._drawEditMode = !1;
            this._lastPointerEventArgs = null != a ? a.clone() : null;
            if (!(this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.render || null == this._automationControl || !this._automationControl.get_automationEnabled() || !this.get_active())) {
                var b = a.get_location(), c = this.hitTestContainer(b, !0);
                null != c && c !== this._activeContainer &&
                c.get_isEnabled() && this._setActiveContainer(c);
                if (null != this.get_container()) {
                    a.set_isHandled(!1);
                    b = this._activeContainer.get_mapper().pointToContainerCoordinates(b);
                    c = lt.Annotations.Core.AnnPointerEventArgs.create(a.get_button(), b);
                    this._undoRedo = this._undoRedos[this._containers.indexOf(this._activeContainer)];
                    var d = this._activeContainer.hitTestPoint(b);
                    if (null != d && !d.length)for (var e = ss.IEnumerator.getEnumerator(this._containers); e.moveNext();) {
                        var f = e.current;
                        if (f !== this._activeContainer && f.get_isEnabled()) {
                            var g =
                                f.get_mapper().pointToContainerCoordinates(a.get_location()), d = f.hitTestPoint(g);
                            if (null != d && d.length) {
                                b = g;
                                c = lt.Annotations.Core.AnnPointerEventArgs.create(a.get_button(), b);
                                this._setActiveContainer(f);
                                break
                            }
                        }
                    }
                    e = this.get_container();
                    if (this._isVisibleEnabledContainer(e)) {
                        var h = g = f = !1;
                        if (!this.get__endEditDesignerBeforeDraw() && null != this._editDesigner) {
                            if (null != d && 0 < d.length)h = !0, 1 === d.length && null != this._drawDesigner && d[0] === this._drawDesigner.get_targetObject() && (h = !1); else {
                                var i = this._editDesigner.get_targetObject(),
                                    j = this._editDesigner.getRenderer(), k = lt.Annotations.Core.Utils.fixPoint(b, e.get_mapper(), i.get_fixedStateOperations());
                                this._editDesigner.get_useRotateThumbs() && (null != j.get_rotateCenterThumbStyle() && j.get_rotateCenterThumbStyle().renderHitTest(i.get_internalRotateCenterLocation(), k, 0, e.get_mapper()) ? f = !0 : null != j.get_rotateGripperThumbStyle() && j.get_rotateGripperThumbStyle().renderHitTest(i.get_internalRotateGripperLocation(), k, 0, e.get_mapper()) && (g = !0))
                            }
                            this._drawEditMode = h || f || g
                        }
                        if (!this._drawEditMode &&
                            null != this._drawDesigner)(f = !0, this._drawDesigner.get_isTargetObjectAdded() || (g = this.getContainerInvalidRect(e, !1), lt.Annotations.Automation._leadRectDExtensions.containsPoint(g, a.get_location()) || (f = !1)), f) ? (f = this.get_manager().get_currentObjectId(), g = this.get_manager().findObjectById(f), h = this._drawDesigner.get_targetObject(), f !== lt.Annotations.Core.AnnObject.selectObjectId && null != h && this._updateObjectLabel(g, h), a.set_isHandled(this._drawDesigner.onPointerDown(e, c.clone()))) : a.set_isHandled(!0);
                        else if (null != this._editDesigner) {
                            this._drawEditMode && (this._designer = this._editDesigner);
                            if (null != d && 0 < d.length)if (this._editDesigner.get_targetObject() === d[d.length - 1])if (c.get_button() === lt.Annotations.Core.AnnMouseButton.left) {
                                if (a.set_isHandled(this._editDesigner.onPointerDown(e, c.clone())), g = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnSelectionObject), null != g && 1 < g.get_selectedObjects().get_count()) {
                                    h = null;
                                    for (i = ss.IEnumerator.getEnumerator(g.get_selectedObjects()); i.moveNext();)f =
                                        i.current, f.set_isAlignmentTarget(!1), f.hitTest(b, 10) && (h = f);
                                    this.get_manager().get_enableObjectsAlignment() && (null != h && g.set_alignmentTarget(h), null != g.get_alignmentTarget() && g.get_alignmentTarget().set_isAlignmentTarget(!0));
                                    this._automationManager.get__isMultiSelectionEnabled() && this.get__checkMultiSelectModifierKey() && this._automationManager.get_enableDeselectObject() && (g.get_selectedObjects().remove(h), 1 === g.get_selectedObjects().get_count() && (f = g.get_selectedObjects().get_item(0), g.set_isSelected(!1),
                                        this._startEditing(f, !1, !0, f), null != this._editDesigner && !this.get_manager().get_enableThumbsSelection() && this._editDesigner.set_ignoreHitTestThumbs(!0)))
                                }
                            } else c.get_button() === lt.Annotations.Core.AnnMouseButton.right && a.set_isHandled(this._doShowObjectContextMenu()); else {
                                if (a.set_isHandled(this._editDesigner.hitTestThumbs(b)), a.get_isHandled() && a.set_isHandled(this._editDesigner.onPointerDown(e, c.clone())), !a.get_isHandled() && (f = d[d.length - 1], this._automationManager.get__isMultiSelectionEnabled() &&
                                    this.get__checkMultiSelectModifierKey() ? (g = this._editDesigner.get_targetObject(), Type.canCast(g, lt.Annotations.Core.AnnSelectionObject) || (this._endEditDesigner(!0), this._designer = null, e.get_selectionObject().get_selectedObjects().add(g)), e.get_selectionObject().get_selectedObjects().add(f), this._startEditing(e.get_selectionObject(), !1, !0, f)) : (this._endEditDesigner(!0), this._startEditing(f, !1, !0, f)), null != this._editDesigner && !this.get_manager().get_enableThumbsSelection() && this._editDesigner.set_ignoreHitTestThumbs(!0),
                                    null != this._editDesigner))c.get_button() === lt.Annotations.Core.AnnMouseButton.left ? a.set_isHandled(this._editDesigner.onPointerDown(e, c.clone())) : (a.set_isHandled(!0), this.showObjectContextMenu())
                            } else a.set_isHandled(this._editDesigner.hitTestThumbs(b)), a.get_isHandled() && a.set_isHandled(this._editDesigner.onPointerDown(e, c.clone()));
                            a.get_isHandled() || (f = this.get__deselectOnDown(), !f && this.get_manager().get_currentObjectId() === lt.Annotations.Core.AnnObject.selectObjectId && !this.get__checkSelectionKey() &&
                            Type.canCast(this._designer, lt.Annotations.Designers.AnnSelectionEditDesigner) && (f = !0), f && this._endEditDesigner(!0))
                        } else null == this._editDesigner && this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design && null != d && 0 < d.length && (f = d[d.length - 1], this._startEditing(f, !1, !0, f), null != this._editDesigner && !this.get_manager().get_enableThumbsSelection() && this._editDesigner.set_ignoreHitTestThumbs(!0), null != this._editDesigner && c.get_button() === lt.Annotations.Core.AnnMouseButton.left && (c.set_location(this._activeContainer.get_mapper().pointToContainerCoordinates(a.get_location())),
                            a.set_isHandled(this._editDesigner.onPointerDown(e, c.clone())), a.get_isHandled() && null != this._editDesigner.get_targetObject() && this._fireSetCursor(this._editDesigner.get_targetObject().get_id(), 3, -1, !1, !1, this._lastPointerEventArgs, null)));
                        if (null != d && !d.length && null == this._drawDesigner && (null == this._editDesigner || !this.get__deselectOnDown()) && !a.get_isHandled() && this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design && c.get_button() === lt.Annotations.Core.AnnMouseButton.left)null ==
                        this._editDesigner && e.get_selectionObject().get_selectedObjects().clear(), this.get_manager().get_currentObjectId() !== lt.Annotations.Core.AnnObject.selectObjectId && this.get_manager().set_currentObjectId(this.getDefaultCurrentObjectId()), this.get_manager().get_currentObjectId() === lt.Annotations.Core.AnnObject.selectObjectId && this.get__checkSelectionKey() || this.get__checkMultiSelectModifierKey() || this._startDrawing(this.get_manager().get_currentObjectId()), null != this._drawDesigner && (this._drawDesigner.onPointerDown(e,
                            c.clone()), this._selecting = !0, a.set_isHandled(!0));
                        !a.get_isHandled() && this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.run ? c.get_button() === lt.Annotations.Core.AnnMouseButton.left && (b = e.hitTestPoint(b), d = null, 0 < b.length && (d = b[b.length - 1]), null != d && !d.get_isLocked() && (this._startRunning(d), null != this._runDesigner && a.set_isHandled(this._runDesigner.onPointerDown(e, c.clone())))) : this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design && (a.get_isHandled() || (d = b, g =
                            Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner), b = e.hitTestPoint(d), f = null, null != b && 0 < b.length ? f = b[b.length - 1] : null != g && c.get_button() === lt.Annotations.Core.AnnMouseButton.right && g.hitTestThumbs(d) && (b[b.length - 1] = this._editDesigner.get_targetObject()), c.get_button() === lt.Annotations.Core.AnnMouseButton.right && null != this._drawDesigner && (this._endDrawDesigner(!1, !1), this.get_manager().get_currentObjectId() !== lt.Annotations.Core.AnnObject.selectObjectId && this.get_manager().set_currentObjectId(lt.Annotations.Core.AnnObject.selectObjectId)),
                        null != f && null != g && c.get_button() === lt.Annotations.Core.AnnMouseButton.right && g.get_targetObject() === f && a.set_isHandled(this._doShowObjectContextMenu()), a.get_isHandled()), !a.get_isHandled() && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && this.get__deselectOnDown() && a.set_isHandled(this._endEditDesigner(!0)), !a.get_isHandled() && c.get_button() === lt.Annotations.Core.AnnMouseButton.right && a.set_isHandled(this._doShowContextMenu()))
                    }
                }
            }
        },
        _isPointerDownHandled: !1,
        _automationControl_AutomationPointerDown: function (a,
                                                            b) {
            this.onAutomationPointerDown(b);
            this._isPointerDownHandled = b.get_isHandled()
        },
        onAutomationPointerUp: function (a) {
            if (a.get_button() !== lt.Annotations.Core.AnnMouseButton.none) {
                this._canUpdateObjectLabel = !1;
                if (!this.get__deselectOnDown() && !this._isPointerDownHandled && null != this._activeContainer) {
                    var b = this._activeContainer.get_mapper().pointToContainerCoordinates(a.get_location()), c = this._activeContainer.hitTestPoint(b);
                    null != c && !c.length && this._endEditDesigner(!0)
                }
                this._lastPointerEventArgs = null !=
                a ? a.clone() : null;
                if (!(this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.render || null == this._automationControl || !this._automationControl.get_automationEnabled() || !this.get_active()))if (c = this.get_container(), this._isVisibleEnabledContainer(c))a.set_isHandled(!1), null != this._designer && (b = this._activeContainer.get_mapper().pointToContainerCoordinates(a.get_location()), b = lt.Annotations.Core.AnnPointerEventArgs.create(a.get_button(), b), a.set_isHandled(this._designer.onPointerUp(c, b)),
                this.get_manager().get_enableObjectsAlignment() && null != this._designer && (c = Type.safeCast(this._designer.get_targetObject(), lt.Annotations.Core.AnnSelectionObject), null != c && 1 < c.get_selectedObjects().get_count() && null == c.get_alignmentTarget() && (c.set_alignmentTarget(c.get_selectedObjects().get_item(c.get_selectedObjects().get_count() - 1)), c.get_alignmentTarget().set_isAlignmentTarget(!0), this.invalidateObject(c)))), null != this._drawDesigner && !a.get_isHandled() && (this.get__endEditDesignerBeforeDraw() ? this._endDrawDesigner(!0,
                    !1) : this._startDrawing(this.get_manager().get_currentObjectId()), this.get_manager().get_editObjectAfterDraw() || this._startDrawing(this.get_manager().get_currentObjectId())), !a.get_isHandled() && this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design && this._selecting && a.set_isHandled(this._cancelSelecting())
            }
        },
        resolveObject: function () {
            var a;
            if (null != this.get_currentEditObject()) {
                for (var b = null, c = this.get_currentEditObject().get_bounds(), d = ss.IEnumerator.getEnumerator(this._containers); d.moveNext();) {
                    var e =
                        d.current;
                    a = e.get_offset();
                    var f = e.get_size();
                    a = lt.Annotations.Automation._leadRectDExtensions.create(a.get_x(), a.get_y(), f.get_width(), f.get_height());
                    if (lt.Annotations.Automation._leadRectDExtensions.containsRect(a, c)) {
                        b = e;
                        break
                    }
                }
                null != b && b !== this._activeContainer && (this._activeContainer.get_children().remove(this.get_currentEditObject()), b.get_children().add(this.get_currentEditObject()), this.get_currentEditObject().get_labels().AnnObjectName.set_isVisible(!0), this.get_currentEditObject().get_labels().AnnObjectName.set_text(String.format("Object has been moved from Container {0} to Container {1}",
                    this._activeContainer.get_pageNumber().toString(), b.get_pageNumber().toString())))
            }
        },
        _automationControl_AutomationOnPointerUp: function (a, b) {
            this.onAutomationPointerUp(b)
        },
        _automationControl_AutomationOnPointerMove: function (a, b) {
            this.onAutomationPointerMove(b)
        },
        onAutomationPointerMove: function (a) {
            this._lastPointerEventArgs = null != a ? a.clone() : null;
            if (this.get_manager().get_userMode() !== lt.Annotations.Core.AnnUserMode.render) {
                var b = !1, c = null != this.__setCursor && null != this.__restoreCursor, d = this.get_manager().get_enableToolTip() &&
                    null != this.__toolTip, e = lt.Annotations.Automation._leadPointDExtensions.clone(a.get_location()), f = null, g = this.get_container();
                this._updateContainerInvalidRect(g);
                if (null != g && (c || d)) {
                    var h = g.get_mapper().pointToContainerCoordinates(e);
                    null != this.get_currentDesigner() && Type.canCast(this.get_currentDesigner(), lt.Annotations.Designers.AnnCrossProductEditDesigner) ? Type.safeCast(this.get_currentDesigner(), lt.Annotations.Designers.AnnCrossProductEditDesigner).get_operation() === lt.Annotations.Core.AnnEditDesignerOperation.none &&
                    (f = g.hitTestPoint(h)) : null != g && (f = g.hitTestPoint(h))
                }
                null != this._activeContainer && (e = this._activeContainer.get_mapper().pointToContainerCoordinates(e));
                h = lt.Annotations.Core.AnnPointerEventArgs.create(a.get_button(), e);
                if (null != g) {
                    if (g.get_userMode() === lt.Annotations.Core.AnnUserMode.run)null != f && 0 < f.length && (this._fireSetCursor(f[f.length - 1].get_id(), 2, -1, !1, !1, this._lastPointerEventArgs, null), b = !0); else if (null != this._designer) {
                        a.set_isHandled(this._designer.onPointerMove(g, h.clone()));
                        if (!c)return;
                        h = a = !1;
                        if (this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design) {
                            var i = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner);
                            if (!this.get__endEditDesignerBeforeDraw() && null != this._editDesigner && null != this._drawDesigner)if (null != f && 0 < f.length)i = this._editDesigner; else {
                                var j = this._editDesigner.get_targetObject(), k = this._editDesigner.getRenderer(), l = lt.Annotations.Core.Utils.fixPoint(e, g.get_mapper(), j.get_fixedStateOperations()), m = 0;
                                if (this._editDesigner.get_useRotateThumbs())if (a =
                                        null != k.get_rotateCenterThumbStyle() && k.get_rotateCenterThumbStyle().renderHitTest(j.get_internalRotateCenterLocation(), l, m, g.get_mapper()))i = this._editDesigner; else if (h = null != k.get_rotateGripperThumbStyle() && k.get_rotateGripperThumbStyle().renderHitTest(j.get_internalRotateGripperLocation(), l, m, g.get_mapper()))i = this._editDesigner
                            }
                            if (null != i && i.get_operation() === lt.Annotations.Core.AnnEditDesignerOperation.none) {
                                var j = i.get_targetObject(), k = i.getRenderer(), o = i.getThumbLocations();
                                if (null != k) {
                                    l =
                                        lt.Annotations.Core.Utils.fixPoint(e, g.get_mapper(), j.get_fixedStateOperations());
                                    m = 0;
                                    if (null != o && i.get_showThumbs())for (var e = k.get_locationsThumbStyle(), n = 0; n < o.length; ++n)if (e.renderHitTest(o[n], l, m, g.get_mapper())) {
                                        this._fireSetCursor(j.get_id(), 3, n, !1, !1, this._lastPointerEventArgs, null);
                                        b = !0;
                                        break
                                    }
                                    if (i.get_useRotateThumbs() && !b)if (null != k.get_rotateCenterThumbStyle() && (a || k.get_rotateCenterThumbStyle().renderHitTest(j.get_internalRotateCenterLocation(), l, m, g.get_mapper())))this._fireSetCursor(j.get_id(),
                                        3, -1, !0, !1, this._lastPointerEventArgs, null), b = !0; else if (null != k.get_rotateGripperThumbStyle() && (h || k.get_rotateGripperThumbStyle().renderHitTest(j.get_internalRotateGripperLocation(), l, m, g.get_mapper())))this._fireSetCursor(j.get_id(), 3, -1, !1, !0, this._lastPointerEventArgs, null), b = !0
                                }
                                !b && null != f && 0 < f.length && (this._fireSetCursor(j.get_id(), 3, -1, !1, !1, this._lastPointerEventArgs, null), b = !0)
                            } else b = Type.safeCast(this._designer, lt.Annotations.Designers.AnnDrawDesigner), null != b && null != b.get_targetObject() &&
                            this._fireSetCursor(b.get_finalTargetObject().get_id(), 1, -1, !1, !1, this._lastPointerEventArgs, null), b = !0
                        }
                    } else c && null != f && 0 < f.length && (this._fireSetCursor(f[f.length - 1].get_id(), 0, -1, !1, !1, this._lastPointerEventArgs, null), b = !0);
                    d && (null != f && 0 < f.length ? (d = f[f.length - 1], d !== this._annObjectToolTip && null != this._designer && !Type.canCast(this._designer, lt.Annotations.Designers.AnnDrawDesigner) && (this._fireSetToolTip(d), this._annObjectToolTip = d)) : (this._fireSetToolTip(null), this._annObjectToolTip = null));
                    !b && c && this._fireRestoreCursor()
                }
            }
        },
        _automationControl_AutomationDoubleClick: function (a, b) {
            if (!(this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.render || null == this._automationControl || !this._automationControl.get_automationEnabled())) {
                var c = this.get_container();
                this._isVisibleEnabledContainer(c) && null != this._designer && b.set_isHandled(this._designer.onPointerDoubleClick(c, b.clone()))
            }
        },
        _automationControl_AutomationLostFocus: function () {
            null != this._drawDesigner && this.get_manager().get_endDrawWhenLostFocus() && !this._ignoreLostFocus && (this._drawDesigner.cancel(), this._endDrawDesigner(!0, !1), this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()))
        },
        get__endEditDesignerBeforeDraw: function () {
            return this.get_manager().get_endEditDesignerBeforeDraw()
        },
        _currentObjectChanged: function () {
            var a = this.get_container();
            if (null != a && a.get_isEnabled()) {
                var a = !1, b = this.get_manager().get_currentObjectId() === lt.Annotations.Core.AnnObject.selectObjectId;
                if (b) {
                    var c = this.get_manager().findObjectById(lt.Annotations.Core.AnnObject.selectObjectId);
                    null != c && null == c.get_drawDesignerType() && !this.get__deselectOnDown() && null != this._editDesigner ? a = !0 : this.get__checkSelectionKey() && (a = !0)
                }
                this.get__endEditDesignerBeforeDraw() && this._active && this.get_manager().get_cancelInactiveDesigners() && !a && this.cancel();
                b || this._startDrawing(this.get_manager().get_currentObjectId())
            }
        },
        _updateObjectLabel: function (a, b) {
            if (this._canUpdateObjectLabel) {
                var c = a.get_labelTemplate();
                if (!String.isNullOrEmpty(c) && Object.keyExists(b.get_labels(), "AnnObjectName")) {
                    var d =
                        b.get_labels().AnnObjectName, e = a.get_nextNumber();
                    -1 !== c.indexOf("##") ? (d.set_text(c.replaceAll("##", e.toString())), a.set_nextNumber(a.get_nextNumber() + 1)) : d.set_text(c);
                    d.set_isVisible(!0)
                }
            }
        },
        _startDrawing: function (a) {
            this._drawEditMode && (this._defaultCurrentObjectId = a);
            var b = this.get_manager().findObjectById(a), c = this.get_container();
            if (null != c && c.get_isVisible() && c.get_isEnabled() && null != b && null != b.get_drawDesignerType()) {
                this._canUpdateObjectLabel = !0;
                var d = c.get_selectionObject();
                a !== lt.Annotations.Core.AnnObject.selectObjectId &&
                (d = Type.safeCast(b.get_objectTemplate().clone(), lt.Annotations.Core.AnnObject), d.setId(a));
                lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.createObjects, d, this.get_container()) && (a = new lt.Annotations.Core.AnnObjectCollection, a.add(d), this._internalOnBeforeObjectChanged(a, 30) && (Type.canCast(d, lt.Annotations.Core.AnnSelectionObject) || this.beginUndo(), a = b.get_drawDesignerType(), this._drawDesigner = Type.safeCast(new a(this._automationControl, c, d), lt.Annotations.Designers.AnnDrawDesigner),
                    this._drawDesigner.set_snapToGridOptions(this.get_manager().get_snapToGridOptions()), this._drawDesigner.set_extendedModeModifierKey(this.get_manager().get_extendedModeModifierKey()), this._designer = this._drawDesigner, this._drawDesigner.set_restrictDesigners(this.get_manager().get_restrictDesigners()), this._drawDesigner.add_draw(ss.Delegate.create(this, this._drawDesigner_Draw)), this._fireSetCursor(b.get_id(), 1, -1, !1, !1, null, null), this._drawDesigner.start(), this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty)))
            }
        },
        _fireSetCursor: function (a, b, c, d, e, f, g) {
            null != this.__setCursor && this.__setCursor(this, new lt.Annotations.Automation.AnnCursorEventArgs(a, b, c, d, e, f, g))
        },
        _fireSetToolTip: function (a) {
            null != this.__toolTip && this.__toolTip(this, null != a ? lt.Annotations.Core.AnnToolTipEventArgs.create(a, a.get_bounds()) : lt.Annotations.Core.AnnToolTipEventArgs.create(null, lt.Annotations.Automation._leadRectDExtensions.get_empty()))
        },
        add_currentDesignerChanged: function (a) {
            this.__currentDesignerChanged = ss.Delegate.combine(this.__currentDesignerChanged,
                a)
        },
        remove_currentDesignerChanged: function (a) {
            this.__currentDesignerChanged = ss.Delegate.remove(this.__currentDesignerChanged, a)
        },
        __currentDesignerChanged_handler_get: function () {
            null == this.__currentDesignerChanged_handler && (this.__currentDesignerChanged_handler = ss.EventHandler.create(this, this.add_currentDesignerChanged, this.remove_currentDesignerChanged));
            return this.__currentDesignerChanged_handler
        },
        __currentDesignerChanged: null,
        __currentDesignerChanged_handler: null,
        onCurrentDesignerChanged: function (a) {
            null !=
            this.__currentDesignerChanged && this.__currentDesignerChanged(this, a)
        },
        _startEditing: function (a, b, c) {
            var d = this.get_container();
            if (this._isVisibleEnabledContainer(d) && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.editObjects, a, this.get_container()) && d.get_userMode() === lt.Annotations.Core.AnnUserMode.design) {
                b && (null == this._designer || Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner));
                null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && !Type.canCast(this._designer, lt.Annotations.Designers.AnnSelectionEditDesigner) && (this._endEditDesigner(c), this.get_manager().get_currentObjectId() !== lt.Annotations.Core.AnnObject.selectObjectId && this.get_manager().set_currentObjectId(lt.Annotations.Core.AnnObject.selectObjectId));
                b = this.get_manager().findObject(a);
                c = d.get_selectionObject();
                if (a !== c && (c.get_selectedObjects().clear(), c.set_isSelected(!1), c.set_rect(lt.Annotations.Automation._leadRectDExtensions.get_empty()), c.adjustBounds(), !String.isNullOrEmpty(a.get_groupName()))) {
                    for (b =
                             ss.IEnumerator.getEnumerator(d.get_children()); b.moveNext();) {
                        var e = b.current;
                        lt.Annotations.Core.Utils.compare(a.get_groupName(), e.get_groupName(), !0) && c.get_selectedObjects().add(e)
                    }
                    c.adjustBounds();
                    b = this.get_manager().findObjectById(c.get_id());
                    a = d.get_selectionObject()
                }
                null != b && null != b.get_editDesignerType() && (c = b.get_editDesignerType(), this._editDesigner = Type.safeCast(new c(this._automationControl, d, a), lt.Annotations.Designers.AnnEditDesigner), this._editDesigner.add_editContent(ss.Delegate.create(this,
                    this._editDesigner_EditContent)), a = Type.safeCast(this._editDesigner, lt.Annotations.Designers.AnnPolylineEditDesigner), null != a && a.set_thumbsGap(this.get_manager().get_thumbsGap()), a = Type.safeCast(this._editDesigner, lt.Annotations.Designers.AnnTextEditDesigner), null != a && a.add_editText(ss.Delegate.create(this, this._textEditDesigner_EditText)), this._editDesigner.set_showThumbs(this.get_manager().get_showThumbs()), this._editDesigner.set_restrictDesigners(this.get_manager().get_restrictDesigners()), this._editDesigner.set_snapToGridOptions(this.get_manager().get_snapToGridOptions()),
                    this._editDesigner.set_thumbsHitTestBuffer(this.get_manager().get_thumbsHitTestBuffer()), this._editDesigner.set_rotateModifierKey(this.get_manager().get_rotateModifierKey()), this._editDesigner.set_maintainAspectRatio(this.get_manager().get_maintainAspectRatio()), this._editDesigner.set_useRotateThumbs(b.get_useRotateThumbs()), this._editDesigner.get_useRotateThumbs(), this._editDesigner.start(), this._designer = this._editDesigner, this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty), null != this.__selectedObjectsChanged &&
                this.__selectedObjectsChanged(this, lt.LeadEventArgs.Empty), null != this._editDesigner && this._editDesigner.add_edit(ss.Delegate.create(this, this._editDesigner_Edit)))
            }
        },
        _onEditContent: function (a, b) {
            null != this.__editContent && (this.__editContent(a, b), b.get_cancel() || (this._internalOnObjectModified2(b.get_targetObject(), 36), this._internalOnAfterObjectChanged2(b.get_targetObject(), 36)))
        },
        _editDesigner_EditContent: function (a, b) {
            this._onEditContent(a, b)
        },
        _onEditText: function (a, b) {
            null != this.__editText && (this.__editText(a,
                b), b.get_cancel() || (this._internalOnObjectModified2(b.get_textObject(), 14), this._internalOnAfterObjectChanged2(b.get_textObject(), 14)))
        },
        _textEditDesigner_EditText: function (a, b) {
            this._onEditText(a, b)
        },
        _endEditDesigner: function (a) {
            if (null == this._editDesigner)return !1;
            this._editDesigner.get_hasStarted() && (this._internalOnObjectModified2(this._editDesigner.get_targetObject(), 35), this._editDesigner.remove_editContent(ss.Delegate.create(this, this._editDesigner_EditContent)), this._editDesigner.end(), a &&
            this.cancelUndo());
            a = Type.safeCast(this._editDesigner, lt.Annotations.Designers.AnnTextEditDesigner);
            null != a && a.remove_editText(ss.Delegate.create(this, this._textEditDesigner_EditText));
            this._editDesigner.remove_edit(ss.Delegate.create(this, this._editDesigner_Edit));
            this._designer = this._editDesigner = null;
            this._fireRestoreCursor();
            this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty);
            null != this.__selectedObjectsChanged && this.__selectedObjectsChanged(this, lt.LeadEventArgs.Empty);
            return !0
        },
        _ignoreLostFocus: !1,
        _endDrawDesigner: function (a, b) {
            if (null != this._drawDesigner) {
                this._drawDesigner.remove_draw(ss.Delegate.create(this, this._drawDesigner_Draw));
                if (this._drawDesigner.get_hasStarted()) {
                    this._drawDesigner.end();
                    var c = this._drawDesigner.get_finalTargetObject();
                    if (!b && null != this._activeContainer && c.get_id() !== lt.Annotations.Core.AnnObject.selectObjectId && 0 < c.get_points().get_count()) {
                        this._ignoreLostFocus = !0;
                        Type.canCast(this._designer, lt.Annotations.Designers.AnnDrawDesigner) && (this._designer = null);
                        this.get_manager().get_editContentAfterDraw() &&
                        c.get_supportsContent() && this._onEditContent(this._drawDesigner, lt.Annotations.Core.AnnEditContentEventArgs.create(c, this._activeContainer.get_mapper().rectFromContainerCoordinates(c.get_bounds(), c.get_fixedStateOperations())));
                        if (this.get_manager().get_editTextAfterDraw()) {
                            var d = Type.safeCast(c, lt.Annotations.Core.AnnTextObject);
                            null != d && d.get_id() !== lt.Annotations.Core.AnnObject.stampObjectId && this._onEditText(this._drawDesigner, lt.Annotations.Core.AnnEditTextEventArgs.create(d, this._activeContainer.get_mapper().rectFromContainerCoordinates(c.get_bounds(),
                                c.get_fixedStateOperations())))
                        }
                        this._ignoreLostFocus = !1
                    }
                }
                this._drawDesigner = null;
                Type.canCast(this._designer, lt.Annotations.Designers.AnnDrawDesigner) && (this._designer = null);
                this._fireRestoreCursor()
            }
        },
        _cancelSelecting: function () {
            var a = this.get_container();
            return null != a && null != a.get_selectionObject() && 0 < a.get_selectionObject().get_selectedObjects().get_count() ? (this._selecting = !1, !0) : !1
        },
        _editDesigner_Edit: function (a, b) {
            if (b.get_operationStatus() === lt.Annotations.Core.AnnDesignerOperationStatus.start) {
                if (!this._internalOnBeforeObjectChanged2(b.get_object(),
                        31)) {
                    b.set_cancel(!0);
                    return
                }
                this._editObjectOriginalBounds = b.get_operation() === lt.Annotations.Core.AnnEditDesignerOperation.move && null != this._editDesigner && null != this._editDesigner.get_targetObject() ? this._editDesigner.get_targetObject().get_bounds() : lt.Annotations.Automation._leadRectDExtensions.get_empty();
                this.beginUndo()
            } else if (b.get_operationStatus() === lt.Annotations.Core.AnnDesignerOperationStatus.working)b.get_operation() === lt.Annotations.Core.AnnEditDesignerOperation.move && null != this._editDesigner &&
            null != this._editDesigner.get_targetObject() && this._doDragDrop(a, b, 2); else if (b.get_operationStatus() === lt.Annotations.Core.AnnDesignerOperationStatus.end) {
                var c = !0;
                b.get_operation() === lt.Annotations.Core.AnnEditDesignerOperation.move && (c = this._doDragDrop(a, b, 3));
                if (c)this.endUndo(); else if (this.cancelUndo(), null != this._editDesigner && null != this._editDesigner.get_targetObject() && !lt.Annotations.Automation._leadRectDExtensions.isEmpty(this._editObjectOriginalBounds)) {
                    var d = this._editDesigner.get_targetObject().get_bounds(),
                        e = this._editObjectOriginalBounds.get_x() - d.get_x(), d = this._editObjectOriginalBounds.get_y() - d.get_y();
                    (!lt.LeadDoubleTools.isZero(e) || !lt.LeadDoubleTools.isZero(d)) && this._editDesigner.callMove(e, d)
                }
                this.get_manager().get_restrictDesigners() && this._restrictObjectToContainer(b.get_object(), this._activeContainer, this._editDesigner);
                this._dragDropEventArgs = null;
                c && null != this._editDesigner && this._editDesigner.get_isModified() && this._internalOnAfterObjectChanged2(b.get_object(), 31)
            }
            null != this.__edit &&
            this.__edit(a, b)
        },
        _restrictObjectToContainer: function (a, b, c) {
            if (null != a) {
                var b = b.get_mapper().rectToContainerCoordinates(this.getContainerInvalidRect(b, !1)), d = a.get_bounds();
                if (!lt.Annotations.Automation._leadRectDExtensions.containsRect(b, d)) {
                    var e = 0, f = 0;
                    lt.Annotations.Automation._leadRectDExtensions.right(d) > lt.Annotations.Automation._leadRectDExtensions.right(b) ? e = lt.Annotations.Automation._leadRectDExtensions.right(b) - lt.Annotations.Automation._leadRectDExtensions.right(d) : lt.Annotations.Automation._leadRectDExtensions.left(d) <
                    lt.Annotations.Automation._leadRectDExtensions.left(b) && (e = lt.Annotations.Automation._leadRectDExtensions.left(b) - lt.Annotations.Automation._leadRectDExtensions.left(d));
                    lt.Annotations.Automation._leadRectDExtensions.top(d) < lt.Annotations.Automation._leadRectDExtensions.top(b) ? f = lt.Annotations.Automation._leadRectDExtensions.top(b) - lt.Annotations.Automation._leadRectDExtensions.top(d) : lt.Annotations.Automation._leadRectDExtensions.bottom(d) > lt.Annotations.Automation._leadRectDExtensions.bottom(b) &&
                    (f = lt.Annotations.Automation._leadRectDExtensions.bottom(b) - lt.Annotations.Automation._leadRectDExtensions.bottom(d));
                    if (!lt.LeadDoubleTools.isZero(e) || !lt.LeadDoubleTools.isZero(f))null != c ? c.callMove(e, f) : a.translate(e, f);
                    this.invalidateObject(a)
                }
            }
        },
        _dragDropEventArgs: null,
        _doDragDrop: function (a, b, c) {
            if (!this.get_enableDragDrop() || b.get_operation() !== lt.Annotations.Core.AnnEditDesignerOperation.move || null == this._lastPointerEventArgs)return !0;
            var a = Type.safeCast(a, lt.Annotations.Designers.AnnEditDesigner),
                b = a.get_targetObject(), d = null;
            if (null == this._dragDropEventArgs) {
                if (3 === c)return !0;
                for (var e = ss.IEnumerator.getEnumerator(this._containers); e.moveNext();) {
                    var f = e.current;
                    if (f.get_children().contains(b) || f.get_selectionObject() === b) {
                        d = f;
                        break
                    }
                }
                if (null == d)return !0
            } else d = this._dragDropEventArgs.get_sourceContainer();
            var g = lt.Annotations.Automation._leadPointDExtensions.clone(this._lastPointerEventArgs.get_location()), e = this.hitTestContainer(g, !1);
            if (e === d && null == this._dragDropEventArgs)return !0;
            null !=
            e && !e.get_isEnabled() && (e = null);
            if (null == e && null != d) {
                for (var h = null, i = -1, j = d.get_mapper().rectFromContainerCoordinates(b.get_bounds(), lt.Annotations.Core.AnnFixedStateOperations.none), k = ss.IEnumerator.getEnumerator(this._containers); k.moveNext();)if (f = k.current, f.get_isEnabled() && f.get_isVisible() && this.get_manager().get_enablePartialDrop()) {
                    var l = this.getContainerInvalidRect(f, !1), l = lt.Annotations.Automation._leadRectDExtensions.intersectRects(l, j);
                    lt.Annotations.Automation._leadRectDExtensions.isEmpty(l) ||
                    (l = l.get_width() * l.get_height(), l > i && (h = f, i = l))
                }
                null != h && (e = h)
            }
            if (null == this._dragDropEventArgs) {
                if (2 !== c)return !0;
                this._dragDropEventArgs = lt.Annotations.Automation.AnnDragDropEventArgs.create(b, d, d, 1, d)
            }
            this._dragDropEventArgs.get_targetContainer() !== e && (this._dragDropEventArgs._setTargetContainer(e), this._dragDropEventArgs._setOperation(1), this._dragDropEventArgs._setOperationContainer(this._dragDropEventArgs.get_operationContainer()), null == e && this._dragDropEventArgs._setCanDrop(!1), this._callDragDrop(this._dragDropEventArgs),
                this._dragDropEventArgs._setOperation(0), this._dragDropEventArgs._setOperationContainer(this._dragDropEventArgs.get_targetContainer()), this._callDragDrop(this._dragDropEventArgs), this._fireSetCursor(b.get_id(), 3, -1, !1, !1, this._lastPointerEventArgs, this._dragDropEventArgs));
            this._dragDropEventArgs._setOperation(c);
            f = !1;
            h = !0;
            if (2 !== c || this._dragDropEventArgs.get_sourceContainer() !== this._dragDropEventArgs.get_targetContainer())null != d && null != e && (this.get_manager().get_enablePartialDrop() || (l = this.getContainerInvalidRect(e,
                !1), c = d.get_mapper().rectFromContainerCoordinates(b.get_bounds(), lt.Annotations.Core.AnnFixedStateOperations.none), lt.Annotations.Automation._leadRectDExtensions.containsRect(l, c) || (h = !1)), this._dragDropEventArgs._setCanDrop(h)), this._callDragDrop(this._dragDropEventArgs), f = this._dragDropEventArgs.get_allowed() && this._dragDropEventArgs.get_canDrop(), this._fireSetCursor(b.get_id(), 3, -1, !1, !1, this._lastPointerEventArgs, this._dragDropEventArgs);
            3 === this._dragDropEventArgs.get_operation() && this._fireRestoreCursor();
            if (f && 3 === this._dragDropEventArgs.get_operation() && null != e) {
                c = d.get_mapper().pointToContainerCoordinates(g);
                g = e.get_mapper().pointToContainerCoordinates(g);
                if (!h)return !1;
                j = Type.safeCast(b, lt.Annotations.Core.AnnSelectionObject);
                h = null;
                i = new lt.Annotations.Core.AnnObjectCollection;
                if (null != j) {
                    h = new lt.Annotations.Core.AnnObjectCollection;
                    for (j = ss.IEnumerator.getEnumerator(j.get_selectedObjects()); j.moveNext();)k = j.current, d.get_children().remove(k), !lt.Annotations.Automation._leadPointDExtensions.isEmpty(c) && !lt.Annotations.Automation._leadPointDExtensions.isEmpty(g) && k.translate(g.get_x() - c.get_x(), g.get_y() - c.get_y()), this.get_manager().get_restrictDesigners() && this._restrictObjectToContainer(k, e, this._editDesigner), e.get_children().add(k), h.add(k), i.add(k)
                } else d.get_children().remove(b), !lt.Annotations.Automation._leadPointDExtensions.isEmpty(c) && !lt.Annotations.Automation._leadPointDExtensions.isEmpty(g) && b.translate(g.get_x() - c.get_x(), g.get_y() - c.get_y()), e.get_children().add(b), i.add(b);
                null !=
                a && (0 < i.get_count() && this.invokeAfterObjectChanged(i, 3), this._setActiveContainer(e), 0 < i.get_count() && this.invokeAfterObjectChanged(i, 34), null != h ? this.selectObjects(h) : this._startEditing(b, !1, !0, null))
            }
            return f
        },
        _drawDesigner_Draw: function (a, b) {
            switch (b.get_operationStatus()) {
                case lt.Annotations.Core.AnnDesignerOperationStatus.end:
                    this.endUndo();
                    this._internalOnAfterObjectChanged2(b.get_object(), 30);
                    var c = null != this.get_currentDesigner() ? this.get_currentDesigner().get_targetObject() : null;
                    this._endDrawDesigner(!0,
                        !1);
                    if (null != c) {
                        var d = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                        null != d ? null != d && 1 < d.get_selectedObjects().get_count() ? this._startEditing(c, !1, !0, null) : 1 === d.get_selectedObjects().get_count() && this._startEditing(d.get_selectedObjects().get_item(0), !1, !0, null) : this.get_manager().get_editObjectAfterDraw() ? this._drawEditMode ? this._startDrawing(this.get_manager().get_currentObjectId()) : (this.get_manager().set_currentObjectId(lt.Annotations.Core.AnnObject.selectObjectId), null != this._editDesigner &&
                        null != this._editDesigner.get_targetObject() && this._editDesigner.end(), this._startEditing(c, !1, !0, null)) : this._startDrawing(this.get_manager().get_currentObjectId())
                    }
                    break;
                case lt.Annotations.Core.AnnDesignerOperationStatus.canceled:
                    this.cancelUndo(), this._endDrawDesigner(!0, !0), this.get_manager().get_editObjectAfterDraw() && this.get_manager().set_currentObjectId(lt.Annotations.Core.AnnObject.selectObjectId)
            }
            null != this.__draw && this.__draw(a, b)
        },
        get_active: function () {
            return null == this.get_container() ?
                !1 : this._active
        },
        set_active: function (a) {
            if (null != this.get_container()) {
                if (a !== this.get_active())if (a) {
                    for (var b = ss.IEnumerator.getEnumerator(this.get_manager().get_automations()); b.moveNext();) {
                        var c = b.current;
                        c !== this && c.get_active() && (c.set_active(!1), this.get_manager().get_cancelInactiveDesigners() && c.detach())
                    }
                    null != this._automationControl && !this.get_active() && (this._active = !0, this.attach(this._automationControl), this._automationControl.automationAttach(this._activeContainer))
                } else {
                    this._active = !1;
                    this.get_manager().get_cancelInactiveDesigners() && (null != this._drawDesigner && this._endDrawDesigner(!1, !1), null != this._editDesigner && this._endEditDesigner(!0), null != this._runDesigner && this._endRunDesigner(!0), this._selecting && this._cancelSelecting(), null != this._automationControl && this._automationControl.automationDetach());
                    for (var b = !0, d = ss.IEnumerator.getEnumerator(this.get_manager().get_automations()); d.moveNext();)if (c = d.current, c !== this && c.get_active()) {
                        b = !1;
                        break
                    }
                    b && this._fireRestoreCursor()
                }
                return a
            }
        },
        _fireRestoreCursor: function () {
            null != this.get_container() && null != this.__restoreCursor && this.__restoreCursor(this, lt.LeadEventArgs.Empty)
        },
        cancel: function () {
            this._internalEndDesigner(!0)
        },
        beginUndo: function () {
            if (null != this.get_container())for (var a = ss.IEnumerator.getEnumerator(this._containers); a.moveNext();) {
                var b = a.current;
                this._undoRedos[this._containers.indexOf(b)].prepare(b.get_children(), this.get_currentEditObject())
            }
        },
        onUndoRedoChanged: function (a) {
            null != this.__undoRedoChanged && this.__undoRedoChanged(this,
                a)
        },
        add_afterUndoRedo: function (a) {
            this.__afterUndoRedo = ss.Delegate.combine(this.__afterUndoRedo, a)
        },
        remove_afterUndoRedo: function (a) {
            this.__afterUndoRedo = ss.Delegate.remove(this.__afterUndoRedo, a)
        },
        __afterUndoRedo_handler_get: function () {
            null == this.__afterUndoRedo_handler && (this.__afterUndoRedo_handler = ss.EventHandler.create(this, this.add_afterUndoRedo, this.remove_afterUndoRedo));
            return this.__afterUndoRedo_handler
        },
        __afterUndoRedo: null,
        __afterUndoRedo_handler: null,
        onAfterUndoRedo: function (a) {
            null !=
            this.__afterUndoRedo && this.__afterUndoRedo(this, a)
        },
        endUndo: function () {
            if (null != this.get_container()) {
                for (var a = ss.IEnumerator.getEnumerator(this._containers); a.moveNext();)this._undoRedos[this._containers.indexOf(a.current)].commit();
                this.onUndoRedoChanged(lt.LeadEventArgs.Empty)
            }
        },
        cancelUndo: function () {
            if (null != this.get_container()) {
                for (var a = ss.IEnumerator.getEnumerator(this._containers); a.moveNext();)this._undoRedos[this._containers.indexOf(a.current)].cancel();
                this.onUndoRedoChanged(lt.LeadEventArgs.Empty)
            }
        },
        undo: function () {
            if (this._isVisibleEnabledContainer(this.get_container())) {
                var a = this.get_currentEditObject();
                null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && this._endEditDesigner(!0);
                for (var b = ss.IEnumerator.getEnumerator(this._containers); b.moveNext();) {
                    var c = b.current;
                    this._isVisibleEnabledContainer(c) && (c.get_children().add_collectionChanged(ss.Delegate.create(this, this._children_CollectionChanged)), null != c.get_activeLayer() && c.get_activeLayer().get_children().clear(),
                        a = this._undoRedos[this._containers.indexOf(c)].undo(c.get_children(), a), c.get_children().remove_collectionChanged(ss.Delegate.create(this, this._children_CollectionChanged)), this._updateContainerInvalidRect(c))
                }
                this.onUndoRedoChanged(lt.LeadEventArgs.Empty);
                this.onAfterUndoRedo(lt.LeadEventArgs.Empty);
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        _children_CollectionChanged: function (a, b) {
            b.get_action() === lt.Annotations.Core.AnnNotifyCollectionChangedAction.add && this._addObject(Type.safeCast(b.get_newItems()[0],
                lt.Annotations.Core.AnnObject));
            b.get_action() === lt.Annotations.Core.AnnNotifyCollectionChangedAction.remove && this._deleteObject(Type.safeCast(b.get_newItems()[0], lt.Annotations.Core.AnnObject));
            if (b.get_action() === lt.Annotations.Core.AnnNotifyCollectionChangedAction.reset)for (var c = ss.IEnumerator.getEnumerator(b.get_newItems()); c.moveNext();)this._deleteObject(c.current)
        },
        redo: function () {
            if (this._isVisibleEnabledContainer(this.get_container())) {
                var a = this.get_currentEditObject();
                null != this._designer &&
                Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && this._endEditDesigner(!0);
                for (var b = ss.IEnumerator.getEnumerator(this._containers); b.moveNext();) {
                    var c = b.current;
                    null != c.get_activeLayer() && c.get_activeLayer().get_children().clear();
                    c.get_selectionObject().get_selectedObjects().clear();
                    c.get_children().add_collectionChanged(ss.Delegate.create(this, this._children_CollectionChanged));
                    a = this._undoRedos[this._containers.indexOf(c)].redo(c.get_children(), a);
                    c.get_children().remove_collectionChanged(ss.Delegate.create(this,
                        this._children_CollectionChanged));
                    null != a && this._startEditing(a, !1, !0, null);
                    this._updateContainerInvalidRect(c)
                }
                this.onUndoRedoChanged(lt.LeadEventArgs.Empty);
                this.onAfterUndoRedo(lt.LeadEventArgs.Empty);
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        _deleteGroupObjects: function (a, b) {
            for (; 0 < b.get_selectedObjects().get_count();) {
                var c = b.get_selectedObjects().get_item(0), d = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                null != d && this._deleteGroupObjects(a, d);
                b.get_selectedObjects().remove(c);
                c.get_isLocked() && a.get_children().add(c)
            }
        },
        _internalOnBeforeObjectChanged: function (a, b) {
            if (null != this.get_container() && null != a && 0 < a.get_count()) {
                var c = new lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs(a, b, null);
                this.onBeforeObjectChanged(c);
                return !c.get_cancel()
            }
            return !0
        },
        _internalOnBeforeObjectChanged2: function (a, b) {
            if (null != a) {
                var c = new lt.Annotations.Core.AnnObjectCollection;
                c.add(a);
                return this._internalOnBeforeObjectChanged(c, b)
            }
            return !0
        },
        onObjectModified: function (a) {
            null !=
            this.__objectModified && this.__objectModified(this.get_container(), a)
        },
        invokeObjectModified: function (a, b) {
            if (null != a && 0 < a.get_count())this.onObjectModified(new lt.Annotations.Automation.AnnObjectModifiedEventArgs(a, b))
        },
        _internalOnObjectModified2: function (a, b) {
            if (null != a) {
                var c = new lt.Annotations.Core.AnnObjectCollection;
                c.add(a);
                this.invokeObjectModified(c, b)
            }
        },
        invokeAfterObjectChanged: function (a, b) {
            this._doInvokeAfterObjectChanged(a, b)
        },
        _doInvokeAfterObjectChanged: function (a, b) {
            if (null != this.get_container() &&
                null != a && 0 < a.get_count()) {
                this._checkRestrictObjectsIntoContainer(a, b);
                (34 === b || 30 === b) && this.invokeObjectModified(a, 34);
                var c = new lt.Annotations.Automation.AnnAfterObjectChangedEventArgs(a, b, this._designer);
                this.onAfterObjectChanged(c);
                return !c.get_cancel()
            }
            return !0
        },
        _internalOnAfterObjectChanged2: function (a, b) {
            if (null != a) {
                var c = new lt.Annotations.Core.AnnObjectCollection;
                c.add(a);
                return this._doInvokeAfterObjectChanged(c, b)
            }
            return !0
        },
        add_beforeObjectChanged: function (a) {
            this.__beforeObjectChanged =
                ss.Delegate.combine(this.__beforeObjectChanged, a)
        },
        remove_beforeObjectChanged: function (a) {
            this.__beforeObjectChanged = ss.Delegate.remove(this.__beforeObjectChanged, a)
        },
        __beforeObjectChanged_handler_get: function () {
            null == this.__beforeObjectChanged_handler && (this.__beforeObjectChanged_handler = ss.EventHandler.create(this, this.add_beforeObjectChanged, this.remove_beforeObjectChanged));
            return this.__beforeObjectChanged_handler
        },
        __beforeObjectChanged: null,
        __beforeObjectChanged_handler: null,
        add_afterObjectChanged: function (a) {
            this.__afterObjectChanged =
                ss.Delegate.combine(this.__afterObjectChanged, a)
        },
        remove_afterObjectChanged: function (a) {
            this.__afterObjectChanged = ss.Delegate.remove(this.__afterObjectChanged, a)
        },
        __afterObjectChanged_handler_get: function () {
            null == this.__afterObjectChanged_handler && (this.__afterObjectChanged_handler = ss.EventHandler.create(this, this.add_afterObjectChanged, this.remove_afterObjectChanged));
            return this.__afterObjectChanged_handler
        },
        __afterObjectChanged: null,
        __afterObjectChanged_handler: null,
        onBeforeObjectChanged: function (a) {
            null !=
            this.__beforeObjectChanged && this.__beforeObjectChanged(this, a)
        },
        onAfterObjectChanged: function (a) {
            null != this.__afterObjectChanged && this.__afterObjectChanged(this, a);
            this._updateContainerInvalidRect(this._activeContainer)
        },
        _updateContainerInvalidRect: function (a) {
            if (null != a) {
                for (var b = lt.Annotations.Automation._leadRectDExtensions.get_empty(), c = ss.IEnumerator.getEnumerator(a.get_children()); c.moveNext();) {
                    var d = c.current;
                    d.get_isVisible() && (d = this._getObjectWithContainerInvalidateRect(a, d), b = lt.Annotations.Automation._leadRectDExtensions.unionRects(b,
                        d))
                }
                a.set_totalObjectsInvalidRect(b)
            }
        },
        getContainerInvalidRect: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("container");
            if (!a.get_isVisible() || lt.Annotations.Automation._leadSizeDExtensions.isEmpty(a.get_size()))return lt.Annotations.Automation._leadRectDExtensions.get_empty();
            var c = lt.Annotations.Automation._leadRectDExtensions.create(0, 0, a.get_size().get_width(), a.get_size().get_height()), d = [lt.Annotations.Automation._leadRectDExtensions.topLeft(c), lt.Annotations.Automation._leadRectDExtensions.topRight(c),
                lt.Annotations.Automation._leadRectDExtensions.bottomRight(c), lt.Annotations.Automation._leadRectDExtensions.bottomLeft(c)], c = a.get_mapper().rectFromContainerCoordinates(c, lt.Annotations.Core.AnnFixedStateOperations.none);
            if (!a.get_mapper().get_rotateTransform().get_isIdentity()) {
                d = a.get_mapper().pointsFromContainerCoordinates(d, lt.Annotations.Core.AnnFixedStateOperations.none);
                for (d = ss.IEnumerator.getEnumerator(d); d.moveNext();) {
                    var e = d.current;
                    lt.Annotations.Automation._leadRectDExtensions.containsPoint(c,
                        e) || (c = lt.Annotations.Automation._leadRectDExtensions.unionPoint(c, e))
                }
            }
            null != a.get_stroke() && (d = a.get_mapper().strokeFromContainerCoordinates(a.get_stroke(), lt.Annotations.Core.AnnFixedStateOperations.strokeWidth).get_strokeThickness().get_value() / 2, c = lt.Annotations.Automation._leadRectDExtensions.inflate(c, d, d));
            b && (d = lt.Annotations.Automation._leadRectDExtensions.clone(a.get_totalObjectsInvalidRect()), c = lt.Annotations.Automation._leadRectDExtensions.unionRects(d, c));
            return c
        },
        _startRunning: function (a) {
            var b =
                this.get_container();
            if (this._isVisibleEnabledContainer(b)) {
                var c = this.get_manager().findObject(a);
                null != c && null != c.get_runDesignerType() && (c = c.get_runDesignerType(), this._runDesigner = Type.safeCast(new c(this._automationControl, b, a), lt.Annotations.Designers.AnnRunDesigner), this._runDesigner.set_snapToGridOptions(this.get_manager().get_snapToGridOptions()), this._runDesigner.start(), this._designer = this._runDesigner, this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty), this._runDesigner.set_restrictDesigners(this.get_manager().get_restrictDesigners()),
                    this._runDesigner.add_run(ss.Delegate.create(this, this._runDesigner_Run)))
            }
        },
        _runDesigner_Run: function (a, b) {
            null != this.__run && this.__run(a, b);
            switch (b.get_operationStatus()) {
                case lt.Annotations.Core.AnnDesignerOperationStatus.end:
                case lt.Annotations.Core.AnnDesignerOperationStatus.canceled:
                    this._endRunDesigner(!1)
            }
        },
        _endRunDesigner: function (a) {
            null != this._runDesigner && (a && this._runDesigner.cancel(), this._runDesigner.remove_run(ss.Delegate.create(this, this._runDesigner_Run)), this._runDesigner.end(),
                this._designer = this._runDesigner = null, this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty))
        },
        lock: function () {
            if (null != this.get_container() && this.get_canLock() && null != this.__lockObject) {
                this.beginUndo();
                var a = this.get_currentEditObject();
                if (null != a) {
                    var b = lt.Annotations.Core.AnnLockObjectEventArgs.create(a);
                    this.__lockObject(this, b);
                    if (b.get_cancel()) {
                        this.cancelUndo();
                        return
                    }
                    a.lock(b.get_password());
                    this._internalOnAfterObjectChanged2(a, 4)
                }
                this.endUndo();
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        _isDesignModeContainer: function (a) {
            return !(null == a || !a.get_isEnabled() || !a.get_isVisible() || a.get_userMode() !== lt.Annotations.Core.AnnUserMode.design)
        },
        _isVisibleEnabledContainer: function (a) {
            return !(null == a || !a.get_isVisible() || !a.get_isEnabled())
        },
        get_canUnlock: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner))if (this._editDesigner.get_targetObject() === a.get_selectionObject())for (a =
                                                                                                                                                                                                ss.IEnumerator.getEnumerator(a.get_selectionObject().get_selectedObjects()); a.moveNext();) {
                var b = a.current;
                if (b.get_isLocked())return lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.unlockObjects, b, this.get_container())
            } else return this._editDesigner.get_targetObject().get_isLocked() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.unlockObjects, this._editDesigner.get_targetObject(), this.get_container());
            return !1
        },
        unlock: function () {
            if (null != this.get_container() && this.get_canUnlock() && null != this.__unlockObject) {
                this.beginUndo();
                var a = this.get_currentEditObject();
                if (null != a) {
                    var b = lt.Annotations.Core.AnnLockObjectEventArgs.create(a);
                    this.__unlockObject(this, b);
                    if (b.get_cancel()) {
                        this.cancelUndo();
                        return
                    }
                    a.unlock(b.get_password());
                    this._internalOnAfterObjectChanged2(a, 5);
                    this.invalidateObject(a)
                }
                this.endUndo()
            }
        },
        get_manager: function () {
            return this._automationManager
        },
        get_container: function () {
            return this._activeContainer
        },
        get_currentDesigner: function () {
            return null == this.get_container() ? null : this._designer
        },
        get_currentEditObject: function () {
            var a = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner);
            return null != this.get_container() && null != a && (this.get_container().get_children().contains(a.get_targetObject()) || Type.canCast(a, lt.Annotations.Designers.AnnSelectionEditDesigner)) ? a.get_targetObject() : null
        },
        get_canUndo: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : this._undoRedo.get_canUndo()
        },
        get_canRedo: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : this._undoRedo.get_canRedo()
        },
        get_undoCapacity: function () {
            return this._undoRedo.get_capacity()
        },
        set_undoCapacity: function (a) {
            0 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Undo capacity must be a value greater than or equal to 0");
            this._undoRedo.set_capacity(a);
            this.onUndoRedoChanged(lt.LeadEventArgs.Empty);
            return a
        },
        get_canLock: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner))if (this._editDesigner.get_targetObject() === a.get_selectionObject())for (a = ss.IEnumerator.getEnumerator(a.get_selectionObject().get_selectedObjects()); a.moveNext();) {
                var b = a.current;
                if (!b.get_isLocked())return lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.lockObjects, b, this.get_container())
            } else return !this._editDesigner.get_targetObject().get_isLocked() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.lockObjects,
                    this._editDesigner.get_targetObject(), this.get_container());
            return !1
        },
        get_canRealizeRedaction: function () {
            if (!this._isDesignModeContainer(this.get_container()) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && Type.canCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnRedactionObject)) {
                var a = Type.safeCast(this._editDesigner.get_targetObject(),
                    lt.Annotations.Core.AnnRedactionObject);
                if (null != a)return !a.get_canRestore() && !a.get_isLocked() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.realizeRedact, a, this.get_container())
            }
            return !1
        },
        realizeRedaction: function () {
            null != this.get_container() && this.get_canRealizeRedaction() && (this._internalRealizeRedaction(this._editDesigner.get_targetObject(), !0), this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()))
        },
        _internalRealizeRedaction: function (a,
                                             b) {
            var c = lt.Annotations.Automation._leadRectDExtensions.get_empty(), c = null, d = new lt.Annotations.Core.AnnObjectCollection;
            d.add(a);
            (b ? this._internalOnBeforeObjectChanged(d, 8) : 1) && (c = Type.safeCast(a, lt.Annotations.Core.AnnRedactionObject));
            c = lt.Annotations.Core.Utils.realizeRedactWinforms(this._automationControl, this._activeContainer, c);
            null != this.get_manager().get_redactionRealizePassword() && this.get_manager().get_redactionRealizePassword().length && a.lock(this.get_manager().get_redactionRealizePassword());
            b && this.invokeAfterObjectChanged(d, 8);
            return c
        },
        get_canRestoreRedaction: function () {
            if (!this._isDesignModeContainer(this.get_container()) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && Type.canCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnRedactionObject)) {
                var a = Type.safeCast(this._editDesigner.get_targetObject(),
                    lt.Annotations.Core.AnnRedactionObject);
                return a.get_canRestore() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.restoreRedact, a, this.get_container())
            }
            return !1
        },
        restoreRedaction: function () {
            null != this.get_container() && this.get_canRestoreRedaction() && (this._internalRestoreRedaction(this._editDesigner.get_targetObject(), !0), this.invalidateObject(this._editDesigner.get_targetObject()))
        },
        _internalRestoreRedaction: function (a, b) {
            var c = lt.Annotations.Automation._leadRectDExtensions.get_empty(),
                d = null, e = new lt.Annotations.Core.AnnObjectCollection;
            e.add(a);
            (b ? this._internalOnBeforeObjectChanged(e, 9) : 1) && (d = Type.safeCast(a, lt.Annotations.Core.AnnRedactionObject));
            null != d && (c = lt.Annotations.Core.Utils.restoreRedactWinforms(this._automationControl, this.get_container(), d));
            null != this.get_manager().get_redactionRealizePassword() && this.get_manager().get_redactionRealizePassword().length && d.get_isLocked() && lt.Annotations.Core.Utils.compare(d.get_password(), this.get_manager().get_redactionRealizePassword(),
                !1) && d.unlock(this.get_manager().get_redactionRealizePassword());
            b && this.invokeAfterObjectChanged(e, 9);
            return c
        },
        get_canRealizeAllRedactions: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (0 < a.get_children().get_count())for (var b, a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                var c = a.current;
                b = Type.safeCast(c, lt.Annotations.Core.AnnRedactionObject);
                if (null != b) {
                    if (!b.get_canRestore())return !0
                } else if (b = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject), null != b)for (c = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); c.moveNext();)if (b = Type.safeCast(c.current, lt.Annotations.Core.AnnRedactionObject), null != b && !b.get_canRestore())return !0
            }
            return !1
        },
        realizeAllRedactions: function () {
            var a = this.get_container();
            if (null != a && this.get_canRealizeAllRedactions()) {
                for (var b, c = new lt.Annotations.Core.AnnObjectCollection, a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                    var d =
                        a.current;
                    b = Type.safeCast(d, lt.Annotations.Core.AnnRedactionObject);
                    if (null != b)b.get_canRestore() || c.add(d); else if (d = Type.safeCast(d, lt.Annotations.Core.AnnSelectionObject), null != d)for (d = ss.IEnumerator.getEnumerator(d.get_selectedObjects()); d.moveNext();) {
                        var e = d.current;
                        b = Type.safeCast(e, lt.Annotations.Core.AnnRedactionObject);
                        null != b && !b.get_canRestore() && c.add(e)
                    }
                }
                a = lt.Annotations.Automation._leadRectDExtensions.get_empty();
                b = !0;
                if (this._internalOnBeforeObjectChanged(c, 8)) {
                    for (e = ss.IEnumerator.getEnumerator(c); e.moveNext();)d =
                        e.current, d = this._internalRealizeRedaction(d, !1), b ? (a = d, b = !1) : a = lt.Annotations.Automation._leadRectDExtensions.unionRects(a, d);
                    this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty());
                    this.invokeAfterObjectChanged(c, 8)
                }
            }
        },
        get_canRestoreAllRedactions: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (0 < a.get_children().get_count())for (var b,
                                                          a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                var c = a.current;
                b = Type.safeCast(c, lt.Annotations.Core.AnnRedactionObject);
                if (null != b) {
                    if (b.get_canRestore())return !0
                } else if (b = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject), null != b)for (c = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); c.moveNext();)if (b = Type.safeCast(c.current, lt.Annotations.Core.AnnRedactionObject), null != b && b.get_canRestore())return !0
            }
            return !1
        },
        restoreAllRedactions: function () {
            var a = this.get_container();
            if (null != a && this.get_canRestoreAllRedactions()) {
                for (var b = new lt.Annotations.Core.AnnObjectCollection, c, a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                    var d = a.current;
                    c = Type.safeCast(d, lt.Annotations.Core.AnnRedactionObject);
                    if (null != c)c.get_canRestore() && b.add(d); else if (d = Type.safeCast(d, lt.Annotations.Core.AnnSelectionObject), null != d)for (d = ss.IEnumerator.getEnumerator(d.get_selectedObjects()); d.moveNext();) {
                        var e = d.current;
                        c = Type.safeCast(e, lt.Annotations.Core.AnnRedactionObject);
                        null != c && c.get_canRestore() && b.add(e)
                    }
                }
                lt.Annotations.Automation.AnnAutomation._reverseObjects(b);
                if (this._internalOnBeforeObjectChanged(b, 9)) {
                    a = lt.Annotations.Automation._leadRectDExtensions.get_empty();
                    c = !0;
                    for (e = ss.IEnumerator.getEnumerator(b); e.moveNext();)d = e.current, d = this._internalRestoreRedaction(d, !1), c ? (a = d, c = !1) : a = lt.Annotations.Automation._leadRectDExtensions.unionRects(a, d);
                    this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty());
                    this.invokeAfterObjectChanged(b, 9)
                }
            }
        },
        get_canSelectObjects: function () {
            var a = this.get_container();
            return !this._isDesignModeContainer(a) || null == this._automationControl ? !1 : 0 < a.get_children().get_count()
        },
        selectObject: function (a) {
            if (null != a) {
                var b = new lt.Annotations.Core.AnnObjectCollection;
                b.add(a);
                this.selectObjects(b)
            } else this.selectObjects(null)
        },
        selectObjects: function (a) {
            var b = this.get_container();
            if (null != b)if (null == a || !a.get_count())this.cancel(), 0 < b.get_selectionObject().get_selectedObjects().get_count() && b.get_selectionObject().get_selectedObjects().clear(),
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()); else if (this.cancel(), 1 === a.get_count())a.get_item(0) !== this.get_currentEditObject() && (this._startEditing(a.get_item(0), !1, !1, a.get_item(0)), this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())); else {
                a = a.toArray();
                b = b.get_selectionObject();
                b.get_selectedObjects().clear();
                b.adjustBounds();
                for (a = ss.IEnumerator.getEnumerator(a); a.moveNext();) {
                    var c = a.current;
                    c.get_isVisible() && b.get_selectedObjects().add(c)
                }
                this.get_manager().get_enableObjectsAlignment() &&
                1 < b.get_selectedObjects().get_count() && null == b.get_alignmentTarget() && (b.set_alignmentTarget(b.get_selectedObjects().get_item(b.get_selectedObjects().get_count() - 1)), b.get_alignmentTarget().set_isAlignmentTarget(!0));
                1 === b.get_selectedObjects().get_count() ? b.get_selectedObjects().get_item(0) !== this.get_currentEditObject() && this._startEditing(b.get_selectedObjects().get_item(0), !1, !1, b.get_selectedObjects().get_item(0)) : this._startEditing(b, !1, !1, null);
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        _isLocked: function (a) {
            var b = !1;
            null != a && (b = Type.safeCast(a, lt.Annotations.Core.AnnSelectionObject), b = null != b && 0 < b.get_selectedObjects().get_count() ? b.get_selectedObjects().get_item(0).get_isLocked() : a.get_isLocked());
            return b
        },
        _canEdited: function (a) {
            var b = null, c = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner);
            null != c && (b = c.get_targetObject());
            return (null != b && b.get_isSelected() && !this._isLocked(b) || a === lt.Annotations.Core.AnnOperationType.pasteObjects) && lt.Annotations.Automation.AnnAutomation._isUserInRole(a,
                    b, this.get_container())
        },
        get_canDeleteObjects: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : this._canEdited(lt.Annotations.Core.AnnOperationType.deleteObjects)
        },
        deleteSelectedObjects: function () {
            var a = this.get_container();
            if (null != a && this.get_canDeleteObjects()) {
                this.beginUndo();
                var b = null;
                null != this._designer && (b = this._designer.getRenderer());
                var c = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner).get_targetObject(), d = new lt.Annotations.Core.AnnObjectCollection,
                    e = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                if (null != e)for (e = ss.IEnumerator.getEnumerator(e.get_selectedObjects()); e.moveNext();)c = e.current, c.get_isLocked() || d.add(c); else d.add(c);
                if (this._internalOnBeforeObjectChanged(d, 3)) {
                    this._endEditDesigner(!1);
                    this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty);
                    if (0 < d.get_count()) {
                        e = lt.Annotations.Automation._leadRectDExtensions.get_empty();
                        for (c = 0; c < d.get_count(); ++c) {
                            var f = d.get_item(c), e = lt.Annotations.Automation._leadRectDExtensions.unionRects(e,
                                f.getInvalidateRect(a.get_mapper(), b));
                            Type.canCast(f, lt.Annotations.Core.AnnSelectionObject) && this._deleteGroupObjects(a, Type.safeCast(f, lt.Annotations.Core.AnnSelectionObject));
                            a.get_children().remove(f);
                            null != a.get_selectionObject() && a.get_selectionObject().get_selectedObjects().contains(f) && a.get_selectionObject().get_selectedObjects().remove(f)
                        }
                        this.invalidate(e)
                    }
                    this.endUndo();
                    this.invokeAfterObjectChanged(d, 3)
                }
            }
        },
        get_canShowProperties: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a = this.get_currentEditObject();
            return null != a && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.editObjects, a, this.get_container())
        },
        _userModeChanged: function () {
            if (null != this.get_container()) {
                this.cancel();
                for (var a = ss.IEnumerator.getEnumerator(this._containers); a.moveNext();) {
                    var b = a.current;
                    if (this.get_manager().get_userMode() === lt.Annotations.Core.AnnUserMode.design && b.get_isVisible() && b.get_isEnabled())for (var c = ss.IEnumerator.getEnumerator(b.get_children()); c.moveNext();) {
                        var d =
                            c.current;
                        d.get_id() === lt.Annotations.Core.AnnObject.textRollupObjectId && (d = Type.safeCast(d, lt.Annotations.Core.AnnTextRollupObject), null != d && d.set_expanded(!0))
                    }
                    b.set_userMode(this.get_manager().get_userMode())
                }
                this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        get_canApplyDecryptor: function () {
            if (!this._isDesignModeContainer(this.get_container()) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (null !=
                this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var a = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnEncryptObject);
                if (null != a)return a.get_canDecrypt() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.decryptObjects, a, this.get_container())
            }
            return !1
        },
        get_canApplyEncryptor: function () {
            if (!this._isDesignModeContainer(this.get_container()) || null == this._automationControl || !lt.Annotations.Core.Utils.dataProviderCanReadWrite(this._automationControl))return !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var a = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnEncryptObject);
                if (null != a)return a.get_canEncrypt() && lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.restoreRedact, a, this.get_container())
            }
            return !1
        },
        get_canGroup: function () {
            var a = this.get_container();
            if (null == a || a.get_userMode() !== lt.Annotations.Core.AnnUserMode.design)return !1;
            var a =
                a.get_selectionObject().get_selectedObjects(), b = !1;
            if (null != a && 1 < a.get_count())for (var b = !0, c = 0; c < a.get_count(); ++c)if (!String.isNullOrEmpty(a.get_item(c).get_groupName())) {
                b = !1;
                break
            }
            return b
        },
        get_canUngroup: function () {
            var a = this.get_container();
            if (null == a || a.get_userMode() !== lt.Annotations.Core.AnnUserMode.design)return !1;
            var a = a.get_selectionObject().get_selectedObjects(), b = !0;
            if (null != a && 1 < a.get_count()) {
                var c = a.get_item(0).get_groupName();
                if (String.isNullOrEmpty(c))b = !1; else for (var d = 1; d < a.get_count(); ++d)lt.Annotations.Core.Utils.compare(a.get_item(d).get_groupName(),
                    c, !0) || (b = !1)
            } else b = !1;
            return b
        },
        get_canCopy: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : this._canEdited(lt.Annotations.Core.AnnOperationType.copyObjects)
        },
        get_canPaste: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a = lt.Annotations.Automation.AnnAutomationManager.get_platformCallbacks().get_isClipboardDataPresent();
            return null != a && a(this, lt.Annotations.Core.AnnObject.toString()) ? this._canEdited(lt.Annotations.Core.AnnOperationType.pasteObjects) :
                !1
        },
        get_canBringToFront: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            var b = !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var b = this._editDesigner.get_targetObject(), a = a.get_children(), c = b.get_layer();
                null != c && (a = c.get_children());
                b = 1 < a.get_count() && !this._isLocked(b) && a.indexOf(b) < a.get_count() - 1
            }
            return b
        },
        get_canBringToFirst: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            var b =
                !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var b = this._editDesigner.get_targetObject(), a = a.get_children(), c = b.get_layer();
                null != c && (a = c.get_children());
                b = 1 < a.get_count() && !this._isLocked(b) && a.indexOf(b) !== a.get_count() - 1
            }
            return b
        },
        get_canSendToLast: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            var b = !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var b = this._editDesigner.get_targetObject(),
                    a = a.get_children(), c = b.get_layer();
                null != c && (a = c.get_children());
                b = 1 < a.get_count() && !this._isLocked(b) && !!a.indexOf(b)
            }
            return b
        },
        get_canSendToBack: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            var b = !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var b = this._editDesigner.get_targetObject(), a = a.get_children(), c = b.get_layer();
                null != c && (a = c.get_children());
                b = 1 < a.get_count() && !this._isLocked(b) && 0 < a.indexOf(b)
            }
            return b
        },
        get_canApplyAllEncryptors: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            if (0 < a.get_children().get_count())for (a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                var b = a.current;
                if (Type.canCast(b, lt.Annotations.Core.AnnEncryptObject)) {
                    if (b.get_canEncrypt())return !0
                } else if (Type.canCast(b, lt.Annotations.Core.AnnSelectionObject)) {
                    b = Type.safeCast(b, lt.Annotations.Core.AnnSelectionObject);
                    for (b = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); b.moveNext();) {
                        var c =
                            b.current;
                        if (Type.canCast(c, lt.Annotations.Core.AnnEncryptObject) && c.get_canEncrypt())return !0
                    }
                }
            }
            return !1
        },
        get_canApplyAllDecryptors: function () {
            var a = this.get_container();
            if (!this._isDesignModeContainer(a))return !1;
            if (0 < a.get_children().get_count())for (a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                var b = a.current;
                if (Type.canCast(b, lt.Annotations.Core.AnnEncryptObject) && b.get_canDecrypt())return !0;
                if (Type.canCast(b, lt.Annotations.Core.AnnSelectionObject)) {
                    b = Type.safeCast(b, lt.Annotations.Core.AnnSelectionObject);
                    for (b = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); b.moveNext();) {
                        var c = b.current;
                        if (Type.canCast(c, lt.Annotations.Core.AnnEncryptObject) && c.get_canDecrypt())return !0
                    }
                }
            }
            return !1
        },
        get_canFlip: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : this.get_canDeleteObjects() && !Type.canCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnTextPointerObject)
        },
        get_canResetRotatePoints: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : null != this._designer &&
            Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && !this._isLocked(this._editDesigner.get_targetObject()) && this._editDesigner.get_targetObject().get_canRotate() && this._editDesigner.get_useRotateThumbs()
        },
        get_canShowObjectProperties: function () {
            return !this._isDesignModeContainer(this.get_container()) ? !1 : null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner) && !this._isLocked(this._editDesigner.get_targetObject())
        },
        applyEncryptor: function () {
            null !=
            this.get_container() && this.get_canApplyEncryptor() && this._automationControl.automationInvalidate(this._applyEncrypt(this._editDesigner.get_targetObject(), !0))
        },
        _applyEncrypt: function (a, b) {
            var c = lt.Annotations.Automation._leadRectDExtensions.get_empty();
            if (b ? this._internalOnBeforeObjectChanged2(a, 10) : 1) {
                var d = Type.safeCast(a, lt.Annotations.Core.AnnEncryptObject);
                null != d && (lt.Annotations.Core.Utils.applyEncrypt(this._automationControl, this._activeContainer, d), b && this._internalOnAfterObjectChanged2(a,
                    10))
            }
            return c
        },
        applyDecryptor: function () {
            null != this.get_container() && this.get_canApplyDecryptor() && this._automationControl.automationInvalidate(this._applyEncrypt(this._editDesigner.get_targetObject(), !0))
        },
        copy: function () {
        },
        paste: function () {
            this.pasteAt(lt.Annotations.Automation._leadPointDExtensions.get_empty())
        },
        pasteStringAt: function () {
        },
        _readObjectFromXml: function (a, b) {
            var c = null, d = lt.Annotations.Core.AnnXmlHelper.readStringElement(a, lt.Annotations.Core.AnnXmlHelper.type, b, ""), d = d.replaceAll("Leadtools.Annotations",
                "lt.Annotations");
            if (!String.isNullOrEmpty(d))try {
                c = new (Type.getType(d))(null)
            } catch (e) {
                if (null != this.__deserializeObjectError) {
                    d = lt.Annotations.Core.AnnSerializeObjectEventArgs.create(d, null, e);
                    this._onDeserializeObjectError(d);
                    if (d.get_skipObject())return null;
                    null != d.get_annObject() && (c = d.get_annObject())
                }
            }
            null != c && c.deserialize(new lt.Annotations.Core.AnnDeserializeOptions, b, a);
            return c
        },
        pasteAt: function (a) {
            if (null != this.get_container() && this.get_canPaste()) {
                var b = lt.Annotations.Automation.AnnAutomationManager.get_platformCallbacks().get_getClipboardData();
                null != b && b(this, a, lt.Annotations.Core.AnnObject.toString())
            }
        },
        get_canAlign: function () {
            if (!this.get_manager().get_enableObjectsAlignment() || !this._isDesignModeContainer(this.get_container()))return !1;
            var a = !1;
            if (null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)) {
                var b = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnSelectionObject);
                null != b && 1 < b.get_selectedObjects().get_count() && null != b.get_alignmentTarget() && !this._isLocked(b) &&
                (a = !0)
            }
            return a
        },
        alignLefts: function () {
            this._doAlign("Left")
        },
        alignCenters: function () {
            this._doAlign("Center")
        },
        alignRights: function () {
            this._doAlign("Right")
        },
        alignTops: function () {
            this._doAlign("Top")
        },
        alignMiddles: function () {
            this._doAlign("Middle")
        },
        alignBottoms: function () {
            this._doAlign("Bottom")
        },
        _doAlign: function (a) {
            if (this.get_canAlign()) {
                var b = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnSelectionObject);
                if (null != b) {
                    for (var c = b.get_alignmentTarget(), d = c.get_bounds(),
                             e = lt.Annotations.Automation._leadRectDExtensions.get_empty(), f = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); f.moveNext();) {
                        var g = f.current;
                        if (g !== c && !this._isLocked(g))switch (e = g.get_bounds(), a) {
                            case "Left":
                                g.translate(lt.Annotations.Automation._leadRectDExtensions.left(d) - lt.Annotations.Automation._leadRectDExtensions.left(e), 0);
                                break;
                            case "Center":
                                var h = lt.Annotations.Automation._leadRectDExtensions.left(d) + d.get_width() / 2, e = lt.Annotations.Automation._leadRectDExtensions.left(e) + e.get_width() /
                                    2;
                                g.translate(h - e, 0);
                                break;
                            case "Right":
                                g.translate(lt.Annotations.Automation._leadRectDExtensions.right(d) - lt.Annotations.Automation._leadRectDExtensions.right(e), 0);
                                break;
                            case "Top":
                                g.translate(0, lt.Annotations.Automation._leadRectDExtensions.top(d) - lt.Annotations.Automation._leadRectDExtensions.top(e));
                                break;
                            case "Middle":
                                h = lt.Annotations.Automation._leadRectDExtensions.top(d) + d.get_height() / 2;
                                e = lt.Annotations.Automation._leadRectDExtensions.top(e) + e.get_height() / 2;
                                g.translate(0, h - e);
                                break;
                            case "Bottom":
                                g.translate(0,
                                    lt.Annotations.Automation._leadRectDExtensions.bottom(d) - lt.Annotations.Automation._leadRectDExtensions.bottom(e))
                        }
                    }
                    a = new lt.Annotations.Core.AnnObjectCollection;
                    for (d = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); d.moveNext();)a.add(d.current);
                    b.get_selectedObjects().clear();
                    this.selectObjects(a);
                    0 < b.get_selectedObjects().get_count() && b.get_selectedObjects().get_item(b.get_selectedObjects().get_count() - 1).set_isAlignmentTarget(!1);
                    b.set_alignmentTarget(c);
                    c.set_isAlignmentTarget(!0);
                    this.invalidateObject(b)
                }
            }
        },
        makeSameWidth: function () {
            this._adjustSize("Width")
        },
        makeSameHeight: function () {
            this._adjustSize("Height")
        },
        makeSameSize: function () {
            this._adjustSize("Both")
        },
        _adjustSize: function (a) {
            if (this.get_canAlign()) {
                var b = Type.safeCast(this._editDesigner.get_targetObject(), lt.Annotations.Core.AnnSelectionObject);
                if (null != b) {
                    for (var c = b.get_alignmentTarget(), d = c.get_bounds(), e = lt.Annotations.Automation._leadRectDExtensions.get_empty(), f = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); f.moveNext();) {
                        var g =
                            f.current;
                        if (g !== c && !(g.get_id() === lt.Annotations.Core.AnnObject.pointObjectId || g.get_id() === lt.Annotations.Core.AnnObject.stickyNoteObjectId)) {
                            var e = g.get_bounds(), h = new lt.LeadMatrix, i = lt.Annotations.Automation._leadRectDExtensions.topLeft(e), j = d.get_width() / e.get_width(), e = d.get_height() / e.get_height();
                            switch (a) {
                                case "Width":
                                    h.scaleAt(j, 1, i.get_x(), i.get_y());
                                    break;
                                case "Height":
                                    h.scaleAt(1, e, i.get_x(), i.get_y());
                                    break;
                                case "Both":
                                    h.scaleAt(j, e, i.get_x(), i.get_y())
                            }
                            i = g.get_points().toArray();
                            h.transformPoints(i);
                            for (j = 0; j < g.get_points().get_count(); ++j)g.get_points().set_item(j, i[j]);
                            g = Type.safeCast(g, lt.Annotations.Core.AnnTextPointerObject);
                            null != g && g.set_pointerPosition(h.transformPoint(g.get_pointerPosition()))
                        }
                    }
                    a = new lt.Annotations.Core.AnnObjectCollection;
                    for (d = ss.IEnumerator.getEnumerator(b.get_selectedObjects()); d.moveNext();)a.add(d.current);
                    b.get_selectedObjects().clear();
                    this.selectObjects(a);
                    0 < b.get_selectedObjects().get_count() && b.get_selectedObjects().get_item(b.get_selectedObjects().get_count() -
                        1).set_isAlignmentTarget(!1);
                    b.set_alignmentTarget(c);
                    c.set_isAlignmentTarget(!0);
                    this.invalidateObject(b)
                }
            }
        },
        bringToFront: function (a) {
            var b = this.get_container();
            if (null != b && (this.get_canBringToFront() && !a || this.get_canBringToFirst() && a)) {
                var c = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner).get_targetObject();
                this._internalOnBeforeObjectChanged2(c, 1) && (this.beginUndo(), b.get_children().sendToBack(c, a), this.endUndo(), b = c.get_layer(), null != b && b.get_children().sendToBack(c, a),
                    this._automationControl.automationInvalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()), this._internalOnAfterObjectChanged2(c, 1))
            }
        },
        sendToBack: function (a) {
            var b = this.get_container();
            if (null != b && (this.get_canSendToBack() && !a || this.get_canSendToLast() && a)) {
                var c = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner).get_targetObject();
                this._internalOnBeforeObjectChanged2(c, 2) && (this.beginUndo(), b.get_children().bringToFront(c, a), this.endUndo(), b = c.get_layer(), null !=
                b && b.get_children().bringToFront(c, a), this._automationControl.automationInvalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()), this._internalOnAfterObjectChanged2(c, 2))
            }
        },
        flip: function (a) {
            if (null != this.get_container() && this.get_canFlip()) {
                var b = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner), c = b.get_targetObject();
                if (this._internalOnBeforeObjectChanged2(c, 7)) {
                    this.beginUndo();
                    var d = lt.Annotations.Automation._leadPointDExtensions.create(c.get_bounds().get_x() +
                        c.get_bounds().get_width() / 2, c.get_bounds().get_y() + c.get_bounds().get_height() / 2);
                    c.scale(a ? -1 : 1, a ? 1 : -1, d);
                    this.endUndo();
                    b.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty());
                    this.invalidateObject(c);
                    this._internalOnAfterObjectChanged2(c, 7)
                }
            }
        },
        resetRotatePoints: function () {
            if (null != this.get_container() && this.get_canResetRotatePoints()) {
                this.beginUndo();
                var a = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner), b = a.get_targetObject(), c = b.get_rotateCenter(), d = b.get_rotateGripper();
                a.resetRotateThumbs();
                !lt.Annotations.Automation._leadPointDExtensions.isEqual(c, b.get_rotateCenter()) || !lt.Annotations.Automation._leadLengthDExtensions.isEqual(d, b.get_rotateGripper()) ? (this.endUndo(), this._automationControl.automationInvalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty()), this._internalOnAfterObjectChanged2(b, 32)) : this.cancelUndo()
            }
        },
        applyAllEncryptors: function () {
            var a = this.get_container();
            if (null != a && this.get_canApplyAllEncryptors()) {
                for (var b = new lt.Annotations.Core.AnnObjectCollection,
                         a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                    var c = a.current;
                    if (Type.canCast(c, lt.Annotations.Core.AnnEncryptObject) && c.get_canEncrypt())b.add(c); else if (Type.canCast(c, lt.Annotations.Core.AnnSelectionObject)) {
                        c = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                        for (c = ss.IEnumerator.getEnumerator(c.get_selectedObjects()); c.moveNext();) {
                            var d = c.current;
                            Type.canCast(d, lt.Annotations.Core.AnnEncryptObject) && d.get_canEncrypt() && b.add(d)
                        }
                    }
                }
                if (this._internalOnBeforeObjectChanged(b,
                        10)) {
                    for (var a = lt.Annotations.Automation._leadRectDExtensions.get_empty(), d = !0, e = ss.IEnumerator.getEnumerator(b); e.moveNext();)c = e.current, c = this._applyEncrypt(c, !1), d ? (a = c, d = !1) : a = lt.Annotations.Automation._leadRectDExtensions.unionRects(a, c);
                    this._automationControl.automationInvalidate(a);
                    this.invokeAfterObjectChanged(b, 10)
                }
            }
        },
        applyAllDecryptors: function () {
            var a = this.get_container();
            if (null != a && this.get_canApplyAllDecryptors()) {
                for (var b = new lt.Annotations.Core.AnnObjectCollection, a = ss.IEnumerator.getEnumerator(a.get_children()); a.moveNext();) {
                    var c =
                        a.current;
                    if (Type.canCast(c, lt.Annotations.Core.AnnEncryptObject) && c.get_canDecrypt())b.add(c); else if (Type.canCast(c, lt.Annotations.Core.AnnSelectionObject)) {
                        c = Type.safeCast(c, lt.Annotations.Core.AnnSelectionObject);
                        for (c = ss.IEnumerator.getEnumerator(c.get_selectedObjects()); c.moveNext();) {
                            var d = c.current;
                            Type.canCast(d, lt.Annotations.Core.AnnEncryptObject) && d.get_canDecrypt() && b.add(d)
                        }
                    }
                }
                lt.Annotations.Automation.AnnAutomation._reverseObjects(b);
                if (this._internalOnBeforeObjectChanged(b, 11)) {
                    for (var a =
                        lt.Annotations.Automation._leadRectDExtensions.get_empty(), d = !0, e = ss.IEnumerator.getEnumerator(b); e.moveNext();)c = e.current, c = this._applyEncrypt(c, !1), d ? (a = c, d = !1) : a = lt.Annotations.Automation._leadRectDExtensions.unionRects(a, c);
                    this._automationControl.automationInvalidate(a);
                    this.invokeAfterObjectChanged(b, 11)
                }
            }
        },
        showContextMenu: function () {
            this._doShowContextMenu()
        },
        _doShowContextMenu: function () {
            return null == this.get_container() || null != this._drawDesigner ? !1 : null != this.__onShowContextMenu ? (this.__onShowContextMenu(this,
                null), !0) : !1
        },
        get_canShowObjectContextMenu: function () {
            return !this._isDesignModeContainer(this.get_container()) || null != this._drawDesigner ? !1 : null != this._designer && Type.canCast(this._designer, lt.Annotations.Designers.AnnEditDesigner)
        },
        showObjectContextMenu: function () {
            this._doShowObjectContextMenu()
        },
        _doShowObjectContextMenu: function () {
            if (null == this.get_container())return !1;
            if (this.get_canShowObjectContextMenu() && null != this.__onShowContextMenu) {
                var a = this.get_manager().findObject(this._editDesigner.get_targetObject());
                this.__onShowContextMenu(this, lt.Annotations.Automation.AnnAutomationEventArgs.create(a));
                return !0
            }
            return !1
        },
        showObjectProperties: function () {
            if (this.get_canShowObjectProperties() && null != this.__onShowObjectProperties) {
                var a = this.get_manager().findObject(this._editDesigner.get_targetObject()), a = lt.Annotations.Automation.AnnAutomationEventArgs.create(a);
                this.beginUndo();
                this.__onShowObjectProperties(this, a);
                a.get_cancel() || (null != this._editDesigner.get_targetObject() && this.invalidateObject(this._editDesigner.get_targetObject()),
                    this._internalOnObjectModified2(this._editDesigner.get_targetObject(), 35), this._internalOnAfterObjectChanged2(this._editDesigner.get_targetObject(), 35));
                this.endUndo()
            }
        },
        get_canSelectNone: function () {
            var a = this.get_container();
            return !this._isDesignModeContainer(a) || null == this._automationControl ? !1 : null != a.get_selectionObject() && 0 < a.get_selectionObject().get_selectedObjects().get_count() ? !0 : !1
        },
        add_deserializeObjectError: function (a) {
            this.__deserializeObjectError = ss.Delegate.combine(this.__deserializeObjectError,
                a)
        },
        remove_deserializeObjectError: function (a) {
            this.__deserializeObjectError = ss.Delegate.remove(this.__deserializeObjectError, a)
        },
        __deserializeObjectError_handler_get: function () {
            null == this.__deserializeObjectError_handler && (this.__deserializeObjectError_handler = ss.EventHandler.create(this, this.add_deserializeObjectError, this.remove_deserializeObjectError));
            return this.__deserializeObjectError_handler
        },
        __deserializeObjectError: null,
        __deserializeObjectError_handler: null,
        _onDeserializeObjectError: function (a) {
            null !=
            this.__deserializeObjectError && this.__deserializeObjectError(this, a)
        },
        addLayer: function (a, b) {
            null == b && lt.Annotations.Core.ExceptionHelper.argumentNullException("layer");
            if (null != a)a.get_layers().add(b); else {
                var c = this.get_container();
                null != c && c.get_isEnabled() && c.get_layers().add(b)
            }
        },
        deleteLayer: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("layer");
            var c = a.get_children(), d = a.get_layers(), e = a.get_parent();
            if (b) {
                var f = this._activeContainer.get_children();
                if (null !=
                    c && 0 < c.get_count())for (d = ss.IEnumerator.getEnumerator(c); d.moveNext();)c = d.current, f.contains(c) && (c.set_layer(null), f.remove(c));
                c = a.get_layers();
                if (null != c && 0 < c.get_count())for (c = ss.IEnumerator.getEnumerator(c); c.moveNext();)this.deleteLayer(c.current, b);
                e.get_layers().remove(a)
            } else if (null != e) {
                var g = e.get_children(), f = e.get_layers();
                if (null != g && null != c && 0 < c.get_count()) {
                    for (var h = ss.IEnumerator.getEnumerator(c); h.moveNext();)c = h.current, c.set_layer(e), g.contains(c) || g.add(c);
                    for (c = ss.IEnumerator.getEnumerator(d); c.moveNext();)d =
                        c.current, f.contains(d) || f.add(d)
                }
                a.get_children().clear();
                e.get_layers().remove(a)
            } else {
                if (null != c && 0 < c.get_count())for (e = ss.IEnumerator.getEnumerator(c); e.moveNext();)c = e.current, c.set_layer(null);
                e = this.get_container();
                null != e && e.get_isEnabled() && e.get_layers().remove(a)
            }
        },
        selectLayer: function (a) {
            var b = this._activeContainer.get_activeLayer();
            this._activeContainer.set_activeLayer(a);
            return b
        },
        get_canBringLayerToFront: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a =
                this._activeContainer.get_activeLayer(), b = !1;
            if (null != a) {
                a.get_parent();
                var c = this._getParentLayers(a);
                null != c && (b = 1 < c.get_count() && c.indexOf(a) < c.get_count() - 1)
            }
            return b
        },
        get_canBringLayerToFirst: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a = this._activeContainer.get_activeLayer(), b = !1;
            if (null != a) {
                a.get_parent();
                var c = this._getParentLayers(a);
                null != c && (b = 1 < c.get_count() && c.indexOf(a) !== c.get_count() - 1)
            }
            return b
        },
        get_canSendLayerToBack: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a = this._activeContainer.get_activeLayer(), b = !1;
            if (null != a) {
                a.get_parent();
                var c = this._getParentLayers(a);
                null != c && (b = 1 < c.get_count() && 0 < c.indexOf(a))
            }
            return b
        },
        _getParentLayers: function (a) {
            var a = a.get_parent(), b = null;
            return b = null != a ? a.get_layers() : this._activeContainer.get_layers()
        },
        get_canSendLayerToLast: function () {
            if (!this._isDesignModeContainer(this.get_container()))return !1;
            var a = this._activeContainer.get_activeLayer(), b = !1;
            if (null != a) {
                var c = this._getParentLayers(a);
                null != c && (b = 1 < c.get_count() && !!c.indexOf(a))
            }
            return b
        },
        sendLayerToBack: function (a) {
            var b = this._activeContainer.get_activeLayer();
            if (this.get_canSendLayerToBack() && !a || this.get_canSendLayerToLast() && a) {
                var c = this._getParentLayers(b);
                null != c && c.bringToFront(b, a)
            }
        },
        bringLayerToFront: function (a) {
            var b = this._activeContainer.get_activeLayer();
            if (this.get_canBringLayerToFront() && !a || this.get_canBringLayerToFirst() && a) {
                var c = this._getParentLayers(b);
                null != c && c.sendToBack(b, a)
            }
        },
        layerFromSelectedObjects: function (a) {
            var b = this.get_container(),
                c = new lt.Annotations.Core.AnnObjectCollection;
            if (null != b && this.get_canDeleteObjects()) {
                this.beginUndo();
                var d = Type.safeCast(this._designer, lt.Annotations.Designers.AnnEditDesigner).get_targetObject(), e = Type.safeCast(d, lt.Annotations.Core.AnnSelectionObject);
                if (null != e)for (d = ss.IEnumerator.getEnumerator(e.get_selectedObjects()); d.moveNext();)e = d.current, e.get_isLocked() || c.add(e); else c.add(d);
                this._endEditDesigner(!1);
                this.onCurrentDesignerChanged(lt.LeadEventArgs.Empty);
                if (0 < c.get_count())for (e =
                                               0; e < c.get_count(); ++e)d = c.get_item(e), null != b.get_selectionObject() && b.get_selectionObject().get_selectedObjects().contains(d) && b.get_selectionObject().get_selectedObjects().remove(d);
                this.endUndo()
            }
            a = lt.Annotations.Core.AnnLayer.create(a);
            for (c = ss.IEnumerator.getEnumerator(c); c.moveNext();)d = c.current, a.get_children().add(d);
            return a
        },
        _internalEndDesigner: function (a) {
            if (null != this.get_container()) {
                var b = !1;
                null != this._drawDesigner && (a && this._drawDesigner.cancel(), this._endDrawDesigner(!0, !1), b = !0);
                null != this._editDesigner && (this._endEditDesigner(!0), b = !0);
                null != this._runDesigner && (this._endRunDesigner(!0), b = !0);
                this._selecting && (this._cancelSelecting(), b = !0);
                b && this.invalidate(lt.Annotations.Automation._leadRectDExtensions.get_empty())
            }
        },
        endDesigner: function () {
            this._internalEndDesigner(!1)
        },
        _currentRubberStampTypeChanged: function (a) {
            if (null != this._drawDesigner) {
                var b = this._drawDesigner.get_targetObject();
                null != b && (b = Type.safeCast(b, lt.Annotations.Core.AnnRubberStampObject), null != b && b.set_rubberStampType(a))
            }
        },
        _checkRestrictObjectsIntoContainer: function () {
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "enableDragDrop", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_enableDragDrop,
        set: lt.Annotations.Automation.AnnAutomation.prototype.set_enableDragDrop,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "containers", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_containers,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "objectModified", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__objectModified_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "dragDrop", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__dragDrop_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "lockObject", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__lockObject_handler_get,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "unlockObject", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__unlockObject_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "editText", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__editText_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "editContent",
        {
            get: lt.Annotations.Automation.AnnAutomation.prototype.__editContent_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "undoRedoChanged", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__undoRedoChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "draw", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__draw_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "edit", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__edit_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "run", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__run_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "selectedObjectsChanged", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__selectedObjectsChanged_handler_get,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "onShowContextMenu", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__onShowContextMenu_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "onShowObjectProperties", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__onShowObjectProperties_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "setCursor", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.__setCursor_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "restoreCursor", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__restoreCursor_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "toolTip", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__toolTip_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "automationControl", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_automationControl,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "activeContainer", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_activeContainer,
        set: lt.Annotations.Automation.AnnAutomation.prototype.set_activeContainer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "activeContainerChanged", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.__activeContainerChanged_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "defaultCurrentObjectId", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_defaultCurrentObjectId,
        set: lt.Annotations.Automation.AnnAutomation.prototype.set_defaultCurrentObjectId,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "currentDesignerChanged", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.__currentDesignerChanged_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "active", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_active,
        set: lt.Annotations.Automation.AnnAutomation.prototype.set_active,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "afterUndoRedo", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__afterUndoRedo_handler_get,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "beforeObjectChanged", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__beforeObjectChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "afterObjectChanged", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.__afterObjectChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "canUnlock", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_canUnlock,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "manager", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_manager,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "container", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_container,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "currentDesigner", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_currentDesigner,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "currentEditObject", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_currentEditObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canUndo", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canUndo,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canRedo", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canRedo,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "undoCapacity", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_undoCapacity,
        set: lt.Annotations.Automation.AnnAutomation.prototype.set_undoCapacity,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "canLock", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_canLock,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canRealizeRedaction", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canRealizeRedaction,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canRestoreRedaction", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canRestoreRedaction, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canRealizeAllRedactions", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canRealizeAllRedactions,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canRestoreAllRedactions", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canRestoreAllRedactions,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "canSelectObjects", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSelectObjects,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canDeleteObjects", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canDeleteObjects,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canShowProperties", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canShowProperties, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canApplyDecryptor", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canApplyDecryptor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canApplyEncryptor", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canApplyEncryptor,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canGroup",
        {get: lt.Annotations.Automation.AnnAutomation.prototype.get_canGroup, enumerable: !0, configurable: !0});
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canUngroup", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canUngroup,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canCopy", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canCopy,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype,
        "canPaste", {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_canPaste,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canBringToFront", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canBringToFront,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canBringToFirst", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canBringToFirst,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canSendToLast", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSendToLast,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canSendToBack", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSendToBack,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canApplyAllEncryptors", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canApplyAllEncryptors,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canApplyAllDecryptors", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canApplyAllDecryptors,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canFlip", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canFlip,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canResetRotatePoints",
        {
            get: lt.Annotations.Automation.AnnAutomation.prototype.get_canResetRotatePoints,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canShowObjectProperties", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canShowObjectProperties,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canAlign", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canAlign,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canShowObjectContextMenu", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canShowObjectContextMenu,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canSelectNone", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSelectNone,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "deserializeObjectError",
        {
            get: lt.Annotations.Automation.AnnAutomation.prototype.__deserializeObjectError_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canBringLayerToFront", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canBringLayerToFront,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canBringLayerToFirst", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canBringLayerToFirst,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canSendLayerToBack", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSendLayerToBack,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomation.prototype, "canSendLayerToLast", {
        get: lt.Annotations.Automation.AnnAutomation.prototype.get_canSendLayerToLast,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation.AnnPlatformCallbacks = function () {
    };
    lt.Annotations.Automation.AnnPlatformCallbacks.prototype =
    {
        _checkModifier: null, get_checkModifier: function () {
        return this._checkModifier
    }, set_checkModifier: function (a) {
        return this._checkModifier = a
    }, _getClipboardData: null, get_getClipboardData: function () {
        return this._getClipboardData
    }, set_getClipboardData: function (a) {
        return this._getClipboardData = a
    }, _setClipboardData: null, get_setClipboardData: function () {
        return this._setClipboardData
    }, set_setClipboardData: function (a) {
        return this._setClipboardData = a
    }, _isClipboardDataPresent: null, get_isClipboardDataPresent: function () {
        return this._isClipboardDataPresent
    },
        set_isClipboardDataPresent: function (a) {
            return this._isClipboardDataPresent = a
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnPlatformCallbacks.prototype, "checkModifier", {
        get: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.get_checkModifier,
        set: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.set_checkModifier,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnPlatformCallbacks.prototype, "getClipboardData", {
        get: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.get_getClipboardData,
        set: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.set_getClipboardData,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnPlatformCallbacks.prototype, "setClipboardData", {
        get: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.get_setClipboardData,
        set: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.set_setClipboardData,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnPlatformCallbacks.prototype, "isClipboardDataPresent",
        {
            get: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.get_isClipboardDataPresent,
            set: lt.Annotations.Automation.AnnPlatformCallbacks.prototype.set_isClipboardDataPresent,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Automation.AnnAutomationManager = function () {
        this._currentObjectId = lt.Annotations.Core.AnnObject.none;
        this._redactionRealizePassword = "";
        this._annHitTestBehavior = lt.Annotations.Core.AnnHitTestBehavior.contains;
        this._automations = new lt.Annotations.Automation.AnnAutomations;
        this._automationObjects =
            new lt.Annotations.Automation.AnnAutomationObjects;
        this._userMode = lt.Annotations.Core.AnnUserMode.design;
        this._thumbsHitTestBuffer = parseInt(720 * (2 / 96));
        this._selectionModifierKey = lt.Annotations.Core.AnnKeys.shift;
        this._snapToGridOptions = new lt.Annotations.Core.AnnSnapToGridOptions;
        this._multiSelectModifierKey = this._extendedModeModifierKey = this._rotateModifierKey = lt.Annotations.Core.AnnKeys.shift
    };
    lt.Annotations.Automation.AnnAutomationManager.get_platformCallbacks = function () {
        return lt.Annotations.Automation.AnnAutomationManager._platformCallbacks
    };
    lt.Annotations.Automation.AnnAutomationManager.create = function (a) {
        var b = new lt.Annotations.Automation.AnnAutomationManager;
        b.set_renderingEngine(a);
        return b
    };
    lt.Annotations.Automation.AnnAutomationManager.prototype = {
        _editObjectAfterDraw: !0,
        _cancelInactiveDesigners: !0,
        _endDrawWhenLostFocus: !0,
        _maintainAspectRatio: !0,
        _showThumbs: !0,
        _enableThumbsSelection: !1,
        _thumbsGap: 0,
        _currentRubberStampType: 0,
        get_hitTestBehavior: function () {
            return this._annHitTestBehavior
        },
        set_hitTestBehavior: function (a) {
            return this._annHitTestBehavior =
                a
        },
        get_redactionRealizePassword: function () {
            return this._redactionRealizePassword
        },
        set_redactionRealizePassword: function (a) {
            return this._redactionRealizePassword = a
        },
        get_automations: function () {
            return this._automations
        },
        get_objects: function () {
            return this._automationObjects
        },
        get_userMode: function () {
            return this._userMode
        },
        set_userMode: function (a) {
            this._userMode !== a && (this._userMode = a, this._onUserModeChanged(lt.LeadEventArgs.Empty));
            return a
        },
        get_thumbsHitTestBuffer: function () {
            return this._thumbsHitTestBuffer
        },
        set_thumbsHitTestBuffer: function (a) {
            return this._thumbsHitTestBuffer = a
        },
        _runHitTestBuffer: 0,
        get_runHitTestBuffer: function () {
            return this._runHitTestBuffer
        },
        set_runHitTestBuffer: function (a) {
            return this._runHitTestBuffer = a
        },
        get_currentObjectId: function () {
            return this._currentObjectId
        },
        set_currentObjectId: function (a) {
            if (this.get_userMode() === lt.Annotations.Core.AnnUserMode.design && !lt.Annotations.Automation.AnnAutomationManager._insideCurrentObjectChanged) {
                lt.Annotations.Automation.AnnAutomationManager._insideCurrentObjectChanged = !0;
                this._currentObjectId = a;
                if (this._cancelInactiveDesigners) {
                    var b = this.get__activeAutomation();
                    null != b && b._currentObjectChanged()
                } else for (var c = ss.IEnumerator.getEnumerator(this.get_automations()); c.moveNext();)b = c.current, null != b && b._currentObjectChanged();
                null != this.__currentObjectIdChanged && this.__currentObjectIdChanged(this, lt.LeadEventArgs.Empty);
                lt.Annotations.Automation.AnnAutomationManager._insideCurrentObjectChanged = !1
            }
            return a
        },
        get__activeAutomation: function () {
            for (var a = ss.IEnumerator.getEnumerator(this.get_automations()); a.moveNext();) {
                var b =
                    a.current;
                if (b.get_active())return b
            }
            return null
        },
        get_editObjectAfterDraw: function () {
            return this._editObjectAfterDraw
        },
        set_editObjectAfterDraw: function (a) {
            return this._editObjectAfterDraw = a
        },
        get_cancelInactiveDesigners: function () {
            return this._cancelInactiveDesigners
        },
        set_cancelInactiveDesigners: function (a) {
            return this._cancelInactiveDesigners = a
        },
        get_endDrawWhenLostFocus: function () {
            return this._endDrawWhenLostFocus
        },
        set_endDrawWhenLostFocus: function (a) {
            return this._endDrawWhenLostFocus = a
        },
        get_maintainAspectRatio: function () {
            return this._maintainAspectRatio
        },
        set_maintainAspectRatio: function (a) {
            this._maintainAspectRatio = a;
            for (var b = ss.IEnumerator.getEnumerator(this.get_automations()); b.moveNext();) {
                var c = b.current;
                c.get_active() && null != c.get_currentDesigner() && Type.canCast(c.get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner) && Type.safeCast(c.get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner).set_maintainAspectRatio(a)
            }
            return a
        },
        get_showThumbs: function () {
            return this._showThumbs
        },
        set_showThumbs: function (a) {
            this._showThumbs = a;
            if (null !=
                this.get__activeAutomation()) {
                var b = Type.safeCast(this.get__activeAutomation().get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner);
                null != b && b.set_showThumbs(this._showThumbs)
            }
            return a
        },
        _restrictDesigners: !1,
        get_restrictDesigners: function () {
            return this._restrictDesigners
        },
        set_restrictDesigners: function (a) {
            if (this._restrictDesigners !== a && (this._restrictDesigners = a, null != this.get__activeAutomation())) {
                var b = this.get__activeAutomation().get_currentDesigner();
                null != b && b.set_restrictDesigners(this._restrictDesigners);
                if (this._restrictDesigners)for (b = ss.IEnumerator.getEnumerator(this.get__activeAutomation().get_containers()); b.moveNext();) {
                    var c = b.current;
                    this.get__activeAutomation()._restrictObjectToContainer(c.get_selectionObject(), c, null);
                    for (var d = ss.IEnumerator.getEnumerator(c.get_children()); d.moveNext();) {
                        var e = d.current;
                        this.get__activeAutomation()._restrictObjectToContainer(e, c, null)
                    }
                    this.get__activeAutomation().invalidateContainer(c)
                }
            }
            return a
        },
        get_enableThumbsSelection: function () {
            return this._enableThumbsSelection
        },
        set_enableThumbsSelection: function (a) {
            return this._enableThumbsSelection = a
        },
        get_thumbsGap: function () {
            return this._thumbsGap
        },
        set_thumbsGap: function (a) {
            0 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Thumbs gap must be value greater than or equal to 0");
            return this._thumbsGap = a
        },
        _editContentAfterDraw: !1,
        get_editContentAfterDraw: function () {
            return this._editContentAfterDraw
        },
        set_editContentAfterDraw: function (a) {
            return this._editContentAfterDraw = a
        },
        _editTextAfterDraw: !1,
        get_editTextAfterDraw: function () {
            return this._editTextAfterDraw
        },
        set_editTextAfterDraw: function (a) {
            return this._editTextAfterDraw = a
        },
        add_currentObjectIdChanged: function (a) {
            this.__currentObjectIdChanged = ss.Delegate.combine(this.__currentObjectIdChanged, a)
        },
        remove_currentObjectIdChanged: function (a) {
            this.__currentObjectIdChanged = ss.Delegate.remove(this.__currentObjectIdChanged, a)
        },
        __currentObjectIdChanged_handler_get: function () {
            null == this.__currentObjectIdChanged_handler && (this.__currentObjectIdChanged_handler = ss.EventHandler.create(this, this.add_currentObjectIdChanged,
                this.remove_currentObjectIdChanged));
            return this.__currentObjectIdChanged_handler
        },
        __currentObjectIdChanged: null,
        __currentObjectIdChanged_handler: null,
        createAutomationObject: function () {
            return new lt.Annotations.Automation.AnnAutomationObject
        },
        createSelectAutomationObject: function () {
            var a = this.createAutomationObject();
            a.set_id(lt.Annotations.Core.AnnObject.selectObjectId);
            a.set_name("Select");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnSelectionEditDesigner);
            a.set_runDesignerType(null);
            var b = new lt.Annotations.Core.AnnSelectionObject;
            a.set_objectTemplate(b);
            return a
        },
        createLineAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolylineObject;
            b.setId(lt.Annotations.Core.AnnObject.lineObjectId);
            a.set_id(lt.Annotations.Core.AnnObject.lineObjectId);
            a.set_name("Line");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnLineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createRectangleAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnRectangleObject;
            a.set_id(lt.Annotations.Core.AnnObject.rectangleObjectId);
            a.set_name("Rectangle");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_objectTemplate(b);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            return a
        },
        createEllipseAutomationObject: function () {
            var a =
                this.createAutomationObject(), b = new lt.Annotations.Core.AnnEllipseObject;
            a.set_id(lt.Annotations.Core.AnnObject.ellipseObjectId);
            a.set_name("Ellipse");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createPolylineAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolylineObject;
            a.set_id(lt.Annotations.Core.AnnObject.polylineObjectId);
            a.set_name("Polyline");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPolylineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createPolygonAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolylineObject;
            b.set_isClosed(!0);
            a.set_id(lt.Annotations.Core.AnnObject.polygonObjectId);
            a.set_name("Polygon");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPolylineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createCurveAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnCurveObject;
            a.set_id(lt.Annotations.Core.AnnObject.curveObjectId);
            a.set_name("Curve");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPolylineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createClosedCurveAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnCurveObject;
            b.set_isClosed(!0);
            a.set_id(lt.Annotations.Core.AnnObject.closedCurveObjectId);
            a.set_name("Closed Curve");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPolylineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createPointerAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPointerObject;
            a.set_id(lt.Annotations.Core.AnnObject.pointerObjectId);
            a.set_name("Pointer");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnLineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createFreeHandAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolylineObject;
            b.setId(lt.Annotations.Core.AnnObject.freehandObjectId);
            a.set_id(lt.Annotations.Core.AnnObject.freehandObjectId);
            a.set_name("Freehand");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnFreehandDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createHiliteAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnHiliteObject;
            a.set_id(lt.Annotations.Core.AnnObject.hiliteObjectId);
            a.set_name("Hilite");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextAutomationObject: function () {
            var a = this.createAutomationObject(),
                b = new lt.Annotations.Core.AnnTextObject;
            a.set_id(lt.Annotations.Core.AnnObject.textObjectId);
            a.set_name("Text");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextPointerAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnTextPointerObject;
            a.set_id(lt.Annotations.Core.AnnObject.textPointerObjectId);
            a.set_name("Text Pointer");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnTextPointerDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextPointerEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createNoteAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnNoteObject;
            a.set_id(lt.Annotations.Core.AnnObject.noteObjectId);
            a.set_name("Note");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createStampAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnStampObject;
            a.set_id(lt.Annotations.Core.AnnObject.stampObjectId);
            a.set_name("Stamp");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createRubberStampAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnRubberStampObject;
            b.set_rubberStampType(lt.Annotations.Core.AnnRubberStampType.stampApproved);
            a.set_id(lt.Annotations.Core.AnnObject.rubberStampObjectId);
            a.set_name("Rubber Stamp");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createHotspotAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnHotspotObject;
            a.set_id(lt.Annotations.Core.AnnObject.hotspotObjectId);
            a.set_name("Hotspot");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createFreehandHotspotAutomationObject: function () {
            var a =
                this.createAutomationObject(), b = new lt.Annotations.Core.AnnFreehandHotspotObject;
            a.set_id(lt.Annotations.Core.AnnObject.freehandHotspotObjectId);
            a.set_name("Freehand Hotspot");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnFreehandDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createPointAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPointObject;
            a.set_id(lt.Annotations.Core.AnnObject.pointObjectId);
            a.set_name("Point");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPointDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPointEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!1);
            return a
        },
        createRedactionAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnRedactionObject;
            b.set_fill(lt.Annotations.Core.AnnSolidColorBrush.create("black"));
            a.set_id(lt.Annotations.Core.AnnObject.redactionObjectId);
            a.set_name("Redaction");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createRulerAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolyRulerObject;
            b.setId(lt.Annotations.Core.AnnObject.rulerObjectId);
            b.set_showGauge(!0);
            a.set_id(lt.Annotations.Core.AnnObject.rulerObjectId);
            a.set_name("Ruler");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnLineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createPolyRulerAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnPolyRulerObject;
            a.set_id(lt.Annotations.Core.AnnObject.polyRulerObjectId);
            a.set_name("Poly Ruler");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnPolylineDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createProtractorAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnProtractorObject;
            a.set_id(lt.Annotations.Core.AnnObject.protractorObjectId);
            a.set_name("Protractor");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnProtractorDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnPolylineEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createCrossProductAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnCrossProductObject;
            a.set_id(lt.Annotations.Core.AnnObject.crossProductObjectId);
            a.set_name("Cross Product");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnCrossProductDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnCrossProductEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            a.set_useRotateThumbs(!0);
            return a
        },
        createVideoAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnMediaObject;
            a.set_id(lt.Annotations.Core.AnnObject.mediaObjectId);
            a.set_name("Media");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createEncryptAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnEncryptObject;
            a.set_id(b.get_id());
            a.set_name(b.get_friendlyName());
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createAudioAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnAudioObject;
            a.set_id(lt.Annotations.Core.AnnObject.audioObjectId);
            a.set_name("Audio");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextRollupAutomationObject: function () {
            var a = this.createAutomationObject(),
                b = new lt.Annotations.Core.AnnTextRollupObject;
            a.set_id(lt.Annotations.Core.AnnObject.textRollupObjectId);
            a.set_name("Text Rollup");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnTextRollupRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createImageAutomationObject: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnImageObject;
            a.set_id(lt.Annotations.Core.AnnObject.imageObjectId);
            a.set_name("Image");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnRectangleDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnRectangleEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextHilite: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnTextHiliteObject;
            a.set_id(lt.Annotations.Core.AnnObject.textHiliteObjectId);
            a.set_name("Text hilite");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnTextReviewDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextReviewEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextStrikeout: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnTextStrikeoutObject;
            a.set_id(lt.Annotations.Core.AnnObject.textStrikeoutObjectId);
            a.set_name("Text strikeout");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnTextReviewDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextReviewEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextUnderline: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnTextUnderlineObject;
            a.set_id(b.get_id());
            a.set_name("Text underline");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnTextReviewDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextReviewEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createTextRedaction: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnTextRedactionObject;
            a.set_id(b.get_id());
            a.set_name("Text redaction");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnTextReviewDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnTextReviewEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createStickyNote: function () {
            var a = this.createAutomationObject(), b = new lt.Annotations.Core.AnnStickyNoteObject;
            a.set_id(lt.Annotations.Core.AnnObject.stickyNoteObjectId);
            a.set_name("Sticky Note");
            a.set_drawDesignerType(lt.Annotations.Designers.AnnStickyNoteDrawDesigner);
            a.set_editDesignerType(lt.Annotations.Designers.AnnEditDesigner);
            a.set_runDesignerType(lt.Annotations.Designers.AnnRunDesigner);
            a.set_objectTemplate(b);
            return a
        },
        createDefaultObjects: function () {
            this._automationObjects.add(this.createSelectAutomationObject());
            this._automationObjects.add(this.createLineAutomationObject());
            this._automationObjects.add(this.createRectangleAutomationObject());
            this._automationObjects.add(this.createEllipseAutomationObject());
            this._automationObjects.add(this.createPolylineAutomationObject());
            this._automationObjects.add(this.createPolygonAutomationObject());
            this._automationObjects.add(this.createCurveAutomationObject());
            this._automationObjects.add(this.createClosedCurveAutomationObject());
            this._automationObjects.add(this.createPointerAutomationObject());
            this._automationObjects.add(this.createFreeHandAutomationObject());
            this._automationObjects.add(this.createHiliteAutomationObject());
            this._automationObjects.add(this.createTextAutomationObject());
            this._automationObjects.add(this.createTextPointerAutomationObject());
            this._automationObjects.add(this.createNoteAutomationObject());
            this._automationObjects.add(this.createStampAutomationObject());
            this._automationObjects.add(this.createRubberStampAutomationObject());
            this._automationObjects.add(this.createHotspotAutomationObject());
            this._automationObjects.add(this.createFreehandHotspotAutomationObject());
            this._automationObjects.add(this.createPointAutomationObject());
            this._automationObjects.add(this.createRedactionAutomationObject());
            this._automationObjects.add(this.createRulerAutomationObject());
            this._automationObjects.add(this.createPolyRulerAutomationObject());
            this._automationObjects.add(this.createProtractorAutomationObject());
            this._automationObjects.add(this.createCrossProductAutomationObject());
            this._automationObjects.add(this.createTextRollupAutomationObject());
            this._automationObjects.add(this.createVideoAutomationObject());
            this._automationObjects.add(this.createAudioAutomationObject());
            this._automationObjects.add(this.createEncryptAutomationObject());
            this._automationObjects.add(this.createImageAutomationObject());
            this._automationObjects.add(this.createTextHilite());
            this._automationObjects.add(this.createTextStrikeout());
            this._automationObjects.add(this.createTextUnderline());
            this._automationObjects.add(this.createTextRedaction());
            this._automationObjects.add(this.createStickyNote())
        },
        loadPackage: function (a, b) {
            null == a && lt.Annotations.Core.ExceptionHelper.argumentNullException("pack");
            for (var c = ss.IEnumerator.getEnumerator(a.getAutomationObjects()); c.moveNext();) {
                var d = c.current;
                d.set_groupName(b);
                this._automationObjects.add(d);
                Object.keyExists(this.get_renderingEngine().get_renderers(), d.get_id()) || (this.get_renderingEngine().get_renderers()[d.get_id()] = d.get_renderer())
            }
        },
        findObject: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_objects()); b.moveNext();) {
                var c = b.current;
                if (c.get_id() === a.get_id())return c
            }
            return null
        },
        findObjectById: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_objects()); b.moveNext();) {
                var c =
                    b.current;
                if (c.get_id() === a)return c
            }
            return null
        },
        add_userModeChanged: function (a) {
            this.__userModeChanged = ss.Delegate.combine(this.__userModeChanged, a)
        },
        remove_userModeChanged: function (a) {
            this.__userModeChanged = ss.Delegate.remove(this.__userModeChanged, a)
        },
        __userModeChanged_handler_get: function () {
            null == this.__userModeChanged_handler && (this.__userModeChanged_handler = ss.EventHandler.create(this, this.add_userModeChanged, this.remove_userModeChanged));
            return this.__userModeChanged_handler
        },
        __userModeChanged: null,
        __userModeChanged_handler: null,
        _onUserModeChanged: function (a) {
            for (var b = ss.IEnumerator.getEnumerator(this.get_automations()); b.moveNext();)b.current._userModeChanged();
            null != this.__userModeChanged && this.__userModeChanged(this, a)
        },
        add_currentRubberStampTypeChanged: function (a) {
            this.__currentRubberStampTypeChanged = ss.Delegate.combine(this.__currentRubberStampTypeChanged, a)
        },
        remove_currentRubberStampTypeChanged: function (a) {
            this.__currentRubberStampTypeChanged = ss.Delegate.remove(this.__currentRubberStampTypeChanged,
                a)
        },
        __currentRubberStampTypeChanged_handler_get: function () {
            null == this.__currentRubberStampTypeChanged_handler && (this.__currentRubberStampTypeChanged_handler = ss.EventHandler.create(this, this.add_currentRubberStampTypeChanged, this.remove_currentRubberStampTypeChanged));
            return this.__currentRubberStampTypeChanged_handler
        },
        __currentRubberStampTypeChanged: null,
        __currentRubberStampTypeChanged_handler: null,
        get_currentRubberStampType: function () {
            return this._currentRubberStampType
        },
        set_currentRubberStampType: function (a) {
            if (a !==
                this.get_currentRubberStampType()) {
                this._currentRubberStampType = a;
                var b = this.findObjectById(lt.Annotations.Core.AnnObject.rubberStampObjectId);
                null != b && (b = Type.safeCast(b.get_objectTemplate(), lt.Annotations.Core.AnnRubberStampObject), null != b && b.set_rubberStampType(this.get_currentRubberStampType()));
                for (b = ss.IEnumerator.getEnumerator(this._automations); b.moveNext();)b.current._currentRubberStampTypeChanged(this._currentRubberStampType)
            }
            null != this.__currentRubberStampTypeChanged && this.__currentRubberStampTypeChanged(this,
                lt.LeadEventArgs.Empty);
            return a
        },
        _enableObjectsAlignment: !1,
        get_enableObjectsAlignment: function () {
            return this._enableObjectsAlignment
        },
        set_enableObjectsAlignment: function (a) {
            this._enableObjectsAlignment !== a && (this._enableObjectsAlignment = a, this._onEnableObjectsAlignmentChanged());
            return a
        },
        _usePDFMode: !1,
        get_usePDFMode: function () {
            return this._usePDFMode
        },
        set_usePDFMode: function (a) {
            this._usePDFMode = a;
            this._onUsePDFModeChanged();
            return a
        },
        _onUsePDFModeChanged: function () {
            if (null != this.get__activeAutomation())for (var a =
                ss.IEnumerator.getEnumerator(this.get_objects()); a.moveNext();) {
                var b = a.current;
                if (this._usePDFMode) {
                    for (var c = ss.IEnumerator.getEnumerator(this.get__activeAutomation().get_containers()); c.moveNext();)for (var d = c.current, e = ss.IEnumerator.getEnumerator(d.get_children()); e.moveNext();)d = e.current, d.set_fixedStateOperations(d.get_fixedStateOperations() & ~lt.Annotations.Core.AnnFixedStateOperations.strokeWidth), null != d.get_stroke() && d.get_stroke().set_strokeAlignment(lt.Annotations.Core.AnnStrokeAlignment.inset);
                    b.get_objectTemplate().set_fixedStateOperations(b.get_objectTemplate().get_fixedStateOperations() & ~lt.Annotations.Core.AnnFixedStateOperations.strokeWidth);
                    null != b.get_objectTemplate().get_stroke() && b.get_objectTemplate().get_stroke().set_strokeAlignment(lt.Annotations.Core.AnnStrokeAlignment.inset)
                } else {
                    for (c = ss.IEnumerator.getEnumerator(this.get__activeAutomation().get_containers()); c.moveNext();) {
                        d = c.current;
                        for (e = ss.IEnumerator.getEnumerator(d.get_children()); e.moveNext();)d = e.current, d.set_fixedStateOperations(d.get_fixedStateOperations() |
                            lt.Annotations.Core.AnnFixedStateOperations.strokeWidth), null != d.get_stroke() && d.get_stroke().set_strokeAlignment(lt.Annotations.Core.AnnStrokeAlignment.center)
                    }
                    b.get_objectTemplate().set_fixedStateOperations(b.get_objectTemplate().get_fixedStateOperations() | lt.Annotations.Core.AnnFixedStateOperations.strokeWidth);
                    null != b.get_objectTemplate().get_stroke() && b.get_objectTemplate().get_stroke().set_strokeAlignment(lt.Annotations.Core.AnnStrokeAlignment.center)
                }
            }
        },
        _fontRelativeToImageDpi: !0,
        get_fontRelativeToImageDpi: function () {
            return this._fontRelativeToImageDpi
        },
        set_fontRelativeToImageDpi: function (a) {
            this._fontRelativeToImageDpi = a;
            this._onFontRelativeToImageDpiChanged();
            return a
        },
        _onFontRelativeToImageDpiChanged: function () {
            if (null != this.get__activeAutomation())for (var a = ss.IEnumerator.getEnumerator(this.get__activeAutomation().get_containers()); a.moveNext();)a.current.get_mapper().set_fontRelativeToImageDpi(this._fontRelativeToImageDpi)
        },
        _onEnableObjectsAlignmentChanged: function () {
            if (null != this.get__activeAutomation()) {
                var a = Type.safeCast(this.get__activeAutomation().get_currentEditObject(),
                    lt.Annotations.Core.AnnSelectionObject);
                null != a && 1 < a.get_selectedObjects().get_count() && (this._enableObjectsAlignment ? null == a.get_alignmentTarget() && (a.set_alignmentTarget(a.get_selectedObjects().get_item(a.get_selectedObjects().get_count() - 1)), a.get_alignmentTarget().set_isAlignmentTarget(!0)) : null != a.get_alignmentTarget() && (a.get_alignmentTarget().set_isAlignmentTarget(!1), this.get__activeAutomation().invalidateObject(a.get_alignmentTarget()), a.set_alignmentTarget(null)))
            }
        },
        _rotateModifierKey: 0,
        get_rotateModifierKey: function () {
            return this._rotateModifierKey
        },
        set_rotateModifierKey: function (a) {
            return this._rotateModifierKey = a
        },
        _extendedModeModifierKey: 0,
        get_extendedModeModifierKey: function () {
            return this._extendedModeModifierKey
        },
        set_extendedModeModifierKey: function (a) {
            return this._extendedModeModifierKey = a
        },
        _multiSelectModifierKey: 0,
        get_multiSelectModifierKey: function () {
            return this._multiSelectModifierKey
        },
        set_multiSelectModifierKey: function (a) {
            return this._multiSelectModifierKey = a
        },
        _enableDeselectObject: !0,
        get_enableDeselectObject: function () {
            return this._enableDeselectObject
        },
        set_enableDeselectObject: function (a) {
            return this._enableDeselectObject = a
        },
        get__isMultiSelectionEnabled: function () {
            return null != this.findObjectById(lt.Annotations.Core.AnnObject.selectObjectId)
        },
        _groupsRoles: null,
        get_groupsRoles: function () {
            return this._groupsRoles
        },
        set_groupsRoles: function (a) {
            return this._groupsRoles = a
        },
        _renderingEngine: null,
        get_renderingEngine: function () {
            return this._renderingEngine
        },
        set_renderingEngine: function (a) {
            this._renderingEngine =
                a;
            for (var b = ss.IEnumerator.getEnumerator(this._automations); b.moveNext();) {
                var c = b.current;
                null != c && null != c.get_automationControl() && lt.Annotations.Core.Utils.setRenderingEngine(c.get_automationControl(), a)
            }
            null != this._renderingEngine && this._renderingEngine.set_snapToGridOptions(this._snapToGridOptions);
            return a
        },
        _enableToolTip: !1,
        get_enableToolTip: function () {
            return this._enableToolTip
        },
        set_enableToolTip: function (a) {
            return this._enableToolTip = a
        },
        _resources: null,
        get_resources: function () {
            return this._resources
        },
        set_resources: function (a) {
            this._resources = a;
            this._onResourcesChanged();
            return a
        },
        _onResourcesChanged: function () {
            null != this._renderingEngine && this._renderingEngine.set_resources(this._resources)
        },
        _enablePartialDrop: !0,
        get_enablePartialDrop: function () {
            return this._enablePartialDrop
        },
        set_enablePartialDrop: function (a) {
            return this._enablePartialDrop = a
        },
        _forceSelectionModifierKey: !1,
        get_forceSelectionModifierKey: function () {
            return this._forceSelectionModifierKey
        },
        set_forceSelectionModifierKey: function (a) {
            return this._forceSelectionModifierKey =
                a
        },
        get_selectionModifierKey: function () {
            return this._selectionModifierKey
        },
        set_selectionModifierKey: function (a) {
            return this._selectionModifierKey = a
        },
        get_snapToGridOptions: function () {
            return this._snapToGridOptions
        },
        set_snapToGridOptions: function (a) {
            this._snapToGridOptions !== a && (this._snapToGridOptions = a, this._onSnapToGridOptionsChanged());
            return a
        },
        _onSnapToGridOptionsChanged: function () {
            if (null != this.get__activeAutomation()) {
                var a = this.get__activeAutomation().get_currentDesigner();
                null != a && a.set_snapToGridOptions(this._snapToGridOptions);
                null != this._renderingEngine && this._renderingEngine.set_snapToGridOptions(this._snapToGridOptions);
                for (a = ss.IEnumerator.getEnumerator(this.get__activeAutomation().get_containers()); a.moveNext();) {
                    var b = a.current;
                    this.get__activeAutomation().invalidateContainer(b)
                }
            }
        },
        _deselectOnDown: !0,
        get_deselectOnDown: function () {
            return this._deselectOnDown
        },
        set_deselectOnDown: function (a) {
            return this._deselectOnDown = a
        },
        _useRotateThumbs: !0,
        get_useRotateThumbs: function () {
            return this._useRotateThumbs
        },
        set_useRotateThumbs: function (a) {
            if (this._useRotateThumbs !==
                a) {
                this._useRotateThumbs = a;
                for (var b = ss.IEnumerator.getEnumerator(this._automations); b.moveNext();) {
                    var c = Type.safeCast(b.current.get_currentDesigner(), lt.Annotations.Designers.AnnEditDesigner);
                    null != c && c.set_useRotateThumbs(this._useRotateThumbs)
                }
                for (b = ss.IEnumerator.getEnumerator(this._automationObjects); b.moveNext();)b.current.set_useRotateThumbs(this._useRotateThumbs)
            }
            return a
        },
        _endEditDesignerBeforeDraw: !0,
        get_endEditDesignerBeforeDraw: function () {
            return this._endEditDesignerBeforeDraw
        },
        set_endEditDesignerBeforeDraw: function (a) {
            return this._endEditDesignerBeforeDraw =
                a
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "hitTestBehavior", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_hitTestBehavior,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_hitTestBehavior,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "redactionRealizePassword", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_redactionRealizePassword,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_redactionRealizePassword,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager, "platformCallbacks", {
        get: lt.Annotations.Automation.AnnAutomationManager.get_platformCallbacks,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "automations", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_automations,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "objects", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_objects,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "userMode", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_userMode,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_userMode,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "thumbsHitTestBuffer", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_thumbsHitTestBuffer,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_thumbsHitTestBuffer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "runHitTestBuffer", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_runHitTestBuffer,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_runHitTestBuffer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "currentObjectId",
        {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_currentObjectId,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_currentObjectId,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "editObjectAfterDraw", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_editObjectAfterDraw,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_editObjectAfterDraw,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "cancelInactiveDesigners", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_cancelInactiveDesigners,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_cancelInactiveDesigners,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "endDrawWhenLostFocus", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_endDrawWhenLostFocus,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_endDrawWhenLostFocus,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "maintainAspectRatio", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_maintainAspectRatio,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_maintainAspectRatio,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "showThumbs", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_showThumbs,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_showThumbs, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "restrictDesigners", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_restrictDesigners,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_restrictDesigners,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "enableThumbsSelection",
        {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_enableThumbsSelection,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_enableThumbsSelection,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "thumbsGap", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_thumbsGap,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_thumbsGap,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "editContentAfterDraw", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_editContentAfterDraw,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_editContentAfterDraw,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "editTextAfterDraw", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_editTextAfterDraw,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_editTextAfterDraw,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "currentObjectIdChanged", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.__currentObjectIdChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "userModeChanged", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.__userModeChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "currentRubberStampTypeChanged", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.__currentRubberStampTypeChanged_handler_get,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "currentRubberStampType", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_currentRubberStampType,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_currentRubberStampType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "enableObjectsAlignment", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_enableObjectsAlignment,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_enableObjectsAlignment,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "usePDFMode", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_usePDFMode,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_usePDFMode,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "fontRelativeToImageDpi", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_fontRelativeToImageDpi,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_fontRelativeToImageDpi,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "rotateModifierKey", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_rotateModifierKey,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_rotateModifierKey,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "extendedModeModifierKey", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_extendedModeModifierKey,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_extendedModeModifierKey,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "multiSelectModifierKey", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_multiSelectModifierKey,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_multiSelectModifierKey,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "enableDeselectObject", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_enableDeselectObject,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_enableDeselectObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "groupsRoles", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_groupsRoles,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_groupsRoles,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "renderingEngine", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_renderingEngine,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_renderingEngine,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "enableToolTip", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_enableToolTip,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_enableToolTip,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "resources", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_resources,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_resources,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype,
        "enablePartialDrop", {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_enablePartialDrop,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_enablePartialDrop,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "forceSelectionModifierKey", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_forceSelectionModifierKey,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_forceSelectionModifierKey,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "selectionModifierKey", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_selectionModifierKey,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_selectionModifierKey,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "snapToGridOptions", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_snapToGridOptions,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_snapToGridOptions,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "deselectOnDown", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_deselectOnDown,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_deselectOnDown,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "useRotateThumbs",
        {
            get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_useRotateThumbs,
            set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_useRotateThumbs,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationManager.prototype, "endEditDesignerBeforeDraw", {
        get: lt.Annotations.Automation.AnnAutomationManager.prototype.get_endEditDesignerBeforeDraw,
        set: lt.Annotations.Automation.AnnAutomationManager.prototype.set_endEditDesignerBeforeDraw,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation.AnnAutomationObject = function () {
    };
    lt.Annotations.Automation.AnnAutomationObject.prototype = {
        _groupName: "Main",
        get_groupName: function () {
            return this._groupName
        },
        set_groupName: function (a) {
            return this._groupName = a
        },
        _id: 0,
        _name: null,
        _objectTemplate: null,
        _drawDesignerType: null,
        _editDesignerType: null,
        _runDesignerType: null,
        _useRotateThumbs: !0,
        _renderer: null,
        _toolBarImage: null,
        _toolBarToolTipText: null,
        _drawCursor: null,
        _contextMenu: null,
        _labelTemplate: null,
        _nextNumber: 1,
        get_nextNumber: function () {
            return this._nextNumber
        },
        set_nextNumber: function (a) {
            return this._nextNumber = a
        },
        get_labelTemplate: function () {
            return this._labelTemplate
        },
        set_labelTemplate: function (a) {
            return this._labelTemplate = a
        },
        _userData: null,
        get_userData: function () {
            return this._userData
        },
        set_userData: function (a) {
            return this._userData = a
        },
        get_id: function () {
            return this._id
        },
        set_id: function (a) {
            return this._id = a
        },
        get_renderer: function () {
            return this._renderer
        },
        set_renderer: function (a) {
            return this._renderer = a
        },
        get_name: function () {
            return this._name
        },
        set_name: function (a) {
            return this._name =
                a
        },
        get_objectTemplate: function () {
            return this._objectTemplate
        },
        set_objectTemplate: function (a) {
            return this._objectTemplate = a
        },
        get_drawDesignerType: function () {
            return this._drawDesignerType
        },
        set_drawDesignerType: function (a) {
            return this._drawDesignerType = a
        },
        get_editDesignerType: function () {
            return this._editDesignerType
        },
        set_editDesignerType: function (a) {
            return this._editDesignerType = a
        },
        get_runDesignerType: function () {
            return this._runDesignerType
        },
        set_runDesignerType: function (a) {
            return this._runDesignerType =
                a
        },
        get_toolBarImage: function () {
            return this._toolBarImage
        },
        set_toolBarImage: function (a) {
            return this._toolBarImage = a
        },
        get_toolBarToolTipText: function () {
            return this._toolBarToolTipText
        },
        set_toolBarToolTipText: function (a) {
            return this._toolBarToolTipText = a
        },
        get_drawCursor: function () {
            return this._drawCursor
        },
        set_drawCursor: function (a) {
            return this._drawCursor = a
        },
        get_contextMenu: function () {
            return this._contextMenu
        },
        set_contextMenu: function (a) {
            return this._contextMenu = a
        },
        get_useRotateThumbs: function () {
            return this._useRotateThumbs
        },
        set_useRotateThumbs: function (a) {
            return this._useRotateThumbs = a
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "groupName", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_groupName,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_groupName,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "nextNumber", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_nextNumber,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_nextNumber, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "labelTemplate", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_labelTemplate,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_labelTemplate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "userData", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_userData,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_userData, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "id", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_id,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_id,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "renderer", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_renderer,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_renderer, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "name", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_name,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_name,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "objectTemplate", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_objectTemplate,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_objectTemplate,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "drawDesignerType", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_drawDesignerType,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_drawDesignerType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "editDesignerType", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_editDesignerType,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_editDesignerType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "runDesignerType", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_runDesignerType,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_runDesignerType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "toolBarImage", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_toolBarImage,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_toolBarImage, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "toolBarToolTipText", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_toolBarToolTipText,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_toolBarToolTipText,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "drawCursor", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_drawCursor,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_drawCursor, enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "contextMenu", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_contextMenu,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_contextMenu,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObject.prototype, "useRotateThumbs", {
        get: lt.Annotations.Automation.AnnAutomationObject.prototype.get_useRotateThumbs,
        set: lt.Annotations.Automation.AnnAutomationObject.prototype.set_useRotateThumbs,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation._stackEnumerator = function (a) {
        this._stack = a;
        this._current = this._stack.get__list();
        this._index = 0 < this._stack.get_count() ? 0 : -1
    };
    lt.Annotations.Automation._stackEnumerator.prototype = {
        _current: null, _index: 0, _stack: null, moveNext: function () {
            if (0 > this._index)return this._current = this._stack.get__list(), !1;
            this._current = this._stack._getElement(this._index);
            this._index++;
            this._index === this._stack.get_count() && (this._index = -1);
            return !0
        }, reset: function () {
            this._index = !this._stack.get_count() ? -1 : 0;
            this._current = this._stack.get__list()
        }, get_current: function () {
            if (this._current !== this._stack.get__list())return this._current;
            this._index || lt.Annotations.Core.ExceptionHelper.invalidOperationException("Stack is empty");
            lt.Annotations.Core.ExceptionHelper.invalidOperationException("Stack is empty");
            return null
        }
    };
    lt.Annotations.Automation._limitedStack = function (a) {
        this._list =
            [];
        this.set_capacity(a)
    };
    lt.Annotations.Automation._limitedStack.prototype = {
        _capacity: 0, get__list: function () {
            return this._list
        }, clear: function () {
            this._list.clear()
        }, copyTo: function () {
        }, _getElement: function (a) {
            return this._list[a % this._list.length]
        }, getEnumerator: function () {
            return new lt.Annotations.Automation._stackEnumerator(this)
        }, pop: function () {
            this.get_count() || lt.Annotations.Core.ExceptionHelper.invalidOperationException("Stack is empty");
            var a = this._list[0];
            this._list.removeAt(0);
            return a
        },
        push: function (a) {
            this.get_count() === this.get_capacity() && this._list.removeAt(this.get_count() - 1);
            this._list.insert(0, a)
        }, get_capacity: function () {
            return this._capacity
        }, set_capacity: function (a) {
            1 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Undo/Redo capacity should be greater than or equal to 1");
            this._capacity = a;
            this.clear();
            return a
        }, get_count: function () {
            return this._list.length
        }, get_isSynchronized: function () {
            return !1
        }, get_syncRoot: function () {
            return this
        }
    };
    lt.Annotations.Automation._node =
        function (a) {
            this._container = a
        };
    lt.Annotations.Automation._node.prototype = {
        _container: null, dispose: function () {
            null != this._container && (this._container.get_children().clear(), this._container = null)
        }, get_container: function () {
            return this._container
        }
    };
    lt.Annotations.Automation._undoRedo = function (a) {
        this.set_capacity(a);
        this._node = null
    };
    lt.Annotations.Automation._undoRedo._load = function (a, b) {
        var c = Type.safeCast(b.pop(), lt.Annotations.Automation._node).get_container(), d = null;
        if (null != c) {
            a.clear();
            for (var e =
                ss.IEnumerator.getEnumerator(c.get_children()); e.moveNext();) {
                var f = e.current.clone();
                f.get_isSelected() && (d = f);
                a.add(f)
            }
            c.get_children().clear()
        }
        return d
    };
    lt.Annotations.Automation._undoRedo._save = function (a, b) {
        for (var c = new lt.Annotations.Core.AnnContainer, d = ss.IEnumerator.getEnumerator(a); d.moveNext();) {
            var e = d.current, f = Type.safeCast(e.get_parent(), lt.Annotations.Core.AnnSelectionObject), g = null, g = null != f ? Type.safeCast(f.get_parent(), lt.Annotations.Core.AnnContainer) : Type.safeCast(e.get_parent(),
                lt.Annotations.Core.AnnContainer);
            lt.Annotations.Automation.AnnAutomation._isUserInRole(lt.Annotations.Core.AnnOperationType.renderingObjects, e, Type.safeCast(g, lt.Annotations.Core.AnnContainer)) && c.get_children().add(e);
            e.set_parent(g);
            e === b && String.isNullOrEmpty(e.get_groupName()) && e.set_isSelected(!0)
        }
        d = new lt.Annotations.Automation._node(c.clone());
        c.get_children().clear();
        return d
    };
    lt.Annotations.Automation._undoRedo.prototype = {
        _node: null, _redoStack: null, _undoStack: null, cancel: function () {
            null !=
            this._undoStack && null != this._redoStack && null != this._node && (this._node.dispose(), this._node = null)
        }, commit: function () {
            if (null != this._undoStack && null != this._redoStack && null != this._node) {
                this._undoStack.push(this._node);
                for (this._node = null; 0 < this._redoStack.get_count();)this._redoStack.pop()
            }
        }, prepare: function (a, b) {
            null != this._undoStack && null != this._redoStack && null == this._node && (this._node = lt.Annotations.Automation._undoRedo._save(a, b))
        }, redo: function (a, b) {
            return this.get_canRedo() ? (this._undoStack.push(lt.Annotations.Automation._undoRedo._save(a,
                b)), lt.Annotations.Automation._undoRedo._load(a, this._redoStack)) : null
        }, undo: function (a, b) {
            return this.get_canUndo() ? (this._redoStack.push(lt.Annotations.Automation._undoRedo._save(a, b)), lt.Annotations.Automation._undoRedo._load(a, this._undoStack)) : null
        }, get_canRedo: function () {
            return null != this._redoStack && 0 < this._redoStack.get_count()
        }, get_canUndo: function () {
            return null != this._undoStack && 0 < this._undoStack.get_count()
        }, get_capacity: function () {
            return null == this._undoStack ? 0 : this._undoStack.get_capacity()
        },
        set_capacity: function (a) {
            0 > a && lt.Annotations.Core.ExceptionHelper.invalidOperationException("Undo/Redo capacity should be greater than or equal to zero");
            0 < a ? (this._undoStack = new lt.Annotations.Automation._limitedStack(a), this._redoStack = new lt.Annotations.Automation._limitedStack(a)) : this._redoStack = this._undoStack = null;
            return a
        }
    };
    lt.Annotations.Automation.AnnAutomationObjects = function () {
        this._elements = []
    };
    lt.Annotations.Automation.AnnAutomationObjects.prototype = {
        get_count: function () {
            return this._elements.length
        },
        getEnumerator: function () {
            return this._elements.getEnumerator()
        }, contains: function (a) {
            return this._elements.contains(a)
        }, removeAt: function (a) {
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
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(lt.Annotations.Core.AnnNotifyCollectionChangedAction.add);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a, b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(lt.Annotations.Core.AnnNotifyCollectionChangedAction.move))
        }, onCollectionChanged: function (a) {
            null !=
            this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeItem: function () {
        }, setItem: function () {
        }, clearItems: function () {
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged, a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged,
                this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] = b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObjects.prototype, "count", {
        get: lt.Annotations.Automation.AnnAutomationObjects.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationObjects.prototype,
        "collectionChanged", {
            get: lt.Annotations.Automation.AnnAutomationObjects.prototype.__collectionChanged_handler_get,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Automation.AnnAutomations = function () {
        this._elements = []
    };
    lt.Annotations.Automation.AnnAutomations.prototype = {
        get_count: function () {
            return this._elements.length
        }, getEnumerator: function () {
            return this._elements.getEnumerator()
        }, contains: function (a) {
            return this._elements.contains(a)
        }, removeAt: function (a) {
            this._elements.removeAt(a)
        }, add: function (a) {
            this._elements.add(a)
        },
        clear: function () {
            this._elements.clear()
        }, _copyTo: function (a, b, c) {
            for (var d = 0, b = ss.IEnumerator.getEnumerator(b); b.moveNext();)d < c || (a[d] = b.current, d++)
        }, toArray: function () {
            var a = Array(this._elements.length);
            this._copyTo(a, this._elements, 0);
            return a
        }, insertItem: function (a, b) {
            this._elements[a] = b;
            var c = lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(lt.Annotations.Core.AnnNotifyCollectionChangedAction.add);
            c.get_newItems().add(b);
            this.onCollectionChanged(c)
        }, move: function (a, b) {
            this.moveItem(a,
                b)
        }, moveItem: function (a, b) {
            var c = this._elements[a];
            this._elements.remove(c);
            this._elements.insert(b, c);
            this.onCollectionChanged(lt.Annotations.Core.AnnNotifyCollectionChangedEventArgs.create(lt.Annotations.Core.AnnNotifyCollectionChangedAction.move))
        }, onCollectionChanged: function (a) {
            null != this.__collectionChanged && this.__collectionChanged(this, a)
        }, removeItem: function () {
        }, setItem: function () {
        }, clearItems: function () {
        }, add_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.combine(this.__collectionChanged,
                a)
        }, remove_collectionChanged: function (a) {
            this.__collectionChanged = ss.Delegate.remove(this.__collectionChanged, a)
        }, __collectionChanged_handler_get: function () {
            null == this.__collectionChanged_handler && (this.__collectionChanged_handler = ss.EventHandler.create(this, this.add_collectionChanged, this.remove_collectionChanged));
            return this.__collectionChanged_handler
        }, __collectionChanged: null, __collectionChanged_handler: null, get_item: function (a) {
            return this._elements[a]
        }, set_item: function (a, b) {
            return this._elements[a] =
                b
        }, item: function (a, b) {
            return void 0 === b ? this.get_item(a) : this.set_item(a, b)
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomations.prototype, "count", {
        get: lt.Annotations.Automation.AnnAutomations.prototype.get_count,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomations.prototype, "collectionChanged", {
        get: lt.Annotations.Automation.AnnAutomations.prototype.__collectionChanged_handler_get,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation.AnnAutomationEventArgs =
        function () {
            lt.Annotations.Automation.AnnAutomationEventArgs.initializeBase(this)
        };
    lt.Annotations.Automation.AnnAutomationEventArgs.create = function (a) {
        var b = new lt.Annotations.Automation.AnnAutomationEventArgs;
        b._object$1 = a;
        b._cancel$1 = !1;
        return b
    };
    lt.Annotations.Automation.AnnAutomationEventArgs.prototype = {
        _object$1: null, get_object: function () {
            return this._object$1
        }, _cancel$1: !1, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationEventArgs.prototype,
        "object", {
            get: lt.Annotations.Automation.AnnAutomationEventArgs.prototype.get_object,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnAutomationEventArgs.prototype, "cancel", {
        get: lt.Annotations.Automation.AnnAutomationEventArgs.prototype.get_cancel,
        set: lt.Annotations.Automation.AnnAutomationEventArgs.prototype.set_cancel,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation.AnnCursorEventArgs = function (a, b, c, d, e, f, g) {
        lt.Annotations.Automation.AnnCursorEventArgs.initializeBase(this);
        this._id$1 = a;
        this._designerType$1 = b;
        this._thumbIndex$1 = c;
        this._isRotateCenter$1 = d;
        this._isRotateGripper$1 = e;
        this._pointerEvent$1 = null != f ? f.clone() : null;
        this._dragDropEvent$1 = g
    };
    lt.Annotations.Automation.AnnCursorEventArgs.prototype = {
        _id$1: 0, get_id: function () {
            return this._id$1
        }, _designerType$1: 0, get_designerType: function () {
            return this._designerType$1
        }, _thumbIndex$1: 0, get_thumbIndex: function () {
            return this._thumbIndex$1
        }, _isRotateCenter$1: !1, get_isRotateCenter: function () {
            return this._isRotateCenter$1
        },
        _isRotateGripper$1: !1, get_isRotateGripper: function () {
            return this._isRotateGripper$1
        }, _pointerEvent$1: null, get_pointerEvent: function () {
            return this._pointerEvent$1
        }, _dragDropEvent$1: null, get_dragDropEvent: function () {
            return this._dragDropEvent$1
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype, "id", {
        get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_id,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype,
        "designerType", {
            get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_designerType,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype, "thumbIndex", {
        get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_thumbIndex,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype, "isRotateCenter", {
        get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_isRotateCenter, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype, "isRotateGripper", {
        get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_isRotateGripper,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype, "pointerEvent", {
        get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_pointerEvent,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnCursorEventArgs.prototype,
        "dragDropEvent", {
            get: lt.Annotations.Automation.AnnCursorEventArgs.prototype.get_dragDropEvent,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Automation.AnnDragDropEventArgs = function () {
        lt.Annotations.Automation.AnnDragDropEventArgs.initializeBase(this)
    };
    lt.Annotations.Automation.AnnDragDropEventArgs.create = function (a, b, c, d, e) {
        var f = new lt.Annotations.Automation.AnnDragDropEventArgs;
        f._sourceContainer$1 = b;
        f._targetContainer$1 = c;
        f._annObject$1 = a;
        f._operation$1 = d;
        f._operationContainer$1 = e;
        f._allowed$1 = !0;
        return f
    };
    lt.Annotations.Automation.AnnDragDropEventArgs.prototype = {
        _sourceContainer$1: null, get_sourceContainer: function () {
            return this._sourceContainer$1
        }, _setSourceContainer: function (a) {
            this._sourceContainer$1 = a
        }, _targetContainer$1: null, get_targetContainer: function () {
            return this._targetContainer$1
        }, _setTargetContainer: function (a) {
            this._targetContainer$1 = a
        }, _annObject$1: null, get_annObject: function () {
            return this._annObject$1
        }, _operation$1: 0, get_operation: function () {
            return this._operation$1
        }, _operationContainer$1: null,
        get_operationContainer: function () {
            return this._operationContainer$1
        }, _setOperationContainer: function (a) {
            this._operationContainer$1 = a
        }, _setOperation: function (a) {
            this._operation$1 = a
        }, _setCanDrop: function (a) {
            this._canDrop$1 = a
        }, _allowed$1: !1, get_allowed: function () {
            return this._allowed$1
        }, set_allowed: function (a) {
            return this._allowed$1 = a
        }, _canDrop$1: !0, get_canDrop: function () {
            return this._canDrop$1
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "sourceContainer", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_sourceContainer,
        enumerable: !0, configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "targetContainer", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_targetContainer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "annObject", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_annObject,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype,
        "operation", {
            get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_operation,
            enumerable: !0,
            configurable: !0
        });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "operationContainer", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_operationContainer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "allowed", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_allowed,
        set: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.set_allowed,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnDragDropEventArgs.prototype, "canDrop", {
        get: lt.Annotations.Automation.AnnDragDropEventArgs.prototype.get_canDrop,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs = function (a, b, c) {
        lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.initializeBase(this);
        this._objects$1 = a;
        this._changeType$1 = b;
        this._designer$1 = c;
        this._cancel$1 = !1
    };
    lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype =
    {
        _objects$1: null, _changeType$1: 0, _designer$1: null, _cancel$1: !1, get_objects: function () {
        return this._objects$1
    }, get_changeType: function () {
        return this._changeType$1
    }, get_designer: function () {
        return this._designer$1
    }, get_cancel: function () {
        return this._cancel$1
    }, set_cancel: function (a) {
        return this._cancel$1 = a
    }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype, "objects", {
        get: lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype.get_objects, enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype, "changeType", {
        get: lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype.get_changeType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype, "designer", {
        get: lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype.get_designer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype,
        "cancel", {
            get: lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype.get_cancel,
            set: lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.prototype.set_cancel,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Automation.AnnAfterObjectChangedEventArgs = function (a, b, c) {
        lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.initializeBase(this);
        this._objects$1 = a;
        this._changeType$1 = b;
        this._designer$1 = c
    };
    lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype = {
        _objects$1: null,
        _changeType$1: 0, _designer$1: null, _cancel$1: !1, get_objects: function () {
            return this._objects$1
        }, get_changeType: function () {
            return this._changeType$1
        }, get_designer: function () {
            return this._designer$1
        }, get_cancel: function () {
            return this._cancel$1
        }, set_cancel: function (a) {
            return this._cancel$1 = a
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype, "objects", {
        get: lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype.get_objects,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype, "changeType", {
        get: lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype.get_changeType,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype, "designer", {
        get: lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype.get_designer,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype,
        "cancel", {
            get: lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype.get_cancel,
            set: lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.prototype.set_cancel,
            enumerable: !0,
            configurable: !0
        });
    lt.Annotations.Automation.AnnObjectModifiedEventArgs = function (a, b) {
        lt.Annotations.Automation.AnnObjectModifiedEventArgs.initializeBase(this);
        this._objects$1 = a;
        this._changeType$1 = b
    };
    lt.Annotations.Automation.AnnObjectModifiedEventArgs.prototype = {
        _objects$1: null, _changeType$1: 0, get_objects: function () {
            return this._objects$1
        },
        get_changeType: function () {
            return this._changeType$1
        }
    };
    Object.defineProperty(lt.Annotations.Automation.AnnObjectModifiedEventArgs.prototype, "objects", {
        get: lt.Annotations.Automation.AnnObjectModifiedEventArgs.prototype.get_objects,
        enumerable: !0,
        configurable: !0
    });
    Object.defineProperty(lt.Annotations.Automation.AnnObjectModifiedEventArgs.prototype, "changeType", {
        get: lt.Annotations.Automation.AnnObjectModifiedEventArgs.prototype.get_changeType,
        enumerable: !0,
        configurable: !0
    });
    lt.Annotations.Automation._lT_VersionNumber.registerClass("lt.Annotations.Automation._lT_VersionNumber");
    lt.Annotations.Automation._leadRectDExtensions.registerClass("lt.Annotations.Automation._leadRectDExtensions");
    lt.Annotations.Automation._leadPointDExtensions.registerClass("lt.Annotations.Automation._leadPointDExtensions");
    lt.Annotations.Automation._leadLengthDExtensions.registerClass("lt.Annotations.Automation._leadLengthDExtensions");
    lt.Annotations.Automation._leadSizeDExtensions.registerClass("lt.Annotations.Automation._leadSizeDExtensions");
    lt.Annotations.Automation.AnnAutomationUndoRedoObject.registerClass("lt.Annotations.Automation.AnnAutomationUndoRedoObject");
    lt.Annotations.Automation.AnnAutomation.registerClass("lt.Annotations.Automation.AnnAutomation");
    lt.Annotations.Automation.AnnPlatformCallbacks.registerClass("lt.Annotations.Automation.AnnPlatformCallbacks");
    lt.Annotations.Automation.AnnAutomationManager.registerClass("lt.Annotations.Automation.AnnAutomationManager");
    lt.Annotations.Automation.AnnAutomationObject.registerClass("lt.Annotations.Automation.AnnAutomationObject");
    lt.Annotations.Automation._stackEnumerator.registerClass("lt.Annotations.Automation._stackEnumerator",
        null, ss.IEnumerator);
    lt.Annotations.Automation._limitedStack.registerClass("lt.Annotations.Automation._limitedStack");
    lt.Annotations.Automation._node.registerClass("lt.Annotations.Automation._node", null, ss.IDisposable);
    lt.Annotations.Automation._undoRedo.registerClass("lt.Annotations.Automation._undoRedo");
    lt.Annotations.Automation.AnnAutomationObjects.registerClass("lt.Annotations.Automation.AnnAutomationObjects");
    lt.Annotations.Automation.AnnAutomations.registerClass("lt.Annotations.Automation.AnnAutomations");
    lt.Annotations.Automation.AnnAutomationEventArgs.registerClass("lt.Annotations.Automation.AnnAutomationEventArgs", lt.LeadEventArgs);
    lt.Annotations.Automation.AnnCursorEventArgs.registerClass("lt.Annotations.Automation.AnnCursorEventArgs", lt.LeadEventArgs);
    lt.Annotations.Automation.AnnDragDropEventArgs.registerClass("lt.Annotations.Automation.AnnDragDropEventArgs", lt.LeadEventArgs);
    lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs.registerClass("lt.Annotations.Automation.AnnBeforeObjectChangedEventArgs",
        lt.LeadEventArgs);
    lt.Annotations.Automation.AnnAfterObjectChangedEventArgs.registerClass("lt.Annotations.Automation.AnnAfterObjectChangedEventArgs", lt.LeadEventArgs);
    lt.Annotations.Automation.AnnObjectModifiedEventArgs.registerClass("lt.Annotations.Automation.AnnObjectModifiedEventArgs", lt.LeadEventArgs);
    lt.Annotations.Automation._lT_VersionNumber.l_VER_PRODUCT = "LEADTOOLS\u00ae for JavaScript";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_COMPANYNAME_STR = "LEAD Technologies, Inc.";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_LEGALTRADEMARKS_STR =
        "LEADTOOLS\u00ae is a trademark of LEAD Technologies, Inc.";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_LEGALCOPYRIGHT_STR = "\u00a9 1991-2017 LEAD Technologies, Inc.";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_DLLEXT = ".dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_EXEEXT = ".exe";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_PLATFORM = "";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_PLATFORM_FOR = "";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_PRODUCTNAME_STR = "LEADTOOLS\u00ae for JavaScript";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_XXX = "Leadtools.Xxx.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_XXX = "LEADTOOLS Xxx";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_KERNEL = "lt.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_KERNEL = "Leadtools";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CONTROLS = "lt.Controls.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CONTROLS =
        "Controls";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_DOCUMENTS_UI = "lt.Documents.UI.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_DOCUMENTS_UI = "Documents User Interface";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CONTROLS_MEDICAL = "lt.Controls.Medical.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CONTROLS_MEDICAL = "Medical Controls";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_DOCUMENTS =
        "lt.Documents.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_DOCUMENTS = "Documents";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_CORE = "lt.Annotations.Core.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_CORE = "Annotations Core";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_AUTOMATION = "lt.Annotations.Automation.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_AUTOMATION =
        "Annotations Automation";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_DESIGNERS = "lt.Annotations.Designers.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_DESIGNERS = "Annotations Designers";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_RENDERING = "lt.Annotations.Rendering.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_RENDERING = "Annotations Rendering";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_CCOW = "Leadtools.Ccow.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_CCOW = "Leadtools CCOW Library";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_DOCUMENTS = "Leadtools.Annotations.Documents.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_DOCUMENTS = "Annotations Documents";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_LEGACY =
        "Leadtools.Annotations.Legacy.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_LEGACY = "Annotations Legacy";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_ORIGINALFILENAME_STR_ANNOTATIONS_JAVASCRIPT = "Leadtools.Annotations.JavaScript.dll";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEDESCRIPTION_STR_ANNOTATIONS_JAVASCRIPT = "JavaScripot Annotations";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_PRODUCTVERSION_DOT_STR = "19.0.0.0";
    lt.Annotations.Automation._lT_VersionNumber.l_VER_FILEVERSION_DOT_STR =
        "19.0.0.15";
    lt.Annotations.Automation.AnnAutomationManager._insideCurrentObjectChanged = !1;
    lt.Annotations.Automation.AnnAutomationManager._platformCallbacks = new lt.Annotations.Automation.AnnPlatformCallbacks
})();
