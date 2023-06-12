import { useEffect, useState } from "react";
import { TitlePage } from "../../../components/TitlePage";
import { ContainerForm } from "../../../global.styles";
import { getCurrentDateWithoutTimezone } from "../../../utils/date";
import { ContainerCalendar } from "./styles";
import { useLoading } from "../../../contexts/LoadingProvider";
import { api } from "../../../services/api";
import { Alert } from "../../../utils/alert";

interface IDay {
  day: number;
  date: Date;
  currentMonth: boolean;
  calendar?: {
    id: number;
    date: Date;
    stats: string;
  };
}

interface ICalendar {
  weeks: [IDay[]];
}

function Calendar() {
  const load = useLoading();
  
  const [date, setDate] = useState<Date>(new Date());
  const [dateDescription, setDateDescription] = useState("");
  const [calendar, setCalendar] = useState<ICalendar>({
    weeks: [[]]
  });

  function lastMonth(month: number, year: number) {
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month - 2);
    
    fetchData(d).then(() => {
      setNewDate(d);
    });
  }

  function nextMonth(month: number, year: number) {
    const d = new Date();
    d.setFullYear(year);
    d.setMonth(month);

    fetchData(d).then(() => {
      setNewDate(d);
    });
  }

  async function fetchData(date: Date) {
    const date_initial = new Date(date.getFullYear(), date.getMonth(), 1);
    const date_final = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const filter = { date_initial: date_initial.toISOString(), date_final: date_final.toISOString() };

    load.showLoading();

    api.get("/calendar", { params: filter }).then(response => {
      console.log(response.data)
      setCalendar(response.data);
    }).catch((err) => {
      Alert.showAxiosError(err);
    }).finally(() => {
      load.hideLoading();
    });
  }

  useEffect(() => {
    const d = getCurrentDateWithoutTimezone();

    fetchData(d).then(() => {
      setNewDate(d);
    });
  }, []);

  function setNewDate(d: Date) {
    setDate(d);
    setDateDescription(d.toLocaleDateString('pt-BR', { month: 'long' }) + '/' + date.getFullYear());
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
            { calendar.weeks.map((week, index) => {
              return (
                <div key={`week_${index}`} className="calendar-month-week">
                  { week.map(day => {
                    let classCalendar = "";

                    if (day.calendar && day.calendar.stats !== 'no_activity') {
                      if (day.calendar.stats === 'activity_with_problem') {
                        classCalendar = 'day-with-problem';
                      } else {
                        classCalendar = 'day-with-activity';
                      }
                    }

                    return(
                      <div key={day.day} className={`calendar-month-week-day ${day.currentMonth ? "calendar-current-month" : "calendar-no-current-month"} ${classCalendar}`}>
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
