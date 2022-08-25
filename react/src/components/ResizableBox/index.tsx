import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { useSetState } from 'react-use';
import './index.less';

export type IDirection = 'top' | 'bottom' | 'left' | 'right';

export interface ResizableBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  directions: IDirection[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  defaultSize: {
    width: number | string;
    height: number | string;
  }
  onSizeChange?: (size: { width: number; height: number; bounding: DOMRect; }) => void;
  controlled?: boolean;
  onResizeEnd?: (size: { width: number; height: number; bounding: DOMRect; }) => void;
}

const ResizableBox: React.FC<ResizableBoxProps> = (props) => {
  const { 
    directions, minWidth = 0, minHeight = 0, maxWidth = Number.MAX_SAFE_INTEGER, maxHeight = Number.MAX_SAFE_INTEGER, defaultSize,
    onSizeChange, onResizeEnd,
    controlled = false,
    className, style, ...rest
  } = props;
  const ref = useRef<HTMLDivElement>();
  const [state, setState] = useSetState({
    width: defaultSize.width,
    height: defaultSize.height
  });

  const handlers = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, direction: IDirection) => {
      if (!ref.current) {
        return;
      }
      const originCursor = document.body.style.cursor;
      document.body.style.cursor = window.getComputedStyle(e.target as HTMLDivElement).cursor || 'auto';
      const bounding = ref.current.getBoundingClientRect();

      const size = {
        width: bounding.width,
        height: bounding.height
      };
      const onMouseMove = (ev: MouseEvent) => {
        if ((['top', 'bottom'] as IDirection[]).includes(direction)) {
          size.height = Math.min(Math.max((ev.pageY - e.pageY) * (direction === 'top' ? -1 : 1) + bounding.height, minHeight), maxHeight);
        }
        if ((['left', 'right'] as IDirection[]).includes(direction)) {
          size.width = Math.min(Math.max((ev.pageX - e.pageX) * (direction === 'left' ? -1 : 1) + bounding.width, minWidth), maxWidth);
        }
        !controlled && setState({ ...size });
        onSizeChange?.({
          ...size,
          bounding
        });
      };
      const onMouseUp = (ev: MouseEvent) => {
        onMouseMove(ev);
        onResizeEnd?.({
          ...size,
          bounding
        });
        document.body.style.cursor = originCursor;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  const size = useMemo(() => {
    const size = {
      width: defaultSize.width,
      height: defaultSize.height
    };
    if ((['top', 'bottom'] as IDirection[]).some(d => directions.includes(d))) {
      size.height = `${state.height}${typeof state.height === 'number' ? 'px' : ''}`;
    }
    if ((['left', 'right'] as IDirection[]).some(d => directions.includes(d))) {
      size.width = `${state.width}${typeof state.width === 'number' ? 'px' : ''}`;
    }
    return size;
  }, [state.height, state.width, defaultSize.width, defaultSize.height])

  return (
    <div
      className={classNames(["resizable-box", className])}
      ref={ref as React.MutableRefObject<HTMLDivElement>}
      style={{
        ...(style || {}),
        ...size
      }}
      {...rest}
    >
      <div>
        {
          directions.includes('top') && <div className="resizable-box__edge is-top" onMouseDown={e => { handlers.onMouseDown(e, 'top') }}></div>
        }
        {
          directions.includes('bottom') && <div className="resizable-box__edge is-bottom" onMouseDown={e => { handlers.onMouseDown(e, 'bottom') }}></div>
        }
        {
          directions.includes('left') && <div className="resizable-box__edge is-left" onMouseDown={e => { handlers.onMouseDown(e, 'left') }}></div>
        }
        {
          directions.includes('right') && <div className="resizable-box__edge is-right" onMouseDown={e => { handlers.onMouseDown(e, 'right') }}></div>
        }
      </div>
      {props.children}
    </div>
  );
};

export default ResizableBox;