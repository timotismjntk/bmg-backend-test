const response = require('../helpers/responseStandard')
const axios = require('axios')

module.exports = {
    getSingleRandomHero: async(req, res) => {
        const { search } = req.query
        let searchValue = []
        if (typeof search === 'object') {
        searchValue = Object.values(search)[0]
        } else {
        searchValue = search || ''
        }
        const saveArray = []

        try {
            const {data: results} = await axios.get('https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json') // get data
            
            Object.values(results.data).forEach((el, i) => {
                if (el.id.toUpperCase().includes(searchValue.toUpperCase())) {
                    saveArray.push(el.id) // check if key of object is match with input then push it to saveArray
                }
            })
            // if data hero is match more than 1 so we create randomize to make the return is random
            const random = (val1, val2) => {
                return Math.random() * (val1 - val2) + val2
            }
            
            const valueAfterRandomize = saveArray[Math.floor(random(1, saveArray.length - 1))-1]

            if (saveArray.length > 1) {
                if (saveArray.includes(valueAfterRandomize)) {
                    // logic for check if hero is matched after randomize
                    return response(res, 'List hero', {results: results.data[valueAfterRandomize]}, 200, true)
                }
            } else if (saveArray.length === 1) {
                // logic for check if just one hero is matched after randomize
                console.log(saveArray)
                return response(res, 'List hero', {results: results.data[saveArray]}, 200, true)
            } else {
                // if just no hero is matched after randomize
                return response(res, 'Hero not found', {results: {}}, 404, false)
            }
        } catch (e) {
            return response(res, e.message, {}, 500, false)
          }
    }
}