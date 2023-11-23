import { TDispatch, TRootState } from './store';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

const useDispatch: () => TDispatch = useReduxDispatch
const useSelector: TypedUseSelectorHook<TRootState> = useReduxSelector

export { useDispatch, useSelector }
