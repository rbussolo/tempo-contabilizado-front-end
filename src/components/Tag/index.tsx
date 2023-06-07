import { useEffect, useState } from "react";

interface ITag {
  name: string;
  startTime: string;
  stopTime?: string;
}

function Tag({ name, startTime, stopTime }: ITag) {
  const description = startTime + (stopTime ? " - " + stopTime : "");
  const [spendTime, setSpendTime] = useState<string>("");
  let intervalID: NodeJS.Timer;

  function timeDifference(startTime: string, stopTime?: string) {
    if (stopTime) {
      const minuteStart = hoursToMinutes(startTime);
      const minuteStop = hoursToMinutes(stopTime);
      const minuteDifference = minuteStop - minuteStart;

      return minuteToHours(minuteDifference);
    }

    const date = new Date();
    const secondStart = hoursToMinutes(startTime) * 60;
    const secondStop = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
    const secondDifference = secondStop - secondStart;

    return secondsToHours(secondDifference);
  }

  function hoursToMinutes(timeString: string): number {
    if (!timeString) {
      return 0;
    }

    const times = timeString.split(":");
    return parseInt(times[0]) * 60 + parseInt(times[1]);
  }

  function minuteToHours(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = time - (hours * 60);

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
  }

  function secondsToHours(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
  }

  useEffect(() => {
    const difference = timeDifference(startTime, stopTime);

    setSpendTime(difference);

    if (!stopTime) {
      intervalID = setInterval(function () {
        setSpendTime(timeDifference(startTime, stopTime));
      }, 1000);
    }

    return () => clearInterval(intervalID);
  }, [startTime, stopTime]);

  return (
    <div className="tag-container" key={"tag_" + name}>
      <span className="tag-name">{name}</span>
      <span className="tag-time">{description}</span>
      <span className="tag-total">{spendTime}</span>
    </div>
  )
}

export { Tag };