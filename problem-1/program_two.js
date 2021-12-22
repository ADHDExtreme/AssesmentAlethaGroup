const process = require('process');
const { programOne } = require('./program_one');

const createTableTemp = (stateAndPop) => {
    let createTableSQL = 
`
----------------------------------------------------

CREATE TABLE StatePopulation (
    State varchar(255),
    Population int
)

`

    stateAndPop.forEach((statePop, i) => {
        const [state, population] = Object.entries(statePop)[0]
        
        if (i === 0) createTableSQL += 
`INSERT INTO StatePopulation (State, Population)
`
        createTableSQL += 
`VALUES ('${state}', ${population})
`
    })

    createTableSQL += 
`
------------------------------------------------------
`

    return createTableSQL
}

exports.programTwo = function () {
    process.stdout.write('Enter states delimited by commas; Example: Washington, Oregon, Utah.')
    process.stdout.write(`\n\n> `); 
    process.stdin.on("data", async (chunk) => { 
        const states = chunk.toString().split(',').map((state) => state.trim())
        const getPopData = programOne(states)
        const popData = await getPopData()
        const sql = createTableTemp(popData.pop_total_by_state)
        console.log('------------------------------------------------------')
        console.log(popData)
        console.log('------------------------------------------------------')
        console.log(sql)
        process.exit()
    })
}