$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger").on("click", function () {
      $("header").toggleClass("open");
    });//sp-navにopenクラスをつける表示されない
    // メニューのリンクをクリックした時
    $(".sp-nav a").on("click", function () {
      $("header").toggleClass("open");
    });

    /*=================================================
    メインビジュアルの波線
    ===================================================*/
    var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#5AC1F2', '#0ff', '#5AC1F2', '#0ff', '#5AC1F2']);//重ねる波線の色設定
    
	
		// 各キャンバスの初期化
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
		// 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波線を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 0.8, 3, 0);
	drawWave(canvas, color[1], 0.5, 4, 0);
	drawWave(canvas, color[2], 0.3, 1.6, 0);
	drawWave(canvas, color[3], 0.2, 3, 100);
	drawWave(canvas, color[4], 0.5, 1.6, 250);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
	var context = canvas.contextCache;
    context.strokeStyle = color;//線の色
	context.lineWidth = 2;//線の幅
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.stroke(); //線
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

    /*=================================================
    会員の声
    ===================================================*/
    //左側の吹き出し
    $(window).scroll(function () {
      $(".voice-left").each(function () {
        //スクロール量を取得する
        var scroll = $(window).scrollTop();
        //画面上からvoice-leftまでの距離を取得する
        var target = $(this).offset().top;
        //画面の高さを取得する
        var windowHeight = $(window).height();
  
        if (scroll > target - windowHeight + $(this).outerHeight()) {
          // outerHeight()はpaddingを含めた高さを取得する
          $(this).addClass("balloon");
        }
      });
    });

    //右側の吹き出し
    $(window).scroll(function () {
      $(".voice-rigth").each(function () {
        //スクロール量を取得する
        var scroll = $(window).scrollTop();
        //画面上からvoice-rightまでの距離を取得する
        var target = $(this).offset().top;
        //画面の高さを取得する
        var windowHeight = $(window).height();
  
        if (scroll > target - windowHeight + $(this).outerHeight()) {
          // outerHeight()はpaddingを含めた高さを取得する
          $(this).addClass("balloon");
        }
      });
    });

    //背景の幾何学模様
    particlesJS("particles-js",{
      "particles":{
        "number":{
          "value":38,//この数値を変更すると幾何学模様の数が増減できる
          "density":{
            "enable":true,
            "value_area":800
          }
        },
        "color":{
          "value":"#89CFF0"//色
        },
        "shape":{
          "type":"polygon",//形状はpolygonを指定
          "stroke":{
            "width":0,
          },
      "polygon":{
        "nb_sides":3//多角形の角の数
      },
      "image":{
        "width":190,
        "height":100
      }
      },
        "opacity":{
        "value":0.664994832269074,
        "random":false,
        "anim":{
          "enable":true,
          "speed":2.2722661797524872,
          "opacity_min":0.08115236356258881,
          "sync":false
        }
        },
        "size":{
          "value":3,
          "random":true,
          "anim":{
            "enable":false,
            "speed":40,
            "size_min":0.1,
            "sync":false
          }
        },
        "line_linked":{
          "enable":true,
          "distance":150,
          "color":"#89CFF0",
          "opacity":0.6,
          "width":2
        },
        "move":{
          "enable":true,
          "speed":6,//この数値を小さくするとゆっくりな動きになる
          "direction":"none",//方向指定なし
          "random":false,//動きはランダムにしない
          "straight":false,//動きをとどめない
          "out_mode":"out",//画面の外に出るように描写
          "bounce":false,//跳ね返りなし
          "attract":{
            "enable":false,
            "rotateX":600,
            "rotateY":961.4383117143238
          }
        }
      },
      "interactivity":{
        "detect_on":"canvas",
        "events":{
          "onhover":{
            "enable":false,
            "mode":"repulse"
          },
      "onclick":{
        "enable":false
      },
      "resize":true
        }
      },
      "retina_detect":true
    });

    /*=================================================
    スケジュール
    ===================================================*/
    //アコーディオンをクリックした時の動作
$('.day').on('click', function() {//タイトル要素をクリックしたら
  var findElm = $(this).next(".box");//直後のアコーディオンを行うエリアを取得し
  $(findElm).slideToggle();//アコーディオンの上下動作
    
  if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
    $(this).removeClass('close');//クラス名を除去し
  }else{//それ以外は
    $(this).addClass('close');//クラス名closeを付与
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
// $(window).on('load', function(){
//   $('.accordion-inner').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
//   $(".open").each(function(index, element){ //openクラスを取得
//     var Title =$(element).children('.day'); //openクラスの子要素のtitleクラスを取得
//     $(Title).addClass('close');       //タイトルにクラス名closeを付与し
//     var Box =$(element).children('.box'); //openクラスの子要素boxクラスを取得
//     $(Box).slideDown(500);          //アコーディオンを開く
//   });
// });


/*=================================================
料金
===================================================*/

// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime(){

  // ふわっ
  $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    }else{
    $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
    }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function (){
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

/*=================================================
  トップに戻る
  ===================================================*/
  let pagetop = $(".to_top");
  // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
  pagetop.hide();

  // スクロールイベント（スクロールされた際に実行）
  $(window).scroll(function () {
    // スクロール位置が700pxを超えた場合
    if ($(this).scrollTop() > 700) {
      // トップに戻るボタンを表示する
      pagetop.fadeIn();

      // スクロール位置が700px未満の場合
    } else {
      // トップに戻るボタンを非表示にする
      pagetop.fadeOut();
    }
  });

  // クリックイベント（ボタンがクリックされた際に実行）
  pagetop.click(function () {
    // 0.5秒かけてページトップへ移動
    $("body,html").animate({ scrollTop: 0 }, 500 );

    // イベントが親要素へ伝播しないための記述
    // ※詳しく知りたい方は「イベント　バブリング」または「jQuery バブリング」で調べてみてください
    return false;
  });

} )