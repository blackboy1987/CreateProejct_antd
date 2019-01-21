import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, message, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from '../../List/TableList.less';

@connect(({ property, module, loading }) => ({
  property,
  module,
  loading: loading.models.property,
}))
@Form.create()
class List extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    dispatch({
      type: 'property/list1',
      payload: params,
    });
    dispatch({
      type: 'module/edit',
      payload: {
        id: params.moduleId,
      },
    });
  }

  onChange = (data, type) => {
    const root = this;
    const {
      dispatch,
      match: { params = {} },
    } = root.props;
    dispatch({
      type: `property/${type}`,
      payload: {
        ...data,
        ...params,
      },
      callback: response => {
        if (response.type === 'success') {
          message.success(response.content);
        } else {
          message.error(response.content);
        }
        root.componentDidMount();
      },
    });
  };

  download = () => {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    dispatch({
      type: 'module/download',
      payload: params,
    });
  };

  render() {
    const {
      property: { list = [] },
      module: { moduleInfo = {} },
    } = this.props;

    return (
      <PageHeaderWrapper title={`${moduleInfo.name}`}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="download" type="primary" onClick={this.download}>
                下载
              </Button>
            </div>
            <TableForm
              value={list.map((item, index) => {
                const item1 = item;
                item1.key = index + 1;
                return item1;
              })}
              onChange={(data, type) => this.onChange(data, type)}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default List;
