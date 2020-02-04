<template>
  <div id="application">
    <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard>
    <Card class="account-main">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Row style="padding-top: 10px" id="id1">
          <card-div
            title="登记单位 :"
            :content="getData.applyUnitId"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="登记人 :"
            :content="getData.staffId"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="日期 :"
            :content="getData.applyDate"
            :width="cardDIvWidth"
            display="inline-block"
          ></card-div>
          <card-div
            title="登记单号 :"
            :content="getData.applyId"
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
                          <FormItem label="使用单位 :" prop="unitId">
                            <Select
                              :v-model="formValidate.unitId"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'unitId')"
                              filterable
                            >
                              <Option
                                v-for="item in getDicData.accUseUnit"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                          <FormItem label="资金中心 :" prop="moneyCenterId">
                            <Select
                              :v-model="formValidate.moneyCenterId"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'moneyCenterId')"
                              filterable
                            >
                              <Option
                                v-for="item in getDicData.accMoneyCenter"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                        </span>
                        <span class="disIb">
                          <FormItem label="管理单位 :">
                            <Select
                              :style="{width:selectWidth}"
                              :modal="formValidate.manageId"
                              @on-change="selectChange(...arguments,'manageId')"
                              filterable
                            >
                              <Option
                                v-for="item in getDicData.accManageUnit"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                          <FormItem label="使用项目 :">
                            <Select
                              :v-model="formValidate"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'manageId')"
                              filterable
                            >
                              <!-- <Option
                              v-for="item in getDicData.accManageUnit"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                              -->
                            </Select>
                            <span class="el-account-span">查看</span>
                          </FormItem>
                        </span>
                        <span class="disIb" style="float:right">
                          <FormItem label="开户单位 :" prop="openAccId">
                            <Select
                              :v-model="formValidate.openAccId"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'openAccId')"
                              filterable
                            >
                              <Option
                                v-for="item in getDicData.accOpenUnit"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                        </span>
                      </div>
                      <div>
                        <FormItem label="事项说明 :" prop="maComment">
                          <Input
                            v-model="formValidate.maComment"
                            type="textarea"
                            placeholder="请输入冻结原因"
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
            <account-card title="账户信息" class="content-b-m" id="id2">
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
                        <div>
                          <span class="disIb">
                            <FormItem label="申请户名 :" prop="accName">
                              <Input
                                v-model="formValidate.accName"
                                placeholder="请输入..."
                                type="text"
                              ><span slot="append">.com</span></Input>
                            </FormItem>
                            <FormItem label="币别 :" prop="currency">
                              <Select
                                v-model="formValidate.currency"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'currency')"
                              >
                                <Option
                                  v-for="item in getDicData.currency"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                          </span>
                          <span class="disIb">
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
                            <FormItem :label="radioButton2.title +' :'" prop="accUse">
                              <RadioGroup v-model="formValidate.accUse">
                                <Radio
                                  :label="item.value"
                                  v-for="(item,i) in getDicData.acc_use"
                                  :key="item.id"
                                  border
                                >{{item.title}}</Radio>
                              </RadioGroup>
                            </FormItem>
                          </span>
                          <span class="disIb">
                            <FormItem label="开户银行 :" prop="bankid">
                              <Select
                                :v-model="formValidate.bankid"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'bankid')"
                              >
                                <Option
                                  v-for="item in getDicData.accOpenUnit"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
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
                        </div>
                        <div>
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
                        </div>
                      </div>
                    </card-div>
                  </div>
                </div>
              </div>
            </account-card>
            <div id="infoDetail">
              <account-card title="管理信息" class="content-b-m" id="id3">
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
                            @on-change="returnNumber(...arguments,'isOpenEbank')"
                          >{{manageInfoRadioTitle[3]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="!formValidate.isOpenEbank"
                        prop="noEbankRe"
                      >
                        <Input
                          v-model="formValidate.noEbankRe"
                          placeholder="(不开通原因)必填"
                          class="inputSty"
                        />
                      </FormItem>
                    </div>
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isOpenCipherware')"
                          >{{manageInfoRadioTitle[6]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="!formValidate.isOpenCipherware"
                        prop="noCipherwareRe"
                      >
                        <Input
                          v-model="formValidate.noCipherwareRe"
                          placeholder="(不开通原因)必填"
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
                    <div class="infoDetail">
                      <FormItem class="detailItem">
                        <div class="detailTitle" :style="{width:detailTitle +'px'}">
                          <Checkbox
                            @on-change="returnNumber(...arguments,'isVirtualAcc')"
                          >{{manageInfoRadioTitle[7]}}</Checkbox>
                        </div>
                      </FormItem>
                      <FormItem
                        class="detailItem"
                        v-if="!formValidate.isVirtualAcc"
                        prop="entityAcc"
                      >
                        <Input
                          v-model="formValidate.entityAcc"
                          placeholder="请选择关联实体账户"
                          class="inputSty"
                        />
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
                          placeholder="(允许透支原因)必填"
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
                </div>
              </account-card>
            </div>
            <account-card title="其它信息" class="content-b-m" id="id4">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div class="infoDetail infoTextarea">
                    <span class="detailTitle">备注:</span>
                    <Input
                      v-model="formValidate.comment "
                      type="textarea"
                      :autosize="{minRows: 2,maxRows: 5}"
                      placeholder="请输入..."
                    />
                    <div class="text-radio Title">
                      <Checkbox @on-change="returnNumber(...arguments,'isAskVisa')">要求法人面签</Checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </account-card>
          </div>
        </Row>
      </Form>
    </Card>
    <step-list :stepContent="stepContent"></step-list>
    <!-- <template>
      <Anchor show-ink style="position: fixed;top: 50%;">
          <AnchorLink href="#id1" title="基本信息" />
          <a href="#id1"class="ivu-steps-title anchorSty">1</a>
          <AnchorLink href="#id2" title="账户信息" />
          <a href="#id2"class="ivu-steps-title anchorSty">1</a>
          <AnchorLink href="#id3" title="管理信息" />
          <a href="#id3"class="ivu-steps-title anchorSty">1</a>
          <AnchorLink href="#id4" title="其他信息" />
          <a href="#id4"class="ivu-steps-title anchorSty">1</a>
      </Anchor>
    </template> -->
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
  objectIsAttr
} from "@/libs/tool.js";
import { isEmpty } from "@/libs/validate.js";
import { insert, update } from "@/api/account/account.js";
import { generateNum, dictData } from "@/api/index.js";
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
      ruleValidate: accountApplication.ruleValidate,
      // 右侧导航框title和id
      stepContent:[
        {title:'基本信息' ,id:"#id1"},
        {title:'账户信息' ,id:"#id2"},
        {title:'管理信息' ,id:"#id3"},
        {title:'其它信息' ,id:"#id4"},
      ]
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
    async getList() {
      this.getData = requestSuccess(this, await generateNum(), false);
      objectAttr(this.formValidate, this.getData); //添加对象a得到b的属性
    },
    async dicData(item) {
      this.getDicData[item] = requestSuccess(this, await dictData(item), false);
      this.dataAction(this.getDicData);
    },
    async insertOrUpdate(item) {
      let data = {};
      if (item.id) {
        //存在id 就走修改
        requestSuccess(this, await update(item), true);
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
.anchorSty{
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
}
</style>
