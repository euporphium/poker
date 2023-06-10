import React, { useReducer } from 'react';
import { Card, cards } from './cards.ts';
import { TexasHoldem } from 'poker-odds-calc';

type PokerState = {
  availableCards: Card[];
  cardTarget: string | null;
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

type AddPlayer = { type: 'addPlayer' };

type RemovePlayer = { type: 'removePlayer' };

type CalculateOdds = { type: 'calculateOdds' };

type PokerAction =
  | AssignCardAction
  | RemoveCardAction
  | SetCardTargetAction
  | AddPlayer
  | RemovePlayer
  | CalculateOdds;

export const PokerContext = React.createContext<PokerState | null>(null);
export const PokerDispatchContext =
  React.createContext<React.Dispatch<PokerAction> | null>(null);

function reducer(state: PokerState, action: PokerAction) {
  switch (action.type) {
    case 'assignCard': {
      {
        const card = state.availableCards.find(
          (card) => card.id === action.payload.id
        );

        if (!card) throw new Error('Card not available');

        // limit the number of table cards to 5
        if (state.cardTarget === 'Table' && state.tableCards.length === 5) {
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
      return {
        ...state,
        cardTarget: state.cardTarget === action.payload ? '' : action.payload,
      };
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
      const playerToRemove = state.players.at(-1);

      if (!playerToRemove) return state;

      return {
        ...state,
        availableCards: [...state.availableCards, ...playerToRemove.cards],
        players: state.players.filter(
          (player) => player.id !== playerToRemove.id
        ),
      };
    }
    case 'calculateOdds': {
      try {
        const table = new TexasHoldem();
        state.players.forEach((player) =>
          table.addPlayer(player.cards.map((c) => c.id) as [string, string])
        );
        table.setBoard(
          state.tableCards.map((c) => c.id) as [
            string,
            string,
            string,
            string,
            string
          ]
        );

        const result = table.calculate();

        const playerOdds = result
          .getPlayers()
          .map((player) => player.getWinsPercentageString());

        return {
          ...state,
          players: state.players.map((player, i) => ({
            ...player,
            odds: playerOdds[i],
          })),
        };
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.error(e.message);
        return state;
      }
    }
    default:
      return state;
  }
}

const initialState: PokerState = {
  availableCards: cards,
  cardTarget: 'Player 1',
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

const PokerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokerContext.Provider value={state}>
      <PokerDispatchContext.Provider value={dispatch}>
        {children}
      </PokerDispatchContext.Provider>
    </PokerContext.Provider>
  );
};

export default PokerProvider;
