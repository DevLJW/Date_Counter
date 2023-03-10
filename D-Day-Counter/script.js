const DayMessage = document.querySelector("#d-day-Message"); //D-day메세지
const container = document.querySelector("#d-day-container"); //일시간분초

// DayMessage.textContent = "D -Day";
const intervalIdArr = []; //IntervalID 저장
const savedDate = localStorage.getItem("saveDate");

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth +'-' + inputDate  ;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saveDate", data);
  }

  const nowDate = new Date(); // .setHours(0,0,0,0); 설정할시 자정 기준 지금은 오전 기준
  const targetDate = new Date(data);
  const remaining = (targetDate - nowDate) / 1000; //(목표날짜 - 현재시간)밀리세컨드 --> 초로 변환하기
  //만약 remaining이 0이면(차이시간) 타이머가 종료
  if (remaining <= 0) {
    DayMessage.innerHTML = "타이머가 종료 되었습니다.";
    DayMessage.style.display = "flex";
    container.style.display = "none"; //NAN 표시 지우기
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    //만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다 출력

    DayMessage.innerHTML = "유효한 시간대가 아닙니다.";
    DayMessage.style.display = "flex";
    container.style.display = "none"; //NAN 표시 지우기
    setClearInterval();
    return;
  }

  //   const remainingDate = Math.floor(remaining / (60 * 60 * 24)); //날짜구하기 초 x 분 x 시간
  //   const remainingHours = Math.floor(remaining / (60 * 60)) % 24; //시간구하기 초 x 분 % 24(몫은 일이되고 나머지는 시간)
  //   const remainingMin = Math.floor(remaining / 60) % 60; //분구하기 초 /  1분은 60초가 멕시멈이라서 60으로 나머지구하기
  //   const remainingSec = Math.floor(remaining) % 60; // 구해진 초로 멕시멈 60초로 나누어 나머지값 구하기

  const remainObj = {
    remainingDate: Math.floor(remaining / (60 * 60 * 24)),
    remainingHours: Math.floor(remaining / (60 * 60)) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const format = function (time) {
    //10초 이하 앞에 0 붙히기
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainObj); //객체의 키만 가져오기 값X
  let i = 0;
  // for of 배열에 많이 사용
  for (let tag of documentArr) {
    const remainingTime = format(remainObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  // const documentObj = {
  //   days: document.getElementById("days"),
  //   hours: document.getElementById("hours"),
  //   min: document.getElementById("min"),
  //   sec: document.getElementById("sec"),
  // };

  // let i = 0;
  // for (key in documentObj) {
  //   documentObj[key].textContent = remainObj[timeKeys[i]];
  //   i++;
  // }

  // documentObj["days"].textContent = remainObj["remainingDate"];
  // documentObj["hours"].textContent = remainObj["remainingHours"];
  // documentObj["min"].textContent = remainObj["remainingMin"];
  // documentObj["sec"].textContent = remainObj["remainingSec"];

  // console.log(remainingDate, remainingHours, remainingMin, remainingSec);
};

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }

  container.style.display = "flex";
  DayMessage.style.display = "none";
  setClearInterval(); //기존에 존재하던 인터벌 삭제
  counterMaker(targetDateInput); // setInterval같은경우 1초 뒤에 실행이 되어 자체적으로 강제 한번 실행 0 0 0표기 방지
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000); //1초마다 실행
  //setInterval의 반환값은 interval의 고유의값이 반환 된다.
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saveDate");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  DayMessage.innerHTML = "<h3>D -Day를 입력 해주세요.</h3>";
  DayMessage.style.display = "flex";
  container.style.display = "none"; //처음엔 안보이게 설정

  setClearInterval();
};

if (savedDate) {
  //로컬스토리지에 데이터가 존재한경우
  starter(savedDate); //페이지가 실행 될때 마다 실행
} else {
  DayMessage.innerHTML = "<h3>D -Day를 입력 해주세요.</h3>";
  container.style.display = "none"; //처음엔 안보이게 설정
}
