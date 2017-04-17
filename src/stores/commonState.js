/**
 * @file commonState
 * Created by haner on 2017/4/1.
 * @brief 项目中公用的 state
 */

export default {

  //用户付费类型
  userPayType: {
    0: {
      val: '预付费'
    },
    1: {
      val: '后付费'
    },
  },

  //账户状态
  accountState: {
    0: {
      val: '正常'
    },
    1: {
      val: '冻结'
    }
  },

  //当前分页信息
  pager: {
    pageSize: 15,
    currentPage: 1
  },

  //1 管理员；2 商场；3 商户；4 店员
  roles: {
    1: {
      displayName: '管理员'
    },
    2: {
      displayName: '商场'
    },
    3: {
      displayName: '商户'
    },
    4: {
      displayName: '店员'
    }
  },

  //优惠券类型，单位以及换算，样式定义
  couponType: {
    0: {
      className: 'label-primary',
      val: '时长',
      unit: '时',
      calc: (num, type) => {
        if (type === 'hh:mm') {
          return Math.floor((num / 60)) + '小时' + Math.floor((num % 60)) + '分钟';
        }
        return num / 60;
      }
    },
    1: {
      className: 'label-info',
      val: '金额',
      unit: '元',
      calc: (num) => parseInt(num / 100,10)
    },
    2: {
      className: 'label-success',
      val: '次数',
      unit: '次',
      calc: (num) => num
    },
    3: {
      val: '时间段',
      className: 'label-danger',
      unit: '分钟',
      calc: (num) => num
    },
    4: {
      className: 'label-danger',
      val: '折扣',
      unit: '折',
      calc: (num) => num
    }
  },

  //优惠券扩展类型
  couponExtendsType: {
    1: {val: '自定义', className: 'tag-red', classNameForDispatch:'success'},
    2: {val: '预定义', className: 'tag-yellow', classNameForDispatch:'primary'},
    // 3: {val: '通用', className: '', classNameForDispatch:'info'}
  },

  //优惠券状态
  couponStatus:{
    0:{text:'未下发',className:'label-success'},
    1:{text:'已下发',className:'label-info'},
    2:{text:'已使用',className:'label-danger'},
    3:{text:'下发失败',className:'label-default'},
  }
}
