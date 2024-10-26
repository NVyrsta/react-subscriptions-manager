import {
  fetchData,
  fetchSubscriptions,
} from '@/features/subscriptionsSlice.js';

const useFetchSubscriptions = (dispatch, type) => {
  const handleFetch = () => {
    dispatch(fetchData(type)).then(() => {
      dispatch(fetchSubscriptions(type));
    });
  };

  return { handleFetch };
};

export default useFetchSubscriptions;
