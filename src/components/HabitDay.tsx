import clsx from 'clsx';
import dayjs from 'dayjs';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Dimensions,
  View,
} from 'react-native';

import { generateProgressPercentage } from '../utils/generate-progress-percentage';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface IHabitDayProps extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

export function HabitDay({
  amount = 0,
  completed = 0,
  date,
  ...rest
}: IHabitDayProps) {
  const amountAccomplishedPercentagem =
    amount > 0 ? generateProgressPercentage(amount, completed) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx('rounded-lg border-2 m-1', {
        'bg-zinc-900 border-zinc-800': amountAccomplishedPercentagem === 0,
        'bg-violet-900 border-violet-500':
          amountAccomplishedPercentagem > 0 &&
          amountAccomplishedPercentagem < 20,
        'bg-violet-800 border-violet-500':
          amountAccomplishedPercentagem >= 20 &&
          amountAccomplishedPercentagem < 40,
        'bg-violet-700 border-violet-500':
          amountAccomplishedPercentagem >= 40 &&
          amountAccomplishedPercentagem < 60,
        'bg-violet-600 border-violet-500':
          amountAccomplishedPercentagem >= 60 &&
          amountAccomplishedPercentagem < 80,
        'bg-violet-500 border-violet-400': amountAccomplishedPercentagem >= 80,
        'border-white border-4': isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    />
  );
}

export function HabitDayDisabled() {
  return (
    <View
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
    />
  );
}
