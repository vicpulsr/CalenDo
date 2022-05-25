import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'styled-components';

import {
    Calendar as CustomCalendar,
    LocaleConfig,
    CalendarProps,
} from 'react-native-calendars';

import { ptBR } from './localeConfig';
import { RFValue } from 'react-native-responsive-fontsize';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: string;
        disabledTouchEvent?: string;
    },
};

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

function CalendarComponent({
    markedDates,
    onDayPress
}: CalendarProps) {
    const theme = useTheme();

    return (
        <CustomCalendar
            style={{ width: RFValue(320) }}
            renderArrow={(direction) =>
                <Feather
                    size={24}
                    color={theme.colors.success}
                    name={direction == 'left'
                        ? 'chevron-left'
                        : 'chevron-right'}
                />
            }
            headerStyle={{
                backgroundColor: theme.colors.background,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.success,
                paddingBottom: 10,
                marginBottom: 10
            }}
            theme={{
                textDayFontFamily: theme.fonts.medium,
                textDayHeaderFontFamily: theme.fonts.regular,
                textMonthFontFamily: theme.fonts.regular,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.success,
                arrowStyle: {
                    marginHorizontal: -15
                },
                todayTextColor: theme.colors.success_light,
            }}
            firstDay={1}
            onDayPress={onDayPress}
            markingType="custom"
            markedDates={markedDates}
        />
    );
};

export {
    CalendarComponent,
};