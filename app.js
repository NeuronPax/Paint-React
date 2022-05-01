const App = () => {
    const canvasRef = React.useRef()
    const [c, setC] = React.useState(null)
    const [isDraw, setIsDraw] = React.useState(false)
    const startDraw = ({nativeEvent: {offsetX, offsetY}}) => {
        c.beginPath()
        c.moveTo(offsetX, offsetY)
        setIsDraw(true)
    }
    const endDraw = () => {
        c.closePath()
        setIsDraw(false)
    }
    const draw = ({nativeEvent: {offsetX, offsetY}}) => {
        if (!isDraw) return
        c.lineTo(offsetX, offsetY)
        c.stroke()
    }
    React.useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        const ctx = canvas.getContext('2d')
        ctx.scale(2, 2)
        ctx.lineCap = 'round'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 5
        setC(ctx)
    }, [])
    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseMove={draw}
        />
    )
}
ReactDOM.render(<App />, document.getElementById('root'))