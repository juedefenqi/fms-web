import pickerDate from "@/components/dateSelect/picker-date.vue";
import modalInformation from "@/components/modal/modal.vue";
import stepList from "@/components/step/step.vue";
export default {
  install: Vue => {
    Vue.component("pickerDate", pickerDate);
    Vue.component("modalInformation", modalInformation);
    Vue.component("stepList", stepList);
  }
};
