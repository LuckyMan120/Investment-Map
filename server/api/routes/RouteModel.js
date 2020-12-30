const router = require('express').Router();

var fs = require('fs'),
  path = require('path'),
  xmlReader = require('read-xml');

var papa = require('papaparse');
var convert = require('xml-js');

// get data from csv and kml
var stateKmlFile = path.join(__dirname, './us_states.kml');

// import models visitorDB
let db = require('../models');

let rad = function (x) {
  return (x * Math.PI) / 180;
};

router.route('/getStates').get((req, res) => {
  xmlReader.readXML(fs.readFileSync(stateKmlFile), function (err, stateData) {
    if (err) {
      console.error(err);
    }

    var stateXml = stateData.content;
    var stateResult = JSON.parse(
      convert.xml2json(stateXml, { compact: true, spaces: 4 })
    );

    let data = {};
    data['state'] = stateResult;
    res.json(data);
  });
});

router.route('/search').post((req, res) => {
  // get all map data
  db.testDB
    .find({ state: req.body.name })
    .then((mapData) => {
      if (mapData.length !== 1) {
        let polyData = [...mapData[0].polygons];
        polyData = [...polyData, ...mapData[1].polygons];

        res.json(polyData);
      } else {
        let polyData = [...mapData[0].polygons];
        res.json(polyData);
      }
    })
    .catch((err) => console.log('Error', err));
});

module.exports = router;
