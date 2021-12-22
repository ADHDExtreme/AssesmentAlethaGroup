const upperPlanePoint = (coordinateList) => {
    let result = -Infinity
    coordinateList.forEach((number) => {
        result = Math.max(result, number)
    })

    return result
}

const createGraph = (upperPlanePoint) => {
    return new Array(upperPlanePoint + 1).fill(null).map(() => new Array(upperPlanePoint + 1).fill(null))
}

const recList = (coordinateList) => {
    let list = []
    for (let xLower = 0; xLower < coordinateList.length - 1; xLower += 4) {
        yLower = xLower + 1
        xUpper = yLower + 1
        yUpper = xUpper + 1

        list = [...list, [[coordinateList[xLower], coordinateList[yLower]], [coordinateList[xUpper], coordinateList[yUpper]]]]
    }

    return list
}

const setRecInGraph = (x, y, graph, recList) => {
    recList.forEach(([lower, upper], i) => {
        const [xL, yL] = lower, [xU, yU] = upper

        const isXInBounds = (x >= xL) && (x < xU)
        const isYInBounds = (y >= yL) && (y < yU)
        const isInBounds = isXInBounds && isYInBounds

        if (isInBounds) {
            if (Array.isArray(graph[x][y])) {
                const recIndex = graph[x][y].findIndex((rec) => rec === i)
                if (recIndex === -1) {
                    graph[x][y] = [...graph[x][y], i]
                }
            } else {
                graph[x][y] = [i]
            }
        }
    })
}

const getAreaOfIntersecRec = function (coordinateList) {
    const upperPoint = upperPlanePoint(coordinateList)
    const graph = createGraph(upperPoint)
    const rectangles = recList(coordinateList)
    if (coordinateList.length % 4 !== 0) {
        console.error('The array of coordinates you submitted must be in groups of four. Make sure the number of coordinates you submit are evenly divisible by 4.')
    } else {
        let areaCount = 0
        for (let x = 0; x < graph.length; x++) {
            for (let y = 0; y < graph[x].length; y++) {
                setRecInGraph(x, y, graph, rectangles)
                if (graph[x][y] && graph[x][y].length === rectangles.length) areaCount++
            }
        }

        console.log(areaCount)
    }


}

getAreaOfIntersecRec([3, 5, 8, 9, 5, 6, 10, 11])
getAreaOfIntersecRec([3, 5, 8, 9])