var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var TerrainMaterialTool = (function (_super) {
            __extends(TerrainMaterialTool, _super);
            function TerrainMaterialTool(editionTool) {
                _super.call(this, editionTool, "TERRAIN-MATERIAL", "TERRAIN", "Terrain");
                this.onObjectSupported = function (material) { return material instanceof BABYLON.TerrainMaterial; };
            }
            TerrainMaterialTool.prototype.update = function () {
                if (!_super.prototype.update.call(this))
                    return false;
                this.addTextureButton("Mix Texture", "mixTexture", null).open();
                var diffuseFolder = this._element.addFolder("Diffuse");
                this.addColorFolder(this.material.diffuseColor, "Diffuse Color", true, diffuseFolder);
                this.addTextureButton("Diffuse Texture R", "diffuseTexture1", diffuseFolder).open();
                this.addTextureButton("Diffuse Texture G", "diffuseTexture2", diffuseFolder).open();
                this.addTextureButton("Diffuse Texture B", "diffuseTexture3", diffuseFolder).open();
                var bumpFolder = this._element.addFolder("Bump");
                this.addTextureButton("Bump Texture R", "bumpTexture1", bumpFolder).open();
                this.addTextureButton("Bump Texture G", "bumpTexture2", bumpFolder).open();
                this.addTextureButton("Bump Texture B", "bumpTexture3", bumpFolder).open();
                var specularFolder = this._element.addFolder("Specular");
                this.addColorFolder(this.material.specularColor, "Specular Color", true, specularFolder);
                specularFolder.add(this.material, "specularPower").min(0).step(0.5).name("Specular Power");
                return true;
            };
            return TerrainMaterialTool;
        }(EDITOR.AbstractMaterialTool));
        EDITOR.TerrainMaterialTool = TerrainMaterialTool;
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));
