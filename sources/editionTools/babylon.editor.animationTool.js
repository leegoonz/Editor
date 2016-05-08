var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var AnimationTool = (function (_super) {
            __extends(AnimationTool, _super);
            function AnimationTool(editionTool) {
                _super.call(this, editionTool);
                this.tab = "ANIMATION.TAB";
                this._animationSpeed = 1.0;
                this._loopAnimation = false;
                this.containers = [
                    "BABYLON-EDITOR-EDITION-TOOL-ANIMATION"
                ];
            }
            AnimationTool.prototype.isObjectSupported = function (object) {
                if (object.animations && Array.isArray(object.animations))
                    return true;
                return false;
            };
            AnimationTool.prototype.createUI = function () {
                this._editionTool.panel.createTab({ id: this.tab, caption: "Animations" });
            };
            AnimationTool.prototype.update = function () {
                var object = this.object = this._editionTool.object;
                _super.prototype.update.call(this);
                if (!object)
                    return false;
                this._element = new EDITOR.GUI.GUIEditForm(this.containers[0], this._editionTool.core);
                this._element.buildElement(this.containers[0]);
                this._element.remember(object);
                this._element.add(this, "_editAnimations").name("Edit Animations");
                var animationsFolder = this._element.addFolder("Play Animations");
                animationsFolder.add(this, "_playAnimations").name("Play Animations");
                animationsFolder.add(this, "_animationSpeed").min(0).name("Speed");
                animationsFolder.add(this, "_loopAnimation").name("Loop");
                if (object instanceof BABYLON.AbstractMesh && object.skeleton) {
                    var skeletonFolder = this._element.addFolder("Skeleton");
                    skeletonFolder.add(this, "_playSkeletonAnimations").name("Play Animations");
                    object.skeleton.needInitialSkinMatrix = object.skeleton.needInitialSkinMatrix || false;
                    skeletonFolder.add(object.skeleton, "needInitialSkinMatrix").name("Need Initial Skin Matrix");
                }
                if (object instanceof BABYLON.Scene || object instanceof BABYLON.AbstractMesh) {
                    var actionsBuilderFolder = this._element.addFolder("Actions Builder");
                    actionsBuilderFolder.add(this, "_openActionsBuilder").name("Open Actions Builder");
                }
                return true;
            };
            AnimationTool.prototype._editAnimations = function () {
                var animCreator = new EDITOR.GUIAnimationEditor(this._editionTool.core, this.object);
            };
            AnimationTool.prototype._playAnimations = function () {
                this._editionTool.core.currentScene.beginAnimation(this.object, 0, Number.MAX_VALUE, this._loopAnimation, this._animationSpeed);
            };
            AnimationTool.prototype._playSkeletonAnimations = function () {
                var object = this.object = this._editionTool.object;
                var scene = object.getScene();
                scene.beginAnimation(object.skeleton, 0, Number.MAX_VALUE, this._loopAnimation, this._animationSpeed);
            };
            AnimationTool.prototype._openActionsBuilder = function () {
                var actionManager = null;
                var object = this.object;
                if (this.object instanceof BABYLON.Scene)
                    actionManager = this._editionTool.core.isPlaying ? this.object.actionManager : EDITOR.SceneManager._SceneConfiguration.actionManager;
                else
                    actionManager = this._editionTool.core.isPlaying ? this.object.actionManager : EDITOR.SceneManager._ConfiguredObjectsIDs[this.object.id].actionManager;
                if (!actionManager) {
                    actionManager = new BABYLON.ActionManager(this._editionTool.core.currentScene);
                    if (this.object instanceof BABYLON.Scene)
                        EDITOR.SceneManager._SceneConfiguration.actionManager = actionManager;
                    else
                        EDITOR.SceneManager._ConfiguredObjectsIDs[object.id].actionManager = actionManager;
                }
                var actionsBuilder = new EDITOR.GUIActionsBuilder(this._editionTool.core, this.object, actionManager);
            };
            return AnimationTool;
        }(EDITOR.AbstractDatTool));
        EDITOR.AnimationTool = AnimationTool;
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));
