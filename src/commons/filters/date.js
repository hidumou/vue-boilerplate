/**
 * @file date
 * Created by haner on 2017/4/1.
 * @brief
 */
import moment from 'moment';


export const formatDate = (dateTime, defaultValue) => {
  return moment(dateTime || defaultValue).format('YYYY-MM-DD hh:mm:ss');
};
