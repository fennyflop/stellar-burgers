import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import ModalPopup from '../modal-popup/modal-popup';
import AppHeader from '../app-header/app-header.js';
import { HTML5Backend } from "react-dnd-html5-backend";
import HeaderPopup from '../header-popup/header-popup.js';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useWindowSize from '../../utils/useWindowSize';
import { SWITCH_IS_MOBILE_VALUE } from '../../services/actions/index';
import { CLOSE_ORDER_POPUP } from '../../services/actions/order';
import { CLOSE_INSPECTED_INGREDIENT } from '../../services/actions/inspected-element';

import { useDispatch, useSelector } from 'react-redux';
import {
  getIngredients
} from '../../services/actions/ingredients';

import styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const {isInspectedElementPopupOpen, isOrderPopupOpen} = useSelector(state => ({
      isInspectedElementPopupOpen: state.inspectedElement.inspectedIngredientPopupOpen,
      isOrderPopupOpen: state.order.orderPopupOpen,
  }));

  const {width} = useWindowSize();

  useEffect(() => {
      dispatch({type: SWITCH_IS_MOBILE_VALUE, value: width});
  }, [dispatch, width]);

  useEffect(() => {
      dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      {isOrderPopupOpen &&
        <ModalPopup actionType={CLOSE_ORDER_POPUP}>
          <OrderDetails />
        </ModalPopup>
      }

      {isInspectedElementPopupOpen && 
      <ModalPopup actionType={CLOSE_INSPECTED_INGREDIENT}>
        <IngredientDetails />
      </ModalPopup>}

      <HeaderPopup />

      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
