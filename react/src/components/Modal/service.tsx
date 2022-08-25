import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalProps, Spin, Button, ConfigProvider } from 'antd';
import { LoadingOutlined, InfoCircleFilled } from '@ant-design/icons';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';
import { customHistory } from '@/routes/RootRouter';
import classNames from 'classnames';

export interface ServiceModalProps extends ModalProps {
  children: React.ReactElement;
  onDestroy?: () => void;
  onOk?: (data?: any) => void;
  onRef?: (ref: any) => Promise<any>;
}

export interface ContextMenuItem {
  label: string | number;
  operation?: string;
  disabled?: boolean;
  children?: ContextMenuItem[];
}

export const CustomModal = (props: ServiceModalProps) => {
  const { children, onOk, onRef, onCancel, onDestroy, okText, cancelText, footer = true, closable = true, maskClosable = true, ...rest } = props;
  const ref = useRef<{ form: any }>();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    if (loading) {
      return;
    }
    try {
      if (['[object AsyncFunction]', '[object Promise]'].includes(Object.prototype.toString.call(onOk))) {
        setLoading(true);
      }
      if (onRef) {
        const data = await onRef(ref);
        await onOk?.(data);
      } else {
        await onOk?.();
      }
      onDestroy?.();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onClose = (e: any) => {
    if (closable || maskClosable) {
      onDestroy?.();
    }
  };

  return (
    <Modal
      confirmLoading={loading}
      destroyOnClose
      width={718}
      { ...rest }
      onOk={onConfirm}
      onCancel={onClose}
      closable={closable}
      maskClosable={maskClosable}
      footer={null}
    >
      {
        React.cloneElement(children, {
          ref,
        })
      }
      {
        footer && <div className="custom-modal-footer">
          {
            cancelText !== null && <Button className="ant-btn-cancel" onClick={(e) => { onCancel?.(e); onClose(e); }}>{ cancelText || '取消' }</Button>
          }
          {
            okText !== null && <Button type="primary" onClick={onConfirm} style={{ opacity: loading ? 0.8 : 1, overflow: 'hidden' }}>
              { loading && <LoadingOutlined style={{ marginRight: '10px' }} /> }
              { okText || '确认' }
            </Button>
          }
        </div>
      }
    </Modal>
  );
};

const div = document.createElement('div');
document.body.appendChild(div);

let id = 0;

const ModalService = {
  create: (props: ServiceModalProps) => {
    const currentId = +new Date();
    let config = {
      visible: true,
      ...props,
    };

    const unlisten = customHistory.listen(() => {
      destroy();
    });

    const destroy = () => {
      unlisten();
      if (id === currentId) {
        update({ visible: false });
        props.onDestroy?.();
      }
    };

    const render = (options: ServiceModalProps) => {
      id = currentId;
      ReactDOM.render(<ConfigProvider locale={zhCN}><CustomModal key={currentId} destroyOnClose { ...options } onDestroy={destroy} /></ConfigProvider>, div);
    };

    const update = (options: Partial<ServiceModalProps>) => {
      config = {
        ...config,
        ...options,
      };
      render(config);
    };

    render(config);

    return {
      update,
      destroy,
    };
  },
  form: (props: ServiceModalProps) => {
    return ModalService.create({
      onRef: async (ref) => {
        const form = ref?.current?.form;
        if (form?.validateFields) {
          const values = await form.validateFields();
          return values;
        }
      },
      ...props
    });
  },
  loading: (props: Pick<ServiceModalProps, 'getContainer'>) => {
    const modal = ModalService.create({
      className: 'custom-loading-modal',
      children: <div>加载中</div>,
      width: 'auto',
      transitionName: '',
      maskTransitionName: '',
      centered: true,
      modalRender: () => {
        return <Spin tip="加载中..." />;
      },
      footer: false,
      closable: false,
      keyboard: false,
      maskClosable: false,
      ...props
    });
    return modal;
  },
  warning: (props: ServiceModalProps) => {
    return ModalService.create({
      title: <div><InfoCircleFilled style={{ color: 'orange' }} /> 提示</div>,
      width: 584,
      ...props,
    });
  },
  contextmenu: (opts: {
    event: React.MouseEvent<Element, MouseEvent> | MouseEvent,
    list: ContextMenuItem[],
    modalProps?: Partial<ServiceModalProps>;
    onClick: (leaf: ContextMenuItem) => void;
  }) => {
    const { event, list, modalProps, onClick } = opts;
    const height = list.reduce((sum, l) => {
      sum += 24;
      if (l.children) {
        sum += l.children.length * 28;
      }
      return sum;
    }, 0) + 16;

    const modal = ModalService.create({
      className: 'ant-modal-contextmenu',
      width: 180,
      ...(modalProps || {}),
      style: {
        ...(modalProps?.style || {}),
        top: 0
      },
      wrapProps: {
        style: {
          left: event.pageX,
          top: Math.min(window.innerHeight - height, event.pageY),
          right: 'initial',
          bottom: 'initial',
          overflow: 'hidden'
        }
      },
      mask: false,
      footer: false,
      closable: false,
      transitionName: 'ant-fade',
      onDestroy: () => {
        modalProps?.onDestroy?.();
        window.removeEventListener('pointerdown', modal.destroy);
      },
      children: (
        <div className="contextmenu-list">
          {
            list.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames([item.children ? 'contextmenu-list-category' : 'contextmenu-list-item', item.disabled && 'is-disabled'])}
                  onClick={() => { if (!item.children) { modal.destroy(); onClick(item); } }}
                  >
                  {
                    item.children ? (
                      <>
                        <div className="contextmenu-list-category__title">{item.label}</div>
                        {
                          item.children?.map((child, i) => {
                            return (
                              <div
                                key={`${index}-${i}`}
                                className={classNames(['contextmenu-list-item', child.disabled && 'is-disabled'])}
                                onClick={() => {
                                  if (child.disabled) {
                                    return;
                                  }
                                  modal.destroy();
                                  onClick(child);
                                }}
                              >{child.label}</div>
                            );
                          })
                        }
                      </>
                    ) : item.label
                  }
                </div>
              );
            })
          }
        </div>
      )
    });

    window.addEventListener('pointerdown', modal.destroy);

    return modal;
  }
};

export default ModalService;