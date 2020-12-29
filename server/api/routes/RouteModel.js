const router = require('express').Router();

// import models visitorDB
let db = require('../models');

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
