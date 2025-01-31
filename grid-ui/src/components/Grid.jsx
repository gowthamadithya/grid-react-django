import { useState, useEffect } from "react"

const GridUi = () => {
    const [size, setSize] = useState(20)
    const [grid, setGrid] = useState([[]])
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [path, setPath] = useState([])
    const SERVER_URL = 'http://localhost:8080/'

    useEffect(()=> {
        const newGrid = Array(size).fill(null).map(()=> Array(size).fill(0))
        setGrid(newGrid)
    },[size])

    const populatePath = ()=> {
        axios.get(`${SERVER_URL}api/find-path?n=${size}&start=${start[0],start[1]}&end=${end[0],end[1]}`)
        .then((res) => {
            setPath(res)
        })
        .catch((err) => console.log(err))

    }

    const handleClick = (node)=> {
        if (!start){
            setStart(node)
        }else{
            setEnd(node)
        }
    }


    
    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows:`repeat(${size}, 1fr)`, 
                    gridTemplateColumns:`repeat(${size}, 1fr)`,
                    gap: '2px', 
                    backgroundColor: 'ButtonShadow'
                }}
            >
                {grid.map((row, rowid) =>
                    row.map((item, colId) => (
                        <div
                            style={{ 
                                display: "inline-block",
                                height: '20px',
                                width: '20px',
                                border: '1px solid black',
                                backgroundColor: start && (start[0] === rowid && start[1] === colId) ? 'blue' :
                                end && (end[0] === rowid && end[1] === colId) ? 'red' :
                                path.some(sn => sn[0] === rowid && sn[1] === colId) ? 'black' : null               
                            }}
                            key={`${rowid} + ${colId}`}
                            onClick={()=> handleClick([rowid, colId])}
                        > 
                        {} 
                        </div>
                    )),
                )}
            </div>
        </div>
    )

}
export default GridUi;