/* CSS 訓練館 (CSS Diner) - 核心遊戲邏輯完整版 (優化解析格式)
  整合功能：
  1. 繁體中文化 (台灣用語)
  2. 關卡分組：基礎訓練 (1-10) 與 挑戰關卡 (11-32)
  3. 解鎖機制：需完成前 10 關才可進入挑戰關卡
  4. 解答解析：格式化顯示「正確答案」與「文字解析」
  5. 觸發邏輯：錯誤 3 次顯示按鈕，答對自動顯示並延遲 4 秒跳轉
*/

var level;  // 持有當前關卡資訊
var currentLevel = parseInt(localStorage.currentLevel,10) || 0; // 追蹤目前關卡數
var levelTimeout = 1000; 
var finished = false;    

var blankProgress = {
  totalCorrect : 0,
  percentComplete : 0,
  lastPercentEvent : 0,
  guessHistory : {}
}

var progress = JSON.parse(localStorage.getItem("progress")) || blankProgress;

$(document).ready(function(){

  $(window).on("keydown",function(e){
    if(e.keyCode == 27) closeMenu();
  });

  $(".left-col, .level-menu").mCustomScrollbar({
    scrollInertia: 0,
    autoHideScrollbar: true
  });

  $(".note-toggle").on("click", function(){
    $(this).hide();
    $(".note").slideToggle();
  });

  $(".level-menu-toggle-wrapper").on("click",function(){
    if($(".menu-open").length == 0) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // 處理點擊「顯示解析」按鈕
  $(".display-help").on("click", ".show-parsing-button", function(e){
    e.preventDefault();
    $(this).fadeOut();
    $(".parsing-container").slideDown();
    return false;
  });

  // 導覽箭頭鎖定邏輯
  $(".level-nav").on("click","a",function(){
    var direction = $(this).hasClass("next") ? "next" : "prev";
    
    if(direction == "next") {
      if(currentLevel == 9 && !isBasicLevelsFinished()) {
        addAnimation($(this),"shake");
        alert("請先完成前 10 關基礎訓練，才能挑戰後續關卡！");
        return false;
      }
      currentLevel++;
      if(currentLevel >= levels.length) currentLevel = levels.length - 1;
    } else {
      currentLevel--;
      if(currentLevel < 0) currentLevel = 0;
    }

    addAnimation($(this),"link-jiggle");
    loadLevel();
    return false;
  });

  $(".reset-progress").on("click",function(){
    resetProgress();
    return false;
  })

  $("input").on("keypress",function(e){
    e.stopPropagation();
    if(e.keyCode ==  13){
      enterHit();
      return false;
    }
  });

  $("input").on("keyup",function(e){
    e.stopPropagation();
    if($(this).val().length > 0) {
      $("input").removeClass("input-strobe");
    } else {
      $("input").addClass("input-strobe");
    }
  });

  $(".editor").on("click",function(){ $("input").focus(); });

  $(".table").on("mouseover","*",function(e){
    e.stopPropagation();
    showTooltip($(this));
  });

  $(".markup").on("mouseover","div *",function(e){
    var index = $(".markup *").index($(this)) - 1;
    showTooltip($(".table *").eq(index));
    e.stopPropagation();
  });

  $(".markup").on("mouseout","*",function(e){
    e.stopPropagation();
    hideTooltip();
  });

  $(".table").on("mouseout","*", function(e){
    hideTooltip();
    e.stopPropagation();
  });

  $(".enter-button").on("click",function(){ enterHit(); })

  $(".table-wrapper,.table-edge").css("opacity",0);
  buildLevelmenu();

  setTimeout(function(){
    loadLevel();
    $(".table-wrapper,.table-edge").css("opacity",1);
  },50);
});

function addAnimation(el, className){
  el.addClass(className);
  el.one("animationend",function(e){ $(e.target).removeClass(className); })
}

function resetProgress(){
  currentLevel = 0;
  progress = blankProgress;
  localStorage.setItem("progress",JSON.stringify(progress));
  finished = false;
  $(".completed").removeClass("completed");
  buildLevelmenu(); 
  loadLevel();
  closeMenu();
  $("#mCSB_2_container").css("top",0); 
}

function checkCompleted(levelNumber){
  return progress.guessHistory[levelNumber] ? progress.guessHistory[levelNumber].correct : false;
}

function isBasicLevelsFinished() {
  for(var i = 0; i < 10; i++) {
    if(!checkCompleted(i)) return false;
  }
  return true;
}

function buildLevelmenu(){
  var levelsContainer = $(".level-menu .levels");
  levelsContainer.empty();

  levelsContainer.append("<h3 class='menu-group-header'>基礎訓練 (1-10)</h3>");
  for(var i = 0; i < 10; i++){
    levelsContainer.append(createLevelItem(i));
  }

  var challengeHeader = $("<h3 class='menu-group-header challenge-header'>挑戰關卡 (11-32) <span class='lock-icon'>🔒</span></h3>");
  levelsContainer.append(challengeHeader);
  var challengeWrapper = $("<div class='challenge-wrapper'></div>");
  for(var j = 10; j < levels.length; j++){
    challengeWrapper.append(createLevelItem(j));
  }
  levelsContainer.append(challengeWrapper);

  if(isBasicLevelsFinished()) {
    challengeWrapper.addClass("unlocked").show();
    challengeHeader.addClass("unlocked").find(".lock-icon").text("🔓");
  } else {
    challengeWrapper.hide();
  }
}

function createLevelItem(index) {
  var levelData = levels[index];
  var item = document.createElement("a");
  $(item).html("<span class='checkmark'></span><span class='level-number'>" + (index+1) + "</span>" + levelData.syntax);
  if(checkCompleted(index)) $(item).addClass("completed");
  $(item).on("click",function(){
    if(index >= 10 && !isBasicLevelsFinished()) {
      addAnimation($(".challenge-header"), "shake");
      return;
    }
    finished = false;
    currentLevel = index;
    loadLevel();
    closeMenu();
  });
  return item;
}

function closeMenu(){ $(".right-col").removeClass("menu-open"); }
function openMenu(){ $(".right-col").addClass("menu-open"); }
function hideTooltip(){
  $(".enhance").removeClass("enhance");
  $("[data-hovered]").removeAttr("data-hovered");
  $(".helper").hide();
}

function showTooltip(el){
  if(finished){ return; }
  el.attr("data-hovered",true);
  var index = $(".table *").index(el);
  $(".markup > div *").eq(index).addClass("enhance").find("*").addClass("enhance");

  var helper = $(".helper");
  var pos = el.offset();
  helper.css("top",pos.top - 65);
  helper.css("left",pos.left + (el.width()/2));

  var elType = el.get(0).tagName.toLowerCase();
  var helpertext = '<' + elType;
  var elClass = el.attr("class");
  if(elClass) {
    elClass = elClass.replace("strobe","").trim();
    if(elClass) helpertext += ' class="' + elClass + '"';
  }
  var id = el.attr("id");
  if(id) helpertext += ' id="' + id + '"';

  helpertext += '></' + elType + '>';
  helper.show().text(helpertext);
}

function enterHit(){
  $(".enter-button").removeClass("enterhit");
  $(".enter-button").width($(".enter-button").width());
  $(".enter-button").addClass("enterhit");
  handleInput($("input").val());
}

function handleInput(text){
  var levelNum = parseInt(text,10);
  if(levelNum > 0 && levelNum <= levels.length) {
    if(levelNum > 10 && !isBasicLevelsFinished()) {
      alert("請先完成前 10 關基礎訓練！");
      return;
    }
    currentLevel = levelNum - 1;
    loadLevel();
    return;
  }
  fireRule(text);
}

// 載入右側說明文字、範例與解答解析 (優化格式)
function showHelp() {
  $(".display-help .syntax").html(level.syntax || "");
  $(".display-help .selector-name").html(level.selectorName || "");
  $(".display-help .title").html(level.helpTitle || "");
  $(".display-help .examples").empty();
  $(".display-help .examples-title").hide();
  var examples = level.examples || [];
  for(var i = 0; i < examples.length; i++){
    $(".display-help .examples").append("<div class='example'>" + examples[i] + "</div>");
    $(".display-help .examples-title").show();
  }
  $(".display-help .hint").html(level.help || "");

  // --- 關鍵修正：調整解析內容格式，優先說明正確答案 ---
  var parsingHTML = "<div style='margin-bottom:12px; color:#4cbb4a; background:rgba(76,187,74,0.1); padding:8px; border-radius:3px;'>" +
                    "<strong>✅ 正確答案：</strong><code>" + (level.selector || "") + "</code></div>" + 
                    "<div style='line-height:1.7;'>" + (level.parsing || "目前此關卡尚無解析。") + "</div>";
  
  $(".parsing-content").html(parsingHTML);
}

function resetTable(){
  $(".display-help").removeClass("open-help");
  $(".clean, .strobe").removeClass("clean strobe");
  $("input").addClass("input-strobe");
  $(".table *").each(function(){ $(this).width($(this).width()); });
  var tableWidth = $(".table").outerWidth();
  $(".table-wrapper, .table-edge").width(tableWidth);
}

function fireRule(rule) {
  if(rule === ".strobe") rule = null;
  $(".shake").removeClass("shake");
  $(".strobe, .clean, .shake").removeAttr("style");

  var baseTable = $('.table');
  try { $(".table").find(rule).not(baseTable); } catch(err) { rule = null; }

  var ruleSelected = $(".table").find(rule).not(baseTable);
  var levelSelected = $(".table").find(level.selector).not(baseTable);
  var win = false;

  if(ruleSelected.length == 0) $(".editor").addClass("shake");
  if(ruleSelected.length == levelSelected.length && ruleSelected.length > 0){
    win = checkResults(ruleSelected,levelSelected,rule);
  }

  if(win){
    ruleSelected.removeClass("strobe").addClass("clean");
    $("input").val("");
    updateProgressUI(currentLevel, true);
    
    // 答對時隱藏按鈕，顯示完整解析
    $(".show-parsing-button").hide();
    $(".parsing-container").slideDown();

    currentLevel++;
    if(currentLevel == 10) buildLevelmenu();

    if(currentLevel >= levels.length) {
      winGame();
    } else {
      // 延遲 4 秒跳轉，給予閱讀解析的時間
      setTimeout(loadLevel, 4000); 
    }
    trackProgress(currentLevel-1, "correct");
  } else {
    ruleSelected.removeClass("strobe").addClass("shake");
    setTimeout(function(){
      $(".shake").removeClass("shake");
      $(".strobe").removeClass("strobe");
      levelSelected.addClass("strobe");
    },500);
    trackProgress(currentLevel, "incorrect");

    // 檢查錯誤次數是否超過 3 次
    var stats = progress.guessHistory[currentLevel];
    if(stats && stats.incorrectCount >= 3) {
      $(".show-parsing-button").fadeIn();
    }
  }
}

function updateProgressUI(levelNumber, completed){
  if(completed) {
    $(".levels a").eq(levelNumber).addClass("completed");
    $(".level-header").addClass("completed");
  } else {
    $(".level-header").removeClass("completed");
  }
}

function trackProgress(levelNumber, type){
  if(!progress.guessHistory[levelNumber]) {
    progress.guessHistory[levelNumber] = { correct : false, incorrectCount : 0 };
  }
  var levelStats = progress.guessHistory[levelNumber];
  if(type == "incorrect"){
    if(!levelStats.correct) levelStats.incorrectCount++;
  } else {
    if(!levelStats.correct) {
      levelStats.correct = true;
      progress.totalCorrect++;
      progress.percentComplete = progress.totalCorrect / levels.length;
    }
  }
  localStorage.setItem("progress",JSON.stringify(progress));
}

function winGame(){
  $(".table").html('<span class="winner"><strong>太棒了，你做到了！</strong><br>你已經是 CSS 選擇器大師了。</span>');
  finished = true;
  resetTable();
}

function checkResults(ruleSelected,levelSelected,rule){
  var ruleTable = $(".table").clone();
  ruleTable.find(".strobe").removeClass("strobe");
  ruleTable.find(rule).addClass("strobe");
  return($(".table").html() == ruleTable.html());
}

function getMarkup(el){
  var elName = el.tagName.toLowerCase();
  var wrapperEl = $("<div/>");
  var attributeString = "";
  $.each(el.attributes, function() {
    if(this.specified) attributeString += ' ' + this.name + '="' + this.value + '"';
  });
  if(el.children.length > 0) {
    wrapperEl.text("<" + elName + attributeString + ">");
    $(el.children).each(function(){ wrapperEl.append(getMarkup(this)); });
    wrapperEl.append("&lt;/" + elName +  "&gt;");
  } else {
    wrapperEl.text("<" + elName + attributeString + " />");
  }
  return wrapperEl;
}

function loadBoard(){
  showHelp();
  var markupHolder = $("<div/>")
  $(level.boardMarkup).each(function(){
    if(this.nodeType == 1) markupHolder.append(getMarkup(this));
  });
  $(".table").html(level.boardMarkup);
  addNametags();
  $(".table *").addClass("pop");
  $(".markup").html('<div>&ltdiv class="table"&gt' + markupHolder.html() + '&lt/div&gt</div>');
}

function addNametags(){
  $(".nametags *").remove();
  $(".table-wrapper").css("transform","rotateX(0)");
  $(".table *").each(function(){
    if($(this).attr("for")){
      var pos = $(this).position();
      var nameTag = $("<div class='nametag'>" + $(this).attr("for") + "</div>");
      $(".nametags").append(nameTag);
      nameTag.css("left", pos.left + ($(this).width()/2) - nameTag.width()/2 + 12);
    }
  });
  $(".table-wrapper").css("transform","rotateX(20deg)");
}

function loadLevel(){
  if(currentLevel < 0 || currentLevel >= levels.length) currentLevel = 0;
  hideTooltip();
  
  $(".parsing-container").hide();
  $(".show-parsing-button").hide();

  level = levels[currentLevel];
  $(".note-toggle").toggle(currentLevel < 3);
  $(".level-menu .current").removeClass("current");
  $(".level-menu .levels a").eq(currentLevel).addClass("current");
  $(".progress").css("width", ((currentLevel+1)/levels.length * 100) + "%");
  localStorage.setItem("currentLevel",currentLevel);
  loadBoard();
  resetTable();

  if(currentLevel < 10) {
    $(".level-header .level-text").html("第 " + (currentLevel+1) + " 關，共 10 關");
  } else {
    $(".level-header .level-text").html("挑戰第 " + (currentLevel+1) + " 關");
  }

  updateProgressUI(currentLevel, checkCompleted(currentLevel));
  $(".order").text(level.doThis);
  $("input").val("").focus();

  setTimeout(function(){
    $(".table " + level.selector).addClass("strobe");
    $(".pop").removeClass("pop");
  }, 200);
}