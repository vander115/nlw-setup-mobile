import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, Alert } from 'react-native';

import { api } from '../lib/axios';
import { HabitDay, DAY_SIZE, HabitDayDisabled } from '../components/HabitDay';
import { Header } from '../components/Header';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type summaryType = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<summaryType>([]);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await api.get('/summary');
      console.log(response.data);
      setSummary(response.data);
    } catch (error) {
      Alert.alert('Ops...', 'Não foi possível carregar o sumário de hábitos.');
      console.log('Ops', error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            key={`${weekDay}-${i}`}
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });
            return (
              <HabitDay
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
                key={date.toString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            );
          })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <HabitDayDisabled key={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
