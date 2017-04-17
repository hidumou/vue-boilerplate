/**
 * @file string
 * Created by haner on 2017/4/4.
 * @brief
 */


/**
 * 面额单位转换
 */
export const faceUnitConvert = (face_val, count, type, ex_type) => {

  const couponType = {
    0: {
      val: '时长',
      unit: '时',
      calc: (num, type) => {
        //仅计算30分钟以上
        if (num < 30) return 0;

        if (type === 'hh:mm') return Math.floor((num / 60)) + '小时' + Math.floor((num % 60)) < 15 ? 0 : Math.floor((num % 60)) < 15 + '分钟';

        return num / 60;
      }
    },
    1: {
      val: '金额',
      unit: '元',
      calc: (num) => parseInt(num / 100, 10)
    },
    2: {
      val: '次数',
      unit: '次',
      calc: (num) => num
    },
    3: {
      val: '时间段',
      unit: '分钟',
      calc: (num) => num
    },
    4: {
      val: '折扣',
      unit: '折',
      calc: (num) => num
    }
  };

  let unitType = couponType[type || 0];

  if (!unitType || !unitType.calc) return face_val;

  if (ex_type === 1) {//自定义

    return unitType.calc(count) + `（${unitType.unit}）`;

  } else if (ex_type === 2) { //预定义

    if (!count) {
      return unitType.calc(face_val) + `（${unitType.unit}）`;
    }

    return unitType.calc(face_val) + `（${unitType.unit}）* ${count}张`;

  } else { //通用券

    return count || face_val;
  }
};
