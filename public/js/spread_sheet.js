// 1. 구글 API 클라이언트 로드 및 서비스 계정 설정
gapi.load('client', function() {
  gapi.client.init({
    'apiKey': 'AIzaSyDjEbE4vsbThMNDp_Pb_42k8Tewi0QEShI',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    // 서비스 계정 인증
    var auth = gapi.auth2.getAuthInstance();
    auth.signIn().then(function() {
      var accessToken = auth.currentUser.get().getAuthResponse().access_token;
      gapi.auth.setToken({
        'access_token': accessToken,
      });
      saveDataToSheet();
    });
  });
});


// 데이터 저장 함수
function saveDataToSheet() {
  // jQuery 로드
  var $ = window.jQuery;

  // 저장할 데이터
  var name = $('#name-input input').val();
  var gender = $('input[name=gender]:checked', '#gender-input').val();
  var age = $('#age-input select').val();

  // 구글 스프레드시트 정보
  var spreadsheetId = '1oJGNEqw9pCR5IErrIu9PC3sf8AsFlUo_QDZCnbC1jyg';
  var sheetName = 'Investment_MBTI';

  // 저장할 데이터 배열
  var data = [[name, gender, age]];

  // 다음 행에 데이터를 추가하기 위해 마지막 행 인덱스를 가져옴
  getLastRow().then(function(lastRow) {
    var nextRow = lastRow + 1;
    var range = sheetName + '!A' + nextRow + ':C' + nextRow; // 다음 행에 추가하도록 range 값 수정

    // 구글 API를 사용하여 데이터 저장
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: data
      }
    }).then((response) => {
      const result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`);
    }, function (error) {
      console.log(error);
    });
  });
}

function getLastRow() {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1oJGNEqw9pCR5IErrIu9PC3sf8AsFlUo_QDZCnbC1jyg',
    range: 'Investment_MBTI!A:A',
    majorDimension: 'COLUMNS'
  }).then(function(response) {
    var column = response.result.values[0];
    return column.length;
  });
}
