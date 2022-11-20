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
import minecraft from './minecraft';
import { download, formatString } from './misc';

import base from './engine/base';
import { envInterface } from './engine/interface';

export {
	minecraft,
	download, formatString
};

const test = new base({} as envInterface, '1.19', 'C:\\Users\\Clement\\AppData\\Roaming\\.minecraft\\resourcepacks\\test');

test.build();
