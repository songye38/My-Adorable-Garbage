
export type ObjectDecision =
  | 'keep'
  | 'discard'
  | 'undecided';

export type ObjectReaction =
  | 'return'
  | 'resist'
  | 'trace'
  | 'multiply'
  | 'linger';

export type ParticipantId =
  | 'participant-001'
  | 'participant-002'
  | 'participant-003';

export interface ExhibitionObject {
  id: string;
  name: string;

  // 이 물건을 소유한 참여자의 ID
  ownerId: ParticipantId;

  image: string;
  story: string;
  reason: string;

  decision: ObjectDecision;
  reaction: ObjectReaction;

  position: {
    x: number;
    y: number;
  };

  size: number;
}

export const exhibitionObjects: ExhibitionObject[] = [
  {
    id: 'object-001',
    name: '낡은 곰인형',
    ownerId: 'participant-001',
    image: '/images/objects/apple.png',
    story: '어릴 때부터 함께했던 곰인형이다.',
    reason: '지금은 사용하지 않지만 버리기 어렵다.',
    decision: 'discard',
    position: { x: 12, y: 18 },
    size: 140,
    reaction: 'trace',
  },
  {
    id: 'object-002',
    name: '오래된 편지',
    ownerId: 'participant-002',
    image: '/images/objects/bear.png',
    story: '오래전에 받았던 편지다.',
    reason: '그때의 기억을 떠올리게 한다.',
    decision: 'discard',
    position: { x: 34, y: 12 },
    size: 110,
    reaction: 'trace',
  },
  {
    id: 'object-003',
    name: '고장 난 카메라',
    ownerId: 'participant-003',
    image: '/images/objects/cups.png',
    story: '오랫동안 사용했던 카메라다.',
    reason: '언젠가 고칠 수 있을 것 같다.',
    decision: 'undecided',
    position: { x: 67, y: 15 },
    size: 150,
    reaction: 'resist',
  },
  {
    id: 'object-004',
    name: '오래된 수첩',
    ownerId: 'participant-001',
    image: '/images/objects/earphone.png',
    story: '예전에 썼던 기록이 담긴 수첩이다.',
    reason: '과거의 나를 버리는 것처럼 느껴진다.',
    decision: 'keep',
    position: { x: 82, y: 30 },
    size: 120,
    reaction: 'return',
  },
  {
    id: 'object-005',
    name: '옛집 열쇠',
    ownerId: 'participant-002',
    image: '/images/objects/keys.png',
    story: '이제는 들어갈 수 없는 집의 열쇠다.',
    reason: '추억은 남아 있지만 더 이상 필요하지 않다.',
    decision: 'discard',
    position: { x: 8, y: 42 },
    size: 100,
    reaction: 'return',
  },
  {
    id: 'object-006',
    name: '짝 잃은 양말',
    ownerId: 'participant-003',
    image: '/images/objects/paper.png',
    story: '한쪽만 남은 양말이다.',
    reason: '언젠가 다른 한쪽을 찾을지도 모른다.',
    decision: 'undecided',
    position: { x: 46, y: 35 },
    size: 110,
    reaction: 'resist',
  },
  {
    id: 'object-007',
    name: '오래된 티셔츠',
    ownerId: 'participant-001',
    image: '/images/objects/socks.png',
    story: '자주 입었던 티셔츠다.',
    reason: '낡았지만 편안했던 기억이 있다.',
    decision: 'keep',
    position: { x: 23, y: 52 },
    size: 150,
    reaction: 'return',
  },
  {
    id: 'object-008',
    name: '빈 향수병',
    ownerId: 'participant-002',
    image: '/images/objects/ticket.png',
    story: '다 사용한 향수병이다.',
    reason: '향기는 사라졌지만 기억은 남아 있다.',
    decision: 'discard',
    position: { x: 73, y: 49 },
    size: 105,
    reaction: 'return',
  },
];
