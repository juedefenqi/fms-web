<template>
  <DatePicker
    v-model="date"
    :type="type"
    :format="format"
    :options="options"
    :placeholder="placeholder"
    @on-change="dateChange"
  ></DatePicker>
</template>
<script>
export default {
  name: "pickerDate",
  components: {},
  props: {
    type: {
      type: String,
      default: "date"
    },
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      date: ""
    };
  },
  watch: {
    value(val) {
      this.date = val;
    },
    date(val) {
      let date = this.dateDay(val);
      this.$emit("input", date);
    }
  },
  computed: {},
  methods: {
    dateDay(data) {
      //显示到日
      let date = new Date(data);
      let val = "";
      if (date != "Invalid Date") {
        var o = {
          y: date.getFullYear(), //year
          M:
            date.getMonth() + 1 > 9
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1).toString(), //month
          d:
            date.getDate() > 9
              ? date.getDate()
              : "0" + date.getDate().toString(), //day
          h: date.getHours(), //hour
          m: date.getMinutes(), //minute
          s: date.getSeconds(), //second
          q: Math.floor((date.getMonth() + 3) / 3), //quarter
          S: date.getMilliseconds() //millisecond
        };
        val = o.y + "-" + o.M + "-" + o.d;
        return val;
      }
      return "";
    },
    dateChange(item) {
      this.$emit("change", item);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>