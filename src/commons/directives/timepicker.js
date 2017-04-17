/**
 * @file timepicker
 * Created by haner on 2017/4/10.
 * @brief
 */


export const timepicker = {
  twoWay: true,
  bind: function (el, binding, {context}) {
    // el.value = binding.value || '';
    $ && $.fn && $.fn.datetimepicker && ($(el).datetimepicker({
      locale: 'zh-CN',
      format: $(el).attr('format') || 'YYYY-MM-DD HH:mm',
      ignoreReadonly: true
    }).on('dp.change', function (e) {
      let value = e.date.format($(el).attr('format') || 'YYYY-MM-DD HH:mm');
      // console.log(value,context);
      // context.$emit('input', value);
    }));

  },
  update: function (el, binding, {context}) {
    console.dir(binding);
  }
};
