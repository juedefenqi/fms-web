<template>
  <div id="application">
    <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard>
    <Card class="account-main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Row style="padding-top: 10px">
          <card-div
            title="申请单位 :"
            :content="getInfo.applyUnitId"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="申请人 :"
            :content="getInfo.staffId"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="日期 :"
            :content="getInfo.applyDate"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="申请单号 :"
            :content="getInfo.applyId"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
        </Row>
        <Row>
          <account-card title="基本信息" class="content-b-m">
            <div slot="content" class="account-content">
              <div class="cardItem">
                <div>
                  <card-div :width="cardDIvWidth1" display="inline-block" type="slot">
                    <div>
                      <div>
                        <span class="disIb">
                          <FormItem label="使用单位 :" >
                            <Select
                              :placeholder="getData.unitId"
                              :v-model="formValidate.unitId"
                              clearable
                              :style="{width:selectWidth}"
                              disabled
                            >
                            </Select>
                          </FormItem>
                          <FormItem label="资金中心 :" >
                            <Select
                              :placeholder="getData.moneyCenterId"
                              :v-model="formValidate.moneyCenterId"
                              clearable
                              :style="{width:selectWidth}"
                              disabled
                            >
                            </Select>
                          </FormItem>
                        </span>
                        <span class="disIb">
                          <FormItem label="管理单位 :">
                            <Select
                              :placeholder="getData.manageId"
                              :v-model="formValidate.manageId"
                              :style="{width:selectWidth}"
                              disabled
                            >
                            </Select>
                          </FormItem>
                          <FormItem label="使用项目 :">
                            <Select
                              :placeholder="getData.projectId"
                              :v-model="formValidate.projectId"
                              clearable
                              :style="{width:selectWidth}"
                              disabled
                            >
                            </Select>
                            <span class="el-account-span">查看</span>
                          </FormItem>
                        </span>
                        <span class="disIb" style="float:right">
                          <FormItem label="开户单位 :" >
                            <Select
                              :placeholder="getData.openAccId"
                              :v-model="formValidate.openAccId"
                              clearable
                              :style="{width:selectWidth}"
                              disabled
                            >
                            </Select>
                          </FormItem>
                        </span>
                      </div>
                      <div>
                        <FormItem label="事项说明 :" prop="maComment">
                          <Input
                            v-model="formValidate.maComment"
                            type="textarea"
                            placeholder="请输入..."
                          />
                        </FormItem>
                      </div>
                    </div>
                  </card-div>
                </div>
              </div>
            </div>
          </account-card>
        </Row>
        <Row>
          <div class="content">
            <account-card title="账户信息" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div>
                    <card-div
                      title
                      :content="getData.unitName"
                      :width="cardDIvWidth1"
                      display="inline-block"
                      type="slot"
                      class
                    >
                      <div>
                        <div class="listDisplay">
                          <span class="disIb flexVal">
                            <FormItem label="账号 :" >
                              <Input
                                v-model="formValidate.accId"
                                placeholder="getData.accId"
                                type="text"
                                disabled
                              ></Input>
                            </FormItem>
                            <!-- 账户性质 -->
                            <FormItem :label="radioButton1.title +' :'" prop="accPro">
                              <RadioGroup v-model="formValidate.accPro">
                                <Radio
                                  :label="item.value"
                                  v-for="(item,i) in getDicData.acc_pro"
                                  :key="item.id"
                                  border
                                >{{item.title}}</Radio>
                              </RadioGroup>
                            </FormItem>
                            <!-- 开户银行 -->
                            <FormItem label="开户银行 :">
                              <Select
                                :placeholder="getData.bankid"
                                :v-model="formValidate.bankid"
                                clearable
                                :style="{width:selectWidth}"
                                disabled
                              >
                              </Select>
                            </FormItem>
                            <!-- 收支属性 -->
                            <FormItem :label="radioButton3.title +' :'" prop="balanceAttribute">
                              <RadioGroup v-model="formValidate.balanceAttribute">
                                <Radio
                                  :label="item.value"
                                  v-for="(item,i) in getDicData.balance_att"
                                  :key="item.id"
                                  border
                                >{{item.title}}</Radio>
                              </RadioGroup>
                            </FormItem>                            
                          </span>
                          <span class="disIb flexVal">
                            <!-- 户名 -->
                            <FormItem label="户名 :" prop="accName">
                              <Input
                                v-model="formValidate.accName"
                                placeholder="请输入..."
                                type="text"
                              ></Input>
                            </FormItem>
                            <!-- 开户日期 -->
                            <FormItem label="开户日期 :" >
                              <Select
                                :placeholder="getData.accOpenDate"
                                :v-model="formValidate.accOpenDate"
                                clearable
                                :style="{width:selectWidth}"
                                disabled
                              >
                              </Select>
                            </FormItem>
                            <!-- 币别 -->
                            <FormItem label="币别 :" >
                              <Select
                                :placeholder="getData.currency"
                                v-model="formValidate.currency"
                                clearable
                                :style="{width:selectWidth}"
                                disabled
                              >
                              </Select>
                            </FormItem>
                            <!-- 账户管理属性 -->
                            <FormItem :label="radioButton4.title +' :'" prop="acManageAttribute">
                              <RadioGroup v-model="formValidate.acManageAttribute">
                                <Radio
                                  :label="item.value"
                                  v-for="(item,i) in getDicData.acc_manage_att"
                                  border
                                  :key="item.id"
                                >{{item.title}}</Radio>
                              </RadioGroup>
                            </FormItem>
                          </span>
                          <span class="disIb flexVal">
                            <!-- 简称 -->
                            <FormItem label="简称 :" prop="accAbb">
                              <Input
                                v-model="formValidate.accAbb"
                                placeholder="请输入..."
                                type="text"
                              ></Input>
                            </FormItem>
                            <!-- 到期日 -->
                            <FormItem label="到期日 :" >
                              <Select
                                :placeholder="getData.accDueDate"
                                :v-model="formValidate.accDueDate"
                                clearable
                                :style="{width:selectWidth}"
                                disabled
                              >
                              </Select>
                            </FormItem>
                             <!-- 账户用途 -->
                             <FormItem label="账户用途 :" prop="accUse">
                              <RadioGroup v-model="formValidate.accUse">
                                <Radio
                                  :label="item.value"
                                  v-for="(item,i) in getDicData.acc_use"
                                  border
                                  :key="item.id"
                                >{{item.title}}</Radio>
                              </RadioGroup>
                            </FormItem>
                          </span>
                        </div>
                      </div>
                    </card-div>
                  </div>
                </div>
              </div>
            </account-card>
            <div id="infoDetail">
              <account-card title="管理信息" class="content-b-m">
                <div slot="content" class="account-content">
                  <div class="cardItem">
                    <div class="infoDetail">
                      <FormItem class="detailItem" :v-model="formValidate.isBankUnit">
                        <div class="detailTitle" :style="{width:detailTitle +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isBankUnit')"
                          >{{manageInfoRadioTitle[0]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem class="detailItem" v-if="!formValidate.isBankUnit" prop="noLinkRe">
                        <Input
                          v-model="formValidate.noLinkRe"
                          placeholder="(不直连原因)必填"
                          class="inputSty"
                        />
                      </FormItem>
                    </div>
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isUnderAcc')"
                          >{{manageInfoRadioTitle[4]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="!formValidate.isUnderAcc"
                        prop="collectionRea"
                      >
                        <Input
                          v-model="formValidate.collectionRea"
                          placeholder="(不归集原因)必填"
                          class="inputSty"
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div class="cardItem">
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isSuperviseAcc')"
                          >{{manageInfoRadioTitle[1]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="formValidate.isSuperviseAcc"
                        prop="superviseRe"
                      >
                        <Input
                          v-model="formValidate.superviseRe"
                          placeholder="(重大监管原因)必填"
                          class="inputSty"
                        />
                      </FormItem>
                    </div>
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle1+'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isControlAcc')"
                          >{{manageInfoRadioTitle[5]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="formValidate.isControlAcc"
                        prop="accNotAllow"
                      >
                        <Select
                          :v-model="formValidate.accNotAllow"
                          clearable
                          :style="{width:selectWidth}"
                          @on-change="selectChange(...arguments,'accNotAllow')"
                          placeholder="(请选择抵押或限制使用项)必填"
                        >
                          <Option
                            v-for="item in getDicData.acc_limit_use"
                            :value="item.value"
                            :key="item.value"
                          >{{item.title}}</Option>
                        </Select>
                        <!-- <Input
                          v-model="formValidate.accNotAllow"
                          placeholder="(被抵押或限制原因)必填"
                          class="inputSty"
                        />-->
                      </FormItem>
                    </div>                    
                  </div>
                  <div class="cardItem">
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle1 +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isAllowOver')"
                          >{{manageInfoRadioTitle[2]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="formValidate.isAllowOver"
                        prop="overAmount"
                      >
                        <Input
                          v-model="formValidate.overAmount"
                          type="number"
                          placeholder="(透支限额)必填"
                          class="inputSty"
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </account-card>
            </div>
            <account-card title="银行留存相关人员" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <span class="disIb">
                    <FormItem label="账户经办人 :" prop="accOperator">
                      <Input
                        v-model="formValidate.accOperator"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                     <FormItem label="大额联系人 :" prop="accLargePeoson">
                      <Input
                        v-model="formValidate.accLargePeoson"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                     <FormItem label="银行客户经理 :" prop="bankManage">
                      <Input
                        v-model="formValidate.bankManage"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                  </span>
                  <span class="disIb">
                    <FormItem label="联系方式 :" prop="operatorTel">
                      <Input
                        v-model="formValidate.operatorTel"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                     <FormItem label="联系方式 :" prop="largerPersonTel">
                      <Input
                        v-model="formValidate.largerPersonTel"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                     <FormItem label="联系方式 :" prop="managerTel">
                      <Input
                        v-model="formValidate.managerTel"
                        placeholder="请输入..."
                        type="text"
                      ></Input>
                    </FormItem>
                  </span>
                </div>
              </div>
            </account-card>
            <account-card title="其它信息" class="content-b-m">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div>
                    <FormItem label="备注 :" prop="comment">
                      <Input
                        v-model="formValidate.comment"
                        type="textarea"
                        placeholder="请输入..."
                      />
                    </FormItem>
                  </div>
                </div>
              </div>
            </account-card>
          </div>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import selectInput from "@/views/my-components/account/select-input.vue";
import radioOption from "@/views/my-components/account/radio-option.vue";
import accountHeard from "@/components/header/account-heard";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import {
  requestSuccess,
  returnNumber,
  returnBoolean,
  objectAttr,
  objectIsAttr,
  isStore
} from "@/libs/tool.js";
import { isEmpty } from "@/libs/validate.js";
import { changeApplication,updateApplicationChange} from "@/api/account/change.js";
import { dictData ,generateNum} from "@/api/index.js";
import { accountApplication } from "@/views/account/data/form.js";
import { accountHeader } from "@/libs/array.js";
export default {
  components: {
    selectInput,
    radioOption,
    accountHeard,
    cardDiv,
    accountCard
  },
  data() {
    return {
      getData: "",
      getInfo: "",
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      selectWidth: "350px",
      detailTitle: "123",
      detailTitle1: "160",
      accountHeardData: accountHeader.slice(0, 2),
      baseInfoUnitTitlt: [
        "使用单位",
        "管理单位",
        "开户单位",
        "资金中心",
        "使用项目"
      ],
      accountInfoUnitTitle: ["开户银行"],
      manageInfoUnitTitle: ["银企直连"],
      radioButton1: {
        title: "账户性质",
        radioBtnVal: ["基本户", "一般户", "专用户", "临时户"]
      },
      radioButton2: {
        title: "账户用途",
        radioBtnVal: ["结算存款", "定期存款", "保证金专户", "监管户"]
      },
      radioButton3: {
        title: "收支属性",
        radioBtnVal: ["收支户", "收入户", "专用户"]
      },
      radioButton4: {
        title: "账户管理属性",
        radioBtnVal: ["法人单位本级", "代局指", "分公司本级", "分公司代管"]
      },
      modal1: false,
      manageInfoRadioTitle: [
        "银企直连",
        "重大监管户",
        "允许透支",
        "开通网银",
        "被归集户",
        "被抵押或限制使用",
        "开通密码器",
        "虚拟户"
      ],
      modal: true,
      getDicData: {},
      formValidate: accountApplication.formValidate,
      ruleValidate: accountApplication.ruleValidate
    };
  },
  created() {},
  watch: {
    getDicData(val, oldval) {
      console.log(oldval);
    }
  },
  computed: {
    newValue() {
      return "";
    }
  },
  methods: {
    returnBoolean(val) {
      return returnBoolean(val);
    },
    returnNumber(item) {
      let [val, data] = arguments;
      this.formValidate[data] = returnNumber(val);
    },
    init() {
      this.getList();
      this.getApplicationInfo();
      this.dicData("accUseUnit"); // 使用单位
      this.dicData("accMoneyCenter"); //资金中心
      this.dicData("accManageUnit"); //管理单位
      this.dicData("accOpenUnit"); //开户单位
      this.dicData("acc_pro"); // 账户性质
      this.dicData("acc_use"); //账户用途
      this.dicData("balance_att"); //账户收支属性
      this.dicData("acc_manage_att"); //账户管理属性
      this.dicData("currency"); //币别
      this.dicData("acc_limit_use"); //受到限制
    },
    async getApplicationInfo() {
      this.getInfo = requestSuccess(this, await generateNum({operationFlag:'CHANGE'}), false);
      objectAttr(this.formValidate, this.getInfo); //添加对象a得到b的属性
    },
    async getList() {
      let id = this.isStore();
      this.getData = requestSuccess(this, await changeApplication(id), false);
      objectAttr(this.formValidate, this.getData); //添加对象a得到b的属性
    },
    isStore: isStore,
    async dicData(item) {
      this.getDicData[item] = requestSuccess(this, await dictData(item), false);
      this.dataAction(this.getDicData);
    },
    async insertOrUpdate(item) {
      let data = {};
      item.overAmount = item.overAmount == null ? 0 : item.overAmount ;//透支限额
      item.isBankUnit = item.isBankUnit == null ? 0 : item.isBankUnit;//银企直连
      item.isSuperviseAcc = item.isSuperviseAcc == null ? 0 : item.isSuperviseAcc;//重大监管户
      item.isControlAcc = item.isControlAcc == null ? 0 : item.isControlAcc;
      item.isAllowOver = item.isAllowOver == null ? 0 : item.isAllowOver;
      item.isUnderAcc = item.isUnderAcc == null ? 0 : item.isUnderAcc;
      if (item.id) {
        //存在id 就走修改
        requestSuccess(this, await updateApplicationChange(item), true);
      } else {
        data = item;
        delete data.id; //删除id 添加新的保存
        this.formValidate = requestSuccess(this, await insert(item), false);
      }
    },
    dataAction(item) {
      if (item) {
        if (this.getDicData["acc_pro"]) {
          //账户性质默认值
          this.formValidate.accPro = this.getDicData["acc_pro"][0].value;
        }
        if (this.getDicData["acc_manage_att"]) {
          //账户收支属性默认值
          this.formValidate.acManageAttribute = this.getDicData[
            "acc_manage_att"
          ][0].value;
        }
        if (this.getDicData["acc_use"]) {
          //账户用途默认值
          this.formValidate.accUse = this.getDicData["acc_use"][0].value;
        }
        if (this.getDicData["balance_att"]) {
          //账户收支属性默认值
          this.formValidate.balanceAttribute = this.getDicData[
            "balance_att"
          ][0].value;
        }
      }
    },
    contentClick() {
      window.location.href = "https://www.iviewui.com/docs/introduce";
    },
    baseInfoDetail() {
      this.modal1 = true;
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    handleSubmit(name) {
      //表单校验
      this.$refs[name].validate(valid => {
        if (valid) {
          this.insertOrUpdate(this[name]);
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleReset(name) {
      //表单校验重置
      this.$refs[name].resetFields();
    },
    handleClick(item) {
      let [index] = arguments;
      if (index == 0) {
        //保存功能
        this.handleSubmit("formValidate");
      }
      if (index == 1) {
        //提交功能
        //this.handleSubmit("formValidate");
      }
    },
    selectChange(value) {
      //选择函数
      let [val, item] = arguments;
      this.formValidate[item] = val;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#application {
  @import "./index.less";
}
#infoDetail {
  .infoDetail {
    padding: 10px 0px 10px 0px;
    display: inline-block;
  }
  .radio {
    margin-right: 20px;
    border-radius: 4px !important;
  }
  .detailTitle {
    text-align: left;
    display: inline-block;
    margin-right: 8px;
    color: #999999;
  }
  .detailItem {
    display: inline-block;
  }
  &/deep/ .ivu-form-item-content {
    margin-left: 0 !important;
  }
  .inputSty {
    width: 355px !important;
  }
}
.ivu-radio-border{
    padding: 0 !important;
  }
.listDisplay{
  display: flex;
}
.flexVal{
  flex: 1;
}
</style>
