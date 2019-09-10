
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (identifier: number) => ({
  type: TOGGLE_FAVORITE,
  payload: identifier,
});
