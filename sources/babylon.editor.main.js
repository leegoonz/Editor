var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var EditorMain = (function () {
            /**
            * Constructor
            */
            function EditorMain(containerID, antialias, options) {
                if (antialias === void 0) { antialias = false; }
                if (options === void 0) { options = null; }
                this.transformer = null;
                this.layouts = null;
                this.filesInput = null;
                this.renderMainScene = true;
                // Initialize
                this.core = new EDITOR.EditorCore();
                this.core.editor = this;
                this.container = containerID;
                this.antialias = antialias;
                this.options = options;
                // Create Main UI
                this._createUI();
                this._createBabylonEngine();
                // Register this
                this.core.eventReceivers.push(this);
                // Edition tool
                this.editionTool = new EDITOR.EditionTool(this.core);
                this.editionTool.createUI();
                // Scene graph tool
                this.sceneGraphTool = new EDITOR.SceneGraphTool(this.core);
                this.sceneGraphTool.createUI();
                // Toolbars
                this.mainToolbar = new EDITOR.MainToolbar(this.core);
                this.mainToolbar.createUI();
                this.toolsToolbar = new EDITOR.ToolsToolbar(this.core);
                this.toolsToolbar.createUI();
                // Transformer
                this.transformer = new EDITOR.Transformer(this.core);
                // Files input
                this.filesInput = new EDITOR.FilesInput(this.core, this._handleSceneLoaded(), null, null, null, null);
                this.filesInput.monitorElementForDragNDrop(this.core.canvas);
                // Exporter
                this.exporter = new EDITOR.Exporter(this.core);
            }
            Object.defineProperty(EditorMain, "DummyNodeID", {
                // private members
                // Statics
                get: function () {
                    return "BABYLON-EDITOR-DUMMY-NODE";
                },
                enumerable: true,
                configurable: true
            });
            /**
            * Event receiver
            */
            EditorMain.prototype.onEvent = function (event) {
                if (event.eventType === EDITOR.EventType.GUI_EVENT) {
                    if (event.guiEvent.eventType === EDITOR.GUIEventType.LAYOUT_CHANGED) {
                        this.core.engine.resize();
                        return true;
                    }
                }
                return false;
            };
            /**
            * Creates the UI
            */
            EditorMain.prototype._createUI = function () {
                this.layouts = new EDITOR.GUI.GUILayout(this.container, this.core);
                this.layouts.createPanel("BABYLON-EDITOR-EDITION-TOOL-PANEL", "left", 380, true).setContent("<div id=\"BABYLON-EDITOR-EDITION-TOOL\"></div>");
                this.layouts.createPanel("BABYLON-EDITOR-TOP-TOOLBAR-PANEL", "top", 70, false).setContent("<div id=\"BABYLON-EDITOR-MAIN-TOOLBAR\" style=\"height: 50 %\"></div>" +
                    "<div id=\"BABYLON-EDITOR-TOOLS-TOOLBAR\" style=\"height: 50 %\"></div>");
                this.layouts.createPanel("BABYLON-EDITOR-GRAPH-PANEL", "right", 350, true).setContent("<div id=\"BABYLON-EDITOR-SCENE-GRAPH-TOOL\" style=\"height: 100%;\"></div>");
                this.layouts.createPanel("BABYLON-EDITOR-MAIN-PANEL", "main", undefined, undefined).setContent('<canvas id="BABYLON-EDITOR-MAIN-CANVAS"></canvas>');
                this.layouts.createPanel("BABYLON-EDITOR-PREVIEW-PANEL", "preview", 70, true).setContent("");
                this.layouts.buildElement(this.container);
            };
            /**
            * Handles just opened scenes
            */
            EditorMain.prototype._handleSceneLoaded = function () {
                var _this = this;
                return function (file, scene) {
                    // Set active scene
                    _this.core.removeScene(_this.core.currentScene);
                    _this.core.scenes.push({ scene: scene, render: true });
                    _this.core.currentScene = scene;
                    // Set active camera
                    _this._createBabylonCamera();
                    _this.core.currentScene.activeCamera = _this.core.camera;
                    // Create render loop
                    _this.core.engine.stopRenderLoop();
                    _this.createRenderLoop();
                    // Create parent node
                    var parent = null; //new Mesh(file.name, scene, null, null, true);
                    //parent.id = EditorMain.DummyNodeID + SceneFactory.GenerateUUID();
                    // Configure meshes
                    for (var i = 0; i < scene.meshes.length; i++) {
                        EDITOR.SceneManager.configureObject(scene.meshes[i], _this.core, parent);
                    }
                    // Reset UI
                    _this.sceneGraphTool.createUI();
                    _this.sceneGraphTool.fillGraph();
                };
            };
            /**
            * Creates the babylon engine
            */
            EditorMain.prototype._createBabylonEngine = function () {
                var _this = this;
                this.core.canvas = document.getElementById("BABYLON-EDITOR-MAIN-CANVAS");
                this.core.engine = new BABYLON.Engine(this.core.canvas, this.antialias, this.options);
                this.core.currentScene = new BABYLON.Scene(this.core.engine);
                this.core.scenes.push({ render: true, scene: this.core.currentScene });
                this._createBabylonCamera();
                window.addEventListener("resize", function (ev) {
                    _this.core.engine.resize();
                });
            };
            /**
            * Creates the editor camera
            */
            EditorMain.prototype._createBabylonCamera = function () {
                var camera = new BABYLON.FreeCamera("EditorCamera", new BABYLON.Vector3(10, 10, 10), this.core.currentScene);
                camera.setTarget(new BABYLON.Vector3(0, 0, 0));
                camera.attachControl(this.core.canvas);
                this.core.camera = camera;
            };
            /**
            * Creates the render loop
            */
            EditorMain.prototype.createRenderLoop = function () {
                var _this = this;
                this.core.engine.runRenderLoop(function () {
                    _this.update();
                });
            };
            /**
            * Simply update the scenes and updates
            */
            EditorMain.prototype.update = function () {
                // Pre update
                this.core.onPreUpdate();
                // Scenes
                if (this.renderMainScene) {
                    for (var i = 0; i < this.core.scenes.length; i++) {
                        if (this.core.scenes[i].render) {
                            this.core.scenes[i].scene.render();
                        }
                    }
                }
                // Render transformer
                this.transformer.getScene().render();
                // Post update
                this.core.onPostUpdate();
            };
            EditorMain.prototype.dispose = function () {
            };
            return EditorMain;
        })();
        EDITOR.EditorMain = EditorMain;
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=babylon.editor.main.js.map