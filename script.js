function logTextareaValue() {
  const textarea = document.getElementById('sms');
  splitIntoSMSChunksWithSuffix(textarea.value);
}

function splitIntoSMSChunksWithSuffix(text) {
  const SMS_LENGTH_LIMIT = 140;
  //почистим лишние пробелы в тексте
  text = text.replace(/\s+/g, ' ').trim();
  const wordsArray = text.split(' ');
  let currentSMS = '';
  let result = [];

  //создадим массив из смс не превышающих 140 символов пока без суффиксов

  for (let i = 0; i < wordsArray.length; i++) {
    const potentialSMS = `${currentSMS} ${wordsArray[i]}`.trim();
    if (potentialSMS.length <= SMS_LENGTH_LIMIT) {
      currentSMS = potentialSMS;
    } else {
      result.push(`${currentSMS}`);
      currentSMS = wordsArray[i];
    }
  }
  if (currentSMS) {
    result.push(`${currentSMS}`);
  }

  //если фрагмент один то возвращаем смс как есть без добавления суффиксов так как смс не превысила 140 символов

  if (result.length === 1) {
    console.log('result: ', result);
    return;
  }

  // добавляем суффиксы так как фрагментов оказалось больше одного

  result = result.map((item, key) => {
    return `${item} ${key + 1}/${result.length}`;
  });

  //проверка на непревышение длины 140 символов при добавление суффикса

  let initialSmsArrayLength = result.length;
  let wordToMoveForward = '';

  for (let i = 0; i < initialSmsArrayLength; i++) {
    if (result[i].length <= SMS_LENGTH_LIMIT) {
      continue;
    }

    const arrayToCutWord = result[i].split(' ');
    wordToMoveForward = arrayToCutWord.splice(-2, 1);

    result[i] = arrayToCutWord.join(' ');
    if (i < initialSmsArrayLength - 1) {
      result[i + 1] = `${wordToMoveForward} ${result[i + 1]}`;
      wordToMoveForward = '';
    }
  }

  //если от последней смс осталось одно слово для переноса, то добавляем еще одну новую последнюю смс и меняем в конце каждой смс цифру общего количества смс

  if (wordToMoveForward) {
    result.push(`${wordToMoveForward} ${initialSmsArrayLength + 1}/${initialSmsArrayLength + 1}`);
    result = result.map((item, key) => {
      return `${item
        .split(' ')
        .splice(0, item.split(' ').length - 1)
        .join(' ')} ${key + 1}/${result.length}`;
    });
  }

  // если после проверки суффикса длина массива изменится с 9 на 10 или с 99 на 100 или со 999 на 1000,
  // то надо проверить второй раз так как добавление одного символа в конец может нарушить длину одной или нескольких смс и превысить 140 символов

  if (initialSmsArrayLength != 9 && initialSmsArrayLength != 99 && initialSmsArrayLength != 999 && initialSmsArrayLength != 999 && !result.some((item) => item.length > SMS_LENGTH_LIMIT)) {
    console.log('result: ', result);
    return;
  }

  // ВАЖНО!!!!! дальше идет повторение части скрипта, обычно по принципу DRY это должно выноситься в отдельную функцию,
  // но я оставлю здесь чтобы не путать логикой алгоритма
  do {
    initialSmsArrayLength = result.length;
    wordToMoveForward = '';

    for (let i = 0; i < initialSmsArrayLength; i++) {
      if (result[i].length <= SMS_LENGTH_LIMIT) {
        continue;
      }
      const arrayToCutWord = result[i].split(' ');
      wordToMoveForward = arrayToCutWord.splice(-2, 1);

      result[i] = arrayToCutWord.join(' ');
      if (i < initialSmsArrayLength - 1) {
        result[i + 1] = `${wordToMoveForward} ${result[i + 1]}`;
        wordToMoveForward = '';
      }
    }

    if (wordToMoveForward) {
      result.push(`${wordToMoveForward} ${initialSmsArrayLength + 1}/${initialSmsArrayLength + 1}`);
      result = result.map((item, key) => {
        return `${item
          .split(' ')
          .splice(0, item.split(' ').length - 1)
          .join(' ')} ${key + 1}/${result.length}`;
      });
    }
  } while (result.some((item) => item.length > SMS_LENGTH_LIMIT));

  console.log('result: ', result);
  return;
}

//Sit esse esse officia ullamco eiusmod. Incididunt ullamco in sunt sit proident esse quis duis exercitation aliquip aliqua sit dolore in. Eiusmod Lorem deserunt quis aute ad in proident cillum aliquip deserunt dolor culpa nostrud. Eiusmod eiusmod eiusmod irure eu labore sunt minim ipsum cillum Lorem. Id fugiat in minim ullamco Lorem ut ipsum et.
