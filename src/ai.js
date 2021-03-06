
import { reducer } from './reducer'
import { shuffleArray, cellsToMatrix } from './helpers'
import { createStore } from "redux/es/redux.js";

const RED_TEAM = 'RED_TEAM'
const BLUE_TEAM = 'BLUE_TEAM'

// Returns a suggested move given state of the game.
function ai(state) {
  // Find a win for me.
  let winningMoves = findWinningMoves(state)
  if (winningMoves.length > 0) {
    return shuffleArray(winningMoves)[0]
  } else {
    let potentialMoves = state.validDrops
    // Find moves that do not result in the opponent having a winning move.
    let safeMoves = []
    for(let potentialMove of potentialMoves) {
      let futureStore = createStore(reducer, state)
      futureStore.dispatch({type: 'DROP', columnNumber: potentialMove})
      if (findWinningMoves(futureStore.getState()).length === 0) {
        safeMoves.push(potentialMove)
      }
    }
    // If no save moves, force our hand by taking the first potential move.
    if (safeMoves.length > 0) {
      // Return one of the safe moves.
      return shuffleArray(safeMoves)[0]
    } else {
      return shuffleArray(potentialMoves)[0]
    }
  }
}

// Returns array of winning moves given state.
function findWinningMoves(state) {
  let matrix = cellsToMatrix(state.cells)
  const winningMoves = []
  for (let i = 0; matrix[0].length > i; i++) {
    let store = createStore(reducer, state)
    store.dispatch({type: 'DROP', columnNumber: i})
    if (store.getState().winner) winningMoves.push(i)
  }
  return winningMoves
}

export { ai }
