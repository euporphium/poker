import { useReducer } from 'react';
import { TexasHoldem } from 'poker-odds-calc';
import Card from './Card.tsx';
import './App.css';

type Card = {
  id: string;
};

const cards: Card[] = [
  { id: 'Ad' },
  { id: '2d' },
  { id: '3d' },
  { id: '4d' },
  { id: '5d' },
  { id: '6d' },
  { id: '7d' },
  { id: '8d' },
  { id: '9d' },
  { id: 'Td' },
  { id: 'Jd' },
  { id: 'Qd' },
  { id: 'Kd' },
  { id: 'Ah' },
  { id: '2h' },
  { id: '3h' },
  { id: '4h' },
  { id: '5h' },
  { id: '6h' },
  { id: '7h' },
  { id: '8h' },
  { id: '9h' },
  { id: 'Th' },
  { id: 'Jh' },
  { id: 'Qh' },
  { id: 'Kh' },
  { id: 'Ac' },
  { id: '2c' },
  { id: '3c' },
  { id: '4c' },
  { id: '5c' },
  { id: '6c' },
  { id: '7c' },
  { id: '8c' },
  { id: '9c' },
  { id: 'Tc' },
  { id: 'Jc' },
  { id: 'Qc' },
  { id: 'Kc' },
  { id: 'As' },
  { id: '2s' },
  { id: '3s' },
  { id: '4s' },
  { id: '5s' },
  { id: '6s' },
  { id: '7s' },
  { id: '8s' },
  { id: '9s' },
  { id: 'Ts' },
  { id: 'Js' },
  { id: 'Qs' },
  { id: 'Ks' },
];

type AppState = {
  availableCards: Card[];
  cardTarget: string;
  tableCards: Card[];
  players: {
    id: string;
    cards: Card[];
    odds?: string;
  }[];
};

type AssignCardAction = {
  type: 'assignCard';
  payload: Card;
};
type RemoveCardAction = {
  type: 'removeCard';
  payload: Card;
};
type SetCardTargetAction = {
  type: 'setCardTarget';
  payload: string;
};
type AddPlayer = {
  type: 'addPlayer';
};
type RemovePlayer = {
  type: 'removePlayer';
  payload: string;
};
type SetOdds = {
  type: 'setOdds';
  payload: string[];
};

type AppAction =
  | AssignCardAction
  | RemoveCardAction
  | SetCardTargetAction
  | AddPlayer
  | RemovePlayer
  | SetOdds;

const initialState: AppState = {
  availableCards: cards,
  cardTarget: 'Table',
  tableCards: [] as Card[],
  players: [
    {
      id: 'Player 1',
      cards: [] as Card[],
    },
    {
      id: 'Player 2',
      cards: [] as Card[],
    },
  ],
};

function reducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'assignCard': {
      {
        const card = state.availableCards.find(
          (card) => card.id === action.payload.id
        );

        if (!card) throw new Error('Card not available');

        // limit the number of table cards to 4
        if (state.cardTarget === 'Table' && state.tableCards.length === 4) {
          return state;
        } else {
          if (
            state.players.find((player) => player.id === state.cardTarget)
              ?.cards.length === 2
          )
            return state;
        }

        return {
          ...state,
          availableCards: state.availableCards.filter(
            (card) => card.id !== action.payload.id
          ),
          tableCards:
            state.cardTarget === 'Table'
              ? [...state.tableCards, card]
              : state.tableCards,
          players: state.players.map((player) => {
            if (player.id === state.cardTarget) {
              return {
                ...player,
                cards: [...player.cards, card],
              };
            }
            return player;
          }),
        };
      }
    }
    case 'removeCard': {
      {
        return {
          ...state,
          availableCards: [...state.availableCards, action.payload],
          tableCards:
            state.cardTarget === 'Table'
              ? state.tableCards.filter((card) => card.id !== action.payload.id)
              : state.tableCards,
          players: state.players.map((player) => {
            if (player.id === state.cardTarget) {
              return {
                ...player,
                cards: player.cards.filter(
                  (card) => card.id !== action.payload.id
                ),
              };
            }
            return player;
          }),
        };
      }
    }
    case 'setCardTarget': {
      return { ...state, cardTarget: action.payload };
    }
    case 'addPlayer': {
      return {
        ...state,
        players: [
          ...state.players,
          {
            id: `Player ${state.players.length + 1}`,
            cards: [] as Card[],
          },
        ],
      };
    }
    case 'removePlayer': {
      // there must be at least 2 players
      if (state.players.length === 2) return state;

      const player = state.players.find(
        (player) => player.id === action.payload
      );

      if (!player) throw new Error('Player not found');

      const playerCards = player.cards;

      return {
        ...state,
        availableCards: [...state.availableCards, ...playerCards],
        players: state.players.filter((player) => player.id !== action.payload),
      };
    }
    case 'setOdds': {
      return {
        ...state,
        players: state.players.map((player, i) => ({
          ...player,
          odds: action.payload[i],
        })),
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function calculate() {
    const table = new TexasHoldem();
    state.players.forEach((player) =>
      table.addPlayer(player.cards.map((c) => c.id) as [string, string])
    );
    table.setBoard(
      state.tableCards.map((c) => c.id) as [string, string, string, string]
    );

    const result = table.calculate();

    const playerOdds = result
      .getPlayers()
      .map((player) => player.getWinsPercentageString());

    dispatch({ type: 'setOdds', payload: playerOdds });
  }

  return (
    <div>
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            disabled={state.availableCards.indexOf(card) === -1}
            onClick={() => dispatch({ type: 'assignCard', payload: card })}
          />
        ))}
      </div>
      <div className="card-container">
        <h2 className={state.cardTarget === 'Table' ? 'selected' : ''}>
          <span
            onClick={() =>
              dispatch({ type: 'setCardTarget', payload: 'Table' })
            }
          >
            Table
          </span>
        </h2>
        {state.tableCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => {
              // Only allow removing cards from the selected player
              if (state.cardTarget !== 'Table') return;

              dispatch({ type: 'removeCard', payload: card });
            }}
          />
        ))}
      </div>
      {state.players.map((player, i) => (
        <div key={player.id} className="card-container">
          <h2 className={state.cardTarget === player.id ? 'selected' : ''}>
            <span
              onClick={() =>
                dispatch({ type: 'setCardTarget', payload: player.id })
              }
            >
              {player.id}
            </span>
            {player.odds && <span>{player.odds}</span>}
            {i === state.players.length - 1 && (
              <span
                onClick={() =>
                  dispatch({ type: 'removePlayer', payload: player.id })
                }
              >
                X
              </span>
            )}
          </h2>
          {player.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => {
                // Only allow removing cards from the selected player
                if (state.cardTarget !== player.id) return;

                dispatch({ type: 'removeCard', payload: card });
              }}
            />
          ))}
        </div>
      ))}
      <button onClick={() => dispatch({ type: 'addPlayer' })}>
        Add Player
      </button>
      <button onClick={calculate}>Calculate Odds</button>
    </div>
  );
}

export default App;
