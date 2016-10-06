const router = require('express').Router() // eslint-disable-line new-cap
module.exports = router;
const Drawing = require('../../../db/models/drawing.js')
const Location = require('../../../db/models/location.js')

router.get('/', (req, res, next) => {

    Drawing.findAll()
        .then( drawings => { res.send(JSON.stringify(drawings));})
        .catch(next)

})

router.get('/:id', (req, res, next) => {

    Drawing.findById(req.params.id)
        .then( Drawing => { res.send(Drawing) })    // eslint-disable-line no-shadow
        .catch(next)
})

router.get('/:id/image', (req, res, next) => {

    Drawing.findById(req.params.id)
        .then( Drawing => { res.sendFile(Drawing.directoryPath) })  // eslint-disable-line no-shadow
        .catch(next)
})

router.post('/', (req, res, next) => {

    Drawing.create(req.body)
        .then( drawing => { res.send(drawing) })
        .catch(next)
})

router.post('/longitude/:longitudeNum/latitude/:latitudeNum', (req, res, next) => {

    console.log('longitude', req.params.longitudeNum)
    console.log('latitude', req.params.latitudeNUm)

    Location.findOrCreate({
        where: { longitude: req.params.longitudeNum, latitude: req.params.latitudeNum }
    }).spread(function(found,  created){
        console.log('found', found, 'created', created)
        res.send(found)
    }).catch(next)

})


router.delete('/:id', (req, res, next) => {
    console.log('Destoying drawing #{req.params.id}')
    Drawing.destroy({
        where: { id: req.params.id }
    })
    .then((res, next) => {
        res.status(204).send('')
    })
    .catch(next)

})

router.put('/:id', ( req, res, next ) => {
    let updatedDrawing = req.body
    Drawing.update(updatedDrawing, {
        where: {
            id: req.params.id
        }
    })
        .then(drawing => {
            res.send(drawing)
        })
        .catch(next)

})

