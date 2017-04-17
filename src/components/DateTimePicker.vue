<template>
  <div class="has-feedback" :class="{'form-group': icon}">
    <input type='text' class="form-control" :class="style || {'input-sm': true}" readonly ref="datetimepicker"/>
    <span v-if="icon" class="glyphicon glyphicon-calendar form-control-feedback"></span>
  </div>
</template>

<script>

  export default {
    props: {
      options: {},
      style: null,
      value: {
        default: ''
      },
      icon: {
        type: Boolean,
        default: true
      },
    },
    computed: {},
    data() {
      return {
        el: null
      }
    },

    mounted() {
      this.el = $(this.$el).find('input').first();

      this.el.datetimepicker(Object.assign({}, {
        locale: 'zh-CN',
        format: 'YYYY-MM-DD HH:mm',
        showClear: true,
        showTodayButton: true,
        toolbarPlacement: 'top',
        showClose: true,
        useCurrent: false,//默认打开使用当前日期
        ignoreReadonly: true
      }, this.options));

      this.el.on('dp.change', (val) => {
        if (!val) {
          val = null;
        }
//        this.$emit('input', val.date);
        this.$emit('input', val.date.unix());
      });
      this.updateInput(this.value);
    },
    methods: {
      formatDate(val) {
        let date;
        if (val === "") {
          date = null;
        } else {
          date = moment(val);
          if (!date.isValid()) {
            date = null;
          }
        }
        return date;
      },
      updateInput(val) {
        let date = this.formatDate(val);
        try {
          this.el.data("DateTimePicker").date(date);
        } catch (e) {
          this.el.data("DateTimePicker").date(null);
        }
      }
    },
    watch: {
//      value: function (val) {
//        this.updateInput(val);
//      }
    }
  }
</script>
