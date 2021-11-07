/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const {St, GLib, GObject, Clutter, Gio, Meta, Shell} = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Me = imports.misc.extensionUtils.getCurrentExtension();



//const Keybinder = imports.Keybinder;
let panelButton, panelButtonText;

function init () {
  log("Starting WS: ", this.active_ws_index);
  wsm = new WS_manager();

}


function _get_currentws(){
  ws = global.workspace_manager.get_active_workspace_index();
  log(ws)
}



class WS_manager{
  // Class to manage Workspace switches. should always remember the past Workspace.
  constructor(){
    log("WS Manager running");
    this.current_ws = null;
    this.last_ws = null;


    let handler_id = global.workspace_manager.connect('workspace-switched', (objectidc, last_ws, current_ws) => {
      this.current_ws = current_ws;
      this.last_ws = last_ws;

      this.current_ws = global.workspace_manager.get_active_workspace_index();
      log(`ws switched from ${this.last_ws} to ${this.current_ws}`);
      log(typeof(this.last_ws));
    })

    Main.wm.addKeybinding("my-shortcut", getSettings(), Meta.KeyBindingFlags.NONE, Shell.ActionMode.ALL, () => {
      this._switch_ws(this.last_ws);
    });

  }

  _switch_ws(to){
    // wrapper for global switch Workspace.
    global.workspace_manager.get_workspace_by_index(to).activate(global.get_current_time());
    //this.last_ws.activate(global.get_current_time());
    log(`switched WS from ${current_ws} to ${to}`);
  }

}

function getSettings () {
  let GioSSS = Gio.SettingsSchemaSource;
  let schemaSource = GioSSS.new_from_directory(
    Me.dir.get_child("schemas").get_path(),
    GioSSS.get_default(),
    false
  );
  let schemaObj = schemaSource.lookup(
    'org.gnome.shell.extensions.workspaceswitcher', true);
  if (!schemaObj) {
    throw new Error('cannot find schemas');
  }
  return new Gio.Settings({ settings_schema : schemaObj });
}

function enable () {
}

function disable () {
  let shellwm = global.workspace_manager
  let handler = GObject.signal_handler_find(shellwm, {signalId: 'workspace-switched'});
  shellwm.disconnect(handler);

  Main.panel._rightBox.remove_child(panelButton);
}
