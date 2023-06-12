import styled from "styled-components";

export const ContainerCalendar = styled.div`
  .calendar-header {
    display: flex;
    justify-content: center;
    font-size: 45px;
    gap: 25px;

    .calendar-header-last, .calendar-header-next {
      color: #3498db;

      i {
        cursor: pointer;
      }
    }

    .calendar-header-last:hover, .calendar-header-next:hover {
      color: #1c8bd5;
    }
  }

  .calendar-body {
    display: flex;
    flex-direction: column;

    .calendar-body-day-of-week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      margin-bottom: 10px;
      
      .calendar-day-of-week {
        flex-grow: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0.75rem 1.5rem;
        background-color: #f5f6f6;

        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);

        &.calendar-day-of-week-sunday, &.calendar-day-of-week-saturday {
          background-color: #e6e6e6;
        }
      }
    }

    .calendar-body-day-of-month {
      display: grid;
      grid-template-rows: 1fr;
      grid-gap: 10px;

      .calendar-month-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 10px;

        .calendar-month-week-day {
          flex-grow: 1;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 0.75rem 1.5rem;
          background-color: #f5f6f6;

          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);

          &.calendar-no-current-month {
            opacity: 0.5;
          }

          &.day-with-activity {
            background-color: #2ecc71;
            border-color: #27ae60;
          }

          &.day-with-problem {
            background-color: #e74c3c;
            border-color: #c0392b;
          }
        }
      }
    }
  }
`;
