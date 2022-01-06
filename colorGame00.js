const Square = ({ id, newState }) => {
  const [status, setStatus] = React.useState(null);
  const XorO = ['O', 'X'];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () =>  console.log(`unmounting ${id}`)
  })
  return (
    <button onClick={e => {
      let col = 'yellow';
      newState({ id:id });
      let nextPlayer = newState(id);
      setStatus(nextPlayer);
      e.target.style.backgroundColor = col;
    }}> 
      {(status != null) &&
        <h1 className={(status == 0) ? "exes" : "ohs"}>{XorO[status]}</h1>} 
    </button>
  )
};

function checkWinner(state) {

  console.log(state);
  console.log(`Checking Winner`);

  const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i < win.length; i++){
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[a] != null)
      return state[a];
  }
  return null;
}

const Board = () => {
  const [player, setPlayer] = React.useState(0);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner} wins!`;

  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextPlayer = (thePlayer + 1) % 2;
    setPlayer(nextPlayer);
    return nextPlayer;
  }
  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());
  function renderSquares(i) {
    return <Square id={i} player={player} newState={newState}></Square>
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquares(0)}
        {mounted && renderSquares(1)}
        {mounted && renderSquares(2)}
      </div>  
      <div className="grid-row">
        {mounted && renderSquares(3)}
        {mounted && renderSquares(4)}
        {mounted && renderSquares(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquares(6)}
        {mounted && renderSquares(7)}
        {mounted && renderSquares(8)}
      </div>
      <div id="info">
        <div className="hud">
          <button className="options" onClick={toggle}>Show/Hide Row</button>
          <button className="options" onClick={reRender}>Re-Render</button>
          <h1 className="status">{status}</h1>
        </div>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
