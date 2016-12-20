/**
 * Copyright © 2015,2016 STRG.AT GmbH, Vienna, Austria
 *
 * This file is part of the The SCORE Framework.
 *
 * The SCORE Framework and all its parts are free software: you can redistribute
 * them and/or modify them under the terms of the GNU Lesser General Public
 * License version 3 as published by the Free Software Foundation which is in the
 * file named COPYING.LESSER.txt.
 *
 * The SCORE Framework and all its parts are distributed without any WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. For more details see the GNU Lesser General Public
 * License.
 *
 * If you have not received a copy of the GNU Lesser General Public License see
 * http://www.gnu.org/licenses/.
 *
 * The License-Agreement realised between you as Licensee and STRG.AT GmbH as
 * Licenser including the issue of its valid conclusion and its pre- and
 * post-contractual effects is governed by the laws of Austria. Any disputes
 * concerning this License-Agreement including the issue of its valid conclusion
 * and its pre- and post-contractual effects are exclusively decided by the
 * competent court, in whose district STRG.AT GmbH has its registered seat, at
 * the discretion of STRG.AT GmbH also the competent court, in whose district the
 * Licensee has his registered seat, an establishment or assets.
 */

// Universal Module Loader
// https://github.com/umdjs/umd
// https://github.com/umdjs/umd/blob/v1.0.0/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['score.init', 'score.dom', 'score.relatime'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        factory(require('score.init', 'score.dom', 'score.relatime'));
    } else {
        // Browser globals (root is window)
        var strg = strg || {};
        strg.relatime = factory(root.score);
    }
})(this, function(score) {

    var timeout;

    var nodes = [];

    var update = function() {
        nodes = nodes.filter(function(pair) {
            return pair[0].closest('body').length;
        });
        if (!nodes.length) {
            timeout = null;
            return;
        }
        nodes.forEach(function(pair) {
            pair[1].text(score.relatime(pair[0].attr('data-timestamp')));
        });
        timeout = window.setTimeout(update, relatime.INTERVAL);
    };

    var relatime = function(node) {
        node = score.dom(node);
        var relativeNode = score.dom.create('span').
            addClass('strg-relatime__relative').
            text(score.relatime(node.attr('data-timestamp')));
        node.append(relativeNode);
        nodes.append([node, relativeNode]);
        if (!timeout) {
            timeout = window.setTimeout(update, relatime.INTERVAL);
        }
    };

    relatime.INTERVAL = 30000;

    return relatime;

});
