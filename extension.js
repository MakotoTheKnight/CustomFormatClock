const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const PanelFormat = Me.imports.panelFormat;

function init() {
  PanelFormat.initialize();
}

function enable() {
  PanelFormat.enable();
}

function disable() {
  PanelFormat.disable();
}
