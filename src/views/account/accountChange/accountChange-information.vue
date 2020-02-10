<template>
  <div id="application">
    <account-heard
      :data="accountHeardData"
      @handleClick="handleClick"
      @returnClick="$router.go(-1);"
    ></account-heard>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <Card class="application-content">
        <div class="content">
          <Row style="padding-top: 10px">
            <card-div
              title="所属资金中心 :"
              content="西南资金中心"
              display="inline-block"
            ></card-div>
            <!-- <card-div
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
            ></card-div> -->
          </Row>
          <Row>
            <account-card title="基本信息" class="content-b-m card-border">
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <div>
                    <card-div :width="cardDIvWidth1" display="inline-block" type="slot">
                      <div>
                        <div>
                          <span class="disIb">
                            <FormItem label="开户单位 :" prop="openAccId">
                              <Select
                                v-model="formValidate.openAccId"
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
                            <FormItem label="简称 :" prop="accAbb">
                              <Input v-model="formValidate.accAbb" placeholder="请输入..." type="text" @on-change="interceptString" :placeholder="getData.accAbb"><span slot="append">{{accountNumber}}</span></Input>
                            </FormItem>
                            <FormItem label="账户性质 :" prop="accPro">
                              <Select
                                v-model="formValidate.accPro"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'accPro')"
                                filterable                                
                              >
                                <Option
                                  v-for="item in getDicData.acc_pro"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="币别 :" prop="currency">
                              <Select
                                v-model="formValidate.currency"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'currency')"
                                filterable
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
                            
                            <FormItem label="户名 :" prop="accName">
                              <Input
                                v-model="formValidate.accName"
                                type="text"
                                :placeholder="formValidate.accName"
                              ></Input>
                            </FormItem>
                            <FormItem label="开户银行 :">
                              <Select
                                v-model="formValidate.bankUnionCode"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'bankid')"
                                filterable
                                :remote-method="checkAccountBankInfo"
                                placeholder="请输入开户银行进行搜索"
                                @on-clear="clearBankTip"
                              >
                                <Option
                                  v-for="item in bankSelectVal"
                                  :value="item"
                                  :key="item"
                                >{{item.bankUnionCode}}--{{item.bankBranchName}}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="开户日期 :">
                              <!-- <DatePicker
                                v-model="formValidate.accOpenDate"
                                format="yyyy-MM-dd"
                                type="date"
                                placeholder="请选择"
                              ></DatePicker> -->
                              <Row class="date-line">
                                <pickerDate
                                  v-model="formValidate.accOpenDate"
                                  type="date"
                                  class="date-w"
                                  :options="startDateOption"
                                  @change="onstartDateChange"
                                ></pickerDate>
                              </Row>
                            </FormItem>
                            <FormItem class="detailItem" id="infoDetail">
                              <div class="detailTitle" :style="{width:detailTitle +'px'}">
                                <Checkbox
                                  @on-change="returnNumber(...arguments,'isVirtualAcc')"
                                  v-model="formValidate.isVirtualAcc"
                                >虚拟户</Checkbox>
                              </div>
                            </FormItem>               
                          </span>
                          <span class="disIb" style="float:right">
                            <FormItem label="账号 :" prop="accId">
                              <Input v-model="formValidate.accId" :placeholder="formValidate.accId" type="text"></Input>
                            </FormItem>
                            <p class="bankSuffix" v-if="accountBankShow">{{accountBank.bankName}}-{{accountBank.provinceName}}-{{accountBank.cityName}}</p>
                            <!-- 账户性质为基本户、一般户时，到期日不可编辑 -->
                            <FormItem label="到期日 :" v-if="accountType1">
                              <Row class="date-line">
                                <pickerDate
                                  type="date"
                                  class="date-w"
                                  :placeholder="formValidate.accDueDate" 
                                  :options="endDateOption"
                                  @change="onendDateChange"
                                  v-model="formValidate.accDueDate"
                                  :disabled="disabled"
                                ></pickerDate>
                              </Row>
                            </FormItem>
                            <!-- 当账户性质为临时户时，到期日可编辑，必填，不可为空 -->
                            <FormItem label="到期日 :" v-if="accountType2" prop="accDueDate">
                              <Row class="date-line">
                                <pickerDate
                                  type="date"
                                  class="date-w"
                                  :placeholder="formValidate.accDueDate" 
                                  :options="endDateOption"
                                  @change="onendDateChange"
                                  v-model="formValidate.accDueDate"
                                ></pickerDate>
                              </Row>
                            </FormItem>
                            <!-- 当账户性质为专用户时，到期日可编辑，选填 -->
                            <FormItem label="到期日 :" v-if="accountType3">
                              <Row class="date-line">
                                <pickerDate
                                  type="date"
                                  class="date-w"
                                  :placeholder="formValidate.accDueDate"
                                  :options="endDateOption"
                                  @change="onendDateChange"
                                  v-model="formValidate.accDueDate"
                                ></pickerDate>
                              </Row>
                            </FormItem>
                            <FormItem label="关联实体账户 :" v-if="formValidate.isVirtualAcc"  prop="entityAcc">
                              <Select
                                v-model="formValidate.entityAcc"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'entityAcc')"
                                filterable
                              >
                                <Option
                                  v-for="item in getCollectionDate"
                                  :value="item.id"
                                  :key="item.id"
                                >{{item.accName}}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="关联实体账户 :" v-if="!formValidate.isVirtualAcc">
                              <Select
                                v-model="formValidate.entityAcc"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'entityAcc')"
                                filterable
                                disabled
                              >
                                <Option
                                  v-for="item in getCollectionDate"
                                  :value="item.id"
                                  :key="item.id"
                                >{{item.accName}}</Option>
                              </Select>
                            </FormItem>
                          </span>
                        </div>
                        <div>
                          <FormItem label="备注 :" prop="comment">
                            <Input
                              v-model="formValidate.comment"
                              type="textarea"
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
            <account-card title="管理信息" class="content-b-m card-border">
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
                      <div class="account-flex">
                        <div class="account-child">
                          <span class="disIb">
                            <FormItem label="使用单位 :" prop="unitId">
                              <Select
                                v-model="formValidate.unitId"
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
                            <FormItem label="账户用途 :" prop="accUse">
                              <Select
                                v-model="formValidate.accUse"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'accUse')"
                                filterable
                              >
                                <Option
                                  v-for="item in getDicData.acc_use"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                          </span>
                        </div>
                        <div class="account-child">
                          <span class="disIb">
                            <FormItem label="使用项目 :">
                              <Select
                                v-model="formValidate.projectId"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'projectId')"
                                filterable
                              >
                                <Option
                              v-for="item in getDicData.accManageUnit"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>                               
                              </Select>
                              <!-- <span class="el-account-span">查看</span> -->
                            </FormItem>
                            <FormItem label="收支属性 :" prop="balanceAttribute" style="display: inline-block;">
                              <Select
                                v-model="formValidate.balanceAttribute"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'balanceAttribute')"
                                filterable
                              >
                                <Option
                                  v-for="item in getDicData.balance_att"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                          </span>
                        </div>
                        <div class="account-child">
                          <span class="disIb">
                            <FormItem label="管理单位 :">
                              <Select
                                :style="{width:selectWidth}"
                                v-model="formValidate.manageId"
                                @on-change="selectChange(...arguments,'manageId')"
                                filterable
                                :placeholder="formValidate.manageId"
                              >
                                <Option
                                  v-for="item in getDicData.accManageUnit"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="账户管理属性 :" prop="acManageAttribute" style="display: inline-block;">
                              <Select
                                v-model="formValidate.acManageAttribute"
                                clearable
                                :style="{width:selectWidth}"
                                @on-change="selectChange(...arguments,'acManageAttribute')"
                                filterable
                              >
                                <Option
                                  v-for="item in getDicData.acc_manage_att"
                                  :value="item.value"
                                  :key="item.value"
                                >{{item.title}}</Option>
                              </Select>
                            </FormItem>
                          </span>
                        </div>
                      </div>
                      <div class="line-flex">
                        <span class="disIb line-span">
                          <div class="detailTitle" :style="{width:detailTitle +'px'}">
                            <Checkbox
                              @on-change="returnNumber(...arguments,'isBankUnit')"
                              v-model="formValidate.isBankUnit"
                            >银企直连</Checkbox>
                          </div>
                          <FormItem label="不直连原因 :" style="display: inline-block;" v-if="!formValidate.isBankUnit" prop="noLinkRe">
                            <Input v-model="formValidate.noLinkRe" :placeholder="formValidate.noLinkRe" type="text" class="inputSty"></Input>
                          </FormItem>
                          <FormItem label="不直连原因 :" style="display: inline-block;"  v-if="formValidate.isBankUnit">
                            <Input v-model="formValidate.noLinkRe" :placeholder="formValidate.noLinkRe" type="text" class="inputSty" disabled></Input>
                          </FormItem>
                        </span>
                        <span class="disIb line-span">
                          <div class="detailTitle" :style="{width:detailTitle +'px'}">
                            <Checkbox
                              @on-change="returnNumber(...arguments,'isAllowOver')"
                              v-model="formValidate.isAllowOver"
                            >允许透支</Checkbox>
                          </div>
                          <FormItem label="透支限额 :" prop="overAmount" style="display: inline-block;" v-if="formValidate.isAllowOver">
                            <Input v-model="formValidate.overAmount" type="text" class="inputSty">
                              <span slot="append">元</span>
                            </Input>
                          </FormItem>
                          <FormItem label="透支限额 :" style="display: inline-block;" v-if="!formValidate.isAllowOver">
                            <Input placeholder="0" type="text" class="inputSty" disabled>
                              <span slot="append">元</span>
                            </Input>
                          </FormItem>
                        </span>
                      </div>
                      <div class="line-flex">
                        <span class="disIb line-span">
                          <div class="detailTitle" :style="{width:detailTitle +'px'}">
                            <Checkbox
                              @on-change="returnNumber(...arguments,'isUnderAcc')"
                              v-model="formValidate.isUnderAcc"
                            >是否被归集</Checkbox>
                          </div>
                          <FormItem label="归集主账户 :" prop="collectionAcc" style="display: inline-block;" v-if="formValidate.isUnderAcc">
                            <Select
                              v-model="formValidate.collectionAcc"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'collectionAcc')"
                              filterable
                            >
                              <Option
                                v-for="item in getCollectionDate"
                                :value="item.id"
                                :key="item.id"
                              >{{item.accName}}</Option>
                            </Select>
                          </FormItem>
                          <FormItem label="归集主账户 :" style="display: inline-block;" v-if="!formValidate.isUnderAcc">
                            <Select
                              v-model="formValidate.collectionAcc"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'collectionAcc')"
                              filterable
                              disabled
                            >
                              <Option
                                v-for="item in getCollectionDate"
                                :value="item.id"
                                :key="item.id"
                              >{{item.accName}}</Option>
                            </Select>
                          </FormItem>
                        </span>
                        <span class="disIb line-span">
                          <div class="detailTitle" :style="{width:detailTitle +'px'}">
                            <Checkbox
                              @on-change="returnNumber(...arguments,'isSuperviseAcc')"
                              v-model="formValidate.isSuperviseAcc"
                            >重大监管户</Checkbox>
                          </div>
                          <FormItem label="重大监管原因 :" prop="superviseRe" style="display: inline-block;" v-if="formValidate.isSuperviseAcc">
                            <Input v-model="formValidate.superviseRe":placeholder="formValidate.superviseRe" type="text" class="inputSty"></Input>
                          </FormItem>
                          <FormItem label="重大监管原因 :" style="display: inline-block;" v-if="!formValidate.isSuperviseAcc">
                            <Input v-model="formValidate.superviseRe" :placeholder="formValidate.superviseRe" type="text" class="inputSty" disabled></Input>
                          </FormItem>
                        </span>
                      </div>
                      <div class="line-flex">
                        <span class="disIb line-span">
                          <div class="detailTitle" :style="{width:detailTitle +'px'}">
                            <Checkbox
                            v-model="formValidate.isControlAcc"
                            @on-change="returnNumber(...arguments,'isControlAcc')"
                            >被抵押或限制使用</Checkbox>
                          </div>
                          <FormItem label="抵押或限制使用项目 :" prop="accNotAllow" style="display: inline-block;" v-if="formValidate.isControlAcc">
                            <Select
                              v-model="formValidate.accNotAllow"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'accNotAllow')"
                              filterable
                            >
                              <Option
                                v-for="item in getDicData.acc_limit_use"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                          <FormItem label="抵押或限制使用项目 :" style="display: inline-block;" v-if="!formValidate.isControlAcc">
                            <Select
                              v-model="formValidate.accNotAllow"
                              clearable
                              :style="{width:selectWidth}"
                              @on-change="selectChange(...arguments,'accNotAllow')"
                              filterable
                              disabled
                            >
                              <Option
                                v-for="item in getDicData.acc_limit_use"
                                :value="item.value"
                                :key="item.value"
                              >{{item.title}}</Option>
                            </Select>
                          </FormItem>
                        </span>
                      </div>
                    </card-div>
                  </div>
                </div>
              </div>
            </account-card>
          </Row>
          <Row>
            <account-card title="银行留存相关人员" class="content-b-m card-border">
              <div slot="content" class="account-content">
                <span class="disIb">
                  <FormItem label="账户经办人 :" prop="accOperator">
                    <Input v-model="formValidate.accOperator":placeholder="formValidate.accOperator" type="text" class="InputWid inputMar"></Input>
                    <Input v-model="formValidate.operatorTel":placeholder="formValidate.operatorTel" type="text" class="InputWid"></Input>
                  </FormItem>
                </span>
                <span class="disIb">
                  <FormItem label="大额联系人 :" prop="accLargePeoson">
                    <Input v-model="formValidate.accLargePeoson" :placeholder="formValidate.accLargePeoson" type="text" class="InputWid inputMar"></Input>
                    <Input v-model="formValidate.largerPersonTel" :placeholder="formValidate.largerPersonTel" type="text" class="InputWid"></Input>
                  </FormItem>
                </span>
                <span class="disIb">
                  <FormItem label="银行客户经理 :" prop="bankManage">
                    <Input v-model="formValidate.bankManage" :placeholder="formValidate.bankManage" type="text" class="InputWid inputMar"></Input>
                    <Input v-model="formValidate.managerTel" :placeholder="formValidate.managerTel" type="text" class="InputWid"></Input>
                  </FormItem>
                </span>
              </div>
            </account-card>
          </Row>
          <Row>
            <account-card
              title="印鉴/签字人"
              class="content-b-m card-border"
              icon="icon-plus"
              :btnTitle="signatoryBtn"
              @iconClick="addClick(1)"
              :selectall="selectall"
              @changeClick="printchange"
              @deleteClick="deletechange"
              :isSealorsignShow="true"
              :formValidate="formValidate"
            >            
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <registration-print
                    ref="print"
                    :modalOne="modalVisible4"
                    :data="signatoryData"
                    @modalReturn="modalReturn(...arguments,1)"
                    @changelReturn="registrationChange(...arguments,1)"
                    :modalDetele="modalVisible5"
                    :formValidate="formValidate"
                  ></registration-print>
                </div>
              </div>
            </account-card>
          </Row>
          <Row>
            <account-card
              title="网银证书"
              class="content-b-m card-border"
              icon="icon-plus"
              :btnTitle="bankingTitle"
              :isBankShow="true"
              :formValidate="formValidate"
              @iconClick="addClick(3)"
              @changeClick="printchange1"
              @deleteClick="deletechange1"
            >
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <registration-banking
                    ref="banking"
                    :data="bankData"
                    @modalReturn="modalReturn(...arguments,3)"
                    @changelReturn="registrationChange(...arguments,3)"
                    :modalOne="modalVisible6"
                    :modalDetele="modalVisible7"
                    :formValidate="formValidate"
                  ></registration-banking>
                </div>
              </div>
            </account-card>
          </Row>
          <Row>
            <account-card
              title="支付密码器"
              class="content-b-m card-border"
              icon="icon-plus"
              :btnTitle="cipherTitle"
              @iconClick="addClick(2)"
              :isCipherShow="true"
              :formValidate="formValidate"
              @changeClick="printchange2"
              @deleteClick="deletechange2"
            >
              <div slot="content" class="account-content">
                <div class="cardItem">
                  <registration-cipher
                    ref="cipher"
                    :data="paymentData"
                    @modalReturn="modalReturn(...arguments,2)"
                    @changelReturn="registrationChange(...arguments,2)"
                    :modalOne="modalVisible8"
                    :modalDetele="modalVisible9"
                    :formValidate="formValidate"
                  ></registration-cipher>
                </div>
              </div>
            </account-card>
          </Row>
          <!-- <Row>
            <account-card title="其它信息" class="content-b-m card-border">
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
                  </div>
                </div>
              </div>
            </account-card>
          </Row> -->
        </div>
      </Card>
      <Spin fix size="large" v-if="loading"></Spin>
    </Form>
  </div>
