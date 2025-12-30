import useDebounce from '@/hooks/use-debounce';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';
import type { Dispatch } from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useOrdersQuery } from '../queries';
import type { GetOrdersResponse, Order, OrderParams } from '../types';

type ContextType = {
  queryResult: UseQueryResult<AxiosResponse<GetOrdersResponse>>;
  dispatch: Dispatch<Actions>;
  params: OrderParams;
};

type Actions =
  | { type: 'SET_CUSTOMER_NAME'; payload?: string }
  | {
      type: 'SET_COLOR' | 'SET_SIZE';
      payload: Array<string>;
    }
  | {
      type: 'SET_EMAIL';
      payload?: string;
    }
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_ORDER_STATUS'; payload?: Array<Order['order_status']> }
  | { type: 'RESET_FILTERS' };

function reducer(state: OrderParams, action: Actions): OrderParams {
  switch (action.type) {
    case 'SET_CUSTOMER_NAME':
      return { ...state, customer_name: action.payload, offset: '0' };
    case 'SET_EMAIL':
      return { ...state, email: action.payload, offset: '0' };
    case 'SET_PAGE':
      return { ...state, offset: action.payload };
    case 'SET_ORDER_STATUS':
      return { ...state, order_status: action.payload, offset: '0' };
    case 'SET_COLOR':
      return { ...state, color: action.payload, offset: '0' };
    case 'SET_SIZE':
      return { ...state, size: action.payload, offset: '0' };
    case 'RESET_FILTERS':
      return { customer_name: '', order_status: [], offset: '0' };
    default:
      return state;
  }
}

const OrdersContext = createContext<ContextType | undefined>(undefined);

const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useQueryStates(
    {
      customer_name: parseAsString.withDefault(''),
      order_status: parseAsArrayOf(
        parseAsStringLiteral([
          'pending',
          'delivered',
          'cancelled',
          'refunded',
        ] as Array<Order['order_status']>)
      ).withDefault([]),
      offset: parseAsString.withDefault('0'),
      email: parseAsString.withDefault(''),
      size: parseAsArrayOf(parseAsString).withDefault([]),
      color: parseAsArrayOf(parseAsString).withDefault([]),
    },
    { history: 'replace' }
  );
  const debouncedParams = useDebounce(params);
  const queryResult = useOrdersQuery(debouncedParams);
  const [state, dispatch] = useReducer(reducer, params);

  useEffect(() => {
    setParams(state);
  }, [state, setParams]);

  return (
    <OrdersContext.Provider
      value={{
        queryResult,
        dispatch,
        params: state,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

const withOrdersProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    return (
      <OrdersProvider>
        <Component {...props} />
      </OrdersProvider>
    );
  };

  WrappedComponent.displayName = 'withOrdersProvider';

  return WrappedComponent;
};
export { OrdersProvider, useOrders, withOrdersProvider };
