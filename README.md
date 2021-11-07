# Install manually

## Install:

`cd .local/share/gnome-shell/extensions`

`git clone git@github.com:peterge1998/workspaceautobackforth.git`

`mv workspaceautobackforth workspaceautobackforth@peterge.de`

## Restart GNOME Shell:

Alt+F2

type `r`

Press Enter

## Enable:

`gnome-extensions enable workspaceautobackforth@peterge.de`

## Logs:

`journalctl -f -o cat /usr/bin/gnome-shell`

## Todo
- Indicator in status bar, number which was the last active workspace
- Add a GUI to change the shortcut. Currently Super+G
