import { View, Text, ScrollView } from 'react-native';
import { HabitDay, DAY_SIZE, HabitDayDisabled } from '../components/HabitDay';
import { Header } from '../components/Header';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;
export function Home() {
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
          {datesFromYearStart.map((date) => (
            <HabitDay key={date.toString()} />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <HabitDayDisabled key={index} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