</template>

<script>
import selectInput from "@/views/my-components/account/select-input.vue";
import radioOption from "@/views/my-components/account/radio-option.vue";
import commonInput from "@/views/my-components/account/common-input.vue";
import registrationPrint from "@/views/account/accountRegistration/registrationPrint/account-registration-print.vue";
import registrationCipher from "@/views/account/accountRegistration/registrationPrint/account-registration-cipher.vue";
import registrationBanking from "@/views/account/accountRegistration/registrationPrint/account-registration-banking.vue";
import accountHeard from "@/components/header/account-heard";
import {
  requestSuccess,
  isStore,
  returnNumber,
  returnBoolean,
  objectAttr,
  objectIsAttr
} from "@/libs/tool.js";
import accountCard from "@/components/card/accountCard.vue";
import cardDiv from "@/components/card/cardDiv.vue";
import {
  registerApply,
  opencApplyCheck,
  opencApplyInsert,
  applyCheckUpdate,
  accountGetCollection,
  accountRegistSave,
  accountRegistBankInfo
} from "@/api/account/account.js";
import { accountApplication } from "@/views/account/data/form.js";
import { accountHeader } from "@/libs/array.js";
import { dictData,ApplyInfo } from "@/api/index.js";
import { updateChangeRegistration } from "@/api/account/change.js";
import { isEmpty } from "@/libs/validate.js";
import { dateDay } from "@/libs/date.js";
export default {
  name: "accountRegistration",
  components: {
    selectInput,
    radioOption,
    commonInput,
    accountHeard,
    cardDiv,
    accountCard,
    registrationPrint,
    registrationCipher,
    registrationBanking
  },
  data() {
    return {
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,
      modalVisible6: false,
      modalVisible7: false,
      modalVisible8: false,
      modalVisible9: false,
      getData: "",
      cardDIvWidth: "100px",
      cardDIvWidth1: "20px",
      selectWidth: "350px",
      detailTitle: "123",
      detailTitle1: "160",
      accountHeardData: accountHeader.slice(0, 2),
      getDicData: {},
      formValidate: accountApplication.formValidate,
      ruleValidate: accountApplication.ruleValidate,
      fcBankSealorsignList: [],
      cipherwareList: [],
      bankUkeyList: [],
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
      baseInfoUnitTitlt: [
        "使用单位",
        "管理单位",
        "开户单位",
        "资金中心",
        "使用项目"
      ],
      modal: true,
      modal1: false,
      accountInfoInputTitle: ["账户号", "户名", "简称"],
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
      bankRetentionTitle: [
        "账户经办人",
        "联系方式",
        "大额联系人",
        "联系方式",
        "银行客户经理",
        "联系方式"
      ],
      radioTitle: "开通密码器",
      signatoryData: [],
      bankColumns: [
        {
          title: "编号",
          key: "num"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "角色",
          key: "role"
        },
        {
          title: "单笔限额(元)",
          key: "singleQquota"
        },
        {
          title: "单日限额(元)",
          key: "singleDayLimit"
        },
        {
          title: "生效日",
          key: "effectiveDdate"
        },
        {
          title: "到期日",
          key: "DueDate"
        },
        {
          title: "证书登记人",
          key: "Certificate "
        },
        {
          title: "保管人",
          key: "Custodian"
        },
        {
          title: "上收情况",
          key: "Collection"
        },
        {
          title: "操作",
          key: "operation"
        }
      ],
      bankData: [],
      paymentData: [],
      signatoryBtn:"添加印鉴/签字人",
      bankingTitle:"添加网银证书",
      cipherTitle:"添加密码器",
      loading:true,
      startDateOption: {},
      endDateOption: {},
      getCollectionDate:"",
      selectall:"",
      bankSelectVal:"",
      accountType1:false,
      accountType2:false,
      accountType3:false,
      accountNumber:"",
      accountBank:{
        bankName:"",
        provinceName:"",
        cityName:""
      },
      accountBankShow:false,
    };
  },
  watch: {
    modalVisible1(val) {
      this.$refs.print.modal = val;
    },
    modalVisible2(val) {
      this.$refs.cipher.modal = val;
    },
    modalVisible3(val) {
      this.$refs.banking.modal = val;
    },
    formValidate(val){
    }
  },
  methods: {
    dateFormat: dateDay,
    printchange(show){
      this.modalVisible4=show;
    },
    deletechange(show){
      this.modalVisible5=show;
    },
    printchange1(show){
      this.modalVisible6=show;
    },
    deletechange1(show){
      this.modalVisible7=show;
    },
    printchange2(show){
      this.modalVisible8=show;
    },
    deletechange2(show){
      this.modalVisible9=show;
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
      this.dicData("ukey_type "); //网银证书类型
      this.dicData("ukey_role "); //网银证书权限
      this.dicData("acc_limit_use "); //抵押或限制使用项目
    },
    async getList() {
      let id = this.isStore();
      // this.formValidate.applyTableId = id; //将id 赋给表单
      this.loading = true;
      this.getData = requestSuccess(this, await ApplyInfo({id:id}), false);
      this.getData.isBankUnit = returnBoolean(this.getData.isBankUnit)
      this.getData.isUnderAcc = returnBoolean(this.getData.isUnderAcc)
      this.getData.isControlAcc = returnBoolean(this.getData.isControlAcc)
      this.getData.isAllowOver = returnBoolean(this.getData.isAllowOver)
      this.getData.isSuperviseAcc = returnBoolean(this.getData.isSuperviseAcc)
      this.getData.isOpenEbank = returnBoolean(this.getData.isOpenEbank)
      this.getData.isOpenCipherware = returnBoolean(this.getData.isOpenCipherware)
      objectAttr(this.formValidate, this.getData);
      console.log(this.formValidate)
      this.getCollectionDate = requestSuccess(this, await accountGetCollection(), false);
    },
    async dicData(item) {
      this.getDicData[item] = requestSuccess(this, await dictData(item), false);
      this.dataAction(this.getDicData);
    },
    async insertOrUpdate(item) {
      let data = {};
      item.accPro = item.accPro.concat(this.accountNumber);
      item.bankid = item.bankid.bankUnionCode;
      item.isBankUnit = returnNumber(item.isBankUnit)
      item.isUnderAcc = returnNumber(item.isUnderAcc)
      item.isControlAcc = returnNumber(item.isControlAcc)
      item.isAllowOver = returnNumber(item.isAllowOver)
      item.isSuperviseAcc = returnNumber(item.isSuperviseAcc)
      item.isOpenEbank = returnNumber(item.isOpenEbank)
      item.isOpenCipherware = returnNumber(item.isOpenCipherware)
      if(item.isAllowOver == 0){
        item.overAmount = 0;
      }
      console.log(item)
      if (item.id) {
        //存在id 就走修改
        requestSuccess(this, await updateChangeRegistration(item), true);
      }
    },
    async register(item) {
        let data=JSON.parse(JSON.stringify(item));
           data.accOpenDate=this.dateFormat(this.formValidate.accOpenDate); //日期格式转换
           data.accDueDate=this.dateFormat(this.formValidate.accDueDate); ////日期格式转换
      //提交
      delete item.id;
      requestSuccess(this, await registerApply(data), true);
    },
    returnBoolean(val) {
      return returnBoolean(val);
    },
    returnNumber(item) {
      let [val, data] = arguments;
      this.formValidate[data] = returnNumber(val);
    },
    formAdd(name) {
      //添加字段
      this[name].fcBankSealorsignList = this.fcBankSealorsignList;
      this[name].cipherwareList = this.cipherwareList;
      this[name].bankUkeyList = this.bankUkeyList;
    },
    handleSave(name) {
      this.formAdd(name);
      //表单校验
      this.$refs[name].validate(valid => {
        if (valid) {
          this.insertOrUpdate(this[name]);
        } else {
          this.$Message.error("提交失败!");
        }
      });
    },
    handleSubmit(name) {
      this.formAdd(name);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.register(this[name]);
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
        this.handleSave("formValidate");
      }
      // if (index == 1) {
      //   //提交功能
      //   this.handleSubmit("formValidate");
      // }
    },
    selectChange(value) {
      //选择函数
      let [val, item] = arguments;
      this.formValidate[item] = val;
      if(item === "bankid"){
        this.accountBankShow = true
        this.accountBank.bankName = arguments[0].bankName;
        this.accountBank.provinceName = arguments[0].provinceName;
        this.accountBank.cityName = arguments[0].cityName;
      }
      if(item === "accPro"){
        if(val === "0201" || val === "0202"){
          this.accountType1 =  true;
          this.accountType2 =  false;
          this.accountType3 =  false;
        }else if(val === "0204"){
          this.accountType1 =  false;
          this.accountType2 =  true;
          this.accountType3 =  false;
        }else if (val === "0203"){
          this.accountType1 =  false;
          this.accountType2 =  false;
          this.accountType3 =  true;
        }
      }
    },

    dataAction(item) {
      //添加默认值
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
    isStore: isStore, //获取 携带id 并保存
    addClick(index) {
      //添加
      if (index == 1) {
        this.modalVisible1 = true;
      } else if (index == 2) {
        this.modalVisible2 = true;
      } else if (index == 3) {
        this.modalVisible3 = true;
      }
    },
    modalReturn(data) {
      let [val, index] = arguments;
      //返回状态
      if (index == 1) {
        this.modalVisible1 = val;
      } else if (index == 2) {
        this.modalVisible2 = val;
      } else if (index == 3) {
        this.modalVisible3 = val;
      }
    },
    registrationChange(data) {
      let [val, index] = arguments;
      //返回数据修改
      if (index == 1) {
        this.fcBankSealorsignList = val;
      } else if (index == 2) {
        this.cipherwareList = val;
      } else if (index == 3) {
        this.bankUkeyList = val;
      }
    },
    onstartDateChange(startDate) {
      this.endDateOption = {
        disabledDate(endDate) {
          return endDate < new Date(startDate);
        }
      };
    },
    onendDateChange(endDate) {
      this.startDateOption = {
        disabledDate(startDate) {
          return startDate > new Date(endDate);
        }
      };
    },
    async checkAccountBankInfo(query) {
      let param = {
        bankBranchName:query,
        pageNo:1,
        pageSize:2000
      }
      this.loading = true;
      // this.bankSelectVal = requestSuccess(this, await accountRegistBankInfo(param), false);
      accountRegistBankInfo(param).then(res => {
        this.loading = false;
        this.bankSelectVal = res.result;
      });
    },
    interceptString(val){
      let accId = this.formValidate.accId
      this.accountNumber = accId.substring(accId.length-6);
    },
    clearBankTip(){
      // document.getElementsByClassName("bankSuffix")[0].style.display = 'none'
      this.accountBankShow = false;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#application {
  @import "../accountApplication/index";
  .radioButton {
    margin-bottom: 10px;
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
      text-align: right;
      display: inline-block;
      margin-right: 0 !important;
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
}
.application-content {
  margin-top: 70px;
}
.account-flex {
  display: flex;
}
.account-child {
  flex: 1;
}
.card-border{
  border-top: 3px solid #2d8cf0 !important;
}
.line-flex{
  display: flex;
}
.line-span{
  line-height: 34px;
  flex:1;
}
.InputWid{
  width: auto;
}
.inputMar{
  margin-right:10px;
}
.bankSuffix{
  line-height: 34px;
  margin-bottom: 24px;
  vertical-align: top;
  zoom: 1;
  display: inline-block;
}
</style>
