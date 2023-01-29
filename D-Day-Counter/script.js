const DayMessage = document.querySelector("#d-day-Message");
DayMessage.textContent = "D -Day";
const dateFormMarker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dateFormat = inputYear + '-' + inputMonth +'-' + inputDate  ;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;

  return dateFormat;
};

const counterMaker = function () {
  const targetDateInput = dateFormMarker();
  const nowDate = new Date(); // .setHours(0,0,0,0); 설정할시 자정 기준 지금은 오전 기준
  const targetDate = new Date(targetDateInput);
  const remaining = (targetDate - nowDate) / 1000; //(목표날짜 - 현재시간)밀리세컨드 --> 초로 변환하기
  //만약 remaining이 0이면(차이시간) 타이머가 종료
  if (remaining <= 0) {
    console.log("타이머가 종료 되었습니다.");
  } else if (isNaN(remaining)) {
    //만약 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다 출력
    console.log("유효한 시간이 아닙니다.");
  }

  const remainingDate = Math.floor(remaining / (60 * 60 * 24)); //날짜구하기 초 x 분 x 시간
  const remainingHours = Math.floor(remaining / (60 * 60)) % 24; //시간구하기 초 x 분 % 24(몫은 일이되고 나머지는 시간)
  const remainingMin = Math.floor(remaining / 60) % 60; //분구하기 초 /  1분은 60초가 멕시멈이라서 60으로 나머지구하기
  const remainingSec = Math.floor(remaining) % 60; // 구해진 초로 멕시멈 60초로 나누어 나머지값 구하기

  console.log(remainingDate, remainingHours, remainingMin, remainingSec);
};
