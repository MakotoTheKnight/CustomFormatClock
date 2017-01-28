const Main = imports.ui.main;
const Lang = imports.lang;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

let panelDateMenu = null,
    panelClockId = null,
    panelClockFormat = null,
    settings = null;

function initialize() {
  settings = Convenience.getSettings('org.gnome.shell.extensions.custom-format-clock');
  panelDateMenu = Main.panel.statusArea.dateMenu;
  panelClockFormat = settings.get_string('panel-clock-format');
}

function customFormatUpdateClockAndDate() {
  let displayDate = new Date();
  this._clockDisplay.set_text(displayDate.toLocaleFormat(panelClockFormat));
}

function enable() {
  if (!panelDateMenu) {
    return;
  }

  panelDateMenu._updateClockAndDate = customFormatUpdateClockAndDate;
  panelClockId = panelDateMenu._clock.connect('notify::clock', Lang.bind(panelDateMenu,
      panelDateMenu._updateClockAndDate));
  panelDateMenu._updateClockAndDate();
}

function disable() {
  if (!panelDateMenu) {
    return;
  }

  // This disconnects with Shell 3.20.4 but doesn't update the display for up to a minute
  // if show_seconds is disabled.
  panelDateMenu._clock.disconnect(panelClockId);
}