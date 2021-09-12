import api from '../../utils/api';
import { RESET_BURGER } from './constructor';
export const OPEN_ORDER_POPUP = 'OPEN_ORDER_POPUP';
export const CLOSE_ORDER_POPUP = 'CLOSE_ORDER_POPUP';
export const ORDER_REQUEST_PENDING = 'ORDER_REQUEST_PENDING';
export const ORDER_REQUEST_FAIL = 'ORDER_REQUEST_FAIL';

export function handleOrder(ingredients, bun) {
    return function(dispatch) {
        dispatch({type: ORDER_REQUEST_PENDING});
        const data = ingredients.concat([bun, bun]).map((e) => e._id);
        api.handleOrder(data)
        .then((res) => {
            if (res && res.success) {
                const {name, order: {number}} = res;
                dispatch({
                    type: OPEN_ORDER_POPUP,
                    order: {name, number},
                })
                return dispatch({type: RESET_BURGER});
            }
            throw new Error("Произошла ошибка при создании заказа.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: ORDER_REQUEST_FAIL});
        })
    };
  }