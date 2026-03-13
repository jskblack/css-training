var levels = [
  {
    helpTitle : "根據元素類型選取元素",
    selectorName : "類型選擇器 (Type Selector)",
    doThis : "選取所有的盤子 (plate)",
    selector : "plate",
    syntax : "A",
    help : "選取所有類型為 <strong>A</strong> 的元素。類型指的是標籤的種類，所以 <tag>div</tag>、<tag>p</tag> 和 <tag>ul</tag> 都是不同的元素類型。",
    examples : [
      '<strong>div</strong> 會選取所有 <tag>div</tag> 元素。',
      '<strong>p</strong> 會選取所有 <tag>p</tag> 元素。',
    ],
    boardMarkup: `
    <plate/>
    <plate/>
    `,
    parsing: "這是最基本的選擇器，直接使用 HTML 標籤名稱 plate 即可選取頁面上所有的 <plate /> 元素。"
  },
  {
    doThis : "選取所有的便當盒 (bento)",
    selector : "bento",
    syntax : "A",
    helpTitle : "根據元素類型選取元素",
    selectorName : "類型選擇器 (Type Selector)",
    help : "選取所有類型為 <strong>A</strong> 的元素。類型指的是標籤的種類，所以 <tag>div</tag>、<tag>p</tag> 和 <tag>ul</tag> 都是不同的元素類型。",
    examples : [
      '<strong>div</strong> 會選取所有 <tag>div</tag> 元素。',
      '<strong>p</strong> 會選取所有 <tag>p</tag> 元素。',
    ],
    boardMarkup: `
    <bento/>
    <plate/>
    <bento/>
    `,
    parsing: "同上，輸入標籤名稱 bento 來選取所有的 <bento /> 元素。"
  },
  {
    doThis : "選取特製盤子 (fancy plate)",
    selector : "#fancy",
    selectorName: "ID 選擇器 (ID Selector)",
    helpTitle: "選取具有特定 ID 的元素",
    syntax: "#id",
    help : '選取具有特定 <strong>id</strong> 屬性的元素。你也可以將 ID 選擇器與類型選擇器組合使用。',
    examples : [
      '<strong>#cool</strong> 會選取任何 <strong>id="cool"</strong> 的元素',
      '<strong>ul#long</strong> 會選取 <tag>ul id="long"</tag>'
    ],
    boardMarkup : `
    <plate id="fancy"/>
    <plate/>
    <bento/>
    `,
    parsing: "ID 在頁面中是唯一的。使用井字號 # 後接 ID 名稱，可以精確選取具有 id=\"fancy\" 屬性的特定盤子。"
  },
  {
    helpTitle: "選取位於另一個元素內部的元素",
    selectorName : "後代選擇器 (Descendant Selector)",
    doThis : "選取盤子上的蘋果",
    selector : "plate apple",
    syntax: "A&nbsp;&nbsp;B",
    help : "選取所有位於 <strong>A</strong> 內部的 <strong>B</strong>。<strong>B</strong> 被稱為後代，因為它被包含在另一個元素中。",
    examples : [
      '<strong>p&nbsp;&nbsp;strong</strong> 會選取所有位於 <tag>p</tag> 內部的 <tag>strong</tag> 元素',
      '<strong>#fancy&nbsp;&nbsp;span</strong> 會選取任何位於 <strong>id="fancy"</strong> 元素內部的 <tag>span</tag> 元素',
    ],
    boardMarkup : `
    <bento/>
    <plate>
      <apple/>
    </plate>
    <apple/>
    `,
    parsing: "使用空白鍵分隔兩個選擇器。這代表「選取位於 plate 內部的 apple」。這會忽略單獨放在桌面上的蘋果，只選中盤子裡的。"
  },
  {
    doThis : "選取特製盤子上的醃黃瓜 (pickle)",
    selector : "#fancy pickle",
    helpTitle: "結合後代選擇器與 ID 選擇器",
    syntax: "#id&nbsp;&nbsp;A",
    help : '你可以將任何選擇器與後代選擇器結合使用。',
    examples : [
      '<strong>#cool&nbsp;span</strong> 會選取所有位於 <strong>id="cool"</strong> 元素內部的 <tag>span</tag> 元素'
    ],
    boardMarkup : `
    <bento>
    <orange/>
    </bento>
    <plate id="fancy">
      <pickle/>
    </plate>
    <plate>
      <pickle/>
    </plate>
    `,
    parsing: "選取 ID 為 fancy 元素內部的 pickle 元素。這展示了你可以將 ID 選擇器作為父層路徑來縮小範圍。"
  },
  {
    doThis : "選取小蘋果 (small apples)",
    selector : ".small",
    selectorName: "類別選擇器 (Class Selector)",
    helpTitle: "根據類別選取元素",
    syntax: ".classname",
    help : '類別選擇器會選取所有具有該 class 屬性的元素。一個元素只能有一個 ID，但可以有多個類別。',
    examples : [
    '<strong>.neato</strong> 會選取所有 <strong>class="neato"</strong> 的元素'
    ],
    boardMarkup : `
    <apple/>
    <apple class="small"/>
    <plate>
      <apple class="small"/>
    </plate>
    <plate/>
    `,
    parsing: "類別（Class）用於標記具有相同特徵的多個元素。使用點號 . 後接類別名稱 .small，即可選中所有 class=\"small\" 的小型食物。"
  },
  {
    doThis : "選取小柳丁",
    selector : "orange.small",
    helpTitle: "結合類別選擇器",
    syntax: "A.className",
    help : '你可以將類別選擇器與其他選擇器（如類型選擇器）結合使用。',
    examples : [
      '<strong>ul.important</strong> 會選取所有具有 <strong>class="important"</strong> 的 <tag>ul</tag> 元素',
      '<strong>#big.wide</strong> 會選取所有 <strong>id="big"</strong> 且同時具有 <strong>class="wide"</strong> 的元素'
    ],
    boardMarkup :`
    <apple/>
    <apple class="small"/>
    <bento>
      <orange class="small"/>
    </bento>
    <plate>
      <orange/>
    </plate>
    <plate>
      <orange class="small"/>
    </plate>`,
    parsing: "這代表選取「標籤為 orange 且同時具有 small 類別」的元素。如果只輸入 .small，會連小蘋果也一起選中。"
  },
  {
    doThis : "選取便當盒裡的小柳丁",
    selector : "bento orange.small",
    syntax: "加油！你可以的！",
    helpTitle: "你做得到的...",
    help : '結合你在過去幾個關卡中學到的知識來解決這一關！',
    boardMarkup : `
    <bento>
      <orange/>
    </bento>
    <orange class="small"/>
    <bento>
      <orange class="small"/>
    </bento>
    <bento>
      <apple class="small"/>
    </bento>
    <bento>
      <orange class="small"/>
    </bento>
    `,
    parsing: "這是一個複合選擇器。它選取「位於 bento 內部、標籤為 orange 且類別為 small」的元素。"
  },
  {
    doThis : "選取所有的盤子與便當盒",
    selector : "plate,bento",
    selectorName : "逗號組合器 (Comma Combinator)",
    helpTitle: "用逗號結合多個選擇器！",
    syntax : "A, B",
    help : '這會選取所有的 <strong>A</strong> 和 <strong>B</strong> 元素。你可以用這種方式結合任何選擇器，且不限於兩個。',
    examples: [
    '<strong>p, .fun</strong> 會選取所有 <tag>p</tag> 元素以及所有 <strong>class="fun"</strong> 的元素',
    '<strong>a, p, div</strong> 會選取所有 <tag>a</tag>、<tag>p</tag> 和 <tag>div</tag> 元素'
    ],
    boardMarkup : `
    <pickle class="small"/>
    <pickle/>
    <plate>
      <pickle/>
    </plate>
    <bento>
      <pickle/>
    </bento>
    <plate>
      <pickle/>
    </plate>
    <pickle/>
    <pickle class="small"/>
    `,
    parsing: "當你想同時選取多種不相關的元素時，使用逗號 , 分隔。這會一次選中所有的盤子與所有的便當盒。"
  },
  {
    doThis : "選取所有的東西！",
    selector : "*",
    selectorName:  "全域選擇器 (Universal Selector)",
    helpTitle: "你可以選取任何東西！",
    syntax : "*",
    help : '你可以使用全域選擇器選取所有的元素。',
    examples : [
      '<strong>p *</strong> 會選取所有 <tag>p</tag> 元素內部的任何元素。',
    ],
    boardMarkup : `
    <apple/>
    <plate>
      <orange class="small" />
    </plate>
    <bento/>
    <bento>
      <orange/>
    </bento>
    <plate id="fancy"/>
    `,
    parsing: "星號 * 代表「選取頁面上的每一個元素」。在這一關中，它會選中桌子上的所有東西。"
  },
  {
    doThis : "選取盤子上的所有東西",
    selector : "plate *",
    syntax : "A&nbsp;&nbsp;*",
    helpTitle: "結合全域選擇器",
    help : '這會選取 <strong>A</strong> 內部的所有元素。',
    examples : [
      '<strong>p *</strong> 會選取所有 <tag>p</tag> 元素內部的每個元素。',
      '<strong>ul.fancy *</strong> 會選取所有 <tag>ul class="fancy"</tag> 元素內部的每個元素。'
    ],
    boardMarkup: `
    <plate id="fancy">
      <orange class="small"/>
    </plate>
    <plate>
      <pickle/>
    </plate>
    <apple class="small"/>
    <plate>
      <apple/>
    </plate>`,
    parsing: "選取所有「位於 plate 元素內部」的所有東西。這與 * 不同，它將範圍限制在盤子裡。"
  },
  {
    doThis : "選取緊鄰在盤子後面的每個蘋果",
    selector : "plate + apple",
    helpTitle: "選取直接緊隨在另一個元素後的元素",
    selectorName: "相鄰兄弟選擇器 (Adjacent Sibling Selector)",
    syntax : "A + B",
    help : "這會選取所有直接緊隨在 <strong>A</strong> 後面的 <strong>B</strong> 元素。緊隨彼此的元素被稱為兄弟 (Siblings)。它們位於相同的層級或深度。<br/><br/>在這一關的 HTML 標記中，縮排相同的元素就是兄弟。",
    examples : [
      '<strong>p + .intro</strong> 會選取所有直接緊隨在 <tag>p</tag> 後面且 <strong>class="intro"</strong> 的元素',
      '<strong>div + a</strong> 會選取所有直接緊隨在 <tag>div</tag> 後面的 <tag>a</tag> 元素'
    ],
    boardMarkup : `
    <bento>
      <apple class="small"/>
    </bento>
    <plate />
    <apple class="small"/>
    <plate />
    <apple/>
    <apple class="small"/>
    <apple class="small"/>
    `,
    parsing: "使用 + 符號選取「緊接在 plate 後面的一個 apple」。兩者必須有相同的父元素且位置相鄰。"
  },
  {
    selectorName: "普通兄弟選擇器 (General Sibling Selector)",
    helpTitle: "選取在另一個元素之後的所有兄弟元素",
    syntax: "A ~ B",
    doThis : "選取便當盒旁邊的所有醃黃瓜",
    selector : "bento ~ pickle",
    help : "你可以選取某個元素之後的所有兄弟元素。這與相鄰選擇器 (A + B) 類似，但它會選取之後所有的元素，而不僅僅是一個。",
    examples : [
      '<strong>A ~ B</strong> 會選取 <strong>A</strong> 之後的所有 <strong>B</strong>'
    ],
    boardMarkup : `
    <pickle/>
    <bento>
      <orange class="small"/>
    </bento>
    <pickle class="small"/>
    <pickle/>
    <plate>
      <pickle/>
    </plate>
    <plate>
      <pickle class="small"/>
    </plate>
    `,
    parsing: "使用 ~ 符號選取「跟在 bento 後面的所有 pickle」。只要它們在同一個層級且位於 bento 之後，不論是否緊貼都會被選中。"
  },
  {
    selectorName: "子元素選擇器 (Child Selector)",
    syntax: "A > B&nbsp;",
    doThis : "選取直接放在盤子上的蘋果",
    selector : "plate > apple",
    helpTitle: "選取元素的直接子元素",
    help : "你可以選取作為其他元素直接子元素的元素。子元素是指直接嵌套在另一個元素內部的元素。<br><br>嵌套層次更深的元素則被稱為後代元素 (Descendant elements)。",
    examples : [
      '<strong>A > B</strong> 會選取所有作為 <strong>A</strong> 直接子元素的 <strong>B</strong>'
    ],
    boardMarkup: `
    <plate>
      <bento>
        <apple/>
      </bento>
    </plate>
    <plate>
      <apple/>
    </plate>
    <plate/>
    <apple/>
    <apple class="small"/>
    `,
    parsing: "使用 > 符號嚴格選取「作為 plate 直接子元素」的 apple。如果蘋果被放在盤子裡的便當盒內（孫元素），則不會被選中。"
  },
  {
    selectorName: "首個子元素偽類選擇器 (First Child Pseudo-selector)",
    helpTitle: "選取另一個元素內的第一個子元素",
    doThis : "選取最上面的柳丁",
    selector : "plate :first-child",
    syntax: ":first-child",

    help : "你可以選取第一個子元素。子元素是指直接嵌套在另一個元素內部的任何元素。你可以將此偽類選擇器與其他選擇器結合使用。",
    examples : [
      '<strong>:first-child</strong> 會選取所有的第一個子元素。',
      '<strong>p:first-child</strong> 會選取所有作為第一個子元素的 <tag>p</tag> 元素。',
      '<strong>div p:first-child</strong> 會選取所有位於 <tag>div</tag> 內部且作為第一個子元素的 <tag>p</tag> 元素。'
    ],
    boardMarkup :`
    <bento/>
    <plate />
    <plate>
      <orange />
      <orange />
      <orange />
    </plate>
    <pickle class="small" />
    `,
    parsing: "選取位於盤子裡的第一個項目。"
  },
  {
    selectorName: "唯一子元素偽類選擇器 (Only Child Pseudo-selector)",
    helpTitle: "選取某個元素內部唯一的子元素",
    doThis : "選取盤子上唯一的蘋果與醃黃瓜",
    selector : "plate :only-child",
    syntax: ":only-child",
    help : "你可以選取任何作為其父元素唯一子元素的元素。",
    examples : [
      '<strong>span:only-child</strong> 會選取作為唯一子元素的 <tag>span</tag> 元素。',
      '<strong>ul li:only-child</strong> 會選取 <tag>ul</tag> 中唯一的 <tag>li</tag> 元素。'
    ],
    boardMarkup : `
    <plate>
      <apple/>
    </plate>
    <plate>
      <pickle />
    </plate>
    <bento>
      <pickle />
    </bento>
    <plate>
      <orange class="small"/>
      <orange/>
    </plate>
    <pickle class="small"/>
    `,
    parsing: "選取位於盤子裡、且該盤子中「只有這一個食物」的元素。"
  },
  {
    selectorName: "最後一個子元素偽類選擇器 (Last Child Pseudo-selector)",
    helpTitle: "選取另一個元素內的最後一個子元素",
    doThis : "選取小蘋果與醃黃瓜",
    selector : ".small:last-child",
    syntax: ":last-child",
    help : "你可以使用此選擇器選取作為另一個元素內部最後一個子元素的元素。<br><br>專業提示 &rarr; 當只有一個元素時，該元素同時被視為首個子元素、唯一子元素和最後一個子元素！",
    examples : [
      '<strong>:last-child</strong> 會選取所有的最後一個子元素。',
      '<strong>span:last-child</strong> 會選取所有的最後一個子元素 <tag>span</tag>。',
      '<strong>ul li:last-child</strong> 會選取任何 <tag>ul</tag> 內部的最後一個 <tag>li</tag> 元素。'
    ],
    boardMarkup : `
    <plate id="fancy">
      <apple class="small"/>
    </plate>
    <plate/>
    <plate>
      <orange class="small"/>
      <orange>
    </plate>
    <pickle class="small"/>`,
    parsing: "選取「類別為 small 且它是其父元素的最後一個子元素」的物件。"
  },
  {
    selectorName: "第 N 個子元素偽類選擇器 (Nth Child Pseudo-selector)",
    helpTitle: "根據元素在另一個元素中的順序進行選取",
    doThis : "選取第 3 個盤子",
    selector : ":nth-child(3)",
    syntax: ":nth-child(A)",
    help : "選取另一個元素中的第 <strong>n</strong> 個（例如：第 1 個、第 3 個、第 12 個等）子元素。",
    examples : [
      '<strong>:nth-child(8)</strong> 會選取所有作為其父元素第 8 個子元素的元素。',
      '<strong>div p:nth-child(2)</strong> 會選取每個 <strong>div</strong> 中的第二個 <strong>p</strong>',
    ],
    boardMarkup : `
    <plate/>
    <plate/>
    <plate/>
    <plate id="fancy"/>
    `,
    parsing: "選取位於桌面上的第三個盤子。注意這是在選取同層級中的總體排名，而非類型排名。"
  },
  {
    selectorName: "倒數第 N 個子元素選擇器 (Nth Last Child Selector)",
    helpTitle: "根據順序從後往前選取子元素",
    doThis : "選取第 1 個便當盒",
    selector : "bento:nth-last-child(3)",
    syntax: ":nth-last-child(A)",
    help : "從父元素的底部開始計算並選取子元素。這就像 nth-child，但是從後往前算！",
    examples : [
      '<strong>:nth-last-child(2)</strong> 會選取所有倒數第二個子元素。'
    ],
    boardMarkup: `
    <plate/>
    <bento/>
    <plate>
      <orange/>
      <orange/>
      <orange/>
    </plate>
    <bento/>
    `,
    parsing: "從最後一個元素往回算，選取倒數第三個且標籤為 bento 的元素。"
  },
  {
    selectorName: "首個同類型選擇器 (First of Type Selector)",
    helpTitle: "選取特定類型的第一個元素",
    doThis : "選取第一個蘋果",
    selector : "apple:first-of-type",
    syntax: ":first-of-type",
    help : "選取另一個元素中該類型的第一個元素。",
    examples : [
      '<strong>span:first-of-type</strong> 會選取任何元素中的第一個 <tag>span</tag>。'
    ],
    boardMarkup: `
    <orange class="small"/>
    <apple/>
    <apple class="small"/>
    <apple/>
    <apple class="small"/>
    <plate>
      <orange class="small"/>
      <orange/>
    </plate>
    `,
    parsing: "選取所有同標籤元素中的第一個蘋果。即使它前面有別的標籤（如 orange），它仍是蘋果類型的第一名。"
  },
  {
    selectorName: "第 N 個同類型選擇器 (Nth of Type Selector)",
    doThis: "選取所有偶數編號的盤子",
    selector: "plate:nth-of-type(even)",
    syntax: ":nth-of-type(A)",
    help: "根據特定元素的類型及其在另一個元素中的順序進行選取，也可以選取偶數或奇數位置的該元素。",
    examples: [
      '<strong>div:nth-of-type(2)</strong> 會選取第二個 div 實例。',
      '<strong>.example:nth-of-type(odd)</strong> 會選取所有奇數位置的 example 類別實例。'
    ],
    boardMarkup : `
    <plate/>
    <plate/>
    <plate/>
    <plate/>
    <plate id="fancy"/>
    <plate/>
    `,
    parsing: "選取所有盤子中，排名為第 2, 4, 6... 個（偶數）的盤子。"
  },
  {
    selectorName: "使用公式的第 N 個同類型選擇器",
    doThis: "從第 3 個盤子開始，每隔 2 個選取一個盤子",
    selector: "plate:nth-of-type(2n+3)",
    syntax: ":nth-of-type(An+B)",
    help: "nth-of-type 公式會從特定的元素實例開始，每隔 n 個選取一個元素。",
    examples: [
      '<strong>span:nth-of-type(6n+2)</strong> 會從第 2 個實例開始，選取之後每隔 6 個出現的 <tag>span</tag>。'
    ],
    boardMarkup : `
    <plate/>
    <plate>
      <pickle class="small" />
    </plate>
    <plate>
      <apple class="small" />
    </plate>
    <plate/>
    <plate>
      <apple />
    </plate>
    <plate/>
    `,
    parsing: "從第 3 個元素（B）開始，每隔 2 個（n 的倍數）選取一個。即選取第 3, 5, 7... 個盤子。"
  },
  {
    selectorName: "唯一的同類型選擇器 (Only of Type Selector)",
    helpTitle: "選取在父元素中該類型唯一的元素",
    selector : "apple:only-of-type",
    syntax: ":only-of-type",
    doThis : "選取中間盤子上的蘋果",
    help : "選取另一個元素中唯一一個該類型的元素。",
    examples : [
      '<strong>p span:only-of-type</strong> 會選取 <tag>p</tag> 內部的 <tag>span</tag>，前提是該 <tag>p</tag> 內部只有這一個 <tag>span</tag>。'
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="small" />
      <apple />
    </plate>
    <plate>
      <apple class="small" />
    </plate>
    <plate>
      <pickle />
    </plate>
    `,
    parsing: "選取盤子中唯一的蘋果。這代表該盤子裡不能有其他蘋果，但可以有其他類型的食物（如柳丁）。"
  },
  {
    selectorName: "最後一個同類型選擇器 (Last of Type Selector)",
    helpTitle: "選取特定類型的最後一個元素",
    doThis : "選取最後一個蘋果和柳丁",
    selector : ".small:last-of-type",
    syntax: ":last-of-type",
    help : "選取另一個元素中該類型的最後一個實例. 請記住，類型指的是標籤的名稱，所以 <tag>p</tag> 和 <tag>span</tag> 是不同的類型。",
    examples : [
      '<strong>div:last-of-type</strong> 會選取每個元素中的最後一個 <tag>div</tag>。',
      '<strong>p span:last-of-type</strong> 會選取每個 <tag>p</tag> 中的最後一個 <tag>span</tag>。'
    ],
    boardMarkup : `
    <orange class="small"/>
    <orange class="small" />
    <pickle />
    <pickle />
    <apple class="small" />
    <apple class="small" />
    `,
    parsing: "選取每個標籤類型中的最後一個小食物（小蘋果或小柳丁）。"
  },
  {
    selectorName: "空元素選擇器 (Empty Selector)",
    helpTitle: "選取沒有子元素的元素",
    doThis : "選取空的便當盒",
    selector : "bento:empty",
    syntax: ":empty",
    help : "選取內部沒有任何其他元素的元素。",
    examples : [
      '<strong>div:empty</strong> 會選取所有空的 <tag>div</tag> 元素。'
    ],
    boardMarkup:`
    <bento/>
    <bento>
      <pickle class="small"/>
    </bento>
    <plate/>
    <bento/>`,
    parsing: "選取內部完全沒有任何子元素（包含文字與其他標籤）的便當盒。"
  },
  {
    selectorName: "否定偽類 (Negation Pseudo-class)",
    helpTitle: "選取所有不符合否定選擇器的元素",
    doThis : "選取大蘋果",
    selector : "apple:not(.small)",
    syntax: ":not(X)",
    help : '你可以使用此選擇器選取所有不符合選擇器 <strong>"X"</strong> 的元素。',
    examples : [
      '<strong>:not(#fancy)</strong> 會選取所有不具有 <strong>id="fancy"</strong> 的元素。',
      '<strong>div:not(:first-child)</strong> 會選取所有不是第一個子元素的 <tag>div</tag>。',
      '<strong>:not(.big, .medium)</strong> 會選取所有既不具有 <strong>class="big"</strong> 也不具有 <strong>class="medium"</strong> 的元素。'
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="small" />
    </plate>
    <plate>
      <apple />
    </plate>
    <apple />
    <plate>
      <orange class="small" />
    </plate>
    <pickle class="small" />
    `,
    parsing: "選取所有蘋果，但「排除」掉那些具有 small 類別的蘋果（即選取大蘋果）。"
  },
  {
    selectorName: "屬性選擇器 (Attribute Selector)",
    helpTitle: "選取所有具有特定屬性的元素",
    doThis : "選取為某人準備的餐點",
    selector : "[for]",
    syntax: "[attribute]",
    help : '屬性會出現在元素的起始標籤內部，例如：<tag>span attribute="value"</tag>。屬性不一定有值，也可以是空白的！',
    examples : [
      '<strong>a[href]</strong> 會選取所有具有 <strong>href="anything"</strong> 屬性的 <tag>a</tag> 元素。',
      '<strong>[type]</strong> 會選取所有具有 <strong>type="anything"</strong> 屬性的元素。'
    ],
    boardMarkup:`
    <bento><apple class="small"/></bento>
    <apple for="阿強"/>
    <plate for="小華"><pickle/></plate>
    <bento for="美玲"><orange/></bento>
    <pickle/>`,
    parsing: "選取所有具有 for 屬性的元素，不論其內容為何。"
  },
  {
    selectorName: "屬性選擇器 (Attribute Selector)",
    helpTitle: "選取具有特定屬性的類型元素",
    doThis : "選取為某人準備的盤子",
    selector : "plate[for]",
    syntax: "A[attribute]",
    help : "將屬性選擇器與另一個選擇器（如類型選擇器）結合，只需將其添加至末尾即可。",
    examples : [
      '<strong>[value]</strong> 會選取所有具有 <strong>value="anything"</strong> 屬性的元素。',
      '<strong>a[href]</strong> 會選取所有具有 <strong>href="anything"</strong> 屬性的 <tag>a</tag> 元素。',
      '<strong>input[disabled]</strong> 會選取所有具有 <strong>disabled</strong> 屬性的 <tag>input</tag> 元素'
    ],
    boardMarkup:`
    <plate for="莎莎"><pickle/></plate>
    <plate for="阿龍"><apple/></plate>
    <plate/>
    <bento for="阿祥"><orange/></bento>
    `,
    parsing: "選取所有具有 for 屬性的「盤子」。"
  },
  {
    selectorName: "屬性值選擇器 (Attribute Value Selector)",
    helpTitle: "選取具有特定屬性值的元素",
    doThis : "選取維大力 (Vitaly) 的餐點",
    selector : "[for=Vitaly]",
    syntax: '[attribute="value"]',
    help : "屬性選擇器對大小寫敏感，每個字元必須完全符合。",
    examples : [
      '<strong>input[type="checkbox"]</strong> 會選取所有的核取方塊輸入元素。'
    ],
    boardMarkup:`
    <apple for="Alexei" />
    <bento for="Albina"><apple /></bento>
    <bento for="Vitaly"><orange/></bento>
    <pickle/>
    `,
    parsing: "精確選取 for 屬性內容為 \"Vitaly\" 的元素。注意大小寫必須完全一致。"
  },
  {
    selectorName: "屬性起始值選擇器 (Attribute Starts With Selector)",
    helpTitle: "選取屬性值以特定字元開頭的所有元素",
    doThis : "選取名字以 'Sa' 開頭的項目",
    selector : '[for^="Sa"]',
    syntax: '[attribute^="value"]',
    examples : [
      '<strong>.toy[category^="Swim"]</strong> 會選取類別為 <strong>toy</strong> 且屬性為 <strong>category="Swimwear"</strong> 或 <strong>category="Swimming"</strong> 的元素。'
    ],
    boardMarkup: `
    <plate for="Sam"><pickle/></plate>
    <bento for="Sarah"><apple class="small"/></bento>
    <bento for="Mary"><orange/></bento>
    `,
    parsing: "選取 for 屬性內容是以 \"Sa\" 開頭的元素（如 Sarah 或 Sam）。"
  },
  {
    selectorName: "屬性結尾值選擇器 (Attribute Ends With Selector)",
    helpTitle: "選取屬性值以特定字元結尾的所有元素",
    doThis : "選取名字以 'ato' 結尾的項目",
    selector : '[for$="ato"]',
    syntax: '[attribute$="value"]',
    help : '',
    examples : [
      '<strong>img[src$=".jpg"]</strong> 會選取所有顯示 <strong>.jpg</strong> 格式圖片的影像元素。',
    ],
    boardMarkup:`
    <apple class="small"/>
    <bento for="Hayato"><pickle/></bento>
    <apple for="Ryota"></apple>
    <plate for="Minato"><orange/></plate>
    <pickle class="small"/>
    `,
    parsing: "選取 for 屬性內容是以 \"ato\" 結尾的元素（如 Hayato 或 Minato）。"
  },
  {
    selectorName: "屬性萬用字元選擇器 (Attribute Wildcard Selector)",
    helpTitle: "選取屬性值包含特定字元的所有元素",
    syntax: '[attribute*="value"]',
    doThis : "選取名字包含 'obb' 的餐點",
    selector : '[for*="obb"]',
    help : '這是一個非常有用的選擇器，如果你能識別出像是 <strong>class</strong>、<strong>href</strong> 或 <strong>src</strong> 屬性中的共同模式。',
    examples : [
      '<strong>img[src*="/thumbnails/"]</strong> 會選取所有顯示來自 \"thumbnails\" 資料夾圖片的影像元素。',
      '<strong>[class*="heading"]</strong> 會選取所有類別中包含 \"heading\" 的元素，例如 <strong>class="main-heading"</strong> 和 <strong>class="sub-heading"</strong>'
    ],
    boardMarkup:`
    <bento for="Robbie"><apple /></bento>
    <bento for="Timmy"><pickle /></bento>
    <bento for="Bobby"><orange /></bento>
    `,
    parsing: "選取 for 屬性內容中「包含」有 \"obb\" 字串的元素（如 Robbie 或 Bobby）。"
  }
];