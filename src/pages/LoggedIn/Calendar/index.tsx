import { useEffect, useState } from "react";
import { TitlePage } from "../../../components/TitlePage";
import { ContainerForm } from "../../../global.styles";
import { getCurrentDateWithoutTimezone } from "../../../utils/date";
import { ContainerCalendar } from "./styles";

interface IDay {
  day: number;
  currentMonth: boolean;
}

interface IDaysOfMonth {
  month: [IDay[]];
}

function Calendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [dateDescription, setDateDescription] = useState("");
  const [daysOfMonth, setDaysOfMonth] = useState<IDaysOfMonth>({
    month: [[]]
  });
  
  function lastMonth(month: number, year: number) {
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month - 2);
    
    setNewDate(d);
  }

  function nextMonth(month: number, year: number) {
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month);

    setNewDate(d);
  }

  useEffect(() => {
    const d = getCurrentDateWithoutTimezone();

    setNewDate(d);
  }, []);

  function setNewDate(date: Date) {
    setDate(date);
    setDateDescription(date.toLocaleDateString('pt-BR', { month: 'long' }) + '/' + date.getFullYear());
    
    const lastDayOfWeek = 6;
    const currentMonth = date.getMonth();
    const daysOfMonth: IDaysOfMonth = {
      month: [[]]
    };

    let week = 0;

    // Volta para o ultimo dia do mês anterior
    date.setDate(0);

    // Verifica se não é sabado
    if (date.getDay() < 6) {
      const lastDayOfPreviewMonth = date.getDate();
      date.setDate(date.getDate() - date.getDay());
      const lessDayOfPreviewMonth = date.getDate();

      for (let i = lessDayOfPreviewMonth; i <= lastDayOfPreviewMonth; i++) {
        const day: IDay = {
          currentMonth: false,
          day: date.getDate()
        }

        daysOfMonth.month[week].push(day);

        // Vai para o proximo dia
        date.setDate(date.getDate() + 1);
      }
    } else {
      // Apenas avança e vai para o proximo mês
      date.setDate(date.getDate() + 1);
    }

    // Agora volta para o mês atual e começa adicionar os dias de acordo com a semana
    while (week < 6) {
      const currentDayOfWeek = date.getDay();

      for (let i = currentDayOfWeek; i <= lastDayOfWeek; i++) {
        const day: IDay = {
          currentMonth: date.getMonth() === currentMonth,
          day: date.getDate()
        }

        daysOfMonth.month[week].push(day);

        // Vai para o proximo dia
        date.setDate(date.getDate() + 1);
      }

      if (week < 6) {
        week += 1;
        daysOfMonth.month.push([]);
      }
    }

    setDaysOfMonth(daysOfMonth);
  }

  return (
    <ContainerForm className="container">
      <TitlePage title="Calendário" />

      <hr />

      <ContainerCalendar>
        <div className="calendar-header">
          <div className="calendar-header-last">
            <i className="bi bi-arrow-left-square-fill" onClick={() => lastMonth(date.getMonth(), date.getFullYear())}></i>
          </div>
          <div className="calendar-header-description">
            { dateDescription }
          </div>
          <div className="calendar-header-next">
            <i className="bi bi-arrow-right-square-fill" onClick={() => nextMonth(date.getMonth(), date.getFullYear())}></i>
          </div>
        </div>
        <div className="calendar-body">
          <div className="calendar-body-day-of-week">
            <div className="calendar-day-of-week calendar-day-of-week-sunday">
              <span>Domingo</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-monday">
              <span>Segunda</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-tuesday">
              <span>Terça</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-wednesday">
              <span>Quarta</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-thursday">
              <span>Quinta</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-friday">
              <span>Sexta</span>
            </div>
            <div className="calendar-day-of-week calendar-day-of-week-saturday">
              <span>Sábado</span>
            </div>
          </div>
          <div className="calendar-body-day-of-month">
            { daysOfMonth.month.map((days, index) => {
              return (
                <div key={`week_${index}`} className="calendar-month-week">
                  {days.map(day => {
                    return(
                      <div key={day.day} className={`calendar-month-week-day ${day.currentMonth ? "calendar-current-month" : "calendar-no-current-month"}`}>
                        <span>{day.day}</span>
                      </div>
                    )
                  })}
                </div>
              )
            }) }
          </div>
        </div>
      </ContainerCalendar>
    </ContainerForm>
  )
}

export { Calendar };
