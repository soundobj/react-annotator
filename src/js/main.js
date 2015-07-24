'use strict';

import React from 'react';
import jquery from 'jquery';
import annotator from './vendor/annotator/v1/pkg/annotator.min';
import widget from './vendor/annotator/v1/plugins/annotator.widget/widget';
import offline from './vendor/annotator/v1/plugins/annotator.offline.js/src/offline';
import store from './vendor/annotator/v1/plugins/annotator.offline.js/src/offline/store';

$('#airlock').annotator()
    .annotator('addPlugin','Widget')
    .annotator('addPlugin', 'Offline', {
        online: function() {
            return jQuery("#status").text("Online");
        },
        offline: function() {
            return jQuery("#status").text("Offline");
        }
    })

;