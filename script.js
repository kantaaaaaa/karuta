function readQCSV(readq_id) {
  const fileInput = document.getElementById('fileInput');
  const outputElement = document.getElementById('output');

  // outputElementが存在しないか確認
  if (!outputElement) {
      console.error('Output element not found.');
      return;
  }

  const file = fileInput.files[0];

  if (!file) {
    outputElement.textContent = 'No file selected.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').map(row => row.split(','));

    // ヘッダーを取得
    const header = rows[0];

    // データ部分を取得
    const data = rows.slice(readq_id + 1,readq_id + 2);

    // ここでcsvDataを使って必要な処理を行う
    // 例: コンソールに出力
    console.log(header);
    console.log(data);

    // 例: 結果を表示
    outputElement.textContent = JSON.stringify(rows, null, 2);

    // 観光地情報を表示
    displayTouristInfo_problem_statement(header, data);
  };

  reader.onerror = function (event) {
    outputElement.textContent = 'Error reading the file!';
  };

  reader.readAsText(file);
}

function displayTouristInfo_problem_statement(header, data) {
  const outputElement = document.getElementById('output');

  // outputElementが存在しないか確認
  if (!outputElement) {
      console.error('Output element not found.');
      return;
  }

  // Clear existing content
  outputElement.innerHTML = '';
  console.log('データ表示' + data);
  // Iterate through data rows
  data.forEach((row, index) => {
    const containerId = index;
    
    // Create tourist information
    createQuestiontext(
      containerId,
      row[1] || 'テキストなし'
    );
    // カルタ作成
    createCard(row[header.indexOf('カルタ番号')]);

    synthesizeSpeech(row[1]);

  });
  
}

function createCard(ids){
  console.log(ids);
  const correctCardNumbersArray = ids.split(':');

  correctCardNumbersArray.forEach((id)=>{
    const parsedId = parseInt(id, 10);
    console.log("生成するカルタのID : " + parsedId);
    readCardCSV(parsedId);
  }

  );
}




function readCardCSV(target_id) {
  const fileInput = document.getElementById('fileInput_Card');
  const outputElement = document.getElementById('image-container');

  // outputElementが存在しないか確認
  if (!outputElement) {
      console.error('Output element not found.');
      return;
  }

  const file = fileInput.files[0];

  if (!file) {
    outputElement.textContent = 'No file selected.';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').map(row => row.split(','));

    // ヘッダーを取得
    const header = rows[0];

    // データ部分を取得
    const data = rows.slice(target_id,target_id + 1);

    // ここでcsvDataを使って必要な処理を行う
    // 例: コンソールに出力
    console.log(header);
    console.log(data);

    // 例: 結果を表示
    //outputElement.textContent = JSON.stringify(rows, null, 2);

    // 観光地情報を表示
    displayTouristInfo(header, data);
  };

  reader.onerror = function (event) {
    outputElement.textContent = 'Error reading the file!';
  };

  reader.readAsText(file);
}

function displayTouristInfo(header, data) {
  const outputElement = document.getElementById('image-container');

  // outputElementが存在しないか確認
  if (!outputElement) {
      console.error('Output element not found.');
      return;
  }

  
  // Iterate through data rows
  data.forEach((row, index) => {
    const containerId = 'touristInfo' + index;

    // Create tourist information
    createTouristInfo(
      row[0],
      row[header.indexOf('文言')] || 'テキストなし',
      row[2],
      row[header.indexOf('観光地名')] || '名前なし',
      row[header.indexOf('説明')] || '説明なし'
    );
  });
}

function createTouristInfo(containerId, text, imagePath, touristName, description) {

  console.log(containerId + text + imagePath + touristName + description);
  
  const container = document.createElement('div');
  container.classList.add('im-container');
  container.id = containerId;

  let linktext;
  if(containerId == 3){
    linktext = "answer";
  }else if(containerId == 7){
    linktext = "answersecond"
  }
  else{
    linktext = "answerwrong";
  }


  const linkElement = document.createElement('a');
  linkElement.href =linktext;

  const imageElement = document.createElement('img');
  imageElement.classList.add('image');
  imageElement.src = imagePath;
  imageElement.alt = '観光地の画像';
  linkElement.appendChild(imageElement);

  container.appendChild(linkElement);

    // ボディにコンテナを追加
  document.getElementById('image-container').appendChild(container);
}


function synthesizeSpeech(speechtext) {
    const keyText = "e28682a3aa8a430daf6ab0fef6fc34b1",
        regionText = "japaneast",
        
        phraseText = speechtext;
        console.log(phraseText);

    let speechConfig = SpeechSDK.SpeechConfig.fromSubscription(keyText, regionText);
    speechConfig.speechSynthesisLanguage = "ja-JP";
    speechConfig.speechSynthesisVoiceName = "ja-JP-NanamiNeural";

    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(
        phraseText,
        function (result) {
            console.log(result);
            synthesizer.close();
            synthesizer = undefined;
        }, function (err) {
            console.log(err);
            synthesizer.close();
            synthesizer = undefined;
        }
    )
}
  



function createQuestiontext(questuin_id,text) {
  const container = document.createElement('div');
  container.classList.add('container');
  container.id = questuin_id;
  console.log('問題文を追加' + text);
  // 文言
  const textElement = document.createElement('p');
  textElement.textContent = text;
  container.appendChild(textElement);
  // ボディにコンテナを追加
  document.getElementById('output').appendChild(container);
}
