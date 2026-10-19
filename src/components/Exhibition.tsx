
import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Header from './Header';

import TrashCan from './TrashCan';
import DraggableObject from './DraggableObject';

import type { DragPosition } from './DraggableObject';
import type { ExhibitionObject } from '../data/objects';
import { exhibitionObjects } from '../data/objects';

import './Exhibition.css';

export default function Exhibition() {
    const trashCanRef = useRef<HTMLDivElement>(null);

    const [isTrashOpen, setIsTrashOpen] = useState(false);
    const [activeObject, setActiveObject] =
        useState<ExhibitionObject | null>(null);

    const [returningIds, setReturningIds] =
        useState<string[]>([]);

    const [attemptedIds, setAttemptedIds] =
        useState<string[]>([]);

    // 포인터가 휴지통 가까이에 있는지 확인
    const isNearTrash = (position: DragPosition) => {
        const trash = trashCanRef.current;

        if (!trash) return false;

        const rect = trash.getBoundingClientRect();
        const margin = 70;

        return (
            position.x >= rect.left - margin &&
            position.x <= rect.right + margin &&
            position.y >= rect.top - margin &&
            position.y <= rect.bottom + margin
        );
    };

    // 실제 휴지통 안에 놓았는지 확인
    const isInsideTrash = (position: DragPosition) => {
        const trash = trashCanRef.current;

        if (!trash) return false;

        const rect = trash.getBoundingClientRect();

        return (
            position.x >= rect.left + rect.width * 0.2 &&
            position.x <= rect.right - rect.width * 0.2 &&
            position.y >= rect.top + rect.height * 0.2 &&
            position.y <= rect.bottom
        );
    };

    // 물건을 움직이는 동안 실행
    const handleDrag = (
        _object: ExhibitionObject,
        position: DragPosition
    ) => {
        setIsTrashOpen(isNearTrash(position));
    };

    // 물건을 놓았을 때 실행
    const handleDrop = (
        object: ExhibitionObject,
        position: DragPosition
    ) => {
        setIsTrashOpen(false);

        if (!isInsideTrash(position)) {
            return;
        }

        setActiveObject(object);

        setAttemptedIds((prev) =>
            prev.includes(object.id) ? prev : [...prev, object.id]
        );

        switch (object.reaction) {
            case 'return':
                // 원래 위치로 돌아가는 동작은
                // DraggableObject의 기본 동작을 활용
                setReturningIds((prev) => [...prev, object.id]);

                window.setTimeout(() => {
                    setReturningIds((prev) =>
                        prev.filter((id) => id !== object.id)
                    );
                }, 650);
                break;

            case 'resist':
            case 'trace':
            case 'multiply':
            case 'linger':
                // 다음 단계에서 각각의 애니메이션 구현
                break;
        }
    };

    const handleReset = () => {
        setIsTrashOpen(false);
        setActiveObject(null);
        setAttemptedIds([]);
        setReturningIds([]);
    };

    return (
        <div className="exhibition-page">
            <Header />

            {/* 물건만 스크롤되는 영역 */}
            <main className="exhibition-scroll">
                <div className="exhibition-stage">
                    <div className="exhibition-instruction">
                        물건을 휴지통에 끌어다 넣어보세요.
                    </div>

                    {exhibitionObjects.map((object) => (
                        <DraggableObject
                            key={object.id}
                            object={object}
                            onDrag={handleDrag}
                            onDrop={handleDrop}
                            onDragCancel={() => setIsTrashOpen(false)}
                        />
                    ))}
                </div>
            </main>

            {/* 스크롤과 관계없이 화면 하단에 고정 */}
            <div
                ref={trashCanRef}
                className="exhibition-trash"
            >
                <TrashCan
                    isOpen={isTrashOpen}
                    isActive={isTrashOpen}
                    size={320}
                />
            </div>
        </div>
    );

}
