/**
 * mapcraft-api
 * Copyright (C) 2021 - 2022 Clément Bertrand (https://gitlab.com/cbertran/mapcraft-api)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

const Mapcraft = require('./modules/Mapcraft');
const MCdatabase = require('./modules/MCdatabase');
const MCeditor = require('./modules/MCeditor');
const MCfs = require('./modules/MCfs');
const MCipc = require('./modules/MCipc');
const MClog = require('./modules/MClog');
const MCplugin = require('./modules/MCplugin');
const MCsearch = require('./modules/MCsearch');
const MCshell = require('./modules/MCshell');
const MCtemplate = require('./modules/MCtemplate');
const MCutilities = require('./modules/MCutilities');
const MCwindow = require('./modules/MCwindow');
const MCworkInProgress = require('./modules/MCworkInProgress');

module.exports = {
	Mapcraft,
	MCdatabase,
	MCeditor,
	MCfs,
	MCipc,
	MClog,
	MCplugin,
	MCsearch,
	MCshell,
	MCtemplate,
	MCutilities,
	MCwindow,
	MCworkInProgress,
};
