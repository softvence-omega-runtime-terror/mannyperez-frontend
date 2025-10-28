/**
 * Custom Redux Hooks
 * 
 * These typed hooks should be used throughout the application instead of 
 * the plain `useDispatch` and `useSelector` from react-redux.
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
