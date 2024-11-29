// 使用 Fetch API 加載關鍵字資料
fetch('keywords.json')  // 發送 HTTP 請求，獲取 'keywords.json' 文件
  .then(response => response.json())  // 當請求成功時，解析為 JSON 格式
  .then(data => {  // 當數據加載完畢後執行以下操作
    const textContainer = document.getElementById('keyword-text');  // 找到頁面中 id 為 'keyword-text' 的元素

    // 原始文本內容
    const originalText = `
      分別是：HTML、CSS、JavaScript、Python，這些都是網頁開發和程式設計中常見的技術。
      其中，HTML 是構建網頁結構的基礎；CSS 用於設計網頁樣式；
      而 JavaScript 賦予網頁互動性，Python 則在後端和數據處理領域發揮重要作用。
    `;  // 定義一段包含關鍵字的原始文字

    // 自動在 "。" 之後加入 <br> 標籤，以便換行
    let modifiedText = originalText.replace(/。/g, '。<br>');  // 將所有句號（。）替換為句號加換行符

    // 遍歷 JSON 資料中的每個關鍵字，並將它們替換為超連結
    for (const keyword in data) {  // 遍歷 JSON 中的每個關鍵字
      const { link, color, description } = data[keyword];  // 獲取關鍵字的連結、顏色和描述
      const keywordLink = `
        <a href="${link}" target="_blank" style="color: ${color};" class="keyword-link">
          ${keyword}
          <span class="tooltip">${description}</span>
        </a>
      `;  // 創建帶有超連結和 tooltip 的 HTML 結構

      // 使用正則表達式將每個關鍵字替換為帶超連結的 HTML
      const regex = new RegExp(`(${keyword})`, 'g');  // 創建匹配關鍵字的正則表達式
      modifiedText = modifiedText.replace(regex, keywordLink);  // 替換原文中的關鍵字
    }

    // 將處理後的文本插入到 HTML 中
    textContainer.innerHTML = modifiedText;  // 將生成的內容顯示到頁面上
  })
  .catch(error => console.error('載入資料失敗：', error));  // 如果出現錯誤，顯示錯誤信息
