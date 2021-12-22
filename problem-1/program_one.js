const fs = require('fs')
const split = require('split')
const { Transform } = require('stream')

const csvStrToArray = (csvStr) => {
    csvStr = csvStr.trim()
    csvStr = csvStr.slice(1, csvStr.length - 1)
    return csvStr.split(' ')
}

const csvStream = (file) => {
    const statesStream = fs.createReadStream(file)
    return statesStream.pipe(split())
}

const FIRST_ROW_IDENTIFIER_STATE = "Long, Short, Zip Codes, Capital".toLowerCase().replace(/ /g, '').trim()
const statesTrans = () => {
    return new Transform({
        transform(chunk, enc, cb) {
            chunk = chunk.toString()
            const isFirstRow = FIRST_ROW_IDENTIFIER_STATE === chunk.toLowerCase().replace(/ /g, '').trim()
            if (!isFirstRow && chunk) {
                const states = chunk.split(',').map((col) => col.trim())
                states[2] = csvStrToArray(states[2])
                cb(null, JSON.stringify(states))
            } else {
                cb(null, '')
            }
        }
    })
}

const FIRST_ROW_IDENTIFIER_POP_BY_ZIP = "Zip Code, Population".toLowerCase().replace(/ /g, '').trim()
const popByZipTrans = () => {
    return new Transform({
        transform(chunk, enc, cb) {
            chunk = chunk.toString()
            const isFirstRow = FIRST_ROW_IDENTIFIER_POP_BY_ZIP === chunk.toLowerCase().replace(/ /g, '').trim()
            if (!isFirstRow && chunk) {
                const popByZips = chunk.split(',')
                popByZips[1] = ~~popByZips[1]
                cb(null, JSON.stringify(popByZips))
            } else {
                cb(null, '')
            }
        }
    })
}

exports.programOne = function (states) {
    const popRecs = {
        pop_total_by_state: [],
        average_pop_per_zip: 0,
        average_pop_per_state: 0
    }

    let totalStates = 0
    let totalZips = 0

    let visitedZipCodes = {}

    return function () {
        return new Promise(function (resolve, reject) {
            const statesStream = csvStream('./states.csv')
            const transformState = statesTrans()
            const transformPopByZip = popByZipTrans()
            statesStream.pipe(transformState).on('data', (chunk) => {
                const [long, short, zipcodes, capital] = JSON.parse(chunk.toString())
                if (states.includes(long)) {
                    totalStates++
                    const popByZip = csvStream('./population-by-zip-code.csv')
                    popByZip.pipe(transformPopByZip).on('data', (chunk) => {
                        const [zipcode, population] = JSON.parse(chunk.toString())
                        if (!(zipcode in visitedZipCodes) && zipcodes.includes(zipcode)) {
                            visitedZipCodes = { ...visitedZipCodes, [zipcode]: true }
                            totalZips++
                            const index = popRecs.pop_total_by_state.findIndex((state) => Object.keys(state)[0] === long)
                            if (index >= 0) {
                                popRecs.pop_total_by_state[index][long] += population
                            } else {
                                popRecs.pop_total_by_state.push({ [long]: population })
                            }

                            popRecs.average_pop_per_zip += population
                            popRecs.average_pop_per_state += population
                        }
                    })

                    popByZip.on('end', () => {
                        popRecs.average_pop_per_zip = popRecs.average_pop_per_zip / totalZips
                        popRecs.average_pop_per_state = popRecs.average_pop_per_state / totalStates
                        resolve({ ...popRecs })
                    })

                }
            })

        })
    }
}