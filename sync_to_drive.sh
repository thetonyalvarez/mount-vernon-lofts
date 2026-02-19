#!/usr/bin/env bash
set -e

SRC="/Users/tonyalvarez/Documents/GitHub/clients/nanproperties/mvl-website/"
DST="/Users/tonyalvarez/Library/CloudStorage/GoogleDrive‑tony@nanproperties.com/Shared drives/Nan & Co - Marketing/Development Services - Highrises/Mount Vernon Lofts/Website/mvl-website/"

# Ensure destination exists
mkdir -p "$DST"

# Perform sync (excluding node_modules, using .gitignore)
rsync -av --delete \
  --filter=':- .gitignore' \
  --exclude='node_modules/' \
  --exclude='.DS_Store' \
  "$SRC" "$DST"
