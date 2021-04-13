<template>
    <div style="height:100%;width:100%;"></div>
</template>

<script>
    // import Vue from "vue";
    /* eslint-disable */
    // import $ from "jquery"
    // import '../../../public/assets/lt-19.x/Leadtools';
    // import '../../../public/assets/lt-19.x/Leadtools.Controls';
    // import '../../../public/assets/lt-19.x/Leadtools.Annotations.Core';
    // import '../../../public/assets/lt-19.x/Leadtools.Annotations.Designers';
    // import '../../../public/assets/lt-19.x/Leadtools.Annotations.Rendering.JavaScript';
    // import '../../../public/assets/lt-19.x/Leadtools.Annotations.JavaScript';
    // import '../../../public/assets/lt-19.x/Leadtools.Annotations.Automation';

    var AnnoViewer = (function () {
        var inch = 720;

        function AnnoViewer(el, data, vm) {
            this.data = data;
            this.vm = vm;
            this.el = el;

            this._createImageViewer(el);
            this._initAnnoManager(this._viewer);
            this.setRunMode(true);
            this.updateZoneList();
        }

        AnnoViewer.prototype._createImageViewer = function (el) {
            var createOptions = new lt.Controls.ImageViewerCreateOptions(el);
            var viewer = (this._viewer = new lt.Controls.ImageViewer(
                createOptions
            ));

            var data = this.data;
            var imgDpi = data.viewerOptions.imageResolution || 96;

            this._scaleDpi = inch / imgDpi;
            var resolution = lt.LeadSizeD.create(imgDpi, imgDpi);
            viewer.set_imageResolution(resolution);

            var _this = this;
            viewer.interactiveService.tap.add(function (sender, e) {
                _this.onTap(sender, e);
            });

            viewer.add_imageLoading(function (sender, e) {
                _this.onImageLoading(sender, e);
            });

            viewer.viewHorizontalAlignment =
                data.viewerOptions.viewHorizontalAlignment || 0;
            viewer.viewVerticalAlignment =
                data.viewerOptions.viewVerticalAlignment || 0;

            if (data.imageUrl) {
                viewer.set_imageUrl(data.imageUrl);
            }

            return this._viewer;
        };

        AnnoViewer.prototype.updateZoneList = function () {
            this._viewer.beginUpdate();
            this._automation
                .get_container()
                .get_children()
                .clear();
            this.data.zoneList.forEach(x => this.drawZone(x));

            this._viewer.endUpdate();
        };

        AnnoViewer.prototype.findZoneByPt = function (pt) {
            var x = pt.x;
            var y = pt.y;

            let firstZone;
            // mm 修改 点击报错
            // for (let zone of this.data.zoneList()) {
            for (let zone of this.data.zoneList) {
                var rect = zone.rect;
                if (
                    x >= rect.x &&
                    y >= rect.y &&
                    x <= rect.width + rect.x &&
                    y <= rect.height + rect.y
                ) {
                    firstZone = zone;
                }
            }

            return firstZone;
        };

        AnnoViewer.prototype.onTap = function (sender, e) {
            var pt = this._viewer.convertPoint(
                this._viewer.activeItem,
                lt.Controls.ImageViewerCoordinateType.control,
                lt.Controls.ImageViewerCoordinateType.image,
                e.position
            );

            var zone = this.findZoneByPt(pt);
            if (zone) {
                this.data.selectedZone = zone;
            } else {
                this.data.selectedZone = null;
            }

            this.vm.$emit("zone-selected", this.data.selectedZone, e.position);
        };

        AnnoViewer.prototype.onImageLoading = function (sender, e) {
            var vm = this.vm;
            vm.$emit("image-loading", e);
            e.imageLoader.done.add(function (s, evt) {
                vm.$emit("image-loaded", evt);
            });
        };

        AnnoViewer.prototype.convertToControlPoint = function (imagePoint) {
            var pt = new lt.LeadPointD();
            pt.x = imagePoint.x;
            pt.y = imagePoint.y;

            return this._viewer.convertPoint(
                this._viewer.activeItem,
                lt.Controls.ImageViewerCoordinateType.image,
                lt.Controls.ImageViewerCoordinateType.control,
                pt
            );
        };

        AnnoViewer.prototype.convertRect = function (rect) {
            var x = rect.x * this._scaleDpi;
            var y = rect.y * this._scaleDpi;
            var r = x + rect.width * this._scaleDpi;
            var b = y + rect.height * this._scaleDpi;

            return { x: x, y: y, r: r, b: b };
        };

        AnnoViewer.prototype.getImageSize = function () {
            var imgSize = this._viewer.imageSize;
            if (imgSize) {
                return { width: imgSize.width, height: imgSize.height };
            }
            return { width: 0, height: 0 };
        };

        AnnoViewer.prototype.centerAtZone = function (zone, zoomScale) {
            var rect = zone.rect;
            var imgPt = lt.LeadPointD.create(
                rect.x + rect.width / 2,
                rect.y + rect.height / 2
            );
            if (zoomScale) {
                this.setZoomScale(zoomScale);
            }

            var pt = this._viewer.convertPoint(
                this._viewer.activeItem,
                lt.Controls.ImageViewerCoordinateType.image,
                lt.Controls.ImageViewerCoordinateType.control,
                imgPt
            );

            this._viewer.centerAtPoint(pt);
        };

        AnnoViewer.prototype.drawZone = function (zone) {
            var annObject = new lt.Annotations.Core.AnnRectangleObject();
            var rect = this.convertRect(zone.rect);

            annObject.get_points().add(lt.LeadPointD.create(rect.x, rect.y));
            annObject.get_points().add(lt.LeadPointD.create(rect.r, rect.y));
            annObject.get_points().add(lt.LeadPointD.create(rect.r, rect.b));
            annObject.get_points().add(lt.LeadPointD.create(rect.x, rect.b));

            zone.$annObject = annObject;
            this._updateZoneStyle(zone, zone.style || this.data.styles.defaultZone);

            // Add the object to the automation container
            this._automation
                .get_container()
                .get_children()
                .add(annObject);
        };

        AnnoViewer.prototype.clearZone = function () {
            this._viewer.beginUpdate();
            this._automation
                .get_container()
                .get_children()
                .clear();
            this._viewer.endUpdate();
        };

        var defaultZoneStyle = {
            fillColor: "yellow",
            borderColor: "",
            borderWidth: 2,
            opacity: 0.5
        };

        AnnoViewer.prototype._updateZoneStyle = function (zone, style) {
            var annObject = zone.$annObject;
            if (!annObject) {
                return;
            }
            if (typeof style === "string") {
                style = this.data.styles[style];
            }

            var zoneStyle = Object.assign({}, defaultZoneStyle, style);
            annObject.fill = lt.Annotations.Core.AnnSolidColorBrush.create(
                zoneStyle.fillColor
            );

            var storke = null;
            if (zoneStyle.borderColor && zoneStyle.borderWidth > 0) {
                storke = lt.Annotations.Core.AnnStroke.create(
                    lt.Annotations.Core.AnnSolidColorBrush.create(
                        zoneStyle.borderColor
                    ),
                    lt.LeadLengthD.create(zoneStyle.borderWidth)
                );
            }
            annObject.set_stroke(storke);
            annObject.opacity = zoneStyle.opacity;
        };

        AnnoViewer.prototype.updateSelectedZone = function (selected, oldZone) {
            if (oldZone === selected) {
                return;
            }

            this._viewer.beginUpdate();

            if (oldZone) {
                this._updateZoneStyle(
                    oldZone,
                    oldZone.style || this.data.styles.defaultZone
                );
            }
            if (selected) {
                this._updateZoneStyle(
                    selected,
                    selected.focusStyle || this.data.styles.selectedZone
                );
            }
            this._viewer.endUpdate();
        };

        AnnoViewer.prototype._initAnnoManager = function (viewer) {
            //创建注释自动化控制和附加的图像查看器
            var _imageViewerAutomationControl = new lt.Annotations.JavaScript.ImageViewerAutomationControl();
            _imageViewerAutomationControl.imageViewer = viewer;

            // Create the automation manager, and default objects
            var _manager = new lt.Annotations.Automation.AnnAutomationManager();
            _manager.createDefaultObjects();

            // Create Html5 rendering engine and bind it to the automation manager
            //创建Html5渲染引擎并将其绑定到自动化管理
            var _renderingEngine = new lt.Annotations.Rendering.AnnHtml5RenderingEngine();
            _manager.set_renderingEngine(_renderingEngine);

            // Create Automation interactive mode instance and bind automation control to it
            //创建自动化交互模式实例并结合自动化控制
            // var _automationInteractiveMode = new lt.Annotations.JavaScript.AutomationInteractiveMode();
            // _automationInteractiveMode.automationControl = _imageViewerAutomationControl;

            // Add automation interactive mode to the viewer interactive modes list and enable it
            //自动化交互模式添加到列表和观众互动模式启用它
            viewer.get_interactiveModes().beginUpdate();
            viewer
                .get_interactiveModes()
                .add(new lt.Controls.ImageViewerPanZoomInteractiveMode());
            // viewer.get_interactiveModes().add(_automationInteractiveMode);
            // _automationInteractiveMode.set_isEnabled(true);
            viewer.get_interactiveModes().endUpdate();

            // Create the annotation automation object and set it to active
            //创建注释自动化对象并将其设置为活跃
            var _automation = new lt.Annotations.Automation.AnnAutomation(
                _manager,
                _imageViewerAutomationControl
            );
            _automation.set_active(true);
            this._automation = _automation;
        };

        AnnoViewer.prototype.onSizeChanged = function () {
            this._viewer.onSizeChanged();
        };

        AnnoViewer.prototype.setRunMode = function (runMode) {
            this._automation.manager.userMode = runMode
                ? lt.Annotations.Core.AnnUserMode.run
                : lt.Annotations.Core.AnnUserMode.design;
        };

        // 新增旋转功能2020-11-23
        AnnoViewer.prototype.rotateAngle = function (val) {
            this._viewer.beginUpdate();
            this._viewer.set_rotateAngle(val);
            this._viewer.endUpdate();
        };
        AnnoViewer.prototype.fitAlways = function () {
            this._viewer.zoom(
                lt.Controls.ControlSizeMode.fitAlways,
                1.0,
                this._viewer.defaultZoomOrigin
            );
        };
        AnnoViewer.prototype.fitWidth = function () {
            this._viewer.zoom(
                lt.Controls.ControlSizeMode.fitWidth,
                1.0,
                this._viewer.defaultZoomOrigin
            );
        };

        AnnoViewer.prototype.fitHeight = function () {
            this._viewer.zoom(
                lt.Controls.ControlSizeMode.fitHeight,
                1.0,
                this._viewer.defaultZoomOrigin
            );
        };

        AnnoViewer.prototype.zoomScale = function (scale) {
            this._viewer.zoom(
                lt.Controls.ControlSizeMode.none,
                this._viewer.scaleFactor * scale,
                this._viewer.defaultZoomOrigin
            );
        };

        AnnoViewer.prototype.getZoomScale = function () {
            return this._viewer.scaleFactor;
        };

        AnnoViewer.prototype.setZoomScale = function (scale) {
            this._viewer.zoom(
                lt.Controls.ControlSizeMode.none,
                scale,
                this._viewer.defaultZoomOrigin
            );
        };

        AnnoViewer.prototype.setImageUrl = function (url) {
            this._viewer.beginUpdate();
            if (url) {
                this._viewer.set_imageUrl(url);
            } else {
                this._viewer.set_imageUrl(null);
            }

            this._viewer.endUpdate();
        };

        AnnoViewer.prototype.dispose = function () {
            this._viewer.dispose();
            if (this._automation && this._automation.dispose) {
                this._automation.dispose();
                this._automation = null;
            }
            this.el = null;
        };

        return AnnoViewer;
    })();

    export default {
        props: {
            ann: {
                required: true
            }
        },
        data() {
            return {};
        },
        beforeMount: function () {
            this.checkData(this.ann);
        },
        mounted() {
            var vm = this;
            this.$nextTick(function () {
                vm.ann.api = new AnnoViewer(vm.$el, vm.ann, vm);
                vm.$emit("ready", vm.ann);
                vm = null;
            });
        },
        destroyed: function () {
            if (this.ann.api) {
                this.ann.api.dispose();
                this.ann.api = null;
            }
        },
        methods: {
            getDefaultData() {
                return {
                    imageUrl: "",
                    viewerOptions: {
                        viewHorizontalAlignment: 1,
                        viewVerticalAlignment: 0
                    },
                    styles: {
                        defaultZone: {
                            fillColor: "yellow",
                            borderColor: "",
                            borderWidth: 0,
                            opacity: 0.5
                        },
                        selectedZone: {
                            fillColor: "orange",
                            borderColor: "red",
                            borderWidth: 2,
                            opacity: 0.5
                        }
                    },
                    zoneList: [],
                    selectedZone: null
                };
            },
            bindImageMethod() {
                return function () {
                    if (!this.$annoViewer) {
                        return;
                    }
                    var fn = this.$annoViewer[name];
                    // mm 20200723 1748 注释修改
                    // if (hexui.isFunction(fn)) {
                    //     return fn.apply(this.$annoViewer, arguments);
                    // }
                    if (this.$utils.isFunction(fn)) {
                        return fn.apply(this.$annoViewer, arguments);
                    }
                };
            },
            checkData(data) {
                var defData = this.getDefaultData();
                for (var key in defData) {
                    if (data[key] === undefined) {
                        data[key] = defData[key];
                    }
                }
            }
        },
        watch: {
            "ann.imageUrl": function (value, oldValue) {
                if (!this.ann.api) {
                    return;
                }
                this.ann.api.setImageUrl(value);
            },
            "ann.zoneList": function (value, oldValue) {
                if (!this.ann.api) {
                    return;
                }
                this.ann.api.updateZoneList(value);
            },
            "ann.selectedZone": function (value, oldValue) {
                if (!this.ann.api) {
                    return;
                }
                this.ann.api.updateSelectedZone(value, oldValue);
            }
        }
    };
</script>
