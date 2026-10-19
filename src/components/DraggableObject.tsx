
import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { ExhibitionObject } from '../data/objects';
import './DraggableObject.css';

export interface DragPosition {
  x: number;
  y: number;
}

interface DraggableObjectProps {
  object: ExhibitionObject;

  // 드래그하는 동안 포인터의 화면 좌표
  onDrag?: (
    object: ExhibitionObject,
    position: DragPosition
  ) => void;

  // 드래그를 끝냈을 때
  onDrop?: (
    object: ExhibitionObject,
    position: DragPosition
  ) => void;

  // 드래그가 취소되었을 때
  onDragCancel?: () => void;

  // 전시에서 물건을 숨겨야 할 때
  isHidden?: boolean;
}

export default function DraggableObject({
  object,
  onDrag,
  onDrop,
  onDragCancel,
  isHidden = false,
}: DraggableObjectProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const pointerRef = useRef<{
    id: number;
    startX: number;
    startY: number;
  } | null>(null);

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (isHidden || pointerRef.current) return;

    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    event.preventDefault();

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX - offset.x,
      startY: event.clientY - offset.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const nextOffset = {
      x: event.clientX - pointer.startX,
      y: event.clientY - pointer.startY,
    };

    setOffset(nextOffset);

    onDrag?.(object, {
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    pointerRef.current = null;
    setIsDragging(false);

    onDrop?.(object, {
      x: event.clientX,
      y: event.clientY,
    });

    // 일단 원래 자리로 돌아가는 기본 동작
    // 다섯 가지 반응은 Exhibition에서 구현할 예정
    setOffset({ x: 0, y: 0 });
  };

  const handlePointerCancel = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (pointerRef.current?.id !== event.pointerId) {
      return;
    }

    pointerRef.current = null;
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });
    onDragCancel?.();
  };

  return (
    <div
      className={`draggable-object ${
        isDragging ? 'is-dragging' : ''
      } ${isHidden ? 'is-hidden' : ''}`}
      style={{
        left: `${object.position.x}%`,
        top: `${object.position.y}%`,
        width: object.size,
        height: object.size,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      role="img"
      aria-label={object.name}
    >
      <img
        src={object.image}
        alt={object.name}
        draggable={false}
      />
    </div>
  );
}
