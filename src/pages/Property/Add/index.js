import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Card, message, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@connect(({ project, module, loading }) => ({
  project,
  module,
  submitting: loading.effects['project/loadList'],
}))
@Form.create()
class Add extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    if (params) {
      dispatch({
        type: 'module/edit',
        payload: params,
      });
    }
    dispatch({
      type: 'project/loadList',
    });
  }

  handleSubmit = e => {
    const root = this;
    const { dispatch, form } = root.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'module/save',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/module');
            } else {
              message.error(response.content);
            }
          },
        });
      }
    });
  };

  render() {
    const {
      submitting,
      project: { loadList = [] },
      module: { moduleInfo = {} },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            {getFieldDecorator('id', {
              initialValue: moduleInfo.id,
            })(<Input style={{ display: 'none' }} />)}
            <FormItem {...formItemLayout} label="項目名稱">
              {getFieldDecorator('projectId', {
                initialValue: `${moduleInfo.projectId}`,
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(
                <Select
                  showSearch
                  filterOption={(value, option) =>
                    option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  }
                >
                  {loadList.map(item => (
                    <Select.Option key={item.id}>{item.name}</Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="模块名稱"
              extra={moduleInfo.id ? '模块名稱不能修改' : null}
            >
              {getFieldDecorator('name', {
                initialValue: moduleInfo.name,
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input readOnly={moduleInfo.id ? 'readonly' : ''} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="模块描述">
              {getFieldDecorator('memo', {
                initialValue: moduleInfo.memo,
              })(<Input.TextArea autosize={{ minRows: 8, maxRows: 8 }} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.save" />
              </Button>
              <Button style={{ marginLeft: 8 }}>重置</Button>
              <Button style={{ marginLeft: 8 }}>返回</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Add;
