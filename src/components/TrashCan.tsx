
import './TrashCan.css';

interface TrashCanProps {
  isOpen: boolean;
  isActive?: boolean;
  size?: number;
}

export default function TrashCan({
  isOpen,
  isActive = false,
  size = 320,
}: TrashCanProps) {
  return (
    <div
      className={`trash-can ${isOpen ? 'is-open' : ''} ${
        isActive ? 'is-active' : ''
      }`}
      style={{ width: size }}
      role="img"
      aria-label={isOpen ? '열린 휴지통' : '닫힌 휴지통'}
    >
      <div className="trash-can__lid">
        <img
          src="/images/trash-can/lid.png"
          alt=""
          draggable={false}
        />
      </div>

      <div className="trash-can__body">
        <img
          src="/images/trash-can/body.png"
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
}
