/**
 * @file date
 * Created by haner on 2017/4/1.
 * @brief
 */

export const formatDate = (dateTime, type, defaultValue) => {
  return moment(dateTime * 1000 || defaultValue).format(type || 'YYYY-MM-DD HH:mm');
};
