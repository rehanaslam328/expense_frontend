/** @format */

import { Checkbox, Col, Form, Row, Space, Upload } from 'antd'
import { Buttonx, DatePickerx, Icons, InputField, Selectx } from 'app/shared'
import { useNavigate } from 'react-router-dom'
import { routeNames } from 'static'
import { rules } from 'utils'
import { initialValues } from './Constant'
import { ExpenseDetail } from './Itemize'
import { FormProps } from './Types'

const { AiOutlineInbox } = Icons
const { EXPENSES } = routeNames
export const ExpenseForm = ({ loading, form, handleTagChange, createFormData, onSubmit }: FormProps) => {
  const navigate = useNavigate()
  const { expense_categories, payment_modes, currencies, merchants, tags } = createFormData

  const handleNavigate = () => {
    navigate(EXPENSES)
  }

  return (
    <>
      <Form
        name='expense-form'
        initialValues={initialValues}
        onFinish={onSubmit}
        autoComplete='off'
        layout='vertical'
        form={form}>
        <Row>
          <Col span={8}>
            <Form.Item style={{ width: '350px', margin: '0 auto' }}>
              <Form.Item
                name='dragger'
                valuePropName='fileList'
                // getValueFromEvent={normFile}
                noStyle>
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <AiOutlineInbox size={25} />
                  </p>
                  <p className='ant-upload-text'>Click here to Upload File</p>
                  <p className='ant-upload-hint'>Browse File/ Drag here</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <DatePickerx name='date' label='Expense Date' rules={rules(undefined, 'Enter Expense Date')} />
            <Selectx
              name='merchant_id'
              label='Merchant'
              placeholder='Select Merchant'
              className='flex_root'
              options={merchants}
            />
            {!Form.useWatch('itemize', form) && (
              <Selectx
                name='category_id'
                label='Category'
                placeholder='Select Category'
                rules={rules(undefined, 'Select Category')}
                className='flex_root'
                options={expense_categories}
              />
            )}
            <Row>
              <Col span={2}>
                <Form.Item name='itemize' valuePropName='checked'>
                  <Checkbox>Itemize</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {!Form.useWatch('itemize', form) ? (
                  <InputField
                    label='Amount'
                    name='total_amount'
                    rules={rules(undefined, 'Select Amount')}
                    addonBefore={
                      <Selectx
                        allowClear={false}
                        name='currency_id'
                        label='PKR'
                        defaultValue='PKR'
                        placeholder='Select Currency'
                        options={currencies}
                        rules={rules(undefined, 'Select Currency')}
                        size='small'
                        noStyle
                      />
                    }
                  />
                ) : (
                  <Selectx
                    name='currency_id'
                    label='Currency'
                    placeholder='Select'
                    rules={rules(undefined, 'Select Currency')}
                    className='flex_root'
                    options={currencies}
                  />
                )}
              </Col>
            </Row>
            {Form.useWatch('itemize', form) && <ExpenseDetail categories={expense_categories} form={form} />}
            <Form.Item name='claim_reimbursement' valuePropName='checked'>
              <Checkbox>Claim reimbursement</Checkbox>
            </Form.Item>
            {!Form.useWatch('claim_reimbursement', form) && (
              <Selectx
                name='paid_id'
                label='Paid Through'
                placeholder='Select'
                className='flex_root'
                options={payment_modes}
              />
            )}
            {!Form.useWatch('itemize', form) && (
              <InputField size='large' name='description' label='Description' textareaField />
            )}
            <InputField size='middle' name='reference_number' label='Reference#' />
            {tags?.map((tag: any, index: number) => {
              return (
                <>
                  <Selectx
                    label={tag.name}
                    name={`expense_tags${index}`}
                    placeholder='Select Tags'
                    options={tag.tag_details}
                    className='flex_root'
                    handleChange={() => handleTagChange(index)}
                    rules={tag.mandatory ? rules(undefined, `Select ${tag.name}`) : []}
                  />
                </>
              )
            })}
            {/* <Selectx
              name="report_id"
              label="Add To Report"
              placeholder="Select"
              className="flex_root"
              options={[{ id: 1, name: "Rehan" }]}
            /> */}
          </Col>
        </Row>
        <Space>
          <Buttonx
            btnText='Save'
            wrapperCol={{
              offset: 10,
            }}
            loading={loading}
          />
          <Buttonx
            btnText='Cancel'
            wrapperCol={{
              offset: 10,
            }}
            htmlType='button'
            type='default'
            clickHandler={handleNavigate}
          />
        </Space>
      </Form>
    </>
  )
}
