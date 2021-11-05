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

const {St, GLib, GObject, Clutter} = imports.gi;
const Main = imports.ui.main;

let panelButton, panelButtonText;

function init () {
  panelButton = new St.Bin({
    style_class : "panel-button"
  });
  panelButtonText = new St.Label({
    style_class : "examplePanelText",
    text : "Hello world",
  });
  panelButton.set_child(panelButtonText);
  log('active ws index');
  this.active_ws_index = global.workspace_manager.get_active_workspace_index();
  log(this.active_ws_index);
}

function enable () {
  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
}

function disable () {
  Main.panel._rightBox.remove_child(panelButton);
}
